"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

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

// Duplicate skills for seamless infinite scroll
const duplicatedSkills = [...skills, ...skills]

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 border-t border-border/50 bg-background overflow-hidden">
      <div className="container px-4 mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif mb-16 text-center">
          Work & <span className="text-primary italic">Expertise</span>
        </h2>
        
        {/* Infinite Scrolling Carousel */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/50 to-transparent z-10 pointer-events-none" />
          
          <div className="overflow-hidden">
            <div className="flex animate-scroll gap-6">
              {duplicatedSkills.map((skill, index) => (
                <Card
                  key={`${skill.name}-${index}`}
                  className="group flex-shrink-0 w-[200px] hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-6 text-center">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <Image
                        src={skill.icon || "/placeholder.svg"}
                        alt={skill.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold mb-2 text-lg">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground">{skill.level}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
