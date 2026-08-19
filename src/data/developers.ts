/**
 * PLACEHOLDER DEVELOPER LIST.
 *
 * These are the major Dubai master developers, listed as an illustration of
 * how the section reads. HLG must confirm which of them it actually holds a
 * brokerage relationship with before launch, and remove the rest - claiming an
 * unearned partnership is both a commercial and a legal problem. Logos are
 * deliberately not used: they are third-party trademarks and need written
 * permission.
 */
export type Developer = {
  id: string
  name: string
  /** Short, factual positioning line. */
  note: string
  /** Communities HLG transacts in for this developer. */
  communities: string[]
  /** Set true only for genuinely held relationships. */
  featured?: boolean
}

export const developers: Developer[] = [
  {
    id: 'emaar',
    name: 'Emaar',
    note: 'The master developer behind Downtown, Dubai Marina and Dubai Creek Harbour.',
    communities: ['Downtown Dubai', 'Dubai Creek Harbour', 'Dubai Hills Estate'],
    featured: true,
  },
  {
    id: 'nakheel',
    name: 'Nakheel',
    note: 'The islands. Palm Jumeirah, Jumeirah Islands and the Deira waterfront.',
    communities: ['Palm Jumeirah', 'Jumeirah Islands', 'The Gardens'],
    featured: true,
  },
  {
    id: 'meraas',
    name: 'Meraas',
    note: 'Lifestyle districts - City Walk, Bluewaters and Jumeirah Bay Island.',
    communities: ['City Walk', 'Bluewaters Island', 'Jumeirah Bay Island'],
    featured: true,
  },
  {
    id: 'damac',
    name: 'DAMAC',
    note: 'Branded residences and high-volume communities across the city.',
    communities: ['DAMAC Hills', 'Business Bay', 'DAMAC Lagoons'],
  },
  {
    id: 'sobha',
    name: 'Sobha Realty',
    note: 'Backward-integrated build quality, concentrated around Sobha Hartland.',
    communities: ['Sobha Hartland', 'MBR City'],
  },
  {
    id: 'omniyat',
    name: 'Omniyat',
    note: 'Ultra-prime, design-led towers on the Water Canal and Palm.',
    communities: ['Business Bay', 'Palm Jumeirah'],
  },
  {
    id: 'select',
    name: 'Select Group',
    note: 'Marina and Business Bay waterfront towers with a long delivery record.',
    communities: ['Dubai Marina', 'Business Bay'],
  },
  {
    id: 'ellington',
    name: 'Ellington Properties',
    note: 'Boutique, design-first residential across the mid-prime bracket.',
    communities: ['Jumeirah Village Circle', 'MBR City', 'Palm Jumeirah'],
  },
]
