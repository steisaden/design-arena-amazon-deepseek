import { useId } from 'react'

interface RangeSliderProps {
  min: number
  max: number
  step?: number
  valueMin: number
  valueMax: number
  onChange: (min: number, max: number) => void
  label?: string
  formatValue?: (n: number) => string
}

/**
 * Dual-thumb range slider implemented with two native range inputs layered
 * on top of each other. Both inputs are keyboard accessible and labelled.
 */
export function RangeSlider({
  min,
  max,
  step = 1,
  valueMin,
  valueMax,
  onChange,
  label,
  formatValue = (n) => String(n),
}: RangeSliderProps) {
  const idA = useId()
  const idB = useId()
  const span = max - min || 1
  const pctA = ((valueMin - min) / span) * 100
  const pctB = ((valueMax - min) / span) * 100

  return (
    <div>
      {label && <div className="label mb-2">{label}</div>}
      <div className="relative h-9">
        <div className="absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-line" />
        <div
          className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-brand"
          style={{ left: `${pctA}%`, right: `${100 - pctB}%` }}
        />
        <input
          id={idA}
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          aria-label="Minimum"
          onChange={(e) => {
            const next = Math.min(Number(e.target.value), valueMax - step)
            onChange(next, valueMax)
          }}
          className="pointer-events-none absolute top-1/2 h-9 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
        />
        <input
          id={idB}
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          aria-label="Maximum"
          onChange={(e) => {
            const next = Math.max(Number(e.target.value), valueMin + step)
            onChange(valueMin, next)
          }}
          className="pointer-events-none absolute top-1/2 h-9 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-ink-muted tabular">
        <span>{formatValue(valueMin)}</span>
        <span>{formatValue(valueMax)}</span>
      </div>
    </div>
  )
}