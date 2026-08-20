import { LayoutGroup, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { Logo } from '../brand/Logo'
import { Magnetic } from '../ui/Magnetic'
import { MenuOverlay } from './MenuOverlay'
import { nav, site } from '../../data/site'
import { EASE } from '../../lib/motion'
import { useSectionNav } from '../../lib/useSectionNav'

/**
 * The header never leaves the screen.
 *
 * Instead of hiding on scroll it *condenses*: the utility bar (email and
 * WhatsApp) folds away, the lockup shrinks a little and the glass background
 * fades in. Everything animates on the same brand curve, so the transition
 * reads as one gesture rather than three.
 */
export function Header() {
  const { scrollY } = useScroll()
  const { active, goTo } = useSectionNav()
  const [condensed, setCondensed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setCondensed(y > 60)
  })

  const jump = (id: string) => {
    setMenuOpen(false)
    goTo(id)
  }

  const solid = condensed && !menuOpen

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[7500]">
        <div
          className={`transition-[background-color,backdrop-filter,border-color] duration-700 ${
            solid ? 'glass border-b hairline' : 'border-b border-transparent bg-transparent'
          }`}
        >
          {/* --- utility bar: folds away once you start reading ------------- */}
          <motion.div
            className="overflow-hidden border-b hairline"
            initial={false}
            animate={{
              height: solid ? 0 : 42,
              opacity: solid ? 0 : 1,
              borderBottomColor: solid ? 'rgba(245,243,239,0)' : 'rgba(245,243,239,0.10)',
            }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="shell flex h-[42px] items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[#F5F3EF]/55">
                <span className="h-1 w-1 rotate-45 bg-[#9C6625]" />
                <span className="hidden sm:inline">{site.city}, {site.country}</span>
                <span className="sm:hidden">{site.city}</span>
              </div>

              <div className="flex items-center gap-5 md:gap-8">
                <a
                  href={`mailto:${site.email}`}
                  data-cursor="link"
                  className="group flex items-center gap-2.5 text-[0.72rem] font-medium uppercase tracking-[0.15em] text-[#F5F3EF]/70 transition-colors duration-500 hover:text-[#B88D5B]"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden="true">
                    <rect
                      x="2"
                      y="4.5"
                      width="16"
                      height="11"
                      rx="1.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M2.6 5.4 10 10.8l7.4-5.4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="hidden md:inline">{site.email}</span>
                  <span className="md:hidden">Email</span>
                </a>

                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="group flex items-center gap-2.5 text-[0.72rem] font-medium uppercase tracking-[0.15em] text-[#F5F3EF]/70 transition-colors duration-500 hover:text-[#B88D5B]"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden="true">
                    <path
                      d="M10 2.6a7.4 7.4 0 0 0-6.3 11.3L2.6 17.4l3.6-1.1A7.4 7.4 0 1 0 10 2.6Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.4 7.1c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4l.6 1.4c.1.2 0 .4-.1.5l-.4.5c-.1.1-.2.3-.1.5.2.4.6 1 1.1 1.4.6.5 1.1.7 1.3.8.2.1.4 0 .5-.1l.4-.5c.2-.2.3-.2.5-.1l1.3.7c.2.1.3.2.3.4 0 .2 0 .7-.2 1-.3.3-.9.6-1.3.6-1 0-2.2-.6-3.2-1.4-1-.9-1.8-2-2.2-3-.2-.6-.2-1.2-.1-1.6Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="hidden md:inline">{site.phone}</span>
                  <span className="md:hidden">WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* --- main bar --------------------------------------------------- */}
          <div className="shell flex items-center justify-between gap-6 py-3.5 md:py-4">
            <button
              onClick={() => jump('home')}
              aria-label={`${site.name} - back to top`}
              data-cursor="link"
              className="relative z-10 shrink-0"
            >
              <motion.div
                initial={false}
                animate={{ scale: solid ? 0.88 : 1 }}
                transition={{ duration: 0.55, ease: EASE }}
                style={{ transformOrigin: 'left center' }}
              >
                <Logo
                  variant="white"
                  className="h-14 w-auto transition-opacity duration-500 hover:opacity-75 md:h-16"
                />
              </motion.div>
            </button>

            {/* Section navigation. The bronze pill tracks the section currently
                under the reading line, so the header doubles as a progress
                indicator for the one-page narrative. */}
            <nav className="hidden xl:block">
              <LayoutGroup id="section-nav">
                <ul className="flex items-center gap-1">
                  {nav.slice(1).map((item) => {
                    const isActive = active === item.id
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => jump(item.id)}
                          data-cursor="link"
                          aria-current={isActive ? 'true' : undefined}
                          className="group relative block rounded-full px-3.5 py-3 text-[0.72rem] font-medium uppercase tracking-[0.15em]"
                        >
                          {isActive && (
                            <motion.span
                              layoutId="nav-pill"
                              className="absolute inset-0 rounded-full border border-[#9C6625]/45 bg-[#9C6625]/15"
                              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                            />
                          )}
                          <span
                            className={`relative z-10 whitespace-nowrap transition-colors duration-500 ${
                              isActive
                                ? 'text-[#B88D5B]'
                                : 'text-[#F5F3EF]/70 group-hover:text-[#F5F3EF]'
                            }`}
                          >
                            {item.short}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </LayoutGroup>
            </nav>

            {/* Client note: with every section listed in the bar, a menu button
                beside it is duplicate navigation. It returns below xl, where the
                nav is hidden and it is the only way through the site. */}
            <Magnetic strength={0.24} className="xl:hidden">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                data-cursor="link"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className="group relative flex h-12 items-center gap-3.5 rounded-full border hairline px-6 transition-colors duration-500 hover:border-[#9C6625]"
              >
                <span className="relative flex h-3.5 w-6 flex-col justify-between">
                  <motion.span
                    className="block h-px w-full origin-center bg-[#F5F3EF]"
                    animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                  <motion.span
                    className="block h-px w-full origin-center bg-[#F5F3EF]"
                    animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                </span>
                <span className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-[#F5F3EF]">
                  {menuOpen ? 'Close' : 'Menu'}
                </span>
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={jump}
        current={active}
      />
    </>
  )
}
