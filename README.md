# Loom — Marketplace Concept

A concept storefront for a small, considered marketplace. This is not affiliated with
or derived from any real retailer; no brand assets, copy, or interface patterns are
copied. Product names, brands, and imagery are original to this concept.

## Stack

- **Vite + React 18 + TypeScript** — fast dev loop, typed components, no runtime framework overhead.
- **Tailwind CSS 3** with CSS custom properties for the color system.
- **React Router 6** — URL-driven filter and search state so back/forward and sharing behave predictably.
- **No third-party UI library.** All primitives (Button, Input, Checkbox, Select, Sheet, Toast, RangeSlider) are source-owned and styled to the concept’s visual language. This preserves the design direction rather than conforming to a library’s opinions.
- **No component state library.** Cart state lives in a small reducer + Context with localStorage persistence and cross-tab sync. Filter state lives in the URL.

## Running

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production bundle
npm run preview