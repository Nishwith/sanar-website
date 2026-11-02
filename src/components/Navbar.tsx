import { useCallback, useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems } from '../data/navigation'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [panelVisible, setPanelVisible] = useState(false)
  const [active, setActive] = useState('home')
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = useCallback((returnFocus = true) => {
    setOpen(false)
    if (returnFocus) toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track the section currently in view for the active nav state.
  useEffect(() => {
    const map: Record<string, string> = {
      home: 'home', about: 'about', services: 'services', products: 'products',
      approach: 'about', capabilities: 'services', philosophy: 'about', 'build-products': 'products', contact: 'contact',
    }
    const ids = Object.keys(map)
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(map[e.target.id])
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Mobile menu: Escape to close, focus trap, scroll lock.
  useEffect(() => {
    if (open) return
    const timer = window.setTimeout(() => setPanelVisible(false), 320)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? [])
    const focusFrame = window.requestAnimationFrame(() => toggleRef.current?.focus())
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return close()
      if (e.key !== 'Tab') return
      const f = [toggleRef.current, ...focusables()].filter(Boolean) as HTMLElement[]
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    const onResize = () => { if (window.innerWidth >= 900) setOpen(false) }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = previousOverflow
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open, close])

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`}>
      <div className="nav__inner container">
        <a href="#home" className="nav__brand" aria-label="SANAR IT Solutions — home" onClick={() => setOpen(false)}>
          <img className="nav__wordmark" src="/assets/logo/sanar-wordmark-dark.webp" alt="SANAR IT Solutions" width="1319" height="441" />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav__link${active === item.href.slice(1) ? ' is-active' : ''}`}
              aria-current={active === item.href.slice(1) ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn--primary btn--sm nav__cta">
          Start a Project
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => {
            if (open) setOpen(false)
            else { setPanelVisible(true); setOpen(true) }
          }}
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </div>

      <div id="mobile-menu" ref={panelRef} className={`nav__panel${open ? ' nav__panel--open' : ''}`} hidden={!panelVisible} aria-hidden={!open} inert={!open} role="dialog" aria-modal="true" aria-label="Site menu">
        <nav aria-label="Mobile">
          {navItems.map((item, i) => (
            <a key={item.href} href={item.href} className="nav__panel-link" style={{ ['--i' as string]: i }} onClick={() => close(false)}>
              <span className="nav__panel-num">0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn--primary" onClick={() => close(false)}>
          Start a Project
        </a>
      </div>
    </header>
  )
}
