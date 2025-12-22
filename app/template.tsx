"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 1.2 }} // Custom cubic-bezier for "sick" feel
    >
      {children}
    </motion.div>
  );
}



