"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  href: string;
  index: number;
}

export function ProjectCard({ title, category, image, href, index }: ProjectCardProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Refined transform configuration for stronger 3D effect
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-45, 0, 45]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div 
      ref={container} 
      className="min-h-screen w-full flex items-center justify-center py-20"
      style={{ perspective: "500px" }}
    >
      <motion.div
        style={{ 
          rotateX, 
          scale,
          opacity,
          transformStyle: "preserve-3d"
        }}
        className="relative aspect-[16/9] w-[95vw] md:w-[85vw] lg:w-[75vw]"
      >
        <Link href={href} className="block w-full h-full group relative">
            {/* Image Container with rounded corners */}
            <div className="w-full h-full relative overflow-hidden bg-gray-900 rounded-lg shadow-2xl">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 90vw, 80vw"
                    priority={index < 2}
                />
                
                {/* Dark Overlay for text contrast */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
            </div>

            {/* Centered Title - Reduced size */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none" style={{ transform: "translateZ(60px)" }}>
                <h2 
                  className="font-serif text-white tracking-tight text-center leading-none whitespace-nowrap"
                  style={{ fontSize: "10vw" }}
                >
                    {title}
                </h2>
            </div>
        </Link>
      </motion.div>
    </div>
  );
}
