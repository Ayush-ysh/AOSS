import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stages = ['IDEA', 'BUILD', 'LAUNCH', 'SCALE', 'REINVEST']

export default function TheEngine() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="engine" className="relative py-32 md:py-44 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <motion.div
          className="flex items-center gap-3 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="label-sm text-zinc-600">01 / THE ENGINE</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: large text */}
          <div>
            <motion.h2
              className="heading-lg text-white leading-none"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              One infrastructure.
              <br />
              <span className="text-zinc-500">Many possibilities.</span>
            </motion.h2>
          </div>

          {/* Right: body */}
          <div className="space-y-6">
            {[
              "AOSS is built around a simple idea: the cost of creating sophisticated technology should continue to fall while the speed of execution continues to rise.",
              "Our infrastructure allows us to rapidly design, deploy and scale products across multiple platforms and technology categories.",
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
          </div>
        </div>

        {/* Stage pipeline */}
        <div className="mt-24 relative">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            {stages.map((stage, i) => (
              <motion.div
                key={stage}
                className="flex-1 flex flex-col items-center gap-4 relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Node */}
                <div className="relative flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white/80 relative z-10" />
                  <motion.div
                    className="absolute w-6 h-6 rounded-full bg-white/10"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
                  />
                </div>

                {/* Connecting line (not on last) */}
                {i < stages.length - 1 && (
                  <div className="absolute left-1/2 top-1.5 w-full h-px">
                    <motion.div
                      className="h-px"
                      style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(124,58,237,0.3) 100%)' }}
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.15, duration: 0.8 }}
                    />
                  </div>
                )}

                {/* Label */}
                <span className="label-sm text-zinc-400 text-center text-[9px] md:text-[10px]">{stage}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
