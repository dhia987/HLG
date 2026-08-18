import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useRef, useState } from 'react'
import { EASE, EASE_CINE, inView } from '../../lib/motion'
import { services } from '../../data/services'
import { useHasPointer } from '../../lib/hooks'
import { useSectionNav } from '../../lib/useSectionNav'
import { SectionHeading } from './SectionHeading'
import { CTA } from '../ui/Button'

const PROCESS = [
  { k: '01', t: 'Brief', d: 'A long first conversation. Budget, horizon, tolerance, and what the property is actually for.' },
  { k: '02', t: 'Shortlist', d: 'Six to ten options, on and off market, each with the case against it written down.' },
  { k: '03', t: 'Viewings', d: 'Grouped, unhurried, and always with the community seen at the hour you would live in it.' },
  { k: '04', t: 'Negotiate', d: 'Positioning, comparables, and a walk-away number agreed before we open.' },
  { k: '05', t: 'Transfer', d: 'DLD, NOC, financing and handover coordinated end to end. You sign, we chase.' },
  { k: '06', t: 'After', d: 'Management, tenancy, snagging and the eventual exit - the same team, years later.' },
]

/**
 * The five mandates, as one interactive index.
 *
 * Collapsed, hovering a row lifts the type and carries a preview frame under
 * the pointer. Opening a row expands its full detail inline - which is what
 * keeps five service pages inside a single scroll without burying anything.
 */
