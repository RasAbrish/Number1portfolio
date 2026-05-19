"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Download, Mail, FolderKanban } from "lucide-react"
import SpaceBackground from "./space-background"
import ScrollDownIndicator from "./scroll-down-indicator"

const roles = [
  "Full Stack Developer",
  "TypeScript Developer",
  "Backend Developer",
  "Node.js Expert",
  "Next.js Enthusiast",
]

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-20 overflow-hidden">
      <SpaceBackground />

      <div className="container px-4 mx-auto text-center relative z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm text-primary text-sm font-medium shadow-sm pointer-events-auto"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Available for new opportunities
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-serif tracking-tight mb-4 text-foreground">
            Hi, I am <span className="text-primary italic">Abrham.</span>
          </h1>

          <div className="h-12 md:h-16 flex items-center justify-center mb-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-2xl md:text-4xl font-serif italic text-primary/80"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="pointer-events-auto mx-auto max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              <a
                href="#projects"
                className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm p-4 md:p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_16px_35px_-22px_hsl(var(--primary)/0.95)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.1] via-transparent to-transparent opacity-80" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Portfolio</p>
                    <p className="text-base md:text-lg font-semibold text-foreground">Explore My Work</p>
                  </div>
                  <div className="rounded-xl border border-primary/30 bg-primary/10 p-2 text-primary">
                    <FolderKanban className="h-4 w-4" />
                  </div>
                </div>
              </a>

              <a
                href="#contact"
                className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm p-4 md:p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_16px_35px_-22px_hsl(var(--primary)/0.95)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent opacity-80" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Contact</p>
                    <p className="text-base md:text-lg font-semibold text-foreground">Get in Touch</p>
                  </div>
                  <div className="rounded-xl border border-primary/30 bg-primary/10 p-2 text-primary">
                    <Mail className="h-4 w-4" />
                  </div>
                </div>
              </a>

              <a
                href="/Abrham-Ababu-CV.pdf"
                download
                className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm p-4 md:p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_16px_35px_-22px_hsl(var(--primary)/0.95)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent opacity-80" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Resume</p>
                    <p className="text-base md:text-lg font-semibold text-foreground">Download CV</p>
                  </div>
                  <div className="rounded-xl border border-primary/30 bg-primary/10 p-2 text-primary flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ScrollDownIndicator />
      </div>
    </section>
  )
}
