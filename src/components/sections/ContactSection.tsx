import { AnimatePresence, motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { EASE, inView } from '../../lib/motion'
import { site } from '../../data/site'
import { CTA } from '../ui/Button'
import { Monogram } from '../brand/Monogram'
import { launchLine, launchStatus } from '../ui/Countdown'
import { SectionHeading } from './SectionHeading'
import { INTERESTS, useInterest } from '../../lib/InterestContext'

type Status = 'idle' | 'sending' | 'sent'

const fieldCls =
  'peer w-full border-0 border-b hairline bg-transparent pb-3 pt-6 text-base font-light text-[#F5F3EF] outline-none transition-colors duration-500 placeholder:text-transparent focus:border-[#9C6625]'
const labelCls =
  'pointer-events-none absolute left-0 top-6 origin-left text-sm font-light text-[#F5F3EF]/40 transition-all duration-500 peer-focus:top-0 peer-focus:text-[0.65rem] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-[#B88D5B] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em] peer-[:not(:placeholder-shown)]:text-[#B88D5B]'

/**
 * Not an enquiry form - an early-access list.
 *
 * Before opening there is nothing to enquire about, so the form asks for less
 * and promises something specific in return: a place on the list and a named
 * advisor when the doors open. The message field is optional on purpose; a
 * required paragraph is the wrong toll to charge someone who only wants to put
 * their name down.
 */
export function ContactSection() {
  // The footer's shortcuts arrive here with the right option already chosen.
  const { interest, setInterest } = useInterest()
  const [status, setStatus] = useState<Status>('idle')

  /**
   * No backend is wired up yet. The submit handler below fakes the round trip
   * so the interaction can be reviewed; replace the timeout with a POST to the
   * CRM / form endpoint of choice.
   */
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 1300))
    setStatus('sent')
  }

  return (
    <section id="contact" className="scroll-mt-24 border-b hairline section-y">
      <div className="shell">
        <SectionHeading
          eyebrow="Register your interest"
          lines={['Be on the list', <span className="text-bronze-grad">before we open.</span>]}
          aside={
            <p className="body-lg text-[#F5F3EF]/60 lg:pb-3">
              We are opening with a list rather than an inbox. Tell us what you are looking for
              and you will hear from a named advisor, not a newsletter, when the doors open.
            </p>
          }
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          {/* form */}
          <div>
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="border hairline bg-[#131315] p-10 md:p-14"
                >
                  <Monogram variant="white" animated className="mb-8 h-14 w-14" />
                  <h3 className="display-md mb-5">You are on the list.</h3>
                  <p className="body-lg mb-9 max-w-md text-[#F5F3EF]/60">
                    Thank you. Your name is down. We will be in touch before we open, and a
                    named advisor will pick up your brief from there. Nothing else lands in your
                    inbox in the meantime.
                  </p>
                  <CTA onClick={() => setStatus('idle')} tone="ghost" magnetic={false}>
                    Register someone else
                  </CTA>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="space-y-10"
                >
                  <fieldset>
                    <legend className="eyebrow mb-5 text-[#F5F3EF]/40">I am interested in</legend>
                    <div className="flex flex-wrap gap-2.5">
                      {INTERESTS.map((it) => (
                        <button
                          key={it}
                          type="button"
                          onClick={() => setInterest(it)}
                          data-cursor="link"
                          aria-pressed={interest === it}
                          className={`relative overflow-hidden rounded-full border px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500 ${
                            interest === it
                              ? 'border-[#9C6625] bg-[#9C6625] text-[#F5F3EF]'
                              : 'hairline text-[#F5F3EF]/60 hover:border-[#9C6625]'
                          }`}
                        >
                          {it}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                    <div className="relative">
                      <input id="name" name="name" required placeholder="Full name" className={fieldCls} />
                      <label htmlFor="name" className={labelCls}>
                        Full name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                        className={fieldCls}
                      />
                      <label htmlFor="email" className={labelCls}>
                        Email
                      </label>
                    </div>
                    <div className="relative">
                      <input id="phone" name="phone" type="tel" placeholder="Phone" className={fieldCls} />
                      <label htmlFor="phone" className={labelCls}>
                        Phone (optional)
                      </label>
                    </div>
                    <div className="relative">
                      <input id="area" name="area" placeholder="Area" className={fieldCls} />
                      <label htmlFor="area" className={labelCls}>
                        Area of interest (optional)
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Message"
                      className={`${fieldCls} resize-none`}
                    />
                    <label htmlFor="message" className={labelCls}>
                      Anything we should know (optional)
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <CTA type="submit" tone="bronze" magnetic={false}>
                      {status === 'sending' ? 'Registering' : 'Register interest'}
                    </CTA>
                    <p className="max-w-xs text-[0.72rem] font-light leading-relaxed text-[#F5F3EF]/35">
                      One message before we open, and a named advisor after. Your details are
                      never shared with a third party.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* details */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.85, ease: EASE }}
            className="relative overflow-hidden border hairline bg-[#131315] p-9 md:p-11"
          >
            <div className="chevron-field pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative">
              <Monogram variant="white" className="mb-9 h-10 w-10" />

              <dl className="space-y-8">
                <div>
                  <dt className="eyebrow mb-3 text-[#B88D5B]">Office</dt>
                  <dd className="body-base text-[#F5F3EF]/75">{site.address}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-3 text-[#B88D5B]">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${site.email}`}
                      data-cursor="link"
                      className="link-underline body-base text-[#F5F3EF]/75"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow mb-3 text-[#B88D5B]">Telephone</dt>
                  <dd>
                    <a
                      href={site.phoneHref}
                      data-cursor="link"
                      className="link-underline body-base text-[#F5F3EF]/75"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
                {/* Publishing office hours for a house that has not opened would
                    be the one false note on the page. The opening is the fact
                    that belongs here instead. */}
                <div>
                  <dt className="eyebrow mb-3 text-[#B88D5B]">Doors open</dt>
                  <dd className="body-base text-[#F5F3EF]/75">
                    {launchLine(launchStatus())}
                    <br />
                    <span className="text-[#F5F3EF]/45">
                      Registrations are read daily until then.
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="mt-10 border-t hairline pt-8">
                <p className="eyebrow mb-5 text-[#F5F3EF]/40">Elsewhere</p>
                <ul className="space-y-3">
                  {site.social.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="link"
                        className="group flex items-baseline justify-between gap-4"
                      >
                        <span className="link-underline body-base text-[#F5F3EF]/75">
                          {s.label}
                        </span>
                        <span className="text-[0.72rem] text-[#F5F3EF]/35 transition-colors duration-500 group-hover:text-[#B88D5B]">
                          {s.handle}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <CTA href={site.whatsappHref} tone="bronze" magnetic={false} className="w-full">
                  Message on WhatsApp
                </CTA>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
