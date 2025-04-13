"use client"

import { Button } from "@/components/ui/button"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  // Animation controls for the network nodes
  const controls = useAnimation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMobile()

  // Network animation setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Network nodes
    const particlesArray: Particle[] = []
    // Adjust number of particles based on screen size
    const numberOfParticles = isMobile ? 40 : 80

    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(canvas, isMobile))
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw(ctx)
      }

      // Connect particles
      connectParticles(ctx, particlesArray, isMobile)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      {/* Network background */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10 bg-white dark:bg-black" />

      <div className="container flex flex-col items-center gap-6 md:gap-8 text-center z-10 px-4">
        <div className="perspective-1000">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-2 md:mb-4">
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-500 animate-shimmer bg-[length:200%_auto]">
              Abrham Ababu
            </span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl">
            A passionate developer focused on creating impactful digital experiences
          </p>
        </div>

        <motion.div
          className="space-x-2 md:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Button
            className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 text-xs md:text-sm"
            onClick={() => scrollToSection("contact")}
          >
            Get in Touch
          </Button>
          <Button
            variant="outline"
            className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 transition-all duration-300 text-xs md:text-sm"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
          </Button>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
            <button
              onClick={() => scrollToSection("about")}
              className="flex flex-col items-center text-muted-foreground hover:text-cyan-500 transition-colors"
            >
              <span className="text-xs md:text-sm mb-2">Scroll Down</span>
              <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-cyan-500/50 rounded-full flex justify-center p-1">
                <motion.div
                  className="w-1 h-1 bg-cyan-500 rounded-full"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                />
              </div>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Particle class for network animation
class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  canvas: HTMLCanvasElement
  color: string
  isMobile: boolean

  constructor(canvas: HTMLCanvasElement, isMobile: boolean) {
    this.canvas = canvas
    this.isMobile = isMobile
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 2 + 1
    // Slower speed on mobile for better performance
    const speedFactor = isMobile ? 0.2 : 0.5
    this.speedX = Math.random() * speedFactor - speedFactor / 2
    this.speedY = Math.random() * speedFactor - speedFactor / 2
    this.color = getComputedStyle(document.documentElement).getPropertyValue("--color-primary") || "#06b6d4"
  }

  update() {
    // Move particles
    this.x += this.speedX
    this.y += this.speedY

    // Bounce off edges
    if (this.x > this.canvas.width || this.x < 0) {
      this.speedX = -this.speedX
    }
    if (this.y > this.canvas.height || this.y < 0) {
      this.speedY = -this.speedY
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

// Connect particles with lines if they're close enough
function connectParticles(ctx: CanvasRenderingContext2D, particles: Particle[], isMobile: boolean) {
  // Adjust max distance based on screen size
  const maxDistance = isMobile ? 150 : 250

  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x
      const dy = particles[a].y - particles[b].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < maxDistance) {
        // Calculate opacity based on distance
        const opacity = 1 - distance / maxDistance

        // Get theme color
        const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        const color = isDarkMode
          ? "rgba(6, 182, 212, " + opacity * 0.4 + ")" // Reduced opacity for more subtle lines
          : "rgba(6, 182, 212, " + opacity * 0.15 + ")" // Reduced opacity for more subtle lines

        ctx.strokeStyle = color
        ctx.lineWidth = isMobile ? 0.6 : 0.8 // Thinner lines on mobile
        ctx.beginPath()
        ctx.moveTo(particles[a].x, particles[a].y)
        ctx.lineTo(particles[b].x, particles[b].y)
        ctx.stroke()
      }
    }
  }
}
