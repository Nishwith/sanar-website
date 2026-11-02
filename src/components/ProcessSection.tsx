import { useLayoutEffect, useRef } from 'react'
import { SectionHeading } from './SectionHeading'
import { processSteps } from '../data/process'
import { useGsapReveal, gsap } from '../hooks/useGsapReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null)
  const list = useRef<HTMLOListElement>(null)
  const reduced = usePrefersReducedMotion()
  useGsapReveal(ref, reduced)

  // The path draws itself and each step lights up in turn once the section arrives.
  // Plays once; nothing is pinned and nothing depends on it to read the content.
  useLayoutEffect(() => {
    const ol = list.current
    if (!ol) return
    const items = Array.from(ol.querySelectorAll<HTMLElement>('.step'))
    if (reduced) { items.forEach((i) => i.classList.add('is-on')); ol.style.setProperty('--progress', '1'); return }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true })
      tl.to(ol, { '--progress': 1, duration: 1.8, ease: 'power1.inOut' }, 0)
      items.forEach((item, i) => tl.call(() => item.classList.add('is-on'), undefined, 0.12 + (i / (items.length - 1)) * 1.55))
      gsap.timeline({ scrollTrigger: { trigger: ol, start: 'top 80%', once: true, onEnter: () => tl.play() } })
    }, ol)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="approach" ref={ref} className="process screen section--dark" aria-labelledby="process-title">
      <div className="process__bg" aria-hidden="true" />
      <div className="container">
        <SectionHeading id="process-title" eyebrow="How we build" align="center">
          A Clear Path from Idea to Launch.
        </SectionHeading>

        <ol ref={list} className="timeline">
          <li className="timeline__rail" aria-hidden="true"><span /></li>
          {processSteps.map((s) => (
            <li key={s.step} className="step">
              <span className="step__node" aria-hidden="true" />
              <div className="step__card">
                <span className="step__num">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
