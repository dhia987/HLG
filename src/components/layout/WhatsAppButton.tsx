import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { EASE } from '../../lib/motion'
import { site } from '../../data/site'
import { SocialIcon } from './SocialIcons'

/**
 * Floating WhatsApp action. It is how most Dubai enquiries actually start, so
 * it stays reachable at any scroll depth — but it is held back until the hero
 * has been passed, so the first screen belongs to the brand rather than to a
 * button.
 */
export function WhatsAppButton() {
  const { scrollY } = useScroll()
  const [shown, setShown] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setShown(y > 520))

  return (
    <motion.a
      href={site.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label={`Message ${site.name} on WhatsApp`}
      data-cursor="link"
      className="group fixed bottom-6 right-6 z-[7200] flex items-center gap-3 rounded-full border border-[#9C6625] bg-[#9C6625] py-3.5 pl-4 pr-4 text-[#F5F3EF] shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:bottom-8 md:right-8"
      initial={false}
      animate={{
        opacity: shown ? 1 : 0,
        y: shown ? 0 : 24,
        pointerEvents: shown ? 'auto' : 'none',
      }}
      transition={{ duration: 0.5, ease: EASE }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      <SocialIcon label="WhatsApp" className="h-5 w-5 shrink-0" />
      {/* The label opens on hover so the resting state stays a quiet disc. */}
      <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-cols-[1fr] max-md:hidden">
        <span className="overflow-hidden">
          <span className="block whitespace-nowrap pr-1 text-[0.68rem] font-medium uppercase tracking-[0.18em]">
            Chat with us
          </span>
        </span>
      </span>
    </motion.a>
  )
}
