import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface ToastItem {
  id: number
  message: string
  action?: { label: string; onClick: () => void }
}

interface ToastContextValue {
  show: (t: Omit<ToastItem, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const counter = useRef(0)

  const show = useCallback((t: Omit<ToastItem, 'id'>) => {
    const id = ++counter.current
    setItems((prev) => [...prev, { ...t, id }])
    window.setTimeout(() => {
      setItems((prev) => prev.filter((x) => x.id !== id))
    }, 5000)
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-6"
      >
        {items.map((t) => (
          <ToastRow key={t.id} item={t} onDismiss={() => setItems((p) => p.filter((x) => x.id !== t.id))} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastRow({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ref.current?.focus()
  }, [])
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      className="pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-modal border border-line bg-ink px-4 py-3 text-sm text-white shadow-lg animate-rise focus:outline-none"
    >
      <span className="flex-1">{item.message}</span>
      {item.action && (
        <button
          type="button"
          onClick={() => {
            item.action!.onClick()
            onDismiss()
          }}
          className="rounded-control bg-white/10 px-2.5 py-1 text-xs font-medium hover:bg-white/20"
        >
          {item.action.label}
        </button>
      )}
      <button
        type="button"
        aria-label="Dismiss"
        onClick={onDismiss}
        className="inline-flex h-7 w-7 items-center justify-center rounded-control hover:bg-white/10"
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}