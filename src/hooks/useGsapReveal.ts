import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Progressive reveals for a section. Marks:
 *   [data-reveal]        → fade + rise
 *   [data-reveal-stagger] → children fade + rise in sequence
 *   [data-mask]          → heading line slides up from a clipped mask
 *
 * Content is never hidden permanently: with reduced motion nothing is
 * animated, and each reveal runs once when it approaches the viewport.
 */
export function useGsapReveal(scope: RefObject<HTMLElement | null>, reduced: boolean) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!root || reduced) return

    const markers = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-stagger], [data-mask]'))
    const tweens: gsap.core.Tween[] = []
    const animate = (el: HTMLElement) => {
      if (el.hasAttribute('data-reveal')) {
        tweens.push(gsap.from(el, { opacity: 0, y: 28, duration: 0.9, ease: 'power3.out' }))
      }
      if (el.hasAttribute('data-reveal-stagger')) {
        tweens.push(gsap.from(Array.from(el.children), { opacity: 0, y: 36, duration: 0.85, ease: 'power3.out', stagger: 0.12 }))
      }
      if (el.hasAttribute('data-mask')) {
        const inner = el.querySelectorAll<HTMLElement>('.mask__inner')
        tweens.push(gsap.from(inner, { yPercent: 110, duration: 1, ease: 'power4.out', stagger: 0.1 }))
      }
    }

    if (!('IntersectionObserver' in window)) {
      markers.forEach(animate)
      return () => tweens.forEach((tween) => tween.kill())
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        observer.unobserve(entry.target)
        animate(entry.target as HTMLElement)
      })
    }, { rootMargin: '0px 0px -10% 0px' })
    markers.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      tweens.forEach((tween) => tween.kill())
    }
  }, [scope, reduced])
}

export { gsap, ScrollTrigger }
