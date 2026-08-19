import { AnimatePresence, motion, animate } from 'motion/react'
import { useEffect, useState } from 'react'
import { Monogram } from '../brand/Monogram'
import { EASE, EASE_CINE } from '../../lib/motion'
import { site } from '../../data/site'

const SESSION_KEY = 'hlg:intro-played'

/**
 * First-visit overture: the monogram assembles from its own parts, a counter
 * runs to 100, then the anthracite field lifts away in four columns to hand
 * over to the hero. Plays once per browser session.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const alreadyPlayed =
    typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === '1'

  const [open, setOpen] = useState(!alreadyPlayed)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (alreadyPlayed) {
      onDone()
      return
    }

    const controls = animate(0, 100, {
      duration: 2.1,
      ease: [0.5, 0, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, '1')
        window.setTimeout(() => {
          setOpen(false)
          window.setTimeout(onDone, 420)
        }, 340)
      },
    })
    return () => controls.stop()
  }, [alreadyPlayed, onDone])

  const columns = 4

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9000] flex items-center justify-center"
          exit={{ transition: { duration: 0 } }}
        >
          {/* the field itself, split into columns that lift in sequence */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: columns }).map((_, i) => (
              <motion.div
                key={i}
                className="h-full flex-1 bg-[#1C1C1E]"
                initial={{ y: '0%' }}
                exit={{ y: '-101%' }}
                transition={{
                  duration: 1.05,
                  ease: EASE_CINE,
                  delay: i * 0.07,
                }}
              />
            ))}
          </div>

          <motion.div
            className="relative flex flex-col items-center gap-8"
            exit={{ opacity: 0, y: -24, transition: { duration: 0.45, ease: EASE } }}
          >
            <Monogram variant="white" animated className="h-24 w-24 md:h-32 md:w-32" />

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
                className="eyebrow text-[#B88D5B]"
              >
                {site.tagline}
              </motion.p>
            </div>
          </motion.div>

          {/* counter, bottom right */}
          <motion.div
            className="absolute bottom-8 right-6 md:bottom-12 md:right-12"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <span className="brand-type text-5xl font-light tabular-nums text-[#F5F3EF]/70 md:text-7xl">
              {String(count).padStart(3, '0')}
            </span>
          </motion.div>

          {/* progress hairline */}
          <div className="absolute bottom-0 left-0 h-px w-full bg-[#F5F3EF]/10">
            <motion.div
              className="h-full bg-[#9C6625]"
              style={{ width: `${count}%` }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
