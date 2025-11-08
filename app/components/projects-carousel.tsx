"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  tags: string[]
  link: string
  company?: string
  duration?: string
  role?: string
  image?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Agriculture Management System",
    description:
      "A comprehensive platform for managing agricultural operations, crop tracking, and yield optimization.",
    longDescription:
      "Built a full-stack agricultural management system with real-time crop monitoring, GIS integration for field mapping, and predictive analytics for yield optimization.",
    tags: ["Next.js", "Node.js", "MongoDB", "GIS"],
    link: "#",
    company: "Personal Project",
    role: "Full Stack Developer",
    image: "/agricultural-management-system-dashboard.jpg",
  },
  {
    id: 2,
    title: "Yabchemicals",
    description: "Import and export platform for chemical goods with inventory management and logistics tracking.",
    longDescription:
      "Developed a modern B2B platform for importing and exporting chemicals and goods. Features include real-time inventory tracking, supplier management, order processing, and analytics dashboard. The platform connects suppliers, distributors, and customers in a seamless ecosystem.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    link: "https://www.yabchemicals.com/",
    company: "Yabchemicals",
    role: "Frontend Developer",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2E0TPOdenF5ZAwMp0YeWwLjIB5MKbB.png",
  },
  {
    id: 3,
    title: "FuelFinder",
    description:
      "Real-time fuel discovery platform connecting drivers, stations, and government delegates for smart fuel management.",
    longDescription:
      "Led development of a real-time fuel discovery and management platform. Drivers can find the nearest available fuel, stations can update fuel status, and government delegates can monitor supply in real time. Won 2nd place reward for innovation.",
    tags: ["React", "Node.js", "PostgreSQL", "Redis", "Google Maps"],
    link: "https://fuel-finder-frontend.onrender.com/",
    company: "Gebyainc",
    role: "Frontend Developer",
    duration: "3 months",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Fm3un0MWIj3ufrtJFk9z8CtVgnuA8Z.png",
  },
  {
    id: 4,
    title: "Rent Management System",
    description: "Enterprise rent management platform for Atlas Computer Technology. Private server deployment.",
    longDescription:
      "Architected and developed a comprehensive rent management system for Atlas Computer Technology. System handles property listings, tenant management, payment processing, maintenance requests, and reporting. Served as lead senior developer overseeing frontend architecture and team coordination.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    link: "https://www.act.com.et/",
    company: "Atlas Computer Technology",
    role: "Lead Senior Developer",
    duration: "5 months",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Dy18cKbUzCfD6eQPz9a4Q6gnRzqYIf.png",
  },
]

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setIsAutoPlay(false)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    setIsAutoPlay(false)
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
  }

  const currentProject = projects[currentIndex]

  return (
    <div className="w-full">
      <div className="relative rounded-lg overflow-hidden">
        <div className="relative bg-gradient-to-br from-muted/50 to-background overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 min-h-96">
            {/* Left side - Content */}
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex gap-2 flex-wrap">
                {currentProject.role && (
                  <Badge variant="default" className="bg-primary/80">
                    {currentProject.role}
                  </Badge>
                )}
                {currentProject.duration && <Badge variant="secondary">{currentProject.duration}</Badge>}
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-4 animate-in fade-in slide-in-from-left-8 duration-700">
                {currentProject.title}
              </h3>

              <p className="text-muted-foreground mb-4 text-lg leading-relaxed animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
                {currentProject.longDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-6 animate-in fade-in duration-700 delay-200">
                {currentProject.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-primary/50">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3 animate-in fade-in duration-700 delay-300">
                <Button asChild className="gap-2">
                  <a href={currentProject.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    View Project
                  </a>
                </Button>
                {currentProject.company && <Button variant="outline">{currentProject.company}</Button>}
              </div>
            </div>

            {/* Right side - Project Image */}
            {currentProject.image && (
              <div className="hidden md:flex items-center justify-center rounded-xl overflow-hidden">
                <div className="relative w-full h-48 md:h-96 group">
                  <Image
                    src={currentProject.image || "/placeholder.svg"}
                    alt={currentProject.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between p-6 bg-muted/50 border-t">
          <Button variant="ghost" size="icon" onClick={handlePrev} className="hover:bg-primary/10">
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="flex gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/50 w-2 hover:bg-muted-foreground"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          <Button variant="ghost" size="icon" onClick={handleNext} className="hover:bg-primary/10">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-100"
            style={{
              width: isAutoPlay ? `${((currentIndex + 1) / projects.length) * 100}%` : "0%",
            }}
          />
        </div>
      </div>

      {/* Project Counter */}
      <div className="text-center mt-6 text-muted-foreground">
        <p className="text-sm">
          Project {currentIndex + 1} of {projects.length}
        </p>
      </div>
    </div>
  )
}
