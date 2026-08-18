import type { Transition, Variants } from 'motion/react'

/**
 * One motion vocabulary for the whole site.
 * Everything eases on the same curve family so the experience reads as a
 * single continuous system rather than a collection of effects.
 */

/** Primary brand easing - a decisive, expensive-feeling settle. */
export const EASE = [0.22, 1, 0.36, 1] as const
/** Cinematic in-out, used for curtains, wipes and image scale. */
export const EASE_CINE = [0.65, 0, 0.35, 1] as const
/** Soft overshoot for small interactive parts. */
export const EASE_SOFT = [0.16, 1, 0.3, 1] as const

export const T = {
  fast: { duration: 0.4, ease: EASE } as Transition,
  base: { duration: 0.7, ease: EASE } as Transition,
  slow: { duration: 1.1, ease: EASE } as Transition,
  cine: { duration: 1.2, ease: EASE_CINE } as Transition,
}

/** Text that rises out of an overflow-hidden mask. */
export const maskUp: Variants = {
  hidden: { y: '110%' },
  show: (i: number = 0) => ({
    y: '0%',
    transition: { duration: 0.95, ease: EASE, delay: 0.06 * i },
  }),
}

/** Generic fade + lift, the workhorse reveal. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE, delay: 0.07 * i },
  }),
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, ease: EASE, delay: 0.07 * i },
  }),
}

/** Image that unveils behind a travelling clip edge. */
export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.25, ease: EASE_CINE },
  },
}

/** Container that hands a stagger index down to `custom` children. */
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

/** Default viewport config - fires once, slightly before the element lands. */
export const inView = { once: true, margin: '-12% 0px -12% 0px' } as const
