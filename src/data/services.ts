import { img } from './images'

export type Service = {
  id: string
  index: string
  title: string
  short: string
  body: string
  points: string[]
  image: string
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
  },
  {
    id: 'sell',
    index: '02',
    title: 'Sell',
    short: 'Positioning & disposal',
    body: 'A property is a story before it is a listing. We build the narrative - photography, staging, pricing architecture - then take it to a qualified audience rather than an open one, so the asset is met at its true value.',
    points: [
      'Editorial photography & film',
      'Valuation & pricing strategy',
      'Qualified private buyer network',
      'Negotiation through to transfer',
    ],
    image: img.villaDusk,
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
  },
  {
    id: 'manage',
    index: '04',
    title: 'Manage',
    short: 'Property & portfolio care',
    body: 'Ownership from abroad should feel like ownership next door. We hold the keys, the contractors, the compliance calendar and the reporting. You hold the returns.',
    points: [
      'Full property management',
      'Maintenance & snagging',
      'Quarterly performance reporting',
      'Service charge oversight',
    ],
    image: img.livingStair,
  },
  {
    id: 'advisory',
    index: '05',
    title: 'Advisory',
    short: 'Strategy & market intelligence',
    body: 'The Dubai market moves in cycles, communities and handover waves. We read them for you - where value is forming, where it has already been priced in, and when patience outperforms action.',
    points: [
      'Market & community analysis',
      'Portfolio structuring',
      'Handover wave forecasting',
      'Residency & relocation advisory',
    ],
    image: img.cityNight,
  },
]
