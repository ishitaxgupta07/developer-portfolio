"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function SpaceBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Galaxy Layer */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "linear" }}
      >
        <Image
          src="/images/vibe-20mix-20wallpapers-20-e2-80-93-20mood-powered-20aesthetic.jpg"
          alt="Galaxy background"
          fill
          className="object-cover opacity-40 blur-[2px]"
          priority
        />
      </motion.div>

      {/* Nebula Layer */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <Image
          src="/images/download-20-289-29.jpg"
          alt="Nebula background"
          fill
          className="object-cover opacity-30 blur-[3px] mix-blend-screen"
          priority
        />
      </motion.div>

      {/* Dark overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D10]/70 via-[#0B0D10]/50 to-[#0B0D10]/80" />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0B0D10_70%)]" />
    </div>
  )
}
