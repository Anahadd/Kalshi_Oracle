"use client";

import * as THREE from 'three'
import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll, useTexture } from '@react-three/drei'
import { easing } from 'maath'
import Link from 'next/link'
import './styles.css'

import { MARKETS, CATEGORIES, type Market } from './data'

export default function CalledItPage() {
  const [focusedCard, setFocusedCard] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  const filteredMarkets = selectedCategory === 'ALL' 
    ? MARKETS 
    : MARKETS.filter(m => m.category === selectedCategory)

  return (
    <div 
      className="w-screen h-screen relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #000000 50%, #050505 100%)'
      }}
      data-lenis-prevent="true"
    >
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ 
          backgroundImage: 'url(/images/kalshi-texture.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Navigation Header */}
      <header className="absolute top-0 left-0 w-full z-50 px-6 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <svg className="w-[63px] h-[16px] text-white" viewBox="0 0 78 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40.1043 0H36.0332V19.9986H40.1043V0Z" fill="currentColor" fillOpacity="0.9"/>
              <path d="M0.416887 0.0221237H4.73849V8.99348L12.818 0.0221237H18.0582L10.6468 8.24586L18.5384 20H13.3608L7.59868 11.5686L4.73849 14.7459V20H0.416887V0.0221237Z" fill="currentColor"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M34.4675 19.8117H32.4007C30.5426 19.8117 29.624 19.0017 29.6658 17.4027C29.1229 18.2334 28.4549 18.8771 27.6824 19.3132C26.8891 19.7494 25.9496 19.9778 24.8222 19.9778C23.1729 19.9778 21.8368 19.604 20.8138 18.8564C19.8117 18.088 19.3106 17.0289 19.3106 15.6582C19.3106 14.1007 19.8952 12.8962 21.0434 12.0656C22.2126 11.2141 23.9036 10.778 26.1166 10.778H29.0603V10.0719C29.0603 9.40737 28.8098 8.8882 28.3087 8.49362C27.8077 8.09905 27.1396 7.89138 26.2836 7.89138C25.532 7.89138 24.9266 8.05752 24.4464 8.36902C23.9662 8.70129 23.674 9.1374 23.5905 9.67734H19.6446C19.7699 8.18212 20.4589 7.01916 21.6697 6.18848C22.8806 5.3578 24.4882 4.92169 26.4924 4.92169C28.5801 4.92169 30.2086 5.37857 31.3359 6.29232C32.4842 7.20607 33.0688 8.53516 33.0688 10.2588V15.4298C33.0688 15.7828 33.1523 16.0321 33.2984 16.1774C33.4445 16.302 33.6951 16.3851 34.0291 16.3851H34.4675V19.8117ZM26.0749 13.4569C25.2398 13.4569 24.5717 13.6231 24.0915 13.9761C23.6322 14.3084 23.4026 14.7653 23.4026 15.3675C23.4026 15.8867 23.5905 16.2813 23.9871 16.5928C24.3838 16.9043 24.9266 17.0496 25.5947 17.0496C26.6594 17.0496 27.4945 16.7589 28.1 16.1567C28.7054 15.5544 29.0394 14.7445 29.0603 13.7269V13.4569H26.0749Z" fill="currentColor"/>
              <path d="M45.5115 14.9314C45.5741 15.5752 45.8873 16.0944 46.4718 16.5097C47.0564 16.9043 47.7871 17.112 48.6848 17.112C49.5408 17.112 50.2297 16.9874 50.7308 16.7174C51.2318 16.4266 51.4824 16.0321 51.4824 15.5129C51.4824 15.1391 51.3571 14.8483 51.1275 14.6614C50.8978 14.4745 50.5638 14.3292 50.1462 14.2669C49.7287 14.163 49.0397 14.0592 48.0794 13.9554C46.7641 13.7892 45.6785 13.5608 44.8225 13.2908C43.9665 13.0208 43.2567 12.6055 42.7557 12.024C42.2337 11.4426 41.9832 10.6949 41.9832 9.73966C41.9832 8.78438 42.2337 7.9537 42.7557 7.22685C43.2985 6.47924 44.0501 5.91853 45.0104 5.50319C45.9708 5.10861 47.0773 4.90094 48.3299 4.90094C50.355 4.92171 51.9625 5.35782 53.1943 6.1885C54.4469 7.01918 55.115 8.18213 55.2194 9.67736H51.3571C51.2945 9.11665 51.0022 8.68054 50.4594 8.3275C49.9374 7.97446 49.2694 7.78756 48.4343 7.78756C47.6618 7.78756 47.0355 7.93293 46.5553 8.22367C46.096 8.5144 45.8664 8.88821 45.8664 9.36585C45.8664 9.71889 45.9916 9.9681 46.2422 10.1342C46.4927 10.3004 46.8267 10.425 47.2234 10.508C47.6201 10.5911 48.309 10.6742 49.2485 10.7572C51.2527 10.9857 52.7768 11.4218 53.8206 12.0448C54.9062 12.647 55.4282 13.7062 55.4282 15.2222C55.4282 16.1774 55.1359 17.0081 54.5722 17.735C54.0085 18.4618 53.2361 19.0225 52.2131 19.4171C51.211 19.7909 50.0418 19.9986 48.7266 19.9986C46.6806 19.9986 44.9895 19.5417 43.716 18.6487C42.4216 17.735 41.7535 16.4889 41.67 14.9314H45.5115Z" fill="currentColor"/>
              <path d="M69.7503 6.72852C68.623 5.6694 67.2033 5.12946 65.4496 5.12946C63.6333 5.12946 62.1719 5.794 61.0654 7.12309V0H56.9943V19.9986H61.0654V12.4602C61.0654 11.1934 61.3368 10.2174 61.9213 9.5113C62.5059 8.80522 63.3201 8.45218 64.364 8.45218C65.3661 8.45218 66.1177 8.78445 66.6187 9.42823C67.1198 10.0512 67.3703 10.965 67.3703 12.1902V19.9986H71.4414V12.0241C71.4414 9.55283 70.8777 7.78763 69.7503 6.72852Z" fill="currentColor"/>
              <path d="M73.0068 5.29551H77.0779V19.9778H73.0068V5.29551Z" fill="currentColor" fillOpacity="0.9"/>
              <path d="M76.473 0.581477C76.0972 0.20767 75.617 0 75.0324 0C74.4688 0 73.9677 0.20767 73.571 0.581477C73.1952 0.955283 72.9865 1.41216 72.9865 1.97287C72.9865 2.53358 73.1952 3.01122 73.571 3.38503C73.9677 3.75883 74.4688 3.9665 75.0324 3.9665C75.5961 3.9665 76.0972 3.7796 76.473 3.38503C76.8488 2.99045 77.0575 2.53358 77.0575 1.97287C77.0575 1.41216 76.8488 0.934516 76.473 0.581477Z" fill="currentColor"/>
            </svg>
            <span className="text-white/60 text-sm font-normal group-hover:text-white transition-colors">
              Called It
            </span>
          </Link>
          
          <Link 
            href="/"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Overview
          </Link>
        </nav>
      </header>

      {/* Category Filters */}
      <div className="absolute top-24 left-0 w-full z-40 px-6">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                selectedCategory === cat 
                  ? 'bg-[#00D991] text-black' 
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Hover Info Panel */}
      {hoveredIndex !== null && focusedCard === null && (
        <HoverInfoPanel market={filteredMarkets[hoveredIndex % filteredMarkets.length]} />
      )}

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas 
          dpr={[1, 1.5]} 
          camera={{ position: [0, 0, 15], fov: 32 }}
          onPointerMissed={() => setHoveredIndex(null)}
        >
          <Suspense fallback={null}>
            <ScrollControls pages={4} infinite enabled={focusedCard === null}>
              <CarouselScene 
                markets={filteredMarkets}
                focusedCard={focusedCard} 
                setFocusedCard={setFocusedCard}
                setHoveredIndex={setHoveredIndex}
              />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>

      {/* Detail Panel Overlay */}
      {focusedCard !== null && (
        <DetailPanel 
          market={filteredMarkets[focusedCard % filteredMarkets.length]} 
          onClose={() => setFocusedCard(null)} 
        />
      )}

      {/* Bottom Stats */}
      <div className="absolute bottom-6 left-6 z-40">
        <div className="flex items-center gap-4 text-white/40 text-xs">
          <span className="tabular-nums">{filteredMarkets.length} markets</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Scroll to explore</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 right-6 z-40">
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center animate-pulse">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/50">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

