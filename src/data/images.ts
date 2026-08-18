/**
 * Central image map.
 *
 * Every photograph on the site resolves through here so the whole library can
 * be swapped for HLG's own photography in one place. These are licence-free
 * Unsplash stand-ins, chosen and visually checked for subject accuracy - the
 * keys describe what the slot needs, not what the stock photo happens to be.
 */
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const img = {
  // --- Dubai / city ------------------------------------------------------
  cityDawn: u('1512453979798-5ea266f8880c'), // skyline at sunrise, Burj Khalifa
  cityNight: u('1526495124232-a04e1849168c'), // skyline at night, Sheikh Zayed Road
  coastAerial: u('1518684079-3c830dcef090'), // Burj Al Arab from the air
  coastBeach: u('1546412414-e1885259563a'), // Burj Al Arab from the beach

  // --- Residential exteriors --------------------------------------------
  villaPool: u('1613490493576-7fde63acd811'), // white modern villa, pool
  villaPoolAlt: u('1600596542815-ffad4c1539a9'), // modern villa, pool, terrace
  villaDusk: u('1600585154340-be6161a56a0c'), // modern house at dusk
  villaPalms: u('1512917774080-9991f1c4c750'), // villa with palms
  villaTimber: u('1600047509807-ba8f99d2cdde'), // timber-and-glass house
  resortPool: u('1571003123894-1f0594d2b5d9'), // resort pool at dusk

  // --- Interiors ---------------------------------------------------------
  livingWarm: u('1600607687939-ce8a6c25118c'),
  livingStair: u('1600566753086-00f18fb6b3ea'),
  lounge: u('1600210492486-724fe5c67fb0'),
  interiorPoolView: u('1600573472550-8090b5e0745e'),
  bedroom: u('1512918728675-ed5a9ecdebfd'),
  livingBlue: u('1493809842364-78817add7ffb'),
  diningDark: u('1600607687920-4e2a09cf159d'),
} as const

/** Wide crops for full-bleed mastheads. */
export const wide = (src: string) => src.replace('w=1600', 'w=2200')
