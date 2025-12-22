"use client";

import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, useScroll, useTexture } from '@react-three/drei'
import { easing, geometry } from 'maath'
import './styles.css'

// Extend geometry if needed
extend(geometry)

import { MarketDetailPanel } from '@/components/market-detail'
import { MARKETS, CATEGORIES } from './data'

export default function CalledItPage() {
  // Start in 'carousel' mode
  const [mode, setMode] = useState('carousel') 
  const [focusedCard, setFocusedCard] = useState<number | null>(null)
  const [category, setCategory] = useState(0) 
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'relative',
        backgroundImage: 'url(/images/kalshi-texture.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      data-lenis-prevent="true"
    >
      {/* 2D Hover Text Overlay */}
      {mode === 'carousel' && hoveredIndex !== null && (
        <HoverCursor text={MARKETS[hoveredIndex % MARKETS.length].title} />
      )}

      {/* Top HUD - Visible in Carousel Mode */}
      {mode === 'carousel' && (
        <TopHUD hoveredIndex={hoveredIndex} category={category} setCategory={setCategory} />
      )}

      {/* Main Container */}
      <div className="absolute inset-0">
        
        {/* 3D Canvas Container - Always full width */}
        <div className="relative w-full h-full">
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 15], fov: 30 }}>
            <Experience 
              mode={mode} 
              setMode={setMode} 
              focusedCard={focusedCard} 
              setFocusedCard={setFocusedCard}
              category={category}
              setCategory={setCategory}
              setHoveredIndex={setHoveredIndex}
            />
          </Canvas>
        </div>

        {/* Detail Panel Overlay */}
        <div 
          className={`absolute inset-0 transition-opacity duration-700 ${
            mode === 'detail' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {mode === 'detail' && (
            <MarketDetailPanel 
              marketIndex={focusedCard} 
              onBack={() => {
            setFocusedCard(null)
            setMode('carousel')
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function HoverCursor({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX + 15}px, ${e.clientY + 15}px)`
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div 
      ref={ref} 
      className="fixed top-0 left-0 pointer-events-none z-50 text-white font-sans text-sm font-bold tracking-wide mix-blend-difference"
      style={{ willChange: 'transform' }}
    >
      {text}
    </div>
  )
}

