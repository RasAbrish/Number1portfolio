function clean(value: string, maxLength: number) {
  const text = value.replace(/\s+/g, " ").trim()
  return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text
}

// Covers schemes, www and bare domains (with unicode and full-width dots) and raw IPs.
// Over-matching is fine here: "Next.js" reading as [link] is better than a clickable link.
const LINK =
  /\b[a-z][a-z0-9+.-]*:\/\/\S*|(?:[\p{L}\p{N}_-]+[.。．｡])+\p{L}{2,}(?::\d+)?(?:[/?#]\S*)?|(?:\d{1,3}\.){3}\d{1,3}\S*/giu

// Format characters are invisible, so they could split a link past the pattern.
function withoutLinks(value: string) {
  return value.replace(/\p{Cf}/gu, "").replace(LINK, "[link]")
}

// The thank-you goes to a number typed into a public form, so only a single word of
// the visitor's input is used. Otherwise the form could send links to anyone from your SIM.
function firstName(name: string) {
  return name.trim().match(/^[\p{L}'-]{1,20}/u)?.[0] || "there"
}

export function buildThankYouSms(name: string) {
  return `Hi ${firstName(name)}, thank you for contacting me through my portfolio. I received your message and will reply soon. - Abrham`
}

export function buildOwnerAlertSms(details: { name: string; email: string; phone?: string | null; subject: string }) {
  return [
    "New portfolio contact",
    `From: ${clean(withoutLinks(details.name), 40)}`,
    details.phone ? `Phone: ${details.phone}` : null,
    `Email: ${clean(details.email, 60)}`,
    `Subject: ${clean(withoutLinks(details.subject), 60)}`,
  ]
    .filter(Boolean)
    .join("\n")
}
