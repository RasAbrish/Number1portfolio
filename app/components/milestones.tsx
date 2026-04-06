"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { GraduationCap, Trophy, Award, Briefcase, Building2, Monitor } from "lucide-react"

const milestones = [
  {
    num: "01",
    year: "Start",
    title: "Joined Hope University",
    description: "Began my Bachelor's in Computer Science — where curiosity became code, and learning became a way of life.",
    icon: GraduationCap,
  },
  {
    num: "02",
    year: "2023",
    title: "University Hackathon Winner",
    description: "Won the in-house hackathon at Hope University — building fast, thinking creatively, and proving I could compete.",
    icon: Trophy,
  },
  {
    num: "03",
    year: "2025",
    title: "Safaricom Cloud Talent — 2nd Place",
    description: "Competed and claimed 2nd place with the Fuel Finder app, recognized for cloud innovation at a national level.",
    icon: Award,
  },
  {
    num: "04",
    year: "2025–2026",
    title: "Enterprise SaaS & Systems Developer",
    description: "Joined Atlas Computer Technology and others, delivering SaaS products, system architecture, and enterprise-grade solutions.",
    icon: Monitor,
  },
  {
    num: "05",
    year: "2026",
    title: "BSc Computer Science — CGPA 3.85",
    description: "Graduated with honors from Hope University with a CGPA of 3.85, the result of discipline, creativity, and determination.",
    icon: Building2,
  },
  {
    num: "06",
    year: "Now",
    title: "Working with Local & Global Companies",
    description: "Currently collaborating with several local and international organizations, shipping high-performance software that makes a real impact.",
    icon: Briefcase,
  },
]

export default function Milestones() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 })

  return (
    <section id="milestones" className="py-32 bg-background relative overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container px-4 mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-center mb-24"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4 opacity-70">Timeline</p>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-5">
            My <span className="text-primary italic">Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Six defining moments that shaped who I am as a developer and professional.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative" ref={containerRef}>
          {/* Background line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
          {/* Scroll-driven primary line */}
          <motion.div
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-primary md:-translate-x-1/2 origin-top"
            style={{ scaleY }}
          />

          <div className="space-y-12">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0
              const Icon = m.icon

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, x: isLeft ? -100 : 100 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 20,
                    restDelta: 0.001
                  }}
                  className={`relative flex items-center flex-row ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Dot on the line */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 250, delay: 0.15 }}
                    className="absolute left-[13px] md:left-1/2 md:-translate-x-1/2 w-[15px] h-[15px] rounded-full bg-background border-2 border-primary z-10 flex items-center justify-center"
                  >
                    <div className="w-[5px] h-[5px] rounded-full bg-primary" />
                  </motion.div>

                  {/* Card */}
                  <div className={`ml-12 md:ml-0 md:w-[46%] ${isLeft ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative overflow-hidden group rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-500 cursor-default"
                    >
                      {/* Top accent line */}
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="p-7">
                        {/* Header row */}
                        <div className="flex items-start justify-between gap-4 mb-5">
                          {/* Icon */}
                          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>

                          {/* Number + year */}
                          <div className="text-right">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">
                              {m.year}
                            </span>
                            <span className="text-3xl font-serif text-primary/20 leading-none select-none">
                              {m.num}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 leading-snug">
                          {m.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{m.description}</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
