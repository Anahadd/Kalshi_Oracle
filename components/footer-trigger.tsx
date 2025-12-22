"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function FooterTrigger() {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigate = () => {
    setIsNavigating(true);
    // Smooth scroll to the trigger element to ensure it's centered/visible before transition
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    setTimeout(() => {
        router.push("/called-it");
    }, 800); 
  };

  return (
    <div ref={ref} className="w-full pt-[60vh] pb-48 flex flex-col items-center justify-center px-4 text-center gap-12">
      <span 
        className={`font-serif text-[10vw] leading-[0.9] text-white transition-opacity duration-700 ease-in-out select-none ${
          isInView ? "opacity-100" : "opacity-20"
        }`}
      >
        we called it all
      </span>
      
      <div className="flex items-center justify-center">
        <motion.button
            onClick={handleNavigate}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center group hover:scale-110 transition-transform duration-300 cursor-pointer z-50"
        >
            <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`text-black transition-transform duration-300 ${isNavigating ? 'translate-x-2' : 'group-hover:translate-x-1'}`}
            >
            <path 
                d="M5 12h14M12 5l7 7-7 7" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
            </svg>
        </motion.button>
      </div>
    </div>
  );
}
