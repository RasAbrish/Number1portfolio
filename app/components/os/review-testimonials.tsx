"use client"

import { motion } from "motion/react"
import { Check } from "lucide-react"
import { testimonials } from "@/lib/data"
import { SectionHeading } from "./about-code"

/** Testimonials rendered as approved pull-request reviews. */
export default function ReviewTestimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <SectionHeading
          index="06"
          command="$ gh pr review --list"
          title={
            <>
              What People <span className="text-luxe italic pr-1">Say</span>
            </>
          }
        />

        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
              className={`os-window group transition-all duration-500 hover:shadow-[0_0_40px_-15px_hsl(var(--primary)/0.4)] ${
                i === testimonials.length - 1 ? "md:col-span-2 md:mx-auto md:max-w-[calc(50%-0.625rem)]" : ""
              }`}
            >
              <div className="os-window-bar">
                <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
                  review #{String(i + 1).padStart(3, "0")} — collaboration.ts
                </span>
                <span className="ml-auto inline-flex items-center gap-1 rounded border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                  <Check className="h-3 w-3" /> approved
                </span>
              </div>

              <div className="p-5">
                <blockquote className="text-sm leading-relaxed text-foreground/85">
                  <span className="font-mono text-primary/50">{"// "}</span>
                  {t.content}
                </blockquote>

                <div className="mt-5 flex items-center gap-3.5 border-t border-border/60 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/30 bg-primary/10 font-serif text-lg text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-base tracking-tight text-foreground">{t.name}</h4>
                    <p className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      <span className="text-primary/80">{t.role}</span> @ {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
