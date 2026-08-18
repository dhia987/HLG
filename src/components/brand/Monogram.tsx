import { motion } from 'motion/react'
import type { ComponentProps } from 'react'

type Variant = 'black' | 'white' | 'gray'

const INK: Record<Variant, string> = {
  black: '#1C1C1E',
  white: '#F5F3EF',
  gray: '#1C1C1E',
}
const ROOF: Record<Variant, string> = {
  black: '#9C6625',
  white: '#9C6625',
  gray: '#6C6C6C',
}
const ROOF_SOFT: Record<Variant, string> = {
  black: '#B88D5B',
  white: '#B88D5B',
  gray: '#BCBCBC',
}

type Props = {
  variant?: Variant
  className?: string
  /** Animate the mark in from its constituent parts (used by the preloader). */
  animated?: boolean
  title?: string
}

/**
 * HLG monogram, reproduced exactly from `HLG_icon *.svg`.
 * Colours are locked to the three approved variants - the guideline forbids
 * recolouring or mixing colours within the mark (p.06).
 */
export function Monogram({ variant = 'black', className, animated = false, title }: Props) {
  const M = motion.path
  type PathMotionProps = ComponentProps<typeof motion.path>
  const anim = (p: PathMotionProps): PathMotionProps => (animated ? p : {})

  return (
    <svg
      viewBox="0 0 368 368"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* cross-bar of the H */}
      <M
        d="M243.774 223.843H124.187C121.647 223.843 119.587 225.902 119.587 228.442V256.039C119.587 258.58 121.647 260.639 124.187 260.639H243.774C246.315 260.639 248.374 258.58 248.374 256.039V228.442C248.374 225.902 246.315 223.843 243.774 223.843Z"
        fill={INK[variant]}
        {...anim({
          initial: { scaleX: 0, opacity: 0 },
          animate: { scaleX: 1, opacity: 1 },
          transition: { duration: 0.7, delay: 0.62, ease: [0.22, 1, 0.36, 1] },
          style: { transformOrigin: '184px 242px' },
        })}
      />
      {/* roof - bronze */}
      <M
        d="M268.06 121.221C278.721 131.881 278.721 149.165 268.06 159.826C257.399 170.486 240.115 170.486 229.455 159.826L183.98 114.351L138.506 159.826C127.845 170.486 110.561 170.486 99.9007 159.826C89.2401 149.165 89.2401 131.881 99.9007 121.221L183.98 37.1406L268.06 121.221Z"
        fill={ROOF[variant]}
        {...anim({
          initial: { y: -46, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
        })}
      />
      {/* roof highlight - soft bronze */}
      <M
        d="M268.06 159.826C278.72 149.165 278.72 131.881 268.06 121.221L183.98 37.1406L127.706 93.415C157.465 76.8571 183.98 113.889 183.98 113.889L229.454 159.826C240.115 170.486 257.399 170.486 268.06 159.826Z"
        fill={ROOF_SOFT[variant]}
        {...anim({
          initial: { y: -46, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] },
        })}
      />
      {/* left pillar */}
      <M
        d="M146.167 278.769C146.167 293.753 134.02 305.9 119.036 305.9C104.052 305.9 91.9055 293.753 91.9055 278.769L91.9055 205.177C91.9055 190.193 104.052 178.046 119.036 178.046C134.02 178.046 146.167 190.193 146.167 205.177L146.167 278.769Z"
        fill={INK[variant]}
        {...anim({
          initial: { scaleY: 0, opacity: 0 },
          animate: { scaleY: 1, opacity: 1 },
          transition: { duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] },
          style: { transformOrigin: '119px 306px' },
        })}
      />
      {/* right pillar */}
      <M
        d="M276.395 278.769C276.395 293.753 264.248 305.9 249.264 305.9C234.28 305.9 222.133 293.753 222.133 278.769L222.133 205.177C222.133 190.193 234.28 178.046 249.264 178.046C264.248 178.046 276.395 190.193 276.395 205.177L276.395 278.769Z"
        fill={INK[variant]}
        {...anim({
          initial: { scaleY: 0, opacity: 0 },
          animate: { scaleY: 1, opacity: 1 },
          transition: { duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
          style: { transformOrigin: '249px 306px' },
        })}
      />
    </svg>
  )
}

const ROOF_PATH =
  'M268.06 121.221C278.721 131.881 278.721 149.165 268.06 159.826C257.399 170.486 240.115 170.486 229.455 159.826L183.98 114.351L138.506 159.826C127.845 170.486 110.561 170.486 99.9007 159.826C89.2401 149.165 89.2401 131.881 99.9007 121.221L183.98 37.1406L268.06 121.221Z'

/**
 * The upper part of the monogram - the roof - cropped tight to its own bounds.
 *
 * The guideline (p.10) allows this shape to be reused as a standalone graphic
 * element, as an outline. That is exactly what it is here: the same path as the
 * logo, stroked rather than filled, so it stays legible over photography, over
 * the bronze buttons and over the off-white panels alike.
 */
export function RoofOutline({
  className,
  stroke = '#F5F3EF',
  width = 13,
}: {
  className?: string
  stroke?: string
  /** Stroke weight in viewBox units (the box is 192 wide). */
  width?: number
}) {
  return (
    <svg
      viewBox="80 25 208 157"
      className={className}
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={ROOF_PATH}
        stroke={stroke}
        strokeWidth={width}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** The bronze diamond used as a separator in the wordmark (H.L.G). */
export function Diamond({ className, size = 8 }: { className?: string; size?: number }) {
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        background: 'currentColor',
        transform: 'rotate(45deg)',
      }}
    />
  )
}
