import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useGsapReveal } from '../hooks/useGsapReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function ProductPhilosophy() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  useGsapReveal(ref, reduced)

  return (
    <section id="build-products" ref={ref} className="bp screen section--light" aria-labelledby="bp-title">
      <div className="container">
        <div className="bp__panel" data-reveal>
          <div className="bp__art" aria-hidden="true" />
          <div className="bp__content">
            <p className="eyebrow">Services &amp; products</p>
            <h2 id="bp-title" className="bp__title">We Don&rsquo;t Just Deliver Solutions. We Build Products.</h2>
            <p className="bp__copy">
              Alongside our client-focused technology services, we&rsquo;re developing original digital products designed to
              solve specific problems. Vishwakarmans is the first step in that journey.
            </p>
            <a href="#products" className="btn btn--primary btn--lg">
              See Vishwakarmans <ArrowRight size={18} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
