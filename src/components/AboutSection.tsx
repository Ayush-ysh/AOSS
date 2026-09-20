import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} id="about" className="relative py-32 md:py-44 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Ambient background */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          y,
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center gap-3 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          <span className="label-sm text-zinc-600">03 / AOSS</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2
              className="heading-lg text-white leading-none"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              WE ARE
              <br />
              BUILDING A
              <br />
              TECHNOLOGY
              <br />
              <span className="text-gradient">COMPANY THAT</span>
              <br />
              <span className="text-gradient">COMPOUNDS.</span>
            </motion.h2>
          </div>

          <div className="space-y-6 pt-2">
            {[
              'AOSS is being built as a modern technology conglomerate from the ground up.',
              'Rather than building one product and stopping there, we are creating the infrastructure, systems and capabilities required to repeatedly turn ambitious ideas into scalable technology.',
            ].map((text, i) => (
              <motion.p
                key={i}
                className="text-zinc-400 text-base leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
              >
                {text}
              </motion.p>
            ))}

            {/* Animated abstract imagery */}
            <motion.div
              className="mt-10 relative h-48 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 192" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <radialGradient id="aboutGrad" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="rgba(124,58,237,0.2)" />
                    <stop offset="100%" stopColor="rgba(37,99,235,0)" />
                  </radialGradient>
                </defs>
                <rect width="400" height="192" fill="url(#aboutGrad)" />
                {/* Horizontal bands */}
                {[0,1,2,3,4,5].map(i => (
                  <rect key={i} x="0" y={i*34 + 8} width="400" height="1" fill="white" fillOpacity="0.03" />
                ))}
                {/* Progress bar style elements */}
                {[
                  { y: 40, w: 220, label: 'Consumer' },
                  { y: 80, w: 300, label: 'Infrastructure' },
                  { y: 120, w: 160, label: 'Security' },
                  { y: 160, w: 280, label: 'Developer' },
                ].map(bar => (
                  <g key={bar.y}>
                    <rect x="30" y={bar.y} width={bar.w} height="2" rx="1" fill="rgba(124,58,237,0.3)" />
                    <text x="30" y={bar.y - 6} fill="rgba(180,180,180,0.3)" fontSize="7" fontFamily="Inter" fontWeight="600" letterSpacing="1">{bar.label}</text>
                  </g>
                ))}
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
