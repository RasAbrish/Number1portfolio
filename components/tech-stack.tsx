"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const technologies = [
  {
    category: "Frontend Development",
    items: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        description: "Building interactive UIs with React's component-based architecture",
        experience: "Advanced",
        color: "#61DAFB",
        skills: ["Components", "Hooks", "Context", "Redux"],
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        description: "Creating fast, SEO-friendly applications with server-side rendering",
        experience: "Advanced",
        color: "#000000",
        skills: ["SSR", "API Routes", "Dynamic Routes", "Image Optimization"],
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        description: "Developing type-safe applications with enhanced developer experience",
        experience: "Advanced",
        color: "#3178C6",
        skills: ["Type Safety", "Interfaces", "Generics", "Decorators"],
      },
    ],
  },
  {
    category: "Styling & Design",
    items: [
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
        description: "Crafting responsive designs with utility-first approach",
        experience: "Advanced",
        color: "#06B6D4",
        skills: ["Responsive Design", "Custom Themes", "JIT Compiler", "Animations"],
      },
      {
        name: "Framer Motion",
        icon: "/placeholder.svg?height=64&width=64",
        description: "Creating smooth, interactive animations for enhanced UX",
        experience: "Intermediate",
        color: "#BB4B96",
        skills: ["Animations", "Gestures", "Transitions", "Layout"],
      },
      {
        name: "Figma",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        description: "Designing and prototyping user interfaces",
        experience: "Intermediate",
        color: "#F24E1E",
        skills: ["UI Design", "Prototyping", "Components", "Auto Layout"],
      },
    ],
  },
  {
    category: "Backend & Infrastructure",
    items: [
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        description: "Building scalable server-side applications and APIs",
        experience: "Advanced",
        color: "#339933",
        skills: ["Express.js", "REST APIs", "Authentication", "WebSockets"],
      },
      {
        name: "AWS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        description: "Deploying and managing cloud infrastructure",
        experience: "Intermediate",
        color: "#FF9900",
        skills: ["EC2", "S3", "Lambda", "RDS"],
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        description: "Working with NoSQL databases for flexible data storage",
        experience: "Advanced",
        color: "#47A248",
        skills: ["Aggregation", "Indexing", "Atlas", "Mongoose"],
      },
    ],
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
}

export default function TechStack() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container px-4 mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Leveraging modern technologies to build scalable, performant, and user-friendly applications
          </p>
        </motion.div>

        <div className="space-y-16">
          {technologies.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              variants={container}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((tech, index) => (
                  <motion.div key={tech.name} variants={item} className="group">
                    <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative w-16 h-16 shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-background to-muted rounded-lg" />
                            <Image
                              src={tech.icon || "/placeholder.svg"}
                              alt={tech.name}
                              fill
                              className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold group-hover:text-primary transition-colors">
                              {tech.name}
                            </h4>
                            <Badge variant="secondary" className="mt-1" style={{ backgroundColor: `${tech.color}20` }}>
                              {tech.experience}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{tech.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {tech.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="group-hover:bg-primary/10 transition-colors"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: tech.color }}
                            initial={{ width: "0%" }}
                            animate={
                              isInView ? { width: tech.experience === "Advanced" ? "90%" : "75%" } : { width: "0%" }
                            }
                            transition={{ duration: 1, delay: categoryIndex * 0.2 + index * 0.1 }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
