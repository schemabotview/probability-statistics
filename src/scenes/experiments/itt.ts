import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §9.6 — 200 batches randomised 100/100 to A or B (numpy seed 43). 30% are hard batches (+3 points). True
// effect of running B: −1.0 point. Under B, operators switched 9 hard batches back to A. Estimates with
// ±1.96 SE (Welch SEs): ITT −1.25 (0.23), per-protocol −1.55 (0.22), as-treated −1.70 (0.22). Compliance
// 0.91; instrumental-variable (CACE) estimate ITT/0.91 = −1.37. Dropping switchers leaves B's arm easier.
const EST = [
  { y: 3, est: -1.248, se: 0.233, label: 'intention to treat: −1.25, as randomised', color: '#2dd4bf' },
  { y: 2, est: -1.549, se: 0.219, label: 'per protocol: −1.55, drops 9 switched batches', color: '#fbbf24' },
  { y: 1, est: -1.697, se: 0.216, label: 'as treated: −1.70, by setting actually run', color: '#f472b6' },
]

export const itt: Scene = {
  id: 'exp-itt',
  title: 'Attrition, noncompliance and intention to treat',
  flow: 'TB',
  nodes: [
    {
      id: 'estimates',
      kind: 'plot',
      label: 'Three analyses of the same randomised experiment, with 95% intervals',
      sub: 'operators switched hard batches off setting B; only intention-to-treat keeps the randomisation',
      plot: {
        x: { min: -2.6, max: 0.2, step: 0.2, label: 'estimated effect of B on defect rate (points)' },
        y: { min: 0, max: 4, step: 1 },
        series: [
          { kind: 'segment', from: [-1, 0], to: [-1, 4], label: 'true effect of running B: −1.0', labelAt: [-0.97, 3.7], color: '#9ca3af' },
          ...EST.flatMap((e) => [
            { kind: 'segment' as const, from: [e.est - 1.96 * e.se, e.y] as PlotPoint, to: [e.est + 1.96 * e.se, e.y] as PlotPoint, dashed: false, color: e.color },
            { kind: 'marker' as const, at: [e.est, e.y] as PlotPoint, label: e.label, labelAt: [-2.55, e.y + 0.25] as PlotPoint, color: e.color },
          ]),
        ],
      },
    },
    {
      id: 'analyses',
      kind: 'table',
      label: 'What each analysis compares',
      sub: 'excluding or regrouping after treatment can reintroduce confounding',
      headers: ['analysis', 'groups compared', 'protected by randomisation?'],
      values: [
        ['intention to treat', 'as assigned, everyone kept', 'yes'],
        ['per protocol', 'B-compliers vs all A', 'no: easy B batches remain'],
        ['as treated', 'by setting actually run', 'no: hard batches move to A'],
        ['complier effect', 'ITT / compliance = −1.37', 'yes, with extra assumptions'],
      ],
    },
  ],
  edges: [],
}
