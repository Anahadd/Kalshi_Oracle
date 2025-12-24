"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";

function LenisResizeHandler() {
  const lenis = useLenis();
  
  useEffect(() => {
    // Recalculate scroll dimensions after initial page animation completes
    const timer = setTimeout(() => {
      lenis?.resize();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [lenis]);
  
  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, 
        duration: 1.5,
        autoResize: true,
        syncTouch: true,
      }}
    >
      <LenisResizeHandler />
      {children}
    </ReactLenis>
  );
}



