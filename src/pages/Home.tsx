import { Hero } from '../components/sections/Hero'
import { AboutSection } from '../components/sections/AboutSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { PropertiesSection } from '../components/sections/PropertiesSection'
import { TeamSection } from '../components/sections/TeamSection'
import { Testimonials } from '../components/sections/Testimonials'
import { ContactSection } from '../components/sections/ContactSection'
import { SocialSection } from '../components/sections/SocialSection'

/**
 * The whole site, as one scroll. Section ids match `nav` in data/site.ts,
 * which is what the header, the menu overlay and the footer all navigate by.
 */
export default function Home({ introDone }: { introDone: boolean }) {
  return (
    <>
      <Hero ready={introDone} />
      <AboutSection />
      <ServicesSection />
      <PropertiesSection />
      <TeamSection />
      <Testimonials />
      <ContactSection />
      <SocialSection />
    </>
  )
}
