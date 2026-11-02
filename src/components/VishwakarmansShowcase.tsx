import { useLayoutEffect, useRef } from 'react'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { ShotImage } from './ShotImage'
import { productShots, productLogo } from '../data/product'
import { siteConfig } from '../config/site'
import { useGsapReveal, gsap } from '../hooks/useGsapReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const [web, , , mobile] = productShots

const facts = [
  ['What it is', 'An interior and exterior design marketplace being built by SANAR.'],
  ['Who it’s for', 'People looking for design professionals, and the professionals who want their work discovered.'],
  ['What it aims to solve', 'Finding the right design professional and seeing their work in one place.'],
  ['How it’s meant to work', 'Discover designers, explore their work, and move from inspiration toward collaboration.'],
]

/** Product section — themed to the Vishwakarmans brand (black + orange), separate from SANAR's blue. */
export function VishwakarmansShowcase() {
  const ref = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  useGsapReveal(ref, reduced)

  // Gentle pointer-free depth: frames drift slightly as the section scrolls into place.
  useLayoutEffect(() => {
    if (reduced || !stage.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-depth]').forEach((el) => {
        const d = parseFloat(el.dataset.depth ?? '0')
        gsap.fromTo(el, { y: d * 18 }, { y: d * -18, ease: 'none',
          scrollTrigger: { trigger: stage.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
      })
    }, stage)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="products" ref={ref} className="product screen section--light" aria-labelledby="product-title">
      <div className="product__bg" aria-hidden="true" />
      <div className="container product__grid">
        <div className="product__copy">
          <img className="product__logo" src={productLogo.src} alt={productLogo.alt} width={532} height={465} loading="lazy" decoding="async" />
          <p className="eyebrow" data-reveal>Built by SANAR</p>
          <h2 id="product-title" className="product__title" data-mask>
            <span className="mask"><span className="mask__inner">Introducing Vishwakarmans.</span></span>
          </h2>
          <p className="product__lead" data-reveal>
            We&rsquo;re building Vishwakarmans, a marketplace designed to connect people with interior and exterior design
            professionals. The platform aims to make it easier to discover designers, explore their work, and move from
            inspiration toward collaboration.
          </p>

          <div className="product__meta" data-reveal>
            <span className="status" role="status"><span className="status__dot" aria-hidden /> In development · Testing</span>
            <span className="product__note">A product by SANAR IT Solutions. The live link is its testing build.</span>
          </div>

          <div className="product__actions" data-reveal>
            <a href={siteConfig.vishwakarmansUrl} target="_blank" rel="noopener noreferrer" className="btn btn--vk btn--lg">
              Explore Vishwakarmans <ExternalLink size={17} aria-hidden />
              <span className="sr-only"> (opens the live testing site in a new tab)</span>
            </a>
            <a href="#contact" className="btn btn--vk-outline btn--lg">
              Follow Our Product Journey <ArrowRight size={17} aria-hidden />
            </a>
          </div>
        </div>

        <div ref={stage} className="pstage">
          <div className="pstage__glow" aria-hidden="true" />
          <figure className="pframe pframe--main" data-depth="0">
            <div className="pframe__bar"><i /><i /><i /><span>vishwakarmans.netlify.app</span></div>
            <div className="pframe__body"><ShotImage shot={web} /></div>
          </figure>
          <figure className="pphone" data-depth="-1.2">
            <div className="pphone__body"><ShotImage shot={mobile} /></div>
          </figure>
        </div>

        <ul className="pfacts" data-reveal-stagger>
          {facts.map(([h, t]) => (
            <li key={h}><h3>{h}</h3><p>{t}</p></li>
          ))}
        </ul>
      </div>
    </section>
  )
}
