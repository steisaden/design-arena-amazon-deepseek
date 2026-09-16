import type { Product } from '../data/catalog'

export type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest'

export interface FilterState {
  q: string
  category: string | null
  brands: string[]
  colors: string[]
  minPrice: number | null
  maxPrice: number | null
  minRating: number | null
  inStockOnly: boolean
  sort: SortKey
}

export const emptyFilters: FilterState = {
  q: '',
  category: null,
  brands: [],
  colors: [],
  minPrice: null,
  maxPrice: null,
  minRating: null,
  inStockOnly: false,
  sort: 'relevance',
}

export function scoreRelevance(p: Product, q: string): number {
  if (!q) return 0
  const query = q.toLowerCase()
  let score = 0
  if (p.title.toLowerCase().includes(query)) score += 10
  if (p.brand.toLowerCase().includes(query)) score += 6
  if (p.category.toLowerCase().includes(query)) score += 4
  for (const tag of p.tags) if (tag.includes(query)) score += 2
  return score
}

export function applyFilters(products: Product[], f: FilterState): Product[] {
  let list = products.slice()

  if (f.category) list = list.filter((p) => p.category === f.category)

  if (f.q.trim()) {
    const q = f.q.trim().toLowerCase()
    list = list.filter((p) => {
      const hay = [p.title, p.brand, p.category, ...p.tags].join(' ').toLowerCase()
      return hay.includes(q)
    })
  }

  if (f.brands.length) list = list.filter((p) => f.brands.includes(p.brand))
  if (f.colors.length) list = list.filter((p) => f.colors.includes(p.color))
  if (f.minPrice != null) list = list.filter((p) => p.priceCents >= f.minPrice!)
  if (f.maxPrice != null) list = list.filter((p) => p.priceCents <= f.maxPrice!)
  if (f.minRating != null) list = list.filter((p) => p.rating >= f.minRating!)
  if (f.inStockOnly) list = list.filter((p) => p.inStock)

  switch (f.sort) {
    case 'price-asc':
      list.sort((a, b) => a.priceCents - b.priceCents)
      break
    case 'price-desc':
      list.sort((a, b) => b.priceCents - a.priceCents)
      break
    case 'rating':
      list.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
      list.sort((a, b) => b.addedAt - a.addedAt)
      break
    case 'relevance':
    default:
      if (f.q.trim()) {
        list.sort((a, b) => scoreRelevance(b, f.q) - scoreRelevance(a, f.q))
      } else {
        list.sort((a, b) => b.popularity - a.popularity)
      }
  }
  return list
}

/** Facet counts computed from a base set — reflects current query + category scope,
 *  but ignores the facet's own selections so users can broaden/narrow freely. */
export function facetCounts(
  base: Product[],
  f: FilterState,
  facet: 'brand' | 'color'
): Record<string, number> {
  const scoped: FilterState = { ...f }
  if (facet === 'brand') scoped.brands = []
  if (facet === 'color') scoped.colors = []
  const pool = applyFilters(base, scoped)
  const counts: Record<string, number> = {}
  for (const p of pool) {
    const key = p[facet]
    counts[key] = (counts[key] ?? 0) + 1
  }
  return counts
}