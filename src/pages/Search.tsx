import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CATEGORIES, PRODUCTS } from '../data/catalog'
import { applyFilters } from '../lib/products'
import { useFilters } from '../state/useFilters'
import { ProductCard } from '../components/ProductCard'
import { FilterPanel } from '../components/FilterPanel'
import { SortSelect } from '../components/SortSelect'
import { Button } from '../components/ui/Button'
import { Sheet } from '../components/ui/Sheet'
import { Skeleton } from '../components/ui/Skeleton'

export default function Search() {
  const [params] = useSearchParams()
  const [filters, patch, reset] = useFilters()
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
  const [loading] = useState(false)

  // Guard: category in URL must exist
  const validCategory = useMemo(
    () => (filters.category && CATEGORIES.some((c) => c.slug === filters.category) ? filters.category : null),
    [filters.category]
  )

  const results = useMemo(() => {
    const base = PRODUCTS
    return applyFilters(base, { ...filters, category: validCategory })
  }, [filters, validCategory])

  const activeCategory = CATEGORIES.find((c) => c.slug === validCategory)
  const heading = filters.q
    ? `Results for "${filters.q}"`
    : activeCategory
      ? activeCategory.label
      : 'All products'

  const activeFilterCount =
    filters.brands.length +
    filters.colors.length +
    (filters.minPrice != null || filters.maxPrice != null ? 1 : 0) +
    (filters.minRating != null ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0)

  return (
    <div className="container-content py-6 md:py-8">
      {/* Breadcrumb + heading */}
      <nav aria-label="Breadcrumb" className="text-xs text-ink-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/search" className="hover:underline">
              All products
            </Link>
          </li>
          {activeCategory && (
            <>
              <li aria-hidden="true">/</li>
              <li className="text-ink">{activeCategory.label}</li>
            </>
          )}
        </ol>
      </nav>

      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl">{heading}</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {results.length} {results.length === 1 ? 'product' : 'products'}
            {params.get('q') && (
              <>
                {' '}for <span className="text-ink">“{params.get('q')}”</span>
              </>
            )}
          </p>
        </div>
        <div className="hidden md:block md:w-56">
          <SortSelect value={filters.sort} onChange={(v) => patch({ sort: v })} />
        </div>
      </div>

      {/* Mobile controls */}
      <div className="mt-4 flex items-center gap-2 md:hidden">
        <Button
          variant="outline"
          onClick={() => setFilterSheetOpen(true)}
          leftIcon={<FilterIcon />}
        >
          Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
        </Button>
        <div className="flex-1">
          <SortSelect value={filters.sort} onChange={(v) => patch({ sort: v })} />
        </div>
      </div>

      <div className="mt-6 grid gap-8 md:grid-cols-[220px_1fr]">
        {/* Desktop filter rail */}
        <aside
          aria-label="Filters"
          className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto scroll-thin pr-2 md:block"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Filters</h2>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={reset}
                className="text-xs text-brand hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <FilterPanel filters={filters} patch={patch} reset={reset} />
        </aside>

        {/* Results */}
        <section aria-label="Search results">
          {loading ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="space-y-2">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </li>
              ))}
            </ul>
          ) : results.length === 0 ? (
            <EmptyResults onReset={reset} />
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Mobile filter sheet */}
      <Sheet
        open={filterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
        title="Filters"
        side="bottom"
      >
        <FilterPanel
          filters={filters}
          patch={patch}
          reset={reset}
          variant="sheet"
          onCloseSheet={() => setFilterSheetOpen(false)}
        />
      </Sheet>
    </div>
  )
}

function EmptyResults({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-modal border border-line bg-surface-elevated p-8 text-center">
      <h2 className="font-serif text-xl">No products match those filters</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">
        Try clearing one or two filters, or widen the price range.
      </p>
      <div className="mt-4">
        <Button onClick={onReset}>Clear all filters</Button>
      </div>
    </div>
  )
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <path
        d="M2 4h12M4 8h8M6 12h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}