"use client"

import { motion } from "motion/react"
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react"
import ContactForm from "../../contact-form"
import { person } from "@/lib/data"
import { SectionHeading } from "./about-code"

export default function TerminalContact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <SectionHeading
          index="07"
          command="$ contact --new-message"
          title={
            <>
              Get in <span className="text-luxe italic pr-1">Touch</span>
            </>
          }
        />

        <div className="mx-auto grid max-w-4xl gap-5 lg:grid-cols-[1fr,1.25fr] lg:items-stretch">
          {/* Connection info terminal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="os-window flex flex-col"
          >
            <div className="os-window-bar">
              <span className="os-dot" />
              <span className="os-dot" />
              <span className="os-dot" />
              <span className="ml-3 font-mono text-[11px] tracking-widest text-muted-foreground">
                connection — info
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between p-5 font-mono text-sm">
              <div className="space-y-4">
                <a href={`mailto:${person.email}`} className="group flex items-center gap-3 transition-colors hover:text-primary">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">email</span>
                    <span className="block truncate text-foreground/90 group-hover:text-primary">{person.email}</span>
                  </span>
                </a>

                <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="group flex items-center gap-3 transition-colors hover:text-primary">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">phone</span>
                    <span className="block truncate text-foreground/90 group-hover:text-primary">{person.phone}</span>
                  </span>
                </a>

                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">location</span>
                    <span className="block text-foreground/90">{person.location}</span>
                  </span>
                </div>

                <div className="rounded-md border border-border/70 bg-background/50 p-3.5 text-xs leading-relaxed text-muted-foreground">
                  Have a project in mind? Send a message — I usually reply within a day.
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  available for work
                </span>
                <span className="flex items-center gap-1.5">
                  <a
                    href={person.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <Github className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={person.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={person.socials.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </a>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Message composer */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="os-window"
          >
            <div className="os-window-bar">
              <span className="os-dot" />
              <span className="os-dot" />
              <span className="os-dot" />
              <span className="ml-3 font-mono text-[11px] tracking-widest text-muted-foreground">
                send-message --to {person.handle}
              </span>
            </div>
            <div className="p-5">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
