import { useEffect } from 'react'

export function NotFound() {
  useEffect(() => {
    document.title = '404 — Page Not Found | SANAR IT Solutions'
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (robots) robots.content = 'noindex, follow'
  }, [])

  return (
    <main className="status-page">
      <a className="status-brand" href="/" aria-label="SANAR IT Solutions home">
        <img src="/assets/logo/logo-96.webp" width="38" height="38" alt="" />
        <span>SANAR IT Solutions</span>
      </a>
      <section className="status-card" aria-labelledby="status-title">
        <span className="status-code">404 <i aria-hidden="true" /></span>
        <p className="status-kicker">Page not found</p>
        <h1 id="status-title">This page isn’t in our system.</h1>
        <p className="status-copy">The address may be incorrect, or the page may have moved. You can continue from one of these destinations.</p>
        <nav className="status-actions" aria-label="Helpful links">
          <a className="btn btn--primary" href="/">Home</a>
          <a className="btn btn--ghost" href="/#services">Services</a>
          <a className="btn btn--ghost" href="/#contact">Contact</a>
        </nav>
      </section>
    </main>
  )
}
