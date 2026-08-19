import { Logo } from '../brand/Logo'
import { Marquee } from '../ui/Marquee'
import { CTA } from '../ui/Button'
import { MaskText } from '../ui/Reveal'
import { Magnetic } from '../ui/Magnetic'
import { nav, site } from '../../data/site'
import { services } from '../../data/services'
import { useSmoothScroll } from '../../lib/SmoothScroll'
import { useSectionNav } from '../../lib/useSectionNav'

export function Footer() {
  const { scrollTo } = useSmoothScroll()
  const { goTo } = useSectionNav()
  const year = new Date().getFullYear()

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

      {/* directory */}
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo variant="white" className="mb-7 h-11 w-auto" />
          <p className="body-base max-w-xs text-[#F5F3EF]/50">
            {site.legalName}. A {site.city} real estate house for buying, selling, renting and
            holding property with intent.
          </p>
        </div>

        <nav>
          <p className="eyebrow mb-6 text-[#B88D5B]">Navigate</p>
          <ul className="space-y-3">
            {nav.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => goTo(item.id)}
                  data-cursor="link"
                  className="link-underline body-base text-[#F5F3EF]/70"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-6 text-[#B88D5B]">Desks</p>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => goTo(s.id)}
                  data-cursor="link"
                  className="link-underline body-base text-[#F5F3EF]/70"
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-6 text-[#B88D5B]">Connect</p>
          <ul className="space-y-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                data-cursor="link"
                className="link-underline body-base text-[#F5F3EF]/70"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.phoneHref}
                data-cursor="link"
                className="link-underline body-base text-[#F5F3EF]/70"
              >
                {site.phone}
              </a>
            </li>
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="link-underline body-base text-[#F5F3EF]/70"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* colophon */}
      <div className="shell flex flex-col gap-4 border-t hairline py-7 text-[0.68rem] uppercase tracking-[0.18em] text-[#F5F3EF]/35 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {year} {site.name}. {site.legalName}.
        </p>
        <p className="hidden md:block">{site.address}</p>
        <Magnetic strength={0.2}>
          <button
            onClick={() => scrollTo(0)}
            data-cursor="link"
            className="link-underline uppercase tracking-[0.18em]"
          >
            Back to top &#8593;
          </button>
        </Magnetic>
      </div>
    </footer>
  )
}
