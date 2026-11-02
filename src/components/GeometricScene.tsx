import { useCallback, type PointerEvent } from 'react'
import { Bot, Code2, Globe2, Layers3, Palette, Smartphone } from 'lucide-react'

const layers = [
  { number: '01', title: 'Web Experiences', items: [['Website Development', Globe2], ['Web Application Development', Code2]] as const },
  { number: '02', title: 'App & Experience Design', items: [['Cross-Platform App Development', Smartphone], ['UI/UX Design', Palette]] as const },
  { number: '03', title: 'Intelligent Solutions', items: [['AI Automation', Bot], ['Custom Software Development', Layers3]] as const },
]

export function GeometricScene({ reduced }: { reduced: boolean }) {
  const trackPointer = useCallback((event: PointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    event.currentTarget.style.setProperty('--tilt-x', `${((.5 - y) * 3.2).toFixed(2)}deg`)
    event.currentTarget.style.setProperty('--tilt-y', `${((x - .5) * 4.2).toFixed(2)}deg`)
    event.currentTarget.style.setProperty('--light-x', `${(x * 100).toFixed(1)}%`)
    event.currentTarget.style.setProperty('--light-y', `${(y * 100).toFixed(1)}%`)
  }, [reduced])

  const resetPointer = useCallback((event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
    event.currentTarget.style.setProperty('--light-x', '50%')
    event.currentTarget.style.setProperty('--light-y', '50%')
  }, [])

  return (
    <div className={`hero-layers${reduced ? ' hero-layers--static' : ''}`} aria-label="SANAR services: web experiences, app and experience design, and intelligent solutions">
      {layers.map((layer, index) => (
        <article className={`hero-layer hero-layer--${index + 1}`} key={layer.number} onPointerMove={trackPointer} onPointerLeave={resetPointer}>
          <div className="hero-layer__head"><span>{layer.number}</span><h2>{layer.title}</h2></div>
          <div className="hero-layer__items">
            {layer.items.map(([label, Icon]) => <div className="hero-layer__item" key={label}><Icon size={17} strokeWidth={1.7} /><span>{label}</span></div>)}
          </div>
        </article>
      ))}
    </div>
  )
}
