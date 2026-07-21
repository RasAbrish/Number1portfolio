"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Bot, RotateCcw, Send, Sparkles, X } from "lucide-react"

interface Msg {
  role: "user" | "assistant"
  content: string
}

interface PendingContact {
  request: string
  transcript: Msg[]
}

const SUGGESTIONS = [
  "What's Abrham's tech stack?",
  "Tell me about the PTGR project",
  "Tell Abrham I want to build a platform",
  "Where has he worked?",
]

const GREETING =
  "Hi — I'm Abrham's AI assistant, trained on his CV and portfolio at abrhamababu.pro.et. Ask me about his experience, projects, skills, or how to reach him."

export default function AiChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Msg[]>([])
  const [streaming, setStreaming] = useState(false)
  const [pendingContact, setPendingContact] = useState<PendingContact | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  function clearChat() {
    setMessages([])
    setInput("")
    setPendingContact(null)
    inputRef.current?.focus()
  }

  function isAffirmative(text: string) {
    return /^(yes|yeah|yep|sure|ok|okay|send|please send|do it|confirm)\b/i.test(text.trim())
  }

  function isNegative(text: string) {
    return /^(no|nope|cancel|don't|dont|stop|not now)\b/i.test(text.trim())
  }

  function hasContactIntent(text: string) {
    const normalized = text.toLowerCase()
    if (/how\s+(can\s+i\s+)?(do\s+i\s+)?contact/.test(normalized)) return false
    if (/\b(tell me|what|which|show|list|explain|describe)\b.*\b(project|projects|work|experience|stack)\b/.test(normalized)) {
      return false
    }

    const directContact = /\b(contact|email|mail|send|hire|hiring|collaborate|collaboration|proposal|quote|quotation|work with|reach abrham)\b/.test(
      normalized,
    )
    const visitorRequest = /\b(i|we|our company|my company)\b.*\b(want|need|would like|am looking|are looking|plan)\b.*\b(build|create|develop|hire|contact|email|website|app|platform|project)\b/.test(
      normalized,
    )
    return directContact || visitorRequest
  }

  function extractEmail(text: string) {
    return text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0]
  }

  async function sendContactEmail(contact: PendingContact, confirmation: string) {
    const visitorEmail = extractEmail(`${contact.request} ${confirmation}`)
    const transcript = [...contact.transcript, { role: "user" as const, content: confirmation }]
      .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
      .join("\n\n")

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: visitorEmail ? "Portfolio AI visitor" : "Portfolio AI visitor (no reply email provided)",
        email: visitorEmail ?? "abrhambest7@gmail.com",
        subject: "Portfolio AI contact request",
        message: `A visitor asked the AI assistant to contact Abrham.\n\nVisitor request:\n${contact.request}\n\n${
          visitorEmail ? `Visitor email: ${visitorEmail}` : "Visitor email: not provided"
        }\n\nConversation transcript:\n${transcript}`,
      }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => null)
      throw new Error(data?.message ?? "Email could not be sent.")
    }
  }

  async function send(text: string) {
    const question = text.trim()
    if (!question || streaming) return

    const next: Msg[] = [...messages, { role: "user", content: question }]
    setMessages(next)
    setInput("")

    if (pendingContact) {
      if (isNegative(question)) {
        setPendingContact(null)
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              "No problem. I will keep it here, and you can still use the Contact section or email Abrham directly at abrhambest7@gmail.com.",
          },
        ])
        return
      }

      if (isAffirmative(question)) {
        setStreaming(true)
        setMessages((m) => [...m, { role: "assistant", content: "Sending this to Abrham's email now..." }])
        try {
          await sendContactEmail(pendingContact, question)
          setPendingContact(null)
          setMessages((m) => {
            const copy = [...m]
            copy[copy.length - 1] = {
              role: "assistant",
              content:
                "Done. I sent your message to Abrham at abrhambest7@gmail.com. If you included your email, he can reply directly.",
            }
            return copy
          })
        } catch {
          setMessages((m) => {
            const copy = [...m]
            copy[copy.length - 1] = {
              role: "assistant",
              content:
                "I could not send it right now. Please use the Contact section or email Abrham directly at abrhambest7@gmail.com.",
            }
            return copy
          })
        } finally {
          setStreaming(false)
        }
        return
      }

      setPendingContact({ request: question, transcript: next })
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Got it. Would you like me to send this updated message to Abrham's email now? Reply yes to send, or no to keep chatting. Add your email if you want him to reply.",
        },
      ])
      return
    }

    if (hasContactIntent(question)) {
      setPendingContact({ request: question, transcript: next })
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "This sounds like something Abrham should see. Would you like me to send it to Abrham's email now? Reply yes to send, or no to keep chatting. Add your email if you want him to reply.",
        },
      ])
      return
    }

    setStreaming(true)
    // Placeholder assistant message that we stream into.
    setMessages((m) => [...m, { role: "assistant", content: "" }])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      })

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null)
        const msg = data?.error ?? "The assistant is unavailable right now."
        setMessages((m) => {
          const copy = [...m]
          copy[copy.length - 1] = { role: "assistant", content: msg }
          return copy
        })
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ""
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setMessages((m) => {
          const copy = [...m]
          copy[copy.length - 1] = { role: "assistant", content: acc }
          return copy
        })
      }
    } catch {
      setMessages((m) => {
        const copy = [...m]
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Connection error. Please try again or email abrhambest7@gmail.com.",
        }
        return copy
      })
    } finally {
      setStreaming(false)
    }
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", bounce: 0.4 }}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full border border-primary/40 bg-card/80 px-4 py-3 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.6)] backdrop-blur-md transition-colors hover:border-primary"
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
          {open ? <X className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
          {!open && (
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
          )}
        </span>
        <span className="hidden text-left sm:block">
          <span className="block font-serif text-sm leading-tight text-foreground">Ask AI</span>
          <span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            trained on my CV
          </span>
        </span>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
            className="os-window fixed bottom-24 right-5 z-50 flex h-[560px] max-h-[80vh] w-[calc(100vw-2.5rem)] max-w-[400px] flex-col overflow-hidden shadow-2xl"
          >
            <div className="os-window-bar">
              <span className="os-dot" />
              <span className="os-dot" />
              <span className="os-dot" />
              <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" /> abrham-assistant
              </span>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={clearChat}
                  disabled={streaming}
                  className="ml-auto inline-flex items-center gap-1 rounded border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
                >
                  <RotateCcw className="h-3 w-3" /> clear
                </button>
              )}
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
              <div className="flex gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <p className="rounded-lg rounded-tl-none bg-muted/60 px-3 py-2 text-sm leading-relaxed text-foreground/85">
                  {GREETING}
                </p>
              </div>

              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pl-9">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-left font-mono text-[11px] text-primary/90 transition-colors hover:border-primary hover:bg-primary/10"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <p className="max-w-[85%] rounded-lg rounded-tr-none bg-primary px-3 py-2 text-sm leading-relaxed text-primary-foreground">
                      {m.content}
                    </p>
                  </div>
                ) : (
                  <div key={i} className="flex gap-2.5">
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <p className="max-w-[85%] whitespace-pre-wrap rounded-lg rounded-tl-none bg-muted/60 px-3 py-2 text-sm leading-relaxed text-foreground/85">
                      {m.content || (streaming && i === messages.length - 1 ? <TypingDots /> : "")}
                    </p>
                  </div>
                ),
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-border/60 bg-background/60 p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Abrham…"
                className="min-w-0 flex-1 bg-transparent px-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={!input.trim() || streaming}
                aria-label="Send"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-primary/70"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  )
}
