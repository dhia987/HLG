import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { EASE, inView } from '../../lib/motion'
import { MaskText } from '../ui/Reveal'

/** Eyebrow + masked headline + optional lead, used to open every section. */
export function SectionHeading({
  eyebrow,
  lines,
  lead,
  align = 'left',
  className = '',
  aside,
}: {
  eyebrow: string
  lines: (string | ReactNode)[]
  lead?: string
  align?: 'left' | 'center'
  className?: string
  aside?: ReactNode
}) {
  const centered = align === 'center'

  return (
    <div
      className={`${centered ? 'mx-auto max-w-3xl text-center' : ''} ${
        aside ? 'grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end' : ''
      } ${className}`}
    >
      <div>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.7, ease: EASE }}
          className={`eyebrow mb-7 flex items-center gap-3 text-[#B88D5B] ${
            centered ? 'justify-center' : ''
          }`}
        >
          <span className="h-1.5 w-1.5 rotate-45 bg-[#9C6625]" />
          {eyebrow}
        </motion.p>

        <h2 className="display-lg">
          <MaskText lines={lines} />
        </h2>
      </div>

      {(lead || aside) && (
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className={centered ? 'mt-8' : aside ? '' : 'mt-8 max-w-xl'}
        >
          {lead && <p className="body-lg text-[#F5F3EF]/60">{lead}</p>}
          {aside}
        </motion.div>
      )}
    </div>
  )
}
