"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"
import type { MotionValue } from "framer-motion"
import * as THREE from "three"

interface HeroOrbProps {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

function GlowingCore({ mouseX, mouseY }: HeroOrbProps) {
  const coreRef = useRef<THREE.Mesh>(null)
  const outerRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.003
      coreRef.current.rotation.x += 0.001
      const mx = mouseX.get() * 0.00008
      const my = mouseY.get() * 0.00008
      coreRef.current.position.x = mx * 3
      coreRef.current.position.y = -my * 3
    }
    if (outerRef.current) {
      outerRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03)
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.1
      ringsRef.current.rotation.x = Math.PI / 4 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group>
      {/* Inner glowing core */}
      <Sphere ref={coreRef} args={[1.8, 128, 128]}>
        <MeshDistortMaterial
          color="#ffffff"
          emissive="#60a5fa"
          emissiveIntensity={0.6}
          distort={0.25}
          speed={3}
          roughness={0.1}
          metalness={0.3}
        />
      </Sphere>

      {/* Energy field */}
      <Sphere ref={outerRef} args={[2.5, 64, 64]}>
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.08} side={THREE.BackSide} />
      </Sphere>

      {/* Outer atmospheric glow */}
      <Sphere args={[3.2, 32, 32]}>
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.04} side={THREE.BackSide} />
      </Sphere>

      {/* Orbital rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.8, 3, 64]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0.3, 0]}>
          <ringGeometry args={[3.2, 3.4, 64]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  )
}

function EnergyParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 800

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 5
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      vel[i * 3] = (Math.random() - 0.5) * 0.01
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01
    }
    return [pos, vel]
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.15
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#67e8f9"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function HeroOrb({ mouseX, mouseY }: HeroOrbProps) {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.15} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#38bdf8" />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#c4b5fd" />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#fde68a" />
        <GlowingCore mouseX={mouseX} mouseY={mouseY} />
        <EnergyParticles />
      </Canvas>
    </div>
  )
}
