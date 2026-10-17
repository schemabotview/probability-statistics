import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §7.6 — three studies of a new glue's effect on mean processing time (σ = 7.25 min per job, known for
// simplicity), with a practically important change of 1 minute. Normal-theory 95% CIs and two-sided p:
// A, 200 000 jobs per arm, −0.05 (−0.095, −0.005), p = 0.029; B, 20 per arm, −1.5 (−5.99, 2.99), p = 0.51;
// C, 400 per arm, −1.5 (−2.50, −0.50), p = 0.0034. scipy.stats.norm.
const STUDIES = [
  { y: 3, est: -0.05, lo: -0.095, hi: -0.005, label: 'A: 200 000 per arm, p = 0.029', color: '#fbbf24' },
  { y: 2, est: -1.5, lo: -5.99, hi: 2.99, label: 'B: 20 per arm, p = 0.51', color: '#9ca3af' },
  { y: 1, est: -1.5, lo: -2.5, hi: -0.5, label: 'C: 400 per arm, p = 0.003', color: '#2dd4bf' },
]

export const effects: Scene = {
  id: 'inf-effects',
  title: 'p-values, effect sizes and practical significance',
  flow: 'TB',
  nodes: [
    {
      id: 'forest',
      kind: 'plot',
      label: 'Three studies of the same glue: estimated change in processing time, with 95% CIs',
      sub: 'shaded: changes smaller than 1 minute, which do not matter in practice',
      plot: {
        x: { min: -6.5, max: 3.5, step: 0.5, label: 'change in mean processing time (minutes)' },
        y: { min: 0, max: 4, step: 1 },
        series: [
          { kind: 'area', points: [[-1, 4], [1, 4]], color: '#4b5563' },
          { kind: 'segment', from: [0, 0], to: [0, 4], label: 'no effect', labelAt: [0.08, 3.75], color: '#9ca3af' },
          ...STUDIES.flatMap((s) => [
            { kind: 'segment' as const, from: [s.lo, s.y] as PlotPoint, to: [s.hi, s.y] as PlotPoint, dashed: false, color: s.color },
            { kind: 'marker' as const, at: [s.est, s.y] as PlotPoint, label: s.label, labelAt: [-6.3, s.y + 0.25] as PlotPoint, color: s.color },
          ]),
        ],
      },
    },
    {
      id: 'reading',
      kind: 'table',
      label: 'A p-value measures compatibility with H₀, not the size or importance of an effect',
      sub: 'report the estimate and its interval, then judge against what matters',
      headers: ['study', 'estimate (95% CI)', 'p', 'reading'],
      values: [
        ['A', '−0.05 (−0.095, −0.005)', '0.029', 'real but trivial effect'],
        ['B', '−1.5 (−5.99, 2.99)', '0.51', 'inconclusive, not "no effect"'],
        ['C', '−1.5 (−2.50, −0.50)', '0.003', 'likely important: CI beyond −1 mostly'],
      ],
    },
  ],
  edges: [],
}
