"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Calendar, Briefcase, Lightbulb } from "lucide-react"
import { SectionHeading } from "@/components/layout/section-heading"
import { MotionSection } from "@/components/layout/section"
import { education } from "@/data/education"
import { expertise } from "@/data/skills"

interface AboutSectionProps {
  inView: boolean
  reference: React.RefObject<HTMLElement>
}

export function AboutSection({ inView, reference }: AboutSectionProps) {
  return (
    <MotionSection
      id="about"
      ref={reference}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <SectionHeading
        title="About"
        highlight="Me"
        description="I'm a passionate developer focused on creating innovative solutions. I enjoy tackling complex problems and turning ideas into reality through clean, efficient code. My goal is to create software that makes a positive impact."
      />

      {/* Redesigned About Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full max-w-[58rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 group-hover:from-cyan-500/20 group-hover:to-cyan-500/10 transition-all duration-500"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full -z-10 group-hover:bg-cyan-500/20 transition-all duration-500"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-cyan-700 dark:from-cyan-400 dark:to-cyan-200">
                  Education
                </h3>
              </div>
              <ul className="space-y-5 text-left">
                {education.slice(0, 3).map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="flex flex-col border-l-2 border-cyan-500/30 pl-4 py-1 relative">
                      <div className="absolute w-3 h-3 bg-cyan-500 rounded-full -left-[7px] top-2"></div>
                      <span className="font-bold text-lg">{item.degree || item.certification || item.achievement}</span>
                      <span className="text-sm text-muted-foreground mb-1">
                        {item.institution}, {item.period}
                      </span>
                      <span className="text-sm">{item.description}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-teal-500/5 group-hover:from-teal-500/20 group-hover:to-teal-500/10 transition-all duration-500"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-bl-full -z-10 group-hover:bg-teal-500/20 transition-all duration-500"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-3 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-teal-700 dark:from-teal-400 dark:to-teal-200">
                  Experience
                </h3>
              </div>
              <ul className="space-y-5 text-left">
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="flex flex-col border-l-2 border-teal-500/30 pl-4 py-1 relative">
                    <div className="absolute w-3 h-3 bg-teal-500 rounded-full -left-[7px] top-2"></div>
                    <span className="font-bold text-lg">Frontend Developer</span>
                    <span className="text-sm text-muted-foreground mb-1">TechSolutions Inc., 2022-Present</span>
                    <span className="text-sm">
                      Developed responsive web applications with React and Next.js, improving user engagement by 40%
                    </span>
                  </div>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <div className="flex flex-col border-l-2 border-teal-500/30 pl-4 py-1 relative">
                    <div className="absolute w-3 h-3 bg-teal-500 rounded-full -left-[7px] top-2"></div>
                    <span className="font-bold text-lg">Web Developer Intern</span>
                    <span className="text-sm text-muted-foreground mb-1">Digital Innovations, 2021</span>
                    <span className="text-sm">
                      Assisted in developing client websites and implemented responsive designs
                    </span>
                  </div>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <div className="flex flex-col border-l-2 border-teal-500/30 pl-4 py-1 relative">
                    <div className="absolute w-3 h-3 bg-teal-500 rounded-full -left-[7px] top-2"></div>
                    <span className="font-bold text-lg">ICT Club Member</span>
                    <span className="text-sm text-muted-foreground mb-1">Hope University College, 2020-Present</span>
                    <span className="text-sm">
                      Participated in coding competitions and collaborative projects with fellow students
                    </span>
                  </div>
                </motion.li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 group-hover:from-emerald-500/20 group-hover:to-emerald-500/10 transition-all duration-500"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full -z-10 group-hover:bg-emerald-500/20 transition-all duration-500"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center mb-6">
                <div className="mr-4 p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-700 dark:from-emerald-400 dark:to-emerald-200">
                  Skills & Expertise
                </h3>
              </div>
              <ul className="space-y-3 text-left">
                {expertise.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                    <div>
                      <span className="font-medium">{item.title}</span>
                      <p className="text-sm text-muted-foreground">{item.skills}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MotionSection>
  )
}
