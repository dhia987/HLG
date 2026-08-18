import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { Unveil } from './Reveal'
import { useReducedMotion } from '../../lib/hooks'

/**
 * An image that drifts against the scroll inside a fixed frame, and unveils
 * from behind a travelling panel the first time it enters view.
 * The image is over-scaled so the drift never exposes an edge.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  strength = 14,
  scale = 1.18,
  reveal = true,
  priority = false,
  children,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  /** Drift distance as a percentage of the frame height. */
  strength?: number
  scale?: number
  reveal?: boolean
  priority?: boolean
  children?: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const raw = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 })

  const frame = (
    <>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={reduced ? undefined : { y, scale }}
        className={`h-full w-full object-cover ${imgClassName ?? ''}`}
        draggable={false}
      />
      {children}
    </>
  )

  if (!reveal) {
    return (
      <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
        {frame}
      </div>
    )
  }

  return (
    <div ref={ref} className={className}>
      <Unveil className="h-full w-full" duration={1.3}>
        {frame}
      </Unveil>
    </div>
  )
}

/** Generic scroll-linked translation for any content (captions, marks, cards). */
export function Drift({
  children,
  className,
  distance = 80,
  damping = 34,
}: {
  children: ReactNode
  className?: string
  distance?: number
  damping?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const y = useSpring(raw, { stiffness: 110, damping, mass: 0.4 })

  return (
    <motion.div ref={ref} className={className} style={reduced ? undefined : { y }}>
      {children}
    </motion.div>
  )
}
