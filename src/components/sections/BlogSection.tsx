import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { EASE, EASE_CINE, inView } from '../../lib/motion'
import { formatPostDate, posts, type Post } from '../../data/posts'
import { useScrollLock } from '../../lib/hooks'
import { SectionHeading } from './SectionHeading'
import { Unveil } from '../ui/Reveal'
import { CTA } from '../ui/Button'
import { Monogram } from '../brand/Monogram'
import { useSectionNav } from '../../lib/useSectionNav'

const CATEGORIES = ['All', 'Market', 'Guide', 'Investment', 'Community'] as const

/**
 * The journal. A lead story plus a filtered index; clicking any piece opens a
 * reading overlay rather than a route, which keeps the one-page structure and
 * returns you to the same place in the index on close.
 */
export function BlogSection() {
  const { goTo } = useSectionNav()
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('All')
  const [reading, setReading] = useState<Post | null>(null)

  const lead = posts.find((p) => p.featured) ?? posts[0]
  const rest = posts.filter((p) => p.id !== lead.id)
  const list = filter === 'All' ? rest : rest.filter((p) => p.category === filter)

  return (
    <section id="blog" className="scroll-mt-24 border-b hairline section-y">
      <div className="shell">
        <SectionHeading
          eyebrow="Journal"
          lines={['What we are', <span className="text-bronze-grad">watching.</span>]}
          aside={
            <p className="body-lg text-[#F5F3EF]/60 lg:pb-3">
              Market notes, buying guides and community write-ups &mdash; written by the people
              doing the deals, not by a content agency.
            </p>
          }
        />

        {/* lead story */}
        <motion.article
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.9, ease: EASE }}
          className="group mt-16"
        >
          <button
            onClick={() => setReading(lead)}
            data-cursor="view"
            data-cursor-label="Read"
            className="grid w-full gap-10 text-left lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#232326]">
              <Unveil className="absolute inset-0" tone="#232326">
                <img
                  src={lead.image}
                  alt={lead.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
              </Unveil>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1C1E]/60 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full bg-[#9C6625] px-3.5 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.2em]">
                Latest
              </span>
            </div>

            <div>
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <span className="eyebrow text-[#B88D5B]">{lead.category}</span>
                <span className="h-1 w-1 rotate-45 bg-[#9C6625]" />
                <span className="eyebrow text-[#F5F3EF]/40">{formatPostDate(lead.date)}</span>
                <span className="h-1 w-1 rotate-45 bg-[#9C6625]" />
                <span className="eyebrow text-[#F5F3EF]/40">{lead.readTime}</span>
              </div>
              <h3 className="display-md mb-6 transition-colors duration-500 group-hover:text-[#B88D5B]">
                {lead.title}
              </h3>
              <p className="body-lg mb-8 max-w-xl text-[#F5F3EF]/60">{lead.excerpt}</p>
              <span className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-[#B88D5B]">
                Read the piece
                <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
                  &#8594;
                </span>
              </span>
            </div>
          </button>
        </motion.article>

        {/* filter */}
        <div className="mt-20 flex flex-wrap items-center gap-2.5 border-y hairline py-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              data-cursor="link"
              aria-pressed={filter === c}
              className={`rounded-full border px-5 py-2.5 text-[0.66rem] font-medium uppercase tracking-[0.16em] transition-colors duration-500 ${
                filter === c
                  ? 'border-[#9C6625] bg-[#9C6625] text-[#F5F3EF]'
                  : 'hairline text-[#F5F3EF]/55 hover:border-[#9C6625]'
              }`}
            >
              {c}
            </button>
          ))}
          <span className="ml-auto eyebrow hidden text-[#F5F3EF]/35 sm:block">
            {String(list.length).padStart(2, '0')}{' '}
            {list.length === 1 ? 'Article' : 'Articles'}
          </span>
        </div>

        {/* index */}
        <motion.ul layout className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                viewport={inView}
                transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.08 }}
                className="group min-w-0"
              >
                <button
                  onClick={() => setReading(p)}
                  data-cursor="view"
                  data-cursor-label="Read"
                  className="block w-full text-left"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#232326]">
                    <Unveil className="absolute inset-0" delay={(i % 3) * 0.08} tone="#232326">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                      />
                    </Unveil>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1C1E]/70 to-transparent" />
                  </div>

                  <div className="pt-5">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="eyebrow text-[#B88D5B]">{p.category}</span>
                      <span className="h-1 w-1 rotate-45 bg-[#9C6625]" />
                      <span className="eyebrow text-[#F5F3EF]/35">{p.readTime}</span>
                    </div>
                    <h3 className="display-sm line-clamp-2 transition-colors duration-500 group-hover:text-[#B88D5B]">
                      {p.title}
                    </h3>
                    <p className="body-base mt-3 line-clamp-3 text-[#F5F3EF]/55">{p.excerpt}</p>
                    <div className="mt-5 h-px w-full bg-[#F5F3EF]/12">
                      <div className="h-full w-full origin-left scale-x-0 bg-[#9C6625] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                    </div>
                  </div>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-16 flex flex-col items-start justify-between gap-6 border-t hairline pt-10 sm:flex-row sm:items-center"
        >
          <p className="body-base max-w-md text-[#F5F3EF]/55">
            We send one market note a month. No listings, no filler.
          </p>
          <CTA onClick={() => goTo('contact')} tone="ghost">
            Join the list
          </CTA>
        </motion.div>
      </div>

      <ReadingPanel post={reading} onClose={() => setReading(null)} />
    </section>
  )
}

