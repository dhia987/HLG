import { motion } from 'motion/react'
import { EASE, inView } from '../../lib/motion'
import { Unveil } from '../ui/Reveal'
import { formatPrice, type Property } from '../../data/properties'
import { useProperty } from './PropertyOverlay'

export function PropertyMeta({ p, className = '' }: { p: Property; className?: string }) {
  const items = [
    { v: p.beds, l: p.beds === 1 ? 'Bed' : 'Beds' },
    { v: p.baths, l: p.baths === 1 ? 'Bath' : 'Baths' },
    { v: p.area.toLocaleString('en-US'), l: 'Sq Ft' },
  ]
  return (
    <ul className={`flex items-center gap-5 ${className}`}>
      {items.map((it, i) => (
        <li key={it.l} className="flex items-center gap-5">
          {i > 0 && <span className="h-1 w-1 rotate-45 bg-[#9C6625]" />}
          <span className="text-[0.72rem] uppercase tracking-[0.16em] text-[#F5F3EF]/55">
            <span className="text-[#F5F3EF]">{it.v}</span> {it.l}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function PropertyCard({
  p,
  index = 0,
  size = 'md',
  ref,
}: {
  p: Property
  index?: number
  size?: 'md' | 'lg'
  /**
   * AnimatePresence `mode="popLayout"` measures and re-positions exiting
   * children, so the ref must reach the DOM node. Without it the grid
   * collapses and every card stacks in the same place.
   */
  ref?: React.Ref<HTMLElement>
}) {
  const { open } = useProperty()

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      viewport={inView}
      transition={{ duration: 0.85, ease: EASE, delay: (index % 3) * 0.09 }}
      className="group relative min-w-0"
    >
      <button
        onClick={() => open(p.slug)}
        data-cursor="view"
        data-cursor-label="View"
        className="block w-full text-left"
        aria-label={`View ${p.title} in ${p.community}`}
      >
        <div
          className={`relative overflow-hidden bg-[#232326] ${
            size === 'lg' ? 'aspect-[4/3]' : 'aspect-[4/5]'
          }`}
        >
          <Unveil className="absolute inset-0" delay={(index % 3) * 0.09} tone="#232326">
            <img
              src={p.images[0]}
              alt={p.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
            />
          </Unveil>

          {/* darkening wash that deepens on hover - deep enough that the bronze
              community label stays legible over a bright photograph */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1C1E] from-10% via-[#1C1C1E]/50 via-45% to-transparent opacity-85 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="rounded-full bg-[#F5F3EF]/10 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[#F5F3EF] backdrop-blur-md">
              {p.listing === 'buy' ? 'For Sale' : 'For Rent'}
            </span>
            {p.status !== 'Ready' && (
              <span className="rounded-full bg-[#9C6625] px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[#F5F3EF]">
                {p.status}
              </span>
            )}
          </div>

          {/* slide-up detail plate */}
          <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-[transform,opacity] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <PropertyMeta p={p} />
          </div>
        </div>

        {/* Title gets the full column width and up to two lines - squeezing it
            beside the price truncated almost every real listing name. */}
        <div className="pt-5">
          <p className="eyebrow mb-2.5 text-[#B88D5B]">{p.community}</p>
          <h3 className="display-sm line-clamp-2 transition-colors duration-500 group-hover:text-[#B88D5B]">
            {p.title}
          </h3>
          <div className="mt-3.5 flex items-baseline justify-between gap-4">
            <span className="eyebrow truncate text-[#F5F3EF]/40">{p.type}</span>
            <span className="shrink-0 text-sm font-medium tracking-tight text-[#F5F3EF]/85">
              {formatPrice(p)}
            </span>
          </div>
        </div>

        <div className="mt-5 h-px w-full bg-[#F5F3EF]/12">
          <div className="h-full w-full origin-left scale-x-0 bg-[#9C6625] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
        </div>
      </button>
    </motion.article>
  )
}
