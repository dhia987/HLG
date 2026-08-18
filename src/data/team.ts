/**
 * PLACEHOLDER TEAM.
 * Names, roles, bios and portraits are stand-ins so the layout can be reviewed.
 * Replace every entry with the real HLG Real Estate team before launch.
 */
export type Member = {
  id: string
  name: string
  role: string
  bio: string
  languages: string
  image: string
  linkedin: string
}

export const team: Member[] = [
  {
    id: 'director',
    name: 'Adrien Laurent',
    role: 'Managing Director',
    bio: 'Fifteen years between European private banking and Gulf real estate. Adrien built HLG around a single conviction: advice you would give your own family, or none at all.',
    languages: 'English / French / Arabic',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
    linkedin: 'https://www.linkedin.com/company/hlgrealestate',
  },
  {
    id: 'sales',
    name: 'Yasmine Haddad',
    role: 'Head of Sales',
    bio: 'Closings across Palm Jumeirah, Downtown and Emirates Hills. Yasmine negotiates quietly and finishes decisively - most of her business arrives by referral.',
    languages: 'Arabic / English / French',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
    linkedin: 'https://www.linkedin.com/company/hlgrealestate',
  },
  {
    id: 'leasing',
    name: 'Daniel Reyes',
    role: 'Head of Leasing',
    bio: 'Daniel runs the leasing desk and the relocation programme. He has placed families from twenty-two countries and still answers his own phone.',
    languages: 'English / Spanish',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
    linkedin: 'https://www.linkedin.com/company/hlgrealestate',
  },
  {
    id: 'investment',
    name: 'Sofia Marchetti',
    role: 'Investment Advisory',
    bio: 'A fund analyst turned property strategist. Sofia builds the models behind every HLG recommendation - yield, absorption, handover risk, exit.',
    languages: 'Italian / English',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80',
    linkedin: 'https://www.linkedin.com/company/hlgrealestate',
  },
  {
    id: 'management',
    name: 'Omar Al Bakri',
    role: 'Property Management',
    bio: 'Omar keeps two hundred keys and a contractor list nobody else has. Owners abroad sleep well because he does not.',
    languages: 'Arabic / English / Hindi',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80',
    linkedin: 'https://www.linkedin.com/company/hlgrealestate',
  },
  {
    id: 'client',
    name: 'Nadia Farouk',
    role: 'Client Experience',
    bio: 'The first voice you hear and the last detail you forget about. Nadia holds the thread from first viewing through to handover day.',
    languages: 'English / Arabic / Russian',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80',
    linkedin: 'https://www.linkedin.com/company/hlgrealestate',
  },
]
