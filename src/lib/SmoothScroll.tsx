import Lenis from 'lenis'
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'
import { useReducedMotion } from './hooks'

type Ctx = {
  lenis: Lenis | null
  stop: () => void
  start: () => void
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void
}

const SmoothScrollContext = createContext<Ctx>({
  lenis: null,
  stop: () => {},
  start: () => {},
  scrollTo: () => {},
})

export const useSmoothScroll = () => useContext(SmoothScrollContext)

/**
 * Global inertial scrolling. Everything scroll-linked on the site reads from
 * this single Lenis instance, which is what keeps parallax, progress bars and
 * pinned sections perfectly in step with each other.
 */
export function SmoothScroll({ children }: PropsWithChildren) {
  const lenisRef = useRef<Lenis | null>(null)
  const [, setReady] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.09,
    })

    lenisRef.current = lenis
    setReady(true)

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  const value: Ctx = {
    lenis: lenisRef.current,
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
    scrollTo: (target, offset = 0) => {
      const l = lenisRef.current
      if (l) l.scrollTo(target, { offset, duration: 1.4 })
      else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' })
      else {
        const el = typeof target === 'string' ? document.querySelector(target) : target
        el?.scrollIntoView({ behavior: 'smooth' })
      }
    },
  }

  return (
    <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
  )
}
