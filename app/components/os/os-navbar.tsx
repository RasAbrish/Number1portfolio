"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "motion/react"
import { Download, Menu, Moon, Sun, X } from "lucide-react"
import { person } from "@/lib/data"

const navItems = [
  { id: "home", label: "home", num: "01" },
  { id: "about", label: "about", num: "02" },
  { id: "journey", label: "journey", num: "03" },
  { id: "projects", label: "projects", num: "04" },
  { id: "skills", label: "skills", num: "05" },
  { id: "contact", label: "contact", num: "06" },
]

export default function OsNavbar() {
  const [active, setActive] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleTheme = () => {
    const dark = document.documentElement.classList.toggle("dark")
    setIsDark(dark)
  }

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 })

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = document.querySelectorAll<HTMLElement>("section[id]")
      const y = window.scrollY + 120
      let current = "home"
      sections.forEach((s) => {
        if (y >= s.offsetTop && y < s.offsetTop + s.clientHeight) current = s.id
      })
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Wordmark as a shell prompt */}
          <button onClick={() => go("home")} className="flex items-center gap-2.5 font-mono text-sm">
            <span className="flex gap-1.5">
              <span className="os-dot" />
              <span className="os-dot" />
              <span className="os-dot" />
            </span>
            <span className="ml-1 text-foreground/90">
              {person.handle}
              <span className="text-primary">:~$</span>
            </span>
            <span className="inline-block h-3.5 w-2 bg-primary caret-blink" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`group rounded px-3 py-1.5 font-mono text-xs transition-colors duration-200 ${
                  active === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={`mr-1 text-[9px] ${active === item.id ? "text-primary/60" : "text-muted-foreground/40"}`}>
                  {item.num}
                </span>
                {active === item.id ? `[${item.label}]` : item.label}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className="ml-2 flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              title="Toggle dark/light mode"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <a
              href={person.cv}
              download="Abrham-Ababu-CV.pdf"
              className="ml-1.5 inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-3.5 py-1.5 font-mono text-xs text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              <Download className="h-3 w-3" />
              cv.pdf
            </a>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground"
              title="Toggle dark/light mode"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={() => setOpen(!open)} className="p-2 text-foreground" aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="flex flex-col gap-1 border-t border-border pb-4 pt-2 md:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`rounded px-3 py-2.5 text-left font-mono text-sm ${
                  active === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
              >
                <span className="mr-2 text-[10px] opacity-50">{item.num}</span>
                {item.label}
              </button>
            ))}
            <a
              href={person.cv}
              download="Abrham-Ababu-CV.pdf"
              className="mt-1 inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-3 py-2.5 font-mono text-sm text-primary"
            >
              <Download className="h-3.5 w-3.5" />
              download cv.pdf
            </a>
          </nav>
        )}
      </div>

      {/* Compile-style scroll progress */}
      <motion.div className="h-px origin-left bg-gradient-to-r from-primary/40 via-primary to-primary/40" style={{ scaleX: progress }} />
    </header>
  )
}
