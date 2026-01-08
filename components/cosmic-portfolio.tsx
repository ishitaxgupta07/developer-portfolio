"use client"

import { useRef, useState, useEffect } from "react"
import { useScroll } from "framer-motion"
import dynamic from "next/dynamic"
import Navigation from "./navigation"
import HeroSection from "./sections/hero-section"
import AboutSection from "./sections/about-section"
import ProjectsSection from "./sections/projects-section"
import SkillsSection from "./sections/skills-section"
import ExperienceSection from "./sections/experience-section"
import EducationSection from "./sections/education-section"
import ContactSection from "./sections/contact-section"

const SpaceScene = dynamic(() => import("./3d/space-scene"), { ssr: false })

export default function CosmicPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollProgress, setScrollProgress] = useState(0)
  const { scrollYProgress } = useScroll({ container: containerRef })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setScrollProgress(value)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const sections = ["hero", "about", "projects", "skills", "experience", "education", "contact"]
      const windowHeight = window.innerHeight

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(section)
          }
        }
      })
    }

    const container = containerRef.current
    container?.addEventListener("scroll", handleScroll)
    return () => container?.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#030508]">
      <div className="fixed inset-0 z-0">
        <SpaceScene scrollProgress={scrollProgress} />
      </div>

      {/* Subtle overlay for readability */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-[#030508]/30 to-[#030508]/50" />

      <Navigation activeSection={activeSection} containerRef={containerRef} />

      <main
        ref={containerRef}
        className="relative z-10 h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
    </div>
  )
}
