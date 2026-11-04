/**
 * ─────────────────────────────────────────────────────────────
 *  SANAR IT SOLUTIONS — SITE CONFIGURATION (single source of truth)
 * ─────────────────────────────────────────────────────────────
 *  Company contact details live here. Change them in one place and the
 *  contact section, footer and buttons all update.
 *
 *  Phone numbers are stored with the country code (+91 = India).
 *  WhatsApp uses digits only, country code first, no "+".
 *
 *  (Each can also be overridden with VITE_CONTACT_EMAIL / VITE_CONTACT_PHONE /
 *   VITE_CONTACT_WHATSAPP in a `.env.local` file.)
 */
const env = import.meta.env;

export const siteConfig = {
  name: "SANAR IT Solutions Pvt. Ltd.",
  shortName: "SANAR",

  contact: {
    email:
      (env.VITE_CONTACT_EMAIL as string | undefined) ??
      "sanarit.sols@gmail.com",
    /** Display format. The tel: link strips spaces automatically. */
    phone: (env.VITE_CONTACT_PHONE as string | undefined) ?? "+91 90143 50017",
    /** International format, digits only. */
    whatsapp:
      (env.VITE_CONTACT_WHATSAPP as string | undefined) ?? "919014350017",
    /** Pre-filled text for the WhatsApp chat and the email. */
    whatsappMessage: "Hello SANAR IT Solutions, I'd like to discuss a project.",
    emailSubject: "Project enquiry",
  },

  /** Live testing build of the flagship product. */
  vishwakarmansUrl: "https://vishwakarmans.netlify.app/",

  /** Official production site, supplied by the owner. Do not replace with the product test URL. */
  productionUrl: "https://www.sanaritsolutions.com",
} as const;

export const hasEmail = siteConfig.contact.email.trim().length > 0;
export const hasPhone = siteConfig.contact.phone.trim().length > 0;
export const hasWhatsapp = siteConfig.contact.whatsapp.trim().length > 0;

export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
export const mailHref = () =>
  `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(siteConfig.contact.emailSubject)}`;
export const whatsappHref = (n: string = siteConfig.contact.whatsapp) =>
  `https://wa.me/${n.replace(/\D/g, "")}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`;
