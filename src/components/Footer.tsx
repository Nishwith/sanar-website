import { Logo } from './Logo'
import { navItems } from '../data/navigation'
import { siteConfig, hasEmail, hasPhone, telHref, mailHref } from '../config/site'

// Evaluated when the page loads, so the year is always current (never hardcoded).
const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer section--dark">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo variant="onDark" height={30} />
          <p>Websites, applications, and intelligent automation for businesses around the world, plus original products of our own.</p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="footer__h">Navigate</h2>
          <ul>{navItems.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
        </nav>

        <div>
          <h2 className="footer__h">Product &amp; contact</h2>
          <ul>
            <li>
              <a href={siteConfig.vishwakarmansUrl} target="_blank" rel="noopener noreferrer">
                Vishwakarmans <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            {hasEmail && <li><a href={mailHref()}>{siteConfig.contact.email}</a></li>}
            {hasPhone && <li><a href={telHref(siteConfig.contact.phone)}>{siteConfig.contact.phone}</a></li>}
          </ul>
        </div>
      </div>
      <div className="container footer__bar">
        <p>&copy; {year} {siteConfig.name} All rights reserved.</p>
        <p>Vishwakarmans is a product being developed by SANAR IT Solutions.</p>
      </div>
    </footer>
  )
}
