import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/catalog'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="container-content grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-serif text-lg font-semibold">Loom</div>
          <p className="mt-2 max-w-xs text-sm text-ink-muted">
            A considered marketplace for everyday goods — sourced from small makers, priced
            without the markup.
          </p>
        </div>
        <FooterCol title="Shop">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link to={`/search?category=${c.slug}`} className="hover:underline">
                {c.label}
              </Link>
            </li>
          ))}
        </FooterCol>
        <FooterCol title="About">
          <li>Sourcing standard</li>
          <li>Returns &amp; shipping</li>
          <li>Contact</li>
          <li>Careers</li>
        </FooterCol>
        <FooterCol title="Legal">
          <li>Terms of service</li>
          <li>Privacy policy</li>
          <li>Accessibility</li>
          <li>Cookie preferences</li>
        </FooterCol>
      </div>
      <div className="border-t border-line">
        <div className="container-content flex flex-col items-start justify-between gap-2 py-4 text-xs text-ink-muted sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Loom — a design concept, not a real store.</span>
          <span>Prices in USD. Free returns within 30 days.</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-ink-muted">{children}</ul>
    </div>
  )
}

export default Footer