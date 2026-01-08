"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-[#030508] flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Solar system loading animation */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          {/* Central sun */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-orange-500"
            animate={{
              boxShadow: [
                "0 0 20px rgba(255, 200, 100, 0.5)",
                "0 0 40px rgba(255, 200, 100, 0.8)",
                "0 0 20px rgba(255, 200, 100, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* Orbiting planets */}
          {[1, 2, 3].map((orbit) => (
            <motion.div
              key={orbit}
              className="absolute top-1/2 left-1/2 rounded-full border border-gray-700/30"
              style={{
                width: `${orbit * 50 + 30}px`,
                height: `${orbit * 50 + 30}px`,
                marginLeft: `${-(orbit * 50 + 30) / 2}px`,
                marginTop: `${-(orbit * 50 + 30) / 2}px`,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 3 + orbit * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <motion.div
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: orbit === 1 ? "#06b6d4" : orbit === 2 ? "#8b5cf6" : "#f59e0b",
                  top: "-6px",
                  left: "50%",
                  marginLeft: "-6px",
                  boxShadow: `0 0 10px ${orbit === 1 ? "#06b6d4" : orbit === 2 ? "#8b5cf6" : "#f59e0b"}`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-48 mx-auto mb-4">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <motion.p
          className="text-cyan-300/60 text-sm tracking-[0.3em] uppercase"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Initializing Cosmic Systems
        </motion.p>

        <p className="text-gray-600 text-xs mt-2 font-mono">{Math.min(Math.round(progress), 100)}%</p>
      </div>
    </div>
  )
}
