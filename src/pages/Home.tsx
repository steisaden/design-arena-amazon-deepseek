import { Link } from 'react-router-dom'
import { CATEGORIES, PRODUCTS } from '../data/catalog'
import { ProductCard } from '../components/ProductCard'
import { ProductImage } from '../components/ProductImage'
import { TrustSignals } from '../components/TrustSignals'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { formatPrice } from '../lib/format'

export default function Home() {
  const featured = PRODUCTS.slice()
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4)
  const hero = PRODUCTS.find((p) => p.id === 'loom-002')!
  const newArrivals = PRODUCTS.slice()
    .sort((a, b) => b.addedAt - a.addedAt)
    .slice(0, 4)

  return (
    <div className="container-content py-8 md:py-12">
      {/* Hero: contains a real product decision, not empty brand space */}
      <section
        aria-labelledby="hero-heading"
        className="grid items-stretch gap-6 rounded-modal border border-line bg-surface-elevated p-5 md:grid-cols-[1.05fr_1fr] md:p-8"
      >
        <div className="flex flex-col justify-center gap-4">
          <Badge tone="brand">This week — Meridian</Badge>
          <h1 id="hero-heading" className="font-serif text-3xl leading-tight md:text-4xl">
            Slow goods for everyday rooms.
          </h1>
          <p className="max-w-md text-ink-muted">
            Loom carries a small, rotating catalog of home, kitchen and personal goods from
            independent makers. Fewer choices, better ones.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to={`/product/${hero.id}`}>
              <Button size="lg">Shop the pour-over set</Button>
            </Link>
            <Link to="/search?category=home">
              <Button size="lg" variant="outline">
                Browse home
              </Button>
            </Link>
          </div>
          <dl className="mt-2 grid grid-cols-3 gap-4 text-sm">
            <Stat label="Makers" value="28" />
            <Stat label="Avg rating" value="4.6" />
            <Stat label="Return window" value="30 days" />
          </dl>
        </div>
        <Link
          to={`/product/${hero.id}`}
          aria-label={`View ${hero.title}`}
          className="relative flex items-center justify-center overflow-hidden rounded-card bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <ProductImage product={hero} variant="hero" className="h-full w-full" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-card border border-line bg-surface-elevated/95 px-3 py-2 backdrop-blur-sm">
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-wide text-ink-muted">{hero.brand}</div>
              <div className="truncate text-sm font-medium">{hero.title}</div>
            </div>
            <div className="tabular text-sm font-semibold">{formatPrice(hero.priceCents)}</div>
          </div>
        </Link>
      </section>

      {/* Categories */}
      <section aria-labelledby="cats-heading" className="mt-10">
        <div className="flex items-baseline justify-between">
          <h2 id="cats-heading" className="font-serif text-2xl">
            Categories
          </h2>
          <Link to="/search" className="text-sm text-brand hover:underline">
            See all products
          </Link>
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => {
            const count = PRODUCTS.filter((p) => p.category === c.slug).length
            return (
              <li key={c.slug}>
                <Link
                  to={`/search?category=${c.slug}`}
                  className="flex h-full flex-col justify-between rounded-card border border-line bg-surface-elevated p-4 hover:border-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  <span className="text-sm font-medium">{c.label}</span>
                  <span className="mt-6 text-xs text-ink-muted tabular">
                    {count} item{count === 1 ? '' : 's'}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Featured */}
      <section aria-labelledby="featured-heading" className="mt-12">
        <div className="flex items-baseline justify-between">
          <h2 id="featured-heading" className="font-serif text-2xl">
            Most loved
          </h2>
          <Link to="/search?sort=rating" className="text-sm text-brand hover:underline">
            Top rated
          </Link>
        </div>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Trust and service" className="mt-12">
        <TrustSignals />
      </section>

      {/* New arrivals */}
      <section aria-labelledby="new-heading" className="mt-12">
        <div className="flex items-baseline justify-between">
          <h2 id="new-heading" className="font-serif text-2xl">
            New this month
          </h2>
          <Link to="/search?sort=newest" className="text-sm text-brand hover:underline">
            All new
          </Link>
        </div>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-ink-muted">{label}</dt>
      <dd className="font-medium tabular">{value}</dd>
    </div>
  )
}