import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { submitContactForm, type ContactFormData } from '../lib/contactForm'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  
  const [form, setForm] = useState<ContactFormData>({ 
    name: '', 
    email: '', 
    message: '', 
    aoss_bot_check: '' 
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent double submission
    if (status === 'submitting') return

    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    const result = await submitContactForm(form)

    if (result.success) {
      setStatus('success')
      setForm({ name: '', email: '', message: '', aoss_bot_check: '' })
      
      // Reset success state after a few seconds
      setTimeout(() => setStatus('idle'), 5000)
    } else {
      setStatus('error')
      setErrorMessage(result.error || 'Unknown error occurred.')
      
      // Reset error state after a few seconds so they can try again
      // setTimeout(() => setStatus('idle'), 10000) // Keep it longer so we can read it
    }
  }

  return (
    <section
      id="contact"
      className="bg-white"
      style={{
        paddingTop: 'var(--section-y-lg)',
        paddingBottom: 'var(--section-y-lg)',
      }}
    >
      <div className="aoss-container">
        <div
          ref={ref}
          className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-start"
        >
          {/* Left: Headline + contact info */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
            className="flex-1 flex flex-col"
          >
            <h2
              className="text-black font-black uppercase"
              style={{
                fontSize: 'clamp(4.2rem, 10vw, 9.5rem)',
                lineHeight: 0.86,
                letterSpacing: '-0.04em',
                fontWeight: 900,
                marginBottom: '8vh',
              }}
            >
              LET'S<br />
              BUILD<br />
              TOGETHER.
            </h2>

            <p
              className="text-black/40 font-medium leading-relaxed mb-8"
              style={{ fontSize: '1rem', maxWidth: '360px' }}
            >
              Have an idea, opportunity or project worth building?
            </p>

            <a
              href="mailto: aoss.pvt.ai@gamil.com"
              className="inline-block text-black font-bold border-b-2 border-black/20 pb-1 hover:border-black/60 transition-colors duration-200 no-underline"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}
            >
              aoss.pvt.ai@gmail.com
            </a>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1], delay: 0.18 }}
            className="flex-1 w-full"
            style={{ paddingTop: '2vh' }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: '4rem' }}>
              
              {/* Honeypot field - hidden from users */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
                <label htmlFor="aoss_bot_check">Bot Check</label>
                <input
                  type="text"
                  id="aoss_bot_check"
                  name="aoss_bot_check"
                  tabIndex={-1}
                  value={form.aoss_bot_check || ''}
                  onChange={(e) => setForm({ ...form, aoss_bot_check: e.target.value })}
                  autoComplete="off"
                />
              </div>

              {/* Name */}
              <div className="flex flex-col gap-3 relative">
                <label htmlFor="name" className="text-black/30 text-[9px] font-bold tracking-[0.25em] uppercase">
                  NAME
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="contact-input text-black font-medium py-3.5 text-base placeholder:text-black/15"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-3 relative">
                <label htmlFor="email" className="text-black/30 text-[9px] font-bold tracking-[0.25em] uppercase">
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="contact-input text-black font-medium py-3.5 text-base placeholder:text-black/15"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-3 relative">
                <label htmlFor="message" className="text-black/30 text-[9px] font-bold tracking-[0.25em] uppercase">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  required
                  minLength={10}
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="contact-input text-black font-medium py-3.5 text-base placeholder:text-black/15 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Section */}
              <div className="flex flex-col gap-4">
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="self-start btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' && 'SENDING...'}
                  {status === 'success' && 'SENT ✓'}
                  {status === 'error' && 'ERROR'}
                  {status === 'idle' && (
                    <>
                      SEND MESSAGE <span className="btn-arrow">↗</span>
                    </>
                  )}
                </motion.button>
                
                {/* Inline Status Message */}
                <div aria-live="polite" className="h-6">
                  {status === 'success' && (
                    <span className="text-green-600 text-xs font-semibold tracking-wide uppercase">
                      Message sent. We'll be in touch.
                    </span>
                  )}
                  {status === 'error' && (
                    <span className="text-red-500 text-xs font-semibold tracking-wide uppercase max-w-md block leading-snug">
                      {errorMessage}
                    </span>
                  )}
                </div>
              </div>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
