import { motion } from 'motion/react'
import { EASE, inView } from '../../lib/motion'
import { CTA } from '../ui/Button'
import { SectionHeading } from './SectionHeading'
import { useSectionNav } from '../../lib/useSectionNav'

/**
 * "Why choose HLG" and "our value proposition" were two names for the same
 * argument, so they are one section. What changed is the tense.
 *
 * The trading version of this block leaned on evidence - repeat business,
 * off-market volume, developer allocations. A house that has not opened has
 * none of that, and borrowing it would undo exactly the credibility the
 * pre-launch site exists to build. So the six read as commitments made in
 * advance: checkable later, honest now.
 */
const COMMITMENTS = [
  {
    k: '01',
    t: 'Judgement over inventory',
    d: 'We would rather talk you out of a purchase than through one. If the numbers do not hold, we will say so and wait - even when waiting costs us the fee.',
  },
  {
    k: '02',
    t: 'Discretion as standard',
    d: 'Off-market will mean off-market. Names, prices and intentions stay inside the room until you decide otherwise.',
  },
  {
    k: '03',
    t: 'One point of contact',
    d: 'The advisor who takes your first call will take your last one. No handover to a desk that has never met you.',
  },
  {
    k: '04',
    t: 'The comparables, shown',
    d: 'Every recommendation arrives with the evidence underneath it - what sold, what it sold for, and what we think that means. You will see what we saw.',
  },
  {
    k: '05',
    t: 'Long after the keys',
    d: 'Handover is the middle of the relationship, not the end. Management, re-lets and the eventual exit belong to the same conversation.',
  },
  {
    k: '06',
    t: 'One team, end to end',
    d: 'Search, negotiation, DLD transfer, mortgage introduction, snagging, tenancy. You will not be handed to a different company at every stage.',
  },
]

export function ValueSection() {
  const { goTo } = useSectionNav()

  return (
    <section
      id="value"
      className="relative scroll-mt-24 overflow-hidden border-b hairline bg-[#131315] section-y"
    >
      <div className="chevron-field pointer-events-none absolute inset-0 opacity-30" />
      <div className="shell relative">
        <SectionHeading
          eyebrow="Our value proposition"
          lines={['Six commitments,', <span className="text-bronze-grad">before day one.</span>]}
          aside={
            <p className="body-lg text-[#F5F3EF]/60 lg:pb-3">
              We have not opened yet, so we will not point you at a track record we do not have.
              What we can do is set down the standard we intend to be held to &mdash; and then be
              held to it.
            </p>
          }
        />

        <ul className="mt-16 grid gap-x-14 gap-y-4 md:grid-cols-2">
          {COMMITMENTS.map((v, i) => (
            <motion.li
              key={v.k}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.12 }}
              className="group border-b hairline py-8"
            >
              <div className="flex gap-6 md:gap-9">
                <span className="eyebrow pt-2 text-[#9C6625]">{v.k}</span>
                <div>
                  <h3 className="display-sm mb-3 transition-colors duration-500 group-hover:text-[#B88D5B]">
                    {v.t}
                  </h3>
                  <p className="body-base text-[#F5F3EF]/55">{v.d}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-14 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between"
        >
          <p className="body-lg max-w-lg text-[#F5F3EF]/60">
            If any of the six turns out to be marketing rather than method, we would want to be
            told. Put your name down and hold us to it.
          </p>
          <CTA onClick={() => goTo('contact')} tone="bronze">
            Register your interest
          </CTA>
        </motion.div>
      </div>
    </section>
  )
}
