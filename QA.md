# QA log

Automated checks run in headless Chromium (Playwright) against both the dev server and the **production build** (`vite preview`). Date: 2026-11-01.

## Result

- `npm run lint`: 0 warnings, 0 errors.
- `npm run build`: succeeded (`tsc -b` + `vite build`), JS 378 kB (126.7 kB gzip), CSS 36 kB (10.6 kB gzip).
- 43/43 functional checks passed (dev and production build).
- No console errors, page errors or failed requests at 1440, 1024, 768 or 390 px.
- No horizontal overflow, and no content outside the viewport, at 1440, 1024, 768, 390 and 360 px. Smallest text is 11.5 px (uppercase labels).

## Functional checks performed

Skip link (hidden at rest, appears on Tab) · keyboard Tab reaches below-the-fold service CTAs before any scroll (regression test for a bug found and fixed in this session) · nav links scroll to Services/Products/About/Contact/Home · active link tracks scroll · nav turns solid on scroll · hero CTAs and product badge targets · all in-page anchors resolve · Vishwakarmans CTA = `https://vishwakarmans.netlify.app/`, `target=_blank`, `rel="noopener noreferrer"` · service CTAs link to `#contact` and pre-select the matching topic · unconfigured contact shows no invented email/phone, submit disabled, no WhatsApp control · footer year is current · title/description/5 Open Graph tags/`lang`, one H1, no canonical · `/robots.txt` and `/favicon.svg` return 200 · mobile menu: opens, `aria-expanded`, scroll lock, focus moves in, Escape closes and returns focus, link closes and scrolls, Tab stays in the menu · buttons ≥40 px tall on mobile · reduced motion: no hidden content, no offset heading masks, timeline fully lit, no infinite animations running.

Configured-contact path was checked on a separate dev instance using **throwaway test values** passed through env vars (not saved anywhere): `mailto:` and `tel:` hrefs correct in contact section and footer, submit enabled, enquiry builds a prefilled `mailto:` URL, still no WhatsApp control.

Visual review: every section inspected at 1440 and 390; products, services and approach also at 1024 and 768. Layout fixes made after review: intro heading line breaks, AI card CTA underline, preview-frame proportions, even timeline rhythm, contrast of the eyebrow on the dark panel, footer divider, mobile frame order.

## Initial QA limitations (2026-11-01; superseded where noted below)

- The initial build environment could not capture Vishwakarmans screenshots from its live test site. Owner-provided image files are now present and are used as resized WebP derivatives; see the SEO update below.
- The earlier report treated the logo as missing. `public/assets/logo/logo.png` is present and the optimized WebP version is now used on the site.
- Real-device Safari/Firefox, screen-reader walkthrough, and a production deployment are still not covered by this browser review.

## Update: SEO and local search (2026-11-02)

- Owner-confirmed production host `https://www.sanaritsolutions.com` is now used by the canonical tag, Open Graph URL/image, Organization data, sitemap, and robots directive. The user confirmed global service; no street address or office location is published.
- Homepage metadata targets software development for Hyderabad and global businesses. Navigation includes crawlable About, Services, Products, Our Process, and Contact links. All service cards link to the contact section.
- Added Organization/contact/service catalog JSON-LD, an SVG social preview, a one-URL XML sitemap, and a commercial-intent keyword plan. Image intrinsic dimensions and fetch priority are set for the product showcase.
- Production `npm run build` passed after these changes. Browser inspection of the rendered app found one H1, no missing in-page anchor targets, no horizontal overflow at 320px, and no failed images after lazy images were scrolled into view.
- Lighthouse was not run: no Lighthouse package or audit runner is installed in the project. No Lighthouse score, Core Web Vitals result, Google indexing result, or ranking claim is made.
- Remaining owner setup: verify the domain in Search Console and submit the sitemap; add only the issued verification token if HTML verification is chosen; add GA4 only after supplying a real measurement ID and privacy/consent setup; confirm Google Business Profile eligibility before creating a profile.
- Lighthouse 12.8.2 mobile lab run on the latest production preview: **Performance 81, SEO 100**; FCP 1.7 s, LCP 2.3 s, TBT 630 ms, CLS 0. The score is a local lab result, not field data. Remaining opportunities include about 300 ms of render-blocking CSS and 58 KiB of unused JavaScript under Lighthouse's mobile simulation. Lighthouse runs varied by a few points under CPU throttling.
- Performance adjustments after the first Lighthouse pass: removed eager loading from the below-fold showcase image, added responsive WebP image sources, reduced the nav mark to a 96 px lossless WebP for its 30–34 px display, and replaced many per-element startup ScrollTriggers with one-shot IntersectionObserver scheduling for reveals.

