"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add signup logic here
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black"></div>
      
      <div className="absolute top-4 left-4 z-20">
        <Link href="/login">
          <motion.button
            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-300 flex items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft size={24} />
          </motion.button>
        </Link>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center font-bungee-hairline">
            Join What If?
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-4 py-2 text-lg bg-transparent border-b-2 border-white text-white placeholder-white/60 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                required
              />
            </div>

            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 text-lg bg-transparent border-b-2 border-white text-white placeholder-white/60 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 text-lg bg-transparent border-b-2 border-white text-white placeholder-white/60 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                required
              />
            </div>

            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 text-lg bg-transparent border-b-2 border-white text-white placeholder-white/60 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full px-8 py-2 text-xl font-bold text-white border border-white hover:bg-white hover:text-black transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
            </motion.button>
          </form>

          <p className="mt-6 text-center text-white/60">
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:text-blue-400 transition-colors duration-300">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}