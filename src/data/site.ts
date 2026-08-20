/**
 * Single source of truth for brand-level copy and contact details.
 * Values taken from the HLG REAL ESTATE Brand Guideline (stationery, p.12-13).
 */
export const site = {
  name: 'HLG Real Estate',
  legalName: 'Home & Leisure Group',
  tagline: 'The Key to Your Next Chapter',
  city: 'Dubai',
  country: 'United Arab Emirates',
  email: 'contact@hlgrealestate.ae',
  adminEmail: 'admin@hlgrealestate.ae',
  phone: '+971 50 650 0206',
  phoneHref: 'tel:+971506500206',
  whatsappHref: 'https://wa.me/971506500206',
  website: 'www.hlgrealestate.com',
  address: 'The Binary by OMNIYAT, Business Bay, Dubai - United Arab Emirates',
  addressShort: 'The Binary by OMNIYAT, Business Bay',
  mapsUrl: 'https://maps.app.goo.gl/wXacjuWZWtmQVeE17',
  /** The Binary by OMNIYAT, Business Bay - from the office Google Maps pin. */
  geo: { lat: 25.187437, lng: 55.2667726 },
  social: [
    {
      label: 'LinkedIn',
      handle: '/hlgrealestate',
      href: 'https://www.linkedin.com/company/hlgrealestate',
    },
    {
      label: 'Instagram',
      handle: '@hlgrealestate',
      href: 'https://www.instagram.com/hlgrealestate',
    },
    { label: 'WhatsApp', handle: '+971 50 650 0206', href: 'https://wa.me/971506500206' },
    { label: 'YouTube', handle: '/hlgrealestate', href: 'https://www.youtube.com/@hlgrealestate' },
  ],
} as const

export type Launch = {
  /**
   * The exact opening moment as an ISO 8601 string *with the Gulf offset*.
   * `null` while the date is unannounced.
   */
  date: string | null
  /** The same moment written for reading, e.g. '14 March 2027 - 10:00 GST'. */
  label: string | null
}

/**
 * The opening. This is the only place the date lives - the hero countdown, the
 * contact card and the footer plate all read it, so changing it here moves
 * every marker on the site at once.
 *
 * The `+04:00` offset is not decoration: the countdown is computed against
 * real Gulf time, so a visitor in London sees the same number of days as one
 * in Dubai. Once the moment passes, every marker switches itself to its
 * "open" state without a deploy.
 *
 * TIME OF DAY IS AN ASSUMPTION. The date was given as 15/09/2026; 10:00 is a
 * stand-in for the hour the doors actually open. Change the `10:00:00` below
 * and the matching label if it should be another time.
 *
 * Setting `date` back to null returns every marker to its unannounced state -
 * same layout, numerals as dashes, caption reading "Date to be announced".
 */
export const launch: Launch = {
  date: '2026-09-15T10:00:00+04:00',
  label: '15 September 2026 - 10:00 GST',
}

/**
 * The site is a single scroll narrative - every nav entry is a section on the
 * page, not a route. `id` is both the DOM id and the hash used for deep links.
 * `short` is what the header shows; the menu overlay and footer use `label`,
 * where there is room for the fuller wording.
 *
 * Pre-launch structure: the portfolio, the three desks, the developer index
 * and the journal all belong to a house that is trading. None of them exist
 * yet, so the narrative is who we are, what we are committing to, who is
 * behind it, where to find us, and how to get on the list.
 */
export const nav = [
  { label: 'Home', short: 'Home', id: 'home', index: '01' },
  { label: 'About Us', short: 'About', id: 'about', index: '02' },
  { label: 'Why HLG', short: 'Why HLG', id: 'value', index: '03' },
  { label: 'Our Team', short: 'Team', id: 'team', index: '04' },
  { label: 'Location', short: 'Location', id: 'location', index: '05' },
  { label: 'Contact', short: 'Contact', id: 'contact', index: '06' },
] as const

export type NavItem = (typeof nav)[number]
