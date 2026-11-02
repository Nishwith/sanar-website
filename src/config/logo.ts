/**
 * SANAR LOGO FILES
 * The navbar uses a transparent crop from the supplied original SANAR wordmark
 * artwork; logo-96.webp remains the compact symbol used in secondary contexts.
 * The Plus Jakarta Sans site font is not used to redraw the custom wordmark.
 *
 * The navigation and footer sit on dark navy. If your logo has dark lettering
 * and becomes hard to read there, add a light version (e.g. logo-light.png) and
 * point `onDark` at it.
 */
export const logoSources: { onDark: string | null; onLight: string | null } = {
  onDark: '/assets/logo/logo-96.webp',
  onLight: '/assets/logo/logo-96.webp',
}
