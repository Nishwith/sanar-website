export type ServiceId = 'web' | 'cross-platform' | 'web-app' | 'design' | 'ai' | 'custom'

export interface Service {
  id: ServiceId
  index: string
  title: string
  tagline: string
  description: string
  capabilities: string[]
  cta: string
}

export const services: Service[] = [
  { id: 'web', index: '01', title: 'Website Development', tagline: 'Web experiences', description: 'Business and corporate website development shaped around your goals, with responsive layouts and clear paths for customers.', capabilities: ['Business websites', 'Landing pages'], cta: 'Discuss a website' },
  { id: 'cross-platform', index: '02', title: 'Cross-Platform App Development', tagline: 'Apps', description: 'Custom mobile app development for Android and iOS, using a shared codebase where it fits the product.', capabilities: ['iOS and Android', 'Shared codebases'], cta: 'Discuss an app' },
  { id: 'web-app', index: '03', title: 'Web Application Development', tagline: 'Web apps', description: 'Custom web applications, dashboards, and business tools that connect workflows, data, and teams.', capabilities: ['Custom workflows', 'Service integrations'], cta: 'Discuss a web app' },
  { id: 'design', index: '04', title: 'UI/UX Design', tagline: 'Experience design', description: 'Website and application interface design grounded in user needs, from product flows to polished screens.', capabilities: ['Product strategy', 'Interface design'], cta: 'Discuss design' },
  { id: 'ai', index: '05', title: 'AI Automation', tagline: 'Intelligent solutions', description: 'AI integrations and workflow automation that reduce repetitive business work and connect everyday systems.', capabilities: ['Workflow automation', 'AI integrations'], cta: 'Discuss automation' },
  { id: 'custom', index: '06', title: 'Custom Software Development', tagline: 'Built for your needs', description: 'Tailored business software for the specific processes, integrations, and challenges your organization faces.', capabilities: ['Business software', 'API integrations'], cta: 'Discuss custom software' },
]
