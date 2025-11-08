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
    this.gradients = [
      "rgba(61, 90, 254, 0.8)",
      "rgba(255, 38, 142, 0.8)",
      "rgba(0, 199, 235, 0.8)",
      "rgba(255, 87, 51, 0.8)",
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
      size: Math.random() * 2 + 0.1,
      baseX: x,
      baseY: y,
      density: Math.random() * 30 + 1,
      color,
      angle: Math.random() * 360,
      speed: 0.02 + Math.random() * 0.04,
      effect: this,
    }
  }

  drawParticle(particle: Particle) {
    this.context.beginPath()
    this.context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    this.context.fillStyle = particle.color
    this.context.fill()
  }

  connectParticles() {
    const maxDistance = 120
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
          gradient.addColorStop(0, this.particles[a].color.replace("0.8", `${opacity * 0.5}`))
          gradient.addColorStop(1, this.particles[b].color.replace("0.8", `${opacity * 0.5}`))

          this.context.beginPath()
          this.context.strokeStyle = gradient
          this.context.lineWidth = 0.5
          this.context.moveTo(this.particles[a].x, this.particles[a].y)
          this.context.lineTo(this.particles[b].x, this.particles[b].y)
          this.context.stroke()
        }
      }
    }
  }

  updateParticle(particle: Particle) {
    if (this.mouse.pressed) {
      const dx = this.mouse.x - particle.x
      const dy = this.mouse.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const force = (this.mouse.pressed ? 8 : 4) / particle.density

      if (distance < 100) {
        const angle = Math.atan2(dy, dx)
        particle.x -= Math.cos(angle) * force
        particle.y -= Math.sin(angle) * force
      }
    }

    // Spiral movement
    particle.angle += particle.speed
    const noise = Math.sin(particle.angle) * 2

    // Return to base position
    const dx = particle.baseX - particle.x
    const dy = particle.baseY - particle.y
    particle.x += dx * 0.05
    particle.y += dy * 0.05

    // Add some randomness
    particle.x += Math.sin(particle.angle * 0.5) * noise
    particle.y += Math.cos(particle.angle * 0.5) * noise
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
