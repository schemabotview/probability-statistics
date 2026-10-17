import type { Scene } from '@graphlearning/flow'
import { sample } from '../plot-kit'

// §9.7 — planning the blocked experiment of §9.2: each day 2 A and 2 B batches, within-day SD 1, so each
// day's B − A difference has variance 1 and the estimate's SE = 1/√days. Power to detect −0.8 points with a
// two-sided t-test on the day differences (noncentral t, scipy): 3 days 0.14, 5 days 0.28, 10 days 0.62,
// 15 days 0.82, 20 days 0.92. The curve below uses the normal approximation 1 − Φ(1.96 − 0.8√days), with Φ
// from the tanh approximation (error below 2 × 10⁻⁴); it overstates power at few days (0.28 vs 0.14 at 3).
const Phi = (x: number) => 0.5 * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * x ** 3)))
const power = (days: number) => 1 - Phi(1.96 - 0.8 * Math.sqrt(days))

export const protocol: Scene = {
  id: 'exp-protocol',
  title: 'Prespecified metrics, power, stopping and external validity',
  flow: 'TB',
  nodes: [
    {
      id: 'power',
      kind: 'plot',
      label: 'Power of the blocked setting experiment against the number of days',
      sub: 'target: detect a 0.8-point fall in defect rate; dots: exact t-test power',
      plot: {
        x: { min: 2, max: 30, step: 2, label: 'days run (4 batches a day)' },
        y: { min: 0, max: 1.02, step: 0.1, label: 'power' },
        series: [
          { kind: 'line', points: [[2, 0.8], [30, 0.8]], label: 'target 0.8', labelAt: [25, 0.76], color: '#9ca3af' },
          { kind: 'line', points: sample(2, 30, 120, power), label: 'normal approximation', labelAt: [17, 0.62], color: '#2dd4bf' },
          { kind: 'scatter', points: [[3, 0.135], [5, 0.281], [10, 0.616], [15, 0.821], [20, 0.924], [30, 0.988]], label: 'exact: 15 days gives 0.82', labelAt: [15.5, 0.9], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'plan',
      kind: 'table',
      label: 'A prespecified protocol for the setting experiment',
      sub: 'written before the first batch, so the analysis cannot be steered by the results',
      headers: ['element', 'decision'],
      values: [
        ['primary metric', 'defect rate per batch, end-of-line check'],
        ['design', '15 days, 2 A + 2 B per day, randomised within day'],
        ['analysis', 'mean of day differences, t-test, intention to treat'],
        ['stopping', 'run all 15 days; no interim tests'],
        ['external validity', 'this product mix and supplier only'],
      ],
    },
  ],
  edges: [],
}
