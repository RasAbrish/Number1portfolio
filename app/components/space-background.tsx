"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
// @ts-expect-error maath esm
import * as random from "maath/random/dist/maath-random.esm"
import * as THREE from "three"
import { useTheme } from "next-themes"

function Stars({ isWarping, isDark }: { isWarping: boolean; isDark: boolean }) {
  const ref = useRef<THREE.Points>(null)

  const sphere = useMemo(() => {
    const arr = new Float32Array(6000 * 3)
    random.inSphere(arr, { radius: 1.5 })
    return arr
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    if (isWarping) {
      ref.current.rotation.x -= delta * 1.5
      ref.current.rotation.y -= delta * 2.0
      const scale = THREE.MathUtils.lerp(ref.current.scale.z, 5, 0.1)
      ref.current.scale.set(1, 1, scale)
    } else {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
      const scale = THREE.MathUtils.lerp(ref.current.scale.z, 1, 0.05)
      ref.current.scale.set(1, 1, scale)
    }
  })

  // Dark mode: white stars. Light mode: very dark navy stars with higher opacity
  const starColor = isDark ? "#e2e8f0" : "#0f172a"
  const starSize = isDark
    ? (isWarping ? 0.006 : 0.0025)
    : (isWarping ? 0.010 : 0.005)
  const starOpacity = isDark
    ? (isWarping ? 0.9 : 0.65)
    : (isWarping ? 1 : 0.9)

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={starColor}
          size={starSize}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={starOpacity}
        />
      </Points>
    </group>
  )
}

export default function SpaceBackground() {
  const [isWarping, setIsWarping] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = !mounted || resolvedTheme !== "light"

  return (
    <div
      className="absolute inset-0 z-0 bg-background cursor-crosshair overflow-hidden"
      onPointerDown={() => setIsWarping(true)}
      onPointerUp={() => setIsWarping(false)}
      onPointerLeave={() => setIsWarping(false)}
    >
      <div
        className={`absolute bottom-6 right-8 z-10 text-xs tracking-widest uppercase pointer-events-none select-none transition-opacity duration-300 ${isWarping ? "opacity-0" : "opacity-40"} ${isDark ? "text-white" : "text-slate-900"}`}
      >
        Hold to Warp ✦
      </div>
      <Canvas camera={{ position: [0, 0, 1] }}>
        {mounted && <Stars isWarping={isWarping} isDark={isDark} />}
      </Canvas>
    </div>
  )
}
