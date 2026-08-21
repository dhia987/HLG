import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { EASE, inView } from '../../lib/motion'
import { site } from '../../data/site'
import { team } from '../../data/team'
import { img } from '../../data/images'
import { Drift, ParallaxImage } from '../ui/Parallax'
import { MaskText, Reveal } from '../ui/Reveal'
import { CTA } from '../ui/Button'
import { Monogram } from '../brand/Monogram'
import { SectionHeading } from './SectionHeading'
import { useSectionNav } from '../../lib/useSectionNav'

/** The founder block reads from the same record as the team grid. */
const founderProfile = team[0]

const STATEMENT =
  'HLG is Home & Leisure Group. We are opening a Dubai real estate house for people who intend to live with their decision - not trade out of it by Friday. Fewer listings, longer conversations, better outcomes.'

const DUBAI = [
  {
    k: '01',
    t: 'Zero income tax',
    d: 'Rental income and capital gains stay where they land. The maths starts in your favour and rarely stops.',
  },
  {
    k: '02',
    t: 'Freehold ownership',
    d: 'Full foreign ownership across designated areas, with title registered at the Dubai Land Department in your name.',
  },
  {
    k: '03',
    t: 'Residency by investment',
    d: 'Qualifying property unlocks a ten-year Golden Visa for you and your family. We will handle the pathway.',
  },
  {
    k: '04',
    t: 'Yields that still work',
    d: 'Gross yields in the right communities remain well ahead of London, Paris or Singapore. Selection is everything.',
  },
]

