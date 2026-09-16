export interface Product {
  id: string
  title: string
  brand: string
  category: string
  color: string
  priceCents: number
  compareAtCents?: number
  rating: number
  reviewCount: number
  inStock: boolean
  stockLevel: number
  popularity: number
  addedAt: number
  tags: string[]
  blurb: string
  details: string[]
  materials: string
  origin: string
  /** Procedural visual seed — drives an SVG product illustration. */
  hue: number
  shape: 'bottle' | 'cube' | 'cylinder' | 'pouch' | 'disc' | 'apparel'
}

const P = (p: Omit<Product, 'addedAt'> & { addedAt?: number }): Product => ({
  addedAt: p.addedAt ?? Date.now() - Math.random() * 1e10,
  ...p,
})

export const CATEGORIES = [
  { slug: 'home', label: 'Home & Living' },
  { slug: 'kitchen', label: 'Kitchen' },
  { slug: 'personal-care', label: 'Personal Care' },
  { slug: 'apparel', label: 'Apparel' },
  { slug: 'tech', label: 'Small Tech' },
  { slug: 'stationery', label: 'Stationery' },
]

export const PRODUCTS: Product[] = [
  P({
    id: 'loom-001', title: 'Cedar & Linen Candle', brand: 'Ridgeline',
    category: 'home', color: 'Natural', priceCents: 3400, compareAtCents: 4200,
    rating: 4.7, reviewCount: 218, inStock: true, stockLevel: 24, popularity: 92,
    tags: ['candle', 'cedar', 'linen', 'scented', 'soy'],
    blurb: 'Soy-coconut wax candle with cedarwood, dry linen, and a whisper of smoke. 55-hour burn.',
    details: ['Soy-coconut wax blend', 'Cotton wick', 'Amber glass vessel', '55-hour burn time'],
    materials: 'Soy-coconut wax, cotton wick, amber glass', origin: 'Made in Vermont',
    hue: 32, shape: 'cylinder',
  }),
  P({
    id: 'loom-002', title: 'Stoneware Pour-Over Set', brand: 'Meridian',
    category: 'kitchen', color: 'Slate', priceCents: 5800,
    rating: 4.8, reviewCount: 431, inStock: true, stockLevel: 12, popularity: 97,
    tags: ['coffee', 'pour-over', 'stoneware', 'brewer', 'ceramic'],
    blurb: 'A two-piece stoneware dripper and carafe, glazed in matte slate. Brews 2–3 cups.',
    details: ['Hand-glazed stoneware', 'Fits standard #2 filters', 'Dishwasher safe', '600ml carafe'],
    materials: 'Glazed stoneware', origin: 'Made in Portugal',
    hue: 210, shape: 'disc',
  }),
  P({
    id: 'loom-003', title: 'Everyday Merino Crew', brand: 'Northfield',
    category: 'apparel', color: 'Charcoal', priceCents: 8900,
    rating: 4.6, reviewCount: 156, inStock: true, stockLevel: 40, popularity: 84,
    tags: ['merino', 'sweater', 'wool', 'crew', 'knit'],
    blurb: 'Fine-gauge merino crewneck, machine-washable, built for three-season wear.',
    details: ['100% extra-fine merino', 'Machine wash cold', 'Reinforced cuffs', 'Mulesing-free'],
    materials: '100% extra-fine merino wool', origin: 'Knitted in Italy',
    hue: 220, shape: 'apparel',
  }),
  P({
    id: 'loom-004', title: 'Hinoki Body Wash', brand: 'Kissa',
    category: 'personal-care', color: 'Clear', priceCents: 2400,
    rating: 4.5, reviewCount: 302, inStock: true, stockLevel: 60, popularity: 78,
    tags: ['body wash', 'hinoki', 'sulfate-free', 'shower', 'wood'],
    blurb: 'Gentle sulfate-free body wash scented with hinoki wood and yuzu peel. 300ml.',
    details: ['Sulfate-free', 'pH balanced', 'Recyclable bottle', '300ml'],
    materials: 'Plant-derived surfactants, hinoki oil', origin: 'Made in Japan',
    hue: 150, shape: 'bottle',
  }),
  P({
    id: 'loom-005', title: 'Linen Tea Towel (Set of 2)', brand: 'Ridgeline',
    category: 'home', color: 'Natural', priceCents: 2800,
    rating: 4.4, reviewCount: 89, inStock: true, stockLevel: 33, popularity: 66,
    tags: ['linen', 'towel', 'kitchen', 'tea towel', 'set'],
    blurb: 'Stonewashed European linen tea towels that soften with every wash.',
    details: ['100% European flax linen', 'Stonewashed', 'Set of two', '18 × 26 in'],
    materials: '100% European flax linen', origin: 'Woven in Lithuania',
    hue: 40, shape: 'pouch',
  }),
  P({
    id: 'loom-006', title: 'Walnut Desk Tray', brand: 'Meridian',
    category: 'stationery', color: 'Walnut', priceCents: 4200,
    rating: 4.9, reviewCount: 74, inStock: true, stockLevel: 8, popularity: 71,
    tags: ['desk', 'tray', 'walnut', 'organizer', 'wood'],
    blurb: 'Solid walnut catch-all for pens, keys, and small tools. Felt-lined base.',
    details: ['Solid black walnut', 'Wool felt base', 'Food-safe oil finish', '9 × 5 in'],
    materials: 'Solid black walnut, wool felt', origin: 'Made in Oregon',
    hue: 25, shape: 'cube',
  }),
  P({
    id: 'loom-007', title: 'Ceramic Mug — 12oz', brand: 'Meridian',
    category: 'kitchen', color: 'Ochre', priceCents: 2200,
    rating: 4.7, reviewCount: 511, inStock: true, stockLevel: 120, popularity: 95,
    tags: ['mug', 'ceramic', 'coffee', 'tea', 'cup'],
    blurb: 'Thick-walled ceramic mug with a satin glaze and comfortable handle. 12oz.',
    details: ['Stoneware', 'Satin glaze', 'Dishwasher & microwave safe', '12oz'],
    materials: 'Glazed stoneware', origin: 'Made in Portugal',
    hue: 38, shape: 'cylinder',
  }),
  P({
    id: 'loom-008', title: 'Aluminum Travel Bottle', brand: 'Northfield',
    category: 'home', color: 'Slate', priceCents: 3200,
    rating: 4.3, reviewCount: 187, inStock: false, stockLevel: 0, popularity: 62,
    tags: ['bottle', 'water', 'aluminum', 'travel', 'insulated'],
    blurb: 'Single-wall aluminum bottle with a leak-proof cap. 750ml.',
    details: ['Single-wall aluminum', 'Leak-proof cap', 'BPA-free', '750ml'],
    materials: 'Recycled aluminum', origin: 'Made in Germany',
    hue: 205, shape: 'bottle',
  }),
  P({
    id: 'loom-009', title: 'Wireless Charging Pad', brand: 'Aperture',
    category: 'tech', color: 'Charcoal', priceCents: 4600, compareAtCents: 5900,
    rating: 4.2, reviewCount: 264, inStock: true, stockLevel: 45, popularity: 80,
    tags: ['charger', 'wireless', 'qi', 'pad', 'tech'],
    blurb: 'Qi2 15W wireless charging pad with a soft-touch fabric top and USB-C.',
    details: ['Qi2 certified', '15W fast charge', 'USB-C cable included', 'Non-slip base'],
    materials: 'Recycled ABS, fabric', origin: 'Assembled in Vietnam',
    hue: 200, shape: 'disc',
  }),
  P({
    id: 'loom-010', title: 'Notebook — A5 Dot Grid', brand: 'Aperture',
    category: 'stationery', color: 'Natural', priceCents: 1600,
    rating: 4.8, reviewCount: 623, inStock: true, stockLevel: 200, popularity: 91,
    tags: ['notebook', 'dot grid', 'journal', 'a5', 'paper'],
    blurb: '160 pages of 100gsm cream paper with a lay-flat binding.',
    details: ['100gsm cream paper', 'Lay-flat binding', 'A5 (5.8 × 8.3 in)', '160 pages'],
    materials: 'FSC-certified paper, linen cover', origin: 'Made in Portugal',
    hue: 44, shape: 'pouch',
  }),
  P({
    id: 'loom-011', title: 'Bar Soap — Sea Salt', brand: 'Kissa',
    category: 'personal-care', color: 'Natural', priceCents: 1200,
    rating: 4.6, reviewCount: 145, inStock: true, stockLevel: 90, popularity: 69,
    tags: ['soap', 'bar', 'sea salt', 'handmade', 'bath'],
    blurb: 'Cold-process bar soap with sea salt and olive oil. 140g.',
    details: ['Cold-process', 'Palm-oil free', 'Plastic-free wrap', '140g'],
    materials: 'Olive oil, coconut oil, sea salt', origin: 'Made in Maine',
    hue: 165, shape: 'pouch',
  }),
  P({
    id: 'loom-012', title: 'Cotton Canvas Tote', brand: 'Northfield',
    category: 'apparel', color: 'Natural', priceCents: 2600,
    rating: 4.5, reviewCount: 198, inStock: true, stockLevel: 75, popularity: 76,
    tags: ['tote', 'canvas', 'bag', 'cotton', 'carry'],
    blurb: 'Heavyweight cotton canvas tote with reinforced handles and an interior pocket.',
    details: ['12oz cotton canvas', 'Reinforced handles', 'Interior pocket', '15 × 16 in'],
    materials: '12oz organic cotton canvas', origin: 'Sewn in India',
    hue: 48, shape: 'pouch',
  }),
  P({
    id: 'loom-013', title: 'Cast Iron Skillet — 10"', brand: 'Ridgeline',
    category: 'kitchen', color: 'Charcoal', priceCents: 4400,
    rating: 4.9, reviewCount: 812, inStock: true, stockLevel: 30, popularity: 98,
    tags: ['skillet', 'cast iron', 'pan', 'cooking', 'kitchen'],
    blurb: 'Pre-seasoned cast iron skillet with a smooth cooking surface and helper handle.',
    details: ['Pre-seasoned', 'Smooth-milled surface', 'Oven safe to 500°F', '10 inch'],
    materials: 'Cast iron', origin: 'Made in USA',
    hue: 20, shape: 'disc',
  }),
  P({
    id: 'loom-014', title: 'Linen Bedding Set — Queen', brand: 'Ridgeline',
    category: 'home', color: 'Natural', priceCents: 18900, compareAtCents: 22900,
    rating: 4.7, reviewCount: 67, inStock: true, stockLevel: 6, popularity: 73,
    tags: ['linen', 'bedding', 'sheets', 'queen', 'duvet'],
    blurb: 'Stonewashed European flax linen bedding set — duvet cover and two shams.',
    details: ['100% European flax', 'Stonewashed', 'Duvet + 2 shams', 'Queen'],
    materials: '100% European flax linen', origin: 'Woven in Lithuania',
    hue: 36, shape: 'pouch',
  }),
  P({
    id: 'loom-015', title: 'Mechanical Pencil — 0.5mm', brand: 'Aperture',
    category: 'stationery', color: 'Slate', priceCents: 1800,
    rating: 4.6, reviewCount: 289, inStock: true, stockLevel: 110, popularity: 82,
    tags: ['pencil', 'mechanical', '0.5mm', 'writing', 'metal'],
    blurb: 'Brass-bodied mechanical pencil with a knurled grip and 0.5mm lead.',
    details: ['Brass body', 'Knurled grip', '0.5mm lead', 'Refillable'],
    materials: 'Brass', origin: 'Made in Japan',
    hue: 195, shape: 'cylinder',
  }),
  P({
    id: 'loom-016', title: 'Wool Throw Blanket', brand: 'Northfield',
    category: 'home', color: 'Ochre', priceCents: 12400,
    rating: 4.8, reviewCount: 54, inStock: true, stockLevel: 14, popularity: 70,
    tags: ['blanket', 'wool', 'throw', 'cozy', 'woven'],
    blurb: 'Loom-woven lambswool throw with a whipstitched edge. 50 × 70 in.',
    details: ['Lambswool', 'Whipstitched edge', '50 × 70 in', 'Dry clean'],
    materials: '100% lambswool', origin: 'Woven in Scotland',
    hue: 34, shape: 'pouch',
  }),
  P({
    id: 'loom-017', title: 'Desk Lamp — Warm LED', brand: 'Aperture',
    category: 'tech', color: 'Charcoal', priceCents: 7800,
    rating: 4.4, reviewCount: 121, inStock: true, stockLevel: 22, popularity: 74,
    tags: ['lamp', 'desk', 'led', 'light', 'dimmable'],
    blurb: 'Dimmable LED desk lamp with a weighted base and three color temperatures.',
    details: ['Dimmable', '3 color temperatures', 'Weighted base', 'USB-C powered'],
    materials: 'Powder-coated steel, aluminum', origin: 'Assembled in Vietnam',
    hue: 30, shape: 'cylinder',
  }),
  P({
    id: 'loom-018', title: 'Glass Food Storage — Set of 3', brand: 'Meridian',
    category: 'kitchen', color: 'Clear', priceCents: 3800,
    rating: 4.5, reviewCount: 210, inStock: true, stockLevel: 50, popularity: 79,
    tags: ['storage', 'glass', 'container', 'food', 'set'],
    blurb: 'Borosilicate glass containers with bamboo lids — nested set of three.',
    details: ['Borosilicate glass', 'Bamboo lids', 'Nesting set', 'Microwave safe'],
    materials: 'Borosilicate glass, bamboo', origin: 'Made in China',
    hue: 175, shape: 'cube',
  }),
]

export const BRANDS = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort()
export const COLORS = Array.from(new Set(PRODUCTS.map((p) => p.color))).sort()

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function relatedProducts(p: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (x) => x.id !== p.id && (x.category === p.category || x.brand === p.brand)
  )
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit)
}