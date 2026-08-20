import type { ReactNode } from 'react'

/**
 * Social marks, drawn rather than pulled from an icon package — four glyphs is
 * not worth a dependency, and hand-drawn keeps the stroke weight consistent
 * with the rest of the site's iconography.
 */
const PATHS: Record<string, ReactNode> = {
  LinkedIn: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.6" cy="7.9" r="1.15" fill="currentColor" />
      <path
        d="M6.6 10.9v6.4M11.1 17.3v-3.5a2 2 0 0 1 4 0v3.5M11.1 10.9v1.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.1" cy="6.9" r="1.05" fill="currentColor" />
    </>
  ),
  WhatsApp: (
    <>
      <path
        d="M12 3.2a8.8 8.8 0 0 0-7.5 13.4L3.2 20.8l4.4-1.3A8.8 8.8 0 1 0 12 3.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.3c.24-.6.48-.6.72-.6h.6c.24 0 .48 0 .6.48l.72 1.68c.12.24 0 .48-.12.6l-.48.6c-.12.12-.24.36-.12.6.24.48.72 1.2 1.32 1.68.72.6 1.32.84 1.56.96.24.12.48 0 .6-.12l.48-.6c.24-.24.36-.24.6-.12l1.56.84c.24.12.36.24.36.48 0 .24 0 .84-.24 1.2-.36.36-1.08.72-1.56.72-1.2 0-2.64-.72-3.84-1.68-1.2-1.08-2.16-2.4-2.64-3.6-.24-.72-.24-1.44-.12-1.92Z"
        fill="currentColor"
      />
    </>
  ),
  YouTube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.4 9.4v5.2l4.5-2.6-4.5-2.6Z" fill="currentColor" />
    </>
  ),
}

export function SocialIcon({ label, className }: { label: string; className?: string }) {
  const glyph = PATHS[label]
  if (!glyph) return null
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {glyph}
    </svg>
  )
}
