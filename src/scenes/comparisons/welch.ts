import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { mean, sd } from '../plot-kit'

// §8.2 — processing times under setting A (15 jobs) and B (25 jobs), numpy seed 31. Means 14.70 and 11.29,
// SDs 1.59 and 4.01. Welch: SE 0.901, df 34.2, 95% CI (1.58, 5.24), p = 0.0006. Pooled: SE 1.087, df 38,
// CI (1.21, 5.61), p = 0.0033. Type I error with true means equal, n = 10 (SD 4.5) vs 40 (SD 1.5), 20 000
// simulations (seed 32): Welch 0.048, pooled 0.256. Group CIs use t₀.₉₇₅ = 2.145 (14 df) and 2.064 (24 df).
const A = [13.2, 14.5, 15.2, 12.1, 15.5, 14.5, 15.6, 14.5, 16.3, 12.1, 17.6, 16.4, 12.8, 15.3, 14.9]
const B = [4.6, 15.2, 9.9, 11.4, 9.8, 10.6, 12.8, 12.9, 5.5, 11.3, 6.4, 6.8, 10.9, 16.3, 15.3, 9.8, 9.3, 8.8, 13.1, 16.7, 12.6, 15.6, 13.9, 19.3, 3.5]
const jitter = (xs: number[], x0: number): PlotPoint[] => xs.map((v, i) => [x0 - 0.18 + (0.36 * i) / (xs.length - 1), v])
const ci = (xs: number[], t: number) => {
  const h = (t * sd(xs)) / Math.sqrt(xs.length)
  return [mean(xs) - h, mean(xs) + h]
}

export const welch: Scene = {
  id: 'cmp-welch',
  title: 'Welch and pooled mean comparisons',
  flow: 'TB',
  nodes: [
    {
      id: 'groups',
      kind: 'plot',
      label: 'Processing times under two machine settings',
      sub: 'B is faster on average but far more variable; group sizes differ',
      plot: {
        x: { min: 0.5, max: 2.5, step: 0.5, label: 'setting: 1 = A, 2 = B' },
        y: { min: 2, max: 20, step: 2, label: 'minutes' },
        series: [
          { kind: 'scatter', points: jitter(A, 1), label: `A: 15 jobs, mean ${mean(A).toFixed(2)}, SD ${sd(A).toFixed(2)}`, labelAt: [0.55, 19.3], color: '#2dd4bf' },
          { kind: 'scatter', points: jitter(B, 2), label: `B: 25 jobs, mean ${mean(B).toFixed(2)}, SD ${sd(B).toFixed(2)}`, labelAt: [1.45, 2.6], color: '#f472b6' },
          { kind: 'segment', from: [1.3, ci(A, 2.145)[0]], to: [1.3, ci(A, 2.145)[1]], dashed: false, size: 9, label: 'mean ± t SE', labelAt: [1.33, ci(A, 2.145)[1] + 0.4], color: '#2dd4bf' },
          { kind: 'segment', from: [2.3, ci(B, 2.064)[0]], to: [2.3, ci(B, 2.064)[1]], dashed: false, size: 9, color: '#f472b6' },
        ],
      },
    },
    {
      id: 'methods',
      kind: 'table',
      label: 'Difference in means A − B = 3.41 minutes, two ways',
      sub: 'pooled assumes equal variances; Welch does not',
      headers: ['method', 'SE', 'df', '95% CI', 'p'],
      values: [
        ['Welch', '0.901', '34.2', '(1.58, 5.24)', '0.0006'],
        ['pooled', '1.087', '38', '(1.21, 5.61)', '0.0033'],
        ['type I error, unequal SDs', 'Welch 0.048', '—', 'pooled 0.256', 'simulated'],
      ],
    },
  ],
  edges: [],
}
