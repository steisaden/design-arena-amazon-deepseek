import { deliveryWindow } from '../lib/format'

export function TrustSignals({ compact = false }: { compact?: boolean }) {
  const items = [
    {
      label: 'Free shipping over $50',
      detail: `Arrives ${deliveryWindow()}`,
    },
    {
      label: '30-day returns',
      detail: 'Prepaid label included',
    },
    {
      label: 'Secure checkout',
      detail: 'Encrypted end-to-end',
    },
  ]

  if (compact) {
    return (
      <ul className="mt-4 space-y-1.5 text-sm text-ink-muted">
        {items.map((it) => (
          <li key={it.label} className="flex items-start gap-2">
            <CheckIcon />
            <span>
              <span className="text-ink">{it.label}</span> — {it.detail}
            </span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {items.map((it) => (
        <li
          key={it.label}
          className="flex items-start gap-2 rounded-card border border-line bg-surface-elevated p-3"
        >
          <CheckIcon />
          <div className="text-sm">
            <div className="font-medium text-ink">{it.label}</div>
            <div className="text-ink-muted">{it.detail}</div>
          </div>
        </li>
      ))}
    </ul>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4.5 8.3l2.2 2.2 4.8-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}