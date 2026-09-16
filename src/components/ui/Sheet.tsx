import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface SheetProps {
  open: boolean
  onClose: () => void
  title?: string
  side?: 'right' | 'bottom'
  children: ReactNode
  footer?: ReactNode
  labelledBy?: string
}

/**
 * Accessible sheet / drawer. Handles Escape, focus trap (basic), body scroll lock,
 * and returns focus to the previously focused element on close.
 */
export function Sheet({
  open,
  onClose,
  title,
  side = 'right',
  children,
  footer,
  labelledBy,
}: SheetProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const lastActive = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    lastActive.current = document.activeElement as HTMLElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const panel = panelRef.current
    panel?.focus()

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      lastActive.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <div
        className="absolute inset-0 bg-ink/40 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={!labelledBy ? title : undefined}
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={cn(
          'absolute bg-surface-elevated shadow-xl focus:outline-none',
          side === 'right' &&
            'right-0 top-0 flex h-full w-full max-w-md flex-col animate-slide-in',
          side === 'bottom' &&
            'bottom-0 left-0 right-0 flex max-h-[88vh] flex-col rounded-t-modal animate-rise'
        )}
      >
        {title && (
          <header className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="inline-flex h-10 w-10 items-center justify-center rounded-control hover:bg-ink/5"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>
        )}
        <div className="flex-1 overflow-y-auto scroll-thin">{children}</div>
        {footer && <div className="border-t border-line bg-surface-elevated p-4">{footer}</div>}
      </div>
    </div>
  )
}