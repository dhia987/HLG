import { motion, useMotionValue, useSpring } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { useHasPointer } from '../../lib/hooks'

/**
 * Pulls its child gently toward the pointer while hovered, then springs home.
 * Used sparingly - buttons, the menu trigger, the scroll cue - so it reads as
 * craft rather than novelty.
 */
export function Magnetic({
  children,
  className,
  strength = 0.32,
  radius = 1,
}: {
  children: ReactNode
  className?: string
  strength?: number
  /** Multiplier on the element bounds that counts as "near". */
  radius?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const hasPointer = useHasPointer()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.35 })

  if (!hasPointer) return <div className={className}>{children}</div>

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    x.set(dx * strength * radius)
    y.set(dy * strength * radius)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  )
}
