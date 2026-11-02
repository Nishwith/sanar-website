import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Services } from './components/Services'
import { VishwakarmansShowcase } from './components/VishwakarmansShowcase'
import { ProcessSection } from './components/ProcessSection'
import { Capabilities } from './components/Capabilities'
import { Philosophy } from './components/Philosophy'
import { ProductPhilosophy } from './components/ProductPhilosophy'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { NotFound } from './components/NotFound'

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  if (pathname !== '/' && pathname !== '/index.html') return <NotFound />

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <Intro />
        <Services />
        <VishwakarmansShowcase />
        <ProcessSection />
        <Capabilities />
        <Philosophy />
        <ProductPhilosophy />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
