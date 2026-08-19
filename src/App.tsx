import { useCallback, useState } from 'react'

import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Cursor } from './components/layout/Cursor'
import { Preloader } from './components/layout/Preloader'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { PropertyProvider } from './components/sections/PropertyOverlay'
import { SearchProvider } from './lib/SearchContext'
import Home from './pages/Home'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const onIntroDone = useCallback(() => setIntroDone(true), [])

  return (
    <SearchProvider>
      <PropertyProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[9500] focus:rounded-full focus:bg-[#9C6625] focus:px-6 focus:py-3 focus:text-[0.7rem] focus:font-medium focus:uppercase focus:tracking-[0.2em]"
        >
          Skip to content
        </a>

        <Preloader onDone={onIntroDone} />
        <Cursor />
        <ScrollProgress />
        <Header />

        <main id="main">
          <Home introDone={introDone} />
        </main>

        <Footer />
      </PropertyProvider>
    </SearchProvider>
  )
}
