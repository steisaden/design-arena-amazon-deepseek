import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  leadingIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leadingIcon, className, id, ...rest },
  ref
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const describedBy = [hint ? `${inputId}-hint` : null, error ? `${inputId}-err` : null]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="label mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {leadingIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            'h-11 w-full rounded-control border border-line bg-surface-elevated px-3 text-sm text-ink placeholder:text-ink-muted/70',
            'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
            leadingIcon && 'pl-10',
            error && 'border-danger',
            className
          )}
          {...rest}
        />
      </div>
      {hint && !error && (
        <p id={`${inputId}-hint`} className="hint mt-1">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${inputId}-err`} className="mt-1 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  )
})