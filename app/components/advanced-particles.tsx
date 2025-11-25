"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  baseX: number
  baseY: number
  density: number
  color: string
  angle: number
  speed: number
  effect: Effect
  pulse: number
  pulseSpeed: number
}

class Effect {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  width: number
  height: number
  particles: Particle[]
  mouse: { x: number; y: number; pressed: boolean }
  gradients: string[]
  particleCount: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = canvas.getContext("2d")!
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.particles = []
    this.mouse = {
      x: -1000,
      y: -1000,
      pressed: false,
    }
    // More vibrant, saturated colors
    this.gradients = [
      "rgba(61, 90, 254, 1)",      // Vibrant blue
      "rgba(255, 38, 142, 1)",     // Hot pink
      "rgba(0, 255, 255, 1)",      // Cyan
      "rgba(138, 43, 226, 1)",     // Blue violet
      "rgba(255, 215, 0, 1)",      // Gold
    ]
    this.particleCount = Math.min((this.width * this.height) / 8000, 300)

    window.addEventListener("resize", () => this.handleResize())
    window.addEventListener("mousemove", (e) => this.handleMouse(e))
    window.addEventListener("touchmove", (e) => this.handleTouch(e))
    window.addEventListener("mousedown", () => (this.mouse.pressed = true))
    window.addEventListener("mouseup", () => (this.mouse.pressed = false))
    window.addEventListener("touchstart", () => (this.mouse.pressed = true))
    window.addEventListener("touchend", () => (this.mouse.pressed = false))
  }

  handleResize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.init()
  }

  handleMouse(e: MouseEvent) {
    this.mouse.x = e.x
    this.mouse.y = e.y
  }

  handleTouch(e: TouchEvent) {
    e.preventDefault()
    this.mouse.x = e.touches[0].clientX
    this.mouse.y = e.touches[0].clientY
  }

  init() {
    this.particles = []
    for (let i = 0; i < this.particleCount; i++) {
      const x = Math.random() * this.width
      const y = Math.random() * this.height
      const color = this.gradients[Math.floor(Math.random() * this.gradients.length)]
      this.particles.push(this.createParticle(x, y, color))
    }
  }

  createParticle(x: number, y: number, color: string): Particle {
    return {
      x,
      y,
      size: Math.random() * 4 + 1,  // Larger particles (1-5px)
      baseX: x,
      baseY: y,
      density: Math.random() * 30 + 1,
      color,
      angle: Math.random() * 360,
      speed: 0.02 + Math.random() * 0.04,
      effect: this,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    }
  }

  drawParticle(particle: Particle) {
    // Calculate pulsing size
    const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5
    
    // Add glow effect
    this.context.shadowBlur = 15
    this.context.shadowColor = particle.color
    
    this.context.beginPath()
    this.context.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2)
    this.context.fillStyle = particle.color
    this.context.fill()
    
    // Reset shadow for performance
    this.context.shadowBlur = 0
  }

  connectParticles() {
    const maxDistance = 150  // Larger connection distance
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x
        const dy = this.particles[a].y - this.particles[b].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance
          const gradient = this.context.createLinearGradient(
            this.particles[a].x,
            this.particles[a].y,
            this.particles[b].x,
            this.particles[b].y,
          )
          // More vibrant connection lines
          gradient.addColorStop(0, this.particles[a].color.replace("1)", `${opacity * 0.8})`))
          gradient.addColorStop(1, this.particles[b].color.replace("1)", `${opacity * 0.8})`))

          this.context.beginPath()
          this.context.strokeStyle = gradient
          this.context.lineWidth = 1.5  // Thicker lines
          this.context.moveTo(this.particles[a].x, this.particles[a].y)
          this.context.lineTo(this.particles[b].x, this.particles[b].y)
          this.context.stroke()
        }
      }
    }
  }

  updateParticle(particle: Particle) {
    // Enhanced mouse interaction
    if (this.mouse.pressed) {
      const dx = this.mouse.x - particle.x
      const dy = this.mouse.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const force = (this.mouse.pressed ? 10 : 5) / particle.density

      if (distance < 150) {  // Larger interaction radius
        const angle = Math.atan2(dy, dx)
        particle.x -= Math.cos(angle) * force
        particle.y -= Math.sin(angle) * force
      }
    }

    // Wave motion
    particle.angle += particle.speed
    const wave = Math.sin(particle.angle) * 3  // Larger wave amplitude
    const flow = Math.cos(particle.angle * 0.5) * 2

    // Return to base position with wave motion
    const dx = particle.baseX - particle.x
    const dy = particle.baseY - particle.y
    particle.x += dx * 0.05
    particle.y += dy * 0.05

    // Add flowing wave patterns
    particle.x += Math.sin(particle.angle * 0.5) * wave
    particle.y += Math.cos(particle.angle * 0.5) * wave
    particle.x += Math.cos(particle.angle * 0.3) * flow
    
    // Update pulse
    particle.pulse += particle.pulseSpeed
  }

  animate() {
    this.context.clearRect(0, 0, this.width, this.height)
    this.particles.forEach((particle) => {
      this.updateParticle(particle)
      this.drawParticle(particle)
    })
    this.connectParticles()
    requestAnimationFrame(() => this.animate())
  }
}

export default function AdvancedParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const effect = new Effect(canvas)
    effect.init()
    effect.animate()
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ background: "transparent" }} />
  )
}
