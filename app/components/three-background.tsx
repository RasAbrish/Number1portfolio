"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Float, MeshDistortMaterial, Sphere } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as random from "maath/random"

function ParticleField(props: any) {
  const ref = useRef<any>(null)
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }), [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15
      ref.current.rotation.y -= delta / 20
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#3d5afe"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  )
}

function AnimatedShape() {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
      <Sphere args={[1, 100, 200]} scale={1.4}>
        <MeshDistortMaterial
          color="#3d5afe"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={1} color="#ff268e" />
          
          <ParticleField />
          <AnimatedShape />
          
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={0.5} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
