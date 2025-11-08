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

      <ScrollReveal>
        <section id="about" className="py-20 bg-muted/50 relative overflow-hidden">
          {/* Background gradient animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50"></div>

          <div className="container px-4 mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              <span className="inline-block animate-fade-in-up">About Me</span>
            </h2>

            <div className="max-w-3xl mx-auto">
              {/* Main content card */}
              <div
                className="backdrop-blur-sm bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8 md:p-12 border border-primary/10 shadow-lg animate-fade-in-up"
                style={{ animationDelay: "0.1s" }}
              >
                <p
                  className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  I'm a passionate developer focused on creating beautiful and functional web applications. With a keen
                  eye for design and a love for clean code, I bring ideas to life through technology. I've worked on
                  diverse projects ranging from agricultural management systems to fuel discovery platforms and
                  enterprise rent management solutions.
                </p>

                {/* Experience highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div
                    className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <p className="text-2xl md:text-3xl font-bold text-primary">5+</p>
                    <p className="text-sm text-muted-foreground">Months Experience</p>
                  </div>
                  <div
                    className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <p className="text-2xl md:text-3xl font-bold text-primary">4+</p>
                    <p className="text-sm text-muted-foreground">Projects Delivered</p>
                  </div>
                  <div
                    className="text-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <p className="text-2xl md:text-3xl font-bold text-primary">3+</p>
                    <p className="text-sm text-muted-foreground">Companies</p>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                  <a href="https://github.com/RasAbrish" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:scale-110 transition-transform hover:text-primary hover:bg-primary/10 rounded-full"
                    >
                      <Github className="h-5 w-5" />
                    </Button>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abrham-ababu-85a112297/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:scale-110 transition-transform hover:text-primary hover:bg-primary/10 rounded-full"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </a>
                  <a href="mailto:abrhambest7@gmail.com">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:scale-110 transition-transform hover:text-primary hover:bg-primary/10 rounded-full"
                    >
                      <Mail className="h-5 w-5" />
                    </Button>
                  </a>
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
