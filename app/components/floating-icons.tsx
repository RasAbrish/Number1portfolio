"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface Icon {
  src: string
  alt: string
  x: number
  y: number
  speed: number
  amplitude: number
  phase: number
}

export default function FloatingIcons() {
  const [icons, setIcons] = useState<Icon[]>([
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      alt: "React",
      x: 20,
      y: 20,
      speed: 0.002,
      amplitude: 30,
      phase: 0,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      alt: "TypeScript",
      x: 80,
      y: 40,
      speed: 0.003,
      amplitude: 20,
      phase: 2,
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      alt: "Next.js",
      x: 70,
      y: 70,
      speed: 0.002,
      amplitude: 25,
      phase: 4,
    },
  ])

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20, // -10 to 10
        y: (e.clientY / window.innerHeight - 0.5) * 20, // -10 to 10
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      setIcons((prevIcons) =>
        prevIcons.map((icon) => ({
          ...icon,
          phase: icon.phase + icon.speed,
        })),
      )
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map((icon, index) => (
        <div
          key={index}
          className="absolute w-12 h-12"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            transform: `translate(calc(-50% + ${mousePos.x * (index + 2) * -0.5}px), calc(-50% + ${mousePos.y * (index + 2) * -0.5}px)) translateY(${Math.sin(icon.phase) * icon.amplitude}px)`,
            transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          <Image src={icon.src || "/placeholder.svg"} alt={icon.alt} width={48} height={48} className="opacity-20" />
        </div>
      ))}
    </div>
  )
}
