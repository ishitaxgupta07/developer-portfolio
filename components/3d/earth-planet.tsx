"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function Planet() {
  const planetRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= 0.001
    }
  })

  return (
    <group>
      {/* Planet core */}
      <Sphere ref={planetRef} args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#1a4a6e"
          emissive="#0a2a4e"
          emissiveIntensity={0.3}
          distort={0.1}
          speed={1.5}
          roughness={0.8}
        />
      </Sphere>

      {/* Atmosphere */}
      <Sphere ref={atmosphereRef} args={[2.1, 32, 32]}>
        <meshBasicMaterial color="#44aaff" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>

      {/* Outer glow */}
      <Sphere args={[2.3, 32, 32]}>
        <meshBasicMaterial color="#22aaff" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>
    </group>
  )
}

export default function EarthPlanet() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#44aaff" />
        <Planet />
      </Canvas>
    </div>
  )
}
