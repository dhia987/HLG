import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { EASE, inView } from '../../lib/motion'
import {
  communities,
  priceBands,
  properties,
  propertyTypes,
  type Listing,
} from '../../data/properties'
import { useSearch } from '../../lib/SearchContext'
import { PropertyCard } from './PropertyCard'
import { FeaturedRail } from './FeaturedRail'
import { SectionHeading } from './SectionHeading'
import { CTA } from '../ui/Button'
import { useSectionNav } from '../../lib/useSectionNav'

type Sort = 'featured' | 'price-desc' | 'price-asc' | 'area-desc'

const TABS: { id: Listing; label: string }[] = [
  { id: 'buy', label: 'Buy' },
  { id: 'rent', label: 'Rent' },
]

const SORTS: { id: Sort; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-desc', label: 'Price high to low' },
  { id: 'price-asc', label: 'Price low to high' },
  { id: 'area-desc', label: 'Largest' },
]

/* A bronze chevron is painted in as a background image, since `appearance-none`
   removes the native one. Tracking is tightened at small sizes so labels such
   as "All communities" are not clipped by the select's own truncation. */
const selectCls =
  'w-full appearance-none rounded-full border hairline bg-transparent bg-[length:9px] bg-[right_1.1rem_center] bg-no-repeat py-3 pl-4 pr-9 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-[#F5F3EF]/80 outline-none transition-colors duration-500 hover:border-[#9C6625] focus:border-[#9C6625] sm:pl-5 sm:text-[0.72rem] sm:tracking-[0.14em] [&>option]:bg-[#1C1C1E] [&>option]:tracking-normal'

const selectArrow = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='6' viewBox='0 0 9 6'%3E%3Cpath d='M1 1l3.5 3.5L8 1' fill='none' stroke='%23B88D5B' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E\")",
}

