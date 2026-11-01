import { errorSummary } from "@/lib/request-guard"

const REQUEST_TIMEOUT_MS = 8000
const DAILY_SMS_CAP = 40
const DAILY_THANK_YOU_CAP = 30
const MAX_THANKED_NUMBERS = 2000
const DAY_MS = 24 * 60 * 60 * 1000

export type SmsKind = "owner" | "thank-you"

interface Reservation {
  at: number
  kind: SmsKind
}

let reservations: Reservation[] = []
const thankedNumbers = new Map<string, number>()

// Process-wide, whatever the IP, so rotating addresses can't burn the provider quota.
// Thank-yous stop early so the rest of the cap stays available for owner alerts.
function reserveDailySend(kind: SmsKind) {
  const now = Date.now()
  reservations = reservations.filter((entry) => now - entry.at < DAY_MS)
  if (reservations.length >= DAILY_SMS_CAP) return null

  if (kind === "thank-you" && reservations.filter((entry) => entry.kind === kind).length >= DAILY_THANK_YOU_CAP) {
    return null
  }

  const reservation = { at: now, kind }
  reservations.push(reservation)
  return reservation
}

function releaseDailySend(reservation: Reservation) {
  reservations = reservations.filter((entry) => entry !== reservation)
}

// Held here rather than in the rate-limit store so key churn can't evict it. When full it
// refuses new numbers instead of evicting: skipping a thank-you is harmless, repeating one isn't.
function canThank(to: string) {
  const now = Date.now()
  for (const [number, expiresAt] of thankedNumbers) {
    if (expiresAt <= now) thankedNumbers.delete(number)
  }
  return !thankedNumbers.has(to) && thankedNumbers.size < MAX_THANKED_NUMBERS
}

export function isSmsConfigured() {
  return Boolean(process.env.TEXTBEE_API_KEY)
}

// Accepts 0911223344, 911223344, 251911223344 and +251 91 122 3344.
// Only Ethiopian mobile numbers (09/07) pass, so the form can't trigger international SMS.
export function normalizeEthiopianPhone(input: string) {
  const digits = input.replace(/[\s()-]/g, "")
  const match = digits.match(/^(?:\+?251|0)?([79]\d{8})$/)
  return match ? `+251${match[1]}` : null
}

// Never throws: an SMS problem must not fail a contact request that already reached the owner.
export async function sendSms(to: string, message: string, kind: SmsKind = "owner") {
  const apiKey = process.env.TEXTBEE_API_KEY
  if (!apiKey || (kind === "thank-you" && !canThank(to))) {
    return false
  }

  const reservation = reserveDailySend(kind)
  if (!reservation) {
    return false
  }

  // Kept even if the send fails: a timed-out send may still have been delivered.
  if (kind === "thank-you") {
    thankedNumbers.set(to, reservation.at + DAY_MS)
  }

  const baseUrl = process.env.TEXTBEE_BASE_URL || "https://api.textbee.dev/api/v1"
  const deviceId = process.env.TEXTBEE_DEVICE_ID

  try {
    const response = await fetch(`${baseUrl}/gateway/send-sms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        recipients: [to],
        message,
        ...(deviceId ? { deviceId } : {}),
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })

    if (!response.ok) {
      // 429 means the free daily (50) or monthly (300) quota is used up.
      console.error("SMS send failed:", response.status)
      releaseDailySend(reservation)
      return false
    }

    return true
  } catch (error) {
    console.error("SMS send error:", errorSummary(error))
    releaseDailySend(reservation)
    return false
  }
}