/** Full-screen reader, same pattern as the property panel. */
function ReadingPanel({ post, onClose }: { post: Post | null; onClose: () => void }) {
  useScrollLock(Boolean(post))

  useEffect(() => {
    if (!post) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [post, onClose])

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          className="fixed inset-0 z-[8500] overflow-y-auto overscroll-contain bg-[#1C1C1E]"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.85, ease: EASE_CINE }}
          role="dialog"
          aria-modal="true"
          aria-label={post.title}
        >
          <div className="glass sticky top-0 z-30 border-b hairline">
            <div className="shell flex items-center justify-between gap-6 py-4">
              <div className="flex min-w-0 items-center gap-4">
                <Monogram variant="white" className="h-6 w-6 shrink-0" />
                <span className="eyebrow truncate text-[#B88D5B]">{post.category}</span>
              </div>
              <button
                onClick={onClose}
                data-cursor="link"
                className="flex h-11 shrink-0 items-center gap-3 rounded-full border hairline px-5 transition-colors duration-500 hover:border-[#9C6625]"
              >
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute h-px w-4 rotate-45 bg-[#F5F3EF]" />
                  <span className="absolute h-px w-4 -rotate-45 bg-[#F5F3EF]" />
                </span>
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em]">
                  Close
                </span>
              </button>
            </div>
          </div>

          <header className="relative flex min-h-[58vh] flex-col justify-end overflow-hidden pt-24">
            <motion.img
              src={post.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.4, ease: EASE_CINE }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/50 to-[#1C1C1E]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1E]/70 via-transparent to-transparent" />

            <div className="shell-tight relative pb-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
                className="mb-6 flex flex-wrap items-center gap-4"
              >
                <span className="eyebrow text-[#B88D5B]">{formatPostDate(post.date)}</span>
                <span className="h-1 w-1 rotate-45 bg-[#9C6625]" />
                <span className="eyebrow text-[#F5F3EF]/50">{post.readTime} read</span>
              </motion.div>

              <h2 className="display-lg max-w-[20ch]">
                <span className="line-mask">
                  <motion.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.05, ease: EASE, delay: 0.35 }}
                  >
                    {post.title}
                  </motion.span>
                </span>
              </h2>
            </div>
          </header>

          <div className="section-y">
            <div className="shell-tight">
              <p className="body-lg mb-12 border-l-2 border-[#9C6625] pl-6 text-[#F5F3EF]/75">
                {post.excerpt}
              </p>

              <div className="space-y-7">
                {post.body.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={inView}
                    transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
                    className="body-lg text-[#F5F3EF]/65"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              <div className="mt-14 flex items-center gap-4 border-t hairline pt-8">
                <span className="h-1.5 w-1.5 rotate-45 bg-[#9C6625]" />
                <span className="text-sm font-medium tracking-tight">{post.author}</span>
                <span className="eyebrow text-[#F5F3EF]/35">HLG Real Estate</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
