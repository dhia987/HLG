import { AnimatePresence, motion } from 'motion/react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { EASE, EASE_CINE, inView } from '../../lib/motion'
import { useScrollLock } from '../../lib/hooks'
import { formatPrice, properties } from '../../data/properties'
import { site } from '../../data/site'
import { CTA } from '../ui/Button'
import { Monogram } from '../brand/Monogram'

type Ctx = { open: (slug: string) => void; close: () => void; openSlug: string | null }

const PropertyContext = createContext<Ctx>({ open: () => {}, close: () => {}, openSlug: null })

/** Lets any card anywhere on the page open the detail panel. */
export const useProperty = () => useContext(PropertyContext)

export function PropertyProvider({ children }: PropsWithChildren) {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  const open = useCallback((slug: string) => {
    setOpenSlug(slug)
    window.history.replaceState(null, '', `#property/${slug}`)
  }, [])

  const close = useCallback(() => {
    setOpenSlug(null)
    window.history.replaceState(null, '', '#properties')
  }, [])

  // Deep link support: /#property/palm-signature-villa opens straight into it.
  useEffect(() => {
    const match = /^#property\/(.+)$/.exec(window.location.hash)
    if (match && properties.some((p) => p.slug === match[1])) setOpenSlug(match[1])
  }, [])

  const value = useMemo(() => ({ open, close, openSlug }), [open, close, openSlug])

  return (
    <PropertyContext.Provider value={value}>
      {children}
      <PropertyPanel slug={openSlug} onClose={close} />
    </PropertyContext.Provider>
  )
}

/**
 * Full-screen detail panel. On a single-page site this replaces what would
 * otherwise be a separate route - the page underneath keeps its scroll
 * position, so closing returns you exactly where you were in the portfolio.
 */
