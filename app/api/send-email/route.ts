import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { buildContactEmailHtml, buildContactEmailText, validateContactInput } from "@/lib/contact-email"
import { allowProcessRequest } from "@/lib/rate-limit"
import { errorSummary, guardPost, readJsonBody, TOO_MANY_REQUESTS } from "@/lib/request-guard"
import { isSmsConfigured, normalizeEthiopianPhone, sendSms } from "@/lib/sms"
import { buildOwnerAlertSms, buildThankYouSms } from "@/lib/sms-templates"

const HOUR_MS = 60 * 60 * 1000
const SMTP_TIMEOUT_MS = 10_000
const OWNER_PHONE = normalizeEthiopianPhone(process.env.SMS_OWNER_PHONE || "")

const CONTACT_RECIPIENT = process.env.CONTACT_RECIPIENT || "abrhambest7@gmail.com"

const smtpHost = process.env.MAIL_HOST
const smtpPort = Number(process.env.MAIL_PORT || "465")
const smtpUser = process.env.MAIL_USERNAME
const smtpPass = process.env.MAIL_PASSWORD
const fromAddress = process.env.MAIL_FROM_ADDRESS || smtpUser || CONTACT_RECIPIENT
const fromName = process.env.MAIL_FROM_NAME || "Portfolio Contact"

const transporter =
  smtpHost && smtpUser && smtpPass
    ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: process.env.MAIL_ENCRYPTION === "ssl" || smtpPort === 465,
        connectionTimeout: SMTP_TIMEOUT_MS,
        greetingTimeout: SMTP_TIMEOUT_MS,
        socketTimeout: SMTP_TIMEOUT_MS,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })
    : null

function failure(status: number, message: string) {
  return NextResponse.json({ success: false, message }, { status })
}

export async function POST(request: NextRequest) {
  try {
    const blocked = guardPost(request, {
      name: "send-email",
      limit: 5,
      windowMs: HOUR_MS,
    })
    if (blocked) {
      return failure(blocked.status, blocked.message)
    }

    const body = await readJsonBody(request)
    if ("failure" in body) {
      return failure(body.failure.status, body.failure.message)
    }

    // Validate required fields
    const validation = validateContactInput(body.data)
    if (!validation.ok) {
      return failure(400, validation.message)
    }

    const { name, email, subject, message, phone } = validation.data
    const rawPhone = phone?.trim() || ""
    const visitorPhone = rawPhone ? normalizeEthiopianPhone(rawPhone) : null

    if (rawPhone && !visitorPhone) {
      return failure(400, "Please enter a valid Ethiopian phone number, for example 0911223344")
    }

    const ownerSmsEnabled = isSmsConfigured() && Boolean(OWNER_PHONE)

    // Check that at least one way of reaching the owner is configured
    if (!transporter && !ownerSmsEnabled) {
      console.error("Contact request dropped: neither SMTP nor owner SMS is configured")

      return failure(503, "The message could not be sent right now. Please try again later.")
    }

    // Counted only here, so junk requests can't close the form for everyone else
    if (!allowProcessRequest("send-email", 60, HOUR_MS)) {
      return failure(429, TOO_MANY_REQUESTS)
    }

    const details = { name, email, phone: visitorPhone, subject, message }
    let emailSent = false

    if (transporter) {
      try {
        // Send email using SMTP (Gmail)
        await transporter.sendMail({
          from: `"${fromName}" <${fromAddress}>`,
          to: CONTACT_RECIPIENT,
          replyTo: email,
          subject: `Portfolio Contact: ${subject}`,
          html: buildContactEmailHtml(details),
          text: buildContactEmailText(details),
        })

        emailSent = true
        console.log("Email sent successfully via SMTP to:", CONTACT_RECIPIENT)
      } catch (error) {
        console.error("Email send error:", errorSummary(error))
      }
    }

    let ownerSmsSent = false

    if (ownerSmsEnabled && OWNER_PHONE) {
      ownerSmsSent = await sendSms(
        OWNER_PHONE,
        buildOwnerAlertSms({ name, email, phone: visitorPhone, subject }),
      )
    }

    if (!emailSent && !ownerSmsSent) {
      return failure(500, "Failed to process email")
    }

    if (visitorPhone) {
      await sendSms(visitorPhone, buildThankYouSms(name), "thank-you")
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Email send error:", errorSummary(error))
    return failure(500, "Failed to process email")
  }
}
