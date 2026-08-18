import { motion, useAnimationFrame, useMotionValue, useScroll, useVelocity } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { useReducedMotion } from '../../lib/hooks'

/**
 * Continuously scrolling band whose speed is nudged by scroll velocity, so the
 * type accelerates as the page moves and settles when it stops. Two identical
 * tracks are rendered and wrapped modulo one track width for a seamless loop.
 */
export function Marquee({
  children,
  baseSpeed = 40,
  direction = -1,
  className,
  itemClassName,
  repeat = 4,
}: {
  children: ReactNode
  /** Pixels per second at rest. */
  baseSpeed?: number
  direction?: 1 | -1
  className?: string
  itemClassName?: string
  repeat?: number
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const reduced = useReducedMotion()

  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    const track = trackRef.current
    if (!track) return
    const width = track.offsetWidth / 2
    if (!width) return

    const boost = Math.min(Math.abs(velocity.get()) / 900, 3)
    const move = ((baseSpeed * (1 + boost)) / 1000) * delta * direction

    let next = x.get() + move
    if (next <= -width) next += width
    if (next >= 0) next -= width
    x.set(next)
  })

  const items = Array.from({ length: repeat })

  return (
    <div className={`relative w-full overflow-hidden ${className ?? ''}`}>
      <motion.div ref={trackRef} className="flex w-max flex-nowrap" style={{ x }}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex flex-nowrap" aria-hidden={dup === 1}>
            {items.map((_, i) => (
              <div key={i} className={`flex flex-nowrap items-center ${itemClassName ?? ''}`}>
                {children}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
