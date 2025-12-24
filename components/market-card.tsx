"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Market } from "@/app/called-it/data";

interface MarketCardProps {
  market: Market;
  index: number;
}

export function MarketCard({ market, index }: MarketCardProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Smoother 3D transforms
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-25, 0, 25]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  return (
    <div 
      ref={container} 
      className="min-h-[90vh] w-full flex items-center justify-center py-16"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{ 
          rotateX, 
          scale,
          opacity,
          y,
          transformStyle: "preserve-3d"
        }}
        className="relative w-[90vw] md:w-[80vw] lg:w-[70vw] max-w-[1200px]"
      >
        <a 
          href={market.kalshiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full group"
        >
          {/* Card Container */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl">
            {/* Background Image */}
            <Image
              src={`/images/img${market.imageIndex}.jpg`}
              alt={market.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 90vw, 70vw"
              priority={index < 3}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/80 transition-colors duration-500" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
              {/* Top Row - Category & Probability */}
              <div className="flex items-start justify-between">
                <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-xs font-bold tracking-wider uppercase">
                  {market.category}
                </span>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D991]/20 backdrop-blur-md">
                  <span className="text-[#00D991] text-2xl font-bold tabular-nums">
                    {market.finalProbability}%
                  </span>
                  <span className="text-white/60 text-xs font-medium uppercase">
                    confident
                  </span>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="flex flex-col gap-6">
                {/* Title */}
                <h2 
                  className="font-serif text-white text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
                  style={{ transform: "translateZ(40px)" }}
                >
                  {market.title}
                </h2>
                
                {/* Question */}
                <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
                  {market.question}
                </p>

                {/* Bottom Stats Row */}
                <div className="flex items-center gap-8 pt-4 border-t border-white/10">
                  <div className="flex flex-col">
                    <span className="text-white/40 text-xs font-medium uppercase tracking-wider">
                      Volume Traded
                    </span>
                    <span className="text-white text-lg font-bold tabular-nums">
                      {market.volume}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/40 text-xs font-medium uppercase tracking-wider">
                      Category
                    </span>
                    <span className="text-white text-lg font-medium">
                      {market.category}
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">View on Kalshi</span>
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className="transform group-hover:translate-x-1 transition-transform"
                    >
                      <path 
                        d="M7 17L17 7M17 7H7M17 7V17" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </a>
      </motion.div>
    </div>
  );
}

