import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// Abstract project panel visuals or image
function ProjectPanel({ variant, index, imageUrl, fit = 'cover' }: { variant: 'main' | 'side'; index: number; imageUrl?: string; fit?: 'cover' | 'contain' }) {
  if (imageUrl) {
    return (
      <div 
        className="relative w-full h-full overflow-hidden flex items-center justify-center" 
        style={{ borderRadius: '24px', backgroundColor: fit === 'contain' ? '#000' : 'transparent' }}
      >
        <img
          src={imageUrl}
          alt={`Project visual ${index}`}
          className={`w-full h-full object-${fit}`}
        />
      </div>
    )
  }

  const gradients = [
    { main: ['#0f0020', '#1e0a45', '#3b0e8a'], accent: 'rgba(124,58,237,0.55)' },
    { main: ['#00081a', '#001240', '#0a2575'], accent: 'rgba(37,99,235,0.55)' },
    { main: ['#000d0a', '#011f19', '#024733'], accent: 'rgba(16,185,129,0.45)' },
  ]
  const g = gradients[index] ?? gradients[0]

  if (variant === 'main') {
    return (
      <div
        className="relative w-full h-full overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${g.main[0]} 0%, ${g.main[1]} 50%, ${g.main[2]} 100%)`,
          borderRadius: '24px',
        }}
      >
        <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 600 360" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id={`vgrid${index}`} width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#vgrid${index})`} />
        </svg>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse-glow"
          style={{
            width: '60%', paddingTop: '60%',
            background: `radial-gradient(circle, ${g.accent} 0%, transparent 65%)`,
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 600 360" preserveAspectRatio="xMidYMid slice">
          <rect x="220" y="120" width="160" height="120" rx="14" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
          <rect x="248" y="148" width="100" height="8" rx="4" fill="rgba(255,255,255,0.28)" />
          <rect x="248" y="162" width="70" height="5" rx="2.5" fill="rgba(255,255,255,0.12)" />
          <rect x="248" y="172" width="85" height="5" rx="2.5" fill="rgba(255,255,255,0.08)" />
          <line x1="300" y1="120" x2="300" y2="70" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="300" y1="240" x2="300" y2="290" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="220" y1="180" x2="130" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="380" y1="180" x2="470" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <circle cx="300" cy="180" r="7" fill="rgba(255,255,255,0.55)" />
        </svg>
      </div>
    )
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: `linear-gradient(200deg, ${g.main[1]} 0%, ${g.main[0]} 100%)`,
        borderRadius: '24px',
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '80%', paddingTop: '80%',
          background: `radial-gradient(circle, ${g.accent} 0%, transparent 60%)`,
          opacity: 0.45,
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 280 280" preserveAspectRatio="xMidYMid slice">
        <circle cx="140" cy="140" r="60" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="5 7" />
        <circle cx="140" cy="140" r="32" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <circle cx="140" cy="140" r="7" fill="rgba(255,255,255,0.45)" />
      </svg>
    </div>
  )
}

const ventures = [
  {
    num: '01',
    label: 'AOSS / FLAGSHIP',
    title: 'THE FIRST WEDGE',
    desc: 'Our flagship product establishing the initial market presence for the TechTrack ecosystem.',
    status: 'IN DEVELOPMENT',
    images: {
      main: '/assets/venture-1-main.png',
      side: '/assets/venture-1-side-v2.png',
    }
  },
  {
    num: '02',
    label: 'AOSS / PLATFORM',
    title: 'THE ENGINE',
    desc: 'Reusable infrastructure powering the products we build.',
    status: 'COMPLETED & WORKING',
    images: {
      main: '/assets/venture-2-main.png',
      side: '/assets/venture-2-side.png',
    }
  },
  {
    num: '03',
    label: 'AOSS / ECOSYSTEM',
    title: 'THE NETWORK',
    desc: 'An interconnected ecosystem of applications built on shared capabilities.',
    status: 'EXPLORING',
    images: {
      main: '/assets/venture-3-main.png',
      side: '/assets/venture-3-side.png',
    }
  },
  {
    num: '04',
    label: 'AOSS / APPLICATION',
    title: 'COMMERCE',
    desc: 'Next-generation commerce application exploring modern retail experiences.',
    status: 'UNDER PROGRESS',
    images: {
      main: '/assets/venture-4-dark-full.jpg',
      fit: 'contain' as const,
    }
  },
]

