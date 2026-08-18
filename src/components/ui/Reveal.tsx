import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE, EASE_CINE, inView, riseIn } from '../../lib/motion'

/**
 * Cinematic image reveal: an opaque panel covering the frame slides away.
 *
 * The obvious implementation - animating `clip-path` on the image or its
 * wrapper - is a trap. Chrome factors ancestor clipping into intersection
 * calculations, so a fully clipped image is treated as invisible: native
 * lazy-loading never fetches it, and any nested `whileInView` never fires.
 * A photograph scrolled past quickly would simply stay blank. Moving the
 * occlusion to a sibling panel keeps the image itself unclipped and normal.
 */
export function Unveil({
  children,
  className,
  delay = 0,
  duration = 1.15,
  /** Panel colour - match the surface the image sits on. */
  tone = '#1C1C1E',
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  tone?: string
}) {
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 block"
        style={{ background: tone }}
        initial={{ y: '0%' }}
        whileInView={{ y: '100%' }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{ duration, ease: EASE_CINE, delay }}
      />
    </div>
  )
}

/** Fade + lift on entry. The default reveal for blocks of content. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}) {
  const Cmp = motion[as]
  return (
    <Cmp
      className={className}
      variants={riseIn}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={inView}
    >
      {children}
    </Cmp>
  )
}

/**
 * IMPORTANT: the scroll trigger must live on an UNCLIPPED wrapper.
 *
 * A masked line sits at translateY(110%) inside an `overflow: hidden` box, so
 * it is entirely clipped away - and IntersectionObserver takes ancestor
 * clipping into account. Putting `whileInView` on the moving span therefore
 * deadlocks: it can never be observed as visible, so it never animates in.
 * The wrapper below is never clipped, so it triggers reliably and drives the
 * lines through variants.
 */
const lineVariants = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: '0%',
    transition: { duration: 1, ease: EASE, delay: i },
  }),
}

/**
 * Line-by-line masked text - each line is clipped by its own overflow box and
 * slides up from beneath, the "curtain" reveal that makes editorial headlines
 * feel typeset rather than animated.
 */
export function MaskText({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  once = true,
}: {
  lines: (string | ReactNode)[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
  once?: boolean
}) {
  return (
    <motion.span
      className={className}
      style={{ display: 'block' }}
      initial="hidden"
      whileInView="show"
      viewport={{ ...inView, once }}
    >
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <motion.span
            style={{ display: 'block', willChange: 'transform' }}
            className={lineClassName}
            variants={lineVariants}
            custom={delay + i * stagger}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/**
 * Word-level masked reveal - more kinetic, used on hero headlines.
 * `wordClassName` lands on the element that directly wraps the text, which is
 * what gradient (background-clip: text) treatments need in order to paint.
 */
export function MaskWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
  playOnMount = false,
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  playOnMount?: boolean
}) {
  const words = text.split(' ')

  const trigger = playOnMount
    ? ({ initial: 'hidden', animate: 'show' } as const)
    : ({ initial: 'hidden', whileInView: 'show', viewport: inView } as const)

  return (
    <motion.span className={className} style={{ display: 'inline' }} {...trigger}>
      {words.map((w, i) => (
        <span
          key={i}
          className="line-mask"
          style={{ display: 'inline-block', verticalAlign: 'bottom' }}
        >
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            className={wordClassName}
            variants={lineVariants}
            custom={delay + i * stagger}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
