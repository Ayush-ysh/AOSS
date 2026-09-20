import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// ─── Focus-area icons (inline SVG glyphs) ───────────────────────────────────

function IconConsumer() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2.5 12c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function IconDeveloper() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="2" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 5h11" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4.5 8l1.5 1.5L4.5 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 10.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function IconInfrastructure() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="2" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="8" y="2" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="5" y="8" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 6v2M10 6v2M7 8V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function IconSecurity() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1.5L2 3.5v4c0 2.5 2.2 4.5 5 5 2.8-.5 5-2.5 5-5v-4L7 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5 7l1.5 1.5L9 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconAI() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="1.5" fill="currentColor" />
      <path d="M7 1.5V3M7 11v1.5M1.5 7H3M11 7h1.5M3.2 3.2l1 1M9.8 9.8l1 1M10.8 3.2l-1 1M4.2 9.8l-1 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

// ─── Focus-area bottom strip ─────────────────────────────────────────────────

function FocusStrip() {
  const areas = [
    { label: 'CONSUMER', icon: <IconConsumer /> },
    { label: 'DEVELOPER', icon: <IconDeveloper /> },
    { label: 'INFRASTRUCTURE', icon: <IconInfrastructure /> },
    { label: 'SECURITY', icon: <IconSecurity /> },
    { label: 'AI', icon: <IconAI /> },
  ]

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div
        className="aoss-container flex items-center"
        style={{ height: '72px', gap: '0' }}
      >
        {/* Label */}
        <span
          className="text-white/25 flex-shrink-0"
          style={{
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.28em',
            minWidth: '120px',
          }}
        >
          FOCUS AREAS
        </span>

        {/* Divider */}
        <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.07)', flexShrink: 0 }} />

        {/* Areas */}
        <div className="flex items-center flex-1">
          {areas.map((area, i) => (
            <div key={area.label} className="flex items-center flex-1 justify-center">
              {i > 0 && (
                <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.07)', flexShrink: 0, marginRight: '0' }} />
              )}
              <div
                className="flex items-center gap-2.5 flex-1 justify-center text-white/35 hover:text-white/60 transition-colors duration-200 cursor-default"
                style={{}}
              >
                <span style={{ opacity: 0.5 }}>{area.icon}</span>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.24em',
                  }}
                >
                  {area.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right tagline */}
        <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.07)', flexShrink: 0 }} />
        <div
          className="flex items-center gap-2.5 flex-shrink-0 text-white/25"
          style={{ paddingLeft: '28px', minWidth: '220px' }}
        >
          <span style={{ fontSize: '11px' }}>→</span>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              lineHeight: 1.4,
            }}
          >
            BUILDING A MORE<br />CONNECTED TOMORROW
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Enhanced Tech Visual ─────────────────────────────────────────────────────

function TechVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">

      {/* Background radial atmosphere */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="animate-pulse-glow"
          style={{
            width: '560px',
            height: '560px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(91,33,182,0.18) 0%, rgba(37,99,235,0.10) 45%, transparent 68%)',
          }}
        />
      </div>

      {/* Secondary softer glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          style={{
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 60%)',
            animation: 'pulse-glow 6s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* SVG network */}
      <svg
        width="520"
        height="520"
        viewBox="0 0 460 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
        style={{ zIndex: 1 }}
      >
        <defs>
          {/* Line gradient */}
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(124,58,237,0.85)" />
            <stop offset="50%" stopColor="rgba(37,99,235,0.65)" />
            <stop offset="100%" stopColor="rgba(219,39,119,0.55)" />
          </linearGradient>

          {/* Card blur filter */}
          <filter id="cardBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>

          {/* Node glow filter */}
          <filter id="glowV" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glowB" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glowM" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Orbit rings */}
        <circle
          cx="230" cy="230" r="190"
          stroke="rgba(124,58,237,0.08)"
          strokeWidth="1"
          strokeDasharray="3 9"
        />
        <circle
          cx="230" cy="230" r="155"
          stroke="rgba(37,99,235,0.06)"
          strokeWidth="1"
          strokeDasharray="2 12"
        />
        <circle
          cx="230" cy="230" r="110"
          stroke="rgba(124,58,237,0.05)"
          strokeWidth="1"
          strokeDasharray="1 8"
        />

        {/* Connecting lines — slightly more visible */}
        <g opacity="0.32" stroke="url(#lineGrad)" strokeWidth="1">
          <line x1="230" y1="108" x2="338" y2="192" />
          <line x1="230" y1="108" x2="122" y2="192" />
          <line x1="338" y1="192" x2="338" y2="298" />
          <line x1="122" y1="192" x2="122" y2="298" />
          <line x1="338" y1="298" x2="230" y2="364" />
          <line x1="122" y1="298" x2="230" y2="364" />
          <line x1="230" y1="108" x2="230" y2="364" />
          <line x1="122" y1="192" x2="338" y2="192" />
          <line x1="122" y1="298" x2="338" y2="298" />
          {/* Extended arms */}
          <line x1="230" y1="50" x2="230" y2="108" />
          <line x1="395" y1="230" x2="338" y2="192" />
          <line x1="65" y1="230" x2="122" y2="192" />
          <line x1="230" y1="420" x2="230" y2="364" />
        </g>

        {/* ── CARDS ── */}

        {/* Top center card */}
        <g className="animate-float" style={{ transformOrigin: '230px 108px' }}>
          <rect x="196" y="78" width="68" height="44" rx="9"
            fill="rgba(91,33,182,0.22)"
            stroke="rgba(124,58,237,0.55)"
            strokeWidth="1.2"
          />
          <rect x="210" y="92" width="40" height="5" rx="2.5"
            fill="rgba(255,255,255,0.45)"
          />
          <rect x="210" y="101" width="28" height="3.5" rx="1.75"
            fill="rgba(255,255,255,0.18)"
          />
          <rect x="210" y="108" width="20" height="3" rx="1.5"
            fill="rgba(124,58,237,0.4)"
          />
        </g>

        {/* Right top card */}
        <g className="animate-float" style={{ transformOrigin: '338px 230px', animationDelay: '1s' }}>
          <rect x="305" y="166" width="68" height="50" rx="9"
            fill="rgba(30,58,138,0.22)"
            stroke="rgba(37,99,235,0.45)"
            strokeWidth="1.2"
          />
          <rect x="319" y="180" width="40" height="5" rx="2.5"
            fill="rgba(255,255,255,0.40)"
          />
          <rect x="319" y="189" width="28" height="3.5" rx="1.75"
            fill="rgba(255,255,255,0.18)"
          />
          <rect x="319" y="197" width="20" height="3" rx="1.5"
            fill="rgba(37,99,235,0.4)"
          />
          <rect x="319" y="204" width="32" height="3" rx="1.5"
            fill="rgba(255,255,255,0.07)"
          />
        </g>

        {/* Left top card — magenta */}
        <g className="animate-float" style={{ transformOrigin: '122px 230px', animationDelay: '2s' }}>
          <rect x="88" y="164" width="68" height="50" rx="9"
            fill="rgba(131,24,67,0.15)"
            stroke="rgba(219,39,119,0.35)"
            strokeWidth="1.2"
          />
          <rect x="102" y="178" width="40" height="5" rx="2.5"
            fill="rgba(255,255,255,0.35)"
          />
          <rect x="102" y="187" width="28" height="3.5" rx="1.75"
            fill="rgba(255,255,255,0.15)"
          />
          <rect x="102" y="195" width="20" height="3" rx="1.5"
            fill="rgba(219,39,119,0.4)"
          />
        </g>

        {/* Center card — largest, brightest */}
        <rect x="187" y="197" width="86" height="62" rx="13"
          fill="rgba(91,33,182,0.28)"
          stroke="rgba(124,58,237,0.70)"
          strokeWidth="1.5"
        />
        {/* Card inner highlight line */}
        <rect x="187" y="197" width="86" height="1" rx="0.5"
          fill="rgba(255,255,255,0.08)"
        />
        <rect x="201" y="212" width="58" height="5.5" rx="2.75"
          fill="rgba(255,255,255,0.65)"
        />
        <rect x="201" y="222" width="42" height="4" rx="2"
          fill="rgba(255,255,255,0.28)"
        />
        <rect x="201" y="230" width="32" height="3.5" rx="1.75"
          fill="rgba(255,255,255,0.14)"
        />
        <rect x="201" y="237" width="50" height="3.5" rx="1.75"
          fill="rgba(124,58,237,0.45)"
        />

        {/* Right bottom card */}
        <g className="animate-float" style={{ transformOrigin: '338px 298px', animationDelay: '0.7s' }}>
          <rect x="305" y="274" width="68" height="48" rx="9"
            fill="rgba(30,58,138,0.18)"
            stroke="rgba(37,99,235,0.38)"
            strokeWidth="1.2"
          />
          <rect x="319" y="288" width="40" height="5" rx="2.5"
            fill="rgba(255,255,255,0.35)"
          />
          <rect x="319" y="297" width="28" height="3.5" rx="1.75"
            fill="rgba(255,255,255,0.14)"
          />
          <rect x="319" y="305" width="20" height="3" rx="1.5"
            fill="rgba(37,99,235,0.35)"
          />
        </g>

        {/* Left bottom card */}
        <g className="animate-float" style={{ transformOrigin: '122px 298px', animationDelay: '1.5s' }}>
          <rect x="88" y="274" width="68" height="48" rx="9"
            fill="rgba(131,24,67,0.12)"
            stroke="rgba(219,39,119,0.28)"
            strokeWidth="1.2"
          />
          <rect x="102" y="288" width="40" height="5" rx="2.5"
            fill="rgba(255,255,255,0.30)"
          />
          <rect x="102" y="297" width="28" height="3.5" rx="1.75"
            fill="rgba(255,255,255,0.12)"
          />
        </g>

        {/* Bottom card */}
        <g className="animate-float" style={{ transformOrigin: '230px 364px', animationDelay: '3s' }}>
          <rect x="196" y="342" width="68" height="44" rx="9"
            fill="rgba(91,33,182,0.18)"
            stroke="rgba(124,58,237,0.42)"
            strokeWidth="1.2"
          />
          <rect x="210" y="356" width="40" height="5" rx="2.5"
            fill="rgba(255,255,255,0.38)"
          />
          <rect x="210" y="365" width="26" height="3.5" rx="1.75"
            fill="rgba(255,255,255,0.14)"
          />
        </g>

        {/* ── NODES ── */}

        {/* Main nodes — filled with glow */}
        <circle cx="230" cy="108" r="5" fill="rgba(124,58,237,1)" className="animate-node-violet" />
        <circle cx="338" cy="192" r="4.5" fill="rgba(37,99,235,0.9)" className="animate-node-blue" />
        <circle cx="122" cy="192" r="4.5" fill="rgba(219,39,119,0.85)" className="animate-node-magenta" />
        <circle cx="338" cy="298" r="4.5" fill="rgba(37,99,235,0.9)" className="animate-node-blue" />
        <circle cx="122" cy="298" r="4.5" fill="rgba(219,39,119,0.85)" className="animate-node-magenta" />
        <circle cx="230" cy="364" r="5" fill="rgba(124,58,237,0.9)" className="animate-node-violet" />
        {/* Center node — largest */}
        <circle cx="230" cy="228" r="6.5" fill="rgba(124,58,237,1)" className="animate-node-violet" />

        {/* Arm endpoint nodes — outline style */}
        <circle cx="230" cy="50" r="5" fill="none" stroke="rgba(124,58,237,0.55)" strokeWidth="1.5" />
        <circle cx="395" cy="230" r="5" fill="none" stroke="rgba(37,99,235,0.5)" strokeWidth="1.5" />
        <circle cx="65" cy="230" r="5" fill="none" stroke="rgba(219,39,119,0.5)" strokeWidth="1.5" />
        <circle cx="230" cy="420" r="5" fill="none" stroke="rgba(124,58,237,0.4)" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })

  // Text: rises and fades
  const textY = useTransform(smoothProgress, [0, 1], [0, -200])
  const textOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0])

  // Visual: drifts and scales
  const visualY = useTransform(smoothProgress, [0, 1], [0, -90])
  const visualScale = useTransform(smoothProgress, [0, 0.8], [1, 0.90])
  const visualOpacity = useTransform(smoothProgress, [0, 0.65], [1, 0])

  // Supporting elements fade faster
  const supportOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0])

  // Background parallax
  const bgY = useTransform(smoothProgress, [0, 1], [0, 80])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.5 } },
  }

  const item = {
    hidden: { y: 90, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
    },
  }

  return (
    <section
      ref={containerRef}
      className="relative bg-black overflow-hidden"
      style={{ minHeight: '110vh' }}
    >
      {/* Very subtle grid */}
      <motion.div
        style={{
          y: bgY,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
        className="absolute inset-0 opacity-100"
      />

      {/* Very subtle noise layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.022,
        }}
      />

      {/* Radial atmosphere glow — top left bias */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%',
          left: '-5%',
          width: '60%',
          height: '80%',
          background: 'radial-gradient(ellipse, rgba(91,33,182,0.07) 0%, transparent 65%)',
        }}
      />

      {/* Content wrapper — min-height matching section, vertically centered */}
      <div
        className="relative z-10 w-full flex flex-col"
        style={{ minHeight: '110vh' }}
      >
        {/* Main two-column area — grows to fill */}
        <div className="flex-1 flex items-center">
          <div
            className="aoss-container w-full"
            style={{ paddingTop: '140px', paddingBottom: '100px' }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center">

              {/* LEFT: text column — ~52% */}
              <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="w-full lg:flex-[0_0_52%]"
              >
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col"
                >
                  {/* Eyebrow */}
                  <motion.div variants={item} style={{ marginBottom: '32px' }}>
                    <span
                      className="text-white/30"
                      style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.30em',
                        textTransform: 'uppercase',
                      }}
                    >
                      A MULTI-PLATFORM VENTURE ENGINE
                    </span>
                  </motion.div>

                  {/* Giant headline */}
                  <div style={{ marginBottom: '32px' }}>
                    {['WE BUILD', "WHAT'S", 'NEXT.'].map((word) => (
                      <div key={word} style={{ overflow: 'hidden' }}>
                        <motion.h1
                          variants={item}
                          className="text-white uppercase block"
                          style={{
                            fontSize: 'clamp(3.5rem, 13vw, 12.5rem)',
                            lineHeight: 0.85,
                            letterSpacing: '-0.04em',
                            fontWeight: 900,
                          }}
                        >
                          {word}
                        </motion.h1>
                      </div>
                    ))}
                  </div>

                  {/* Supporting copy */}
                  <motion.p
                    variants={item}
                    className="text-white/38"
                    style={{
                      opacity: supportOpacity as unknown as number,
                      marginBottom: '40px',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      lineHeight: 1.7,
                      maxWidth: '440px',
                    }}
                  >
                    BUILDING PRODUCTS ACROSS SOFTWARE,<br />
                    INFRASTRUCTURE &amp; SECURITY.
                  </motion.p>

                  {/* CTAs */}
                  <motion.div
                    variants={item}
                    className="flex flex-wrap items-center"
                    style={{ 
                      opacity: supportOpacity as unknown as number,
                      gap: '16px' 
                    }}
                  >
                    <a href="#ventures" className="btn-primary">
                      EXPLORE AOSS <span className="btn-arrow">↗</span>
                    </a>
                    <a href="#ventures" className="btn-secondary">
                      OUR VENTURES <span className="btn-arrow">↓</span>
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* RIGHT: visual column */}
              <motion.div
                initial={{ opacity: 0, scale: 0.84 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1.5,
                  ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
                  delay: 0.5,
                }}
                className="w-full lg:flex-1 flex items-center justify-center"
                style={{ 
                  y: visualY,
                  scale: visualScale,
                  opacity: visualOpacity as unknown as number,
                  minHeight: '500px', 
                  paddingRight: '20px' 
                }}
              >
                <TechVisual />
              </motion.div>

            </div>
          </div>
        </div>

        {/* Focus-area strip — pinned at bottom of hero */}
        <FocusStrip />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute z-20 flex items-center gap-3"
        style={{
          opacity: supportOpacity as unknown as number,
          bottom: '90px',
          left: 'var(--space-outer)',
        }}
      >
        <motion.div
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="origin-left"
          style={{ width: '28px', height: '1px', background: 'rgba(255,255,255,0.2)' }}
        />
        <span
          className="text-white/22"
          style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.3em' }}
        >
          SCROLL
        </span>
      </motion.div>
    </section>
  )
}
