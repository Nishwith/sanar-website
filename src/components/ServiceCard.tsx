import { useRef, type PointerEvent } from 'react'
import { ArrowUpRight, Check, Globe2, Smartphone, PanelsTopLeft, Palette, Bot, Boxes } from 'lucide-react'
import type { Service } from '../data/services'

interface Props {
  service: Service
  className?: string
}

/** Bento card with pointer-tracked illumination. Touch devices get a static glow state. */
export function ServiceCard({ service, className = '' }: Props) {
  const ref = useRef<HTMLElement>(null)

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <article ref={ref} className={`scard scard--${service.id} ${className}`} onPointerMove={onMove}>
      <div className="scard__glow" aria-hidden="true" />
      <div className="scard__art" aria-hidden="true">
        <ServiceArt id={service.id} />
      </div>
      <div className="scard__top">
        <span className="scard__index">{service.index}</span>
        <span className="scard__tag">{service.tagline}</span>
      </div>
      <h3 className="scard__title">{service.title}</h3>
      <p className="scard__desc">{service.description}</p>
      <ul className="scard__caps">
        {service.capabilities.map((c) => (
          <li key={c}><Check size={14} aria-hidden /> {c}</li>
        ))}
      </ul>
      <a href="#contact" className="scard__cta">
        {service.cta} <ArrowUpRight size={16} aria-hidden />
      </a>
    </article>
  )
}

function ServiceArt({ id }: { id: Service['id'] }) {
  const icons = { web: Globe2, 'cross-platform': Smartphone, 'web-app': PanelsTopLeft, design: Palette, ai: Bot, custom: Boxes }
  const Icon = icons[id]
  return <div className={`scard__icon scard__icon--${id}`}><Icon size={48} strokeWidth={1.35} /></div>
}
