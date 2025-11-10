import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

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

    // Check if Resend API key is configured
    if (!resendApiKey || !resend) {
      console.error("RESEND_API_KEY is not configured")
      // Fallback: Log the email details (for development)
      console.log("Email would be sent:", {
        to: "abrhambest7@gmail.com",
        from: email,
        name,
        subject,
        message,
      })
      
      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured. Please contact the site administrator.",
        },
        { status: 500 },
      )
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // You can change this after verifying your domain
      to: ["abrhambest7@gmail.com"],
      replyTo: email,
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

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send email. Please try again later.",
        },
        { status: 500 },
      )
    }

    console.log("Email sent successfully:", data)

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
