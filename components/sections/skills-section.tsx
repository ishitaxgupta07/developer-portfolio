"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

const skillCategories = [
  {
    name: "Frontend",
    color: "#06b6d4",
    skills: ["React", "Next.js", "JavaScript (ES6+)", "HTML5", "CSS3", "TailwindCSS"],
  },
  {
    name: "Backend",
    color: "#10b981",
    skills: ["Node.js", "Express.js", "PHP"],
  },
  {
    name: "Databases",
    color: "#8b5cf6",
    skills: ["MySQL", "MongoDB"],
  },
  {
    name: "Tools & CI/CD",
    color: "#f59e0b",
    skills: ["Git", "GitHub", "Vercel", "GitHub Actions"],
  },
  {
    name: "Languages",
    color: "#ef4444",
    skills: ["Python", "C++", "C", "Java"],
  },
  {
    name: "Libraries",
    color: "#ec4899",
    skills: ["NumPy", "Pandas", "scikit-learn"],
  },
]

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section id="skills" ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cyan-400/60 text-sm tracking-[0.4em] uppercase">Constellation Grid</span>
          <h2 className="text-4xl md:text-5xl font-light text-white mt-4 tracking-tight">
            Technical <span className="font-medium text-cyan-300">Skills</span>
          </h2>
        </motion.div>

        {/* Constellation network */}
        <div className="relative">
          {/* Connection lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                whileHover={{ boxShadow: `0 0 40px ${category.color}20` }}
              >
                {/* Category star */}
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color, boxShadow: `0 0 15px ${category.color}` }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <h3 className="text-lg font-medium text-white">{category.name}</h3>
                </div>

                {/* Skills as stars */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      className="relative group"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <motion.div
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 cursor-pointer transition-all duration-300"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: `${category.color}20`,
                          borderColor: category.color,
                          color: "#ffffff",
                        }}
                      >
                        {skill}
                      </motion.div>

                      {/* Glow effect on hover */}
                      {hoveredSkill === skill && (
                        <motion.div
                          className="absolute inset-0 rounded-full pointer-events-none"
                          style={{ boxShadow: `0 0 30px ${category.color}40` }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
