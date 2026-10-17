import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { QUARTER } from '../workshop'

// §2.1 — inspect 3 chairs, each defective with probability p = 0.07, independently (a model assumption).
// The sample space has 2³ = 8 outcomes. P(k defects) = C(3, k) pᵏ (1 − p)³⁻ᵏ: 0.8044, 0.1816, 0.0137,
// 0.0003 (exact under the model). P(at least one) = 1 − 0.93³ = 0.1956.
const p = QUARTER.defective / QUARTER.N
const C = [1, 3, 3, 1]
const PK = C.map((c, k) => c * p ** k * (1 - p) ** (3 - k))
const STEMS: PlotPoint[] = PK.map((v, k) => [k, v])

export const sampleSpace: Scene = {
  id: 'prob-sample-space',
  title: 'Sample spaces, events and the axioms',
  flow: 'TB',
  nodes: [
    {
      id: 'counts',
      kind: 'plot',
      label: 'Inspect three chairs: probability of k defective among them',
      sub: 'model: each chair defective with probability 0.07, independently of the others',
      plot: {
        x: { min: -0.5, max: 3.5, step: 1, label: 'k, defective chairs among 3' },
        y: { min: 0, max: 0.9, step: 0.1, label: 'probability' },
        series: [
          ...STEMS.map((pt) => ({ kind: 'segment' as const, from: [pt[0], 0] as PlotPoint, to: pt, dashed: false, color: '#2dd4bf' })),
          { kind: 'scatter', points: STEMS, label: 'P(k): 0.804, 0.182, 0.014, 0.0003', labelAt: [0.9, 0.62], color: '#2dd4bf' },
          { kind: 'line', points: [[0.5, 0.2], [3.5, 0.2]], label: 'event "at least one": 0.196 in total', labelAt: [1.55, 0.25], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'outcomes',
      kind: 'table',
      label: 'The sample space: 8 outcomes, G = good, D = defective',
      sub: 'an event is a set of outcomes; its probability is the sum of theirs',
      headers: ['outcomes', 'how many', 'probability of each', 'together'],
      values: [
        ['GGG', '1', '0.93³ = 0.8044', '0.8044'],
        ['DGG, GDG, GGD', '3', '0.07 × 0.93² = 0.0605', '0.1816'],
        ['DDG, DGD, GDD', '3', '0.07² × 0.93 = 0.00456', '0.0137'],
        ['DDD', '1', '0.07³ = 0.00034', '0.0003'],
        ['all 8', '8', '—', '1.0000'],
      ],
    },
  ],
  edges: [],
}
