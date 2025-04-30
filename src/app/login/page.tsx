"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    //  logic
  }

  const handleGoogleLogin = async () => {
    
  }

  const handleAppleLogin = async () => {
    
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Star background effect - reusing similar canvas effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black"></div>
      
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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center font-bungee-hairline">
            Login to What If?
          </h2>
          
          {/* Social Login Buttons */}
          <div className="space-y-4 mb-8">
            <motion.button
              onClick={handleGoogleLogin}
              className="w-full px-8 py-2 text-white border border-white hover:bg-white/10 transition-colors duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              
              <FaGoogle />
              <span>Continue with Google</span>
            </motion.button>

            <motion.button
              onClick={handleAppleLogin}
              className="w-full px-8 py-2 text-white border border-white hover:bg-white/10 transition-colors duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaApple />
              <span>Continue with Apple</span>
            </motion.button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-white/60 bg-black">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex items-center justify-between text-sm text-white/60">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <Link href="/forgot-password" className="hover:text-white transition-colors duration-300">
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              className="w-full px-8 py-2 text-xl font-bold text-white border border-white hover:bg-white hover:text-black transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          </form>

          <p className="mt-6 text-center text-white/60">
            Don't have an account?{" "}
            <Link href="/signup" className="text-white hover:text-blue-400 transition-colors duration-300">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}