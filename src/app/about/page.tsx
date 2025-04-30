"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Github, Twitter } from "lucide-react"
import { useRef, useEffect } from "react"

interface Star {
  x: number
  y: number
  z: number
  px: number
  py: number
}

export default function AboutPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])

  // Reuse star animation logic
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    const numStars = 900
    starsRef.current = []
    for (let i = 0; i < numStars; i++) {
      starsRef.current.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1500,
        px: 0,
        py: 0,
      })
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      starsRef.current.forEach((star) => {
        star.z -= 0.2
        if (star.z <= 0) {
          star.z = 1500
          star.x = Math.random() * canvas.width - centerX
          star.y = Math.random() * canvas.height - centerY
        }

        const k = 400.0 / star.z
        const x = star.x * k + centerX
        const y = star.y * k + centerY

        if (star.px !== 0) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
          ctx.lineWidth = (1 - star.z / 1500) * 2
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(star.px, star.py)
          ctx.stroke()
        }

        star.px = x
        star.py = y
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => window.removeEventListener("resize", setCanvasSize)
  }, [])

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Cosmic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-4 left-4 z-20">
        <Link href="/">
          <motion.button
            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-300 flex items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft size={24} />
          </motion.button>
        </Link>
      </div>

      {/* Content Container */}
      <div className="relative z-10 pt-20 px-4 md:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="text-4xl md:text-5xl text-center font-bungee-hairline bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold">
            About What If?
          </h1>
          
          <div className="mt-8 backdrop-blur-sm bg-white/5 rounded-lg p-6 border border-white/10">
            <div className="prose prose-invert max-w-none space-y-6">
              <p className="text-lg text-white">
                What If? is an AI-powered platform that explores hypothetical scenarios 
                and their potential implications for humanity's future. Through the lens 
                of artificial intelligence, we examine alternate realities and possible 
                futures.
              </p>
              
              <h2 className="text-2xl text-purple-300 ">Our Mission</h2>
              <p className="text-lg text-white">
                To spark curiosity and inspire creative thinking about the future 
                through AI-driven exploration of hypothetical scenarios.
              </p>

              <h2 className="text-2xl text-purple-300">Technology</h2>
              <p className="text-lg text-white">
                Built with cutting-edge technology including Next.js 14, TypeScript, 
                and advanced AI models, What If? combines beautiful design with 
                powerful artificial intelligence to create an immersive experience.
              </p>

              <h2 className="text-2xl text-purple-300">Connect With Us</h2>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com/devbadraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-400 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github size={24} />
                </motion.a>
                <motion.a
                  href="https://twitter.com/devbadraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-400 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter size={24} />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}