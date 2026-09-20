import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
      const target = e.target as HTMLElement
      const isClickable = target.closest("a, button, [data-cursor=pointer]")
      setIsPointer(!!isClickable)
    }
    const leave = () => setIsVisible(false)
    const enter = () => setIsVisible(true)

    document.addEventListener("mousemove", move, { passive: true })
    document.addEventListener("mouseleave", leave)
    document.addEventListener("mouseenter", enter)

    return () => {
      document.removeEventListener("mousemove", move)
      document.removeEventListener("mouseleave", leave)
      document.removeEventListener("mouseenter", enter)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor dot */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
            style={{ x: pos.x - 4, y: pos.y - 4 }}
            animate={{ x: pos.x - 4, y: pos.y - 4 }}
            transition={{ type: "spring", stiffness: 800, damping: 60, mass: 0.3 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-white"
              animate={{ scale: isPointer ? 0 : 1 }}
              transition={{ duration: 0.15 }}
            />
          </motion.div>

          {/* Ring cursor */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9997]"
            style={{ x: pos.x - 18, y: pos.y - 18 }}
            animate={{ x: pos.x - 18, y: pos.y - 18 }}
            transition={{ type: "spring", stiffness: 200, damping: 30, mass: 0.8 }}
          >
            <motion.div
              className="rounded-full border border-white/40"
              animate={{
                width: isPointer ? 44 : 36,
                height: isPointer ? 44 : 36,
                opacity: isPointer ? 0.6 : 0.3,
              }}
              style={{ width: 36, height: 36 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
