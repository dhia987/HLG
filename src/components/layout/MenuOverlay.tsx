import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { EASE, EASE_CINE } from '../../lib/motion'
import { nav, site } from '../../data/site'
import { img } from '../../data/images'
import { Monogram } from '../brand/Monogram'
import { useScrollLock } from '../../lib/hooks'

const PREVIEW: Record<string, string> = {
  home: img.cityDawn,
  about: img.coastBeach,
  services: img.interiorPoolView,
  properties: img.villaPool,
  team: img.cityNight,
  contact: img.coastAerial,
}

export function MenuOverlay({
  open,
  onClose,
  onNavigate,
  current,
}: {
  open: boolean
  onClose: () => void
  onNavigate: (id: string) => void
  current: string
}) {
  const [hovered, setHovered] = useState<string | null>(null)
  useScrollLock(open)

  useEffect(() => {
    if (!open) {
      setHovered(null)
      return
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const active = hovered ?? current

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[7000] flex flex-col bg-[#1C1C1E]"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          transition={{ duration: 0.85, ease: EASE_CINE }}
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
        >
          {/* guideline p.10 - chevron outline as a background pattern */}
          <div className="chevron-field pointer-events-none absolute inset-0 opacity-40" />

          {/* floating preview image, desktop only */}
          <div className="pointer-events-none absolute right-[6vw] top-1/2 hidden h-[46vh] w-[26vw] -translate-y-1/2 overflow-hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={PREVIEW[active] ?? PREVIEW.home}
                alt=""
                className="h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.14, filter: 'grayscale(1)' }}
                animate={{ opacity: 0.75, scale: 1, filter: 'grayscale(0)' }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.8, ease: EASE_CINE }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-transparent to-transparent" />
          </div>

          {/* `my-auto` centres the block when it fits and lets it scroll when it
              does not - ten items plus the contact grid overflow a short phone. */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overscroll-contain">
            <div className="shell my-auto w-full pb-14 pt-28">
              <nav className="lg:max-w-[62%]">
              <ul>
                {nav.map((item, i) => {
                  const isActive = current === item.id
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20, transition: { duration: 0.25 } }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.24 + i * 0.06 }}
                      className="border-b hairline"
                      onMouseEnter={() => setHovered(item.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <button
                        onClick={() => onNavigate(item.id)}
                        data-cursor="link"
                        className="group flex w-full items-baseline gap-5 py-[clamp(0.2rem,0.75vh,0.7rem)] text-left md:gap-10"
                      >
                        <span className="eyebrow w-8 shrink-0 text-[#B88D5B]/70">
                          {item.index}
                        </span>
                        <span className="relative overflow-hidden">
                          <span
                            className={`menu-item block transition-[transform,color] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full ${
                              isActive ? 'text-[#B88D5B]' : 'text-[#F5F3EF]'
                            }`}
                          >
                            {item.label}
                          </span>
                          <span
                            aria-hidden="true"
                            className="menu-item absolute inset-0 block translate-y-full text-[#9C6625] transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                          >
                            {item.label}
                          </span>
                        </span>
                        {isActive && <span className="mb-2 h-1.5 w-1.5 rotate-45 bg-[#9C6625]" />}
                      </button>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.62 }}
              className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:max-w-[62%] lg:grid-cols-3"
            >
              <div>
                <p className="eyebrow mb-3 text-[#F5F3EF]/40">Enquiries</p>
                <a href={`mailto:${site.email}`} className="link-underline body-base text-[#F5F3EF]/85">
                  {site.email}
                </a>
                <br />
                <a href={site.phoneHref} className="link-underline body-base text-[#F5F3EF]/85">
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-3 text-[#F5F3EF]/40">Office</p>
                <p className="body-base text-[#F5F3EF]/85">{site.address}</p>
              </div>
              <div>
                <p className="eyebrow mb-3 text-[#F5F3EF]/40">Follow</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-1">
                  {site.social.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline body-base text-[#F5F3EF]/85"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="shell relative flex shrink-0 items-center justify-between border-t hairline py-6"
          >
            <div className="flex items-center gap-3">
              <Monogram variant="white" className="h-6 w-6" />
              <span className="eyebrow text-[#F5F3EF]/40">{site.legalName}</span>
            </div>
            <span className="eyebrow text-[#F5F3EF]/40">{site.city}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
