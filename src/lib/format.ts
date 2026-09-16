export function formatPrice(cents: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100)
}

export function formatUnitPrice(cents: number, unit: string): string {
  return `${formatPrice(cents)} / ${unit}`
}

export function deliveryWindow(daysMin = 3, daysMax = 5): string {
  const start = new Date()
  start.setDate(start.getDate() + daysMin)
  const end = new Date()
  end.setDate(end.getDate() + daysMax)
  const opts: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' }
  return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', opts)}`
}