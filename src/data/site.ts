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
 */
export const nav = [
  { label: 'Home', id: 'home', index: '01' },
  { label: 'About Us', id: 'about', index: '02' },
  { label: 'Services', id: 'services', index: '03' },
  { label: 'Properties', id: 'properties', index: '04' },
  { label: 'Our Team', id: 'team', index: '05' },
  { label: 'Contact', id: 'contact', index: '06' },
] as const

export type NavItem = (typeof nav)[number]
