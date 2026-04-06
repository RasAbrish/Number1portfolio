"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion, useAnimationFrame, useMotionValue } from "framer-motion"

const skills = [
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    level: "Advanced",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    level: "Advanced",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    level: "Advanced",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    level: "Advanced",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    level: "Intermediate",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    level: "Intermediate",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    level: "Intermediate",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    level: "Intermediate",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    level: "Intermediate",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    level: "Advanced",
  },
  {
    name: "AWS",
    icon: "https://i.scdn.co/image/ab6765630000ba8a49f81331af04ec3614a5a741",
    level: "Intermediate",
  },
  {
    name: "TailwindCSS",
    icon: "https://wpdean.com/wp-content/uploads/2024/05/how-to-use-tailwind.jpg",
    level: "Advanced",
  },
]

// Duplicate skills heavily for seamless infinite scroll
const duplicatedSkills = [...skills, ...skills, ...skills, ...skills]

export default function SkillsSection() {
  const [isHovered, setIsHovered] = useState(false)
  const baseVelocity = -1.5 // px per frame
  const x = useMotionValue(0)

  useAnimationFrame((t, delta) => {
    // Smoothly decelerate on hover to a comfortable reading speed
    const velocity = isHovered ? baseVelocity * 0.15 : baseVelocity
    let moveBy = velocity * (delta / 16)
    
    // Width of one complete native array
    // 12 items * (200px width + 24px gap) = 2688
    if (x.get() <= -2688) {
      x.set(0)
    } else {
      x.set(x.get() + moveBy)
    }
  })

  return (
    <section id="skills" className="py-32 border-t border-border/50 bg-background overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-4">
            Programming <span className="text-primary italic">Arsenal</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            The core technologies I utilize to build modern, high-performance web applications.
          </p>
        </motion.div>
        
        {/* Infinite Scrolling Carousel */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="overflow-hidden py-8">
            <motion.div 
              className="flex gap-6 w-max px-4 cursor-pointer"
              style={{ x }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {duplicatedSkills.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.05,
                    rotateZ: index % 2 === 0 ? 2 : -2 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex-shrink-0 w-[200px]"
                >
                  <Card className="h-full border border-border/50 bg-muted/20 backdrop-blur-md shadow-sm hover:shadow-primary/20 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6 text-center flex flex-col items-center justify-between h-full">
                      <motion.div 
                        className="relative w-20 h-20 mb-6 drop-shadow-xl"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      >
                        <Image
                          src={skill.icon || "/placeholder.svg"}
                          alt={skill.name}
                          fill
                          className="object-contain"
                        />
                      </motion.div>
                      
                      <div className="w-full">
                        <h3 className="font-bold text-foreground text-xl tracking-tight mb-2">
                          {skill.name}
                        </h3>
                        <div className="px-3 py-1 bg-primary/10 text-primary rounded-full inline-block text-xs font-bold uppercase tracking-widest shadow-inner">
                          {skill.level}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
