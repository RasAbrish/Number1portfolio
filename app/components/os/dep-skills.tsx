"use client"

import Image from "next/image"
import { toolsRowOne, toolsRowTwo, type Tool } from "@/lib/data"
import { SectionHeading } from "./about-code"

function DepChip({ tool }: { tool: Tool }) {
  return (
    <div
      className="group flex flex-shrink-0 items-center gap-2.5 rounded-md border border-border/70 bg-card/50 px-4 py-2.5 font-mono text-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
      title={tool.name}
    >
      <div className="relative h-5 w-5">
        <Image
          src={tool.icon || "/placeholder.svg"}
          alt={tool.name}
          fill
          className="object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
          unoptimized
        />
      </div>
      <span className="text-muted-foreground transition-colors group-hover:text-foreground">
        <span className="text-primary/70">"</span>
        {tool.name.toLowerCase().replace(/[\s.]/g, "-")}
        <span className="text-primary/70">"</span>
        <span className="text-muted-foreground/50">: </span>
        <span className="text-primary/80">"^prod"</span>
      </span>
    </div>
  )
}

function MarqueeRow({ tools, reverse }: { tools: Tool[]; reverse?: boolean }) {
  const doubled = [...tools, ...tools]
  return (
    <div className="overflow-hidden py-2.5">
      <div className={`flex w-max gap-3 ${reverse ? "animate-scroll-reverse" : "animate-scroll"}`}>
        {doubled.map((tool, i) => (
          <DepChip key={`${tool.name}-${i}`} tool={tool} />
        ))}
      </div>
    </div>
  )
}

export default function DepSkills() {
  return (
    <section id="skills" className="relative overflow-hidden border-y border-border/50 py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.04),transparent_60%)]" />

      <div className="container relative z-10 mx-auto px-4">
        <SectionHeading
          index="05"
          command="$ cat package.json"
          title={
            <>
              Technology <span className="text-luxe italic pr-1">Stack</span>
            </>
          }
        />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <p className="container mx-auto mb-2 px-4 font-mono text-xs text-muted-foreground/60">{"{"}</p>
        <MarqueeRow tools={toolsRowOne} />
        <MarqueeRow tools={toolsRowTwo} reverse />
        <p className="container mx-auto mt-2 px-4 font-mono text-xs text-muted-foreground/60">{"}"}</p>
      </div>

      <p className="container mx-auto mt-8 px-4 text-center font-mono text-xs text-muted-foreground">
        <span className="text-primary">✓</span> {toolsRowOne.length + toolsRowTwo.length} technologies used across
        production full-stack products
      </p>
    </section>
  )
}