function TopHUD({ hoveredIndex, category, setCategory }: { hoveredIndex: number | null, category: number, setCategory: (i: number) => void }) {
  const activeMarket = hoveredIndex !== null ? MARKETS[hoveredIndex % MARKETS.length] : null;

  return (
    <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-40 pointer-events-none">
      {/* Left: Preview & Title */}
      <div className="flex gap-6 items-start">
        <div className="w-24 h-24 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden transition-opacity duration-300" style={{ opacity: activeMarket ? 1 : 0 }}>
          {activeMarket && (
            <img 
              src={`/images/img${activeMarket.imageIndex}.jpg`} 
              alt="" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-1 pt-2 transition-opacity duration-300" style={{ opacity: activeMarket ? 1 : 0 }}>
          <h2 className="text-white text-2xl font-bold tracking-tight">{activeMarket?.title}</h2>
          <span className="text-white/60 text-sm font-medium tracking-wide">{activeMarket?.category}</span>
        </div>
      </div>

      {/* Right: Categories Filter */}
      <div className="flex gap-4 pointer-events-auto">
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat}
            onClick={() => setCategory(i)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
              category === i 
                ? 'bg-white text-black' 
                : 'bg-transparent text-white/60 hover:text-white border border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}

function Experience({ mode, setMode, focusedCard, setFocusedCard, category, setCategory, setHoveredIndex }: any) {
  const { width, height } = useThree((state) => state.viewport)
  
  return (
    <>
      {/* Main Carousel - Visible only when mode is 'carousel' or 'detail' */}
      {(mode === 'carousel' || mode === 'detail') && (
        <ScrollControls pages={4} infinite enabled={mode === 'carousel'}>
          <CarouselScene 
            mode={mode} 
            focusedCard={focusedCard} 
            setFocusedCard={(index: number | null) => {
              setFocusedCard(index)
              setMode(index !== null ? 'detail' : 'carousel')
            }} 
            category={category}
            setCategory={setCategory}
            setHoveredIndex={setHoveredIndex}
          />
        </ScrollControls>
      )}
    </>
  )
}

function CarouselScene({ mode, focusedCard, setFocusedCard, category, setCategory, setHoveredIndex }: any) {
  const ref = useRef<THREE.Group>(null)
  const scroll = useScroll()
  
  useFrame((state, delta) => {
    if (!ref.current) return
    
    // Always apply rotation so parent/child math stays consistent
      ref.current.rotation.y = -scroll.offset * (Math.PI * 2)

    if (mode === 'carousel') {
      state.camera.lookAt(0, 0, 0)
      easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y * 2 + 4.5, 30], 0.3, delta)
    } else if (mode === 'detail') {
      state.camera.lookAt(0, 0, 0)
      easing.damp3(state.camera.position, [0, 0, 20], 0.3, delta)
    }
  })

  return (
    <group ref={ref}>
      <Cards 
        mode={mode}
        focusedCard={focusedCard} 
        setFocusedCard={setFocusedCard}
        setHoveredIndex={setHoveredIndex}
      />
    </group>
  )
}

function Cards({ mode, focusedCard, setFocusedCard, setHoveredIndex }: any) {
  const [hovered, hover] = useState<number | null>(null)
  const amount = 80
  const radius = 9
  const from = 0
  const len = Math.PI * 2
  
  return (
    <group>
      {Array.from({ length: amount }, (_, i) => {
        const angle = from + (i / amount) * len
        const imageIndex = (i % 30) + 1
        return (
          <CarouselCard
            key={angle}
            index={i}
            angle={angle}
            radius={radius}
            url={`/images/img${imageIndex}.jpg`}
            mode={mode}
            active={focusedCard === i}
            hovered={hovered === i}
            setFocusedCard={setFocusedCard}
            onHover={hover}
            setHoveredIndex={setHoveredIndex}
          />
        )
      })}
    </group>
  )
}

function CarouselCard({ index, angle, radius, url, mode, active, hovered, setFocusedCard, onHover, setHoveredIndex }: any) {
  const ref = useRef<THREE.Mesh>(null)
  const texture = useTexture(url)
  const scroll = useScroll() 
  const { camera } = useThree() 
  
  useEffect(() => {
    if (hovered && mode === 'carousel') {
      setHoveredIndex(index)
    } else if (!hovered && mode === 'carousel') {
      setHoveredIndex(null) 
    }
  }, [hovered, mode, index, setHoveredIndex])

  useFrame((state, delta) => {
    if (!ref.current) return
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const rotY = Math.PI / 2 + angle

    if (mode === 'detail') {
      if (active) {
        // Focus Mode (Detail) - Card moves up
        const targetWorldX = 0
        const targetWorldY = 1.5 // Lowered further to be closer to text
        const targetWorldZ = 12 
        const squareSize = 3 // Reduced size (was 5)
        
        // Transform World Position to Local Space
        const parentRotation = -scroll.offset * (Math.PI * 2)
        const theta = -parentRotation
        
        const targetLocalX = -targetWorldZ * Math.sin(theta)
        const targetLocalZ = targetWorldZ * Math.cos(theta)
        
        easing.damp3(ref.current.position, [targetLocalX, targetWorldY, targetLocalZ], 0.4, delta)
        
        // Rotation
        const parentQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), parentRotation)
        const dummy = new THREE.Object3D()
        dummy.position.set(0, targetWorldY, targetWorldZ)
        dummy.lookAt(0, 1.5, 20) // Look at new centered height
        const worldQuat = new THREE.Quaternion().setFromEuler(dummy.rotation)
        const targetLocalQuat = worldQuat.clone().premultiply(parentQuat.invert())
        
        easing.dampQ(ref.current.quaternion, targetLocalQuat, 0.4, delta)
        
        // Scale to Square
        easing.damp3(ref.current.scale, [squareSize, squareSize, 0.1], 0.4, delta) 
        
        const mat = ref.current.material as THREE.MeshBasicMaterial
        mat.opacity = 1
        mat.color.set('#ffffff')
      } else {
        // Hide others
        ref.current.scale.set(0, 0, 0)
      }
    } else {
      // Carousel Mode
      const f = hovered ? 1.15 : 1
      const baseScaleX = 1.618 * 2.5 
      const baseScaleY = 1 * 2.5
      
      easing.damp3(ref.current.position, [x, hovered ? 0.5 : 0, z], 0.1, delta)
      easing.damp3(ref.current.scale, [baseScaleX * f, baseScaleY * f, 1], 0.15, delta)
      easing.dampE(ref.current.rotation, [0, rotY, 0], 0.1, delta)
      const mat = ref.current.material as THREE.MeshBasicMaterial
      mat.opacity = 1
      mat.color.set('#d0d0d0') 
    }
  })

  return (
    <group>
      <mesh 
        ref={ref} 
        onClick={(e) => {
          e.stopPropagation()
          if (mode === 'carousel') setFocusedCard(index)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          if (mode === 'carousel') onHover(index)
        }}
        onPointerOut={() => {
          if (mode === 'carousel') onHover(null)
        }}
      >
        <boxGeometry args={[1, 1, 0.05]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
    </group>
  )
}
