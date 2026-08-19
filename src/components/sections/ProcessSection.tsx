import { motion } from 'motion/react'
import { EASE, inView } from '../../lib/motion'
import { SectionHeading } from './SectionHeading'

const PROCESS = [
  { k: '01', t: 'Brief', d: 'A long first conversation. Budget, horizon, tolerance, and what the property is actually for.' },
  { k: '02', t: 'Shortlist', d: 'Six to ten options, on and off market, each with the case against it written down.' },
  { k: '03', t: 'Viewings', d: 'Grouped, unhurried, and always with the community seen at the hour you would live in it.' },
  { k: '04', t: 'Negotiate', d: 'Positioning, comparables, and a walk-away number agreed before we open.' },
  { k: '05', t: 'Transfer', d: 'DLD, NOC, financing and handover coordinated end to end. You sign, we chase.' },
  { k: '06', t: 'After', d: 'Tenancy, snagging and the eventual exit - the same team, years later.' },
]

/** Shared by all three desks, so it sits after them rather than inside one. */
export function ProcessSection() {
  return (
    <section className="relative overflow-hidden border-b hairline bg-[#131315] section-y">
      <div className="chevron-field pointer-events-none absolute inset-0 opacity-30" />
      <div className="shell relative">
        <SectionHeading
          eyebrow="The process"
          lines={['Six steps,', <span className="text-bronze-grad">no surprises.</span>]}
          aside={
            <p className="body-lg text-[#F5F3EF]/60 lg:pb-3">
              Buying, selling or renting, every mandate runs the same route. You always know
              which stage you are at and what happens next.
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
              {/* Nunito numerals - the monogram face, used as an accent only */}
              <span className="brand-type mb-5 block text-2xl text-[#9C6625]">{p.k}</span>
              <h3 className="display-sm mb-3">{p.t}</h3>
              <p className="body-base text-[#F5F3EF]/55">{p.d}</p>
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#9C6625] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
