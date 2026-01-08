"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import {
  FileText,
  Github,
  Linkedin,
  Mail,
  Terminal,
  Zap,
  Braces,
  Binary,
  Cpu,
  Satellite,
  Rocket,
  Database,
  Cloud,
  GitBranch,
} from "lucide-react"

function TypewriterText({ texts, className = "" }: { texts: string[]; className?: string }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentFullText = texts[currentTextIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = 2000

    if (!isDeleting && displayText === currentFullText) {
      setTimeout(() => setIsDeleting(true), pauseTime)
      return
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      return
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length - 1))
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length + 1))
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentTextIndex, texts])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse text-cyan-400">_</span>
    </span>
  )
}

function FloatingCodeSnippets() {
  const codeSnippets = [
    { code: "const magic = () => {};", x: "5%", y: "15%", delay: 0 },
    { code: "<Component />", x: "85%", y: "20%", delay: 0.5 },
    { code: "npm run dev", x: "10%", y: "75%", delay: 1 },
    { code: "git push origin", x: "80%", y: "70%", delay: 1.5 },
    { code: "async/await", x: "15%", y: "45%", delay: 2 },
    { code: "useState()", x: "88%", y: "45%", delay: 2.5 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {codeSnippets.map((snippet, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs md:text-sm text-cyan-400/30"
          style={{ left: snippet.x, top: snippet.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -10, 0] }}
          transition={{
            duration: 4,
            delay: snippet.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {snippet.code}
        </motion.div>
      ))}
    </div>
  )
}

function OrbitingIcons() {
  const icons = [
    { Icon: Braces, color: "text-yellow-400", size: 20, orbitSize: 300, duration: 20, startAngle: 0 },
    { Icon: Binary, color: "text-green-400", size: 18, orbitSize: 340, duration: 25, startAngle: 72 },
    { Icon: Cpu, color: "text-purple-400", size: 22, orbitSize: 380, duration: 30, startAngle: 144 },
    { Icon: Satellite, color: "text-blue-400", size: 20, orbitSize: 420, duration: 35, startAngle: 216 },
    { Icon: Zap, color: "text-orange-400", size: 18, orbitSize: 320, duration: 22, startAngle: 288 },
    { Icon: Database, color: "text-pink-400", size: 18, orbitSize: 360, duration: 28, startAngle: 45 },
    { Icon: Cloud, color: "text-teal-400", size: 20, orbitSize: 400, duration: 32, startAngle: 135 },
    { Icon: GitBranch, color: "text-red-400", size: 18, orbitSize: 440, duration: 38, startAngle: 225 },
    { Icon: Rocket, color: "text-cyan-400", size: 20, orbitSize: 460, duration: 40, startAngle: 315 },
  ]

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Orbital rings */}
      {[200, 280, 360, 440].map((size, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full border border-cyan-500/10"
          style={{ width: size, height: size }}
          animate={{ rotate: idx % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 30 + idx * 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      ))}

      {/* Orbiting icons - each starts from a different angle */}
      {icons.map((item, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{
            width: item.orbitSize,
            height: item.orbitSize,
            rotate: `${item.startAngle}deg`,
          }}
          animate={{ rotate: [item.startAngle, item.startAngle + 360] }}
          transition={{ duration: item.duration, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <motion.div
            className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${item.color} drop-shadow-lg`}
            style={{ rotate: `-${item.startAngle}deg` }}
            animate={{ rotate: [-item.startAngle, -(item.startAngle + 360)] }}
            transition={{ duration: item.duration, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <item.Icon size={item.size} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default function HeroSection() {
  const titles = [
    "Full Stack Developer",
    "React Specialist",
    "Code Astronaut",
    "Digital Craftsman",
    "UI/UX Explorer",
    "Bug Exterminator",
  ]

  const taglines = [
    "// WARNING: May cause excessive shipping of features",
    "// Status: Debugging the universe, one line at a time",
    "// Mission: Transform caffeine into production code",
    "// Loading personality... [=========>] 99%",
  ]

  const [currentTagline, setCurrentTagline] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingCodeSnippets />
      <OrbitingIcons />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-gray-900/80 border border-cyan-500/30 backdrop-blur-sm">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="font-mono text-sm text-gray-300">
              <span className="text-green-400">guest@portfolio</span>
              <span className="text-gray-500">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-gray-500">$</span>
              <span className="text-white ml-2">whoami</span>
            </span>
            <span className="w-2 h-4 bg-cyan-400 animate-pulse" />
          </div>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter">
            <span className="text-white">ISHITA</span>{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              GUPTA
            </span>
          </h1>
          <p className="font-mono text-gray-500 text-xs mt-2 tracking-widest">
            {"<"} Developer / Problem Solver / Ideator {"/>"}
          </p>
        </motion.div>

        {/* Typewriter role */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-cyan-400 font-mono">{"function"}</span>
          <span className="text-yellow-300 font-mono">{"role()"}</span>
          <span className="text-gray-400 font-mono">{"{"}</span>
          <span className="text-green-300 font-mono">
            {"return"} "<TypewriterText texts={titles} className="text-white" />"
          </span>
          <span className="text-gray-400 font-mono">{"}"}</span>
        </motion.div>

        <motion.div
          className="h-8 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.p
            key={currentTagline}
            className="font-mono text-sm text-gray-400 italic"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {taglines[currentTagline]}
          </motion.p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {[
            { icon: Mail, href: "mailto:ishitagupta.ig1@gmail.com", label: "Email" },
            { icon: Linkedin, href: "https://linkedin.com/in/ishitagupta-", label: "LinkedIn" },
            { icon: Github, href: "https://github.com/IshitaGupta27", label: "GitHub" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-gray-700/50 bg-white/5 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300"
              whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(34, 211, 238, 0.25)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />
              <span className="sr-only">{label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.a
            href="#projects"
            className="group px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white text-sm font-medium tracking-wider uppercase flex items-center gap-2"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            <Rocket className="w-4 h-4" />
            Explore Universe
          </motion.a>

          <motion.a
            href="/resume.pdf"
            download
            className="px-8 py-3 border border-gray-700/50 bg-white/5 backdrop-blur-sm rounded-full text-gray-300 text-sm tracking-wider uppercase hover:border-gray-500 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="w-4 h-4" />
            Download Resume
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
