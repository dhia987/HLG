import { img } from './images'

export type Service = {
  id: 'buy' | 'sell' | 'rent'
  index: string
  title: string
  short: string
  body: string
  points: string[]
  image: string
  /** Label on the section CTA. */
  action: string
}

export const services: Service[] = [
  {
    id: 'buy',
    index: '01',
    title: 'Buy',
    short: 'Acquisition & investment',
    body: 'From a first Dubai address to a portfolio position, we source with intent - off-market where it counts, on-market where it wins. Every recommendation is underwritten by yield, handover risk and exit liquidity, never by inventory pressure.',
    points: [
      'Off-market & pre-launch access',
      'Yield and exit modelling',
      'Developer due diligence',
      'Golden Visa pathway guidance',
    ],
    image: img.villaPool,
    action: 'View properties',
  },
  {
    id: 'sell',
    index: '02',
    title: 'Sell',
    short: 'Positioning & disposal',
    body: 'A property is a story before it is a listing. We build the narrative - photography, staging, pricing architecture - then take it to a qualified audience rather than an open one, so the asset is met at its true value.',
    points: [
      'Same-week valuation',
      'Editorial photography & film',
      'Qualified private buyer network',
      'Negotiation through to DLD transfer',
    ],
    image: img.villaDusk,
    action: 'Request a valuation',
  },
  {
    id: 'rent',
    index: '03',
    title: 'Rent',
    short: 'Leasing, long & short',
    body: 'Whether you are landing in Dubai for a season or a decade, we match lifestyle to location first and paperwork second. Landlords get tenanted, compliant, well-kept assets. Residents get a home that already feels like theirs.',
    points: [
      'Long & short-term leasing',
      'Tenant vetting & referencing',
      'Ejari and contract handling',
      'Relocation & handover support',
    ],
    image: img.livingWarm,
    action: 'View properties',
  },
]
