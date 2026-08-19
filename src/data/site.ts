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
  address: 'Business Bay, Dubai - United Arab Emirates',
  /** Used by the map embed. Replace with the exact office coordinates. */
  geo: { lat: 25.1857, lng: 55.2645 },
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

/**
 * The site is a single scroll narrative - every nav entry is a section on the
 * page, not a route. `id` is both the DOM id and the hash used for deep links.
 * `short` is what the header shows; the menu overlay and footer use `label`,
 * where there is room for the fuller wording.
 */
export const nav = [
  { label: 'Home', short: 'Home', id: 'home', index: '01' },
  { label: 'About Us', short: 'About', id: 'about', index: '02' },
  { label: 'Buy', short: 'Buy', id: 'buy', index: '03' },
  { label: 'Sell', short: 'Sell', id: 'sell', index: '04' },
  { label: 'Rent', short: 'Rent', id: 'rent', index: '05' },
  { label: 'Properties', short: 'Properties', id: 'properties', index: '06' },
  { label: 'Developers', short: 'Developers', id: 'developers', index: '07' },
  { label: 'Blog', short: 'Blog', id: 'blog', index: '08' },
  { label: 'Our Team', short: 'Team', id: 'team', index: '09' },
  { label: 'Contact', short: 'Contact', id: 'contact', index: '10' },
] as const

export type NavItem = (typeof nav)[number]
