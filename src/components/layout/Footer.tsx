import { Logo } from '../brand/Logo'
import { Marquee } from '../ui/Marquee'
import { CTA } from '../ui/Button'
import { MaskText } from '../ui/Reveal'
import { Magnetic } from '../ui/Magnetic'
import { launchLine, launchStatus } from '../ui/Countdown'
import { SocialIcon } from './SocialIcons'
import { site } from '../../data/site'
import { useSmoothScroll } from '../../lib/SmoothScroll'
import { useSectionNav } from '../../lib/useSectionNav'
import { INTERESTS, useInterest } from '../../lib/InterestContext'

/**
 * Deep links into the About narrative. None of these are nav entries, which is
 * the point: the footer is a directory of destinations the navbar does not
 * already hold, not a second copy of it. The ids live on the sub-blocks of
 * AboutSection.
 */
const HOUSE = [
  { label: 'Our story', id: 'story' },
  { label: 'Vision & mission', id: 'vision' },
  { label: 'CEO & founder', id: 'founder' },
  { label: 'Why Dubai', id: 'dubai' },
]

/** The form's options read as verbs; under "Register as" they need to be nouns. */
const REGISTER_AS: Record<(typeof INTERESTS)[number], string> = {
  Buying: 'A buyer',
  Selling: 'A seller',
  Renting: 'A tenant',
  Partnering: 'A partner or developer',
}

export function Footer() {
  const { scrollTo } = useSmoothScroll()
  const { goTo } = useSectionNav()
  const { setInterest } = useInterest()
  const year = new Date().getFullYear()

  /**
   * The portfolio shortcuts used to carry a filter into the grid. With no
   * portfolio the same idea has one destination left, so what a shortcut
   * carries now is the registration type - the visitor still arrives at
   * something already set up for them rather than at a blank form.
   */
  const registerAs = (interest: (typeof INTERESTS)[number]) => {
    setInterest(interest)
    goTo('contact')
  }

  const linkCls =
    'link-underline text-left text-[0.88rem] font-light text-[#F5F3EF]/60 transition-colors duration-500 hover:text-[#F5F3EF]'

  return (
    <footer className="relative overflow-hidden bg-[#131315]">
      {/* closing call to action */}
      <div className="shell relative border-b hairline py-[clamp(4.5rem,11vh,9rem)]">
        <div className="chevron-field pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <p className="eyebrow mb-7 text-[#B88D5B]">Before we open</p>
            <h2 className="display-lg">
              <MaskText
                lines={['Let us open', <span className="text-bronze-grad">the right door.</span>]}
              />
            </h2>
          </div>
          <div className="flex flex-col items-start gap-6 lg:items-end">
            <p className="body-lg max-w-sm text-[#F5F3EF]/55 lg:text-right">
              Tell us what you are looking for. When the doors open you will hear from us before
              anything else does.
            </p>
            <CTA onClick={() => goTo('contact')} tone="bronze">
              Register your interest
            </CTA>
          </div>
        </div>
      </div>

      {/* kinetic brand band */}
      <div className="border-b hairline py-7">
        <Marquee baseSpeed={34} direction={-1}>
          <span className="display-md whitespace-nowrap px-6 text-[#F5F3EF]/12">
            {site.name.toUpperCase()}
          </span>
          <span className="h-2 w-2 shrink-0 rotate-45 bg-[#9C6625]" />
          <span className="display-md whitespace-nowrap px-6 text-[#F5F3EF]/12">
            {site.tagline.toUpperCase()}
          </span>
          <span className="h-2 w-2 shrink-0 rotate-45 bg-[#9C6625]" />
        </Marquee>
      </div>

      {/* directory — real destinations, not a second copy of the navbar */}
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)] lg:gap-10">
        <div className="lg:pr-8">
          <Logo variant="white" className="mb-7 h-12 w-auto" />
          <p className="body-base max-w-xs text-[#F5F3EF]/50">
            {site.legalName}. A {site.city} real estate house opening for people who intend to
            live with their decision rather than trade out of it.
          </p>
          <div className="mt-7 inline-flex flex-col gap-1.5 border-l-2 border-[#9C6625] pl-4">
            <span className="eyebrow text-[#B88D5B]">Doors open</span>
            <span className="brand-type text-sm text-[#F5F3EF]/70">
              {launchLine(launchStatus())}
            </span>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-6 text-[#B88D5B]">The house</p>
          <ul className="space-y-3">
            {HOUSE.map((h) => (
              <li key={h.id}>
                <button onClick={() => goTo(h.id)} data-cursor="link" className={linkCls}>
                  {h.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => goTo('value')}
                data-cursor="link"
                className={`${linkCls} text-[#B88D5B]/80`}
              >
                Our commitments
              </button>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-6 text-[#B88D5B]">Register as</p>
          <ul className="space-y-3">
            {INTERESTS.map((it) => (
              <li key={it}>
                <button onClick={() => registerAs(it)} data-cursor="link" className={linkCls}>
                  {REGISTER_AS[it]}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => goTo('contact')}
                data-cursor="link"
                className={`${linkCls} text-[#B88D5B]/80`}
              >
                Join the list
              </button>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-6 text-[#B88D5B]">Find us</p>
          <ul className="space-y-4">
            <li>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="block text-[0.88rem] font-light leading-relaxed text-[#F5F3EF]/60 transition-colors duration-500 hover:text-[#F5F3EF]"
              >
                {site.addressShort}
                <br />
                {site.city}, {site.country}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} data-cursor="link" className={linkCls}>
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className={linkCls}
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} data-cursor="link" className={linkCls}>
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* social row */}
      <div className="shell flex justify-center border-t hairline py-7">
        <ul className="flex items-center gap-3">
          {site.social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                data-cursor="link"
                className="flex h-11 w-11 items-center justify-center rounded-full border hairline text-[#F5F3EF]/60 transition-[color,border-color,background-color] duration-500 hover:border-[#9C6625] hover:bg-[#9C6625] hover:text-[#F5F3EF]"
              >
                <SocialIcon label={s.label} className="h-[18px] w-[18px]" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* colophon */}
      <div className="shell flex flex-col gap-5 border-t hairline pb-28 pt-7 sm:flex-row sm:items-center sm:justify-between sm:pb-24">
        <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[#F5F3EF]/35">
          &copy; {year} {site.name}. {site.legalName}. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.68rem] uppercase tracking-[0.16em] text-[#F5F3EF]/35">
          <a href="/terms.html" data-cursor="link" className="link-underline">
            Terms
          </a>
          <a href="/privacy-policy.html" data-cursor="link" className="link-underline">
            Privacy
          </a>
          <button onClick={() => goTo('team')} data-cursor="link" className="link-underline uppercase tracking-[0.16em]">
            Careers
          </button>
          <Magnetic strength={0.2}>
            <button
              onClick={() => scrollTo(0)}
              data-cursor="link"
              className="link-underline uppercase tracking-[0.16em]"
            >
              Back to top &#8593;
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}
