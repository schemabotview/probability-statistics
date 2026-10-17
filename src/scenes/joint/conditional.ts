import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { PRODUCT_DEFECT, PRODUCTS, STATUS_COST } from '../workshop'

// §4.3 — conditional distributions of defect status given product (each row divided by its total), and
// E[repair cost | product] with costs £0 / £8 / £40: chair 1.24, table 2.80, stool 0.64. Averaging these
// with weights 0.6 / 0.3 / 0.1 gives E[cost] = 1.648. Exact.
const rows = PRODUCT_DEFECT.map((r) => {
  const n = r.reduce((a, b) => a + b, 0)
  return r.map((c) => c / n)
})
const ce = rows.map((r) => r.reduce((s, p, j) => s + p * STATUS_COST[j], 0))
const minor: PlotPoint[] = rows.map((r, i) => [i + 0.88, 100 * r[1]])
const major: PlotPoint[] = rows.map((r, i) => [i + 1.12, 100 * r[2]])

export const conditional: Scene = {
  id: 'joint-conditional',
  title: 'Conditional distributions and conditional expectation',
  flow: 'TB',
  nodes: [
    {
      id: 'rates',
      kind: 'plot',
      label: 'Defect rates given the product: P(status | product)',
      sub: 'conditioning restricts to one row and rescales it to sum to 1',
      plot: {
        x: { min: 0.4, max: 3.6, step: 1, label: 'product: 1 chair, 2 table, 3 stool' },
        y: { min: 0, max: 11, step: 1, label: 'percent of that product' },
        series: [
          ...minor.map((pt) => ({ kind: 'segment' as const, from: [pt[0], 0] as PlotPoint, to: pt, dashed: false, color: '#fbbf24' })),
          { kind: 'scatter', points: minor, label: 'minor defect', labelAt: [0.5, 10.4], color: '#fbbf24' },
          ...major.map((pt) => ({ kind: 'segment' as const, from: [pt[0], 0] as PlotPoint, to: pt, dashed: false, color: '#f472b6' })),
          { kind: 'scatter', points: major, label: 'major defect', labelAt: [0.5, 9.4], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'expect',
      kind: 'table',
      label: 'E[cost | product], and E[cost] as their weighted average',
      sub: 'repair cost: none £0, minor £8, major £40',
      headers: ['product', 'P(none | ·)', 'P(minor | ·)', 'P(major | ·)', 'E[cost | ·]'],
      values: [
        ...PRODUCTS.map((p, i) => [p, rows[i][0].toFixed(3), rows[i][1].toFixed(3), rows[i][2].toFixed(3), `£${ce[i].toFixed(2)}`]),
        ['all', '—', '—', '—', `£${(0.6 * ce[0] + 0.3 * ce[1] + 0.1 * ce[2]).toFixed(3)}`],
      ],
    },
  ],
  edges: [],
}
