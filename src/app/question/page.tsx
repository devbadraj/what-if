"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Share2, BookmarkPlus, Sparkles } from "lucide-react"
import { useSearchParams } from "next/navigation"

interface Star {
  x: number
  y: number
  z: number
  px: number
  py: number
}

export default function QuestionPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const [warpSpeed, setWarpSpeed] = useState(0.2)
  const [isLoading, setIsLoading] = useState(true)
  const [answer, setAnswer] = useState("")
  const searchParams = useSearchParams()
  const question = searchParams.get("q")

  // Add star animation logic
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

    // Initialize stars
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
        star.z -= warpSpeed
        if (star.z <= 0) {
          star.z = 1
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
  }, [warpSpeed])

  // Simulate AI response
  useEffect(() => {
    if (question) {
      setIsLoading(true)
      // Replace this with actual API call to your AI backend
      setTimeout(() => {
        setAnswer("Your AI-generated response here...")
        setIsLoading(false)
      }, 2000)
    }
  }, [question])

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

      {/* Question and Answer Container */}
      <div className="relative z-10 pt-20 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Question Section with cosmic styling */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-white/20 pb-6 relative"
        >
          
          <h2 className="text-2xl md:text-3xl text-white font-bungee-hairline bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-bold tracking-wider">
            What if{" "}
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-purple-500">
              {question}
            </span>
            ?
          </h2>
        </motion.div>

        {/* Answer Section with space theme */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 backdrop-blur-sm bg-white/5 rounded-lg p-6"
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <motion.div
                className="text-white text-xl font-bungee-hairline flex items-center gap-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span>Exploring the cosmos</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="text-purple-400" />
                </motion.div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-invert max-w-none"
            >
              <div className="text-white/90 text-lg leading-relaxed space-y-6">
                {answer}
              </div>
              
              {/* Action buttons with cosmic styling */}
              <div className="mt-12 flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-white border border-purple-500/30 rounded-full hover:border-blue-500/50 transition-colors duration-300 flex items-center gap-2"
                >
                  <Share2 size={18} />
                  <span>Share</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-white border border-purple-500/30 rounded-full hover:border-blue-500/50 transition-colors duration-300 flex items-center gap-2"
                >
                  <BookmarkPlus size={18} />
                  <span>Save</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}