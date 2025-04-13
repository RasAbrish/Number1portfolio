"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import Image from "next/image"
import { skillIcons } from "@/data/skills"
import { SectionHeading } from "@/components/layout/section-heading"
import { MotionSection } from "@/components/layout/section"

interface SkillsSectionProps {
  inView: boolean
  reference: React.RefObject<HTMLElement>
}

export function SkillsSection({ inView, reference }: SkillsSectionProps) {
  return (
    <MotionSection
      id="skills"
      ref={reference}
      className="bg-muted/30 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>

      <div className="mx-auto flex max-w-[64rem] flex-col items-center justify-center gap-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <SectionHeading
            title="Skills &"
            highlight="Technologies"
            description="My technical toolkit and expertise that I bring to every project"
          />
        </motion.div>

        <Tabs defaultValue="frontend" className="w-full max-w-4xl">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 p-1 rounded-xl bg-muted/50 backdrop-blur-sm">
            <TabsTrigger
              value="frontend"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/10 data-[state=active]:to-cyan-500/20 data-[state=active]:text-cyan-600 dark:data-[state=active]:text-cyan-400 transition-all duration-300"
            >
              Frontend
            </TabsTrigger>
            <TabsTrigger
              value="backend"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500/10 data-[state=active]:to-teal-500/20 data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 transition-all duration-300"
            >
              Backend
            </TabsTrigger>
            <TabsTrigger
              value="languages"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/10 data-[state=active]:to-emerald-500/20 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 transition-all duration-300"
            >
              Languages
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/10 data-[state=active]:to-purple-500/20 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 transition-all duration-300"
            >
              Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="frontend" className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
              {Object.entries(skillIcons.frontend).map(([skill, iconPath], index) => (
                <SkillCard key={skill} skill={skill} iconPath={iconPath} index={index} inView={inView} color="cyan" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="backend" className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
              {Object.entries(skillIcons.backend).map(([skill, iconPath], index) => (
                <SkillCard key={skill} skill={skill} iconPath={iconPath} index={index} inView={inView} color="teal" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="languages" className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
              {Object.entries(skillIcons.languages).map(([skill, iconPath], index) => (
                <SkillCard
                  key={skill}
                  skill={skill}
                  iconPath={iconPath}
                  index={index}
                  inView={inView}
                  color="emerald"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
              {Object.entries(skillIcons.tools).map(([skill, iconPath], index) => (
                <SkillCard key={skill} skill={skill} iconPath={iconPath} index={index} inView={inView} color="purple" />
              ))}
            </div>
          </TabsContent>

          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 overflow-hidden inline-block">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-2">Always Learning</h3>
                  <p className="text-muted-foreground">
                    I'm constantly expanding my skills and staying up-to-date with the latest technologies.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Tabs>
      </div>
    </MotionSection>
  )
}

interface SkillCardProps {
  skill: string
  iconPath: string
  index: number
  inView: boolean
  color: "cyan" | "teal" | "emerald" | "purple"
}

function SkillCard({ skill, iconPath, index, inView, color }: SkillCardProps) {
  const colorClasses = {
    cyan: {
      hover: "group-hover:text-cyan-600 dark:group-hover:text-cyan-400",
      gradient: "from-cyan-500/10 to-cyan-500/5 group-hover:from-cyan-500/20 group-hover:to-cyan-500/10",
      border: "from-cyan-500",
    },
    teal: {
      hover: "group-hover:text-teal-600 dark:group-hover:text-teal-400",
      gradient: "from-teal-500/10 to-teal-500/5 group-hover:from-teal-500/20 group-hover:to-teal-500/10",
      border: "from-teal-500",
    },
    emerald: {
      hover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
      gradient: "from-emerald-500/10 to-emerald-500/5 group-hover:from-emerald-500/20 group-hover:to-emerald-500/10",
      border: "from-emerald-500",
    },
    purple: {
      hover: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
      gradient: "from-purple-500/10 to-purple-500/5 group-hover:from-purple-500/20 group-hover:to-purple-500/10",
      border: "from-purple-500",
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.05 }}
      className="group"
    >
      <Card className="overflow-hidden border-none shadow-lg group-hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-background to-background/80 relative h-full">
        <div
          className={`absolute inset-0 bg-gradient-to-br from-${color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        ></div>
        <div
          className={`absolute top-0 right-0 w-16 h-16 bg-${color}-500/5 rounded-bl-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        ></div>

        <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
          <div
            className={`w-16 h-16 mb-4 p-3 rounded-xl bg-gradient-to-br ${colorClasses[color].gradient} flex items-center justify-center transition-all duration-300`}
          >
            <Image
              src={iconPath || "/placeholder.svg"}
              alt={skill}
              width={40}
              height={40}
              className="object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <p className={`font-medium text-base ${colorClasses[color].hover} transition-colors duration-300`}>{skill}</p>

          <div
            className={`w-0 h-0.5 bg-gradient-to-r ${colorClasses[color].border} to-transparent group-hover:w-full mt-2 transition-all duration-300`}
          ></div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
