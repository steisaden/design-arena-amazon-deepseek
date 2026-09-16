import { Link } from 'react-router-dom'
import { useCart } from '../state/CartContext'
import { Sheet } from './ui/Sheet'
import { Button } from './ui/Button'
import { ProductImage } from './ProductImage'
import { formatPrice } from '../lib/format'
import { useToast } from './ui/Toast'

export function CartDrawer() {
  const cart = useCart()
  const { show } = useToast()

  const freeThreshold = 5000
  const remaining = Math.max(0, freeThreshold - cart.subtotalCents)
  const progress = Math.min(100, (cart.subtotalCents / freeThreshold) * 100)

  return (
    <Sheet
      open={cart.isOpen}
      onClose={cart.close}
      title={`Your cart${cart.count ? ` (${cart.count})` : ''}`}
      side="right"
      footer={
        cart.lines.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-muted">Subtotal</span>
              <span className="text-base font-semibold tabular">
                {formatPrice(cart.subtotalCents)}
              </span>
            </div>
            <p className="hint">
              Shipping and taxes calculated at checkout.
            </p>
            <Button block size="lg" onClick={() => show({ message: 'Checkout is not part of this concept.' })}>
              Checkout
            </Button>
            <Button variant="ghost" block onClick={cart.close}>
              Continue shopping
            </Button>
          </div>
        ) : null
      }
    >
      {cart.lines.length === 0 ? (
        <EmptyCart onClose={cart.close} />
      ) : (
        <div className="p-4">
          {/* Free shipping progress */}
          <div className="mb-4 rounded-card border border-line bg-surface p-3">
            <p className="text-xs text-ink-muted">
              {remaining === 0 ? (
                <span className="text-brand">You qualify for free shipping.</span>
              ) : (
                <>
                  Add <span className="font-medium text-ink">{formatPrice(remaining)}</span> for
                  free shipping.
                </>
              )}
            </p>
            <div className="mt-2 h-1 w-full rounded-full bg-line">
              <div
                className="h-1 rounded-full bg-brand transition-all duration-base"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ul className="divide-y divide-line">
            {cart.lines.map((line) => (
              <li key={line.id} className="flex gap-3 py-4">
                <Link
                  to={`/product/${line.id}`}
                  onClick={cart.close}
                  className="h-20 w-20 shrink-0 overflow-hidden rounded-card border border-line"
                  aria-label={`View ${line.product.title}`}
                >
                  <ProductImage product={line.product} className="h-full w-full" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="text-xs uppercase tracking-wide text-ink-muted">
                    {line.product.brand}
                  </div>
                  <Link
                    to={`/product/${line.id}`}
                    onClick={cart.close}
                    className="mt-0.5 line-clamp-2 text-sm font-medium text-ink hover:underline"
                  >
                    {line.product.title}
                  </Link>
                  {!line.product.inStock && (
                    <div className="mt-1 text-xs text-danger">Out of stock</div>
                  )}
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <QtyControl
                      qty={line.qty}
                      onChange={(q) => cart.setQty(line.id, q)}
                      onRemove={() => {
                        const snap = { lines: cart.lines.map((l) => ({ id: l.id, qty: l.qty })), updatedAt: Date.now() }
                        cart.remove(line.id)
                        show({
                          message: `${line.product.title} removed`,
                          action: {
                            label: 'Undo',
                            onClick: () => cart.restore(snap),
                          },
                        })
                      }}
                    />
                    <span className="text-sm font-medium tabular">
                      {formatPrice(line.lineTotal)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Sheet>
  )
}

function QtyControl({
  qty,
  onChange,
  onRemove,
}: {
  qty: number
  onChange: (q: number) => void
  onRemove: () => void
}) {
  return (
    <div className="inline-flex items-center gap-1">
      <div className="inline-flex items-center rounded-control border border-line">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => onChange(qty - 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-l-control hover:bg-ink/5"
        >
          <MinusIcon />
        </button>
        <input
          type="text"
          inputMode="numeric"
          value={qty}
          aria-label="Quantity"
          onChange={(e) => {
            const n = Number(e.target.value.replace(/[^0-9]/g, ''))
            if (Number.isFinite(n) && n >= 1) onChange(n)
          }}
          className="h-9 w-10 border-x border-line bg-surface-elevated text-center text-sm tabular focus:outline-none"
        />
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => onChange(qty + 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-r-control hover:bg-ink/5"
        >
          <PlusIcon />
        </button>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="ml-1 rounded-control px-2 py-1 text-xs text-ink-muted hover:bg-ink/5 hover:text-ink"
      >
        Remove
      </button>
    </div>
  )
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-brand">
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
          <path
            d="M4 5h2l2 11a2 2 0 0 0 2 1.7h8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="10" cy="20" r="1.4" fill="currentColor" />
          <circle cx="18" cy="20" r="1.4" fill="currentColor" />
        </svg>
      </div>
      <h3 className="font-serif text-lg">Your cart is empty</h3>
      <p className="max-w-xs text-sm text-ink-muted">
        Browse the marketplace to find your first item — every product is sourced from a small
        maker.
      </p>
      <Button onClick={onClose}>Continue shopping</Button>
    </div>
  )
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
      <path d="M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
      <path d="M2 6h8M6 2v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export default CartDrawer