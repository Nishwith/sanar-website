/**
 * Vishwakarmans screenshot manifest.
 * Put REAL screenshots of the live testing site in public/assets/vishwakarmans/
 * using exactly these file names. Until a file exists, a clearly labelled
 * "Screenshot pending" panel is shown (never invented UI).
 */
export interface ProductShot {
  id: string
  file: string
  src: string
  alt: string
  caption: string
  device: 'desktop' | 'mobile'
  width: number
  height: number
  srcSet?: string
  sizes?: string
}

const base = '/assets/vishwakarmans'

export const productLogo = {
  src: `${base}/vishwakarmans-logo.webp`,
  alt: 'Vishwakarmans logo: a stylised V formed from building shapes and a house, in black and orange',
}

export const productShots: ProductShot[] = [
  { id: 'web', file: 'vishwakarmans-homepage-720.webp', src: `${base}/vishwakarmans-homepage-720.webp`, srcSet: `${base}/vishwakarmans-homepage-720.webp 720w, ${base}/vishwakarmans-homepage-1440.webp 1440w`, sizes: '(max-width: 999px) 70vw, 560px', alt: 'Vishwakarmans homepage shown in a desktop browser, testing build', caption: 'Homepage', device: 'desktop', width: 1440, height: 900 },
  { id: 'market', file: 'market.png', src: `${base}/market.png`, alt: 'Vishwakarmans interior and exterior design marketplace, testing build', caption: 'Marketplace', device: 'desktop', width: 1907, height: 862 },
  { id: 'feature', file: 'feature.png', src: `${base}/feature.png`, alt: 'Vishwakarmans product features page, testing build', caption: 'Features', device: 'desktop', width: 1917, height: 873 },
  { id: 'mobile', file: 'vishwakarmans-mobile-390.webp', src: `${base}/vishwakarmans-mobile-390.webp`, srcSet: `${base}/vishwakarmans-mobile-390.webp 390w, ${base}/vishwakarmans-mobile-780.webp 780w`, sizes: '190px', alt: 'Vishwakarmans website displayed in a mobile layout, testing build', caption: 'Mobile', device: 'mobile', width: 390, height: 844 },
]
