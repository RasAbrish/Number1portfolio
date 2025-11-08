"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const technologies = [
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    favicon: "https://www.postgresql.org/favicon.ico",
    description: "Robust Relational Database",
    color: "#336791",
    expertise: ["Complex Queries", "Indexing", "Optimization", "Transactions"],
    level: "Advanced",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    favicon: "https://tailwindcss.com/favicons/favicon-32x32.png",
    description: "Modern Utility-First CSS Framework",
    color: "#06B6D4",
    expertise: ["JIT", "Custom Themes", "Animations", "Responsive"],
    level: "Expert",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg",
    favicon: "https://nextjs.org/static/favicon/favicon-32x32.png",
    description: "React Production Framework",
    color: "#000000",
    expertise: ["App Router", "Server Actions", "API Routes", "SSR"],
    level: "Expert",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    favicon: "https://reactjs.org/favicon.ico",
    description: "UI Component Library",
    color: "#61DAFB",
    expertise: ["Hooks", "Context", "Suspense", "Server Components"],
    level: "Expert",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    favicon: "https://www.typescriptlang.org/favicon-32x32.png",
    description: "Typed JavaScript at Scale",
    color: "#3178C6",
    expertise: ["Type Safety", "Generics", "Decorators", "Utility Types"],
    level: "Advanced",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    favicon: "https://nodejs.org/static/images/favicons/favicon.ico",
    description: "JavaScript Runtime Environment",
    color: "#339933",
    expertise: ["Express", "REST APIs", "GraphQL", "Microservices"],
    level: "Advanced",
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
            Specialized in modern web technologies and robust database solutions
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {technologies.map((tech, index) => (
            <motion.div key={tech.name} variants={item} className="group">
              <Card
                className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden border-t-4"
                style={{ borderTopColor: tech.color }}
              >
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
                      <div className="absolute -bottom-2 -right-2 w-6 h-6">
                        <Image
                          src={tech.favicon || "/placeholder.svg"}
                          alt={`${tech.name} favicon`}
                          width={24}
                          height={24}
                          className="rounded-full border-2 border-background"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold group-hover:text-primary transition-colors">{tech.name}</h4>
                      <Badge
                        variant="secondary"
                        className="mt-1"
                        style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
                      >
                        {tech.level}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{tech.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tech.expertise.map((skill) => (
                      <Badge key={skill} variant="outline" className="group-hover:bg-primary/10 transition-colors">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: tech.color }}
                      initial={{ width: "0%" }}
                      animate={isInView ? { width: tech.level === "Expert" ? "95%" : "85%" } : { width: "0%" }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 grid gap-8 md:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Development Approach</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Type-safe development with strict TypeScript configurations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Server-side rendering with Next.js App Router
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  Component-driven development with Storybook
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  Automated testing with Jest and React Testing Library
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Best Practices</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  Clean code architecture and SOLID principles
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  Continuous Integration/Deployment (CI/CD)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  Code review and pair programming practices
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  Performance optimization and monitoring
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
