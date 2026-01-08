"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code2, Cpu, Database, Globe, Rocket, Server, Sparkles, Coffee, Terminal, GitBranch } from "lucide-react"

const aboutItems = [
  { icon: Code2, title: "Full-Stack Dev", desc: "Building digital spaceships" },
  { icon: Globe, title: "React Wizardry", desc: "Components that spark joy" },
  { icon: Server, title: "CI/CD Pipelines", desc: "Automated launch sequences" },
  { icon: Database, title: "Data Wrangling", desc: "Taming MySQL & MongoDB" },
  { icon: Rocket, title: "Cloud Deployment", desc: "Launching to the stars" },
  { icon: Cpu, title: "System Design", desc: "Architecting galaxies" },
]

function CodeTerminal() {
  const codeLines = [
    { text: "const developer = {", color: "text-purple-400" },
    { text: '  name: "Ishita Gupta",', color: "text-gray-300" },
    { text: '  passion: "Building cool stuff",', color: "text-gray-300" },
    { text: "  skills: [React, Node, TypeScript],", color: "text-gray-300" },
    { text: '  status: "Always learning"', color: "text-gray-300" },
    { text: "};", color: "text-purple-400" },
    { text: "", color: "" },
    { text: "developer.buildAwesomeThings();", color: "text-cyan-400" },
  ]

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Terminal window */}
      <div className="rounded-xl bg-gray-900/90 border border-gray-700/50 overflow-hidden backdrop-blur-sm">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-gray-500 font-mono">about-me.ts</span>
        </div>

        {/* Terminal content */}
        <div className="p-4 font-mono text-sm">
          {codeLines.map((line, idx) => (
            <motion.div
              key={idx}
              className={`${line.color} leading-relaxed`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.15 }}
            >
              <span className="text-gray-600 mr-3 select-none">{idx + 1}</span>
              {line.text}
            </motion.div>
          ))}
          <motion.div
            className="mt-2 flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <span className="text-gray-600">{codeLines.length + 1}</span>
            <span className="text-green-400 ml-3">{">"}</span>
            <span className="w-2 h-4 bg-cyan-400 animate-pulse ml-1" />
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      />
    </motion.div>
  )
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 text-cyan-400/60 text-sm tracking-[0.3em] uppercase mb-4">
            <Sparkles className="w-4 h-4" />
            Orbit of Origins
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
            The Developer <span className="font-medium text-cyan-300">Behind the Code</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <CodeTerminal />
          </motion.div>

          {/* Content panels */}
          <div className="space-y-6">
            <motion.div
              className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span className="font-mono text-cyan-400 text-sm">// transmission_incoming</span>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed">
                Hey there! I'm a <span className="text-cyan-300 font-medium">code explorer</span> on a mission to build
                stellar web experiences. Armed with React, Node.js, and an unhealthy obsession with clean code, I
                navigate the vast universe of web development.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                { icon: Coffee, text: "Fueled by curiosity (and coffee)" },
                { icon: GitBranch, text: "Git commit enthusiast" },
                { icon: Rocket, text: "Always shipping features" },
              ].map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm"
                >
                  <item.icon className="w-3 h-3 text-cyan-400" />
                  {item.text}
                </span>
              ))}
            </motion.div>

            <motion.p
              className="text-base text-gray-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              My superpower? Taking complex problems and turning them into elegant solutions. From crafting
              pixel-perfect UIs to engineering robust backend systems, I love the entire journey from{" "}
              <span className="text-cyan-400 font-mono">git init</span> to{" "}
              <span className="text-green-400 font-mono">deploy</span>.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
              {aboutItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34, 211, 238, 0.1)" }}
                >
                  <item.icon className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm font-medium text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
