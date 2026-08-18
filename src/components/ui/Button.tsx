import type { ReactNode } from 'react'
import { Magnetic } from './Magnetic'

type Tone = 'bronze' | 'light' | 'dark' | 'ghost'

const TONE: Record<Tone, string> = {
  bronze: 'bg-[#9C6625] text-[#F5F3EF] before:bg-[#B88D5B] border border-transparent',
  light:
    'bg-[#F5F3EF] text-[#1C1C1E] before:bg-[#B88D5B] border border-transparent hover:text-[#F5F3EF]',
  dark: 'bg-[#1C1C1E] text-[#F5F3EF] before:bg-[#9C6625] border border-transparent',
  ghost:
    'bg-transparent text-current before:bg-[#9C6625] border border-current/25 hover:text-[#F5F3EF] hover:border-transparent',
}

/**
 * The site's single call-to-action shape: a pill whose bronze fill wipes up
 * from the bottom edge while the label swaps on a vertical roll.
 */
export function CTA({
  children,
  href,
  onClick,
  tone = 'bronze',
  className = '',
  magnetic = true,
  type = 'button',
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  tone?: Tone
  className?: string
  magnetic?: boolean
  type?: 'button' | 'submit'
}) {
  const inner = (
    <span className="relative z-10 block overflow-hidden">
      <span className="block transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  )

  const cls = [
    'group relative inline-flex items-center justify-center overflow-hidden rounded-full',
    'px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] leading-none',
    'transition-colors duration-500',
    'before:absolute before:inset-0 before:z-0 before:translate-y-full before:rounded-full before:transition-transform before:duration-[650ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:before:translate-y-0',
    TONE[tone],
    className,
  ].join(' ')

  const el = href ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls} data-cursor="link">
      {inner}
    </a>
  ) : (
    <button type={type} onClick={onClick} className={cls} data-cursor="link">
      {inner}
    </button>
  )

  return magnetic ? <Magnetic className="inline-block">{el}</Magnetic> : el
}

/** Text link with an arrow that slides, used for tertiary navigation. */
export function ArrowLink({
  children,
  href,
  onClick,
  className = '',
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
}) {
  const content = (
    <>
      <span className="link-underline">{children}</span>
      <span className="relative ml-3 inline-block h-[1em] w-[1.1em] overflow-hidden align-middle">
        <span className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/al:translate-x-full">
          &#8594;
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/al:translate-x-0"
        >
          &#8594;
        </span>
      </span>
    </>
  )

  const cls = `group/al inline-flex items-center text-[0.72rem] font-medium uppercase tracking-[0.24em] ${className}`

  if (href)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls} data-cursor="link">
        {content}
      </a>
    )

  return (
    <button onClick={onClick} className={cls} data-cursor="link">
      {content}
    </button>
  )
}
