"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Trophy, Users, Code, Lightbulb, X } from "lucide-react"

const experiences = [
  {
    id: 1,
    type: "hackathon",
    title: "TechXcelerate",
    organization: "BITS Pilani",
    achievement: "Finalists",
    description:
      "Built SkillSwap, a peer-to-peer skill exchange web platform. Designed an intuitive dashboard for skill-based matching.",
    highlights: [
      { icon: Code, text: "Led frontend development using React and TailwindCSS" },
      { icon: Users, text: "Peer-to-peer skill exchange platform" },
      { icon: Lightbulb, text: "Intuitive dashboard for skill matching" },
    ],
    color: "#f59e0b",
  },
  {
    id: 2,
    type: "volunteer",
    title: "Event Volunteer",
    organization: "ISE Student Club & Pentagram",
    description: "Coordinated large-scale college events with cross-functional teams.",
    highlights: [
      { icon: Users, text: "Managed logistics, registrations, and communication" },
      { icon: Trophy, text: "Demonstrated strong leadership skills" },
      { icon: Lightbulb, text: "Problem-solving in high-pressure environments" },
    ],
    color: "#06b6d4",
  },
]

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [selectedExp, setSelectedExp] = useState<(typeof experiences)[0] | null>(null)

  return (
    <section id="experience" ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cyan-400/60 text-sm tracking-[0.4em] uppercase">Asteroid Belt</span>
          <h2 className="text-4xl md:text-5xl font-light text-white mt-4 tracking-tight">
            Experience & <span className="font-medium text-cyan-300">Missions</span>
          </h2>
        </motion.div>

        {/* Asteroid belt visual */}
        <div className="relative">
          {/* Orbital path */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] border border-gray-700/30 rounded-full"
            style={{ transform: "translate(-50%, -50%) rotateX(60deg)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          <div className="grid md:grid-cols-2 gap-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 cursor-pointer transition-all duration-500"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onClick={() => setSelectedExp(exp)}
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(34, 211, 238, 0.1)" }}
              >
                {/* Asteroid indicator */}
                <motion.div
                  className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: exp.color }}
                  animate={{
                    boxShadow: [`0 0 20px ${exp.color}60`, `0 0 40px ${exp.color}80`, `0 0 20px ${exp.color}60`],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Trophy className="w-4 h-4 text-white" />
                </motion.div>

                <div className="mb-4">
                  <h3 className="text-xl font-medium text-white mb-1">{exp.title}</h3>
                  <p className="text-cyan-400/80 text-sm">{exp.organization}</p>
                  {exp.achievement && (
                    <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {exp.achievement}
                    </span>
                  )}
                </div>

                <p className="text-gray-400 text-sm mb-4">{exp.description}</p>

                <div className="space-y-2">
                  {exp.highlights.slice(0, 2).map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                      <highlight.icon className="w-3 h-3 text-cyan-400" />
                      <span>{highlight.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating asteroids */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gray-600 rounded-full opacity-40"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${30 + Math.random() * 40}%`,
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Detail modal */}
      {selectedExp && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedExp(null)} />

          <motion.div
            className="relative w-full max-w-lg bg-[#0B0D10] border border-white/10 rounded-2xl p-8"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
          >
            <button
              onClick={() => setSelectedExp(null)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedExp.color }} />
              <h3 className="text-2xl font-medium text-white">{selectedExp.title}</h3>
            </div>

            <p className="text-cyan-400/80 mb-2">{selectedExp.organization}</p>
            {selectedExp.achievement && (
              <span className="inline-block mb-4 px-3 py-1 text-sm rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                🏆 {selectedExp.achievement}
              </span>
            )}

            <p className="text-gray-300 mb-6">{selectedExp.description}</p>

            <div className="space-y-3">
              {selectedExp.highlights.map((highlight, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                  <highlight.icon className="w-4 h-4 text-cyan-400" />
                  <span>{highlight.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
