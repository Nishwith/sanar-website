import { useId, useState } from 'react'

import { logoSources } from '../config/logo'

/** Shows the optimized SANAR mark (see config/logo.ts), with a vector fallback if unavailable. */

interface LogoProps {
  variant?: 'onDark' | 'onLight'
  className?: string
  height?: number
}

export function Logo({ variant = 'onDark', className = '', height = 34 }: LogoProps) {
  const src = logoSources[variant]
  const [failed, setFailed] = useState(false)
  if (src && !failed) {
    return <img className={`logo ${className}`} src={src} alt="SANAR IT Solutions" width={96} height={96} style={{ height, width: 'auto' }} onError={() => setFailed(true)} />
  }
  return <PlaceholderLogo variant={variant} className={className} height={height} />
}

function PlaceholderLogo({ variant, className, height }: Required<LogoProps>) {
  const uid = useId().replace(/:/g, '')
  const word = variant === 'onDark' ? '#FFFFFF' : '#071426'
  return (
    <svg
      className={`logo logo--placeholder ${className}`}
      height={height}
      viewBox="0 0 170 40"
      role="img"
      aria-label="SANAR IT Solutions"
      data-placeholder="true"
    >
      <defs>
        <linearGradient id={`${uid}a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00D9FF" />
          <stop offset="1" stopColor="#0866FF" />
        </linearGradient>
        <linearGradient id={`${uid}b`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0866FF" />
          <stop offset="1" stopColor="#0A3FB8" />
        </linearGradient>
      </defs>
      {/* layered S-like mark */}
      <path d="M8 4h24l-8 8H8z" fill={`url(#${uid}a)`} />
      <path d="M8 12h8l8 8H8z" fill={`url(#${uid}b)`} />
      <path d="M16 20h16v8H16z" fill={`url(#${uid}a)`} opacity=".92" />
      <path d="M8 28h24l-8 8H8z" fill={`url(#${uid}b)`} />
      <text x="46" y="27" fontFamily="'Plus Jakarta Sans Variable', sans-serif" fontWeight="800" fontSize="22" letterSpacing="2.5" fill={word}>
        SANAR
      </text>
    </svg>
  )
}
