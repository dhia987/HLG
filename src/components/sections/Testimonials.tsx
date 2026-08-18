import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { EASE, EASE_CINE, inView } from '../../lib/motion'
import { Monogram } from '../brand/Monogram'

/** PLACEHOLDER TESTIMONIALS - replace with approved client quotes before launch. */
const QUOTES = [
  {
    q: 'They talked us out of the first two apartments we loved. The third one we still own, and it has done what they said it would.',
    n: 'H. Mercier',
    r: 'Investor, Geneva',
  },
  {
    q: 'We were relocating with two children and eleven days. HLG found the house, the school run and the paperwork. Nothing was left for us to chase.',
    n: 'A. & J. Whitfield',
    r: 'Relocation, London',
  },
  {
    q: 'The selling process felt closer to a private sale than a listing. Qualified viewings only, and above asking in nineteen days.',
    n: 'R. Al Suwaidi',
    r: 'Vendor, Palm Jumeirah',
  },
]

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1])

  const go = useCallback((step: number) => {
    setState(([i]) => [(i + step + QUOTES.length) % QUOTES.length, step])
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => go(1), 8000)
    return () => clearInterval(id)
  }, [go])

  const item = QUOTES[index]

  return (
    <section className="relative overflow-hidden border-b hairline bg-[#131315] section-y">
      <div className="chevron-field pointer-events-none absolute inset-0 opacity-30" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10vw] top-1/2 -translate-y-1/2"
        initial={{ opacity: 0, rotate: -8 }}
        whileInView={{ opacity: 0.04, rotate: 0 }}
        viewport={inView}
        transition={{ duration: 1.6, ease: EASE_CINE }}
      >
        <Monogram variant="white" className="h-[38vw] w-[38vw]" />
      </motion.div>

      <div className="shell-tight relative">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.7, ease: EASE }}
          className="eyebrow mb-12 flex items-center gap-3 text-[#B88D5B]"
        >
          <span className="h-1.5 w-1.5 rotate-45 bg-[#9C6625]" />
          In their words
        </motion.p>

        <motion.div
          className="min-h-[16rem] cursor-grab active:cursor-grabbing sm:min-h-[14rem]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(1)
            else if (info.offset.x > 60) go(-1)
          }}
          data-cursor="drag"
          data-cursor-label="Drag"
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={index}
              custom={dir}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <p className="font-display text-[clamp(1.35rem,3.1vw,2.5rem)] font-light leading-[1.24] tracking-[-0.03em] text-[#F5F3EF]/92">
                &ldquo;{item.q}&rdquo;
              </p>
              <footer className="mt-9 flex items-center gap-4">
                <span className="h-1.5 w-1.5 rotate-45 bg-[#9C6625]" />
                <span className="text-sm font-medium tracking-tight">{item.n}</span>
                <span className="text-[0.72rem] uppercase tracking-[0.18em] text-[#F5F3EF]/40">
                  {item.r}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </motion.div>

        <div className="mt-10 flex items-center gap-6 border-t hairline pt-7">
          <button
            onClick={() => go(-1)}
            data-cursor="link"
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border hairline transition-colors duration-500 hover:border-[#9C6625] hover:bg-[#9C6625]"
          >
            &#8592;
          </button>
          <button
            onClick={() => go(1)}
            data-cursor="link"
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border hairline transition-colors duration-500 hover:border-[#9C6625] hover:bg-[#9C6625]"
          >
            &#8594;
          </button>

          <div className="ml-auto flex items-center gap-3">
            {QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setState([i, i > index ? 1 : -1])}
                data-cursor="link"
                aria-label={`Testimonial ${i + 1}`}
                className="group h-6 py-2.5"
              >
                <span
                  className={`block h-px transition-all duration-700 ${
                    i === index ? 'w-10 bg-[#9C6625]' : 'w-5 bg-[#F5F3EF]/25'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