function HoverInfoPanel({ market }: { market: Market }) {
  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
      <div className="flex flex-col items-center gap-3 px-8 py-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10">
        <span className="text-[#00D991] text-xs font-bold tracking-wider uppercase">
          {market.category}
        </span>
        <h3 className="text-white text-2xl font-bold tracking-tight text-center">
          {market.title}
        </h3>
        <p className="text-white/60 text-sm text-center max-w-md">
          {market.question}
        </p>
        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-xs">Volume:</span>
            <span className="text-white text-sm font-bold tabular-nums">{market.volume}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-xs">Confidence:</span>
            <span className="text-[#00D991] text-sm font-bold tabular-nums">{market.finalProbability}%</span>
          </div>
        </div>
        <span className="text-white/30 text-xs mt-2">Click to view details</span>
      </div>
    </div>
  )
}

function DetailPanel({ market, onClose }: { market: Market; onClose: () => void }) {
  return (
    <div 
      className="absolute inset-0 z-50 flex items-end justify-center pb-16 pointer-events-none"
      style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)'
      }}
    >
      <div className="w-full max-w-3xl px-6 flex flex-col items-center gap-8 pointer-events-auto">
        {/* Category Badge */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#00D991]" />
          <span className="text-[#00D991] text-sm font-bold tracking-wider uppercase">
            {market.category} • CORRECT
          </span>
        </div>

        {/* Title */}
        <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight text-center leading-tight">
          {market.title}
        </h1>

        {/* Question */}
        <p className="text-white/70 text-lg md:text-xl text-center max-w-2xl">
          {market.question}
        </p>

        {/* Description */}
        <p className="text-white/50 text-sm text-center max-w-xl">
          {market.description}
        </p>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-4 gap-4 py-6 border-t border-b border-white/10">
          <div className="flex flex-col items-center gap-1">
            <span className="text-white/40 text-xs font-medium uppercase tracking-wider">
              Confidence
            </span>
            <span className="text-[#00D991] text-2xl md:text-3xl font-bold tabular-nums">
              {market.finalProbability}%
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-white/10">
            <span className="text-white/40 text-xs font-medium uppercase tracking-wider">
              Volume
            </span>
            <span className="text-white text-2xl md:text-3xl font-bold">
              {market.volume}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-white/10">
            <span className="text-white/40 text-xs font-medium uppercase tracking-wider">
              Predicted
            </span>
            <span className="text-white text-lg font-medium">
              {market.predictionDate}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-white/10">
            <span className="text-white/40 text-xs font-medium uppercase tracking-wider">
              Resolved
            </span>
            <span className="text-white text-lg font-medium">
              {market.resolutionDate}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-white text-sm font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Gallery
          </button>
          <a 
            href={market.kalshiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#00D991] hover:bg-[#00D991]/90 transition-all text-black text-sm font-bold"
          >
            View on Kalshi
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

function CarouselScene({ markets, focusedCard, setFocusedCard, setHoveredIndex }: {
  markets: Market[];
  focusedCard: number | null;
  setFocusedCard: (index: number | null) => void;
  setHoveredIndex: (index: number | null) => void;
}) {
  const ref = useRef<THREE.Group>(null)
  const scroll = useScroll()
  
  useFrame((state, delta) => {
    if (!ref.current) return
    
    // Smooth rotation based on scroll
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2)

    if (focusedCard === null) {
      // Carousel mode - subtle parallax with mouse
      state.camera.lookAt(0, 0, 0)
      easing.damp3(
        state.camera.position, 
        [-state.pointer.x * 1.5, state.pointer.y * 1 + 3, 25], 
        0.3, 
        delta
      )
    } else {
      // Detail mode - center camera
      state.camera.lookAt(0, 0, 0)
      easing.damp3(state.camera.position, [0, 0, 18], 0.4, delta)
    }
  })

  // Create cards based on markets, repeat to fill carousel
  const cardCount = Math.max(40, markets.length * 3)
  const radius = 8

  return (
    <group ref={ref}>
      {Array.from({ length: cardCount }, (_, i) => {
        const angle = (i / cardCount) * Math.PI * 2
        const market = markets[i % markets.length]
        return (
          <CarouselCard
            key={`${market.id}-${i}`}
            index={i}
            angle={angle}
            radius={radius}
            market={market}
            isDetail={focusedCard !== null}
            isActive={focusedCard === i}
            setFocusedCard={setFocusedCard}
            setHoveredIndex={setHoveredIndex}
          />
        )
      })}
    </group>
  )
}

function CarouselCard({ 
  index, 
  angle, 
  radius, 
  market, 
  isDetail, 
  isActive, 
  setFocusedCard, 
  setHoveredIndex 
}: {
  index: number;
  angle: number;
  radius: number;
  market: Market;
  isDetail: boolean;
  isActive: boolean;
  setFocusedCard: (index: number | null) => void;
  setHoveredIndex: (index: number | null) => void;
}) {
  const ref = useRef<THREE.Mesh>(null)
  const texture = useTexture(`/images/img${market.imageIndex}.jpg`)
  const scroll = useScroll()
  const [hovered, setHovered] = useState(false)

  // Fix image stretching by using cover-like behavior
  useEffect(() => {
    if (texture && texture.image) {
      const img = texture.image as HTMLImageElement
      const imageAspect = img.width / img.height
      const planeAspect = 1.618 // golden ratio (width / height)
      
      texture.matrixAutoUpdate = false
      
      if (imageAspect > planeAspect) {
        // Image is wider than plane - crop sides
        const scale = planeAspect / imageAspect
        texture.matrix.setUvTransform(
          (1 - scale) / 2, 0,  // offset
          scale, 1,           // repeat
          0,                  // rotation
          0.5, 0.5           // center
        )
      } else {
        // Image is taller than plane - crop top/bottom
        const scale = imageAspect / planeAspect
        texture.matrix.setUvTransform(
          0, (1 - scale) / 2,  // offset
          1, scale,            // repeat
          0,                   // rotation
          0.5, 0.5            // center
        )
      }
    }
  }, [texture])

  // Update cursor based on hover state
  useEffect(() => {
    document.body.style.cursor = hovered && !isDetail ? 'pointer' : 'default'
    return () => {
      document.body.style.cursor = 'default'
    }
  }, [hovered, isDetail])

  useFrame((state, delta) => {
    if (!ref.current) return
    
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const rotY = Math.PI / 2 + angle

    if (isDetail) {
      if (isActive) {
        // Active card in detail mode - move to center
        const targetWorldZ = 10
        const parentRotation = -scroll.offset * (Math.PI * 2)
        const theta = -parentRotation
        const targetLocalX = -targetWorldZ * Math.sin(theta)
        const targetLocalZ = targetWorldZ * Math.cos(theta)
        
        easing.damp3(ref.current.position, [targetLocalX, 1, targetLocalZ], 0.4, delta)
        easing.damp3(ref.current.scale, [3, 3, 0.1], 0.4, delta)
        
        // Face camera
        const parentQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), parentRotation)
        const dummy = new THREE.Object3D()
        dummy.position.set(0, 1, targetWorldZ)
        dummy.lookAt(0, 1, 18)
        const worldQuat = new THREE.Quaternion().setFromEuler(dummy.rotation)
        const targetLocalQuat = worldQuat.clone().premultiply(parentQuat.invert())
        easing.dampQ(ref.current.quaternion, targetLocalQuat, 0.4, delta)
        
        const mat = ref.current.material as THREE.MeshBasicMaterial
        mat.opacity = 1
        mat.color.set('#ffffff')
      } else {
        // Hide non-active cards
        ref.current.scale.set(0, 0, 0)
      }
    } else {
      // Carousel mode
      const hoverScale = hovered ? 1.1 : 1
      const baseScaleX = 1.618 * 2
      const baseScaleY = 1 * 2
      
      easing.damp3(ref.current.position, [x, hovered ? 0.3 : 0, z], 0.15, delta)
      easing.damp3(ref.current.scale, [baseScaleX * hoverScale, baseScaleY * hoverScale, 1], 0.15, delta)
      easing.dampE(ref.current.rotation, [0, rotY, 0], 0.15, delta)
      
      const mat = ref.current.material as THREE.MeshBasicMaterial
      mat.opacity = 1
      mat.color.set(hovered ? '#ffffff' : '#c8c8c8')
    }
  })

  return (
    <mesh 
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        if (!isDetail) setFocusedCard(index)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        if (!isDetail) {
          setHovered(true)
          setHoveredIndex(index)
        }
      }}
      onPointerOut={() => {
        if (!isDetail) {
          setHovered(false)
        }
      }}
    >
      <boxGeometry args={[1, 1, 0.02]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
  )
}
