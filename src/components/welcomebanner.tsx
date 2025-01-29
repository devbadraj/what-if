'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(false);

  // Cookie management
  const setCookie = (days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `visited=true; expires=${date.toUTCString()}; path=/`;
  };

  const getCookie = () => {
    return document.cookie.split("; ").some((row) => row.startsWith("visited="));
  };

  useEffect(() => {
    if (!getCookie()) {
      setIsVisible(true);
      setCookie(365); 
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-slate-100 p-8 rounded shadow-lg text-center sm:overflow-y-auto ">
            <h2 className="text-5xl mb-4 font-bold">Welcome to What If? </h2>
            <h2 className="text-2xl mb-2 font-semibold hidden md:block lg:block">Where Reality Takes a Detour...</h2>
            <div className='flex justify-center'><img src='/timeline.gif' alt="Welcome to What If?" className=" mb-4 h-32 rounded " /></div>
            <p className='font-mono '>Ever wondered...
            "What if cats had wheels instead of paws?" 🐾➔🛞<br/>
                Or maybe...</p>
                <p className='font-mono pb-5 hidden md:block lg:block'>"What if clouds were made of cotton candy?" ☁️➔🍭</p>
                <p className='font-mono pb-5'>Don’t just daydream— <br/>
                Unleash your inner mad scientist.</p>
                <p className='font-mono pb-5 hidden md:block lg:block'>Ready to:<br/>
                Bend history?<br/>
                Twist physics?<br/>
                Give dinosaurs Wi-Fi? 🦖📶<br/>
                    </p>
            <button onClick={handleClose} className="bg-blue-500 text-white px-4 py-2 rounded font-bold">
            Let’s Break Reality
            </button>
            

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}