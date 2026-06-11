"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowUpRight, Send } from "lucide-react"
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
            Hi, I am <span className="text-luxe italic pr-1">Abrham.</span>
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

          <div className="pointer-events-auto mx-auto max-w-xl">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:flex-nowrap">
              <a
                href="#projects"
                className="group inline-flex w-[180px] items-center justify-center gap-2 rounded-full border border-primary/35 bg-gradient-to-b from-primary/30 to-primary/15 px-5 py-2.5 text-sm font-semibold text-foreground shadow-[0_10px_30px_-18px_hsl(var(--primary)/0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:from-primary/40 hover:to-primary/20 hover:shadow-[0_16px_35px_-20px_hsl(var(--primary)/0.95)]"
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} />
              </a>
              <a
                href="#contact"
                className="group inline-flex w-[180px] items-center justify-center gap-2 rounded-full border border-border/80 bg-gradient-to-b from-card to-card/70 px-5 py-2.5 text-sm font-semibold text-foreground shadow-[0_10px_26px_-20px_black] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:from-card hover:to-card hover:shadow-[0_14px_30px_-20px_hsl(var(--primary)/0.65)]"
              >
                <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} />
                <span>Get in Touch</span>
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
