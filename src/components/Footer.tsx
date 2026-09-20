export default function Footer() {
  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'VENTURES', href: '#ventures' },
    { label: 'PRODUCTS', href: '#products' },
    { label: 'CONTACT', href: '#contact' },
  ]

  const social = [
    { label: 'GITHUB', href: '#' },
    { label: 'LINKEDIN', href: '#' },
    { label: 'X', href: '#' },
  ]

  return (
    <footer className="bg-black border-t border-white/8" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      <div className="aoss-container">
        {/* Top: Brand + tagline */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-16">
          <div>
            <div
              className="text-white font-black tracking-[0.1em] uppercase mb-4"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1 }}
            >
              AOSS
            </div>
            <p className="text-white/30 text-[10px] font-semibold tracking-[0.2em] uppercase">
              BUILDING TECHNOLOGY<br />THAT COMPOUNDS.
            </p>
          </div>

          {/* Nav + Social */}
          <div className="flex flex-col sm:flex-row gap-12 md:gap-20">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/35 hover:text-white text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors duration-200 no-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {social.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/35 hover:text-white text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors duration-200 no-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="border-t border-white/8 pt-8">
          <p className="text-white/20 text-[9px] font-semibold tracking-[0.25em] uppercase">
            © 2026 AOSS
          </p>
        </div>
      </div>
    </footer>
  )
}
