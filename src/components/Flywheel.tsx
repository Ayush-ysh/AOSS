import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const stages = [
  { label: 'BUILD', angle: 0 },
  { label: 'LAUNCH', angle: 60 },
  { label: 'DISTRIBUTE', angle: 120 },
  { label: 'LEARN', angle: 180 },
  { label: 'REINVEST', angle: 240 },
  { label: 'BUILD AGAIN', angle: 300 },
]

export default function Flywheel() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], ['-20deg', '60deg'])


  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Flywheel visual */}
          <motion.div
            className="relative flex items-center justify-center"
            style={{ minHeight: 380 }}
          >
            <motion.div style={{ rotate }} className="relative w-72 h-72 md:w-80 md:h-80">
              {/* Outer circle */}
              <svg className="absolute inset-0 w-full h-full" viewBox="-160 -160 320 320">
                <defs>
                  <radialGradient id="flyGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(124,58,237,0.15)" />
                    <stop offset="100%" stopColor="rgba(124,58,237,0)" />
                  </radialGradient>
                </defs>

                {/* Outer ring */}
                <circle cx="0" cy="0" r="140" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <circle cx="0" cy="0" r="100" fill="none" stroke="rgba(124,58,237,0.2)" strokeWidth="0.5" strokeDasharray="6 4" />
                <circle cx="0" cy="0" r="140" fill="url(#flyGrad)" />

                {/* Spokes */}
                {stages.map((stage) => {
                  const rad = (stage.angle * Math.PI) / 180
                  const x2 = Math.sin(rad) * 100
                  const y2 = -Math.cos(rad) * 100
                  return (
                    <line key={stage.angle} x1="0" y1="0" x2={x2} y2={y2}
                      stroke="rgba(124,58,237,0.3)" strokeWidth="0.5" />
                  )
                })}

                {/* Stage dots */}
                {stages.map((stage) => {
                  const rad = (stage.angle * Math.PI) / 180
                  const x = Math.sin(rad) * 120
                  const y = -Math.cos(rad) * 120
                  return (
                    <g key={stage.label}>
                      <circle cx={x} cy={y} r="4" fill="rgba(124,58,237,0.8)" />
                      <circle cx={x} cy={y} r="7" fill="rgba(124,58,237,0.15)" />
                    </g>
                  )
                })}
              </svg>

              {/* Center AOSS */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-2xl font-black tracking-[0.2em] text-white block">AOSS</span>
              </div>
            </motion.div>

            {/* Stage labels (fixed, not rotating) */}
            <div className="absolute inset-0 w-full h-full">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                {stages.map((stage, i) => {
                  const rad = (stage.angle * Math.PI) / 180
                  const x = 200 + Math.sin(rad) * 165
                  const y = 200 - Math.cos(rad) * 165
                  return (
                    <motion.text
                      key={stage.label}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="rgba(180,180,180,0.6)"
                      fontSize="8"
                      fontFamily="Inter, sans-serif"
                      fontWeight="700"
                      letterSpacing="2"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                    >
                      {stage.label}
                    </motion.text>
                  )
                })}
              </svg>
            </div>
          </motion.div>

          {/* Text */}
          <div>
            <motion.h2
              className="heading-md text-white mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Every product makes the next one easier to build.
            </motion.h2>

            <motion.p
              className="text-zinc-400 text-base leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Technology, infrastructure, distribution and capital compound across the ecosystem.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
