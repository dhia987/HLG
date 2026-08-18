import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { EASE, EASE_CINE } from '../../lib/motion'
import { useReducedMotion } from '../../lib/hooks'
import { useSectionNav } from '../../lib/useSectionNav'
import { site } from '../../data/site'
import { img, wide } from '../../data/images'
import { CTA } from '../ui/Button'
import { MaskWords } from '../ui/Reveal'
import { Magnetic } from '../ui/Magnetic'
import { Logo } from '../brand/Logo'

const FRAMES = [
  { src: wide(img.cityDawn), caption: 'Downtown Dubai' },
  { src: wide(img.coastAerial), caption: 'Jumeirah Coast' },
  { src: wide(img.cityNight), caption: 'Sheikh Zayed Road' },
  { src: wide(img.villaDusk), caption: 'Private Residences' },
]

/**
 * Home masthead. The full lockup leads - the first thing on screen names the
 * company - with the tagline beneath it and a slow four-frame cross-dissolve of
 * the city behind. Each frame eases out of an over-scale across six seconds,
 * long enough to read as film rather than as a slideshow.
 */
export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { goTo } = useSectionNav()
  const [frame, setFrame] = useState(0)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '26%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const contentFade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 6200)
    return () => clearInterval(id)
  }, [reduced])

  // Copy waits for the intro curtain so the two never animate over each other.
  const d = ready ? 0.1 : 0.45

  return (
    <section
      id="home"
      ref={ref}
      className="noise relative flex h-[100svh] min-h-[660px] flex-col justify-end overflow-hidden"
    >
      {/* cinematic backplate */}
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: bgY }}>
        <AnimatePresence initial={false}>
          <motion.img
            key={frame}
            src={FRAMES[frame].src}
            alt=""
            className="absolute inset-0 h-[120%] w-full object-cover"
            initial={{ opacity: 0, scale: 1.16 }}
            animate={{ opacity: 1, scale: 1.03 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{
              opacity: { duration: 1.8, ease: EASE_CINE },
              scale: { duration: 7.4, ease: 'linear' },
            }}
          />
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/45 to-[#1C1C1E]/65" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1E]/80 via-[#1C1C1E]/20 to-transparent" />

      <motion.div
        className="shell relative pb-14 md:pb-16"
        style={reduced ? undefined : { y: contentY, opacity: contentFade }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: d }}
          className="eyebrow mb-8 flex flex-wrap items-center gap-3 text-[#B88D5B]"
        >
          <span className="h-1.5 w-1.5 rotate-45 bg-[#9C6625]" />
          {site.legalName}
          <span className="h-1 w-1 rotate-45 bg-[#9C6625]/60" />
          {site.city}, {site.country}
        </motion.p>

        {/* The lockup itself is the headline - it is the fastest way to say
            whose website this is, and the guideline allows it at full colour
            over photography (p.07). */}
        <h1 className="sr-only">
          {site.name} &mdash; {site.tagline}
        </h1>

        <div className="line-mask mb-9 md:mb-11">
          <motion.div
            initial={{ y: '108%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.25, ease: EASE, delay: d + 0.12 }}
          >
            <Logo
              variant="white"
              className="h-auto w-[min(86vw,640px)] drop-shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
            />
          </motion.div>
        </div>

        <p className="display-md">
          <MaskWords text="The Key to Your" playOnMount delay={d + 0.5} className="text-[#F5F3EF]" />
          <br />
          <MaskWords
            text="Next Chapter"
            wordClassName="text-bronze-grad"
            playOnMount
            delay={d + 0.66}
          />
        </p>

        <div className="mt-10 flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: d + 0.9 }}
            className="body-lg max-w-md text-[#F5F3EF]/70"
          >
            A {site.city} real estate house for buying, selling and renting exceptional
            property &mdash; built on judgement, discretion and long relationships.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: d + 1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <CTA onClick={() => goTo('properties')} tone="bronze">
              Explore properties
            </CTA>
            <CTA onClick={() => goTo('contact')} tone="ghost" magnetic={false}>
              Speak to an advisor
            </CTA>
          </motion.div>
        </div>
      </motion.div>

      {/* footer rail: scroll cue + live frame caption */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: d + 1.15 }}
        className="shell relative flex items-center justify-between border-t hairline py-5"
      >
        <Magnetic strength={0.3}>
          <button
            onClick={() => goTo('about')}
            data-cursor="link"
            className="group flex items-center gap-4"
            aria-label="Scroll to About"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border hairline transition-colors duration-500 group-hover:border-[#9C6625]">
              <motion.span
                className="text-[#B88D5B]"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                &#8595;
              </motion.span>
            </span>
            <span className="eyebrow text-[#F5F3EF]/50">Scroll</span>
          </button>
        </Magnetic>

        <div className="flex items-center gap-6">
          <AnimatePresence mode="wait">
            <motion.span
              key={frame}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="eyebrow text-[#F5F3EF]/50"
            >
              {FRAMES[frame].caption}
            </motion.span>
          </AnimatePresence>
          <div className="hidden items-center gap-1.5 sm:flex">
            {FRAMES.map((f, i) => (
              <button
                key={f.caption}
                onClick={() => setFrame(i)}
                data-cursor="link"
                aria-label={`Show ${f.caption}`}
                className="h-6 w-6 p-2"
              >
                <span
                  className={`block h-full w-full rotate-45 transition-colors duration-500 ${
                    i === frame ? 'bg-[#9C6625]' : 'bg-[#F5F3EF]/25'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
