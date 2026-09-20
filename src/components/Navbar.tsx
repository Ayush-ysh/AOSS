import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = ['ABOUT', 'VENTURES', 'PRODUCTS', 'CONTACT']

  return (
    <>
      {/* Outer container — provides the floating margin */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        style={{ padding: '20px 24px' }}
      >
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="pointer-events-auto flex items-center justify-between transition-all duration-500"
          style={{
            height: '52px',
            paddingLeft: '28px',
            paddingRight: '20px',
            borderRadius: '999px',
            background: scrolled
              ? 'rgba(6,6,6,0.92)'
              : 'rgba(8,8,8,0.80)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: scrolled
              ? '0 4px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)'
              : '0 2px 20px rgba(0,0,0,0.3)',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            className="text-white no-underline flex-shrink-0"
            style={{
              fontSize: '14px',
              fontWeight: 900,
              letterSpacing: '0.14em',
              lineHeight: 1,
            }}
          >
            AOSS
          </a>

          {/* Desktop Nav Links — centered */}
          <div className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white/50 hover:text-white no-underline transition-colors duration-200"
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  lineHeight: 1,
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="no-underline transition-all duration-300 flex items-center"
              style={{
                height: '38px',
                padding: '0 20px',
                borderRadius: '999px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.22)',
                background: 'rgba(255,255,255,0.04)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(124,58,237,0.15)'
                el.style.borderColor = 'rgba(124,58,237,0.5)'
                el.style.color = '#ffffff'
                el.style.boxShadow = '0 0 18px rgba(124,58,237,0.2)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'rgba(255,255,255,0.04)'
                el.style.borderColor = 'rgba(255,255,255,0.22)'
                el.style.color = 'rgba(255,255,255,0.85)'
                el.style.boxShadow = 'none'
              }}
            >
              START A CONVERSATION ↗
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 pointer-events-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-white"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1.5px] bg-white"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-white"
            />
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="fixed z-40 md:hidden"
            style={{
              top: '84px',
              left: '24px',
              right: '24px',
              background: 'rgba(8,8,8,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '20px',
              padding: '28px 28px 24px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMenuOpen(false)}
                className="block text-white font-black uppercase py-3.5 no-underline"
                style={{
                  fontSize: '1.4rem',
                  letterSpacing: '-0.02em',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {link}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center mt-6 no-underline btn-secondary"
              style={{ height: '48px', fontSize: '10px' }}
            >
              START A CONVERSATION ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
