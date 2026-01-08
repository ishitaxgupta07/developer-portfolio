"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Github, Linkedin, Phone, Send, CheckCircle } from "lucide-react"

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "ishitagupta.ig1@gmail.com",
    href: "mailto:ishitagupta.ig1@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-9709719000",
    href: "tel:+919709719000",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/ishitaxgupta07",
    href: "https://github.com/ishitaxgupta07",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/ishita-gupta-106442280",
    href: "https://www.linkedin.com/in/ishita-gupta-106442280",
  },
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cyan-400/60 text-sm tracking-[0.4em] uppercase">Signal Transmission</span>
          <h2 className="text-4xl md:text-5xl font-light text-white mt-4 tracking-tight">
            Get in <span className="font-medium text-cyan-300">Touch</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            Ready to discuss opportunities or collaborations? Send a signal through the cosmos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 font-medium tracking-wider uppercase flex items-center justify-center gap-2 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Signal Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Transmit Signal
                  </>
                )}
              </motion.button>
            </form>

            {/* Pulse wave animation on submit */}
            {isSubmitted && (
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-cyan-400 pointer-events-none"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1 }}
              />
            )}
          </motion.div>

          {/* Contact links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34, 211, 238, 0.1)" }}
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <link.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{link.label}</p>
                  <p className="text-white group-hover:text-cyan-300 transition-colors">{link.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Signal waves */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[1, 2, 3].map((wave) => (
            <motion.div
              key={wave}
              className="absolute left-1/2 bottom-1/4 -translate-x-1/2 rounded-full border border-cyan-500/10"
              style={{
                width: `${wave * 200}px`,
                height: `${wave * 200}px`,
              }}
              animate={{
                scale: [1, 2, 3],
                opacity: [0.3, 0.1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: wave * 1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-0 left-0 right-0 py-8 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
      >
        <p className="text-gray-600 text-sm">
          Designed & Built by <span className="text-cyan-400">Ishita Gupta</span> • {new Date().getFullYear()}
        </p>
        <p className="text-gray-700 text-xs mt-2 tracking-widest uppercase">Cosmic Systems v1.0</p>
      </motion.footer>
    </section>
  )
}
