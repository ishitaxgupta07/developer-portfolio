"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"
import type { MotionValue } from "framer-motion"
import * as THREE from "three"

interface GlowingSunProps {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

function GlowingSun({ mouseX, mouseY }: GlowingSunProps) {
  const sunRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002
      const mx = mouseX.get() * 0.0001
      const my = mouseY.get() * 0.0001
      sunRef.current.position.x = mx * 2
      sunRef.current.position.y = -my * 2
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05)
    }
  })

  return (
    <group>
      {/* Inner core */}
      <Sphere ref={sunRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#ffffff"
          emissive="#88ddff"
          emissiveIntensity={0.5}
          distort={0.2}
          speed={2}
          roughness={0.2}
        />
      </Sphere>

      {/* Outer glow */}
      <Sphere ref={glowRef} args={[2, 32, 32]}>
        <meshBasicMaterial color="#44bbff" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>

      {/* Atmospheric glow */}
      <Sphere args={[2.5, 32, 32]}>
        <meshBasicMaterial color="#22aaff" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>
    </group>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 500

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 4 + Math.random() * 6
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#88ccff" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function SolarCore({ mouseX, mouseY }: GlowingSunProps) {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#88ddff" />
        <GlowingSun mouseX={mouseX} mouseY={mouseY} />
        <ParticleField />
      </Canvas>
    </div>
  )
}
