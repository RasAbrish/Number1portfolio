"use client"

import { Github, Linkedin, Mail, Send } from "lucide-react"
import { person } from "@/lib/data"

/** IDE status-bar footer. */
export default function StatusFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center gap-6">
          <p className="text-center font-serif text-2xl tracking-tight md:text-3xl">
            Built with discipline. <span className="text-luxe italic pr-1">Shipped with pride.</span>
          </p>

          <div className="flex items-center gap-2">
            <a
              href={person.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={person.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${person.email}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={person.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Send className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="border-t border-border bg-card/60">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="flex items-center gap-4">
            <span className="text-primary">⎇ main</span>
            <span className="hidden sm:inline">✓ build passing</span>
            <span className="hidden md:inline">utf-8</span>
            <span className="hidden md:inline">typescript</span>
          </span>
          <span>
            © {year} {person.name} — all rights reserved
          </span>
        </div>
      </div>
    </footer>
  )
}
