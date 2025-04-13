"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { Download, Menu } from "lucide-react"
import { motion, useTransform } from "framer-motion"
import { NavLink } from "@/components/navigation/nav-link"
import { useState } from "react"

interface HeaderProps {
  activeSection: string
  scrollToSection: (sectionId: string) => void
  scrollYProgress: any
}

export function Header({ activeSection, scrollToSection, scrollYProgress }: HeaderProps) {
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])
  const [isOpen, setIsOpen] = useState(false)

  const handleMobileNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsOpen(false)
  }

  return (
    <motion.header
      style={{ opacity: headerOpacity }}
      className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex gap-2 sm:gap-6 md:gap-10">
          <Link
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("home")
            }}
            className="flex items-center"
          >
            <span className="inline-block text-sm sm:text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-emerald-500">
              Abrham Ababu
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="#about" active={activeSection === "about"} onClick={() => scrollToSection("about")}>
              About
            </NavLink>
            <NavLink href="#skills" active={activeSection === "skills"} onClick={() => scrollToSection("skills")}>
              Skills
            </NavLink>
            <NavLink href="#projects" active={activeSection === "projects"} onClick={() => scrollToSection("projects")}>
              Projects
            </NavLink>
            <NavLink
              href="#testimonials"
              active={activeSection === "testimonials"}
              onClick={() => scrollToSection("testimonials")}
            >
              Testimonials
            </NavLink>
            <NavLink href="#contact" active={activeSection === "contact"} onClick={() => scrollToSection("contact")}>
              Contact
            </NavLink>
            <Button
              variant="outline"
              size="sm"
              className="ml-2 border-cyan-500 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20"
              asChild
            >
              <Link href="/resume">
                <Download className="mr-1 h-3 w-3" />
                Resume
              </Link>
            </Button>
            <ThemeToggle />
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="mr-1 sm:mr-2 border-cyan-500 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 h-8 px-2 sm:px-3"
              asChild
            >
              <Link href="/resume">
                <Download className="h-3 w-3 sm:mr-1" />
                <span className="hidden sm:inline">Resume</span>
              </Link>
            </Button>
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-1 sm:ml-2 h-8 w-8">
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col gap-6 py-6">
                  <Link
                    href="#home"
                    onClick={(e) => {
                      e.preventDefault()
                      handleMobileNavClick("home")
                    }}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-emerald-500">
                      Abrham Ababu
                    </span>
                  </Link>
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={() => handleMobileNavClick("about")}
                      className={`relative px-4 py-2 text-left transition-colors duration-200 ${
                        activeSection === "about" ? "text-cyan-500 font-medium" : "hover:text-primary"
                      }`}
                    >
                      About
                      {activeSection === "about" && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-cyan-500 to-emerald-500 rounded-full"
                          layoutId="activeMobileSection"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    <button
                      onClick={() => handleMobileNavClick("skills")}
                      className={`relative px-4 py-2 text-left transition-colors duration-200 ${
                        activeSection === "skills" ? "text-cyan-500 font-medium" : "hover:text-primary"
                      }`}
                    >
                      Skills
                      {activeSection === "skills" && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-cyan-500 to-emerald-500 rounded-full"
                          layoutId="activeMobileSection"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    <button
                      onClick={() => handleMobileNavClick("projects")}
                      className={`relative px-4 py-2 text-left transition-colors duration-200 ${
                        activeSection === "projects" ? "text-cyan-500 font-medium" : "hover:text-primary"
                      }`}
                    >
                      Projects
                      {activeSection === "projects" && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-cyan-500 to-emerald-500 rounded-full"
                          layoutId="activeMobileSection"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    <button
                      onClick={() => handleMobileNavClick("testimonials")}
                      className={`relative px-4 py-2 text-left transition-colors duration-200 ${
                        activeSection === "testimonials" ? "text-cyan-500 font-medium" : "hover:text-primary"
                      }`}
                    >
                      Testimonials
                      {activeSection === "testimonials" && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-cyan-500 to-emerald-500 rounded-full"
                          layoutId="activeMobileSection"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    <button
                      onClick={() => handleMobileNavClick("contact")}
                      className={`relative px-4 py-2 text-left transition-colors duration-200 ${
                        activeSection === "contact" ? "text-cyan-500 font-medium" : "hover:text-primary"
                      }`}
                    >
                      Contact
                      {activeSection === "contact" && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-cyan-500 to-emerald-500 rounded-full"
                          layoutId="activeMobileSection"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setIsOpen(false)
                        window.location.href = "/resume"
                      }}
                      className="relative px-4 py-2 text-left transition-colors duration-200 hover:text-primary"
                    >
                      Resume
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
