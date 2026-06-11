"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useAnimationFrame, useMotionValue } from "motion/react"

type Tool = {
  name: string
  icon: string
}

const toolsRowOne: Tool[] = [
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "ShadCN", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shadcnui.svg" },
  { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "Sass", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
]

const toolsRowTwo: Tool[] = [
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/githubactions.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vercel.svg" },
  { name: "Netlify", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/netlify.svg" },
  { name: "n8n", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/n8n.svg" },
  { name: "Cloudflare", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cloudflare.svg" },
  { name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "ngrok", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ngrok.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
]

const CHIP_WIDTH = 188
const TOOL_GAP = 20
const ROW_ONE_LOOP_WIDTH = toolsRowOne.length * (CHIP_WIDTH + TOOL_GAP)
const ROW_TWO_LOOP_WIDTH = toolsRowTwo.length * (CHIP_WIDTH + TOOL_GAP)
const duplicatedRowOne = [...toolsRowOne, ...toolsRowOne, ...toolsRowOne]
const duplicatedRowTwo = [...toolsRowTwo, ...toolsRowTwo, ...toolsRowTwo]

function ToolRow({
  tools,
  x,
  onMouseEnter,
  onMouseLeave,
}: {
  tools: Tool[]
  x: ReturnType<typeof useMotionValue<number>>
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  return (
    <div className="overflow-hidden py-5">
      <motion.div className="flex w-max gap-5 px-4" style={{ x }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {tools.map((tool, index) => (
          <motion.div
            key={`${tool.name}-${index}`}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="group flex h-14 w-[188px] flex-shrink-0 items-center gap-4 px-2"
            title={tool.name}
          >
            <div className="relative h-9 w-9">
              <Image
                src={tool.icon || "/placeholder.svg"}
                alt={tool.name}
                fill
                className="object-contain grayscale group-hover:grayscale-0 transition-all"
                unoptimized
              />
            </div>
            <span className="text-base font-medium text-foreground/80">{tool.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default function SkillsSection() {
  const [isRowOneHovered, setIsRowOneHovered] = useState(false)
  const [isRowTwoHovered, setIsRowTwoHovered] = useState(false)

  const xRowOne = useMotionValue(0)
  const xRowTwo = useMotionValue(-ROW_TWO_LOOP_WIDTH)

  useAnimationFrame((_, delta) => {
    const baseOne = -0.95
    const baseTwo = 0.95
    const v1 = isRowOneHovered ? baseOne * 0.18 : baseOne
    const v2 = isRowTwoHovered ? baseTwo * 0.18 : baseTwo

    const moveOne = v1 * (delta / 16)
    const moveTwo = v2 * (delta / 16)

    if (xRowOne.get() <= -ROW_ONE_LOOP_WIDTH) {
      xRowOne.set(0)
    } else {
      xRowOne.set(xRowOne.get() + moveOne)
    }

    if (xRowTwo.get() >= 0) {
      xRowTwo.set(-ROW_TWO_LOOP_WIDTH)
    } else {
      xRowTwo.set(xRowTwo.get() + moveTwo)
    }
  })

  return (
    <section id="skills" className="relative overflow-hidden border-t border-border/50 bg-background py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">Favorite Tools</p>
          <h2 className="mb-4 text-4xl font-serif md:text-6xl">
            My <span className="text-luxe italic pr-1">Technologies</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">Languages, frameworks, and platforms I use across full-stack products.</p>
        </motion.div>

        <div className="relative border-y border-border/60">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

          <ToolRow
            tools={duplicatedRowOne}
            x={xRowOne}
            onMouseEnter={() => setIsRowOneHovered(true)}
            onMouseLeave={() => setIsRowOneHovered(false)}
          />
          <ToolRow
            tools={duplicatedRowTwo}
            x={xRowTwo}
            onMouseEnter={() => setIsRowTwoHovered(true)}
            onMouseLeave={() => setIsRowTwoHovered(false)}
          />
        </div>
      </div>
    </section>
  )
}
