"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github, X, Layers, Zap, Shield, Database, Terminal, Orbit } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Laxmi Jewellers",
    subtitle: "Live Production Web Application",
    description:
      "Built and deployed a production-grade React web application for a live jewellery retail business with real-time pricing and CI/CD automation.",
    features: [
      { icon: Layers, text: "Responsive, mobile-first UI with reusable components" },
      { icon: Zap, text: "Real-time gold and silver pricing APIs" },
      { icon: Shield, text: "CI/CD automation pipelines via GitHub Actions" },
      { icon: Database, text: "High availability deployment on Vercel" },
    ],
    tech: ["React", "JavaScript", "GitHub Actions", "Vercel"],
    link: "https://laxmijewellers.com",
    github: "#",
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: 2,
    title: "Car Pooling System",
    subtitle: "Full Stack Web Application",
    description:
      "Developed a full-stack ride-sharing platform supporting user registration, secure authentication, and real-time booking management.",
    features: [
      { icon: Shield, text: "Secure authentication and session management" },
      { icon: Layers, text: "Ride posting and booking modules" },
      { icon: Database, text: "Real-time seat availability tracking" },
      { icon: Zap, text: "Backend validation for data integrity" },
    ],
    tech: ["HTML", "CSS", "TailwindCSS", "JavaScript", "PHP", "MySQL"],
    github: "#",
    color: "#06b6d4",
    gradient: "from-cyan-500 to-blue-600",
  },
]

function HolographicProjectCard({
  project,
  index,
  onClick,
}: { project: (typeof projects)[0]; index: number; onClick: () => void }) {
  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Holographic glow effect */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-2xl opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500`}
      />

      <div className="relative p-6 md:p-8 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl overflow-hidden">
        {/* Scanline effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 animate-scan pointer-events-none" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-4 h-4 rounded-full animate-pulse"
                  style={{ backgroundColor: project.color, boxShadow: `0 0 20px ${project.color}` }}
                />
                <span className="font-mono text-xs text-cyan-400 tracking-wider">
                  PROJECT_{String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-cyan-400/80 font-mono">{project.subtitle}</p>
            </div>
            <div className="flex gap-2">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition-all border border-white/10 hover:border-cyan-500/30"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition-all border border-white/10 hover:border-cyan-500/30"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>

          {/* Features preview */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {project.features.slice(0, 2).map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                <feature.icon className="w-4 h-4 text-cyan-500/60" />
                <span className="truncate">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-mono rounded-lg bg-white/5 text-gray-300 border border-white/10 hover:border-cyan-500/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Click hint */}
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-gray-600 font-mono">{">"} click for details</span>
            <Orbit className="w-4 h-4 text-cyan-500/40 animate-spin" style={{ animationDuration: "8s" }} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  return (
    <section id="projects" ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400/80 text-sm font-mono tracking-wider">~/projects</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 tracking-tight">
            Mission{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">Archives</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Production-grade systems deployed into the digital cosmos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <HolographicProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)} />

            <motion.div
              className="relative w-full max-w-2xl bg-[#0B0D10] border border-white/10 rounded-2xl p-8 overflow-hidden"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
            >
              {/* Modal glow */}
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${selectedProject.gradient} rounded-2xl opacity-20 blur-xl`}
              />

              <div className="relative z-10">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-0 right-0 p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-4 h-4 rounded-full animate-pulse"
                    style={{ backgroundColor: selectedProject.color, boxShadow: `0 0 15px ${selectedProject.color}` }}
                  />
                  <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                </div>

                <p className="text-cyan-400/80 font-mono text-sm mb-4">{selectedProject.subtitle}</p>

                <p className="text-gray-300 mb-6 leading-relaxed">{selectedProject.description}</p>

                <div className="space-y-3 mb-6">
                  {selectedProject.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 text-sm text-gray-400"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <feature.icon className="w-4 h-4 text-cyan-400" />
                      <span>{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-sm font-mono rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-cyan-300 text-sm hover:bg-cyan-500/30 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </a>
                  )}
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-full text-gray-300 text-sm hover:border-gray-500 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
