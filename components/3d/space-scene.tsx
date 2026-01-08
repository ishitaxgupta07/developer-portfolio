"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars, Sphere } from "@react-three/drei"
import * as THREE from "three"

// Realistic star field with varying colors based on temperature
function RealisticStars() {
  const starsRef = useRef<THREE.Points>(null)
  const count = 15000

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    // Star color temperatures (Kelvin) mapped to RGB
    const starColors = [
      { r: 0.7, g: 0.8, b: 1.0 }, // Blue-white (hot)
      { r: 1.0, g: 1.0, b: 1.0 }, // White
      { r: 1.0, g: 0.95, b: 0.85 }, // Yellow-white
      { r: 1.0, g: 0.85, b: 0.7 }, // Yellow
      { r: 1.0, g: 0.7, b: 0.5 }, // Orange
      { r: 1.0, g: 0.5, b: 0.4 }, // Red
    ]

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 50 + Math.random() * 150

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Random star color based on "temperature"
      const color = starColors[Math.floor(Math.random() * starColors.length)]
      const brightness = 0.5 + Math.random() * 0.5
      colors[i * 3] = color.r * brightness
      colors[i * 3 + 1] = color.g * brightness
      colors[i * 3 + 2] = color.b * brightness

      // Vary sizes - most stars are small, few are bright
      sizes[i] = Math.random() < 0.98 ? 0.3 + Math.random() * 0.7 : 1.5 + Math.random() * 1.5
    }

    return [positions, colors, sizes]
  }, [])

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.00005
      starsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.02
    }
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Distant galaxy spiral
function GalaxySpiral() {
  const galaxyRef = useRef<THREE.Points>(null)
  const count = 20000

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const branches = 3
    const spin = 1.5
    const randomnessPower = 3

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 30
      const branchAngle = ((i % branches) / branches) * Math.PI * 2
      const spinAngle = radius * spin

      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius

      positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      positions[i * 3 + 1] = randomY * 0.2
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

      // Color gradient from center (bright) to edge (dim cyan/blue)
      const colorInside = { r: 1.0, g: 0.9, b: 0.7 }
      const colorOutside = { r: 0.2, g: 0.5, b: 0.8 }
      const mixedColor = {
        r: colorInside.r + (colorOutside.r - colorInside.r) * (radius / 30),
        g: colorInside.g + (colorOutside.g - colorInside.g) * (radius / 30),
        b: colorInside.b + (colorOutside.b - colorInside.b) * (radius / 30),
      }

      colors[i * 3] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b
    }

    return [positions, colors]
  }, [])

  useFrame(() => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += 0.0002
    }
  })

  return (
    <group position={[0, 0, -80]} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
      <points ref={galaxyRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* Galaxy core glow */}
      <Sphere args={[3, 32, 32]}>
        <meshBasicMaterial color="#fff8e7" transparent opacity={0.15} />
      </Sphere>
      <Sphere args={[5, 32, 32]}>
        <meshBasicMaterial color="#88aaff" transparent opacity={0.05} />
      </Sphere>
    </group>
  )
}

// Nebula clouds using multiple layers
function NebulaCloud({
  position,
  color,
  scale = 1,
}: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.0001
      meshRef.current.material.opacity = 0.08 + Math.sin(state.clock.elapsedTime * 0.2) * 0.02
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

// Shooting stars
function ShootingStars() {
  const ref = useRef<THREE.Group>(null)
  const [stars, setStars] = useState<
    Array<{ id: number; startPos: THREE.Vector3; angle: number; speed: number; life: number }>
  >([])

  useEffect(() => {
    const createStar = () => ({
      id: Math.random(),
      startPos: new THREE.Vector3((Math.random() - 0.5) * 100, 30 + Math.random() * 20, -20 + Math.random() * 40),
      angle: Math.PI / 4 + Math.random() * 0.3,
      speed: 0.5 + Math.random() * 0.5,
      life: 0,
    })

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setStars((prev) => [...prev.slice(-3), createStar()])
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useFrame((_, delta) => {
    setStars((prev) => prev.map((star) => ({ ...star, life: star.life + delta })).filter((star) => star.life < 2))
  })

  return (
    <group ref={ref}>
      {stars.map((star) => (
        <mesh
          key={star.id}
          position={[
            star.startPos.x + Math.cos(star.angle) * star.life * 50 * star.speed,
            star.startPos.y - Math.sin(star.angle) * star.life * 50 * star.speed,
            star.startPos.z,
          ]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={Math.max(0, 1 - star.life * 0.5)} />
        </mesh>
      ))}
    </group>
  )
}

// Cosmic dust particles
function CosmicDust() {
  const dustRef = useRef<THREE.Points>(null)
  const count = 3000

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 200
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200
    }
    return pos
  }, [])

  useFrame((state) => {
    if (dustRef.current) {
      dustRef.current.rotation.y = state.clock.elapsedTime * 0.01
      dustRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1
    }
  })

  return (
    <points ref={dustRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#667799"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Parallax camera controller
function ParallaxCamera({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()

  useFrame(() => {
    camera.position.z = 30 - scrollProgress * 10
    camera.position.y = scrollProgress * 5
    camera.lookAt(0, 0, -50)
  })

  return null
}

interface SpaceSceneProps {
  scrollProgress?: number
}

export default function SpaceScene({ scrollProgress = 0 }: SpaceSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 30], fov: 60, near: 0.1, far: 500 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#030508"]} />
      <fog attach="fog" args={["#030508", 50, 250]} />

      <ambientLight intensity={0.1} />

      <ParallaxCamera scrollProgress={scrollProgress} />

      {/* Background stars */}
      <Stars radius={200} depth={100} count={5000} factor={4} saturation={0} fade speed={0.5} />

      {/* Custom realistic stars */}
      <RealisticStars />

      {/* Galaxy in the distance */}
      <GalaxySpiral />

      {/* Nebula clouds */}
      <NebulaCloud position={[-40, 20, -60]} color="#1a4a7a" scale={1.5} />
      <NebulaCloud position={[50, -10, -80]} color="#4a1a5a" scale={1.2} />
      <NebulaCloud position={[0, -30, -100]} color="#1a5a4a" scale={2} />
      <NebulaCloud position={[30, 40, -70]} color="#5a3a2a" scale={0.8} />

      {/* Shooting stars */}
      <ShootingStars />

      {/* Cosmic dust */}
      <CosmicDust />
    </Canvas>
  )
}
