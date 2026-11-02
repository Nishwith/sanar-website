import type { ReactNode } from 'react'

interface Props {
  eyebrow: string
  children: ReactNode
  lead?: ReactNode
  id?: string
  align?: 'left' | 'center'
  as?: 'h2' | 'h3'
}

/** Eyebrow + masked heading + optional lead copy. Revealed by useGsapReveal. */
export function SectionHeading({ eyebrow, children, lead, id, align = 'left', as: Tag = 'h2' }: Props) {
  return (
    <div className={`sh sh--${align}`}>
      <p className="eyebrow" data-reveal>{eyebrow}</p>
      <Tag id={id} className="sh__title" data-mask>
        <span className="mask"><span className="mask__inner">{children}</span></span>
      </Tag>
      {lead && <p className="sh__lead" data-reveal>{lead}</p>}
    </div>
  )
}
