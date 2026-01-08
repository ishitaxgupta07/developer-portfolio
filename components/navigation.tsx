"use client"

import { motion } from "framer-motion"
import type { RefObject } from "react"
import { Rocket, Globe, Layers, Sparkles, GraduationCap, Radio, Sun } from "lucide-react"

const navItems = [
  { id: "hero", label: "Core", icon: Sun },
  { id: "about", label: "Origins", icon: Globe },
  { id: "projects", label: "Systems", icon: Layers },
  { id: "skills", label: "Stars", icon: Sparkles },
  { id: "experience", label: "Missions", icon: Rocket },
  { id: "education", label: "Archives", icon: GraduationCap },
  { id: "contact", label: "Signal", icon: Radio },
]

interface NavigationProps {
  activeSection: string
  containerRef: RefObject<HTMLDivElement | null>
}

export default function Navigation({ activeSection, containerRef }: NavigationProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element && containerRef.current) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Desktop navigation */}
      <motion.nav
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="flex flex-col gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                  activeSection === item.id ? "bg-cyan-500/20 border border-cyan-500/40" : "hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    activeSection === item.id ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300"
                  }`}
                />

                {/* Tooltip */}
                <span className="absolute right-full mr-3 px-2 py-1 rounded-lg bg-gray-900 border border-gray-800 text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {item.label}
                </span>

                {/* Active indicator */}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute -right-1 w-1 h-4 bg-cyan-400 rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </motion.nav>

      {/* Mobile navigation */}
      <motion.nav
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="flex gap-1 p-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                  activeSection === item.id ? "bg-cyan-500/20" : "hover:bg-white/10"
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className={`w-4 h-4 ${activeSection === item.id ? "text-cyan-400" : "text-gray-500"}`} />
              </motion.button>
            )
          })}
        </div>
      </motion.nav>
    </>
  )
}
