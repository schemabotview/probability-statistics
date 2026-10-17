import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §7.4 — a sample of 25 seat heights (numpy seed 23, rounded to 0.1 mm): x̄ = 449.41, s = 3.46,
// t₀.₉₇₅,₂₄ = 2.064. Confidence interval for μ: (447.99, 450.84). Prediction interval for one new chair,
// x̄ ± t s √(1 + 1/n): (442.14, 456.69). 95%/95% tolerance interval, k = 2.631 (Howe): (440.32, 458.51).
// The population's actual middle 95% is 442.36 to 457.64.
const X = [441.0, 441.7, 444.8, 447.2, 447.6, 447.7, 447.9, 448.0, 448.6, 448.8, 448.8, 448.9, 449.1, 449.8, 450.3, 450.8, 451.0, 451.2, 451.7, 452.2, 452.4, 453.2, 453.2, 453.5, 455.9]
const DOTS: PlotPoint[] = X.map((x) => [x, 0.5])
const bar = (lo: number, hi: number, y: number, label: string, color: string) => ({ kind: 'segment' as const, from: [lo, y] as PlotPoint, to: [hi, y] as PlotPoint, dashed: false, label, labelAt: [lo, y + 0.35] as PlotPoint, color })

export const prediction: Scene = {
  id: 'inf-prediction',
  title: 'Confidence, prediction and tolerance intervals',
  flow: 'TB',
  nodes: [
    {
      id: 'three',
      kind: 'plot',
      label: 'Three 95% intervals from the same 25 seat heights, answering three questions',
      sub: 'where is the mean? where will the next chair be? where are most chairs?',
      plot: {
        x: { min: 438, max: 461, step: 1, label: 'seat height (mm)' },
        y: { min: 0, max: 5, step: 1 },
        series: [
          { kind: 'scatter', points: DOTS, label: 'the 25 chairs', labelAt: [438.3, 0.85], color: '#9ca3af' },
          bar(447.99, 450.84, 1.6, 'confidence interval for μ: ±1.43', '#2dd4bf'),
          bar(442.14, 456.69, 2.8, 'prediction interval for the next chair: ±7.27', '#fbbf24'),
          bar(440.32, 458.51, 4.0, 'tolerance interval, 95% of chairs with 95% confidence: ±9.09', '#f472b6'),
        ],
      },
    },
    {
      id: 'targets',
      kind: 'table',
      label: 'Different targets, different widths',
      sub: 'x̄ = 449.41, s = 3.46, n = 25; only the confidence interval shrinks to zero as n grows',
      headers: ['interval', 'formula', 'result', 'as n → ∞'],
      values: [
        ['confidence, for μ', 'x̄ ± t s/√n', '(447.99, 450.84)', 'shrinks to μ'],
        ['prediction, one new chair', 'x̄ ± t s √(1 + 1/n)', '(442.14, 456.69)', '→ μ ± 1.96σ'],
        ['tolerance, 95% of chairs', 'x̄ ± k s, k = 2.631', '(440.32, 458.51)', '→ μ ± 1.96σ'],
        ['true middle 95%', 'μ ± 1.96σ', '(442.36, 457.64)', '—'],
      ],
    },
  ],
  edges: [],
}
