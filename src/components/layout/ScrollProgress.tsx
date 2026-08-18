import { motion, useScroll, useSpring } from 'motion/react'

/** Hairline bronze reading-progress rule pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.3 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[7600] h-[2px] origin-left bg-gradient-to-r from-[#9C6625] to-[#B88D5B]"
      style={{ scaleX }}
    />
  )
}
