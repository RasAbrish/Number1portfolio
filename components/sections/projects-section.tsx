"use client"

import type React from "react"

import type { ProjectCardProps } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { projects } from "@/data/projects"
import { SectionHeading } from "@/components/layout/section-heading"
import { MotionSection } from "@/components/layout/section"

interface ProjectsSectionProps {
  inView: boolean
  reference: React.RefObject<HTMLElement>
}

export function ProjectsSection({ inView, reference }: ProjectsSectionProps) {
  return (
    <MotionSection
      id="projects"
      ref={reference}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <SectionHeading title="" highlight="Projects" />
        <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              index={index}
              inView={inView}
              id={project.id}
            />
          ))}
        </div>
      </div>
    </MotionSection>
  )
}

function ProjectCard({ title, description, tags, index, inView, id }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-background/80 h-full">
        <CardContent className="p-6">
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full mb-4"></div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="mt-2 text-muted-foreground">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-3 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 transition-all duration-300"
              asChild
            >
              <Link href={`/projects/${id}`}>View Project</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
