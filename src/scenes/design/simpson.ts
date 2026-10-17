import type { Scene } from '@graphlearning/flow'
import { SETTINGS } from '../workshop'

// §1.7 — overall rate = w·(chair rate) + (1 − w)·(table rate), w = share of chairs. A: 10% chairs, 30%
// tables; B: 8% and 25%. B's line lies below A's at every mix, yet A ran 75% chairs (overall 60/400 =
// 15%) and B ran 25% chairs (83/400 = 20.75%). Exact arithmetic on the counts in workshop.ts.
const rate = (c: { n: number; defects: number }) => (100 * c.defects) / c.n
const A = SETTINGS.A
const B = SETTINGS.B
const line = (s: typeof A) => (w: number) => w * rate(s.chairs) + (1 - w) * rate(s.tables)
const share = (s: typeof A) => s.chairs.n / (s.chairs.n + s.tables.n)
const overall = (s: typeof A) => (100 * (s.chairs.defects + s.tables.defects)) / (s.chairs.n + s.tables.n)

export const simpson: Scene = {
  id: 'design-simpson',
  title: 'Association and aggregation reversals',
  flow: 'TB',
  nodes: [
    {
      id: 'mix',
      kind: 'plot',
      label: 'Overall defect rate as a mix of chairs and tables',
      sub: 'B beats A at every product mix, but B ran mostly tables, so its overall rate is higher',
      plot: {
        x: { min: 0, max: 1, step: 0.1, label: 'share of output that is chairs' },
        y: { min: 0, max: 32, step: 4, label: 'defect rate (%)' },
        series: [
          { kind: 'line', points: [[0, line(A)(0)], [1, line(A)(1)]], label: 'setting A: 30% tables → 10% chairs', labelAt: [0.42, 23.4], color: '#2dd4bf' },
          { kind: 'line', points: [[0, line(B)(0)], [1, line(B)(1)]], label: 'setting B: 25% → 8%, lower everywhere', labelAt: [0.02, 18.6], color: '#f472b6' },
          { kind: 'marker', at: [share(A), overall(A)], label: `A’s actual mix (75% chairs): ${overall(A)}%`, labelAt: [0.64, 19.4], color: '#2dd4bf' },
          { kind: 'marker', at: [share(B), overall(B)], label: `B’s actual mix (25% chairs): ${overall(B)}%`, labelAt: [0.03, 13], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'counts',
      kind: 'table',
      label: 'One month of inspections, by setting and product',
      sub: 'the reversal comes from the mix, not from the settings',
      headers: ['setting', 'chairs', 'tables', 'overall'],
      values: [
        ['A', `${A.chairs.defects}/${A.chairs.n} = ${rate(A.chairs)}%`, `${A.tables.defects}/${A.tables.n} = ${rate(A.tables)}%`, `60/400 = ${overall(A)}%`],
        ['B', `${B.chairs.defects}/${B.chairs.n} = ${rate(B.chairs)}%`, `${B.tables.defects}/${B.tables.n} = ${rate(B.tables)}%`, `83/400 = ${overall(B)}%`],
        ['better', 'B', 'B', 'A, by aggregation'],
      ],
    },
  ],
  edges: [],
}
