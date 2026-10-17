import type { Scene } from '@graphlearning/flow'
import { bars, sample } from '../plot-kit'

// §5.4 — sample means of n lognormal processing times (median 12, log-sd 0.5; μ = 13.60, σ = 7.25),
// 10 000 samples each (numpy seed 14), 0.5-minute bins from 4 to 32. n = 4: SD 3.62, skewness 0.88;
// n = 30: SD 1.32, skewness 0.35. Normal curves use μ and σ/√n (CLT). LLN running mean of single draws
// (seed 13): 16.95, 14.13, 13.75, 13.67, 13.60 at n = 10, 10², 10³, 10⁴, 10⁵.
const EDGES = Array.from({ length: 57 }, (_, i) => 4 + 0.5 * i)
const N4 = [0, 0, 2, 12, 22, 33, 75, 122, 173, 270, 317, 429, 485, 561, 563, 605, 584, 590, 607, 544, 504, 477, 422, 386, 317, 275, 260, 218, 198, 144, 145, 133, 102, 57, 62, 53, 46, 45, 28, 24, 15, 15, 16, 9, 8, 10, 8, 8, 3, 6, 2, 1, 0, 1, 1, 1]
const N30 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 31, 125, 275, 636, 1000, 1345, 1541, 1468, 1194, 946, 634, 367, 204, 128, 52, 25, 11, 9, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const dens = (c: number[]) => c.map((v) => v / (10000 * 0.5))
const MU = 13.598
const SIG = 7.2468
const norm = (s: number) => (x: number) => Math.exp(-(((x - MU) / s) ** 2) / 2) / (s * Math.sqrt(2 * Math.PI))

export const clt: Scene = {
  id: 'samp-clt',
  title: 'The law of large numbers and the central limit theorem',
  flow: 'TB',
  nodes: [
    {
      id: 'means',
      kind: 'plot',
      label: 'Distribution of the mean of n processing times: n = 4 and n = 30',
      sub: 'LLN: the mean concentrates around μ = 13.6; CLT: its shape approaches normal, with SD σ/√n',
      plot: {
        x: { min: 4, max: 32, step: 2, label: 'sample mean (minutes)' },
        y: { min: 0, max: 0.33, step: 0.05, label: 'density' },
        series: [
          ...bars(EDGES, dens(N4)).map((points) => ({ kind: 'line' as const, points, color: '#f472b6' })),
          ...bars(EDGES, dens(N30)).map((points) => ({ kind: 'line' as const, points, color: '#2dd4bf' })),
          { kind: 'line', points: sample(4, 32, 160, norm(SIG / 2)), label: 'n = 4: normal approx., SD 3.62; skewed', labelAt: [18.5, 0.1], color: '#fbbf24' },
          { kind: 'line', points: sample(4, 32, 160, norm(SIG / Math.sqrt(30))), label: 'n = 30: SD 1.32, nearly normal', labelAt: [16, 0.29], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'two-theorems',
      kind: 'table',
      label: 'Two different theorems about the same averages',
      sub: 'running mean of single simulated times; true mean 13.60',
      headers: ['claim', 'evidence', 'value'],
      values: [
        ['LLN: X̄ₙ → μ', 'running mean at n = 10 / 100 / 1000', '16.95 / 14.13 / 13.75'],
        ['… at n = 10⁴ / 10⁵', 'stabilises', '13.67 / 13.60'],
        ['CLT: X̄ₙ ≈ Normal(μ, σ²/n)', 'P(X̄ > μ + 2 SE), normal says 0.023', 'n = 4: 0.038; n = 30: 0.031'],
        ['… needs finite σ', 'Pareto α = 1.5: no CLT', 'see next section'],
      ],
    },
  ],
  edges: [],
}