export function ServicesSection() {
  const wrap = useRef<HTMLDivElement>(null)
  const hasPointer = useHasPointer()
  const { goTo } = useSectionNav()
  const [hovered, setHovered] = useState<number | null>(null)
  const [open, setOpen] = useState<string | null>(services[0].id)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 140, damping: 22, mass: 0.5 })
  const y = useSpring(my, { stiffness: 140, damping: 22, mass: 0.5 })

  const onMove = (e: React.MouseEvent) => {
    const r = wrap.current?.getBoundingClientRect()
    if (!r) return
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  const showPreview = hasPointer && hovered !== null && services[hovered].id !== open

  return (
    <section id="services" className="relative scroll-mt-24">
      <div className="border-b hairline section-y">
        <div className="shell">
          <SectionHeading
            eyebrow="What we do"
            lines={['Five ways', <span className="text-bronze-grad">we work.</span>]}
            aside={
              <p className="body-lg text-[#F5F3EF]/60 lg:pb-3">
                Whether you are entering the market, exiting it, or simply living in it, the
                mandate is the same: fewer, better decisions. Open any one of them.
              </p>
            }
          />

          <div ref={wrap} onMouseMove={onMove} className="relative mt-16">
            {/* pointer-following preview, only while nothing under it is open */}
            {hasPointer && (
              <motion.div
                className="pointer-events-none absolute left-0 top-0 z-20 hidden h-[300px] w-[230px] -translate-x-1/2 -translate-y-1/2 overflow-hidden lg:block"
                style={{ x, y }}
              >
                <AnimatePresence>
                  {showPreview && hovered !== null && (
                    <motion.img
                      key={services[hovered].id}
                      src={services[hovered].image}
                      alt=""
                      className="h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.18, clipPath: 'inset(12% 12% 12% 12%)' }}
                      animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                      exit={{ opacity: 0, scale: 1.06, clipPath: 'inset(14% 14% 14% 14%)' }}
                      transition={{ duration: 0.65, ease: EASE_CINE }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            <ul className="border-t hairline">
              {services.map((s, i) => {
                const isOpen = open === s.id
                return (
                  <motion.li
                    key={s.id}
                    id={s.id}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={inView}
                    transition={{ duration: 0.75, ease: EASE, delay: i * 0.06 }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className="scroll-mt-32 border-b hairline"
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : s.id)}
                      data-cursor="link"
                      aria-expanded={isOpen}
                      className="group relative flex w-full items-center gap-6 py-7 text-left md:gap-12 md:py-9"
                    >
                      <span
                        className={`eyebrow w-8 shrink-0 transition-colors duration-500 ${
                          isOpen || hovered === i ? 'text-[#9C6625]' : 'text-[#F5F3EF]/30'
                        }`}
                      >
                        {s.index}
                      </span>

                      <span className="relative z-10 flex-1 overflow-hidden">
                        <span
                          className={`display-md block transition-[transform,color] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            hovered === i && !isOpen ? '-translate-y-full' : ''
                          } ${isOpen ? 'text-[#B88D5B]' : ''}`}
                        >
                          {s.title}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`display-md absolute inset-0 block text-[#B88D5B] transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            hovered === i && !isOpen ? 'translate-y-0' : 'translate-y-full'
                          }`}
                        >
                          {s.title}
                        </span>
                      </span>

                      <span className="relative z-10 hidden max-w-[16rem] text-right text-[0.78rem] font-light uppercase tracking-[0.16em] text-[#F5F3EF]/45 md:block">
                        {s.short}
                      </span>

                      {/* plus / minus */}
                      <span
                        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                          isOpen || hovered === i
                            ? 'border-[#9C6625] bg-[#9C6625]'
                            : 'border-[#F5F3EF]/15'
                        }`}
                      >
                        <span className="absolute h-px w-3.5 bg-[#F5F3EF]" />
                        <motion.span
                          className="absolute h-px w-3.5 bg-[#F5F3EF]"
                          animate={{ rotate: isOpen ? 0 : 90 }}
                          transition={{ duration: 0.45, ease: EASE }}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.7, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-10 pb-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                            <div className="relative aspect-[4/3] overflow-hidden bg-[#232326] lg:aspect-[3/4]">
                              <motion.img
                                src={s.image}
                                alt={s.title}
                                loading="lazy"
                                className="h-full w-full object-cover"
                                initial={{ scale: 1.14 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.4, ease: EASE_CINE }}
                              />
                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1C1E]/70 to-transparent" />
                            </div>

                            <div className="lg:pt-2">
                              <p className="body-lg mb-9 max-w-xl text-[#F5F3EF]/65">{s.body}</p>

                              <ul className="mb-10 grid gap-px overflow-hidden border hairline sm:grid-cols-2">
                                {s.points.map((pt, j) => (
                                  <motion.li
                                    key={pt}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.16 + j * 0.07 }}
                                    className="group/pt flex items-center gap-3 bg-[#1C1C1E] px-5 py-4"
                                  >
                                    <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#9C6625] transition-transform duration-500 group-hover/pt:scale-150" />
                                    <span className="text-[0.82rem] font-light text-[#F5F3EF]/75">
                                      {pt}
                                    </span>
                                  </motion.li>
                                ))}
                              </ul>

                              <CTA
                                onClick={() =>
                                  goTo(s.id === 'buy' || s.id === 'rent' ? 'properties' : 'contact')
                                }
                                tone="ghost"
                              >
                                {s.id === 'buy' || s.id === 'rent'
                                  ? 'View properties'
                                  : `Enquire about ${s.title.toLowerCase()}`}
                              </CTA>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* --- the process ----------------------------------------------------- */}
      <div className="relative overflow-hidden border-b hairline bg-[#131315] section-y">
        <div className="chevron-field pointer-events-none absolute inset-0 opacity-30" />
        <div className="shell relative">
          <SectionHeading
            eyebrow="The process"
            lines={['Six steps,', <span className="text-bronze-grad">no surprises.</span>]}
            aside={
              <p className="body-lg text-[#F5F3EF]/60 lg:pb-3">
                Every mandate runs the same route. You always know which stage you are at and
                what happens next.
              </p>
            }
          />

          <ol className="mt-16 grid gap-px overflow-hidden border hairline sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((p, i) => (
              <motion.li
                key={p.k}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.75, ease: EASE, delay: (i % 3) * 0.09 }}
                className="group relative bg-[#1C1C1E] p-8 transition-colors duration-700 hover:bg-[#232326] md:p-10"
              >
                <span className="eyebrow mb-6 block text-[#9C6625]">{p.k}</span>
                <h3 className="display-sm mb-3">{p.t}</h3>
                <p className="body-base text-[#F5F3EF]/55">{p.d}</p>
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#9C6625] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
