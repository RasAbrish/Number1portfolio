"use client"

import { useState } from "react"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  link: string
  company?: string
  role?: string
  image?: string
}

const projects: Project[] = [
  {
    id: 0,
    title: "Headless CMS",
    description: "Modern, high-performance Headless CMS with robust content management and user administration.",
    tags: ["React", "TypeScript", "Next.js"],
    link: "https://abels-porfolio.vercel.app/",
    company: "Elisoft Solution",
    role: "Full Stack Developer",
    image: "/cmc.png",
  },
  {
    id: 6,
    title: "Elisoft Solution",
    description: "Dynamic corporate website for a software solutions company offering ERP, CRM & CMS services.",
    tags: ["PHP", "Laravel", "MySQL", "Tailwind", "Blade"],
    link: "https://elisoftsolution.com/",
    company: "Elisoft",
    role: "Full Stack Developer",
    image: "/elisoft.jpg",
  },
  {
    id: 3,
    title: "FuelFinder",
    description: "Real-time fuel discovery platform — won 2nd place at Safaricom Cloud Talent 2025.",
    tags: ["React", "Node.js", "Redis"],
    link: "https://fuel-finder-frontend.onrender.com/",
    company: "Gebyainc",
    role: "Frontend Developer",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Fm3un0MWIj3ufrtJFk9z8CtVgnuA8Z.png",
  },
  {
    id: 4,
    title: "Rent Management",
    description: "Enterprise-grade rent management system — property listings, tenants & payment processing.",
    tags: ["React", "PostgreSQL", "Node.js"],
    link: "https://www.act.com.et/",
    company: "Atlas Computer Tech",
    role: "Lead Developer",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Dy18cKbUzCfD6eQPz9a4Q6gnRzqYIf.png",
  },
  {
    id: 2,
    title: "Yabchemicals",
    description: "B2B import/export platform for chemical goods — connecting suppliers, distributors and customers.",
    tags: ["React", "TypeScript", "Tailwind"],
    link: "https://www.yabchemicals.com/",
    company: "Yabchemicals",
    role: "Frontend",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2E0TPOdenF5ZAwMp0YeWwLjIB5MKbB.png",
  },
  {
    id: 5,
    title: "AAHRAMS",
    description: "Full-stack rental agreement digitization system for Addis Ababa — presented to city sub-administration.",
    tags: ["React", "Node.js", "Docker"],
    link: "https://aahrams.onrender.com/",
    company: "AAHAMS",
    role: "Fullstack Developer",
    image: "/AAS.png",
  },
  {
    id: 1,
    title: "Agriculture Management",
    description: "Crop tracking, GIS field mapping and predictive analytics for yield optimization.",
    tags: ["Next.js", "MongoDB", "GIS"],
    link: "#",
    company: "Personal Project",
    role: "Full Stack Developer",
    image: "/agricultural-management-system-dashboard.jpg",
  },
]

export default function ProjectsGrid() {
  const [activeProject, setActiveProject] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: index * 0.1 
          }}
          onMouseEnter={() => setActiveProject(project.id)}
          onMouseLeave={() => setActiveProject(null)}
          className="group"
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className={`relative flex items-center gap-6 md:gap-10 px-6 md:px-8 py-6 rounded-2xl border transition-all duration-500 ${
              activeProject === project.id
                ? "border-primary/40 bg-primary/5 shadow-lg shadow-primary/5"
                : "border-transparent hover:border-border bg-transparent"
            }`}>
              {/* Number */}
              <span className="text-sm font-mono text-muted-foreground/40 w-6 flex-shrink-0 hidden md:block">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Thumbnail — appears on hover */}
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border border-border/50 flex-shrink-0 relative bg-muted/30">
                <AnimatePresence>
                  {project.image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={`object-cover transition-transform duration-700 ${
                          activeProject === project.id ? "scale-110" : "scale-100"
                        }`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Title & Company */}
              <div className="flex-1 min-w-0">
                <h3 className={`text-lg md:text-xl font-semibold tracking-tight transition-colors duration-300 ${
                  activeProject === project.id ? "text-primary" : "text-foreground"
                }`}>
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground truncate mt-0.5">
                  {project.company} · {project.role}
                </p>
              </div>

              {/* Tags — visible on larger screens */}
              <div className="hidden lg:flex gap-2 flex-shrink-0">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border transition-all duration-300 ${
                      activeProject === project.id
                        ? "border-primary/30 text-primary bg-primary/10"
                        : "border-border text-muted-foreground bg-transparent"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <motion.div
                animate={{
                  x: activeProject === project.id ? 0 : -4,
                  opacity: activeProject === project.id ? 1 : 0.3,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex-shrink-0"
              >
                <ArrowUpRight className={`w-5 h-5 transition-colors duration-300 ${
                  activeProject === project.id ? "text-primary" : "text-muted-foreground"
                }`} />
              </motion.div>

              {/* Bottom border line that grows */}
              <motion.div
                className="absolute bottom-0 left-8 right-8 h-px bg-border"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeProject === project.id ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </a>
        </motion.div>
      ))}
    </div>
  )
}
