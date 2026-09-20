import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  { num: '01', name: 'CONSUMER',       desc: 'Consumer applications across mobile and web.' },
  { num: '02', name: 'DEVELOPER',      desc: 'Developer tools, automation and technical workflows.' },
  { num: '03', name: 'INFRASTRUCTURE', desc: 'Reusable systems that allow products to be deployed rapidly.' },
  { num: '04', name: 'SECURITY',       desc: 'System-level security and privacy technology.' },
  { num: '05', name: 'AI',             desc: 'Intelligent systems integrated into products and infrastructure.' },
]

function ServiceRow({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  // Each row triggers individually as it enters the viewport
  const inView = useInView(ref, { once: true, margin: '-12%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        ease: [0.23, 1, 0.32, 1],
        delay: index * 0.04,
      }}
      className="service-row border-b flex items-start md:items-center gap-8 md:gap-14 group cursor-default"
      style={{
        paddingTop: '3rem',
        paddingBottom: '3rem',
        borderColor: 'rgba(0,0,0,0.08)',
      }}
    >
      {/* Number */}
      <span
        className="text-black/15 font-black flex-shrink-0 select-none"
        style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}
      >
        {service.num}
      </span>

      {/* Name */}
      <span
        className="text-black font-black flex-1 uppercase"
        style={{ fontSize: 'clamp(1.6rem, 4vw, 3.4rem)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1 }}
      >
        {service.name}
      </span>

      {/* Description */}
      <span
        className="hidden md:block"
        style={{
          maxWidth: '400px',
          color: 'rgba(0,0,0,0.4)',
          fontSize: '1rem',
          lineHeight: 1.6,
          fontWeight: 500,
        }}
      >
        {service.desc}
      </span>

      {/* Arrow */}
      <span className="text-black/15 group-hover:text-black/50 transition-colors duration-300 text-xl ml-auto hidden md:block">
        ↗
      </span>
    </motion.div>
  )
}

export default function WhatWeBuild() {
  const headingRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headingRef, { once: true, margin: '-8%' })

  return (
    <section
      id="about"
      className="bg-white"
      style={{
        paddingTop: 'var(--section-y-lg)',
        paddingBottom: 'var(--section-y-lg)',
      }}
    >
      <div className="aoss-container">

        {/* Large heading — cinematic space above */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
          style={{ marginBottom: '10vh' }}
        >
          <h2
            className="text-black font-black uppercase"
            style={{
              fontSize: 'clamp(5rem, 14vw, 13rem)',
              lineHeight: 0.86,
              letterSpacing: '-0.04em',
              fontWeight: 900,
            }}
          >
            WHAT<br />WE<br />BUILD
          </h2>
        </motion.div>

        {/* Numbered rows — each reveals independently on scroll */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          {services.map((service, i) => (
            <ServiceRow key={service.num} service={service} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
