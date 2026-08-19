import { motion } from 'motion/react'
import { useState } from 'react'
import { EASE, inView } from '../../lib/motion'
import { site } from '../../data/site'
import { SectionHeading } from './SectionHeading'
import { CTA } from '../ui/Button'

const { lat, lng } = site.geo
const SPAN = 0.012

/**
 * OpenStreetMap needs no API key and no tracking cookie, which is why it is
 * here rather than Google Maps. Swap the iframe for a keyed Google/Mapbox embed
 * if the client wants Street View or their own styling.
 */
const EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${(lng - SPAN).toFixed(4)}%2C${(
  lat - SPAN / 1.6
).toFixed(4)}%2C${(lng + SPAN).toFixed(4)}%2C${(lat + SPAN / 1.6).toFixed(
  4,
)}&layer=mapnik&marker=${lat}%2C${lng}`

const DIRECTIONS = `https://www.openstreetmap.org/directions?to=${lat}%2C${lng}`

export function LocationSection() {
  const [loaded, setLoaded] = useState(false)

  return (
    <section id="location" className="scroll-mt-24 border-b hairline section-y">
      <div className="shell">
        <SectionHeading
          eyebrow="Find us"
          lines={['Business Bay,', <span className="text-bronze-grad">Dubai.</span>]}
          aside={
            <p className="body-lg text-[#F5F3EF]/60 lg:pb-3">
              The office is a five-minute drive from Downtown and ten from the Marina road.
              Viewings usually start here with coffee and a map.
            </p>
          }
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
          {/* map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative aspect-[16/10] overflow-hidden border hairline bg-[#131315] lg:aspect-auto lg:min-h-[520px]"
          >
            {/* The OSM tiles are light. Inverting and rotating the hue lands them
                in the site's anthracite range without shipping a tile server. */}
            <iframe
              title={`Map showing ${site.name} in ${site.address}`}
              src={EMBED}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              className="h-full w-full border-0 grayscale-[0.35] invert-[0.92] hue-rotate-180 saturate-[0.55] transition-opacity duration-1000"
              style={{ opacity: loaded ? 1 : 0 }}
            />

            {/* bronze wash so the map sits inside the palette rather than beside it */}
            <div className="pointer-events-none absolute inset-0 bg-[#9C6625] mix-blend-overlay opacity-[0.10]" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#F5F3EF]/10" />

            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="eyebrow text-[#F5F3EF]/30">Loading map</span>
              </div>
            )}

            {/* corner plate */}
            <div className="pointer-events-none absolute bottom-5 left-5 border hairline bg-[#1C1C1E]/90 px-5 py-4 backdrop-blur-md">
              <p className="eyebrow mb-2 text-[#B88D5B]">{site.name}</p>
              <p className="text-sm font-light text-[#F5F3EF]/80">{site.address}</p>
            </div>
          </motion.div>

          {/* details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
            className="relative overflow-hidden border hairline bg-[#131315] p-9 md:p-11"
          >
            <div className="chevron-field pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative flex h-full flex-col">
              <dl className="space-y-8">
                <div>
                  <dt className="eyebrow mb-3 text-[#B88D5B]">Office</dt>
                  <dd className="body-base text-[#F5F3EF]/75">{site.address}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-3 text-[#B88D5B]">Coordinates</dt>
                  <dd className="body-base tabular-nums text-[#F5F3EF]/75">
                    {lat.toFixed(4)}&deg; N, {lng.toFixed(4)}&deg; E
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-3 text-[#B88D5B]">Hours</dt>
                  <dd className="body-base text-[#F5F3EF]/75">
                    Sunday &ndash; Thursday, 9:00 &ndash; 19:00 GST
                    <br />
                    Saturday by appointment
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-3 text-[#B88D5B]">Parking</dt>
                  <dd className="body-base text-[#F5F3EF]/75">
                    Visitor bays in the basement, level B1. Tell reception you are with HLG.
                  </dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-col gap-3 border-t hairline pt-8">
                <CTA href={DIRECTIONS} tone="bronze" magnetic={false} className="w-full">
                  Get directions
                </CTA>
                <CTA href={site.whatsappHref} tone="ghost" magnetic={false} className="w-full">
                  Message before you come
                </CTA>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
