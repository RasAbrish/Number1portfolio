"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "motion/react"
import { person, stats } from "@/lib/data"

const HeroThree = dynamic(() => import("./hero-three"), { ssr: false })

/** Types a string forward, holds, deletes, then hands off to the next one. */
function useTypedCycle(words: string[], typeMs = 55, holdMs = 1700) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text.length < word.length) {
      timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), typeMs)
    } else if (!deleting && text.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), holdMs)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(word.slice(0, text.length - 1)), typeMs / 2)
    } else {
      timeout = setTimeout(() => {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      }, 240)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeMs, holdMs])

  return text
}

const bootLines = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: "abrham — full stack developer · addis ababa" },
  { prompt: true, text: "status --check" },
  { prompt: false, text: "● online — available for new opportunities" },
]

function BootSequence({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (visible >= bootLines.length) {
      const t = setTimeout(onDone, 300)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 400 : 520)
    return () => clearTimeout(t)
  }, [visible, onDone])

  return (
    <div className="space-y-1.5 font-mono text-xs md:text-sm">
      {bootLines.slice(0, visible).map((line, i) => (
        <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="leading-relaxed">
          {line.prompt ? (
            <>
              <span className="text-primary">❯</span> <span className="text-foreground/90">{line.text}</span>
            </>
          ) : (
            <span className={line.text.startsWith("●") ? "text-primary" : "text-muted-foreground"}>{line.text}</span>
          )}
        </motion.p>
      ))}
      {visible < bootLines.length && <span className="inline-block h-3.5 w-2 bg-primary caret-blink" />}
    </div>
  )
}

export default function TerminalHero() {
  const [booted, setBooted] = useState(false)
  const role = useTypedCycle(person.roles)

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20 pb-16 scanlines">
      <HeroThree />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.35fr,1fr]">
          {/* Identity block */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-primary/80"
            >
              {"// abrham.os — v2.0 — engineered in addis ababa"}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.3, delay: 0.2 }}
              className="font-serif text-6xl leading-[0.95] tracking-tight md:text-8xl lg:text-9xl"
            >
              {person.firstName}
              <br />
              <span className="text-luxe italic pr-2">{person.lastName}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex items-center gap-3 font-mono text-base md:text-xl"
            >
              <span className="text-primary">❯</span>
              <span className="text-foreground/90">{role}</span>
              <span className="inline-block h-5 w-2.5 bg-primary caret-blink md:h-6" />
            </motion.div>

            {/* Command CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-md border border-primary/50 bg-primary/10 px-6 py-3 font-mono text-sm text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_-8px_hsl(var(--primary))]"
              >
                <span className="opacity-60">$</span> open ./projects
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-6 py-3 font-mono text-sm text-foreground/90 transition-all duration-300 hover:border-primary/50 hover:text-primary"
              >
                <span className="opacity-60">$</span> contact --send
              </a>
            </motion.div>

            {/* Stats readout */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-12 flex flex-wrap gap-x-10 gap-y-4"
            >
              {stats.map((s) => (
                <div key={s.label} className="font-mono">
                  <p className="text-3xl text-luxe md:text-4xl">{s.value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Boot terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -6 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.25, delay: 0.4 }}
            className="hidden lg:block"
            style={{ perspective: 1000 }}
          >
            <div className="os-window glow-gold">
              <div className="os-window-bar">
                <span className="os-dot" />
                <span className="os-dot" />
                <span className="os-dot" />
                <span className="ml-3 font-mono text-[11px] tracking-widest text-muted-foreground">
                  {person.handle}:~$
                </span>
              </div>
              <div className="min-h-[180px] p-5">
                <BootSequence onDone={() => setBooted(true)} />
                <AnimatePresence>
                  {booted && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-1.5 font-mono text-xs md:text-sm">
                      <p>
                        <span className="text-primary">❯</span>{" "}
                        <span className="text-foreground/90">ls ./highlights</span>
                      </p>
                      <p className="text-muted-foreground">
                        safaricom-talent-cloud/ <span className="text-primary">★2nd-place</span> · enterprise-erp/ ·
                        cgpa-3.85
                      </p>
                      <p>
                        <span className="text-primary">❯</span> <span className="inline-block h-3.5 w-2 translate-y-0.5 bg-primary caret-blink" />
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary"
      >
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="block">
          ▼ scroll --down
        </motion.span>
      </motion.a>
    </section>
  )
}
