import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface BadgeProps {
  children: ReactNode
  tone?: 'neutral' | 'brand' | 'emphasis' | 'danger'
  className?: string
}

const tones = {
  neutral: 'bg-ink/5 text-ink',
  brand: 'bg-brand-soft text-brand',
  emphasis: 'bg-emphasis/10 text-emphasis',
  danger: 'bg-danger/10 text-danger',
} as const

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}