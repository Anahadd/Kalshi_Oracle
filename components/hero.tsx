"use client";

import { motion, useTransform, useMotionValue, animate } from "framer-motion";
import { useEffect } from "react";
import { STATS } from "@/app/called-it/data";

function Counter({ from, to, suffix = "", decimals = false }: { from: number; to: number; suffix?: string; decimals?: boolean }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => 
    decimals ? (Math.round(latest * 10) / 10) : Math.round(latest)
  );

  useEffect(() => {
    const controls = animate(count, to, { duration: 3, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [count, to]);

  return (
    <span className="tabular-nums">
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

export function Hero() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center relative text-white px-6 pt-24 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00D991]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00D991]/3 rounded-full blur-[100px]" />
      </div>
      
      <div className="max-w-6xl w-full text-center space-y-8 z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[#00D991] animate-pulse" />
            <span className="text-white/70 text-sm font-medium">
              2025 Year in Review
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[11vw] md:text-[9vw] lg:text-[8vw] leading-[0.9] tracking-tight text-white"
          >
            Kalshi called it
          </motion.h1>
        </div>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="font-sans text-xl md:text-2xl text-white/50 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          Before it happened, the market knew. Explore{" "}
          <span className="text-[#00D991] font-semibold">
            <Counter from={0} to={STATS.correctPredictions} />
          </span>{" "}
          predictions Kalshi got right in 2025.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-8"
        >
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold text-white tabular-nums">
              <Counter from={0} to={STATS.accuracy} suffix="%" decimals />
            </span>
            <span className="text-white/40 text-sm font-medium uppercase tracking-wider mt-1">
              Overall Accuracy
            </span>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold text-[#00D991] tabular-nums">
              <Counter from={0} to={STATS.marketsAbove90Accuracy} suffix="%" decimals />
            </span>
            <span className="text-white/40 text-sm font-medium uppercase tracking-wider mt-1">
              High-Confidence Accuracy
            </span>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold text-white">
              {STATS.totalVolume}
            </span>
            <span className="text-white/40 text-sm font-medium uppercase tracking-wider mt-1">
              Volume Traded
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          className="pt-8"
        >
          <a 
            href="https://kalshi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors group"
          >
            Start Trading
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="transform group-hover:translate-x-0.5 transition-transform"
            >
              <path 
                d="M7 17L17 7M17 7H7M17 7V17" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
