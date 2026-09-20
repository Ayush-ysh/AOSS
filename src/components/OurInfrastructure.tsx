import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const layers = [
  { label: 'PRODUCTS', color: 'rgba(124,58,237,0.5)' },
  { label: 'APPLICATION LAYER', color: 'rgba(100,60,220,0.35)' },
  { label: 'AOSS PLATFORM', color: 'rgba(80,70,200,0.35)' },
  { label: 'AUTOMATION', color: 'rgba(60,80,200,0.3)' },
  { label: 'INFRASTRUCTURE', color: 'rgba(37,99,235,0.3)' },
  { label: 'DATA + INTELLIGENCE', color: 'rgba(30,80,220,0.25)' },
]

const metrics = ['RAPID DEPLOYMENT', 'REUSABLE SYSTEMS', 'MULTI-PLATFORM', 'SCALABLE BY DESIGN']

export default function OurInfrastructure() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="infrastructure" className="relative py-32 md:py-44 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* BG accent */}
      <div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none h-96"
        style={{ background: 'radial-gradient(ellipse 70% 100% at 50% 50%, rgba(37,99,235,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="heading-lg text-white mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          BUILT FOR
          <br />
          <span className="text-zinc-600">SPEED.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center mt-16">
          {/* Stack visual */}
          <div className="space-y-1.5">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.label}
                className="relative flex items-center gap-4 px-5 py-4 rounded-xl overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 4, borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: layer.color.replace('0.', '0.8').replace(',0.', ',') }} />
                <div className="absolute inset-0 opacity-40" style={{ background: `linear-gradient(90deg, ${layer.color}, transparent)` }} />
                <span className="relative text-[10px] font-bold tracking-[0.18em] uppercase text-zinc-300">{layer.label}</span>

                {/* Connector dots */}
                {i < layers.length - 1 && (
                  <div className="absolute -bottom-1 left-1/2 w-px h-1.5 bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Text + metrics */}
          <div>
            <motion.p
              className="text-zinc-400 text-base leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Behind every AOSS product is a reusable technology foundation designed to reduce duplication,
              accelerate development and make experimentation dramatically cheaper.
            </motion.p>

            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, i) => (
                <motion.div
                  key={metric}
                  className="p-4 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                >
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-zinc-400 block">{metric}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
