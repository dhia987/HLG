import { motion } from 'motion/react'
import { useState } from 'react'
import { EASE, inView } from '../../lib/motion'
import { developers } from '../../data/developers'
import { img } from '../../data/images'
import { SectionHeading } from './SectionHeading'
import { Marquee } from '../ui/Marquee'
import { CTA } from '../ui/Button'
import { useSectionNav } from '../../lib/useSectionNav'
import { useHasPointer } from '../../lib/hooks'

/**
 * Developers we transact with. Presented as a typographic index rather than a
 * wall of logos - third-party marks need written permission, and a name set in
 * the brand's own face reads as a relationship rather than as advertising.
 */
export function DevelopersSection() {
  const { goTo } = useSectionNav()
  const hasPointer = useHasPointer()
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="developers" className="relative scroll-mt-24 overflow-hidden border-b hairline">
      {/* kinetic band of names */}
      <div className="border-b hairline py-6">
        <Marquee baseSpeed={30} direction={-1} repeat={2}>
          {developers.map((d) => (
            <span key={d.id} className="flex shrink-0 items-center">
              <span className="display-sm whitespace-nowrap px-7 text-[#F5F3EF]/15">{d.name}</span>
              <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#9C6625]/60" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="section-y">
        <div className="shell">
          <SectionHeading
            eyebrow="Developers"
            lines={['The names we', <span className="text-bronze-grad">work alongside.</span>]}
            aside={
              <p className="body-lg text-[#F5F3EF]/60 lg:pb-3">
                Access matters, but so does knowing where each developer is genuinely strong.
                We hold relationships across the market and stay honest about which one suits
                a given brief.
              </p>
            }
          />

          <ul className="mt-16 border-t hairline">
            {developers.map((d, i) => (
              <motion.li
                key={d.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.7, ease: EASE, delay: (i % 4) * 0.06 }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="group relative border-b hairline"
              >
                <div className="relative z-10 flex flex-col gap-3 py-7 md:flex-row md:items-center md:gap-10 md:py-8">
                  <span
                    className={`eyebrow w-8 shrink-0 transition-colors duration-500 ${
                      active === i ? 'text-[#9C6625]' : 'text-[#F5F3EF]/25'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <h3
                    className={`display-sm w-full shrink-0 transition-colors duration-500 md:w-[16rem] ${
                      active === i ? 'text-[#B88D5B]' : ''
                    }`}
                  >
                    {d.name}
                  </h3>

                  <p className="body-base max-w-xl flex-1 text-[#F5F3EF]/55">{d.note}</p>

                  <ul className="flex flex-wrap gap-2 md:justify-end">
                    {d.communities.map((c) => (
                      <li
                        key={c}
                        className="rounded-full border hairline px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-[#F5F3EF]/50 transition-colors duration-500 group-hover:border-[#9C6625]/40 group-hover:text-[#F5F3EF]/75"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* bronze sweep on hover */}
                <span
                  className={`pointer-events-none absolute inset-0 origin-left bg-gradient-to-r from-[#9C6625]/12 to-transparent transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    hasPointer && active === i ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-14 flex flex-col items-start justify-between gap-8 border hairline bg-[#131315] p-9 lg:flex-row lg:items-center md:p-11"
          >
            <div className="relative">
              <p className="eyebrow mb-4 text-[#B88D5B]">Launches &amp; allocations</p>
              <h3 className="display-sm max-w-lg">
                Pre-launch allocation is decided weeks before anything reaches a portal.
              </h3>
              <p className="body-base mt-4 max-w-lg text-[#F5F3EF]/55">
                Tell us the brief and the budget and we will put you on the right list rather
                than every list.
              </p>
            </div>
            <CTA onClick={() => goTo('contact')} tone="bronze">
              Register your interest
            </CTA>
          </motion.div>
        </div>
      </div>

      {/* closing plate */}
      <div className="relative h-[38vh] overflow-hidden">
        <img
          src={img.cityNight}
          alt="The Dubai skyline at night"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1C1C1E]/70" />
        <div className="chevron-field absolute inset-0 opacity-30" />
      </div>
    </section>
  )
}
