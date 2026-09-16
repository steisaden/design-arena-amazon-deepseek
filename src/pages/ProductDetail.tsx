import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProduct, relatedProducts } from '../data/catalog'
import { ProductImage } from '../components/ProductImage'
import { ProductCard } from '../components/ProductCard'
import { Rating } from '../components/Rating'
import { Price } from '../components/Price'
import { TrustSignals } from '../components/TrustSignals'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { useCart } from '../state/CartContext'
import { useToast } from '../components/ui/Toast'
import { deliveryWindow, formatPrice } from '../lib/format'
import { cn } from '../lib/utils'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const product = id ? getProduct(id) : undefined
  const cart = useCart()
  const { show } = useToast()
  const [qty, setQty] = useState(1)
  const [galleryIdx, setGalleryIdx] = useState(0)
  const addBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    setQty(1)
    setGalleryIdx(0)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [id])

  const related = useMemo(() => (product ? relatedProducts(product, 4) : []), [product])

  if (!product) return <Navigate to="/search" replace />

  const lowStock = product.inStock && product.stockLevel > 0 && product.stockLevel <= 10

  function handleAdd() {
    if (!product || !product.inStock) return
    cart.add(product.id, qty)
    cart.open()
    show({
      message: `${qty} × ${product.title} added to cart`,
      action: { label: 'View cart', onClick: () => cart.open() },
    })
    addBtnRef.current?.focus()
  }

  return (
    <div className="container-content py-6 md:py-8">
      <nav aria-label="Breadcrumb" className="text-xs text-ink-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to={`/search?category=${product.category}`} className="hover:underline">
              {product.category.replace('-', ' ')}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">{product.title}</li>
        </ol>
      </nav>

      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-modal border border-line bg-surface-elevated">
            <ProductImage
              key={galleryIdx}
              product={{ ...product, hue: (product.hue + galleryIdx * 24) % 360 }}
              variant="hero"
              className="h-full w-full"
            />
          </div>
          <div className="mt-3 flex gap-2" role="tablist" aria-label="Product images">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                role="tab"
                aria-selected={galleryIdx === i}
                aria-label={`View image ${i + 1}`}
                onClick={() => setGalleryIdx(i)}
                className={cn(
                  'h-16 w-16 overflow-hidden rounded-card border bg-surface-elevated',
                  galleryIdx === i ? 'border-brand' : 'border-line'
                )}
              >
                <ProductImage
                  product={{ ...product, hue: (product.hue + i * 24) % 360 }}
                  className="h-full w-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info column */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wide text-ink-muted">
              {product.brand}
            </span>
            {product.compareAtCents && <Badge tone="emphasis">Sale</Badge>}
            {!product.inStock && <Badge tone="neutral">Out of stock</Badge>}
            {lowStock && <Badge tone="emphasis">Only {product.stockLevel} left</Badge>}
          </div>

          <h1 className="mt-2 font-serif text-2xl leading-tight md:text-3xl">{product.title}</h1>

          <div className="mt-3">
            <Rating value={product.rating} count={product.reviewCount} size="md" />
          </div>

          <div className="mt-5">
            <Price
              cents={product.priceCents}
              compareAt={product.compareAtCents}
              size="lg"
            />
            <p className="mt-1 text-xs text-ink-muted">
              Free shipping over {formatPrice(5000)} · Arrives {deliveryWindow()}
            </p>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-ink">{product.blurb}</p>

          {/* Purchase block */}
          <div className="mt-6 rounded-modal border border-line bg-surface-elevated p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="pdp-qty" className="text-sm text-ink-muted">
                  Qty
                </label>
                <div className="inline-flex items-center rounded-control border border-line">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="inline-flex h-10 w-10 items-center justify-center hover:bg-ink/5"
                  >
                    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                      <path d="M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                  <input
                    id="pdp-qty"
                    type="text"
                    inputMode="numeric"
                    value={qty}
                    onChange={(e) => {
                      const n = Number(e.target.value.replace(/[^0-9]/g, ''))
                      if (Number.isFinite(n) && n >= 1) setQty(Math.min(99, n))
                    }}
                    className="h-10 w-12 border-x border-line bg-surface-elevated text-center text-sm tabular focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => Math.min(99, q + 1))}
                    className="inline-flex h-10 w-10 items-center justify-center hover:bg-ink/5"
                  >
                    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                      <path d="M2 6h8M6 2v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
              <Button
                ref={addBtnRef}
                size="lg"
                onClick={handleAdd}
                disabled={!product.inStock}
                className="flex-1"
              >
                {product.inStock ? 'Add to cart' : 'Out of stock'}
              </Button>
            </div>
            {cart.isInCart(product.id) && (
              <p className="mt-3 text-xs text-brand">
                Already in your cart — adding again will increase the quantity.
              </p>
            )}
          </div>

          {/* Trust */}
          <div className="mt-4">
            <TrustSignals compact />
          </div>

          {/* Details */}
          <div className="mt-8">
            <h2 className="font-serif text-lg">Details</h2>
            <dl className="mt-3 divide-y divide-line rounded-card border border-line bg-surface-elevated">
              <DetailRow label="Materials" value={product.materials} />
              <DetailRow label="Origin" value={product.origin} />
              <DetailRow label="Color" value={product.color} />
              <DetailRow
                label="Availability"
                value={product.inStock ? `In stock (${product.stockLevel})` : 'Out of stock'}
              />
            </dl>
            <ul className="mt-4 space-y-1.5 text-sm text-ink">
              {product.details.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-14">
          <h2 id="related-heading" className="font-serif text-2xl">
            You might also like
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Mobile sticky add-to-cart */}
      <div
        role="region"
        aria-label="Purchase"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface-elevated/95 px-4 py-3 backdrop-blur-sm lg:hidden"
      >
        <div className="mx-auto flex max-w-content items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{product.title}</div>
            <div className="tabular text-xs text-ink-muted">{formatPrice(product.priceCents)}</div>
          </div>
          <Button onClick={handleAdd} disabled={!product.inStock} size="lg">
            {product.inStock ? 'Add to cart' : 'Unavailable'}
          </Button>
        </div>
      </div>
      {/* Spacer so the sticky bar doesn't overlap content */}
      <div className="h-24 lg:hidden" aria-hidden="true" />
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-4 py-3 text-sm">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="text-right text-ink">{value}</dd>
    </div>
  )
}