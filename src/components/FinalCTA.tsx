import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="contact" className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(124,58,237,0.08) 0%, rgba(37,99,235,0.04) 40%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle noise orbs */}
      <motion.div
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(219,39,119,0.05) 0%, transparent 70%)',
          bottom: '15%',
          right: '10%',
        }}
        animate={{ scale: [1, 1.3, 1], x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.p
          className="label-sm text-zinc-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          AOSS / THE NEXT CHAPTER
        </motion.p>

        <motion.h2
          className="heading-xl text-white mb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          LET'S BUILD
          <br />
          SOMETHING
          <br />
          <span className="text-gradient">THAT COMPOUNDS.</span>
        </motion.h2>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <motion.a
            href="mailto:aoss.pvt.ai@gmail.com"
            className="flex items-center gap-2 bg-white text-black text-xs font-bold tracking-widest uppercase rounded-full px-8 py-4"
            whileHover={{ scale: 1.04, backgroundColor: '#e8e8e8' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            Start a conversation
            <ArrowUpRight size={12} strokeWidth={3} />
          </motion.a>

          <motion.a
            href="#ventures"
            className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
            whileHover={{ y: 2 }}
          >
            Explore our ecosystem
            <ChevronDown size={12} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
