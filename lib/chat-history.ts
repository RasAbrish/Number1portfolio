// Keep these within what /api/chat accepts.
export const MAX_INPUT_LENGTH = 2000
const MAX_SENT_MESSAGES = 12
const MAX_SENT_MESSAGE_LENGTH = 4000
const MAX_BODY_BYTES = 60 * 1024

export interface ChatHistoryMessage {
  role: "user" | "assistant"
  content: string
}

// Measured in bytes, not characters: Amharic takes three bytes per character in UTF-8.
export function buildChatRequestBody(messages: ChatHistoryMessage[]) {
  let kept = messages
    .slice(-MAX_SENT_MESSAGES)
    .map((m) => ({ ...m, content: m.content.slice(0, MAX_SENT_MESSAGE_LENGTH) }))
  let body = JSON.stringify({ messages: kept })

  while (kept.length > 1 && new TextEncoder().encode(body).length > MAX_BODY_BYTES) {
    kept = kept.slice(1)
    body = JSON.stringify({ messages: kept })
  }

  return body
}
