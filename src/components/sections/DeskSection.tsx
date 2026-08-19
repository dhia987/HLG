import { motion } from 'motion/react'
import { EASE, inView } from '../../lib/motion'
import type { Service } from '../../data/services'
import { useSearch } from '../../lib/SearchContext'
import { useSectionNav } from '../../lib/useSectionNav'
import { ParallaxImage } from '../ui/Parallax'
import { MaskText } from '../ui/Reveal'
import { CTA } from '../ui/Button'

/**
 * One service: Buy, Sell or Rent. Each is its own section with its own anchor,
 * so they are three destinations in the navigation rather than three tabs.
 * Filtering lives in one place - the portfolio's filter rail - rather than
 * being repeated on every desk.
 */
export function DeskSection({
  service,
  flip = false,
}: {
  service: Service
  /** Alternates the image side so the three do not read as one list. */
  flip?: boolean
}) {
  const { goTo } = useSectionNav()
  const { setContactIntent } = useSearch()

  const onAction = () => {
    if (service.id === 'sell') {
      setContactIntent('Sell')
      goTo('contact')
    } else {
      goTo('properties')
    }
  }

  return (
    <section id={service.id} className="scroll-mt-28 border-b hairline section-y">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className={flip ? 'lg:order-2' : ''}>
          <ParallaxImage
            src={service.image}
            alt={service.title}
            className="aspect-[4/3] w-full"
            strength={9}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1C1E]/60 to-transparent" />
          </ParallaxImage>
        </div>

        <div className={flip ? 'lg:order-1' : ''}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-7 flex items-center gap-4"
          >
            <span className="eyebrow text-[#9C6625]">{service.index}</span>
            <span className="h-px w-12 bg-[#9C6625]/40" />
            <span className="eyebrow text-[#F5F3EF]/40">{service.short}</span>
          </motion.div>

          <h2 className="display-lg mb-7">
            <MaskText lines={[service.title]} />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
            className="body-lg mb-9 max-w-xl text-[#F5F3EF]/60"
          >
            {service.body}
          </motion.p>

          <ul className="mb-10 grid gap-px overflow-hidden border hairline sm:grid-cols-2">
            {service.points.map((pt, i) => (
              <motion.li
                key={pt}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={inView}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.07 }}
                className="group flex items-center gap-3 bg-[#1C1C1E] px-5 py-4 transition-colors duration-500 hover:bg-[#232326]"
              >
                <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#9C6625] transition-transform duration-500 group-hover:scale-150" />
                <span className="text-[0.82rem] font-light text-[#F5F3EF]/75">{pt}</span>
              </motion.li>
            ))}
          </ul>

          <CTA onClick={onAction} tone="ghost">
            {service.action}
          </CTA>
        </div>
      </div>
    </section>
  )
}
