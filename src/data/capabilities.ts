// Capability CATEGORIES only. No individual vendor/tool logos are shown
// because the confirmed technology stack has not been supplied.
export interface CapabilityCategory {
  title: string
  description: string
}

export const capabilityCategories: CapabilityCategory[] = [
  { title: 'Frontend Engineering', description: 'Responsive, accessible interfaces built with attention to performance and clarity.' },
  { title: 'Application Development', description: 'Mobile, cross-platform, and desktop experiences designed around real usage.' },
  { title: 'Backend & Integrations', description: 'Services and APIs that connect products, data, and the systems around them.' },
  { title: 'AI & Automation', description: 'Practical automation and AI-assisted workflows that reduce repetitive effort.' },
  { title: 'Product Design', description: 'User journeys, interface design, and visual systems that stay consistent.' },
  { title: 'Deployment & Delivery', description: 'Production-ready builds and a smooth path from development to launch.' },
]
