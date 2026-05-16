import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

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
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })
    : null

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      )
    }

    // Check if SMTP configuration is present
    if (!transporter) {
      console.error("SMTP is not configured correctly")
      console.log("Email would be sent:", {
        to: CONTACT_RECIPIENT,
        from: email,
        name,
        subject,
        message,
      })
      
      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured. Check MAIL_HOST, MAIL_PORT, MAIL_USERNAME, and MAIL_PASSWORD.",
        },
        { status: 500 },
      )
    }

    // Send email using SMTP (Gmail)
    await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to: CONTACT_RECIPIENT,
      replyTo: String(email),
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <strong>Message:</strong>
              <p style="margin-top: 10px; line-height: 1.6; color: #374151;">${message.replace(/\n/g, "<br>")}</p>
            </div>
          </div>
          <p style="margin-top: 20px; color: #6b7280; font-size: 12px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
    })

    console.log("Email sent successfully via SMTP to:", CONTACT_RECIPIENT)

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process email",
      },
      { status: 500 },
    )
  }
}
