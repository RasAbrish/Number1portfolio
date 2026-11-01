import { isIPv4, isIPv6 } from "node:net"
import { allowRequest } from "@/lib/rate-limit"

export const MAX_BODY_BYTES = 64 * 1024
export const TOO_MANY_REQUESTS = "Too many requests. Please try again later."
const MAX_UNPARSED_IP_LENGTH = 64

export interface GuardFailure {
  status: number
  message: string
}

export interface RateLimit {
  name: string
  limit: number
  windowMs: number
}

// Provider errors can echo the message they were given, so only short plain identifiers get logged.
export function safeIdentifier(value: unknown) {
  return typeof value === "string" && /^[A-Za-z0-9_.-]{1,64}$/.test(value) ? value : undefined
}

export function errorSummary(error: unknown) {
  const { name, code, responseCode, cause } = (error ?? {}) as {
    name?: unknown
    code?: unknown
    responseCode?: unknown
    cause?: { code?: unknown } | null
  }
  return {
    name: safeIdentifier(name),
    // fetch keeps network codes such as ECONNREFUSED on the cause.
    code: safeIdentifier(code) ?? safeIdentifier(cause?.code),
    responseCode: typeof responseCode === "number" ? responseCode : undefined,
  }
}

function lastEntry(value: string | null) {
  return value
    ?.split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .pop()
}

function expandIPv6(ip: string) {
  const dotted = ip.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)$/)
  const hex = dotted
    ? `${ip.slice(0, dotted.index)}${((Number(dotted[1]) << 8) | Number(dotted[2])).toString(16)}:${(
        (Number(dotted[3]) << 8) | Number(dotted[4])
      ).toString(16)}`
    : ip
  const [head, tail] = hex.split("::")
  const left = head ? head.split(":") : []
  const right = tail ? tail.split(":") : []
  const zeros = new Array(8 - left.length - right.length).fill("0")

  return [...left, ...zeros, ...right].map((group) => parseInt(group, 16))
}

// One visitor usually controls a whole IPv6 /64, so that is the unit that gets limited.
function normalizeIp(value: string) {
  const ip = value
    .toLowerCase()
    .replace(/^\[([^\]]+)\](?::\d+)?$/, "$1")
    .replace(/^(\d+\.\d+\.\d+\.\d+):\d+$/, "$1")
    .split("%")[0]

  if (isIPv4(ip)) return ip
  if (!isIPv6(ip)) return ip.slice(0, MAX_UNPARSED_IP_LENGTH)

  const groups = expandIPv6(ip)
  const isMapped = groups.slice(0, 5).every((group) => group === 0) && groups[5] === 0xffff
  if (isMapped) {
    return [groups[6] >> 8, groups[6] & 255, groups[7] >> 8, groups[7] & 255].join(".")
  }

  return `${groups
    .slice(0, 4)
    .map((group) => group.toString(16))
    .join(":")}::/64`
}

// The rightmost x-forwarded-for entry is the one added by the nearest proxy.
// Everything to its left can be set by the client.
export function getClientIp(headers: Headers) {
  const ip =
    lastEntry(headers.get("x-vercel-forwarded-for")) ||
    lastEntry(headers.get("x-real-ip")) ||
    lastEntry(headers.get("x-forwarded-for"))

  return ip ? normalizeIp(ip) : "unknown"
}

function isCrossOrigin(headers: Headers) {
  const origin = headers.get("origin")
  if (origin === null) return false

  try {
    const originUrl = new URL(origin)
    // Parsing the Host with the same scheme normalises case and default ports.
    return originUrl.host !== new URL(`${originUrl.protocol}//${headers.get("host")}`).host
  } catch {
    return true
  }
}

function isJson(headers: Headers) {
  return headers.get("content-type")?.split(";")[0].trim().toLowerCase() === "application/json"
}

export function guardPost(req: Request, rateLimit: RateLimit): GuardFailure | null {
  if (isCrossOrigin(req.headers)) {
    return { status: 403, message: "Cross-origin requests are not allowed." }
  }

  if (!isJson(req.headers)) {
    return { status: 415, message: "Content-Type must be application/json." }
  }

  const { name, limit, windowMs } = rateLimit
  if (!allowRequest(`${name}:${getClientIp(req.headers)}`, limit, windowMs)) {
    return { status: 429, message: TOO_MANY_REQUESTS }
  }

  return null
}

const TOO_LARGE: GuardFailure = { status: 413, message: "Request body is too large." }
const INVALID_BODY: GuardFailure = { status: 400, message: "Invalid request body." }

// Counts the bytes actually read, because Content-Length can be missing or wrong.
export async function readJsonBody(req: Request): Promise<{ data: unknown } | { failure: GuardFailure }> {
  if (Number(req.headers.get("content-length")) > MAX_BODY_BYTES) {
    return { failure: TOO_LARGE }
  }

  const reader = req.body?.getReader()
  if (!reader) return { failure: INVALID_BODY }

  const decoder = new TextDecoder()
  let text = ""
  let bytes = 0

  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      bytes += value.byteLength
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => {})
        return { failure: TOO_LARGE }
      }
      text += decoder.decode(value, { stream: true })
    }
    return { data: JSON.parse(text + decoder.decode()) }
  } catch {
    return { failure: INVALID_BODY }
  }
}
