"use client"

import { useEffect, useRef, useState } from "react"
import { useScroll } from "framer-motion"

import { useMobile } from "@/hooks/use-mobile"

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const isMobile = useMobile()

  // Refs for sections to enable smooth scrolling and animations
  const aboutRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Track if sections are in view for animations
  const [aboutInView, setAboutInView] = useState(false)
  const [skillsInView, setSkillsInView] = useState(false)
  const [projectsInView, setProjectsInView] = useState(false)
  const [testimonialsInView, setTestimonialsInView] = useState(false)
  const [contactInView, setContactInView] = useState(false)

  // Active section tracking for navbar
  const [activeSection, setActiveSection] = useState("home")

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      // Get all sections
      const homeSection = document.getElementById("home")?.offsetTop || 0
      const aboutSection = document.getElementById("about")?.offsetTop || 0
      const skillsSection = document.getElementById("skills")?.offsetTop || 0
      const projectsSection = document.getElementById("projects")?.offsetTop || 0
      const testimonialsSection = document.getElementById("testimonials")?.offsetTop || 0
      const contactSection = document.getElementById("contact")?.offsetTop || 0

      // Determine active section
      if (scrollPosition < aboutSection) {
        setActiveSection("home")
      } else if (scrollPosition < skillsSection) {
        setActiveSection("about")
      } else if (scrollPosition < projectsSection) {
        setActiveSection("skills")
      } else if (scrollPosition < testimonialsSection) {
        setActiveSection("projects")
      } else if (scrollPosition < contactSection) {
        setActiveSection("testimonials")
      } else {
        setActiveSection("contact")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Setup intersection observers for each section
  useEffect(() => {
    const options = { threshold: 0.2 }

    const aboutObserver = new IntersectionObserver(([entry]) => setAboutInView(entry.isIntersecting), options)

    const skillsObserver = new IntersectionObserver(([entry]) => setSkillsInView(entry.isIntersecting), options)

    const projectsObserver = new IntersectionObserver(([entry]) => setProjectsInView(entry.isIntersecting), options)

    const testimonialsObserver = new IntersectionObserver(
      ([entry]) => setTestimonialsInView(entry.isIntersecting),
      options,
    )

    const contactObserver = new IntersectionObserver(([entry]) => setContactInView(entry.isIntersecting), options)

    if (aboutRef.current) aboutObserver.observe(aboutRef.current)
    if (skillsRef.current) skillsObserver.observe(skillsRef.current)
    if (projectsRef.current) projectsObserver.observe(projectsRef.current)
    if (testimonialsRef.current) testimonialsObserver.observe(testimonialsRef.current)
    if (contactRef.current) contactObserver.observe(contactRef.current)

    return () => {
      if (aboutRef.current) aboutObserver.unobserve(aboutRef.current)
      if (skillsRef.current) skillsObserver.unobserve(skillsRef.current)
      if (projectsRef.current) projectsObserver.unobserve(projectsRef.current)
      if (testimonialsRef.current) testimonialsObserver.unobserve(testimonialsRef.current)
      if (contactRef.current) contactObserver.unobserve(contactRef.current)
    }
  }, [])

  // Smooth scroll function with offset adjustment for mobile
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      // Add extra offset for mobile to account for the header
      const offset = isMobile ? 60 : 80
      window.scrollTo({
        top: section.offsetTop - offset,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 z-50"
        style={{ transform: `scaleX(${scrollYProgress.get()})` }}
      />

      <Header activeSection={activeSection} scrollToSection={scrollToSection} scrollYProgress={scrollYProgress} />

      <main className="flex-1">
        <HeroSection scrollToSection={scrollToSection} />
        <AboutSection inView={aboutInView} reference={aboutRef} />
        <SkillsSection inView={skillsInView} reference={skillsRef} />
        <ProjectsSection inView={projectsInView} reference={projectsRef} />
        <TestimonialsSection inView={testimonialsInView} reference={testimonialsRef} />
        <ContactSection inView={contactInView} reference={contactRef} />
      </main>

      <Footer />
    </div>
  )
}
