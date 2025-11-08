import Navbar from "./navbar"
import Footer from "./footer"
import SkillsSection from "./skills-section"
import ContactForm from "./contact-form"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import AdvancedParticles from "./components/advanced-particles"
import AnimatedText from "./components/animated-text"
import FloatingIcons from "./components/floating-icons"
import ScrollReveal from "./components/scroll-reveal"
import TechStack from "./components/tech-stack"
import Testimonials from "./components/testimonials"
import ProjectsCarousel from "./components/projects-carousel"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <AdvancedParticles />
        <FloatingIcons />
        <div className="container px-4 mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <AnimatedText text="Hi, I'm Abrham" />
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            <AnimatedText text="Full Stack Developer & Creative Problem Solver" className="inline-block" />
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="default" asChild className="animate-bounce">
              <a href="#contact">Get in Touch</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#projects">View Work</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <ScrollReveal>
        <section id="about" className="py-20 bg-muted/50">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-lg text-muted-foreground mb-6">
                I'm a passionate developer focused on creating beautiful and functional web applications. With a keen
                eye for design and a love for clean code, I bring ideas to life through technology. I've worked on
                diverse projects ranging from agricultural management systems to fuel discovery platforms and enterprise
                rent management solutions.
              </p>
              <div className="flex justify-center gap-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                    <Github className="h-5 w-5" />
                  </Button>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </a>
                <a href="mailto:abrhambest7@gmail.com">
                  <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                    <Mail className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Skills Section */}
      <ScrollReveal>
        <SkillsSection />
      </ScrollReveal>

      <TechStack />

      {/* Add Testimonials section before Projects */}
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>

      {/* Projects Section - Using Carousel */}
      <ScrollReveal>
        <section id="projects" className="py-20">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
            <ProjectsCarousel />
          </div>
        </section>
      </ScrollReveal>

      {/* Contact Section */}
      <ScrollReveal>
        <section id="contact" className="py-20 bg-muted/50">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Get in Touch</h2>
            <div className="max-w-md mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>
      </ScrollReveal>

      <Footer />
    </div>
  )
}
