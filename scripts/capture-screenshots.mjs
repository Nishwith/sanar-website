#!/usr/bin/env node
/**
 * Capture REAL screenshots of the live Vishwakarmans testing site.
 *
 *   npm i -D playwright && npx playwright install chromium   (one-time)
 *   npm run capture:screenshots
 *
 * Output (matches src/data/product.ts):
 *   public/assets/vishwakarmans/web.png     1440×900  desktop, top of the home page
 *   public/assets/vishwakarmans/market.png  1440×900  desktop, best-matching inner page
 *   public/assets/vishwakarmans/feature.png     1440×900  desktop, further down the home page
 *   public/assets/vishwakarmans/mobile.png        390×844  mobile viewport (@2x)
 *
 * Env overrides:  VISHWAKARMANS_URL, OUT_DIR
 *
 * IMPORTANT — before publishing, LOOK at every image. If one shows a signed-in
 * account, a personal email/phone, or any private data, delete it and re-capture
 * from a signed-out state. This script never signs in, but live content can change.
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const URL_ = (process.env.VISHWAKARMANS_URL ?? 'https://vishwakarmans.netlify.app/').replace(/\/?$/, '/')
const OUT = process.env.OUT_DIR ?? path.join(ROOT, 'public/assets/vishwakarmans')

let chromium
try {
  ;({ chromium } = await import('playwright'))
} catch {
  console.error('Playwright is not installed.\n  npm i -D playwright && npx playwright install chromium')
  process.exit(1)
}

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()
const settle = async (page) => {
  await page.waitForLoadState('networkidle', { timeout: 30_000 }).catch(() => {})
  await page.evaluate(() => document.fonts?.ready)
  await page.waitForTimeout(1200) // let entrance animations finish
}
const shot = async (page, name) => {
  const file = path.join(OUT, name)
  await page.screenshot({ path: file, type: 'png' })
  console.log('  saved', path.relative(ROOT, file))
}
const scrollTo = async (page, y) => {
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y)
  await page.waitForTimeout(900)
}

try {
  // ── Desktop ──────────────────────────────────────────────
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
  const page = await desktop.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))

  console.log(`Opening ${URL_}`)
  const res = await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 45_000 })
  if (!res || !res.ok()) throw new Error(`Site responded with status ${res?.status()}`)
  await settle(page)
  console.log('  title:', await page.title())

  // Slow scroll to the bottom to trigger lazy content, then return.
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 600) await scrollTo(page, y)
  await scrollTo(page, 0)

  await shot(page, 'web.png')

  // Find a same-origin link that looks like the marketplace / designers listing.
  const links = await page.$$eval('a[href]', (as) =>
    as.map((a) => ({ href: a.href, text: (a.textContent || '').trim().toLowerCase(), origin: a.origin })),
  )
  const here = new URL(URL_)
  const want = /(designer|marketplace|browse|explore|professional|portfolio|project|find)/i
  const inner = links.find((l) => l.origin === here.origin && l.href !== here.href && !l.href.includes('#') && want.test(l.text + ' ' + l.href))

  if (inner) {
    console.log('  opening inner page:', inner.href)
    await page.goto(inner.href, { waitUntil: 'domcontentloaded', timeout: 45_000 })
    await settle(page)
    await shot(page, 'market.png')
    await page.goto(URL_, { waitUntil: 'domcontentloaded' })
    await settle(page)
  } else {
    console.warn('  ! no obvious marketplace link found — using a mid-page capture instead. Review it, or capture manually.')
    await scrollTo(page, Math.round(height * 0.3))
    await shot(page, 'market.png')
  }

  await scrollTo(page, Math.round(height * 0.6))
  await shot(page, 'feature.png')
  if (errors.length) console.warn('  page errors seen on the live site:', errors.slice(0, 3))
  await desktop.close()

  // ── Mobile ───────────────────────────────────────────────
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  })
  const m = await mobile.newPage()
  await m.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 45_000 })
  await settle(m)
  await shot(m, 'mobile.png')
  await mobile.close()

  console.log('\nDone. Now REVIEW each image for private data, then run:  npm run build')
} catch (err) {
  console.error('\nCapture failed:', err.message)
  console.error('The site may be unreachable from this network. Nothing was faked; the website will keep showing "Screenshot pending".')
  process.exitCode = 1
} finally {
  await browser.close()
}
