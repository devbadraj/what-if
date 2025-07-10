"use client"

import { useEffect, useRef, useState, Suspense } from "react"
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

function QuestionContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [answer, setAnswer] = useState("")
  const searchParams = useSearchParams()
  const question = searchParams.get("q")

  // Static star background instead of animation
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

    // Draw static stars
    const numStars = 200
    for (let i = 0; i < numStars; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 2 + 0.5
      
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`
      ctx.beginPath()
      ctx.arc(x, y, size, 0, 2 * Math.PI)
      ctx.fill()
    }

    return () => window.removeEventListener("resize", setCanvasSize)
  }, [])

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

function LoadingFallback() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center">
      <div className="text-white text-xl font-bungee-hairline flex items-center gap-2">
        <span>Loading cosmic exploration...</span>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="text-purple-400" />
        </motion.div>
      </div>
    </div>
  )
}

export default function QuestionPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <QuestionContent />
    </Suspense>
  )
}