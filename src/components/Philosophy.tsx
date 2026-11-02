import { useRef } from 'react'
import { SectionHeading } from './SectionHeading'
import { principles } from '../data/philosophy'
import { useGsapReveal } from '../hooks/useGsapReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function Philosophy() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  useGsapReveal(ref, reduced)

  return (
    <section id="philosophy" ref={ref} className="phil screen section--dark" aria-labelledby="phil-title">
      <div className="phil__bg" aria-hidden="true" />
      <div className="container phil__grid">
        <SectionHeading id="phil-title" eyebrow="Our philosophy">
          Thoughtful Engineering. Useful Technology.
        </SectionHeading>
        <ol className="phil__list" data-reveal-stagger>
          {principles.map((p, i) => (
            <li key={p.title} className="principle" tabIndex={0}>
              <span className="principle__n">0{i + 1}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
