import { LayoutGroup, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { Logo } from '../brand/Logo'
import { Magnetic } from '../ui/Magnetic'
import { MenuOverlay } from './MenuOverlay'
import { nav, site } from '../../data/site'
import { EASE } from '../../lib/motion'
import { useSectionNav } from '../../lib/useSectionNav'

export function Header() {
  const { scrollY } = useScroll()
  const { active, goTo } = useSectionNav()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    if (menuOpen) return
    setHidden(y > prev && y > 260)
  })

  const jump = (id: string) => {
    setMenuOpen(false)
    goTo(id)
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[7500]"
        animate={{ y: hidden ? '-105%' : '0%' }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div
          className={`transition-[background-color,backdrop-filter,border-color] duration-700 ${
            scrolled && !menuOpen
              ? 'glass border-b hairline'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <div className="shell flex items-center justify-between gap-6 py-4 md:py-5">
            <button
              onClick={() => jump('home')}
              aria-label={`${site.name} - back to top`}
              data-cursor="link"
              className="relative z-10 shrink-0"
            >
              <Logo
                variant="white"
                className="h-10 w-auto transition-opacity duration-500 hover:opacity-75 md:h-11"
              />
            </button>

            {/* Section navigation. The bronze pill tracks the section currently
                under the reading line, so the header doubles as a progress
                indicator for the one-page narrative. */}
            <nav className="hidden lg:block">
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
                          className="group relative block rounded-full px-4 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.2em]"
                        >
                          {isActive && (
                            <motion.span
                              layoutId="nav-pill"
                              className="absolute inset-0 rounded-full border border-[#9C6625]/45 bg-[#9C6625]/15"
                              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                            />
                          )}
                          <span
                            className={`relative z-10 transition-colors duration-500 ${
                              isActive
                                ? 'text-[#B88D5B]'
                                : 'text-[#F5F3EF]/70 group-hover:text-[#F5F3EF]'
                            }`}
                          >
                            {item.label}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </LayoutGroup>
            </nav>

            <div className="flex items-center gap-4 md:gap-7">
              <a
                href={site.phoneHref}
                data-cursor="link"
                className="link-underline hidden whitespace-nowrap text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#F5F3EF]/70 xl:block"
              >
                {site.phone}
              </a>

              <Magnetic strength={0.24}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  data-cursor="link"
                  aria-expanded={menuOpen}
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  className="group relative flex h-11 items-center gap-3 rounded-full border hairline px-5 transition-colors duration-500 hover:border-[#9C6625]"
                >
                  <span className="relative flex h-3 w-5 flex-col justify-between">
                    <motion.span
                      className="block h-px w-full origin-center bg-[#F5F3EF]"
                      animate={menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                    <motion.span
                      className="block h-px w-full origin-center bg-[#F5F3EF]"
                      animate={menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  </span>
                  <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[#F5F3EF]">
                    {menuOpen ? 'Close' : 'Menu'}
                  </span>
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </motion.header>

      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={jump}
        current={active}
      />
    </>
  )
}
