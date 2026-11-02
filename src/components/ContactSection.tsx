import { useRef } from 'react'
import { Mail, Phone, MessageCircle, ArrowUpRight } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { siteConfig, hasEmail, hasPhone, hasWhatsapp, telHref, mailHref, whatsappHref } from '../config/site'
import { useGsapReveal } from '../hooks/useGsapReveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/** Static contact section: no form, no backend. Every action is a plain link. */
export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  useGsapReveal(ref, reduced)
  const { email, phone } = siteConfig.contact

  return (
    <section id="contact" ref={ref} className="contact screen section--dark" aria-labelledby="contact-title">
      <div className="contact__bg" aria-hidden="true" />
      <div className="container contact__grid">
        <div className="contact__intro">
          <SectionHeading
            id="contact-title"
            eyebrow="Have an idea?"
            lead="Tell us what you are working on. We will discuss your website, application, software, or automation requirements wherever your business is based."
          >
            Let&rsquo;s Build Something Meaningful.
          </SectionHeading>

          <div className="contact__actions" data-reveal>
            {hasWhatsapp && (
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
                <MessageCircle size={19} aria-hidden /> Message on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {hasEmail && (
              <a href={mailHref()} className="btn btn--ghost btn--lg">
                <Mail size={19} aria-hidden /> Send an Email
              </a>
            )}
          </div>
        </div>

        <ul className="channels" data-reveal-stagger>
          {hasPhone && (
            <li>
              <a href={telHref(phone)} className="channel">
                <span className="channel__icon"><Phone size={22} aria-hidden /></span>
                <span className="channel__text"><small>Call us</small>{phone}</span>
                <ArrowUpRight size={18} aria-hidden className="channel__go" />
              </a>
            </li>
          )}
          {hasEmail && (
            <li>
              <a href={mailHref()} className="channel">
                <span className="channel__icon"><Mail size={22} aria-hidden /></span>
                <span className="channel__text"><small>Email us</small>{email}</span>
                <ArrowUpRight size={18} aria-hidden className="channel__go" />
              </a>
            </li>
          )}
          {hasWhatsapp && (
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="channel">
                <span className="channel__icon"><MessageCircle size={22} aria-hidden /></span>
                <span className="channel__text"><small>WhatsApp</small>Chat with us</span>
                <ArrowUpRight size={18} aria-hidden className="channel__go" />
              </a>
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}
