/**
 * PLACEHOLDER PORTFOLIO.
 * Demonstration listings with stock photography so the experience can be
 * reviewed end to end. Swap for the live HLG inventory (or wire this module to
 * a CRM / MLS feed) before launch - the shape below is what the UI consumes.
 */
import { img } from './images'

export type Listing = 'buy' | 'rent'

export type Property = {
  id: string
  slug: string
  title: string
  community: string
  city: string
  listing: Listing
  price: number
  /** For rentals: what the price is quoted per. */
  period?: 'year' | 'month'
  currency: 'AED'
  beds: number
  baths: number
  area: number
  type: string
  status: string
  handover?: string
  tagline: string
  description: string
  features: string[]
  images: string[]
  featured?: boolean
}

export const properties: Property[] = [
  {
    id: 'p01',
    slug: 'palm-signature-villa',
    title: 'Signature Beachfront Villa',
    community: 'Palm Jumeirah',
    city: 'Dubai',
    listing: 'buy',
    price: 42500000,
    currency: 'AED',
    beds: 6,
    baths: 7,
    area: 11200,
    type: 'Villa',
    status: 'Ready',
    tagline: 'Private beach, open sea, and the skyline held at arms length.',
    description:
      'A Signature villa on the west crescent, rebuilt to a single brief: let the sea do the talking. Eleven thousand square feet arranged over three levels, with a twenty-metre infinity edge that reads as one line with the Gulf. The upper floor is given entirely to the principal suite - dressing, study, terrace and an outdoor bath that faces the sunset.',
    features: [
      'Private 22m beach frontage',
      'Infinity pool & sunken lounge',
      'Home cinema and wellness suite',
      'Staff quarters & four-car garage',
      'Smart home throughout',
    ],
    images: [
      img.villaPool,
      img.interiorPoolView,
      img.livingWarm,
      img.resortPool,
    ],
    featured: true,
  },
  {
    id: 'p02',
    slug: 'downtown-sky-penthouse',
    title: 'Sky Penthouse, Burj View',
    community: 'Downtown Dubai',
    city: 'Dubai',
    listing: 'buy',
    price: 28900000,
    currency: 'AED',
    beds: 4,
    baths: 5,
    area: 6400,
    type: 'Penthouse',
    status: 'Ready',
    tagline: 'The fountain show, from above, every evening.',
    description:
      'A full-floor penthouse on the sixty-second level with the Burj Khalifa framed across the entire living wall. Interiors in travertine, smoked oak and bronze - a palette chosen to disappear the moment the view is switched on at dusk.',
    features: [
      'Full-floor, private lift lobby',
      'Direct Burj Khalifa & fountain outlook',
      '270-degree wraparound terrace',
      'Chef kitchen plus show kitchen',
      'Two dedicated parking bays',
    ],
    images: [
      img.diningDark,
      img.cityDawn,
      img.lounge,
      img.bedroom,
    ],
    featured: true,
  },
  {
    id: 'p03',
    slug: 'emirates-hills-mansion',
    title: 'Garden Mansion',
    community: 'Emirates Hills',
    city: 'Dubai',
    listing: 'buy',
    price: 65000000,
    currency: 'AED',
    beds: 7,
    baths: 9,
    area: 18500,
    type: 'Mansion',
    status: 'Ready',
    tagline: 'Twenty thousand feet of lawn between you and the world.',
    description:
      'On a plot that fronts the Montgomerie fairway, this mansion is arranged around a double-height atrium and a garden that has been thirty years in the making. Quiet in a way that only Emirates Hills manages this close to the city.',
    features: [
      'Golf course frontage',
      'Double-height atrium & gallery',
      'Indoor pool and spa',
      'Majlis and formal dining for twenty',
      'Guest annexe',
    ],
    images: [
      img.villaPalms,
      img.villaPoolAlt,
      img.villaTimber,
      img.resortPool,
    ],
    featured: true,
  },
  {
    id: 'p04',
    slug: 'marina-corner-residence',
    title: 'Corner Residence, Marina',
    community: 'Dubai Marina',
    city: 'Dubai',
    listing: 'rent',
    price: 385000,
    period: 'year',
    currency: 'AED',
    beds: 3,
    baths: 4,
    area: 2650,
    type: 'Apartment',
    status: 'Available now',
    tagline: 'Water on two sides, walkable to everything.',
    description:
      'A corner three-bedroom with dual aspect over the marina and the sea beyond. Fully furnished to a neutral, liveable standard - the sort of apartment you can move into with two suitcases and feel settled by the weekend.',
    features: [
      'Dual-aspect marina & sea views',
      'Furnished and serviced',
      'Residents pool, gym and spa',
      'Two parking bays',
      'Chiller free',
    ],
    images: [
      img.cityNight,
      img.lounge,
      img.livingBlue,
      img.bedroom,
    ],
  },
  {
    id: 'p05',
    slug: 'jumeirah-bay-townhouse',
    title: 'Island Townhouse',
    community: 'Jumeirah Bay Island',
    city: 'Dubai',
    listing: 'buy',
    price: 34000000,
    currency: 'AED',
    beds: 5,
    baths: 6,
    area: 8100,
    type: 'Townhouse',
    status: 'Off-market',
    tagline: 'One bridge, one island, thirty-two homes.',
    description:
      'Rarely traded and quietly held. A five-bedroom townhouse on the seahorse-shaped island, minutes from Jumeirah yet entirely apart from it. Offered off-market to qualified buyers.',
    features: [
      'Gated island community',
      'Private roof terrace and plunge pool',
      'Bulgari Marina and Resort access',
      'Beach club membership',
      'Basement with gym and cinema',
    ],
    images: [
      img.villaPoolAlt,
      img.livingWarm,
      img.resortPool,
      img.livingStair,
    ],
  },
  {
    id: 'p06',
    slug: 'business-bay-loft',
    title: 'Canal Loft',
    community: 'Business Bay',
    city: 'Dubai',
    listing: 'rent',
    price: 21500,
    period: 'month',
    currency: 'AED',
    beds: 2,
    baths: 3,
    area: 1780,
    type: 'Loft',
    status: 'Available now',
    tagline: 'Double height, canal side, walk to work.',
    description:
      'A double-height loft facing the water, with a mezzanine study and a terrace that catches the last of the afternoon. Short and long leases considered.',
    features: [
      'Five-metre ceilings',
      'Mezzanine study',
      'Canal-facing terrace',
      'Flexible lease terms',
      'Concierge and valet',
    ],
    images: [
      img.livingStair,
      img.lounge,
      img.cityNight,
      img.livingBlue,
    ],
  },
  {
    id: 'p07',
    slug: 'creek-harbour-tower-residence',
    title: 'Creek Tower Residence',
    community: 'Dubai Creek Harbour',
    city: 'Dubai',
    listing: 'buy',
    price: 4950000,
    currency: 'AED',
    beds: 2,
    baths: 3,
    area: 1420,
    type: 'Apartment',
    status: 'Off-plan',
    handover: 'Q4 2027',
    tagline: 'Buy the skyline before it is finished.',
    description:
      'An early-release two-bedroom in the next Creek Harbour phase, positioned for the handover wave rather than against it. Payment plan structured 60/40 with the balance on completion.',
    features: [
      'Skyline and creek outlook',
      '60/40 payment plan',
      'Handover Q4 2027',
      'Podium pool and clubhouse',
      'Projected 7.1% gross yield',
    ],
    images: [
      img.cityDawn,
      img.cityNight,
      img.bedroom,
      img.lounge,
    ],
  },
  {
    id: 'p08',
    slug: 'arabian-ranches-family-villa',
    title: 'Family Villa, The Ranches',
    community: 'Arabian Ranches',
    city: 'Dubai',
    listing: 'rent',
    price: 465000,
    period: 'year',
    currency: 'AED',
    beds: 5,
    baths: 6,
    area: 5400,
    type: 'Villa',
    status: 'Available Sept',
    tagline: 'Schools, lawns, and a street children can cycle down.',
    description:
      'A five-bedroom on a landscaped corner plot backing onto the park. Upgraded kitchen, converted study and a pool added in 2023. The house families stay in for a decade.',
    features: [
      'Corner plot backing the park',
      'Private pool and mature garden',
      'Walk to school and community centre',
      'Maid and driver rooms',
      'Landlord flexible on payments',
    ],
    images: [
      img.villaPalms,
      img.villaPoolAlt,
      img.villaTimber,
      img.livingBlue,
    ],
  },
  {
    id: 'p09',
    slug: 'city-walk-duplex',
    title: 'City Walk Duplex',
    community: 'City Walk',
    city: 'Dubai',
    listing: 'buy',
    price: 12750000,
    currency: 'AED',
    beds: 3,
    baths: 4,
    area: 3350,
    type: 'Duplex',
    status: 'Ready',
    tagline: 'A townhouse plan, in the middle of the city.',
    description:
      'A duplex laid out like a house - bedrooms above, living below, a private stair between - dropped into the most walkable district in Dubai.',
    features: [
      'Duplex layout with private stair',
      'Two terraces',
      'Boulevard and pool aspect',
      'Rooftop residents lounge',
      'Vacant on transfer',
    ],
    images: [
      img.lounge,
      img.livingBlue,
      img.villaTimber,
      img.bedroom,
    ],
  },
  {
    id: 'p10',
    slug: 'bluewaters-sea-apartment',
    title: 'Sea-Facing Apartment',
    community: 'Bluewaters Island',
    city: 'Dubai',
    listing: 'rent',
    price: 295000,
    period: 'year',
    currency: 'AED',
    beds: 2,
    baths: 3,
    area: 1580,
    type: 'Apartment',
    status: 'Available now',
    tagline: 'Open water from the sofa, Ain Dubai from the bed.',
    description:
      'A furnished two-bedroom on the sea side of Bluewaters, with a wide terrace and nothing between you and the horizon. Beach access at the end of the building.',
    features: [
      'Unobstructed sea view',
      'Fully furnished',
      'Direct beach access',
      'Island retail and dining below',
      'Twelve-month lease, single cheque'
    ],
    images: [
      img.interiorPoolView,
      img.resortPool,
      img.bedroom,
      img.livingBlue,
    ],
  },
  {
    id: 'p11',
    slug: 'district-one-lagoon-villa',
    title: 'Lagoon Villa',
    community: 'District One, MBR City',
    city: 'Dubai',
    listing: 'buy',
    price: 21500000,
    currency: 'AED',
    beds: 5,
    baths: 6,
    area: 7900,
    type: 'Villa',
    status: 'Ready',
    tagline: 'Crystal lagoon at the end of the garden.',
    description:
      'Contemporary Mediterranean on the lagoon edge, ten minutes from Downtown and yet entirely residential. Swimmable water, a white sand beach and a boardwalk that runs seven kilometres.',
    features: [
      'Direct crystal lagoon frontage',
      'Basement entertainment level',
      'Outdoor kitchen and majlis',
      'Gated with 24h security',
      'Ten minutes to Downtown',
    ],
    images: [
      img.resortPool,
      img.villaPool,
      img.interiorPoolView,
      img.livingWarm,
    ],
  },
  {
    id: 'p12',
    slug: 'difc-executive-residence',
    title: 'Executive Residence, DIFC',
    community: 'DIFC',
    city: 'Dubai',
    listing: 'rent',
    price: 18500,
    period: 'month',
    currency: 'AED',
    beds: 1,
    baths: 2,
    area: 1120,
    type: 'Serviced Apartment',
    status: 'Available now',
    tagline: 'Serviced, central, and ready on Monday.',
    description:
      'A serviced one-bedroom in the financial district for the executive who wants the commute measured in minutes. Housekeeping, gym and lounge included; bills settled monthly.',
    features: [
      'Fully serviced with housekeeping',
      'Bills and wifi included',
      'Gate Avenue on the doorstep',
      'Monthly rolling terms',
      'Residents lounge and gym',
    ],
    images: [
      img.bedroom,
      img.lounge,
      img.livingBlue,
      img.diningDark,
    ],
  },
]

