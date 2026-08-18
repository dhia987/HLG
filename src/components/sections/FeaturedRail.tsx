import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { EASE, EASE_CINE, inView } from '../../lib/motion'
import { properties, shortPrice } from '../../data/properties'
import { useMediaQuery, useReducedMotion } from '../../lib/hooks'
import { PropertyMeta } from './PropertyCard'
import { useProperty } from './PropertyOverlay'
import { MaskText } from '../ui/Reveal'

const SHOWCASE = properties.slice(0, 7)

function Card({
  p,
  i,
  variant,
}: {
  p: (typeof properties)[number]
  i: number
  /**
   * 'rail' sizes from viewport height so the pinned row always fits between
   * the header and the fold; 'swipe' sizes from width for thumb scrolling.
   */
  variant: 'rail' | 'swipe'
}) {
  const { open } = useProperty()
  const rail = variant === 'rail'

  return (
    <button
      onClick={() => open(p.slug)}
      data-cursor="view"
      data-cursor-label="View"
      aria-label={`View ${p.title} in ${p.community}`}
      className={`group relative block shrink-0 text-left ${
        rail ? 'w-[max(268px,32vh)]' : 'w-[78vw] sm:w-[54vw]'
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[#232326] ${rail ? 'h-[42vh]' : 'aspect-[3/4]'}`}
      >
        <img
          src={p.images[0]}
          alt={p.title}
          loading={i < 2 ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1C1E] from-20% via-[#1C1C1E]/75 via-55% to-transparent" />

        <span className="absolute left-5 top-5 rounded-full bg-[#F5F3EF]/10 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.2em] backdrop-blur-md">
          {p.listing === 'buy' ? 'For Sale' : 'For Rent'}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="eyebrow mb-3 text-[#B88D5B]">{p.community}</p>
          <h3 className="display-sm mb-4">{p.title}</h3>
          <div className="h-px w-full origin-left scale-x-0 bg-[#9C6625] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <PropertyMeta p={p} className="pt-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Stacked rather than justified: at rail width a single row wraps into
          a mess as soon as the status string gets long. */}
      <div className="pt-4">
        <p className="eyebrow text-[#F5F3EF]/40">
          {p.type} &nbsp;/&nbsp; {p.status}
        </p>
        <p className="mt-2 text-sm font-medium tracking-tight text-[#F5F3EF]">{shortPrice(p)}</p>
      </div>
    </button>
  )
}

/**
 * The selected portfolio. On desktop the block pins and the rail travels
 * horizontally against vertical scroll; on smaller screens it degrades to a
 * native snap-scrolling row, which is what a thumb actually wants.
 */
export function FeaturedRail() {
  const section = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [viewportH, setViewportH] = useState(() =>
    typeof window === 'undefined' ? 800 : window.innerHeight,
  )
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reduced = useReducedMotion()
  const pinned = isDesktop && !reduced

  useEffect(() => {
    if (!pinned) return
    const measure = () => {
      const el = track.current
      if (!el) return
      setViewportH(window.innerHeight)
      setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 96))
    }
    measure()
    window.addEventListener('resize', measure)
    const t = window.setTimeout(measure, 600)
    return () => {
      window.removeEventListener('resize', measure)
      clearTimeout(t)
    }
  }, [pinned])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const x = useSpring(rawX, { stiffness: 130, damping: 30, mass: 0.4 })

  const header = (
    <div className="shell flex flex-col gap-6 pb-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.7, ease: EASE }}
          className="eyebrow mb-7 flex items-center gap-3 text-[#B88D5B]"
        >
          <span className="h-1.5 w-1.5 rotate-45 bg-[#9C6625]" />
          Selected portfolio
        </motion.p>
        <h2 className="display-md">
          <MaskText
            lines={['Addresses worth', <span className="text-bronze-grad">the journey.</span>]}
          />
        </h2>
      </div>
      <span className="eyebrow hidden text-[#F5F3EF]/35 xl:block">
        {pinned ? 'Scroll to travel' : 'Swipe'}
      </span>
    </div>
  )

  if (!pinned) {
    return (
      <div className="border-b hairline section-y">
        {header}
        <div
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(1.25rem,5vw,5.5rem)] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          data-cursor="drag"
          data-cursor-label="Drag"
        >
          {SHOWCASE.map((p, i) => (
            <div key={p.id} className="snap-start">
              <Card p={p} i={i} variant="swipe" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={section}
      className="relative border-b hairline"
      // Enough scroll length for the rail to travel its full width, plus a
      // little head and tail so the first and last card are read at rest.
      style={{ height: `${Math.max(180, (distance / viewportH) * 100 + 120)}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pb-10 pt-24">
        {header}
        <motion.div
          ref={track}
          className="flex w-max gap-6 pl-[clamp(1.25rem,5vw,5.5rem)] pr-24"
          style={{ x }}
        >
          {SHOWCASE.map((p, i) => (
            <Card key={p.id} p={p} i={i} variant="rail" />
          ))}

          {/* end plate */}
          <div className="flex w-[min(26vw,340px)] shrink-0 flex-col justify-center border-l hairline pl-10">
            <motion.p
              className="display-md max-w-[9ch]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE_CINE }}
            >
              And <span className="text-bronze-grad">five more</span> below.
            </motion.p>
            <span className="eyebrow mt-8 text-[#F5F3EF]/40">Keep scrolling</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
