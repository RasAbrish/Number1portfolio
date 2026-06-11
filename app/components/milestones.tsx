"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring } from "motion/react"
import { GraduationCap, Trophy, Award, Briefcase, Building2, Monitor } from "lucide-react"

const milestones = [
  {
    num: "01",
    year: "Start",
    title: "Joined Hope University",
    description: "Began my Bachelor's in Computer Science where curiosity became code, and learning became a way of life.",
    icon: GraduationCap,
  },
  {
    num: "02",
    year: "2023",
    title: "University Hackathon Winner",
    description: "Won the in-house hackathon at Hope University by building fast, thinking creatively, and proving I could compete.",
    icon: Trophy,
  },
  {
    num: "03",
    year: "2025",
    title: "Safaricom Cloud Talent - 2nd Place",
    description: "Competed and claimed 2nd place with the Fuel Finder app, recognized for cloud innovation at a national level.",
    icon: Award,
  },
  {
    num: "04",
    year: "2025-2026",
    title: "Enterprise SaaS & Systems Developer",
    description: "Joined Atlas Computer Technology and others, delivering SaaS products, system architecture, and enterprise-grade solutions.",
    icon: Monitor,
  },
  {
    num: "05",
    year: "2026",
    title: "BSc Computer Science - CGPA 3.85",
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
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })

  return (
    <section id="milestones" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4 opacity-75">Timeline</p>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-5">
            My <span className="text-luxe italic pr-1">Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Six defining moments that shaped who I am as a developer and professional.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative mx-auto max-w-5xl">
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-border/70 md:-translate-x-1/2" />
          <motion.div
            className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary to-primary/30 md:-translate-x-1/2 origin-top"
            style={{ scaleY: progress }}
          />

          <div className="space-y-7 md:space-y-10">
            {milestones.map((m, i) => {
              const Icon = m.icon
              const isEven = i % 2 === 0

              return (
                <motion.article
                  key={m.num}
                  initial={{ opacity: 0, y: 34, x: isEven ? -120 : 120, filter: "blur(8px)", scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)", scale: 1 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                  className={`relative flex items-stretch ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-4 top-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-background shadow-[0_0_0_5px_hsl(var(--background))] md:left-1/2 md:-translate-x-1/2" />

                  <div className={`ml-10 md:ml-0 md:w-[46%] ${isEven ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 250, damping: 20 }}
                      className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/70 backdrop-blur-sm"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent opacity-70" />
                      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

                      <div className="relative p-6 md:p-7">
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                            {m.year}
                          </span>
                          <span className="text-3xl font-serif text-primary/20 leading-none select-none">{m.num}</span>
                        </div>

                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight">{m.title}</h3>
                        </div>

                        <p className="text-sm md:text-[15px] leading-relaxed text-muted-foreground">{m.description}</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
