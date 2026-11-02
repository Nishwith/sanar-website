import { useLayoutEffect, useRef } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ParticleBackground } from './ParticleBackground'
import { GeometricScene } from './GeometricScene'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('.hero__eyebrow', { opacity: 0, y: 16, duration: 0.7 })
        .from('.hero__title .mask__inner', { yPercent: 115, duration: 1.1, stagger: 0.12 }, '-=0.35')
        .from('.hero__lead', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
        .from('.hero__actions > *', { opacity: 0, y: 18, duration: 0.7, stagger: 0.08 }, '-=0.55')
        .from('.hero__badge', { opacity: 0, y: 12, duration: 0.7 }, '-=0.45')

      tl.from('.hero__scroll', { opacity: 0, duration: 0.8 }, '-=0.4')

      // subtle scroll-linked depth: the scene drifts and the copy eases away
      gsap.to('.hero-layers', {
        yPercent: -10, scale: 1.06, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="home" ref={root} className="hero section--dark" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        
        <ParticleBackground reduced={reduced} />
        <div className="hero__vignette" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">Independent Technology &amp; Product Studio</p>
          <h1 id="hero-title" className="hero__title">
            <span className="mask"><span className="mask__inner">We Engineer</span></span>
            <span className="mask"><span className="mask__inner text-gradient">What&rsquo;s Next.</span></span>
          </h1>
          <p className="hero__lead">
            From digital experiences and applications to intelligent automation and original technology products,
            SANAR IT Solutions turns ideas into practical digital solutions.
          </p>
          <div className="hero__actions">
            <a href="#contact" className="btn btn--primary btn--lg">
              Start a Project <ArrowRight size={18} aria-hidden />
            </a>
            <a href="#services" className="btn btn--ghost btn--lg">
              Explore Our Capabilities
            </a>
          </div>
          <a href="#products" className="hero__badge" aria-label="Building our first flagship product. Explore our products.">
            <span className="hero__badge-kicker">SANAR <span aria-hidden="true">/</span> Product Studio</span>
            <span className="hero__badge-copy">
              <span className="hero__badge-index" aria-hidden="true">01</span>
              <span className="hero__badge-title">Building our first<br className="hero__badge-break" /> flagship product</span>
            </span>
            <span className="hero__badge-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
          </a>
        </div>
        <GeometricScene reduced={reduced} />
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to the next section">
        <span className="hero__scroll-line" aria-hidden />
        <span>Scroll</span>
      </a>
    </section>
  )
}
