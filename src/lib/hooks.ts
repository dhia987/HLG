import { useEffect, useState } from 'react'

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True only on devices that can genuinely hover (so we never fake it on touch). */
export const useHasPointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/** Locks page scroll (used by the menu overlay). Cooperates with Lenis. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    const root = document.documentElement
    if (locked) root.classList.add('lenis-stopped')
    else root.classList.remove('lenis-stopped')
    return () => root.classList.remove('lenis-stopped')
  }, [locked])
}
