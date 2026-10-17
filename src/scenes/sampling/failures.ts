import type { Scene } from '@graphlearning/flow'
import { bars, sample } from '../plot-kit'

// §5.5 — means of n = 30 Pareto(α = 1.5) draws, 10 000 samples (numpy seed 15): mean of means 3.00, median
// 2.52, 72% below the true mean 3, skewness 17.5, values ≥ 10 lumped in the last bin (102 of them); sample SD of the means 2.87. No finite
// variance, so no normal limit at rate √n. Finite-population correction √((N − n)/(N − 1)): 0.990 for
// n = 120 of 6000; 0.707 for n = 3000. Same-day batches: chapter 4.
const EDGES = Array.from({ length: 37 }, (_, i) => 1 + 0.25 * i)
const COUNTS = [0, 11, 277, 1069, 1802, 1699, 1351, 985, 658, 502, 320, 254, 182, 133, 116, 84, 86, 62, 41, 35, 40, 35, 20, 17, 14, 17, 14, 18, 8, 11, 8, 8, 5, 7, 9, 102]
const DENS = COUNTS.map((c) => c / (10000 * 0.25))
const mean = 3.0022
const sd = 2.866 // sample SD of the 10 000 means; the population variance is infinite
const naive = (x: number) => Math.exp(-(((x - 3) / sd) ** 2) / 2) / (sd * Math.sqrt(2 * Math.PI))

export const failures: Scene = {
  id: 'samp-failures',
  title: 'Dependence, heavy tails and finite-population corrections',
  flow: 'TB',
  nodes: [
    {
      id: 'heavy',
      kind: 'plot',
      label: 'Means of 30 draws from a heavy-tailed (Pareto α = 1.5) distribution',
      sub: 'most sample means fall below the true mean 3; rare huge values pull the rest far above',
      plot: {
        x: { min: 1, max: 10, step: 1, label: 'sample mean (last bar: 10 or more)' },
        y: { min: 0, max: 0.8, step: 0.1, label: 'density' },
        series: [
          ...bars(EDGES, DENS).map((points) => ({ kind: 'line' as const, points, color: '#f472b6' })),
          { kind: 'line', points: sample(1, 10, 160, naive), label: 'normal with the same mean 3.00 and SD 2.87', labelAt: [4.7, 0.2], color: '#fbbf24' },
          { kind: 'segment', from: [mean, 0], to: [mean, 0.78], label: 'true mean 3', labelAt: [3.1, 0.76], color: '#9ca3af' },
        ],
      },
    },
    {
      id: 'conditions',
      kind: 'table',
      label: 'When the textbook SE and normal approximation mislead',
      sub: 'each condition behind σ/√n can fail in practice',
      headers: ['condition', 'workshop case', 'effect'],
      values: [
        ['independence', '12 batches from one day', 'SD 2.02, not 0.65 (ch. 4)'],
        ['finite variance', 'Pareto α = 1.5 costs', 'skewed means, no √n rate'],
        ['small sample fraction', '120 of 6000 chairs', 'correction 0.990: ignorable'],
        ['… large fraction', '3000 of 6000 chairs', 'correction 0.707: SE 29% smaller'],
      ],
    },
  ],
  edges: [],
}
