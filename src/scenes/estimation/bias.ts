import type { Scene } from '@graphlearning/flow'
import { bars } from '../plot-kit'

// §6.2 — sample variance of n = 5 seat heights, Normal(450, 3.9²), σ² = 15.21. Divisor n − 1: unbiased,
// MSE 2σ⁴/(n − 1) = 115.7; divisor n: mean (n − 1)σ²/n = 12.17 (bias −3.04), MSE (2n − 1)σ⁴/n² = 83.3
// (exact). 20 000 simulated samples (numpy seed 18), 2-unit bins, last bin ≥ 78: means 15.09 and 12.08,
// MSEs 115.0 and 83.4.
const EDGES = Array.from({ length: 41 }, (_, i) => 2 * i)
const UNB = [572, 1399, 1836, 1941, 1948, 1732, 1632, 1445, 1246, 1118, 933, 725, 653, 509, 431, 382, 279, 226, 197, 165, 120, 97, 81, 57, 58, 46, 33, 24, 33, 18, 16, 14, 6, 5, 2, 3, 2, 2, 3, 11]
const MLE = [872, 1971, 2437, 2416, 2186, 1899, 1691, 1397, 1129, 853, 726, 543, 457, 329, 261, 202, 141, 122, 72, 78, 52, 39, 37, 26, 18, 14, 7, 4, 3, 3, 2, 5, 2, 1, 0, 2, 2, 1, 0, 0]
const d = (c: number[]) => c.map((v) => v / (20000 * 2))

export const bias: Scene = {
  id: 'est-bias',
  title: 'Bias, variance, MSE and consistency',
  flow: 'TB',
  nodes: [
    {
      id: 'variance',
      kind: 'plot',
      label: 'Two estimators of σ² = 15.21 from samples of five seat heights',
      sub: 'dividing by n − 1 is unbiased; dividing by n is biased low, but less variable',
      plot: {
        x: { min: 0, max: 60, step: 5, label: 'estimate of σ² (mm²)' },
        y: { min: 0, max: 0.065, step: 0.01, label: 'density' },
        series: [
          ...bars(EDGES, d(MLE)).map((points) => ({ kind: 'line' as const, points, color: '#f472b6' })),
          ...bars(EDGES, d(UNB)).map((points) => ({ kind: 'line' as const, points, color: '#2dd4bf' })),
          { kind: 'segment', from: [15.21, 0], to: [15.21, 0.062], dashed: false, label: 'σ² = 15.21', labelAt: [15.7, 0.061], color: '#fbbf24' },
          { kind: 'marker', at: [30, 0.03], size: 0, label: 'teal: ÷ (n − 1), mean 15.09', labelAt: [27, 0.04], color: '#2dd4bf' },
          { kind: 'marker', at: [30, 0.03], size: 0, label: 'pink: ÷ n, mean 12.08', labelAt: [27, 0.034], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'errors',
      kind: 'table',
      label: 'MSE = bias² + variance: unbiased is not automatically better',
      sub: 'exact for normal samples of n = 5; simulation agrees',
      headers: ['estimator', 'mean', 'bias', 'MSE'],
      values: [
        ['s² = Σ(x − x̄)² / (n − 1)', '15.21', '0', '115.7'],
        ['σ̂² = Σ(x − x̄)² / n', '12.17', '−3.04', '83.3'],
        ['simulated, ÷ (n − 1)', '15.09', '−0.12', '115.0'],
        ['simulated, ÷ n', '12.08', '−3.13', '83.4'],
        ['as n → ∞', 'both → σ²', 'bias → 0', 'both consistent'],
      ],
    },
  ],
  edges: [],
}