export const communities = Array.from(new Set(properties.map((p) => p.community))).sort()

export function formatPrice(p: Property) {
  const n = new Intl.NumberFormat('en-AE', { maximumFractionDigits: 0 }).format(p.price)
  if (p.listing === 'rent') return `${p.currency} ${n}/${p.period === 'month' ? 'mo' : 'yr'}`
  return `${p.currency} ${n}`
}

export function shortPrice(p: Property) {
  const v = p.price
  const s = v >= 1_000_000 ? `${(v / 1_000_000).toFixed(v % 1_000_000 === 0 ? 0 : 1)}M` : `${Math.round(v / 1000)}K`
  return `${p.currency} ${s}${p.listing === 'rent' ? (p.period === 'month' ? '/mo' : '/yr') : ''}`
}

export const propertyTypes = Array.from(new Set(properties.map((p) => p.type))).sort()

/**
 * Budget brackets. Sale and rental prices live on completely different scales,
 * so the search console swaps the whole band list when the intent changes
 * rather than trying to make one set of numbers serve both.
 */
export type Band = { id: string; label: string; min: number; max: number }

export const priceBands: Record<Listing, Band[]> = {
  buy: [
    { id: 'any', label: 'Any budget', min: 0, max: Infinity },
    { id: 'u5', label: 'Up to AED 5M', min: 0, max: 5_000_000 },
    { id: '5-15', label: 'AED 5M - 15M', min: 5_000_000, max: 15_000_000 },
    { id: '15-35', label: 'AED 15M - 35M', min: 15_000_000, max: 35_000_000 },
    { id: '35+', label: 'AED 35M +', min: 35_000_000, max: Infinity },
  ],
  rent: [
    { id: 'any', label: 'Any budget', min: 0, max: Infinity },
    { id: 'u150', label: 'Up to AED 150k / yr', min: 0, max: 150_000 },
    { id: '150-300', label: 'AED 150k - 300k / yr', min: 150_000, max: 300_000 },
    { id: '300-500', label: 'AED 300k - 500k / yr', min: 300_000, max: 500_000 },
    { id: '500+', label: 'AED 500k + / yr', min: 500_000, max: Infinity },
  ],
}

/** Rent is quoted monthly or yearly; normalise before comparing to a band. */
export const annualisedPrice = (p: Property) =>
  p.listing === 'rent' && p.period === 'month' ? p.price * 12 : p.price

export type Criteria = {
  listing: Listing
  community: string
  type: string
  beds: string
  band: string
  status: string
}

export const emptyCriteria: Criteria = {
  listing: 'buy',
  community: 'all',
  type: 'all',
  beds: 'any',
  band: 'any',
  status: 'all',
}

export const STATUSES = ['all', 'Ready', 'Off-plan', 'Off-market'] as const

export function matches(p: Property, c: Criteria) {
  if (p.listing !== c.listing) return false
  if (c.community !== 'all' && p.community !== c.community) return false
  if (c.type !== 'all' && p.type !== c.type) return false
  if (c.beds !== 'any' && p.beds < Number(c.beds)) return false
  if (c.status !== 'all' && p.status !== c.status) return false

  const band = priceBands[c.listing].find((b) => b.id === c.band)
  if (band && band.id !== 'any') {
    const v = annualisedPrice(p)
    if (v < band.min || v > band.max) return false
  }
  return true
}
