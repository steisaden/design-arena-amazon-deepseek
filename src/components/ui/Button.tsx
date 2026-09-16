import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  block?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand-hover disabled:bg-brand/60 disabled:cursor-not-allowed',
  secondary:
    'bg-brand-soft text-brand hover:bg-brand-soft/80 disabled:opacity-60 disabled:cursor-not-allowed',
  outline:
    'bg-surface-elevated text-ink border border-line hover:border-ink/40 disabled:opacity-60',
  ghost: 'bg-transparent text-ink hover:bg-ink/5 disabled:opacity-50',
  danger: 'bg-danger text-white hover:bg-danger/90 disabled:opacity-60',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', leftIcon, rightIcon, block, className, children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-control font-medium transition-colors duration-fast',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        variants[variant],
        sizes[size],
        block && 'w-full',
        className
      )}
      {...rest}
    >
      {leftIcon && <span aria-hidden="true" className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span aria-hidden="true" className="shrink-0">{rightIcon}</span>}
    </button>
  )
})