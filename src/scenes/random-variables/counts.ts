import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { FLAWS_PER_PANEL } from '../workshop'
import { poisson } from './dist'

// §3.4 — N = chairs inspected up to and including the first defective, Geometric(p = 0.07) on {1, 2, …}:
// P(N = k) = 0.93ᵏ⁻¹ × 0.07, mean 1/p = 14.29, median 10, P(N > 30) = 0.93³⁰ = 0.113. The other convention
// counts failures before the first defective: mean 13.29. Flaws per panel ~ Poisson(1.5): exact pmf.
const geo = (k: number) => 0.93 ** (k - 1) * 0.07
const K = Array.from({ length: 45 }, (_, i) => i + 1)
const PTS: PlotPoint[] = K.map((k) => [k, geo(k)])
const P = poisson(FLAWS_PER_PANEL)

export const counts: Scene = {
  id: 'rv-counts',
  title: 'Geometric and Poisson counts',
  flow: 'TB',
  nodes: [
    {
      id: 'first',
      kind: 'plot',
      label: 'Chairs inspected until the first defective: Geometric(0.07)',
      sub: 'most likely at the first chair, yet the mean is 14.3 and 11% of runs pass 30 chairs',
      plot: {
        x: { min: 0, max: 46, step: 5, label: 'k, inspections up to the first defective' },
        y: { min: 0, max: 0.075, step: 0.01, label: 'P(N = k)' },
        series: [
          ...PTS.map((pt) => ({ kind: 'segment' as const, from: [pt[0], 0] as PlotPoint, to: pt, dashed: false, color: '#2dd4bf' })),
          { kind: 'segment', from: [14.29, 0], to: [14.29, 0.06], dashed: false, label: 'mean 1/p = 14.3', labelAt: [14.8, 0.058], color: '#fbbf24' },
          { kind: 'segment', from: [10, 0], to: [10, 0.068], dashed: false, label: 'median 10', labelAt: [10.5, 0.069], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'conventions',
      kind: 'table',
      label: 'Count models and their parameter conventions',
      sub: 'state which convention you use: software differs',
      headers: ['model', 'counts', 'P(value)', 'mean'],
      values: [
        ['geometric, trials', 'inspections incl. the first defect', '0.93ᵏ⁻¹ × 0.07, k ≥ 1', '14.29'],
        ['geometric, failures', 'good chairs before it', '0.93ᵏ × 0.07, k ≥ 0', '13.29'],
        ['Poisson(1.5)', 'flaws per panel', `P(0) = ${P(0).toFixed(3)}, P(1) = ${P(1).toFixed(3)}`, '1.5 (= variance)'],
        ['Poisson(1.5)', 'P(3 or more flaws)', (1 - P(0) - P(1) - P(2)).toFixed(3), '—'],
      ],
    },
  ],
  edges: [],
}
