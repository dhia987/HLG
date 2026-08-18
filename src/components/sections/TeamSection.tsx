import { motion } from 'motion/react'
import { EASE, inView } from '../../lib/motion'
import { team } from '../../data/team'
import { site } from '../../data/site'
import { SectionHeading } from './SectionHeading'
import { Unveil } from '../ui/Reveal'
import { CTA } from '../ui/Button'

/**
 * Portraits sit in the guideline's grey values and resolve to full colour on
 * hover - a direct nod to the monochrome/colour pairing defined on p.08.
 */
export function TeamSection() {
  return (
    <section id="team" className="scroll-mt-24">
      <div className="border-b hairline section-y">
        <div className="shell">
          <SectionHeading
            eyebrow="Our team"
            lines={['People, not', <span className="text-bronze-grad">a call centre.</span>]}
            aside={
              <p className="body-lg text-[#F5F3EF]/60 lg:pb-3">
                Six advisors, each owning a side of the market. No pooled leads, no call centre,
                no handing you down the chain &mdash; the advisor who takes your first call takes
                your last one.
              </p>
            }
          />

          <ul className="mt-16 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <motion.li
                key={m.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.85, ease: EASE, delay: (i % 3) * 0.1 }}
                className="group"
              >
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="view"
                  data-cursor-label="LinkedIn"
                  className="block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#232326]">
                    <Unveil className="absolute inset-0" delay={(i % 3) * 0.1} tone="#232326">
                      <img
                        src={m.image}
                        alt={m.name}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale transition-[filter,transform] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:grayscale-0"
                      />
                    </Unveil>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#1C1C1E] to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-[transform,opacity] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="eyebrow text-[#B88D5B]">{m.languages}</p>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between gap-4 pt-5">
                    <h3 className="display-sm transition-colors duration-500 group-hover:text-[#B88D5B]">
                      {m.name}
                    </h3>
                    <span className="eyebrow shrink-0 text-[#F5F3EF]/35">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.72rem] uppercase tracking-[0.18em] text-[#F5F3EF]/45">
                    {m.role}
                  </p>
                  <p className="body-base mt-4 text-[#F5F3EF]/55">{m.bio}</p>

                  <div className="mt-5 h-px w-full bg-[#F5F3EF]/12">
                    <div className="h-full w-full origin-left scale-x-0 bg-[#9C6625] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  </div>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* careers */}
      <div className="relative overflow-hidden border-b hairline bg-[#131315] section-y">
        <div className="chevron-field pointer-events-none absolute inset-0 opacity-30" />
        <div className="shell relative">
          <SectionHeading
            eyebrow="Careers"
            lines={[
              'Room for one or two',
              <span className="text-bronze-grad">more of the right people.</span>,
            ]}
            align="center"
            lead="We hire slowly and rarely. If you sell by advising rather than by pushing, we would like to hear from you."
          />
          <div className="mt-12 flex justify-center">
            <CTA href={`mailto:${site.adminEmail}?subject=Careers%20at%20HLG`} tone="bronze">
              Send an introduction
            </CTA>
          </div>
        </div>
      </div>
    </section>
  )
}
