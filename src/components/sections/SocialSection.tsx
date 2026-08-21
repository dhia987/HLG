import { motion } from 'motion/react'
import { EASE, EASE_CINE, inView } from '../../lib/motion'
import { site } from '../../data/site'
import { img } from '../../data/images'
import { SectionHeading } from './SectionHeading'
import { Marquee } from '../ui/Marquee'

/**
 * PLACEHOLDER FEED - swap for the live social feed or a curated grid.
 *
 * Captions deliberately carry no transactions. A house that has not opened has
 * no handover days and no listings to style, so the feed is the city and the
 * build-up to opening instead.
 */
const TILES = [
  { img: img.villaDusk, cap: 'Palm Jumeirah, last light' },
  { img: img.cityDawn, cap: 'Downtown at first light' },
  { img: img.livingWarm, cap: 'The room where it starts' },
  { img: img.cityNight, cap: 'Sheikh Zayed Road, midweek' },
  { img: img.resortPool, cap: 'District One lagoon' },
  { img: img.coastAerial, cap: 'The coast, from the air' },
  { img: img.interiorPoolView, cap: 'Bluewaters, looking out' },
  { img: img.villaPalms, cap: 'Ranches, early' },
]

export function SocialSection() {
  return (
    <section className="relative overflow-hidden section-y">
      <div className="shell">
        <SectionHeading
          eyebrow="Social"
          lines={['Follow the', <span className="text-bronze-grad">chapter.</span>]}
          aside={
            <div className="lg:pb-3">
              <p className="body-lg mb-7 text-[#F5F3EF]/60">
                The city, the build-up and honest market notes, posted as they happen.
                Everything else waits until the doors open.
              </p>
              <ul className="flex flex-wrap gap-3">
                {site.social.map((s, i) => (
                  <motion.li
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={inView}
                    transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
                  >
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="link"
                      className="group flex items-center gap-3 rounded-full border hairline px-5 py-3 transition-colors duration-500 hover:border-[#9C6625] hover:bg-[#9C6625]"
                    >
                      <span className="h-1.5 w-1.5 rotate-45 bg-[#9C6625] transition-colors duration-500 group-hover:bg-[#F5F3EF]" />
                      <span className="text-[0.68rem] font-medium uppercase tracking-[0.2em]">
                        {s.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          }
        />
      </div>

      <div className="mt-16">
        <Marquee baseSpeed={26} direction={-1} repeat={2} itemClassName="gap-4 pr-4">
          {TILES.map((t) => (
            <a
              key={t.cap}
              href={site.social[1].href}
              target="_blank"
              rel="noreferrer"
              data-cursor="view"
              data-cursor-label="Open"
              className="group relative block h-[clamp(180px,22vw,320px)] w-[clamp(150px,18vw,260px)] shrink-0 overflow-hidden bg-[#232326]"
            >
              <motion.img
                src={t.img}
                alt={t.cap}
                loading="lazy"
                className="h-full w-full object-cover grayscale transition-[filter,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:grayscale-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE_CINE }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1C1E]/90 via-transparent to-transparent" />
              <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-[0.66rem] uppercase tracking-[0.16em] text-[#F5F3EF]/0 transition-all duration-700 group-hover:translate-y-0 group-hover:text-[#F5F3EF]/85">
                {t.cap}
              </span>
            </a>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
