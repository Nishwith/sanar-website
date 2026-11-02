export interface NavItem {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Our Process', href: '#approach' },
  { label: 'Contact', href: '#contact' },
]

export const sectionIds = ['home', 'about', 'services', 'products', 'approach', 'capabilities', 'philosophy', 'build-products', 'contact'] as const
