"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { projects, type Project } from "@/lib/data"
import { SectionHeading } from "./about-code"
import { Carousel } from "./carousel"

function RepoCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  // Pointer-driven 3D tilt
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 200, damping: 22 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 22 })

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.2, delay: (index % 2) * 0.1 }}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="os-window group h-full transition-shadow duration-500 hover:shadow-[0_0_50px_-15px_hsl(var(--primary)/0.5)]"
      >
        <div className="os-window-bar">
          <span className="os-dot" />
          <span className="os-dot" />
          <span className="os-dot" />
          <span className="ml-3 truncate font-mono text-[11px] tracking-wider text-muted-foreground">
            ~/projects/{project.slug}
          </span>
          <span className="ml-auto hidden font-mono text-[10px] text-primary/60 sm:block">public</span>
        </div>

        {/* Screenshot */}
        {project.image && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/9] overflow-hidden scanlines">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top saturate-[0.8] transition-all duration-700 group-hover:scale-[1.04] group-hover:saturate-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </a>
        )}

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-serif text-2xl tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                {project.title}
              </h3>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {project.company} · {project.role}
              </p>
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

          {/* Tags as language chips with a commit-stat bar */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded border border-primary/20 bg-primary/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary/90">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 flex h-1 overflow-hidden rounded-full bg-muted">
            {project.tags.map((tag, i) => (
              <div
                key={tag}
                className="h-full first:rounded-l-full last:rounded-r-full"
                style={{
                  width: `${100 / project.tags.length}%`,
                  background: `hsl(var(--primary) / ${0.9 - i * 0.18})`,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function RepoProjects() {
  // Featured projects lead the track; everything else follows. Adding a 40th
  // project just extends the carousel — the page height stays fixed.
  const ordered = [...projects].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))

  return (
    <section id="projects" className="relative overflow-hidden py-28">
      <div className="container relative z-10 mx-auto px-4">
        <SectionHeading
          index="04"
          command="$ ls ~/projects"
          title={
            <>
              Featured <span className="text-luxe italic pr-1">Projects</span>
            </>
          }
        />

        <div className="mx-auto max-w-5xl">
          <Carousel
            ariaLabel="Projects"
            autoPlay
            interval={4500}
            slideClassName="basis-full md:basis-[calc(50%-0.75rem)]"
            items={ordered.map((p, i) => (
              <RepoCard key={p.id} project={p} index={i} />
            ))}
          />
        </div>
      </div>
    </section>
  )
}
