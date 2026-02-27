"use client"

import React, { useRef, useMemo, Suspense, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Html, ContactShadows, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

const techStack = [
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Tailwind CSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
]

function FloatingTechIcons() {
  const groupRef = useRef<THREE.Group>(null)
  
  const icons = useMemo(() => {
    return techStack.map((tech, i) => {
      // Distribute evenly in a circle
      const angle = (i / techStack.length) * Math.PI * 2
      const radius = 3.5
      return {
        ...tech,
        position: [
          Math.cos(angle) * radius, 
          (Math.random() - 0.5) * 2, 
          Math.sin(angle) * radius
        ] as [number, number, number],
        rotationIntensity: 1 + Math.random(),
        floatIntensity: 1.5 + Math.random(),
        speed: 1.5 + Math.random(),
      }
    })
  }, [])

  // Slowly rotate the entire group
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {icons.map((icon, i) => (
        <Float 
          key={i} 
          speed={icon.speed} 
          rotationIntensity={icon.rotationIntensity} 
          floatIntensity={icon.floatIntensity} 
          position={icon.position}
        >
          <Html center transform zIndexRange={[100, 0]} sprite>
            <div className="bg-background/80 backdrop-blur-md p-4 rounded-2xl border border-primary/10 shadow-lg flex flex-col items-center gap-3 w-28 h-28 justify-center transition-transform hover:scale-125 duration-300 pointer-events-auto cursor-pointer">
              <img src={icon.url} alt={icon.name} className="w-12 h-12 object-contain drop-shadow-md" />
              <span className="text-sm font-semibold text-foreground/80">{icon.name}</span>
            </div>
          </Html>
        </Float>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <FloatingTechIcons />
      <ContactShadows position={[0, -3.5, 0]} opacity={0.3} scale={20} blur={2.5} far={4} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </>
  )
}

export default function ThreeHero() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return <div className="absolute inset-0 z-0 bg-background" />

  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  )
}
