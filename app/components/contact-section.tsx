"use client"

import { motion } from "motion/react"
import ContactForm from "../contact-form"
import { Mail, MapPin, Github, Linkedin, Send } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-background py-20 overflow-hidden">
      {/* Subtle grid backdrop so the section isn't pure white */}
      <div className="pointer-events-none absolute inset-0 bg-grid-fade opacity-80" aria-hidden />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" aria-hidden />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-primary">Contact</p>
          <h2 className="mb-3 text-3xl font-serif tracking-tight md:text-5xl">
            Get in <span className="text-luxe italic pr-1">Touch</span>
          </h2>
          <p className="mx-auto max-w-md text-sm text-muted-foreground">
            Have a project in mind? Send me a message — I usually reply within a day.
          </p>
        </motion.div>

        {/* Balanced two-column layout: both columns stretch to the same height */}
        <div className="mx-auto grid max-w-4xl gap-5 lg:grid-cols-2 lg:items-stretch">
          {/* Left: contact info card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm"
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">Let’s connect</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Reach me directly or drop a message on the right.
                </p>
              </div>

              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:abrhambest7@gmail.com"
                    className="group flex items-center gap-3 rounded-xl border border-border/70 bg-background/60 px-3.5 py-2.5 transition-colors hover:border-primary/40"
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                      <Mail className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Email</span>
                      <span className="block truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                        abrhambest7@gmail.com
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/60 px-3.5 py-2.5">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Location</span>
                      <span className="block text-sm font-medium text-foreground">Addis Ababa, Ethiopia</span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/70 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Available for work
              </div>
              <div className="flex items-center gap-1.5">
                <a
                  href="https://github.com/RasAbrish"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background/70 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Github className="h-3.5 w-3.5" strokeWidth={2.2} />
                </a>
                <a
                  href="https://www.linkedin.com/in/abrham-ababu-85a112297/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background/70 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Linkedin className="h-3.5 w-3.5" strokeWidth={2.2} />
                </a>
                <a
                  href="https://t.me/RASAbrish"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background/70 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Send className="h-3.5 w-3.5" strokeWidth={2.2} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="h-full rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
