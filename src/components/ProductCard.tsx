import { Link } from 'react-router-dom'
import type { Product } from '../data/catalog'
import { ProductImage } from './ProductImage'
import { Rating } from './Rating'
import { Price } from './Price'
import { Badge } from './ui/Badge'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const lowStock = product.inStock && product.stockLevel > 0 && product.stockLevel <= 10
  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface-elevated transition-colors duration-base hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      <div className="relative aspect-square overflow-hidden bg-surface">
        <ProductImage product={product} className="h-full w-full" />
        {!product.inStock && (
          <div className="absolute left-2 top-2">
            <Badge tone="neutral">Out of stock</Badge>
          </div>
        )}
        {product.compareAtCents && product.inStock && (
          <div className="absolute left-2 top-2">
            <Badge tone="emphasis">Sale</Badge>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <div className="text-xs uppercase tracking-wide text-ink-muted">{product.brand}</div>
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-ink group-hover:underline">
          {product.title}
        </h3>
        <Rating value={product.rating} count={product.reviewCount} />
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <Price cents={product.priceCents} compareAt={product.compareAtCents} />
          {lowStock && (
            <span className="text-xs text-emphasis">Only {product.stockLevel} left</span>
          )}
        </div>
      </div>
    </Link>
  )
}