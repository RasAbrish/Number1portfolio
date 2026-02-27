import Navbar from "./navbar"
import Footer from "./footer"
import SkillsSection from "./skills-section"
import ContactForm from "./contact-form"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import ScrollReveal from "./components/scroll-reveal"
import Testimonials from "./components/testimonials"
import ProjectsCarousel from "./components/projects-carousel"
import ScrollDownIndicator from "./components/scroll-down-indicator"
import FloatingCharacter from "./components/floating-character"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center radial-grid pt-32 pb-20 overflow-hidden">
        <div className="container px-4 mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium animate-fade-in-up shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new opportunities
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif mb-8 tracking-tight leading-[1.1] animate-fade-in-up">
            Building Tomorrow's <br className="hidden md:block" /> 
            <span className="text-primary italic">High-Performance</span> Web
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-sans font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Hi, I'm <span className="text-foreground font-medium">Abrham</span>. A Full Stack Developer & Creative Problem Solver dedicated to crafting seamless digital experiences that drive results.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" className="rounded-full px-10 py-7 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/20 transition-all duration-300 hover:scale-105" asChild>
              <a href="#projects">Explore My Work</a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 py-7 text-lg border-border hover:bg-muted transition-all duration-300 hover:scale-105" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ScrollDownIndicator />
        </div>
      </section>

      <ScrollReveal>
        <section id="about" className="py-32 border-t border-border bg-background relative overflow-hidden">
          <div className="container px-4 mx-auto relative z-10">
            <div className="grid lg:grid-cols-[1fr,2fr] gap-16 items-center">
              <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="aspect-[4/5] max-w-[300px] mx-auto lg:ml-0 rounded-3xl overflow-hidden shadow-2xl relative">
                  <Image 
                    src="/assets/images/profile-photo.jpg" 
                    alt="Abrham" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-primary/40 rounded-bl-3xl -z-10" />
                <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary/40 rounded-tr-3xl -z-10" />
              </div>

              <div>
                <h2 className="text-4xl md:text-6xl font-serif mb-8 animate-fade-in-up">
                  About <span className="text-primary italic">Me</span>
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  <p>
                    I'm a passionate developer focused on creating beautiful and functional web applications. With a keen
                    eye for design and a love for clean code, I bring ideas to life through technology.
                  </p>
                  <p>
                    I've worked on diverse projects ranging from agricultural management systems to fuel discovery platforms and
                    enterprise rent management solutions. My goal is always to deliver value through robust architecture and exceptional user experiences.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <div className="p-6 rounded-2xl bg-muted/50 border border-border/50">
                    <p className="text-3xl font-serif text-primary mb-1">5+</p>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Experience</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-muted/50 border border-border/50">
                    <p className="text-3xl font-serif text-primary mb-1">4+</p>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Projects</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-muted/50 border border-border/50">
                    <p className="text-3xl font-serif text-primary mb-1">3+</p>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Companies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Skills Section */}
      <ScrollReveal>
        <SkillsSection />
      </ScrollReveal>

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
      <FloatingCharacter />
    </div>
  )
}
