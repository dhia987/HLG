import { Hero } from '../components/sections/Hero'
import { AboutSection } from '../components/sections/AboutSection'
import { DeskSection } from '../components/sections/DeskSection'
import { ProcessSection } from '../components/sections/ProcessSection'
import { PropertiesSection } from '../components/sections/PropertiesSection'
import { DevelopersSection } from '../components/sections/DevelopersSection'
import { BlogSection } from '../components/sections/BlogSection'
import { TeamSection } from '../components/sections/TeamSection'
import { Testimonials } from '../components/sections/Testimonials'
import { ContactSection } from '../components/sections/ContactSection'
import { LocationSection } from '../components/sections/LocationSection'
import { SocialSection } from '../components/sections/SocialSection'
import { services } from '../data/services'

const [buy, sell, rent] = services

/**
 * The whole site, as one scroll. Section ids match `nav` in data/site.ts,
 * which is what the header, the menu overlay and the footer all navigate by.
 */
export default function Home({ introDone }: { introDone: boolean }) {
  return (
    <>
      <Hero ready={introDone} />
      <AboutSection />

      {/* three desks, three anchors */}
      <DeskSection service={buy} />
      <DeskSection service={sell} flip />
      <DeskSection service={rent} />
      <ProcessSection />

      <PropertiesSection />
      <DevelopersSection />
      <BlogSection />
      <TeamSection />
      <Testimonials />
      <ContactSection />
      <LocationSection />
      <SocialSection />
    </>
  )
}
