"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const GLYPHS = ["{ }", "</>", "=>", "( )", "[ ]", "&&", "fn", "git", "$", ";", "0", "1", "#", "//", "===", "npm"]
const COUNT = 110
const BOUNDS = { x: 9, yTop: 5.5, yBottom: -5, z: 3 }

/** Track the .dark class on <html> so the scene follows the theme toggle. */
function useIsDark() {
  const [isDark, setIsDark] = useState(true)
  useEffect(() => {
    const el = document.documentElement
    const update = () => setIsDark(el.classList.contains("dark"))
    update()
    const observer = new MutationObserver(update)
    observer.observe(el, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])
  return isDark
}

/** Draws one code glyph onto a canvas so the scene needs no external font files. */
function makeGlyphTexture(glyph: string, dark: boolean): THREE.Texture {
  const canvas = document.createElement("canvas")
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext("2d")!
  ctx.font = "600 56px 'JetBrains Mono', ui-monospace, monospace"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  if (dark) {
    ctx.shadowColor = "rgba(216, 180, 94, 0.9)"
    ctx.shadowBlur = 18
    ctx.fillStyle = "#e6c87a"
  } else {
    // Deep bronze, no glow — crisp on the ivory canvas
    ctx.fillStyle = "#8a6d2f"
  }
  ctx.fillText(glyph, 64, 64)
  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 2
  return texture
}

interface Drop {
  x: number
  y: number
  z: number
  speed: number
  scale: number
  tex: number
  opacity: number
}

/** Code rain: gold glyphs falling through a perspective grid — the Matrix, recompiled in luxury. */
function GlyphRain({ dark }: { dark: boolean }) {
  const group = useRef<THREE.Group>(null)
  const sprites = useRef<(THREE.Sprite | null)[]>([])

  const textures = useMemo(() => GLYPHS.map((g) => makeGlyphTexture(g, dark)), [dark])
  const drops = useMemo<Drop[]>(
    () =>
      Array.from({ length: COUNT }, () => ({
        x: (Math.random() * 2 - 1) * BOUNDS.x,
        y: Math.random() * (BOUNDS.yTop - BOUNDS.yBottom) + BOUNDS.yBottom,
        z: (Math.random() * 2 - 1) * BOUNDS.z,
        speed: 0.25 + Math.random() * 0.9,
        scale: 0.18 + Math.random() * 0.4,
        tex: Math.floor(Math.random() * GLYPHS.length),
        opacity: 0.2 + Math.random() * 0.65,
      })),
    [],
  )

  useFrame((state, delta) => {
    drops.forEach((d, i) => {
      d.y -= d.speed * delta
      if (d.y < BOUNDS.yBottom) {
        d.y = BOUNDS.yTop
        d.x = (Math.random() * 2 - 1) * BOUNDS.x
      }
      const s = sprites.current[i]
      if (s) {
        s.position.set(d.x, d.y, d.z)
        // Fade out near the floor so glyphs dissolve into the grid
        const fade = Math.min(1, (d.y - BOUNDS.yBottom) / 1.5)
        ;(s.material as THREE.SpriteMaterial).opacity = d.opacity * fade
      }
    })

    if (group.current) {
      group.current.rotation.y += (state.pointer.x * 0.18 - group.current.rotation.y) * 0.05
      group.current.rotation.x += (-state.pointer.y * 0.08 - group.current.rotation.x) * 0.05
    }
  })

  return (
    <group ref={group}>
      {drops.map((d, i) => (
        <sprite
          key={i}
          ref={(el) => {
            sprites.current[i] = el
          }}
          position={[d.x, d.y, d.z]}
          scale={[d.scale, d.scale, 1]}
        >
          <spriteMaterial map={textures[d.tex]} transparent depthWrite={false} opacity={d.opacity} />
        </sprite>
      ))}

      {/* Perspective wireframe floor + ceiling echo — dark mode only; on ivory they read as clutter */}
      {dark && (
        <>
          <gridHelper args={[40, 44, "#bd9544", "#3a3225"]} position={[0, BOUNDS.yBottom, 0]} />
          <gridHelper args={[40, 44, "#3a3225", "#241f15"]} position={[0, BOUNDS.yTop + 1.5, 0]} />
        </>
      )}
    </group>
  )
}

export default function HeroThree() {
  const isDark = useIsDark()

  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas camera={{ position: [0, 0.4, 6], fov: 65 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
        <fog attach="fog" args={[isDark ? "#0d0b08" : "#f6f1e7", 6, 16]} />
        <GlyphRain dark={isDark} />
      </Canvas>
      {/* Blend the scene into the page floor and keep text readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,hsl(var(--background))_95%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
