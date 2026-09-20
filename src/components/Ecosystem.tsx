import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

interface Node {
  id: string
  label: string
  x: number
  y: number
  status: 'current' | 'development' | 'exploring'
  description: string
}

const nodes: Node[] = [
  { id: 'aoss', label: 'AOSS', x: 50, y: 50, status: 'current', description: 'The core platform and venture engine.' },
  { id: 'consumer', label: 'Consumer', x: 50, y: 12, status: 'current', description: 'iOS and web applications for end users.' },
  { id: 'security', label: 'Security', x: 82, y: 28, status: 'development', description: 'System-level security and privacy tools.' },
  { id: 'ai', label: 'AI', x: 88, y: 62, status: 'development', description: 'AI-powered workflows and intelligent systems.' },
  { id: 'infra', label: 'Infrastructure', x: 68, y: 88, status: 'current', description: 'Platforms, cloud systems, data infrastructure.' },
  { id: 'developer', label: 'Developer', x: 32, y: 88, status: 'exploring', description: 'Tools for software engineers and teams.' },
  { id: 'mobile', label: 'Mobile', x: 12, y: 62, status: 'current', description: 'Native mobile experiences for iOS and beyond.' },
  { id: 'web', label: 'Web', x: 18, y: 28, status: 'exploring', description: 'Web platforms and browser-based applications.' },
  { id: 'data', label: 'Data', x: 50, y: 72, status: 'development', description: 'Data intelligence and analytics infrastructure.' },
]

const statusColors = {
  current: '#7c3aed',
  development: '#2563eb',
  exploring: '#374151',
}

const statusLabels = {
  current: 'Current',
  development: 'In Development',
  exploring: 'Exploring',
}

const connections = [
  ['aoss', 'consumer'], ['aoss', 'security'], ['aoss', 'ai'], ['aoss', 'infra'],
  ['aoss', 'developer'], ['aoss', 'mobile'], ['aoss', 'web'], ['aoss', 'data'],
]

export default function Ecosystem() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [floatOffset, setFloatOffset] = useState<Record<string, { x: number; y: number }>>({})
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    let t = 0
    const animate = () => {
      const offsets: Record<string, { x: number; y: number }> = {}
      nodes.forEach((node, i) => {
        offsets[node.id] = {
          x: Math.sin(t * 0.01 + i * 1.2) * 1.5,
          y: Math.cos(t * 0.008 + i * 0.9) * 1.5,
        }
      })
      setFloatOffset(offsets)
      t++
      requestAnimationFrame(animate)
    }
    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [])

  const getNode = (id: string) => nodes.find(n => n.id === id)!

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="heading-lg text-white mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          NOT A SINGLE PRODUCT.
          <br />
          <span className="text-zinc-600">A SYSTEM OF PRODUCTS.</span>
        </motion.h2>

        {/* Legend */}
        <motion.div
          className="flex items-center gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {Object.entries(statusLabels).map(([status, label]) => (
            <div key={status} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: statusColors[status as keyof typeof statusColors] }}
              />
              <span className="text-[9px] font-semibold tracking-[0.15em] uppercase text-zinc-500">{label}</span>
            </div>
          ))}
        </motion.div>

        <div className="relative flex justify-center">
          <div className="relative w-full max-w-2xl" style={{ paddingBottom: '100%' }}>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Connection lines */}
              {connections.map(([fromId, toId]) => {
                const from = getNode(fromId)
                const to = getNode(toId)
                const fo = floatOffset[fromId] || { x: 0, y: 0 }
                const to2 = floatOffset[toId] || { x: 0, y: 0 }
                const isActive = hoveredNode === fromId || hoveredNode === toId
                return (
                  <motion.line
                    key={`${fromId}-${toId}`}
                    x1={from.x + fo.x}
                    y1={from.y + fo.y}
                    x2={to.x + to2.x}
                    y2={to.y + to2.y}
                    stroke={isActive ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.06)'}
                    strokeWidth={isActive ? '0.3' : '0.2'}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                  />
                )
              })}

              {/* Nodes */}
              {nodes.map((node, i) => {
                const offset = floatOffset[node.id] || { x: 0, y: 0 }
                const isCenter = node.id === 'aoss'
                const isHovered = hoveredNode === node.id
                const r = isCenter ? 5 : 3
                return (
                  <g
                    key={node.id}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Pulse ring */}
                    <motion.circle
                      cx={node.x + offset.x}
                      cy={node.y + offset.y}
                      r={r * 2.5}
                      fill="none"
                      stroke={statusColors[node.status]}
                      strokeWidth="0.2"
                      strokeOpacity={isHovered ? 0.5 : 0.15}
                      animate={isInView ? { scale: [1, 1.2, 1], opacity: [0.15, 0.4, 0.15] } : {}}
                      transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
                      style={{ transformOrigin: `${node.x}% ${node.y}%` }}
                    />
                    <motion.circle
                      cx={node.x + offset.x}
                      cy={node.y + offset.y}
                      r={r}
                      fill={statusColors[node.status]}
                      fillOpacity={isHovered ? 1 : 0.7}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.07, type: 'spring' }}
                    />
                    <motion.text
                      x={node.x + offset.x}
                      y={node.y + offset.y + (isCenter ? 8 : 5.5)}
                      textAnchor="middle"
                      fill="rgba(200,200,200,0.7)"
                      fontSize={isCenter ? '4' : '3'}
                      fontFamily="Inter, sans-serif"
                      fontWeight={isCenter ? '900' : '600'}
                      letterSpacing="0.8"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.07 }}
                    >
                      {node.label}
                    </motion.text>
                  </g>
                )
              })}
            </svg>

            {/* Hover card */}
            {hoveredNode && hoveredNode !== 'aoss' && (
              <motion.div
                className="absolute top-4 right-4 p-4 rounded-xl max-w-[180px]"
                style={{
                  background: 'rgba(15,15,15,0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(16px)',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {(() => {
                  const node = getNode(hoveredNode)
                  return (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColors[node.status] }} />
                        <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-zinc-500">{statusLabels[node.status]}</span>
                      </div>
                      <p className="text-xs font-semibold text-white mb-1">{node.label}</p>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">{node.description}</p>
                    </>
                  )
                })()}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
