"use client"

import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export default function ResumePage() {
  const isMobile = useMobile()

  return (
    <div className="container py-6 md:py-12 px-4 md:px-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <Button variant="ghost" asChild className="group">
          <Link href="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </Button>

        <Button
          variant="outline"
          className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20"
          onClick={() => window.print()}
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900 p-4 md:p-8 rounded-lg shadow-lg print:shadow-none"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400">Abrham Ababu</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-xs md:text-sm">
            abrhambest7@gmail.com | +251 943113823 | abrhamababu.dev | LinkedIn | GitHub
          </p>
        </div>

        <section className="mb-6">
          <h2 className="text-lg md:text-xl font-bold border-b-2 border-cyan-500 pb-1 mb-3">EDUCATION</h2>
          <div className="ml-2 md:ml-4">
            <p className="font-semibold">Hope University, Addis Ababa, Ethiopia</p>
            <ul className="list-disc ml-5 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <li>ICT Club Member: Won 3rd Place in Hackathon Competition</li>
              <li>Parliament Group Advisor (Current)</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg md:text-xl font-bold border-b-2 border-cyan-500 pb-1 mb-3">CERTIFICATIONS</h2>
          <ul className="list-disc ml-7 md:ml-9 text-sm md:text-base text-gray-700 dark:text-gray-300">
            <li>Udemy: Programming Fundamentals, AI Fundamentals, Android Development</li>
            <li>FreeCodeCamp: Responsive Web Design</li>
            <li>CodeSoft: Web Development</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-lg md:text-xl font-bold border-b-2 border-cyan-500 pb-1 mb-3">WORK EXPERIENCE</h2>
          <div className="ml-2 md:ml-4">
            <p className="font-semibold">Safaricom Talent Cloud, Addis Ababa</p>
            <p className="italic text-sm md:text-base">Junior Full Stack Developer (6-week program)</p>
            <ul className="list-disc ml-5 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <li>Developed/deployed MVP using React, Node.js, Express, PostgreSQL</li>
              <li>Implemented Agile/Jira workflows and responsive UI (CSS/Bootstrap/Tailwind)</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg md:text-xl font-bold border-b-2 border-cyan-500 pb-1 mb-3">PROJECTS</h2>

          <div className="ml-2 md:ml-4 mb-3">
            <p className="font-semibold">FuelFinder (Full Stack)</p>
            <ul className="list-disc ml-5 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <li>Built responsive interfaces with React, Node.js, Express</li>
            </ul>
          </div>

          <div className="ml-2 md:ml-4 mb-3">
            <p className="font-semibold">Senior Project (Bilingual App - In Progress)</p>
            <ul className="list-disc ml-5 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <li>React.js, Node.js, PostgreSQL, TypeScript implementation</li>
            </ul>
          </div>

          <div className="ml-2 md:ml-4">
            <p className="font-semibold">Portfolio Website</p>
            <ul className="list-disc ml-5 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <li>Developed with HTML, CSS, JavaScript, React.js, Tailwind CSS</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg md:text-xl font-bold border-b-2 border-cyan-500 pb-1 mb-3">ACTIVITIES & LEADERSHIP</h2>
          <div className="ml-2 md:ml-4">
            <p className="font-semibold">Hope University</p>
            <ul className="list-disc ml-5 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <li>ICT Club Advisor: Organized events, mentored 30+ students</li>
              <li>Competed in 5+ hackathons/programming competitions</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg md:text-xl font-bold border-b-2 border-cyan-500 pb-1 mb-3">SKILLS</h2>
          <div className="ml-2 md:ml-4 text-sm md:text-base">
            <p className="mb-2">
              <span className="font-semibold">Programming:</span> HTML | CSS | JavaScript | React | Node.js | Express |
              PostgreSQL
            </p>
            <p>
              <span className="font-semibold">Tools:</span> Git | Jira | VS Code | Bootstrap | Tailwind | Firebase |
              Vercel
            </p>
          </div>
        </section>
      </motion.div>
    </div>
  )
}
