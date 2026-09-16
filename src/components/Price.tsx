import { formatPrice } from '../lib/format'
import { cn } from '../lib/utils'

interface PriceProps {
  cents: number
  compareAt?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Price({ cents, compareAt, size = 'md', className }: PriceProps) {
  const showCompare = typeof compareAt === 'number' && compareAt > cents
  const pct = showCompare ? Math.round(100 - (cents / compareAt!) * 100) : 0

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl',
  } as const

  return (
    <span className={cn('inline-flex items-baseline gap-2 tabular', className)}>
      <span className={cn('font-semibold text-ink', sizes[size])}>{formatPrice(cents)}</span>
      {showCompare && (
        <>
          <span className="text-xs text-ink-muted line-through">{formatPrice(compareAt!)}</span>
          <span className="text-xs font-medium text-emphasis">-{pct}%</span>
        </>
      )}
    </span>
  )
}