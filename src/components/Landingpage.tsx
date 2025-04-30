"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X, PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface Star {
  x: number
  y: number
  z: number
  px: number
  py: number
}

export default function WarpSpeed() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const [warpSpeed, setWarpSpeed] = useState(0.2)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isWarping, setIsWarping] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const numStars = 900
  const router = useRouter()

  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.error('Canvas not found');
      return;
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      console.error('Failed to get 2D context');
      return;
    }

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Reset stars when warpSpeed changes
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
      if (!ctx) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      if (canvas) {
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      if (!canvas) return;
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      starsRef.current.forEach((star) => {
        star.z -= warpSpeed
        if (star.z <= 0) {
          star.z = 200
          star.x = Math.random() * canvas.width - centerX
          star.y = Math.random() * canvas.height - centerY
        }

        const k = 400.0 / star.z;
        const x = star.x * k + centerX;
        const y = star.y * k + centerY;

        if (star.px !== 0 && star.py !== 0) {
          ctx.strokeStyle = "white";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(star.px, star.py);
          ctx.stroke();
        }

        star.px = x
        star.py = y
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [warpSpeed])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim() && !isWarping) {
      setIsWarping(true)
      setIsSearching(true)
      setWarpSpeed(0.5)

      setTimeout(() => {
        setIsSearching(false)
        setIsWarping(false)
        setWarpSpeed(0.2)
        // Redirect to question page with the search query
        router.push(`/question?q=${encodeURIComponent(searchQuery.trim())}`)
      }, 2000)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Menu Button */}
      <div className="absolute top-4 left-4 z-20">
        <motion.button
          onClick={toggleMenu}
          className="text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-12 left-0 bg-black/80 backdrop-blur-sm rounded-lg shadow-lg p-4 w-48"
          >
            <ul className="space-y-2">
            <li>
                <Link href="/signup" className="text-white hover:text-blue-400 transition-colors duration-300">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-white hover:text-blue-400 transition-colors duration-300">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/premium" className="text-white hover:text-blue-400 transition-colors duration-300">
                  Premium
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-white hover:text-blue-400 transition-colors duration-300">
                  History
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-blue-400 transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-blue-400 transition-colors duration-300">
                  Top Questions
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </div>

      {/* New Chat Button */}
      <div className="absolute top-4 right-4 z-20">
        <motion.button
          className="text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-300 flex items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <PlusCircle size={24} className="mr-2" />
          <span className="hidden md:block">New Chat</span>
        </motion.button>
      </div>

      {/* Centered Logo */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <Link href="/">
          <motion.h1
            className="text-3xl font-bold text-white font-bungee-hairline cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src="/what_if_logo.png" alt="?" className="h-11" />
          </motion.h1>
        </Link>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-7xl font-bold text-white mb-8 font-bungee-hairline">What if?</h1>
          <form onSubmit={handleSearch} className="flex flex-col items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask the AI agent..."
              className="px-4 py-2 w-64 text-lg bg-transparent border-b-2 border-white text-white placeholder-white/60 focus:outline-none focus:border-blue-500 transition-colors duration-300 mb-4"
            />
            {isSearching && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="text-white mb-4"
              >
                Searching the cosmos...
              </motion.div>
            )}
            <motion.button
              type="submit"
              className={`px-8 py-2 text-xl font-bold text-white border border-white transition-colors duration-300 ${
                isWarping ? "bg-white text-black" : "hover:bg-white hover:text-black"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isWarping}
              animate={isWarping ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {isWarping ? "Searching..." : "Search"}
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          className="absolute bottom-8 right-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <a
            href="https://twitter.com/devbadraj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors duration-300"
          >
            Follow me on Twitter
          </a>
        </motion.div>
      </div>
    </div>
  )
}

