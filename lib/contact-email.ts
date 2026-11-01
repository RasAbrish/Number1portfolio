export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 200,
  message: 10_000,
}

const EMAIL_FORMAT = /^[A-Z0-9._%+'-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+$/i
const LINE_BREAK = /[\r\n]/

export interface ContactDetails {
  name: string
  email: string
  phone?: string | null
  subject: string
  message: string
}

export function isValidEmail(email: string) {
  return email.length <= CONTACT_LIMITS.email && EMAIL_FORMAT.test(email)
}

type ContactValidation = { ok: true; data: ContactDetails } | { ok: false; message: string }

export function validateContactInput(body: unknown): ContactValidation {
  const { name, email, subject, message, phone } = (body && typeof body === "object" ? body : {}) as Record<
    string,
    unknown
  >

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !subject.trim() ||
    !message.trim()
  ) {
    return { ok: false, message: "All fields are required" }
  }

  if (phone !== undefined && typeof phone !== "string") {
    return { ok: false, message: "Phone must be text" }
  }

  if (name.length > CONTACT_LIMITS.name) {
    return { ok: false, message: `Name must be ${CONTACT_LIMITS.name} characters or fewer` }
  }
  if (email.length > CONTACT_LIMITS.email) {
    return { ok: false, message: `Email must be ${CONTACT_LIMITS.email} characters or fewer` }
  }
  if (subject.length > CONTACT_LIMITS.subject) {
    return { ok: false, message: `Subject must be ${CONTACT_LIMITS.subject} characters or fewer` }
  }
  if (message.length > CONTACT_LIMITS.message) {
    return { ok: false, message: `Message must be ${CONTACT_LIMITS.message} characters or fewer` }
  }

  // These values reach email headers, so a line break could inject new ones.
  if (LINE_BREAK.test(name) || LINE_BREAK.test(email) || LINE_BREAK.test(subject)) {
    return { ok: false, message: "Name, email and subject must be a single line" }
  }

  if (!isValidEmail(email)) {
    return { ok: false, message: "Please enter a valid email address" }
  }

  return { ok: true, data: { name, email, phone, subject, message } }
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export function buildContactEmailHtml({ name, email, phone, subject, message }: ContactDetails) {
  const safeEmail = escapeHtml(email)

  return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            ${phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <strong>Message:</strong>
              <p style="margin-top: 10px; line-height: 1.6; color: #374151;">${escapeHtml(message).replace(/\r\n|\r|\n/g, "<br>")}</p>
            </div>
          </div>
          <p style="margin-top: 20px; color: #6b7280; font-size: 12px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `
}

export function buildContactEmailText({ name, email, phone, subject, message }: ContactDetails) {
  return `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || "not provided"}
Subject: ${subject}

Message:
${message}
      `
}

// Keeps the newest part of the transcript when the conversation won't fit the message limit.
export function buildAiContactMessage(request: string, visitorEmail: string | undefined, transcript: string) {
  const intro = `A visitor asked the AI assistant to contact Abrham.\n\nVisitor request:\n${request}\n\n${
    visitorEmail ? `Visitor email: ${visitorEmail}` : "Visitor email: not provided"
  }\n\nConversation transcript:\n`
  const room = Math.max(CONTACT_LIMITS.message - intro.length, 0)

  return `${intro}${room > 0 ? transcript.slice(-room) : ""}`.slice(0, CONTACT_LIMITS.message)
}
