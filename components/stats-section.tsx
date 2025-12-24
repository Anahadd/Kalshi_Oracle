"use client";

import { motion, useTransform, useMotionValue, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { STATS } from "@/app/called-it/data";

function AnimatedCounter({ 
  from, 
  to, 
  suffix = "", 
  prefix = "",
  duration = 2.5 
}: { 
  from: number; 
  to: number; 
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    // Handle decimal values - always return number for type safety
    if (to % 1 !== 0) {
      return Math.round(latest * 10) / 10;
    }
    return Math.round(latest);
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { 
        duration, 
        ease: [0.16, 1, 0.3, 1]
      });
      return controls.stop;
    }
  }, [isInView, count, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}<motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="w-full py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-white text-5xl md:text-7xl leading-[0.95] mb-6">
            The numbers don&apos;t lie
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
            When markets speak, we listen. Here&apos;s how accurate Kalshi predictions have been in 2025.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {/* Main Accuracy Stat */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-2 md:col-span-1 bg-gradient-to-br from-[#00D991]/20 to-[#00D991]/5 rounded-3xl p-8 md:p-10 border border-[#00D991]/20"
          >
            <div className="flex flex-col h-full justify-between">
              <span className="text-[#00D991] text-xs font-bold tracking-wider uppercase mb-4">
                Overall Accuracy
              </span>
              <div className="text-white text-6xl md:text-7xl font-bold leading-none">
                <AnimatedCounter from={0} to={STATS.accuracy} suffix="%" />
              </div>
              <p className="text-white/50 text-sm mt-4">
                of predictions resolved correctly
              </p>
            </div>
          </motion.div>

          {/* 90%+ Accuracy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-zinc-900/50 rounded-3xl p-8 md:p-10 border border-white/5"
          >
            <span className="text-white/40 text-xs font-bold tracking-wider uppercase mb-4 block">
              When we hit 90%+
            </span>
            <div className="text-white text-5xl md:text-6xl font-bold leading-none">
              <AnimatedCounter from={0} to={STATS.marketsAbove90Accuracy} suffix="%" />
            </div>
            <p className="text-white/50 text-sm mt-4">
              accuracy rate
            </p>
          </motion.div>

          {/* Markets Above 90% */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-zinc-900/50 rounded-3xl p-8 md:p-10 border border-white/5"
          >
            <span className="text-white/40 text-xs font-bold tracking-wider uppercase mb-4 block">
              High Confidence Markets
            </span>
            <div className="text-white text-5xl md:text-6xl font-bold leading-none">
              <AnimatedCounter from={0} to={STATS.marketsAbove90} />
            </div>
            <p className="text-white/50 text-sm mt-4">
              markets hit 90%+
            </p>
          </motion.div>

          {/* Total Volume */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-zinc-900/50 rounded-3xl p-8 md:p-10 border border-white/5"
          >
            <span className="text-white/40 text-xs font-bold tracking-wider uppercase mb-4 block">
              Total Volume
            </span>
            <div className="text-white text-5xl md:text-6xl font-bold leading-none">
              {STATS.totalVolume}
            </div>
            <p className="text-white/50 text-sm mt-4">
              traded in 2025
            </p>
          </motion.div>

          {/* Correct Predictions */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-2 md:col-span-1 bg-zinc-900/50 rounded-3xl p-8 md:p-10 border border-white/5"
          >
            <span className="text-white/40 text-xs font-bold tracking-wider uppercase mb-4 block">
              Correct Predictions
            </span>
            <div className="text-white text-5xl md:text-6xl font-bold leading-none">
              <AnimatedCounter from={0} to={STATS.correctPredictions} />
              <span className="text-white/30 text-3xl">/{STATS.totalPredictions}</span>
            </div>
            <p className="text-white/50 text-sm mt-4">
              markets called correctly
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

