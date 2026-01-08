"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Ring } from "@react-three/drei"
import * as THREE from "three"

function Saturn() {
  const planetRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.001
    }
  })

  return (
    <group rotation={[0.3, 0, 0.1]}>
      {/* Planet */}
      <Sphere ref={planetRef} args={[1.5, 64, 64]}>
        <meshStandardMaterial color="#c9a866" emissive="#8b6914" emissiveIntensity={0.2} roughness={0.8} />
      </Sphere>

      {/* Rings */}
      <Ring ref={ringRef} args={[2, 3.5, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#a89060" transparent opacity={0.6} side={THREE.DoubleSide} />
      </Ring>

      <Ring args={[2.2, 2.8, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#c9b896" transparent opacity={0.4} side={THREE.DoubleSide} />
      </Ring>

      {/* Glow */}
      <Sphere args={[1.7, 32, 32]}>
        <meshBasicMaterial color="#ffdd88" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>
    </group>
  )
}

export default function SaturnPlanet() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ffaa44" />
        <Saturn />
      </Canvas>
    </div>
  )
}
