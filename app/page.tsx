"use client"

import Navbar from "./navbar"
import Footer from "./footer"
import SkillsSection from "./skills-section"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ScrollReveal from "./components/scroll-reveal"
import Testimonials from "./components/testimonials"
import ProjectsGrid from "./components/projects-grid"
import Milestones from "./components/milestones"
import FloatingCharacter from "./components/floating-character"
import HeroSection from "./components/hero-section"
import ContactSection from "./components/contact-section"
import { motion } from "framer-motion"

const fadeLeft = {
  initial: { opacity: 0, x: -80 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, type: "spring" as const, bounce: 0.35 },
}

const fadeRight = {
  initial: { opacity: 0, x: 80 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, type: "spring" as const, bounce: 0.35 },
}

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, type: "spring" as const },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── About Me ── */}
      <section id="about" className="py-32 bg-background relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container px-4 mx-auto relative z-10">
          {/* Section label */}
          <motion.p {...fadeUp} className="text-center text-xs font-bold uppercase tracking-[0.25em] text-primary mb-4">
            About Me
          </motion.p>
          <motion.h2 {...fadeUp} className="text-4xl md:text-6xl font-serif text-center mb-20">
            The <span className="text-primary italic">Developer</span> Behind the Work
          </motion.h2>

          <div className="grid lg:grid-cols-[1fr,1.5fr] gap-20 items-center">
            {/* Photo — slides in from LEFT */}
            <motion.div {...fadeLeft} className="relative flex justify-center lg:justify-start">
              <div className="relative">
                {/* Soft glow behind photo */}
                <div className="absolute inset-0 rounded-3xl bg-primary/8 blur-3xl scale-125 -z-10" />

                {/* Orbit dots */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  className="absolute inset-[-30px] z-0"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/60" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/40" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary/30" />
                </motion.div>

                {/* Photo */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="aspect-[3/4] w-[280px] rounded-3xl overflow-hidden shadow-2xl border-2 border-border/60 relative z-10"
                >
                  <Image
                    src="/assets/images/profile-photo.jpg"
                    alt="Abrham"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Corner accents */}
                <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b-2 border-l-2 border-primary/30 rounded-bl-2xl -z-10" />
                <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl -z-10" />
              </div>
            </motion.div>

            {/* Text — slides in from RIGHT */}
            <motion.div {...fadeRight} className="space-y-8">
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate full-stack developer focused on creating <span className="text-foreground font-medium">beautiful, functional web applications</span>. With a keen eye for design and a love for clean code, I bring ideas to life through technology.
                </p>
                <p>
                  I've built diverse software ranging from agricultural management systems and fuel discovery platforms to enterprise rent management solutions — always delivering <span className="text-foreground font-medium">robust architecture and exceptional user experiences</span>.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "5+", label: "Years Exp." },
                  { value: "10+", label: "Projects" },
                  { value: "5+", label: "Companies" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ y: -4, scale: 1.04 }}
                    className="p-5 rounded-2xl bg-muted/40 border border-border text-center hover:border-primary/40 hover:shadow-md transition-all cursor-default"
                  >
                    <p className="text-3xl font-serif text-primary mb-1">{stat.value}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>

      {/* ── My Journey ── */}
      <ScrollReveal>
        <Milestones />
      </ScrollReveal>

      {/* ── Projects ── */}
      <ScrollReveal>
        <section id="projects" className="py-24 bg-background">
          <div className="container px-4 mx-auto">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-4">Portfolio</p>
              <h2 className="text-4xl md:text-6xl font-serif">
                Featured <span className="text-primary italic">Projects</span>
              </h2>
            </motion.div>
            <ProjectsGrid />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Skills ── */}
      <ScrollReveal>
        <SkillsSection />
      </ScrollReveal>

      {/* ── Contact ── */}
      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>

      <Footer />
      <FloatingCharacter />
    </div>
  )
}
