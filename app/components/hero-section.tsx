"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
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
          {/* Status Badge */}
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

          {/* Name */}
          <h1 className="text-5xl md:text-8xl font-serif tracking-tight mb-4 text-foreground">
            Hi, I am{" "}
            <span className="text-primary italic">Abrham.</span>
          </h1>

          {/* Cycling role */}
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

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center pointer-events-auto">
            <Button
              size="lg"
              className="rounded-full px-10 py-6 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="#projects">Explore My Work</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-10 py-6 text-base font-medium border-border bg-background/60 backdrop-blur-sm hover:bg-muted transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ScrollDownIndicator />
      </div>
    </section>
  )
}
