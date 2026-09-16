import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import type { ReactNode } from 'react'
import { getProduct, PRODUCTS, type Product } from '../data/catalog'

export interface CartLine {
  id: string
  qty: number
}

interface CartState {
  lines: CartLine[]
  updatedAt: number
}

type Action =
  | { type: 'add'; id: string; qty?: number }
  | { type: 'setQty'; id: string; qty: number }
  | { type: 'remove'; id: string }
  | { type: 'restore'; state: CartState }
  | { type: 'clear' }

const STORAGE_KEY = 'loom.cart.v1'

function loadInitial(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { lines: [], updatedAt: 0 }
    const parsed = JSON.parse(raw) as CartState
    const valid = parsed.lines.filter((l) => PRODUCTS.some((p) => p.id === l.id) && l.qty > 0)
    return { lines: valid, updatedAt: parsed.updatedAt ?? 0 }
  } catch {
    return { lines: [], updatedAt: 0 }
  }
}

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'add': {
      const qty = action.qty ?? 1
      const existing = state.lines.find((l) => l.id === action.id)
      const lines = existing
        ? state.lines.map((l) =>
            l.id === action.id ? { ...l, qty: Math.min(99, l.qty + qty) } : l
          )
        : [...state.lines, { id: action.id, qty }]
      return { lines, updatedAt: Date.now() }
    }
    case 'setQty': {
      const qty = Math.max(0, Math.min(99, action.qty))
      if (qty === 0) {
        return { lines: state.lines.filter((l) => l.id !== action.id), updatedAt: Date.now() }
      }
      return {
        lines: state.lines.map((l) => (l.id === action.id ? { ...l, qty } : l)),
        updatedAt: Date.now(),
      }
    }
    case 'remove':
      return { lines: state.lines.filter((l) => l.id !== action.id), updatedAt: Date.now() }
    case 'restore':
      return action.state
    case 'clear':
      return { lines: [], updatedAt: Date.now() }
  }
}

export interface CartLineView {
  id: string
  product: Product
  qty: number
  lineTotal: number
}

export interface CartSnapshot {
  lines: CartLine[]
  updatedAt: number
}

export interface CartContextValue {
  lines: CartLineView[]
  count: number
  subtotalCents: number
  isOpen: boolean
  open: () => void
  close: () => void
  add: (id: string, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  restore: (state: CartSnapshot) => void
  snapshot: () => CartSnapshot
  isInCart: (id: string) => boolean
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* ignore quota errors */
    }
  }, [state])

  // Sync cart across tabs
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== STORAGE_KEY || !e.newValue) return
      try {
        const next = JSON.parse(e.newValue) as CartState
        dispatch({ type: 'restore', state: next })
      } catch {
        /* ignore */
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLineView[] = state.lines.flatMap((l) => {
      const product = getProduct(l.id)
      if (!product) return []
      return [{ id: l.id, product, qty: l.qty, lineTotal: product.priceCents * l.qty }]
    })
    const subtotalCents = lines.reduce((sum, l) => sum + l.lineTotal, 0)
    const count = lines.reduce((sum, l) => sum + l.qty, 0)
    return {
      lines,
      count,
      subtotalCents,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add: (id, qty) => dispatch({ type: 'add', id, qty }),
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      remove: (id) => dispatch({ type: 'remove', id }),
      restore: (s) => dispatch({ type: 'restore', state: s }),
      snapshot: () => state,
      isInCart: (id) => state.lines.some((l) => l.id === id),
    }
  }, [state, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}