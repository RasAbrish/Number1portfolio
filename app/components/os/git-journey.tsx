"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring } from "motion/react"
import { milestones } from "@/lib/data"
import { SectionHeading } from "./about-code"

/** Career timeline rendered as a git commit graph. */
export default function GitJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })

  // Newest first, like a real git log
  const log = [...milestones].reverse()

  return (
    <section id="journey" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <SectionHeading
          index="03"
          command="$ git log --career"
          title={
            <>
              My Professional <span className="text-luxe italic pr-1">Journey</span>
            </>
          }
        />

        <div className="mx-auto max-w-3xl">
          <div className="os-window">
            <div className="os-window-bar">
              <span className="os-dot" />
              <span className="os-dot" />
              <span className="os-dot" />
              <span className="ml-3 font-mono text-[11px] tracking-widest text-muted-foreground">
                ~/career — git log
              </span>
              <span className="ml-auto font-mono text-[10px] text-primary/70">{milestones.length} commits</span>
            </div>

            <div ref={containerRef} className="relative p-6 md:p-8">
              {/* Graph rail */}
              <div className="absolute bottom-8 left-[34px] top-8 w-px bg-border md:left-[42px]" />
              <motion.div
                className="absolute bottom-8 left-[34px] top-8 w-px origin-top bg-gradient-to-b from-primary via-primary to-primary/20 md:left-[42px]"
                style={{ scaleY: progress }}
              />

              <div className="space-y-8">
                {log.map((m, i) => (
                  <motion.article
                    key={m.hash}
                    initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                    className="group relative pl-12 md:pl-16"
                  >
                    {/* Commit node */}
                    <span
                      className={`absolute left-[30px] top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full transition-all duration-300 md:left-[38px] ${
                        m.hash === "HEAD"
                          ? "bg-primary shadow-[0_0_14px_hsl(var(--primary))]"
                          : "border border-primary/60 bg-background group-hover:bg-primary"
                      }`}
                    />

                    {/* Commit header line */}
                    <p className="font-mono text-xs leading-relaxed md:text-sm">
                      <span className="text-luxe">{m.hash}</span>{" "}
                      {m.branch && (
                        <span className="text-muted-foreground">
                          (<span className="text-primary/80">{m.branch}</span>)
                        </span>
                      )}{" "}
                      <span className="ml-1 rounded border border-primary/25 bg-primary/10 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.15em] text-primary">
                        {m.year}
                      </span>
                    </p>

                    <h3 className="mt-2 font-serif text-xl tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary md:text-2xl">
                      {m.title}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">{m.description}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