function Word({
  children,
  range,
  progress,
}: {
  children: string
  range: [number, number]
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const color = useTransform(progress, range, ['#6C6C6C', '#F5F3EF'])
  return (
    <motion.span style={{ opacity, color }} className="inline">
      {children}
    </motion.span>
  )
}

/**
 * The house, before it opens.
 *
 * Every claim here is either about the founder, about Dubai, or about what
 * HLG intends to do - never about what it has already done. The "why choose
 * HLG" block that used to close this section has moved out to its own
 * anchored section, because it and the value proposition were the same
 * argument told twice.
 *
 * The sub-blocks carry their own ids so the footer can point at them. They are
 * deliberately not in `nav`: the scroll spy only reads nav entries, so extra
 * ids are free, and a footer full of destinations the navbar does not already
 * hold is the whole point of a directory.
 */
export function AboutSection() {
  const statementRef = useRef<HTMLDivElement>(null)
  const { goTo } = useSectionNav()
  const { scrollYProgress } = useScroll({
    target: statementRef,
    offset: ['start 0.85', 'end 0.55'],
  })
  const words = STATEMENT.split(' ')

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden">
      {/* --- positioning statement, illuminated word by word ---------------- */}
      <div ref={statementRef} className="relative border-b hairline section-y">
        <Drift
          distance={60}
          className="pointer-events-none absolute -left-[6vw] top-1/2 hidden -translate-y-1/2 lg:block"
        >
          <Monogram variant="white" className="h-[34vw] w-[34vw] opacity-[0.035]" />
        </Drift>

        <div className="shell relative">
          <div className="mb-12 flex items-center gap-4">
            <span className="h-1.5 w-1.5 rotate-45 bg-[#9C6625]" />
            <span className="eyebrow text-[#B88D5B]">About us</span>
            <span className="h-px flex-1 bg-[#F5F3EF]/10" />
            <span className="eyebrow text-[#F5F3EF]/30">{site.city}</span>
          </div>

          <p className="max-w-[28ch] font-display text-[clamp(1.35rem,2.7vw,2.25rem)] font-light leading-[1.28] tracking-[-0.025em] sm:max-w-[34ch] lg:ml-auto lg:max-w-[26ch]">
            {words.map((w, i) => {
              const start = i / words.length
              const end = start + 1 / words.length
              return (
                // The space lives outside the animated span so the sentence
                // stays copyable and readable to assistive tech.
                <span key={i}>
                  <Word range={[start, end]} progress={scrollYProgress}>
                    {w}
                  </Word>{' '}
                </span>
              )
            })}
          </p>
        </div>
      </div>

      {/* --- vision & mission ------------------------------------------------ */}
      <div
        id="vision"
        className="relative scroll-mt-24 overflow-hidden border-b hairline bg-[#131315] section-y"
      >
        <div className="chevron-field pointer-events-none absolute inset-0 opacity-30" />
        <div className="shell relative">
          <ul className="grid gap-px overflow-hidden border hairline md:grid-cols-2">
            {[
              {
                k: 'Vision',
                t: 'The address people pass on.',
                d: 'Not the largest brokerage in Dubai, but the one whose advice gets repeated at dinner. We would rather be the name a client gives a friend than the name at the top of a portal.',
              },
              {
                k: 'Mission',
                t: 'Fewer mandates, held properly.',
                d: 'To take on less than we could, so every client has an advisor who knows their brief, their community and their numbers without looking them up. Advice you would give your own family, or none at all.',
              },
            ].map((v, i) => (
              <motion.li
                key={v.k}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
                className="group relative bg-[#1C1C1E] p-9 transition-colors duration-700 hover:bg-[#232326] md:p-12"
              >
                <span className="absolute right-9 top-9 h-1.5 w-1.5 rotate-45 bg-[#9C6625] transition-transform duration-700 group-hover:scale-[2.2]" />
                <p className="eyebrow mb-7 text-[#B88D5B]">Our {v.k.toLowerCase()}</p>
                <h3 className="display-sm mb-5 max-w-[18ch]">{v.t}</h3>
                <p className="body-base max-w-md text-[#F5F3EF]/55">{v.d}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- story ---------------------------------------------------------- */}
      <div id="story" className="scroll-mt-24 border-b hairline section-y">
        <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="relative">
            <ParallaxImage
              src={img.interiorPoolView}
              alt="A residential interior overlooking the pool"
              className="aspect-[4/5] w-full"
              strength={10}
            />
            <Drift distance={40} className="absolute -bottom-10 -right-6 hidden lg:block">
              <div className="bg-[#F5F3EF] px-7 py-6 text-[#1C1C1E]">
                <Monogram variant="black" className="mb-4 h-8 w-8" />
                <p className="brand-type max-w-[16ch] text-lg leading-tight">
                  {site.tagline}
                </p>
              </div>
            </Drift>
          </div>

          <div className="lg:pt-8">
            <SectionHeading
              eyebrow="Our story"
              lines={['Built for the', <span className="text-bronze-grad">second question.</span>]}
            />
            <div className="mt-9 space-y-6">
              <Reveal>
                <p className="body-lg text-[#F5F3EF]/70">
                  Anyone can answer the first question: what is available. HLG is being
                  built for the second one: whether it is right, at this price, in this community,
                  for the life you actually intend to live here.
                </p>
              </Reveal>
              <Reveal delay={1}>
                <p className="body-base text-[#F5F3EF]/55">
                  We are starting because too much of the Dubai market is organised around volume.
                  Listings pushed, viewings stacked, contracts rushed. It works, briefly, for the
                  agent. It rarely works for the buyer three years later, when the community has
                  matured differently to the brochure and the service charge has doubled.
                </p>
              </Reveal>
              <Reveal delay={2}>
                <p className="body-base text-[#F5F3EF]/55">
                  So we are building the opposite. A small team, a deliberately short list of
                  mandates, and a standard of advice we would rather be judged on than a volume
                  figure. That is what opens with us on day one.
                </p>
              </Reveal>
              <Reveal delay={3}>
                <div className="pt-4">
                  <CTA onClick={() => goTo('contact')} tone="ghost">
                    Register your interest
                  </CTA>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* --- founder ---------------------------------------------------------- */}
      <div
        id="founder"
        className="relative scroll-mt-24 overflow-hidden border-b hairline section-y"
      >
        <Drift
          distance={50}
          className="pointer-events-none absolute -right-[8vw] top-1/2 hidden -translate-y-1/2 lg:block"
        >
          <Monogram variant="white" className="h-[30vw] w-[30vw] opacity-[0.03]" />
        </Drift>

        <div className="shell relative grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="relative">
            <ParallaxImage
              src={founderProfile.image}
              alt={founderProfile.name}
              className="aspect-[3/4] w-full"
              imgClassName="grayscale"
              strength={8}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1C1C1E] to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
              className="absolute -bottom-6 -right-4 hidden bg-[#9C6625] px-6 py-5 sm:block"
            >
              <p className="eyebrow mb-2 text-[#F5F3EF]/75">Founder &amp; CEO</p>
              <p className="display-sm leading-none">{founderProfile.name}</p>
            </motion.div>
          </div>

          <div className="lg:pt-6">
            <SectionHeading
              eyebrow="CEO &amp; Founder"
              lines={['The person who', <span className="text-bronze-grad">signs the advice.</span>]}
            />

            <div className="mt-9 space-y-6">
              <Reveal>
                <p className="body-lg text-[#F5F3EF]/70">
                  &ldquo;What struck me about Dubai was how little of the market was built
                  around advice. Plenty of inventory. Very little judgement.&rdquo;
                </p>
              </Reveal>
              <Reveal delay={1}>
                <p className="body-base text-[#F5F3EF]/55">
                  &ldquo;HLG is being built to close that gap. We are keeping the bench small so
                  every mandate has a named owner, and we will turn work away when the numbers do
                  not hold. That is a slower way to build a brokerage. It is the only way I would
                  want one built if the money were my own.&rdquo;
                </p>
              </Reveal>
              <Reveal delay={2}>
                <p className="body-base text-[#F5F3EF]/55">
                  &ldquo;We are not open yet, which makes this the best moment to ask us the
                  awkward questions. The answers are the whole product.&rdquo;
                </p>
              </Reveal>

              <Reveal delay={3}>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t hairline pt-8">
                  <div>
                    <p className="brand-type text-lg">{founderProfile.name}</p>
                    <p className="eyebrow mt-2 text-[#F5F3EF]/45">
                      Founder &amp; CEO &nbsp;/&nbsp; {founderProfile.languages}
                    </p>
                  </div>
                  <a
                    href={founderProfile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="link-underline eyebrow text-[#B88D5B]"
                  >
                    LinkedIn
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* --- why Dubai -------------------------------------------------------- */}
      <div
        id="dubai"
        className="relative scroll-mt-24 overflow-hidden border-b hairline section-y"
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Why Dubai"
            lines={['A city that', <span className="text-bronze-grad">compounds.</span>]}
            aside={
              <p className="body-lg text-[#F5F3EF]/60 lg:pb-3">
                Dubai stopped being a bet some time ago. What remains is a question of where,
                when and with whom, which is precisely the part we intend to answer.
              </p>
            }
          />

          <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div className="relative">
              <ParallaxImage
                src={img.cityNight}
                alt="The Dubai skyline at night"
                className="aspect-[4/5] w-[86%]"
                strength={9}
              />
              <Drift distance={54} className="absolute -bottom-14 right-0 w-[52%]">
                <ParallaxImage
                  src={img.coastBeach}
                  alt="The Jumeirah coastline"
                  className="aspect-[3/4] w-full border-4 border-[#1C1C1E]"
                  strength={6}
                />
              </Drift>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={inView}
                transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
                className="absolute -left-2 bottom-8 hidden bg-[#9C6625] px-6 py-5 lg:block"
              >
                <p className="display-sm leading-none">25&deg;12&apos;N</p>
                <p className="eyebrow mt-2 text-[#F5F3EF]/70">55&deg;16&apos;E</p>
              </motion.div>
            </div>

            <ul className="lg:pt-6">
              {DUBAI.map((p, i) => (
                <motion.li
                  key={p.k}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.8, ease: EASE, delay: i * 0.09 }}
                  className="group border-b hairline py-7 first:border-t"
                >
                  <div className="flex gap-6 md:gap-10">
                    <span className="eyebrow pt-2 text-[#9C6625]">{p.k}</span>
                    <div>
                      <h3 className="display-sm mb-3 transition-colors duration-500 group-hover:text-[#B88D5B]">
                        {p.t}
                      </h3>
                      <p className="body-base max-w-md text-[#F5F3EF]/55">{p.d}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- closing image ---------------------------------------------------- */}
      <div className="relative">
        <ParallaxImage
          src={img.coastAerial}
          alt="The Dubai coastline from the air"
          className="h-[60vh] w-full"
          strength={12}
        >
          <div className="absolute inset-0 bg-[#1C1C1E]/55" />
          <div className="absolute inset-0 flex items-center">
            <div className="shell">
              <h2 className="display-lg max-w-[14ch]">
                <MaskText lines={['We will only sell', 'what we would live in.']} />
              </h2>
            </div>
          </div>
        </ParallaxImage>
      </div>
    </section>
  )
}
