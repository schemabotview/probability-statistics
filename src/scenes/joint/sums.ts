import type { Scene } from '@graphlearning/flow'
import { sample } from '../plot-kit'

// §4.6 — batch defect rate = 7 + day effect (variance 4) + batch noise (variance 1), as in workshop.ts.
// Var(batch) = 5; Cov(two batches, same day) = 4; different days: 0. Mean of n batches: same day,
// Var = (5n + 4n(n − 1))/n² → 4; different days, Var = 5/n → 0. Exact under the model.
const sameDay = (n: number) => Math.sqrt((5 * n + 4 * n * (n - 1)) / (n * n))
const spread = (n: number) => Math.sqrt(5 / n)

export const sums: Scene = {
  id: 'joint-sums',
  title: 'Variance of sums and dependence',
  flow: 'TB',
  nodes: [
    {
      id: 'sd',
      kind: 'plot',
      label: 'SD of the average defect rate of n batches',
      sub: 'batches from one day share that day’s effect, so averaging them cannot remove it',
      plot: {
        x: { min: 1, max: 24, step: 1, label: 'n, batches averaged' },
        y: { min: 0, max: 2.4, step: 0.2, label: 'SD of the average (percentage points)' },
        series: [
          { kind: 'line', points: [[1, 2], [24, 2]], label: 'floor: SD of the day effect, 2', labelAt: [14, 1.92], color: '#9ca3af' },
          { kind: 'line', points: sample(1, 24, 92, sameDay), label: 'all from one day: covariance 4 each pair', labelAt: [6.2, 2.12], color: '#f472b6' },
          { kind: 'line', points: sample(1, 24, 92, spread), label: 'one per day, different days: independent', labelAt: [5.5, 0.62], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'formula',
      kind: 'table',
      label: 'Var(X₁ + … + Xₙ) = Σ Var(Xᵢ) + 2 Σ Cov(Xᵢ, Xⱼ) over pairs i < j',
      sub: 'Var(batch) = 5, Cov(same day) = 4, Cov(different days) = 0',
      headers: ['n batches', 'one day: SD of average', 'different days: SD of average'],
      values: [1, 2, 4, 12].map((n) => [String(n), sameDay(n).toFixed(2), spread(n).toFixed(2)]),
    },
  ],
  edges: [],
}
