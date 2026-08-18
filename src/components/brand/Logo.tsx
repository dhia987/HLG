type Variant = 'black' | 'white' | 'gray'

const LOCKUP: Record<Variant, string> = {
  black: '/brand/hlg-logo-black.svg',
  white: '/brand/hlg-logo-white.svg',
  gray: '/brand/hlg-logo-gray.svg',
}

/**
 * Full HLG lockup (monogram + H.L.G + REAL ESTATE), used unmodified from the
 * supplied artwork. Per the guideline the lockup may not be recoloured,
 * outlined, distorted or split - so it is always served as the original file.
 */
export function Logo({
  variant = 'white',
  className,
}: {
  variant?: Variant
  className?: string
}) {
  return (
    <img
      src={LOCKUP[variant]}
      alt="HLG Real Estate"
      className={className}
      width={1002}
      height={368}
      draggable={false}
    />
  )
}