## Update: hero mobile layout, product marker, and original wordmark (2026-11-02)

- Reworked the hero announcement as an angular, indexed SANAR product marker with a custom status tick and framed arrow. The original “Building our first flagship product” message and `#products` link remain; the element has no pill shape or glowing dot.
- Kept the desktop three-plane service composition. On mobile, the same groups now form offset, beveled 3D plates with distinct cool-tone accents, a connected index rail, fine technical lines, and one readable icon row per service. All six original service names remain.
- Inspected the supplied original `logo_dark.png` wordmark and the available fonts. No separate brand font is included; the navbar now uses a transparent WebP crop from the provided custom lettering, preserving the original logo artwork. Plus Jakarta Sans remains the site font.
- Browser review at 1440 px confirmed the 3D layers and navbar wordmark. At 430, 390, 375, 360, and 320 px, all three groups and six service labels fit without text or document overflow; the wordmark stays clear of the menu button. The announcement links to Products.
- Choreographed the plate entrance with a staggered CSS depth transition on the individual `translate` property, separate from the resting 3D transform. This avoids transform conflicts and leaves the final layer positions stable. Reduced-motion styles disable the badge signal and layer entrance.
- Compared desktop at 1440 px with mobile at 430, 390, 375, 360, and 320 px in the production browser. All six service labels fit, the navbar and announcement stay within the viewport, and no horizontal overflow or browser console errors appeared. The announcement still links to Products. Production build and lint passed.
- Follow-up dev-server regression fix: the custom 404 middleware now passes Vite's `/@…` virtual modules and source-file requests through to Vite. Reloaded the dev page and an unknown route in Chromium; the app/modules loaded, the unknown route showed the branded 404, and the console had no errors.

## Update: round 2 (hero, one-screen sections, contact, product theme)

- Hero simplified (three layered planes, no cube/rings, calmer background, stronger text contrast).
- Every section fits one viewport (section height and visible content both ≤ viewport) at 1920×1080, 1440×900, 1366×768 and 1280×720. Phones/tablets flow naturally.
- Contact form removed. Phone, email, WhatsApp (prefilled message) and Email buttons added. All verified by test: `tel:+919014350017`, `mailto:sanarit.sols@gmail.com`, `https://wa.me/919014350017?text=…` (new tab, `noopener`). The +91 country code is an assumption.
- Vishwakarmans section re-themed black + orange with the supplied logo (made transparent, 86 KB).
- 49/49 functional checks pass on the production build; no overflow at 1440/1024/768/390/360.
- Still not verified: `logo.png` and `web/market/feature/mobile.png` are **not in the project** (placeholders show); nothing deployed; no real-device, screen-reader or Lighthouse testing.

## Update: brand, browser recovery, production readiness (2026-11-02)

- Added the exact `SANAR IT Solutions` name beside the existing logo in the responsive navbar; checked at 1440, 1024, 768, 430, 390, 375, and 320 px. No horizontal document overflow at those widths. Mobile menu opens with scroll lock and closes on a Services selection.
- Added SVG, ICO, 16/32 PNG, Apple 180 PNG, Android 192/512 PNG icon assets and a web manifest. Asset responses returned HTTP 200; the manifest parses and the browser declares each icon and manifest URL.
- Added a standalone branded `404.html`, plus a React not-found state for SPA-host fallback. The unknown HTML route returns HTTP 404 in the Vite production preview when requested with a browser-like `Accept: text/html`; `/` returns 200. The 404 includes Home, Services, and Contact links and `noindex, follow`.
- Added an error boundary with a recovery state. No backend contact form or pretend submission result is present; current contact actions remain email, phone, and WhatsApp links.
- Updated all homepage copy and metadata to describe global service after the owner clarified SANAR serves worldwide. No Hyderabad location claim remains.
- Added baseline security headers in `public/_headers` for compatible static hosts. Deployment headers and 404 behavior should still be checked on the selected production host; it is not deployed from this workspace.
- Production build passed. Chromium preview had no console errors. Visual page review at mobile size and layout checks at all seven requested widths passed. Real-device Safari/Firefox, assistive technology walkthrough, and production deployment are outside this local browser check.
