"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Award, BookOpen } from "lucide-react"

const education = [
  {
    degree: "B.E. in Information Science & Engineering",
    institution: "B.M.S. College of Engineering",
    score: "9.14 CGPA",
    icon: GraduationCap,
    highlight: true,
  },
  {
    degree: "Senior Secondary (Class XII)",
    institution: "St. Michael's High School",
    score: "92.2%",
    icon: Award,
    highlight: false,
  },
  {
    degree: "Secondary (Class X)",
    institution: "St. Joseph's Convent High School",
    score: "94.8%",
    icon: BookOpen,
    highlight: false,
  },
]

const coursework = [
  "Data Structures",
  "Object-Oriented Programming",
  "Operating Systems",
  "Database Management Systems",
  "Machine Learning",
  "Computer Networks",
]

export default function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  return (
    <section id="education" ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cyan-400/60 text-sm tracking-[0.4em] uppercase">Deep Space Archives</span>
          <h2 className="text-4xl md:text-5xl font-light text-white mt-4 tracking-tight">
            Educational <span className="font-medium text-cyan-300">Foundation</span>
          </h2>
        </motion.div>

        {/* Holographic panels */}
        <div className="space-y-6 mb-16">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              className={`relative p-8 rounded-2xl border transition-all duration-500 ${
                edu.highlight
                  ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30"
                  : "bg-white/5 border-white/10 hover:border-cyan-500/20"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ boxShadow: "0 0 40px rgba(34, 211, 238, 0.1)" }}
            >
              {/* Holographic effect */}
              {edu.highlight && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-transparent"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              )}

              <div className="relative flex items-start gap-6">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    edu.highlight ? "bg-cyan-500/20" : "bg-white/5"
                  }`}
                >
                  <edu.icon className={`w-7 h-7 ${edu.highlight ? "text-cyan-400" : "text-gray-400"}`} />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-medium text-white mb-1">{edu.degree}</h3>
                  <p className="text-gray-400 mb-2">{edu.institution}</p>
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                      edu.highlight
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        : "bg-white/5 text-gray-300 border border-white/10"
                    }`}
                  >
                    <Award className="w-4 h-4" />
                    {edu.score}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coursework constellation */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-lg text-gray-400 mb-6">Relevant Coursework</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {coursework.map((course, index) => (
              <motion.span
                key={course}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:border-cyan-500/30 hover:text-white transition-all duration-300"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 211, 238, 0.2)" }}
              >
                {course}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Floating data particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  )
}
