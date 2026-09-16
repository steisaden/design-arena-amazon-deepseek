import type { SortKey } from '../lib/products'
import { Select } from './ui/Select'

const options: { value: SortKey; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'newest', label: 'Newest' },
]

export function SortSelect({
  value,
  onChange,
  className,
}: {
  value: SortKey
  onChange: (v: SortKey) => void
  className?: string
}) {
  return (
    <Select
      label="Sort"
      value={value}
      onChange={(v) => onChange(v as SortKey)}
      options={options}
      className={className}
    />
  )
}