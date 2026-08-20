import { Hero } from '../components/sections/Hero'
import { AboutSection } from '../components/sections/AboutSection'
import { ValueSection } from '../components/sections/ValueSection'
import { TeamSection } from '../components/sections/TeamSection'
import { ContactSection } from '../components/sections/ContactSection'
import { LocationSection } from '../components/sections/LocationSection'
import { SocialSection } from '../components/sections/SocialSection'

/**
 * The whole site, as one scroll. Section ids match `nav` in data/site.ts,
 * which is what the header, the menu overlay and the footer all navigate by.
 *
 * Pre-launch order: who we are, what we are promising, who is behind it,
 * where we are, and how to get on the list. Nothing here depends on a
 * portfolio existing.
 */
export default function Home({ introDone }: { introDone: boolean }) {
  return (
    <>
      <Hero ready={introDone} />
      <AboutSection />
      <ValueSection />
      <TeamSection />
      <LocationSection />
      <ContactSection />
      <SocialSection />
    </>
  )
}
