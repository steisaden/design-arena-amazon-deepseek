/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-elevated': 'rgb(var(--surface-elevated) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-muted': 'rgb(var(--ink-muted) / <alpha-value>)',
        brand: {
          DEFAULT: 'rgb(var(--brand) / <alpha-value>)',
          hover: 'rgb(var(--brand-hover) / <alpha-value>)',
          soft: 'rgb(var(--brand-soft) / <alpha-value>)',
        },
        emphasis: 'rgb(var(--emphasis) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        focus: 'rgb(var(--focus) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      borderRadius: {
        card: '6px',
        control: '6px',
        modal: '8px',
      },
      maxWidth: {
        content: '1280px',
      },
      transitionDuration: {
        fast: '120ms',
        base: '180ms',
      },
      keyframes: {
        'slide-in': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'rise': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-in': 'slide-in 200ms ease-out',
        'fade-in': 'fade-in 160ms ease-out',
        rise: 'rise 180ms ease-out',
      },
    },
  },
  plugins: [],
}