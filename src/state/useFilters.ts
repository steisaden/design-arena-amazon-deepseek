import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { FilterState, SortKey } from '../lib/products'
import { emptyFilters } from '../lib/products'

function parseList(value: string | null): string[] {
  if (!value) return []
  return value.split(',').map((s) => s.trim()).filter(Boolean)
}

function parseNumber(value: string | null): number | null {
  if (value == null || value === '') return null
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

/** Filter state is derived from the URL so navigation, back/forward,
 *  and link sharing all behave predictably. */
export function useFilters(): [FilterState, (patch: Partial<FilterState>) => void, () => void] {
  const [params, setParams] = useSearchParams()

  const state = useMemo<FilterState>(() => {
    return {
      q: params.get('q') ?? '',
      category: params.get('category'),
      brands: parseList(params.get('brands')),
      colors: parseList(params.get('colors')),
      minPrice: parseNumber(params.get('minPrice')),
      maxPrice: parseNumber(params.get('maxPrice')),
      minRating: parseNumber(params.get('minRating')),
      inStockOnly: params.get('inStock') === '1',
      sort: (params.get('sort') as SortKey) ?? 'relevance',
    }
  }, [params])

  const patch = useCallback(
    (p: Partial<FilterState>) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          const setOrDelete = (key: string, value: string | null | undefined) => {
            if (value == null || value === '') next.delete(key)
            else next.set(key, value)
          }
          if ('q' in p) setOrDelete('q', p.q || null)
          if ('category' in p) setOrDelete('category', p.category)
          if ('brands' in p) setOrDelete('brands', p.brands?.length ? p.brands.join(',') : null)
          if ('colors' in p) setOrDelete('colors', p.colors?.length ? p.colors.join(',') : null)
          if ('minPrice' in p) setOrDelete('minPrice', p.minPrice != null ? String(p.minPrice) : null)
          if ('maxPrice' in p) setOrDelete('maxPrice', p.maxPrice != null ? String(p.maxPrice) : null)
          if ('minRating' in p) setOrDelete('minRating', p.minRating != null ? String(p.minRating) : null)
          if ('inStockOnly' in p) setOrDelete('inStock', p.inStockOnly ? '1' : null)
          if ('sort' in p) setOrDelete('sort', p.sort && p.sort !== 'relevance' ? p.sort : null)
          return next
        },
        { replace: true }
      )
    },
    [setParams]
  )

  const reset = useCallback(() => {
    setParams(new URLSearchParams(), { replace: true })
  }, [setParams])

  // Silence unused-import warning for emptyFilters when tree-shaking in prod
  void emptyFilters

  return [state, patch, reset]
}