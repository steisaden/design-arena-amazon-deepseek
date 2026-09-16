import { BRANDS, COLORS, PRODUCTS } from '../data/catalog'
import type { FilterState } from '../lib/products'
import { facetCounts } from '../lib/products'
import { Button } from './ui/Button'
import { Checkbox } from './ui/Checkbox'
import { RangeSlider } from './ui/Slider'
import { formatPrice } from '../lib/format'

interface Props {
  filters: FilterState
  patch: (p: Partial<FilterState>) => void
  reset: () => void
  /** variant controls chrome only — content is identical */
  variant?: 'rail' | 'sheet'
  onCloseSheet?: () => void
}

const MAX_PRICE = Math.max(...PRODUCTS.map((p) => p.priceCents))
const RATING_STEPS = [4.5, 4, 3.5, 3]

export function FilterPanel({ filters, patch, reset, variant = 'rail', onCloseSheet }: Props) {
  const brandCounts = facetCounts(PRODUCTS, filters, 'brand')
  const colorCounts = facetCounts(PRODUCTS, filters, 'color')

  const priceMin = filters.minPrice ?? 0
  const priceMax = filters.maxPrice ?? MAX_PRICE

  return (
    <div
      className={
        variant === 'rail'
          ? 'space-y-6'
          : 'space-y-6 px-4 py-4 pb-24'
      }
    >
      <FilterGroup title="Price">
        <div className="pt-1">
          <RangeSlider
            min={0}
            max={MAX_PRICE}
            step={100}
            valueMin={priceMin}
            valueMax={priceMax}
            onChange={(lo, hi) =>
              patch({
                minPrice: lo === 0 ? null : lo,
                maxPrice: hi === MAX_PRICE ? null : hi,
              })
            }
            formatValue={(n) => formatPrice(n)}
          />
        </div>
      </FilterGroup>

      <FilterGroup title="Customer rating">
        <div className="space-y-0.5 pt-1">
          {RATING_STEPS.map((r) => {
            const active = filters.minRating === r
            return (
              <button
                key={r}
                type="button"
                onClick={() => patch({ minRating: active ? null : r })}
                aria-pressed={active}
                className={
                  'flex min-h-11 w-full items-center gap-2 rounded-control px-1 text-left text-sm ' +
                  (active ? 'bg-brand-soft text-brand' : 'text-ink hover:bg-ink/5')
                }
              >
                <Stars value={r} />
                <span>{r} &amp; up</span>
              </button>
            )
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Brand">
        <div className="pt-1">
          {BRANDS.map((b) => (
            <Checkbox
              key={b}
              label={b}
              count={brandCounts[b] ?? 0}
              checked={filters.brands.includes(b)}
              onCheckedChange={(checked) => {
                const next = checked
                  ? [...filters.brands, b]
                  : filters.brands.filter((x) => x !== b)
                patch({ brands: next })
              }}
              disabled={(brandCounts[b] ?? 0) === 0 && !filters.brands.includes(b)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="pt-1">
          {COLORS.map((c) => (
            <Checkbox
              key={c}
              label={c}
              count={colorCounts[c] ?? 0}
              checked={filters.colors.includes(c)}
              onCheckedChange={(checked) => {
                const next = checked
                  ? [...filters.colors, c]
                  : filters.colors.filter((x) => x !== c)
                patch({ colors: next })
              }}
              disabled={(colorCounts[c] ?? 0) === 0 && !filters.colors.includes(c)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <div className="pt-1">
          <Checkbox
            label="In stock only"
            checked={filters.inStockOnly}
            onCheckedChange={(checked) => patch({ inStockOnly: checked })}
          />
        </div>
      </FilterGroup>

      <div className="flex items-center gap-2 pt-2">
        <Button variant="outline" size="sm" onClick={reset} block>
          Clear all
        </Button>
        {variant === 'sheet' && onCloseSheet && (
          <Button size="sm" onClick={onCloseSheet} block>
            Show results
          </Button>
        )}
      </div>
    </div>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      {children}
    </section>
  )
}

function Stars({ value }: { value: number }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  return (
    <span className="inline-flex" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5">
          <path
            d="M10 1.6l2.5 5.1 5.6.8-4 3.9.9 5.6L10 14.4l-5 2.6.9-5.6-4-3.9 5.6-.8z"
            fill={
              i <= full
                ? '#B45309'
                : i === full + 1 && half
                  ? '#B45309'
                  : '#E0DDD8'
            }
            opacity={i === full + 1 && half ? 0.55 : 1}
          />
        </svg>
      ))}
    </span>
  )
}