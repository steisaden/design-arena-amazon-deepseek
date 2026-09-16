import { useId } from 'react'
import { cn } from '../../lib/utils'

interface CheckboxProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label: string
  count?: number
  disabled?: boolean
}

export function Checkbox({ checked, onCheckedChange, label, count, disabled }: CheckboxProps) {
  const id = useId()
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex min-h-11 cursor-pointer items-center gap-2.5 rounded-control px-1 text-sm select-none',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className="peer h-5 w-5 cursor-pointer appearance-none rounded-[4px] border border-line bg-surface-elevated checked:border-brand checked:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100"
        >
          <path
            d="M3 8.5l3 3 7-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex-1 text-ink">{label}</span>
      {count != null && <span className="tabular text-xs text-ink-muted">{count}</span>}
    </label>
  )
}