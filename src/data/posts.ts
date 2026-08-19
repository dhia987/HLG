import { img } from './images'

/**
 * PLACEHOLDER JOURNAL.
 *
 * Demonstration articles so the section can be reviewed end to end. Replace
 * with real posts, or point this module at a CMS - the exported `Post` type is
 * the shape the UI consumes. `body` is used by the reading overlay.
 */
export type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: 'Market' | 'Guide' | 'Community' | 'Investment'
  date: string
  readTime: string
  image: string
  author: string
  body: string[]
  featured?: boolean
}

export const posts: Post[] = [
  {
    id: 'b1',
    slug: 'reading-the-handover-wave',
    title: 'Reading the handover wave',
    excerpt:
      'Forty thousand units are scheduled to complete over the next eighteen months. Where that pressure lands is not evenly distributed - and it is knowable in advance.',
    category: 'Market',
    date: '2026-07-14',
    readTime: '6 min',
    image: img.cityDawn,
    author: 'Sofia Marchetti',
    body: [
      'Every Dubai cycle is shaped less by demand than by the timing of supply. A community absorbs its first handover wave comfortably, its second with some friction, and its third only if the population has caught up. Read the completion calendar and you have read most of the next two years.',
      'The mistake is treating "Dubai" as one market. Downtown and Creek Harbour are on entirely different curves; so are Jumeirah Village Circle and Emirates Hills. We track handovers by community rather than by emirate, because that is the level at which the pressure actually shows up in rents.',
      'What this means in practice: if you are buying to hold, buy into the tail of a wave rather than the front of one. If you are buying to flip, you are not buying, you are trading, and the numbers need to survive a six-month delay.',
    ],
    featured: true,
  },
  {
    id: 'b2',
    slug: 'what-a-service-charge-really-costs',
    title: 'What a service charge really costs you',
    excerpt:
      'The headline yield is the easy number. The one that decides whether you are happy in year four sits in the service charge schedule nobody reads.',
    category: 'Guide',
    date: '2026-06-28',
    readTime: '5 min',
    image: img.livingStair,
    author: 'Adrien Laurent',
    body: [
      'A building with a pool, a gym, a concierge and a chilled water plant costs more to run than one without. That is obvious. What is less obvious is how much of that cost is fixed against your square footage regardless of whether you ever use any of it.',
      'We model service charge as a percentage of gross rent before we recommend anything. Twelve percent is normal. Twenty percent happens more often than buyers expect, and it quietly converts a seven percent gross yield into something closer to five.',
      'Ask for the last three years of the schedule, not just the current one. The trend matters more than the number.',
    ],
  },
  {
    id: 'b3',
    slug: 'off-plan-or-ready',
    title: 'Off-plan or ready: the honest comparison',
    excerpt:
      'Payment plans make off-plan feel cheaper than it is. Here is the arithmetic we run before recommending either.',
    category: 'Investment',
    date: '2026-06-09',
    readTime: '7 min',
    image: img.villaDusk,
    author: 'Sofia Marchetti',
    body: [
      'Off-plan buys you a payment plan and a discount to the ready market. It costs you time, construction risk and the rental income you would otherwise have been collecting. Whether that trade is worth taking depends almost entirely on your horizon.',
      'Under three years, ready almost always wins once you account for the rent foregone. Over seven, a well-selected off-plan position in a maturing community usually wins. In between, it is a genuine coin toss and we say so.',
      'The one thing we will not do is recommend off-plan because the commission is better. It usually is. That is precisely why the advice has to be structured to ignore it.',
    ],
  },
  {
    id: 'b4',
    slug: 'living-in-palm-jumeirah',
    title: 'Living on the Palm, honestly',
    excerpt:
      'It is the most photographed address in the city. It is also a single road in and out. Both things are true.',
    category: 'Community',
    date: '2026-05-22',
    readTime: '6 min',
    image: img.resortPool,
    author: 'Yasmine Haddad',
    body: [
      'The Palm delivers something almost nothing else in Dubai can: private beach, low density and a genuine sense of arrival. It also has one spine road, and at school run on a Sunday you will feel it.',
      'The fronds behave very differently from the crescent. Frond villas are family homes with neighbours; the crescent is hotels, branded residences and a different rhythm entirely. Buyers who confuse the two are usually the ones who resell within three years.',
      'We walk clients through at 8am and at 7pm before they offer. It is the single most useful hour of the process.',
    ],
  },
  {
    id: 'b5',
    slug: 'golden-visa-property-route',
    title: 'The Golden Visa property route, step by step',
    excerpt:
      'A two-million dirham qualifying property unlocks a ten-year residency. The paperwork is more forgiving than most people assume.',
    category: 'Guide',
    date: '2026-05-04',
    readTime: '8 min',
    image: img.coastBeach,
    author: 'Nadia Farouk',
    body: [
      'The threshold is two million dirhams of property value, and it can be met across more than one title deed. Mortgaged property qualifies provided the required equity is in place, which surprises a lot of buyers.',
      'The sequence is: transfer at the Dubai Land Department, obtain the title deed, apply through ICP or the DLD channel, medical, Emirates ID, stamping. Six to eight weeks end to end when nothing goes wrong.',
      'What goes wrong is almost always documentation from outside the UAE - attestations, translations, name mismatches across passports. We start that part before the transfer, not after.',
    ],
  },
  {
    id: 'b6',
    slug: 'when-not-to-sell',
    title: 'When not to sell',
    excerpt:
      'Half of the sell-side conversations we have end with the owner keeping the asset. That is a successful meeting.',
    category: 'Market',
    date: '2026-04-18',
    readTime: '4 min',
    image: img.interiorPoolView,
    author: 'Adrien Laurent',
    body: [
      'A property that is tenanted, well-managed and yielding above its community average is doing its job. Selling it because the market is up converts a compounding asset into cash that has to be redeployed - usually into something you know less well.',
      'The times it is right to sell: the community has structurally changed, the service charge has outgrown the rent, the capital is needed elsewhere, or the asset never fit the life it was bought for.',
      'None of those are "prices went up". That is a reason to check, not a reason to act.',
    ],
  },
]

export const formatPostDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
