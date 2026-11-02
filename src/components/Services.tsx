import { useRef } from 'react'
import { SectionHeading } from './SectionHeading'
import { ServiceCard } from './ServiceCard'
import { services } from '../data/services'
import { useGsapReveal } from '../hooks/useGsapReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function Services() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  useGsapReveal(ref, reduced)

  return (
    <section id="services" ref={ref} className="services screen section--dark" aria-labelledby="services-title">
      <div className="services__bg" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          id="services-title"
          eyebrow="What we do"
          lead="We help businesses worldwide plan, design, and build useful digital products, software, and automation."
        >
          From the First Idea to the Final Experience.
        </SectionHeading>

        <div className="bento" data-reveal-stagger>
          {services.map((service) => <ServiceCard key={service.id} service={service} />)}
        </div>
      </div>
    </section>
  )
}
