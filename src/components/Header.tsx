import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { CATEGORIES } from '../data/catalog'
import { useCart } from '../state/CartContext'
import { Input } from './ui/Input'

export function Header() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { count, open } = useCart()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  useEffect(() => {
    setQuery(params.get('q') ?? '')
  }, [params])

  useEffect(() => {
    setMobileSearchOpen(false)
  }, [location.pathname, location.search])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur-sm">
      <div className="container-content flex h-16 items-center gap-3">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <Logo />
          <span className="font-serif text-lg font-semibold tracking-tight">Loom</span>
        </Link>

        <nav aria-label="Categories" className="ml-2 hidden items-center gap-1 lg:flex">
          {CATEGORIES.slice(0, 4).map((c) => (
            <Link
              key={c.slug}
              to={`/search?category=${c.slug}`}
              className="rounded-control px-3 py-2 text-sm text-ink hover:bg-ink/5"
            >
              {c.label}
            </Link>
          ))}
          <Link to="/search" className="rounded-control px-3 py-2 text-sm text-ink hover:bg-ink/5">
            All
          </Link>
        </nav>

        <form role="search" onSubmit={submit} className="ml-auto hidden w-full max-w-md md:block">
          <Input
            type="search"
            aria-label="Search products"
            placeholder="Search products, brands, categories"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <button
            type="button"
            aria-label="Open search"
            className="inline-flex h-11 w-11 items-center justify-center rounded-control hover:bg-ink/5 md:hidden"
            onClick={() => setMobileSearchOpen((v) => !v)}
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            onClick={open}
            aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-control hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <CartIcon />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-[20px] items-center justify-center rounded-full bg-brand px-1.5 text-[11px] font-semibold leading-5 text-white tabular">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="border-t border-line bg-surface px-4 pb-3 pt-2 md:hidden">
          <form role="search" onSubmit={submit}>
            <Input
              autoFocus
              type="search"
              aria-label="Search products"
              placeholder="Search products, brands, categories"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  to={`/search?category=${c.slug}`}
                  className="rounded-full border border-line bg-surface-elevated px-3 py-1.5 text-xs text-ink"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </form>
        </div>
      )}
    </header>
  )
}

function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7 text-brand" aria-hidden="true">
      <path
        d="M4 24c4-12 8-18 12-18s8 6 12 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="16" cy="12" r="2.2" fill="currentColor" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
      <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
      <path
        d="M3 4h2l1.5 9.5a1.5 1.5 0 0 0 1.5 1.3h7.2a1.5 1.5 0 0 0 1.5-1.2L18 6H5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="17.5" r="1.3" fill="currentColor" />
      <circle cx="15" cy="17.5" r="1.3" fill="currentColor" />
    </svg>
  )
}

export default Header