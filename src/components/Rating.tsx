interface RatingProps {
  value: number
  count?: number
  size?: 'sm' | 'md'
}

export function Rating({ value, count, size = 'sm' }: RatingProps) {
  const px = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'
  const stars = [1, 2, 3, 4, 5]
  return (
    <span className="inline-flex items-center gap-1 text-ink" aria-label={`Rating ${value} out of 5`}>
      <span className="inline-flex" aria-hidden="true">
        {stars.map((s) => {
          const fill = value >= s ? 'full' : value >= s - 0.5 ? 'half' : 'empty'
          return (
            <svg key={s} viewBox="0 0 20 20" className={px}>
              <defs>
                <linearGradient id={`half-${s}`}>
                  <stop offset="50%" stopColor="#B45309" />
                  <stop offset="50%" stopColor="#E0DDD8" />
                </linearGradient>
              </defs>
              <path
                d="M10 1.6l2.5 5.1 5.6.8-4 3.9.9 5.6L10 14.4l-5 2.6.9-5.6-4-3.9 5.6-.8z"
                fill={fill === 'full' ? '#B45309' : fill === 'half' ? `url(#half-${s})` : '#E0DDD8'}
              />
            </svg>
          )
        })}
      </span>
      <span className="tabular text-xs text-ink-muted">
        {value.toFixed(1)}
        {count != null && ` (${count.toLocaleString()})`}
      </span>
    </span>
  )
}