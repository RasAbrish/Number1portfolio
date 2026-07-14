"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { person, stats } from "@/lib/data"
import { CountUp } from "./count-up"

/** Syntax-colored tokens for the developer.ts editor pane */
const T = {
  kw: "text-primary/90 italic",
  type: "text-luxe",
  key: "text-foreground/90",
  str: "text-primary/75",
  punc: "text-muted-foreground/60",
  comment: "text-muted-foreground/50 italic",
}

function SectionHeading({ index, command, title }: { index: string; command: string; title: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-14 text-center"
    >
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-primary/80">
        <span className="opacity-50">{index} ·</span> {command}
      </p>
      <h2 className="font-serif text-4xl tracking-tight md:text-6xl">{title}</h2>
    </motion.div>
  )
}

export { SectionHeading }

export default function AboutCode() {
  return (
    <section id="about" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <SectionHeading
          index="02"
          command="$ cat ./developer.ts"
          title={
            <>
              The <span className="text-luxe italic pr-1">Source</span> Behind the Work
            </>
          }
        />

        <div className="mx-auto grid max-w-5xl items-stretch gap-8 lg:grid-cols-[1fr,1.4fr]">
          {/* Photo rendered as an asset preview window */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.25 }}
          >
            <div className="os-window glow-gold h-full">
              <div className="os-window-bar">
                <span className="os-dot" />
                <span className="os-dot" />
                <span className="os-dot" />
                <span className="ml-3 font-mono text-[11px] tracking-widest text-muted-foreground">
                  profile-photo.png — preview
                </span>
              </div>
              <div className="relative scanlines">
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={560}
                  height={746}
                  className="h-full w-full object-cover saturate-[0.85] transition-all duration-700 hover:saturate-100"
                />
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-background/80 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
                  <span>RGB · 3:4</span>
                  <span className="text-primary">{person.location}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* developer.ts editor pane */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.25, delay: 0.1 }}
          >
            <div className="os-window h-full">
              <div className="os-window-bar">
                <span className="os-dot" />
                <span className="os-dot" />
                <span className="os-dot" />
                <span className="ml-3 font-mono text-[11px] tracking-widest text-muted-foreground">developer.ts</span>
                <span className="ml-auto font-mono text-[10px] text-primary/60">● saved</span>
              </div>
              <div className="overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.9] md:text-sm">
                <p>
                  <span className={T.comment}>{"/** "}{person.about[0]}{" */"}</span>
                </p>
                <p className="mt-2">
                  <span className={T.kw}>const</span> <span className={T.key}>abrham</span>
                  <span className={T.punc}>:</span> <span className={T.type}>Developer</span>{" "}
                  <span className={T.punc}>= {"{"}</span>
                </p>
                <div className="pl-5">
                  <p>
                    <span className={T.key}>name</span>
                    <span className={T.punc}>:</span> <span className={T.str}>"{person.name}"</span>
                    <span className={T.punc}>,</span>
                  </p>
                  <p>
                    <span className={T.key}>base</span>
                    <span className={T.punc}>:</span> <span className={T.str}>"{person.location}"</span>
                    <span className={T.punc}>,</span>
                  </p>
                  <p>
                    <span className={T.key}>focus</span>
                    <span className={T.punc}>:</span>{" "}
                    <span className={T.punc}>[</span>
                    <span className={T.str}>"clean architecture"</span>
                    <span className={T.punc}>,</span> <span className={T.str}>"delivery speed"</span>
                    <span className={T.punc}>,</span> <span className={T.str}>"business impact"</span>
                    <span className={T.punc}>]</span>
                    <span className={T.punc}>,</span>
                  </p>
                  <p>
                    <span className={T.key}>experience</span>
                    <span className={T.punc}>: {"{"}</span>
                  </p>
                  <div className="pl-5">
                    <p>
                      <span className={T.key}>talentCloud</span>
                      <span className={T.punc}>:</span> <span className={T.str}>"Safaricom — 2nd place"</span>
                      <span className={T.punc}>,</span>
                    </p>
                    <p>
                      <span className={T.key}>enterprise</span>
                      <span className={T.punc}>:</span>{" "}
                      <span className={T.str}>"ERP, rental & agreement systems"</span>
                      <span className={T.punc}>,</span>
                    </p>
                    <p>
                      <span className={T.key}>production</span>
                      <span className={T.punc}>:</span>{" "}
                      <span className={T.str}>"websites for growing businesses"</span>
                      <span className={T.punc}>,</span>
                    </p>
                  </div>
                  <p>
                    <span className={T.punc}>{"},"}</span>
                  </p>
                  <p>
                    <span className={T.key}>available</span>
                    <span className={T.punc}>:</span> <span className="text-primary">true</span>
                    <span className={T.punc}>,</span>
                  </p>
                </div>
                <p>
                  <span className={T.punc}>{"}"}</span>
                </p>

                {/* Stats as exported constants */}
                <div className="mt-5 border-t border-border/60 pt-4">
                  {stats.map((s) => (
                    <p key={s.label}>
                      <span className={T.kw}>export const</span>{" "}
                      <span className={T.key}>{s.label.replace(/ /g, "_")}</span> <span className={T.punc}>=</span>{" "}
                      <CountUp value={s.value} className="text-luxe text-base" />
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
