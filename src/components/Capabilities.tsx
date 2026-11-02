import { useRef, type PointerEvent } from 'react'
import { SectionHeading } from './SectionHeading'
import { capabilityCategories } from '../data/capabilities'
import { useGsapReveal } from '../hooks/useGsapReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function Capabilities() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  useGsapReveal(ref, reduced)

  const onMove = (e: PointerEvent<HTMLLIElement>) => {
    if (e.pointerType === 'touch') return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section id="capabilities" ref={ref} className="caps screen section--light" aria-labelledby="caps-title">
      <div className="container">
        <SectionHeading
          id="caps-title"
          eyebrow="Engineering capabilities"
          lead="Every project has different requirements. We focus on selecting suitable tools and engineering approaches to create maintainable, useful digital solutions."
        >
          Technology Chosen for the Problem.
        </SectionHeading>

        <ul className="capgrid" data-reveal-stagger>
          {capabilityCategories.map((c, i) => (
            <li key={c.title} className="cap" onPointerMove={onMove}>
              <span className="cap__n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
