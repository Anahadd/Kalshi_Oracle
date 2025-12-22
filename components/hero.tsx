"use client";

import { motion, useTransform, useMotionValue, animate } from "framer-motion";
import { useEffect } from "react";
import { KalshiBlackLogo } from "@/components/kalshi-black-logo";

function Counter({ from, to }: { from: number; to: number }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration: 4.5, ease: "easeOut" }); // Slower duration
    return controls.stop;
  }, [count, to]);

  return <motion.span className="text-black text-2xl md:text-3xl font-bold font-sans">{rounded}</motion.span>; // Black, bigger text
}

export function Hero() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative text-white px-4 overflow-hidden">
      {/* Background is now handled by parent page to persist across scrolling */}
      
      <div className="absolute top-12 left-12 w-32 h-auto z-20">
        <KalshiBlackLogo className="w-full h-full text-white" />
      </div>
      
      <div className="max-w-[90vw] w-full text-center space-y-12 z-10">
        <div className="overflow-hidden">
            <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[12vw] md:text-[8vw] leading-[0.85] tracking-tight text-white"
            >
            Kalshi called it first
            </motion.h1>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-sans text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-normal tracking-wide"
        >
          We predicted <Counter from={423} to={500} /> markets correctly in 2025.
        </motion.p>
      </div>
      
      {/* Subtle background gradient for depth - Removed to fix seamless background issue */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" /> */}
    </section>
  );
}