// Each card sits at a sticky "slot" driven by scroll position
function StickyCard({
  venture,
  index,
  total,
}: {
  venture: typeof ventures[0]
  index: number
  total: number
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Each card owns its own full 0→1 scroll range.
  // Fade in as it enters (0→0.18), hold visible (0.18→0.82),
  // fade/push out as it exits (0.82→1) — except the last card stays.
  const isLast = index === total - 1

  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0, 1, 1, isLast ? 1 : 0.35]
  )

  const rawY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [55, 0, 0, isLast ? 0 : -28]
  )

  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0.95, 1, 1, isLast ? 1 : 0.97]
  )

  const opacity = useSpring(rawOpacity, { stiffness: 55, damping: 20 })
  const y      = useSpring(rawY,      { stiffness: 55, damping: 20 })
  const scale  = useSpring(rawScale,  { stiffness: 55, damping: 20 })

  return (
    <div ref={sectionRef} className="relative" style={{ height: '100vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center aoss-container">
        <motion.div
          style={{ opacity, y, scale, maxWidth: '1400px', width: '100%' }}
        >
          <div
            className="border overflow-hidden"
            style={{
              background: '#080808',
              borderRadius: '32px',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            {/* Card header */}
            <div
              className="flex items-center justify-between border-b"
              style={{
                padding: '2.5rem 3rem',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-center gap-6">
                <span
                  className="text-white font-black"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}
                >
                  {venture.num}
                </span>
                <div className="w-[1px] h-10 bg-white/10" />
                <div className="flex flex-col gap-1">
                  <span className="text-white/40 text-[9px] font-bold tracking-[0.25em] uppercase">
                    {venture.label}
                  </span>
                  <span
                    className="text-white font-black uppercase"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 1.5rem)', letterSpacing: '-0.02em' }}
                  >
                    {venture.title}
                  </span>
                </div>
              </div>
              {/* Status pill */}
              <div
                className="border rounded-full flex-shrink-0 flex items-center justify-center"
                style={{
                  height: '36px',
                  padding: '0 20px',
                  borderColor: 'rgba(255,255,255,0.18)',
                }}
              >
                <span className="text-white/50 text-[9px] font-bold tracking-[0.25em] uppercase leading-none">
                  {venture.status}
                </span>
              </div>
            </div>

            {/* Visual area — large panels */}
            {(!venture.images || venture.images.side) ? (
              <div
                className="grid gap-5"
                style={{
                  gridTemplateColumns: '3fr 2fr',
                  padding: '2rem 3rem 3rem',
                  height: 'clamp(380px, 50vh, 580px)',
                }}
              >
                {/* Main panel */}
                <div className="h-full image-panel rounded-3xl">
                  <ProjectPanel variant="main" index={index} imageUrl={venture.images?.main} fit={venture.images?.fit} />
                </div>

                {/* Side column */}
                <div className="flex flex-col gap-5 h-full">
                  <div className="flex-1 image-panel rounded-3xl">
                    <ProjectPanel variant="side" index={index} imageUrl={venture.images?.side} fit={venture.images?.fit} />
                  </div>
                  {/* Description block */}
                  <div
                    className="border flex-shrink-0 flex items-center"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      padding: '1.6rem 2rem',
                      borderRadius: '20px',
                      borderColor: 'rgba(255,255,255,0.06)',
                    }}
                  >
                    <p className="text-white/40 text-[11px] leading-relaxed font-medium m-0">
                      {venture.desc}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex flex-col gap-5"
                style={{
                  padding: '2rem 3rem 3rem',
                  height: 'clamp(380px, 50vh, 580px)',
                }}
              >
                {/* Full-width Main panel */}
                <div className="flex-1 image-panel rounded-3xl h-full">
                  <ProjectPanel variant="main" index={index} imageUrl={venture.images.main} fit={venture.images.fit} />
                </div>
                {/* Full-width Description block */}
                <div
                  className="border flex-shrink-0 flex items-center w-full"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    padding: '1.6rem 2rem',
                    borderRadius: '20px',
                    borderColor: 'rgba(255,255,255,0.06)',
                  }}
                >
                  <p className="text-white/40 text-[11px] leading-relaxed font-medium m-0">
                    {venture.desc}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function Ventures() {
  const titleRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: titleProgress } = useScroll({
    target: titleRef,
    offset: ['start end', 'end start'],
  })

  const titleY = useTransform(titleProgress, [0, 1], [60, -60])
  const titleOpacity = useTransform(titleProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="ventures" className="bg-black pt-10">

      {/* Section header — its own breathing room */}
      <div
        ref={titleRef}
        className="flex items-center justify-center aoss-container"
        style={{ height: '40vh', minHeight: '320px' }}
      >
        <motion.h2
          style={{
            y: titleY,
            opacity: titleOpacity,
            fontSize: 'clamp(4.5rem, 13vw, 12rem)',
            lineHeight: 0.86,
            letterSpacing: '-0.04em',
            fontWeight: 900,
          }}
          className="text-white font-black uppercase text-center"
        >
          OUR<br />VENTURES
        </motion.h2>
      </div>

      {/* Stacked scroll — each card gets a full viewport height */}
      {ventures.map((venture, i) => (
        <StickyCard
          key={venture.num}
          venture={venture}
          index={i}
          total={ventures.length}
        />
      ))}

      {/* Spacer after last card */}
      <div style={{ height: '15vh' }} />
    </section>
  )
}
