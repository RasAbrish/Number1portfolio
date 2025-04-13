"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { projects } from "@/data/projects"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Find the project that matches the slug
    const foundProject = projects.find((p) => p.id === params.slug)

    if (foundProject) {
      setProject(foundProject)
    } else {
      // Redirect to home if project not found
      router.push("/")
    }

    setLoading(false)
  }, [params.slug, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <div className="container py-12 max-w-4xl">
      <Button variant="ghost" asChild className="mb-8 group">
        <Link href="/#projects" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>
      </Button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold mb-6">{project.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-lg text-muted-foreground mb-6">{project.longDescription}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-3 py-1 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 mb-8">
              <Button
                asChild
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
              >
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20"
              >
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Link>
              </Button>
            </div>
          </div>

          <div className="bg-muted rounded-lg overflow-hidden">
            <img
              src={project.images[0] || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.features.map((feature: string, index: number) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start"
              >
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {project.images.length > 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">More Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.slice(1).map((image: string, index: number) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} screenshot ${index + 2}`}
                      className="w-full h-auto"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
