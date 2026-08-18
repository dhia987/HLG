import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useHasPointer, useReducedMotion } from '../../lib/hooks'
import { RoofOutline } from '../brand/Monogram'

type Mode = 'default' | 'link' | 'view' | 'drag' | 'hidden'

/**
 * The pointer is the monogram's roof.
 *
 * Three layers, all driven by the same coordinates: the roof mark itself sits
 * exactly under the pointer, a spring-lagged ring trails behind it, and a
 * bronze disc takes over to carry a label on media. The roof banks a few
 * degrees into the direction of travel, which reads as weight rather than as
 * an effect - it settles level the moment the pointer stops.
 *
 * Elements opt into a state with `data-cursor="link | view | drag | hidden"`
 * and an optional `data-cursor-label`, so no component needs to know the
 * cursor exists.
 */
export function Cursor() {
  const hasPointer = useHasPointer()
  const reduced = useReducedMotion()
  const enabled = hasPointer && !reduced

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.6 })

  // Horizontal velocity -> bank angle.
  const lean = useMotionValue(0)
  const tilt = useSpring(lean, { stiffness: 180, damping: 18, mass: 0.4 })
  const rotate = useTransform(tilt, (v) => `${v}deg`)
  const lastX = useRef(0)
  const settle = useRef(0)

  const [mode, setMode] = useState<Mode>('default')
  const [label, setLabel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-custom-cursor')
    return () => document.documentElement.classList.remove('has-custom-cursor')
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)

      const dx = e.clientX - lastX.current
      lastX.current = e.clientX
      lean.set(Math.max(-14, Math.min(14, dx * 0.7)))
      window.clearTimeout(settle.current)
      settle.current = window.setTimeout(() => lean.set(0), 90)

      const target = (e.target as HTMLElement)?.closest?.(
        '[data-cursor], a, button, input, textarea, select',
      ) as HTMLElement | null

      if (!target) {
        setMode('default')
        setLabel(null)
        return
      }

      const declared = target.getAttribute('data-cursor') as Mode | null
      setLabel(target.getAttribute('data-cursor-label'))
      setMode(declared ?? 'link')
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.clearTimeout(settle.current)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [enabled, visible, x, y, lean])

  if (!enabled) return null

  const showLabel = Boolean(label) && (mode === 'view' || mode === 'drag')
  const shown = visible && mode !== 'hidden'
  const ringSize = showLabel ? 92 : mode === 'link' ? 54 : 30

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* trailing ring - becomes the bronze disc that carries a label */}
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: shown ? 1 : 0,
          backgroundColor: showLabel ? '#9C6625' : 'rgba(184,141,91,0)',
          // No ring at rest - the bare roof is the pointer. The ring is the
          // affordance that says "this is interactive".
          borderColor: showLabel
            ? 'rgba(156,102,37,0)'
            : mode === 'link'
              ? 'rgba(184,141,91,0.55)'
              : 'rgba(184,141,91,0)',
          scale: pressed ? 0.86 : 1,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.5 }}
      >
        <span className="absolute inset-0 rounded-full border border-inherit" />
        <AnimatePresence>
          {showLabel && (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28 }}
              className="text-[0.58rem] font-medium uppercase tracking-[0.22em] text-[#F5F3EF]"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* the roof itself, exactly under the pointer */}
      <motion.div
        className="absolute left-0 top-0 origin-center"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          rotate,
          // Reads over a bright photograph as well as over the anthracite.
          filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.55))',
        }}
        animate={{
          width: showLabel ? 0 : mode === 'link' ? 30 : 24,
          opacity: shown && !showLabel ? 1 : 0,
          scale: pressed ? 0.82 : 1,
        }}
        transition={{ type: 'spring', stiffness: 340, damping: 24, mass: 0.4 }}
      >
        <RoofOutline className="h-auto w-full" />
      </motion.div>
    </div>
  )
}
