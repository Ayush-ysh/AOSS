import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

function FlagshipVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square">
      {/* Outer rings */}
      {[300, 240, 180, 120].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full border"
          style={{
            width: size,
            height: size,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderColor: `rgba(124, 58, 237, ${0.08 + i * 0.04})`,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {/* Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <motion.div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-3"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(37,99,235,0.4))',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(16px)',
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-2xl font-black tracking-wider text-white">A</span>
        </motion.div>
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">AOSS / FLAGSHIP</p>
      </div>

      {/* Orbiting dots */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <motion.div
          key={angle}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? '#7c3aed' : '#2563eb',
            top: '50%',
            left: '50%',
            transformOrigin: `-90px 0`,
            rotate: angle,
          }}
          animate={{ rotate: [angle, angle + 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

export default function Flagship() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section ref={ref} id="products" className="relative py-32 md:py-44 overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)',
          y,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <motion.div
          className="flex items-center gap-3 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="label-sm text-zinc-600">02 / FLAGSHIP</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2
              className="heading-lg text-white mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              THE FIRST
              <br />
              <span className="text-gradient">WEDGE.</span>
            </motion.h2>

            {[
              'Every ecosystem begins with a single product.',
              'Our flagship product is the first expression of the AOSS infrastructure — designed to establish a market presence, validate our systems and create the foundation for what comes next.',
            ].map((text, i) => (
              <motion.p
                key={i}
                className="text-zinc-400 text-base leading-relaxed mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
              >
                {text}
              </motion.p>
            ))}

            <motion.a
              href="#"
              className="inline-flex items-center gap-2 mt-6 text-xs font-semibold tracking-widest uppercase text-white border border-white/15 rounded-full px-6 py-3 hover:bg-white/05 transition-colors"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.3)' }}
            >
              Explore the product <ArrowUpRight size={11} />
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <FlagshipVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
