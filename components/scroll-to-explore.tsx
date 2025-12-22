"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollToExplore() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsVisible(latest < 100);
    });
  }, [scrollY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
      className="fixed bottom-12 right-8 z-50 flex items-center gap-4"
    >
      <span className="font-serif text-base tracking-wide text-white/80">
        Scroll to explore
      </span>
      <motion.div
        className="flex items-center justify-center w-12 h-12 bg-white rounded-2xl text-black shadow-lg"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

