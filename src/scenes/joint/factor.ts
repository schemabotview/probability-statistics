import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { PRODUCT_DEFECT, PRODUCTS } from '../workshop'

// §4.4 — under independence P(x, y) = P(x) P(y). Each of the 9 cells: joint probability against the product
// of its margins. Tables carry 0.015 major defects against 0.0084 expected: dependent. Exact arithmetic.
const J = PRODUCT_DEFECT.map((r) => r.map((c) => c / 1000))
const rowM = J.map((r) => r.reduce((a, b) => a + b, 0))
const colM = [0, 1, 2].map((j) => J.reduce((a, r) => a + r[j], 0))
const DEF: PlotPoint[] = []
J.forEach((r, i) => r.forEach((v, j) => j > 0 && DEF.push([100 * rowM[i] * colM[j], 100 * v])))

export const factor: Scene = {
  id: 'joint-factor',
  title: 'Factorisation and independence',
  flow: 'TB',
  nodes: [
    {
      id: 'check',
      kind: 'plot',
      label: 'Does P(product, defect) factor as P(product) × P(defect)?',
      sub: 'each dot is one defective cell; under independence every dot would sit on the diagonal',
      plot: {
        x: { min: 0, max: 4.5, step: 0.5, label: 'P(product) × P(status), %' },
        y: { min: 0, max: 4.5, step: 0.5, label: 'P(product, status), %' },
        series: [
          { kind: 'line', points: [[0, 0], [4.5, 4.5]], label: 'independence: joint = product', labelAt: [2.3, 2.05], color: '#9ca3af' },
          { kind: 'scatter', points: DEF, label: 'six defective cells', labelAt: [0.2, 4.2], color: '#f472b6' },
          { kind: 'marker', at: [0.84, 1.5], label: 'table, major: 1.5% vs 0.84%', labelAt: [0.95, 1.65], color: '#f472b6' },
          { kind: 'marker', at: [3.96, 3.3], label: 'chair, minor: 3.3% vs 3.96%', labelAt: [2.4, 3.55], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'cells',
      kind: 'table',
      label: 'Joint versus product of margins, defective cells (%)',
      sub: 'one failing cell is enough to rule out independence',
      headers: ['product', 'minor: joint', 'minor: if indep.', 'major: joint', 'major: if indep.'],
      values: PRODUCTS.map((p, i) => [
        p,
        (100 * J[i][1]).toFixed(2),
        (100 * rowM[i] * colM[1]).toFixed(2),
        (100 * J[i][2]).toFixed(2),
        (100 * rowM[i] * colM[2]).toFixed(2),
      ]),
    },
  ],
  edges: [],
}
