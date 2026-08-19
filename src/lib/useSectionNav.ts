import { useCallback, useEffect, useState } from 'react'
import { nav } from '../data/site'
import { useSmoothScroll } from './SmoothScroll'

/** Height of the fixed header, so anchored sections land clear of it. */
export const HEADER_OFFSET = -96

/**
 * Scroll-spy + anchored navigation for the single-page layout.
 *
 * The active section is the last one whose top has passed the reading line
 * (a third of the way down the viewport). That is more stable than an
 * intersection ratio, which flickers between two tall neighbouring sections.
 */
export function useSectionNav() {
  const { scrollTo } = useSmoothScroll()
  const [active, setActive] = useState<string>(nav[0].id)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const line = window.innerHeight * 0.34
      let current: string = nav[0].id

      for (const item of nav) {
        const el = document.getElementById(item.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= line) current = item.id
      }

      // The last section can be too short to ever reach the reading line.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120
      if (atBottom) current = nav[nav.length - 1].id

      setActive((prev) => (prev === current ? prev : current))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const goTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id)
      if (!el) return
      scrollTo(el, id === nav[0].id ? 0 : HEADER_OFFSET)
      // Keep the address bar in step without triggering a scroll jump.
      window.history.replaceState(null, '', id === nav[0].id ? '/' : `#${id}`)
    },
    [scrollTo],
  )

  return { active, goTo }
}
