import type { Scene } from '@graphlearning/flow'
import { bars } from '../plot-kit'

// §2.6 — spine plots: bar width = share of output (day 60%, night 40%), height = defect rate. Left: 7% on
// both shifts (shift and defect independent). Right: 5% day, 10% night: same overall 7%, dependent.
// Two inspectors, each 90% / 5% as in §2.5, independent given the chair's status: P(I₁) = 0.1095,
// P(I₁ ∩ I₂) = 0.07 × 0.81 + 0.93 × 0.0025 = 0.0590 ≠ 0.1095² = 0.0120. Exact.
export const independence: Scene = {
  id: 'prob-independence',
  title: 'Independence, exclusivity and conditional independence',
  flow: 'TB',
  nodes: [
    {
      id: 'spines',
      kind: 'plot',
      label: 'Defect rate by shift: independent (left) and dependent (right)',
      sub: 'bar width = share of output; both workshops have the same overall rate, 7%',
      plot: {
        x: { min: 0, max: 2.3, step: 0.1, label: 'share of output: day, then night' },
        y: { min: 0, max: 12, step: 1, label: 'defect rate (%)' },
        series: [
          ...bars([0, 0.6, 1], [7, 7]).map((points) => ({ kind: 'line' as const, points, color: '#2dd4bf' })),
          ...bars([1.3, 1.9, 2.3], [5, 10]).map((points) => ({ kind: 'line' as const, points, color: '#f472b6' })),
          { kind: 'line', points: [[0, 7], [2.3, 7]], label: 'overall 7%', labelAt: [1.02, 7.35], color: '#9ca3af' },
          { kind: 'marker', at: [0.3, 7], size: 0, label: 'P(D | day) = 0.07', labelAt: [0.05, 8.2], color: '#2dd4bf' },
          { kind: 'marker', at: [0.8, 7], size: 0, label: 'P(D | night) = 0.07', labelAt: [0.45, 9.3], color: '#2dd4bf' },
          { kind: 'marker', at: [1.6, 5], size: 0, label: 'P(D | day) = 0.05', labelAt: [1.32, 5.6], color: '#f472b6' },
          { kind: 'marker', at: [2.1, 10], size: 0, label: 'P(D | night) = 0.10', labelAt: [1.6, 10.7], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'definitions',
      kind: 'table',
      label: 'Independent: P(A ∩ B) = P(A) P(B); exclusive: P(A ∩ B) = 0',
      sub: 'conditional independence given a third event does not imply independence',
      headers: ['pair of events', 'P(A ∩ B)', 'P(A) P(B)', 'verdict'],
      values: [
        ['defective, night (left)', '0.028', '0.07 × 0.4 = 0.028', 'independent'],
        ['defective, night (right)', '0.040', '0.07 × 0.4 = 0.028', 'dependent'],
        ['"no defect", "seat defect"', '0', '0.93 × 0.025', 'exclusive, so dependent'],
        ['inspector 1 flags, inspector 2 flags', '0.0590', '0.1095² = 0.0120', 'dependent'],
        ['… given the chair is defective', '0.81', '0.9 × 0.9 = 0.81', 'independent'],
      ],
    },
  ],
  edges: [],
}
