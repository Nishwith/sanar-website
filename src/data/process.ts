export interface ProcessStep {
  step: string
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  { step: '01', title: 'Discover', description: 'Understand the business, users, challenges, requirements, and objectives.' },
  { step: '02', title: 'Define', description: 'Establish scope, priorities, solution architecture, and project direction.' },
  { step: '03', title: 'Design', description: 'Create the interface, user journey, and visual system.' },
  { step: '04', title: 'Develop', description: 'Build the application or website using an appropriate technology stack.' },
  { step: '05', title: 'Test & Launch', description: 'Validate functionality, responsiveness, accessibility, and production readiness.' },
  { step: '06', title: 'Improve', description: 'Support future enhancements and improvements according to the agreed scope.' },
]
