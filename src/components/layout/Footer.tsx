import { Logo } from '../brand/Logo'
import { Marquee } from '../ui/Marquee'
import { CTA } from '../ui/Button'
import { MaskText } from '../ui/Reveal'
import { Magnetic } from '../ui/Magnetic'
import { SocialIcon } from './SocialIcons'
import { site } from '../../data/site'
import { communities, propertyTypes } from '../../data/properties'
import { developers } from '../../data/developers'
import { useSmoothScroll } from '../../lib/SmoothScroll'
import { useSectionNav } from '../../lib/useSectionNav'
import { useSearch } from '../../lib/SearchContext'

/** Six of twelve — the ones HLG actually leads with. */
const FOOTER_COMMUNITIES = [
  'Palm Jumeirah',
  'Downtown Dubai',
  'Emirates Hills',
  'Dubai Marina',
  'Business Bay',
  'Dubai Creek Harbour',
]

const FOOTER_TYPES = ['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Duplex', 'Loft']

/** Duplex -> Duplexes, not Duplexs. */
const plural = (t: string) => (/(x|s|ch|sh)$/i.test(t) ? t + 'es' : t + 's')

export function Footer() {
  const { scrollTo } = useSmoothScroll()
  const { goTo } = useSectionNav()
  const { applyFilter } = useSearch()
  const year = new Date().getFullYear()

  /** Footer links are shortcuts into the portfolio, not a second navigation. */
  const filterTo = (partial: Parameters<typeof applyFilter>[0]) => {
    applyFilter(partial)
    goTo('properties')
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
            <p className="eyebrow mb-7 text-[#B88D5B]">Start here</p>
            <h2 className="display-lg">
              <MaskText
                lines={['Let us open', <span className="text-bronze-grad">the right door.</span>]}
              />
            </h2>
          </div>
          <div className="flex flex-col items-start gap-6 lg:items-end">
            <p className="body-lg max-w-sm text-[#F5F3EF]/55 lg:text-right">
              Tell us what you are looking for. We will tell you honestly whether it exists,
              what it costs, and when to move.
            </p>
            <CTA onClick={() => goTo('contact')} tone="bronze">
              Book a consultation
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

      {/* directory — shortcuts into the portfolio, not a copy of the navbar */}
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:gap-10">
        <div className="lg:pr-8">
          <Logo variant="white" className="mb-7 h-12 w-auto" />
          <p className="body-base max-w-xs text-[#F5F3EF]/50">
            {site.legalName}. A {site.city} real estate house for buying, selling, renting and
            holding property with intent.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-6 text-[#B88D5B]">Communities</p>
          <ul className="space-y-3">
            {FOOTER_COMMUNITIES.filter((c) => communities.includes(c)).map((c) => (
              <li key={c}>
                <button
                  onClick={() => filterTo({ community: c })}
                  data-cursor="link"
                  className={linkCls}
                >
                  {c}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => filterTo({})}
                data-cursor="link"
                className={`${linkCls} text-[#B88D5B]/80`}
              >
                All communities
              </button>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-6 text-[#B88D5B]">Property types</p>
          <ul className="space-y-3">
            {FOOTER_TYPES.filter((t) => propertyTypes.includes(t)).map((t) => (
              <li key={t}>
                <button onClick={() => filterTo({ type: t })} data-cursor="link" className={linkCls}>
                  {plural(t)}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => filterTo({ listing: 'rent' })}
                data-cursor="link"
                className={linkCls}
              >
                To rent
              </button>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-6 text-[#B88D5B]">Developers</p>
          <ul className="space-y-3">
            {developers.slice(0, 6).map((d) => (
              <li key={d.id}>
                <button
                  onClick={() => goTo('developers')}
                  data-cursor="link"
                  className={linkCls}
                >
                  {d.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => goTo('developers')}
                data-cursor="link"
                className={`${linkCls} text-[#B88D5B]/80`}
              >
                All developers
              </button>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-6 text-[#B88D5B]">Contact</p>
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
