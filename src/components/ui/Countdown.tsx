import { useEffect, useState } from 'react'
import { launch, site } from '../../data/site'

export type LaunchStatus = 'unannounced' | 'counting' | 'open'

type Parts = { days: number; hours: number; mins: number; secs: number }

const ZERO: Parts = { days: 0, hours: 0, mins: 0, secs: 0 }

/**
 * Placeholder glyph for a cell with no number in it yet.
 *
 * Not zeros - a row of 00s reads as a countdown that has already finished.
 * The two dashes are held apart by a thin space; butted together at this
 * weight they merge into a single rule and start to look like a redaction
 * rather than two empty digit slots.
 */
const DASH = '\u2013\u2009\u2013'

function split(ms: number): Parts {
  const s = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor(s / 3600) % 24,
    mins: Math.floor(s / 60) % 60,
    secs: s % 60,
  }
}

/**
 * The launch clock, read from the single `launch` record in data/site.ts.
 *
 * Three states, all of them designed rather than accidental:
 *   unannounced - no date set; the marker keeps its shape and shows dashes
 *   counting    - ticking down to the announced moment
 *   open        - the moment has passed; every marker switches itself over
 *
 * The interval stops itself the second it reaches zero, so an opened site is
 * not re-rendering once a second forever.
 */
export function useCountdown(): { status: LaunchStatus; parts: Parts } {
  const parsed = launch.date ? new Date(launch.date).getTime() : NaN
  const target = Number.isFinite(parsed) ? parsed : null

  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (target === null) return
    const id = window.setInterval(() => {
      const t = Date.now()
      setNow(t)
      if (t >= target) window.clearInterval(id)
    }, 1000)
    return () => window.clearInterval(id)
  }, [target])

  if (target === null) return { status: 'unannounced', parts: ZERO }
  const remaining = target - now
  if (remaining <= 0) return { status: 'open', parts: ZERO }
  return { status: 'counting', parts: split(remaining) }
}

/**
 * The status on its own, without subscribing to the tick. Prose that states
 * the date rather than counting to it has no reason to re-render every second.
 */
export function launchStatus(): LaunchStatus {
  const parsed = launch.date ? new Date(launch.date).getTime() : NaN
  if (!Number.isFinite(parsed)) return 'unannounced'
  return Date.now() >= parsed ? 'open' : 'counting'
}

/** One prose line about the opening, for cards and directories. */
export function launchLine(status: LaunchStatus): string {
  if (status === 'open') return `${site.name} is open.`
  if (status === 'counting' && launch.label) return launch.label
  return 'Date to be announced'
}

function Cell({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex-1 border-l hairline px-3 first:border-l-0 first:pl-0 sm:px-5">
      <p className="brand-type tabular-nums leading-none text-[#F5F3EF] text-[clamp(1.5rem,2.6vw,2.15rem)]">
        {value}
      </p>
      <p className="eyebrow mt-2.5 text-[#F5F3EF]/35">{label}</p>
    </div>
  )
}

/**
 * The hero's launch marker. Numerals are set in Nunito - the monogram face,
 * which the design system reserves for numerals and brand moments - so the
 * date reads as part of the identity rather than as a widget.
 *
 * The ticking figures are hidden from assistive tech and replaced by one
 * static sentence; a live region updating every second is unusable.
 */
export function LaunchMarker({ className = '' }: { className?: string }) {
  const { status, parts } = useCountdown()
  const pad = (n: number) => String(n).padStart(2, '0')
  const counting = status === 'counting'

  if (status === 'open') {
    return (
      <div className={`border-t hairline pt-7 ${className}`}>
        <p className="eyebrow mb-4 flex items-center gap-3 text-[#B88D5B]">
          <span className="h-1.5 w-1.5 rotate-45 bg-[#9C6625]" />
          The doors are open
        </p>
        <p className="display-sm">{site.name} is trading in {site.city}.</p>
      </div>
    )
  }

  return (
    <div className={`border-t hairline pt-7 ${className}`}>
      <p className="eyebrow mb-6 flex items-center gap-3 text-[#B88D5B]">
        <span className="h-1.5 w-1.5 rotate-45 bg-[#9C6625]" />
        Doors open
      </p>

      <div className="flex items-start" aria-hidden="true">
        <Cell value={counting ? String(parts.days) : DASH} label="Days" />
        <Cell value={counting ? pad(parts.hours) : DASH} label="Hrs" />
        <Cell value={counting ? pad(parts.mins) : DASH} label="Min" />
        <Cell value={counting ? pad(parts.secs) : DASH} label="Sec" />
      </div>

      <p className="mt-6 text-[0.72rem] font-light uppercase tracking-[0.2em] text-[#F5F3EF]/40">
        {launchLine(status)}
      </p>

      <p className="sr-only">
        {counting
          ? `${site.name} opens in ${parts.days} days. ${launchLine(status)}.`
          : `${site.name} has not opened yet. The opening date is still to be announced.`}
      </p>
    </div>
  )
}