export function PropertiesSection() {
  const { goTo } = useSectionNav()
  // Shared with the Buy/Sell/Rent console, so arriving from a search lands
  // here with the rail already showing the brief that was set upstairs.
  const { criteria, setCriterion, resetCriteria, results } = useSearch()
  const [sort, setSort] = useState<Sort>('featured')

  const sorted = useMemo(
    () =>
      [...results].sort((a, b) => {
        switch (sort) {
          case 'price-desc':
            return b.price - a.price
          case 'price-asc':
            return a.price - b.price
          case 'area-desc':
            return b.area - a.area
          default:
            return Number(Boolean(b.featured)) - Number(Boolean(a.featured))
        }
      }),
    [results, sort],
  )

  const dirty =
    criteria.community !== 'all' ||
    criteria.type !== 'all' ||
    criteria.beds !== 'any' ||
    criteria.band !== 'any' ||
    criteria.status !== 'all' ||
    sort !== 'featured'

  const reset = () => {
    resetCriteria()
    setSort('featured')
  }

  const total = properties.filter((p) => p.listing === criteria.listing).length

  return (
    <section id="properties" className="scroll-mt-24">
      {/* the cinematic rail comes first - it sets the tone before the tooling */}
      <FeaturedRail />

      <div className="border-b hairline section-y">
        <div className="shell">
          <SectionHeading
            eyebrow="Buy &amp; Rent"
            lines={['The full', <span className="text-bronze-grad">portfolio.</span>]}
            aside={
              <p className="body-lg text-[#F5F3EF]/60 lg:pb-3">
                A deliberately short list. Every address below has been walked, questioned and
                priced by someone on our team.
              </p>
            }
          />

          {/* filter rail */}
          <div className="mt-14 flex flex-col gap-4 border-y hairline py-4 lg:flex-row lg:items-center lg:justify-between">
            <LayoutGroup id="listing-tabs">
              <div className="flex items-center gap-1 self-start rounded-full border hairline p-1">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setCriterion('listing', t.id)}
                    data-cursor="link"
                    aria-pressed={criteria.listing === t.id}
                    className="relative rounded-full px-7 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500"
                  >
                    {criteria.listing === t.id && (
                      <motion.span
                        layoutId="tab-pill"
                        className="absolute inset-0 rounded-full bg-[#9C6625]"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        criteria.listing === t.id ? 'text-[#F5F3EF]' : 'text-[#F5F3EF]/55'
                      }`}
                    >
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </LayoutGroup>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:w-auto lg:grid-cols-5">
              <label className="sr-only" htmlFor="f-community">
                Community
              </label>
              <select
                id="f-community"
                value={criteria.community}
                onChange={(e) => setCriterion('community', e.target.value)}
                className={selectCls}
                style={selectArrow}
                data-cursor="link"
              >
                <option value="all">All communities</option>
                {communities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <label className="sr-only" htmlFor="f-type">
                Property type
              </label>
              <select
                id="f-type"
                value={criteria.type}
                onChange={(e) => setCriterion('type', e.target.value)}
                className={selectCls}
                style={selectArrow}
                data-cursor="link"
              >
                <option value="all">Any type</option>
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <label className="sr-only" htmlFor="f-beds">
                Bedrooms
              </label>
              <select
                id="f-beds"
                value={criteria.beds}
                onChange={(e) => setCriterion('beds', e.target.value)}
                className={selectCls}
                style={selectArrow}
                data-cursor="link"
              >
                <option value="any">Any beds</option>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}+ beds
                  </option>
                ))}
              </select>

              <label className="sr-only" htmlFor="f-band">
                Budget
              </label>
              <select
                id="f-band"
                value={criteria.band}
                onChange={(e) => setCriterion('band', e.target.value)}
                className={selectCls}
                style={selectArrow}
                data-cursor="link"
              >
                {priceBands[criteria.listing].map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>

              <label className="sr-only" htmlFor="f-sort">
                Sort
              </label>
              <select
                id="f-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className={`${selectCls} col-span-2 sm:col-span-3 lg:col-span-1`}
                style={selectArrow}
                data-cursor="link"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-10 mt-6 flex items-baseline justify-between gap-6">
            <p className="eyebrow text-[#F5F3EF]/45">
              <motion.span
                key={sorted.length}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-block text-[#B88D5B]"
              >
                {String(sorted.length).padStart(2, '0')}
              </motion.span>{' '}
              of {String(total).padStart(2, '0')} {criteria.listing === 'buy' ? 'for sale' : 'to rent'}
            </p>
            {dirty && (
              <button
                onClick={reset}
                data-cursor="link"
                className="link-underline eyebrow shrink-0 text-[#F5F3EF]/45"
              >
                Clear filters
              </button>
            )}
          </div>

          {sorted.length > 0 ? (
            <motion.div layout className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {sorted.map((p, i) => (
                  <PropertyCard key={p.id} p={p} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex flex-col items-start gap-7 border hairline px-8 py-16 md:items-center md:text-center"
            >
              <span className="h-2 w-2 rotate-45 bg-[#9C6625]" />
              <h3 className="display-sm max-w-md">
                Nothing on the shelf matches that &mdash; which does not mean it does not exist.
              </h3>
              <p className="body-base max-w-md text-[#F5F3EF]/55">
                A meaningful share of what we transact never reaches this page. Tell us the brief
                and we will go and look.
              </p>
              <div className="flex flex-wrap gap-4">
                <CTA onClick={() => goTo('contact')} tone="bronze">
                  Send us the brief
                </CTA>
                <CTA onClick={reset} tone="ghost" magnetic={false}>
                  Clear filters
                </CTA>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* off-market note */}
      <div className="border-b hairline bg-[#131315] py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.8, ease: EASE }}
          className="shell flex flex-col items-start justify-between gap-8 md:p-0 lg:flex-row lg:items-center"
        >
          <div>
            <p className="eyebrow mb-4 text-[#B88D5B]">Off-market</p>
            <h3 className="display-sm max-w-lg">
              Roughly a third of what we sell is never listed anywhere.
            </h3>
          </div>
          <CTA onClick={() => goTo('contact')} tone="bronze">
            Request the private list
          </CTA>
        </motion.div>
      </div>
    </section>
  )
}
