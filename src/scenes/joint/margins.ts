import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { DEFECT_STATUS, PRODUCT_DEFECT, PRODUCTS } from '../workshop'

// §4.2 — marginals by summation over the 1000-item table: products 0.6 / 0.3 / 0.1, defect status
// 0.906 / 0.066 / 0.028. Exact arithmetic.
const J = PRODUCT_DEFECT.map((r) => r.map((c) => c / 1000))
const rowM = J.map((r) => r.reduce((a, b) => a + b, 0))
const colM = [0, 1, 2].map((j) => J.reduce((a, r) => a + r[j], 0))
const stems = (vals: number[], x0: number, color: string, names: string[]) => [
  ...vals.map((v, i) => ({ kind: 'segment' as const, from: [x0 + i, 0] as PlotPoint, to: [x0 + i, v] as PlotPoint, dashed: false, size: 6, color })),
  ...vals.map((v, i) => ({ kind: 'marker' as const, at: [x0 + i, v] as PlotPoint, label: `${names[i]} ${v.toFixed(3)}`, labelAt: [x0 + i - 0.35, v + 0.04] as PlotPoint, color })),
]

export const margins: Scene = {
  id: 'joint-margins',
  title: 'Marginalisation by summation',
  flow: 'TB',
  nodes: [
    {
      id: 'marginals',
      kind: 'plot',
      label: 'The two marginal distributions, each a sum over the other variable',
      sub: 'left: product, summing across defect status; right: defect status, summing across products',
      plot: {
        x: { min: 0.3, max: 7.7, step: 1, label: 'category' },
        y: { min: 0, max: 1.05, step: 0.1, label: 'marginal probability' },
        series: [...stems(rowM, 1, '#2dd4bf', PRODUCTS), ...stems(colM, 5, '#fbbf24', DEFECT_STATUS)],
      },
    },
    {
      id: 'table',
      kind: 'table',
      label: 'The joint table with its margins: P(X = x) = Σ over y of P(X = x, Y = y)',
      sub: 'for densities the sum becomes an integral: f_X(x) = ∫ f(x, y) dy',
      headers: ['product', ...DEFECT_STATUS, 'margin'],
      values: [
        ...PRODUCTS.map((p, i) => [p, ...J[i].map((v) => v.toFixed(3)), rowM[i].toFixed(3)]),
        ['margin', ...colM.map((v) => v.toFixed(3)), '1.000'],
      ],
    },
  ],
  edges: [],
}
