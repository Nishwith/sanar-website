# SANAR IT Solutions — Corporate Website

Static React + TypeScript + Vite site (GSAP + ScrollTrigger for motion, a custom Canvas hero background, Lucide icons, Plus Jakarta Sans). No backend, no database, no analytics.

## Install, run, build, deploy

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint
npm run build      # type-checks, then outputs ./dist
npm run preview    # serve the production build locally
```

`dist/` is plain static files. Build command `npm run build`, publish directory `dist`. The branded `404.html` is recognized by common static hosts (including Netlify, Cloudflare Pages, and GitHub Pages). The Vite dev and preview servers return it with HTTP 404 for unknown page routes. If a host is configured with an SPA catch-all rewrite, make sure its 404 rule takes precedence so unknown paths retain a 404 status. `public/_headers` provides security headers on hosts that support the Netlify/Cloudflare Pages headers format; configure equivalent headers on other hosts. The SPA fallback otherwise renders a branded not-found screen when the host returns the app shell.

## SEO and launch configuration

The owner confirmed `https://www.sanaritsolutions.com` as the production domain and that SANAR serves clients globally. Canonical, Open Graph, sitemap, robots, and Organization metadata use that domain. The homepage describes services for businesses worldwide; it does not claim a local office or publish an address.

Before launch, confirm the domain resolves to the intended production site over HTTPS and that its logo, contact details, and Vishwakarmans development status remain current. No reviews, ratings, business hours, street address, or social accounts are fabricated.

`public/assets/logo/logo.png` and the full SANAR wordmark PNGs are retained as source assets. The navigation uses a transparent WebP crop of the supplied wordmark artwork so the custom lettering is preserved; Plus Jakarta Sans remains the website font. The compact 96 px mark is retained for secondary contexts. The product mark uses WebP. Showcase shots use responsive WebP `srcset` candidates, intrinsic dimensions, and lazy loading. The hero has no bitmap image to prioritize; its scene is CSS/canvas.

### Google Search Console and Analytics

- Verify `sanaritsolutions.com` as a Domain property in Google Search Console (DNS TXT verification is preferred), then submit `https://www.sanaritsolutions.com/sitemap.xml`.
- If using HTML verification, add the exact token supplied by Search Console as a `google-site-verification` meta tag in `index.html`. No placeholder token is published.
- GA4 is not active and no measurement ID is included. If adding GA4, use the real `G-…` ID and configure the site's privacy/consent notice before enabling data collection. Do not add a sample ID.
- Google Business Profile requires in-person contact with customers during stated hours. Only create one if SANAR meets this requirement; online-only businesses are ineligible. A service-area business may hide its address, but must not use a virtual office. See [Google's eligibility guidance](https://support.google.com/business/answer/13763036).
- Configure the production host to serve the canonical apex domain over HTTPS and redirect alternate host/protocol variants to `https://www.sanaritsolutions.com/`.

Contact details are set in **one place**, `src/config/site.ts`: phone `+91 90143 50017` (country code +91 assumed from the number you gave; change it if wrong), email `sanarit.sols@gmail.com`, WhatsApp `919014350017`. The contact section has no form. It shows the phone and email plus "Message on WhatsApp" and "Send an Email" buttons.

### Replace the logo

The navbar wordmark is served from `public/assets/logo/sanar-wordmark-dark.webp`, cropped from the supplied `logo_dark.png` without redrawing its lettering. The compact brand mark is `public/assets/logo/logo-96.webp`. If replacing either asset, update the navbar or `src/config/logo.ts` reference and the social/schema metadata in `index.html`.

### Capture the real Vishwakarmans screenshots

The live site (`https://vishwakarmans.netlify.app/`) could not be reached from the environment this site was built in (network policy blocked it), so **no screenshots were captured and none were faked**. On a machine that can reach the site:

```bash
npm i -D playwright && npx playwright install chromium
npm run capture:screenshots
```

This writes four real captures (1440×900 desktop ×3, 390×844 mobile @2x) to `public/assets/vishwakarmans/`: `web.png`, `market.png`, `feature.png`, `mobile.png`. You can also just save your own screenshots under those names.

Then **look at every image** and delete any that show private or account data. The filenames and alt text are defined in `src/data/product.ts`. If you capture different pages, edit the captions and alt text there to match what the images actually show. Optionally compress the PNGs (e.g. with `oxipng` or Squoosh) before deploying. The site picks the files up automatically; the "pending" panels disappear.

### Keyword strategy

See [SEO-KEYWORD-STRATEGY.md](SEO-KEYWORD-STRATEGY.md) for the search-intent clusters and the distinction between assessed relevance and unmeasured search-volume/difficulty metrics.

## Structure

```
src/
  components/   Navbar, Hero, ParticleBackground (Canvas), GeometricScene, Intro, Services/ServiceCard,
                VishwakarmansShowcase (+ShotImage), ProcessSection, Capabilities, Philosophy,
                ProductPhilosophy, ContactSection, Footer, Logo, SectionHeading
  config/       site.ts (contact + URLs), logo.ts (logo paths)
  data/         services, process, capabilities, philosophy, navigation, product (screenshot manifest)
  hooks/        useGsapReveal (scroll reveals), usePrefersReducedMotion
  styles/       tokens.css (CSS variables), base.css, hero.css, sections.css
scripts/        capture-screenshots.mjs
```

Design tokens (colours, fluid type scale) live in `src/styles/tokens.css`. Section rhythm: hero dark → intro light → services dark → product light → approach dark → capabilities light → philosophy dark → "we build products" light → contact light → footer dark.

## Behaviour notes

- **One screen per section** on laptops/desktops (≥1000px wide, ≥640px tall): each section fills the viewport and the page snaps section to section. On phones and tablets sections flow naturally so nothing is cut off.
- **Vishwakarmans section** uses the product's own black + orange theme (taken from its logo). The rest of the site stays navy/blue/cyan.
- **Motion** respects `prefers-reduced-motion`: reveals, parallax and the particle animation are disabled, a static frame is drawn, and all content is visible. Scroll reveals use `opacity` only, so content stays keyboard-focusable before it animates in.
- **Canvas** caps DPR at 1.75, scales particle count to screen area and CPU cores, and pauses off-screen or in a hidden tab.
- **No analytics** is installed. Add one only with an appropriate privacy approach.

## QA performed

See the final report from the build session; summary of automated browser checks (Chromium via Playwright, 1440/1024/768/390/360 px) is in `QA.md`.
