import { useState } from 'react'
import type { ProductShot } from '../data/product'

/**
 * Renders a real screenshot (cropped to the frame, top-aligned). If the file
 * isn't there yet, shows a clearly labelled placeholder instead of invented UI.
 */
export function ShotImage({ shot, eager = false }: { shot: ProductShot; eager?: boolean }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="shot-missing" role="img" aria-label={`Placeholder: the ${shot.caption.toLowerCase()} screenshot of Vishwakarmans has not been added yet`} data-missing-screenshot={shot.src}>
        <span className="shot-missing__tag">Screenshot pending</span>
        <span className="shot-missing__name">{shot.caption}</span>
        <span className="shot-missing__hint">Add <code>{shot.file}</code></span>
      </div>
    )
  }
  return (
    <img className="shot" src={shot.src} srcSet={shot.srcSet} sizes={shot.sizes} alt={shot.alt} width={shot.width} height={shot.height} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" onError={() => setFailed(true)} />
  )
}
