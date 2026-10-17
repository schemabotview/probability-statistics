import type { Scene } from '@graphlearning/flow'
import { bars } from '../plot-kit'

// §6.7 — samples of 25 seat heights, Normal(450, 3.9²), 20 000 samples (numpy seed 19), 0.25 mm bins from
// 446: SD of the mean 0.778 (theory 3.9/5 = 0.78), SD of the median 0.968 (asymptotic √(π/2) × 0.78 =
// 0.978). Variance ratio 1.55: the median keeps about 65% of the information in normal data.
const EDGES = Array.from({ length: 33 }, (_, i) => 446 + 0.25 * i)
const MEAN = [0, 0, 0, 3, 5, 8, 29, 70, 149, 283, 551, 919, 1295, 1922, 2267, 2548, 2519, 2263, 1878, 1350, 874, 564, 266, 128, 58, 33, 13, 4, 1, 0, 0, 0]
const MED = [1, 4, 4, 13, 30, 50, 118, 177, 336, 484, 729, 1055, 1343, 1711, 1966, 2038, 2044, 1806, 1715, 1426, 1015, 763, 503, 290, 165, 107, 52, 28, 17, 5, 3, 1]
const d = (c: number[]) => c.map((v) => v / (20000 * 0.25))

export const summaries: Scene = {
  id: 'est-summaries',
  title: 'Information retained by summaries and regularity limits',
  flow: 'TB',
  nodes: [
    {
      id: 'mean-median',
      kind: 'plot',
      label: 'Mean and median of 25 normal seat heights, over 20 000 samples',
      sub: 'for normal data the mean uses all the information; the median discards some, so it varies more',
      plot: {
        x: { min: 446, max: 454, step: 0.5, label: 'estimate of μ = 450 (mm)' },
        y: { min: 0, max: 0.56, step: 0.05, label: 'density' },
        series: [
          ...bars(EDGES, d(MED)).map((points) => ({ kind: 'line' as const, points, color: '#f472b6' })),
          ...bars(EDGES, d(MEAN)).map((points) => ({ kind: 'line' as const, points, color: '#2dd4bf' })),
          { kind: 'marker', at: [446.3, 0.5], size: 0, label: 'mean: SD 0.778', labelAt: [446.3, 0.5], color: '#2dd4bf' },
          { kind: 'marker', at: [446.3, 0.45], size: 0, label: 'median: SD 0.968', labelAt: [446.3, 0.45], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'sufficient',
      kind: 'table',
      label: 'What a summary keeps: sufficiency and efficiency',
      sub: 'a sufficient statistic carries all the sample’s information about the parameter, under the model',
      headers: ['model', 'sufficient summary', 'other summary', 'loses'],
      values: [
        ['Bernoulli', 'count of defectives', 'which chairs failed', 'nothing: same likelihood'],
        ['normal', 'x̄ and s²', 'median', 'about 35% of the information'],
        ['Uniform(0, θ)', 'sample maximum', 'x̄', 'MLE = max: biased, not normal'],
        ['any model', 'the full data', '—', 'needed if the model may be wrong'],
      ],
    },
  ],
  edges: [],
}
