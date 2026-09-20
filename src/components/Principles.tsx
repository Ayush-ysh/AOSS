import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const principles = [
  { num: '01', title: 'SPEED',       desc: 'Rapid execution without unnecessary overhead.' },
  { num: '02', title: 'LEVERAGE',    desc: 'Build infrastructure once and reuse it across products.' },
  { num: '03', title: 'COMPOUNDING', desc: 'Every product strengthens the next.' },
  { num: '04', title: 'SCALE',       desc: 'Design systems that grow beyond individual products.' },
]

function PrincipleCard({ p, index }: { p: typeof principles[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: index * 0.1 }}
      className="principle-card border border-white/10"
      style={{
        background: 'rgba(255,255,255,0.025)',
        padding: 'clamp(3rem, 4vw, 4rem)',
        borderRadius: '28px',
        minHeight: 'clamp(280px, 30vh, 360px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <span
        className="text-white/10 font-black block"
        style={{ fontSize: 'clamp(4rem, 8vw, 6rem)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1 }}
      >
        {p.num}
      </span>

      <div>
        <h3
          className="text-white font-black uppercase mb-4"
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          {p.title}
        </h3>
        <p className="text-white/35 font-medium leading-relaxed" style={{ fontSize: '1rem' }}>
          {p.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function Principles() {
  const headingRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headingRef, { once: true, margin: '-8%' })

  return (
    <section
      className="bg-[#050505]"
      style={{
        paddingTop: 'var(--section-y-lg)',
        paddingBottom: 'var(--section-y-lg)',
      }}
    >
      <div className="aoss-container">

        {/* Large centered heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
          style={{ marginBottom: '10vh', textAlign: 'center' }}
        >
          <h2
            className="text-white font-black uppercase"
            style={{
              fontSize: 'clamp(4rem, 11vw, 10rem)',
              lineHeight: 0.86,
              letterSpacing: '-0.04em',
              fontWeight: 900,
            }}
          >
            THE AOSS<br />ENGINE
          </h2>
        </motion.div>

        {/* 2×2 card grid — each card tall with its own inView trigger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {principles.map((p, i) => (
            <PrincipleCard key={p.num} p={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
