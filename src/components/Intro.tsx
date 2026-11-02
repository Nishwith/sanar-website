import { useRef } from 'react'
import { useGsapReveal } from '../hooks/useGsapReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function Intro() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  useGsapReveal(ref, reduced)

  return (
    <section id="about" ref={ref} className="intro screen section--light" aria-labelledby="intro-title">
      <div className="intro__lines" aria-hidden="true">
        <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="il" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#0866FF" stopOpacity=".5" />
              <stop offset="1" stopColor="#00D9FF" stopOpacity=".15" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path key={i} d={`M ${60 + i * 26} ${470 - i * 38} L ${300 + i * 26} ${230 - i * 38} L ${540 + i * 26} ${470 - i * 38} L ${300 + i * 26} ${710 - i * 38} Z`} fill="none" stroke="url(#il)" strokeWidth="1" />
          ))}
        </svg>
      </div>
      <div className="container intro__grid">
        <div>
          <p className="eyebrow" data-reveal>Technology with purpose</p>
          <h2 id="intro-title" className="intro__title" data-mask>
            <span className="mask"><span className="mask__inner">We Build Digital</span></span>
            <span className="mask"><span className="mask__inner">Products and</span></span>
            <span className="mask"><span className="mask__inner">Solutions for</span></span>
            <span className="mask"><span className="mask__inner text-gradient-blue">What&rsquo;s Next.</span></span>
          </h2>
        </div>
        <div className="intro__body">
          <p data-reveal>
            SANAR IT Solutions is a technology company working with businesses around the world.
            We build websites, applications, and automation that solve practical business needs, while developing
            original digital products of our own. Vishwakarmans is our first product.
          </p>
          <ul className="intro__pillars" data-reveal-stagger>
            <li><span>Build</span>Digital experiences and applications for businesses and startups.</li>
            <li><span>Automate</span>Practical automation and AI-assisted workflows.</li>
            <li><span>Create</span>Original products, starting with Vishwakarmans.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
