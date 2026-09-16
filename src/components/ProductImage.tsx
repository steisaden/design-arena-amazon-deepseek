import type { Product } from '../data/catalog'

interface Props {
  product: Product
  size?: number
  className?: string
  /** Render at a decorative scale, e.g. a hero view. */
  variant?: 'card' | 'hero'
}

/**
 * Procedural product illustration — a deterministic SVG rendering that
 * derives its palette from the product hue. No external assets, no stock
 * photography, and stable across renders.
 */
export function ProductImage({ product, size, className, variant = 'card' }: Props) {
  const { hue, shape, title } = product
  const bg = `hsl(${hue} 24% 92%)`
  const mid = `hsl(${hue} 34% 62%)`
  const dark = `hsl(${hue} 40% 38%)`
  const light = `hsl(${hue} 30% 82%)`

  const vb = variant === 'hero' ? 480 : 320
  const s = size ?? (variant === 'hero' ? 480 : 320)
  const stroke = Math.max(1, vb / 200)

  return (
    <svg
      role="img"
      aria-label={`Illustration of ${title}`}
      viewBox={`0 0 ${vb} ${vb}`}
      width={s}
      height={s}
      className={className}
    >
      <defs>
        <radialGradient id={`bg-${product.id}-${variant}`} cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor={bg} />
        </radialGradient>
      </defs>
      <rect width={vb} height={vb} fill={`url(#bg-${product.id}-${variant})`} />

      {/* Ground shadow */}
      <ellipse cx={vb / 2} cy={vb * 0.78} rx={vb * 0.28} ry={vb * 0.035} fill={dark} opacity={0.12} />

      {/* Shape-specific illustration */}
      <g transform={`translate(${vb / 2} ${vb * 0.5})`}>
        {shape === 'cylinder' && (
          <>
            <rect x={-vb * 0.14} y={-vb * 0.24} width={vb * 0.28} height={vb * 0.5} rx={vb * 0.06} fill={mid} />
            <ellipse cx={0} cy={-vb * 0.24} rx={vb * 0.14} ry={vb * 0.045} fill={light} />
            <ellipse cx={0} cy={vb * 0.26} rx={vb * 0.14} ry={vb * 0.045} fill={dark} />
            <rect x={-vb * 0.14} y={-vb * 0.02} width={vb * 0.28} height={stroke * 2} fill={dark} opacity={0.35} />
          </>
        )}
        {shape === 'bottle' && (
          <>
            <rect x={-vb * 0.05} y={-vb * 0.3} width={vb * 0.1} height={vb * 0.06} rx={vb * 0.01} fill={dark} />
            <rect x={-vb * 0.09} y={-vb * 0.25} width={vb * 0.18} height={vb * 0.08} rx={vb * 0.015} fill={dark} />
            <path
              d={`M ${-vb * 0.13} ${-vb * 0.17} Q ${-vb * 0.16} 0 ${-vb * 0.13} ${vb * 0.26} L ${vb * 0.13} ${vb * 0.26} Q ${vb * 0.16} 0 ${vb * 0.13} ${-vb * 0.17} Z`}
              fill={mid}
            />
            <rect x={-vb * 0.09} y={vb * 0.02} width={vb * 0.18} height={vb * 0.14} rx={vb * 0.01} fill={light} opacity={0.6} />
          </>
        )}
        {shape === 'cube' && (
          <>
            <path d={`M ${-vb * 0.2} ${-vb * 0.14} L 0 ${-vb * 0.26} L ${vb * 0.2} ${-vb * 0.14} L 0 ${-vb * 0.02} Z`} fill={light} />
            <path d={`M ${-vb * 0.2} ${-vb * 0.14} L 0 ${-vb * 0.02} L 0 ${vb * 0.26} L ${-vb * 0.2} ${vb * 0.14} Z`} fill={mid} />
            <path d={`M ${vb * 0.2} ${-vb * 0.14} L 0 ${-vb * 0.02} L 0 ${vb * 0.26} L ${vb * 0.2} ${vb * 0.14} Z`} fill={dark} />
          </>
        )}
        {shape === 'disc' && (
          <>
            <ellipse cx={0} cy={vb * 0.14} rx={vb * 0.22} ry={vb * 0.06} fill={dark} />
            <path
              d={`M ${-vb * 0.22} ${vb * 0.14} L ${-vb * 0.22} ${-vb * 0.02} A ${vb * 0.22} ${vb * 0.06} 0 0 1 ${vb * 0.22} ${-vb * 0.02} L ${vb * 0.22} ${vb * 0.14}`}
              fill={mid}
            />
            <ellipse cx={0} cy={-vb * 0.02} rx={vb * 0.22} ry={vb * 0.06} fill={light} />
          </>
        )}
        {shape === 'pouch' && (
          <>
            <path
              d={`M ${-vb * 0.2} ${-vb * 0.16} Q 0 ${-vb * 0.24} ${vb * 0.2} ${-vb * 0.16} L ${vb * 0.22} ${vb * 0.2} Q 0 ${vb * 0.28} ${-vb * 0.22} ${vb * 0.2} Z`}
              fill={mid}
            />
            <path
              d={`M ${-vb * 0.2} ${-vb * 0.16} Q 0 ${-vb * 0.24} ${vb * 0.2} ${-vb * 0.16}`}
              stroke={dark}
              strokeWidth={stroke}
              fill="none"
            />
          </>
        )}
        {shape === 'apparel' && (
          <>
            <path
              d={`M ${-vb * 0.16} ${-vb * 0.24} L ${-vb * 0.06} ${-vb * 0.3} L ${-vb * 0.03} ${-vb * 0.26} Q 0 ${-vb * 0.2} ${vb * 0.03} ${-vb * 0.26} L ${vb * 0.06} ${-vb * 0.3} L ${vb * 0.16} ${-vb * 0.24} L ${vb * 0.24} ${-vb * 0.1} L ${vb * 0.16} ${-vb * 0.04} L ${vb * 0.14} ${vb * 0.24} L ${-vb * 0.14} ${vb * 0.24} L ${-vb * 0.16} ${-vb * 0.04} L ${-vb * 0.24} ${-vb * 0.1} Z`}
              fill={mid}
            />
            <path
              d={`M ${-vb * 0.06} ${-vb * 0.3} Q 0 ${-vb * 0.18} ${vb * 0.06} ${-vb * 0.3}`}
              stroke={dark}
              strokeWidth={stroke * 1.5}
              fill="none"
            />
          </>
        )}
      </g>
    </svg>
  )
}