function PropertyPanel({ slug, onClose }: { slug: string | null; onClose: () => void }) {
  const p = properties.find((x) => x.slug === slug) ?? null
  const [frame, setFrame] = useState(0)
  useScrollLock(Boolean(p))

  useEffect(() => {
    setFrame(0)
  }, [slug])

  useEffect(() => {
    if (!p) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [p, onClose])

  const specs = p
    ? [
        { l: 'Bedrooms', v: String(p.beds) },
        { l: 'Bathrooms', v: String(p.baths) },
        { l: 'Built area', v: `${p.area.toLocaleString('en-US')} sq ft` },
        { l: 'Type', v: p.type },
        { l: 'Status', v: p.status },
        {
          l: p.handover ? 'Handover' : 'Listing',
          v: p.handover ?? (p.listing === 'buy' ? 'For sale' : 'For rent'),
        },
      ]
    : []

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          className="fixed inset-0 z-[8500] overflow-y-auto overscroll-contain bg-[#1C1C1E]"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.85, ease: EASE_CINE }}
          role="dialog"
          aria-modal="true"
          aria-label={`${p.title}, ${p.community}`}
        >
          {/* close bar */}
          <div className="glass sticky top-0 z-30 border-b hairline">
            <div className="shell flex items-center justify-between gap-6 py-4">
              <div className="flex min-w-0 items-center gap-4">
                <Monogram variant="white" className="h-6 w-6 shrink-0" />
                <span className="eyebrow truncate text-[#B88D5B]">{p.community}</span>
              </div>
              <button
                onClick={onClose}
                data-cursor="link"
                className="group flex h-11 shrink-0 items-center gap-3 rounded-full border hairline px-5 transition-colors duration-500 hover:border-[#9C6625]"
              >
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute h-px w-4 rotate-45 bg-[#F5F3EF]" />
                  <span className="absolute h-px w-4 -rotate-45 bg-[#F5F3EF]" />
                </span>
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em]">
                  Close
                </span>
              </button>
            </div>
          </div>

          {/* gallery masthead */}
          <header className="relative flex min-h-[72vh] flex-col justify-end overflow-hidden pt-24">
            <AnimatePresence initial={false}>
              <motion.img
                key={frame}
                src={p.images[frame]}
                alt={`${p.title}, image ${frame + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 1, ease: EASE_CINE },
                  scale: { duration: 2.4, ease: EASE_CINE },
                }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/45 to-[#1C1C1E]/45" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1E]/75 via-transparent to-transparent" />

            <div className="shell relative pb-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
                className="mb-7 flex flex-wrap items-center gap-4"
              >
                <span className="rounded-full bg-[#F5F3EF]/10 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.2em] backdrop-blur-md">
                  {p.listing === 'buy' ? 'For Sale' : 'For Rent'}
                </span>
                {p.status !== 'Ready' && (
                  <span className="rounded-full bg-[#9C6625] px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.2em]">
                    {p.status}
                  </span>
                )}
              </motion.div>

              <h2 className="display-lg max-w-[16ch]">
                <span className="line-mask">
                  <motion.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
                  >
                    {p.title}
                  </motion.span>
                </span>
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
                className="body-lg mt-6 max-w-xl text-[#F5F3EF]/70"
              >
                {p.tagline}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
              className="shell relative flex items-center justify-between gap-6 border-t hairline py-5"
            >
              <div className="flex gap-3">
                {p.images.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setFrame(i)}
                    data-cursor="view"
                    data-cursor-label="Show"
                    aria-label={`Show image ${i + 1}`}
                    className={`relative h-14 w-20 overflow-hidden transition-opacity duration-500 md:h-16 md:w-24 ${
                      i === frame ? 'opacity-100' : 'opacity-45 hover:opacity-80'
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                    {i === frame && (
                      <motion.span
                        layoutId="panel-thumb"
                        className="absolute inset-0 border-2 border-[#9C6625]"
                      />
                    )}
                  </button>
                ))}
              </div>
              <p className="hidden whitespace-nowrap text-right text-lg font-medium tracking-tight sm:block">
                {formatPrice(p)}
              </p>
            </motion.div>
          </header>

          {/* body */}
          <div className="section-y">
            <div className="shell grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
              <div>
                <p className="eyebrow mb-7 flex items-center gap-3 text-[#B88D5B]">
                  <span className="h-1.5 w-1.5 rotate-45 bg-[#9C6625]" />
                  At a glance
                </p>

                <dl className="grid grid-cols-2 gap-px overflow-hidden border hairline sm:grid-cols-3">
                  {specs.map((s, i) => (
                    <motion.div
                      key={s.l}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={inView}
                      transition={{ duration: 0.6, delay: i * 0.06 }}
                      className="bg-[#1C1C1E] p-6 transition-colors duration-500 hover:bg-[#232326]"
                    >
                      <dt className="eyebrow mb-3 text-[#F5F3EF]/40">{s.l}</dt>
                      <dd className="display-sm">{s.v}</dd>
                    </motion.div>
                  ))}
                </dl>

                <p className="body-lg mt-14 text-[#F5F3EF]/70">{p.description}</p>

                <div className="mt-14">
                  <p className="eyebrow mb-7 flex items-center gap-3 text-[#B88D5B]">
                    <span className="h-1.5 w-1.5 rotate-45 bg-[#9C6625]" />
                    Features
                  </p>
                  <ul className="grid gap-px overflow-hidden border hairline sm:grid-cols-2">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="group flex items-center gap-3 bg-[#1C1C1E] px-6 py-5 transition-colors duration-500 hover:bg-[#232326]"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#9C6625] transition-transform duration-500 group-hover:scale-150" />
                        <span className="body-base text-[#F5F3EF]/75">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="border hairline bg-[#131315] p-8 md:p-10">
                  <p className="eyebrow mb-4 text-[#B88D5B]">
                    {p.listing === 'buy' ? 'Asking' : 'Rent'}
                  </p>
                  <p className="display-sm mb-2 whitespace-nowrap text-bronze-grad">
                    {formatPrice(p)}
                  </p>
                  <p className="body-base mb-8 text-[#F5F3EF]/45">
                    {p.listing === 'rent'
                      ? 'Excluding agency and municipality fees.'
                      : 'Excluding DLD transfer and agency fees.'}
                  </p>

                  <div className="mb-8 space-y-3 border-y hairline py-7">
                    {[
                      { l: 'Reference', v: p.id.toUpperCase() },
                      { l: 'Community', v: p.community },
                      { l: 'City', v: p.city },
                    ].map((r) => (
                      <div key={r.l} className="flex items-baseline justify-between gap-4">
                        <span className="eyebrow text-[#F5F3EF]/40">{r.l}</span>
                        <span className="text-sm font-light text-[#F5F3EF]/85">{r.v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <CTA
                      href={`mailto:${site.email}?subject=${encodeURIComponent(
                        `Enquiry - ${p.title}, ${p.community}`,
                      )}`}
                      tone="bronze"
                      magnetic={false}
                      className="w-full"
                    >
                      Arrange a viewing
                    </CTA>
                    <CTA href={site.whatsappHref} tone="ghost" magnetic={false} className="w-full">
                      WhatsApp us
                    </CTA>
                  </div>

                  <p className="mt-7 text-center text-[0.72rem] font-light text-[#F5F3EF]/40">
                    Or call{' '}
                    <a href={site.phoneHref} className="link-underline text-[#F5F3EF]/70">
                      {site.phone}
                    </a>
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
