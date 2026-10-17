import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { PRODUCT_DEFECT, PRODUCTS } from '../workshop'

// §8.5 — χ² test of independence on the 1000-item product × defect table (chapter 4). Expected counts
// E = row total × column total / 1000 and Pearson residuals (O − E)/√E computed here. χ² = 17.63, df 4,
// p = 0.0015 (scipy chi2_contingency). One expected count (stool, major) is 2.8, below 5, so a Monte Carlo
// permutation p-value with fixed margins was also run (20 000 tables, numpy seed 33): 0.0024.
const O = PRODUCT_DEFECT
const rowT = O.map((r) => r.reduce((a, b) => a + b, 0))
const colT = [0, 1, 2].map((j) => O.reduce((a, r) => a + r[j], 0))
const E = O.map((_, i) => colT.map((c) => (rowT[i] * c) / 1000))
const RES = O.map((r, i) => r.map((o, j) => (o - E[i][j]) / Math.sqrt(E[i][j])))
const COLORS = ['#9ca3af', '#fbbf24', '#f472b6']

export const contingency: Scene = {
  id: 'cmp-contingency',
  title: 'Contingency tables, expected counts and sparse alternatives',
  flow: 'TB',
  nodes: [
    {
      id: 'residuals',
      kind: 'plot',
      label: 'Pearson residuals (O − E)/√E: which cells drive the χ² statistic',
      sub: 'grey: none, amber: minor, pink: major; tables carry more minor and major defects than independence predicts',
      plot: {
        x: { min: 0.5, max: 3.5, step: 1, label: 'product: 1 chair, 2 table, 3 stool' },
        y: { min: -2, max: 2.8, step: 0.5, label: 'Pearson residual' },
        series: [
          { kind: 'line', points: [[0.5, 0], [3.5, 0]], color: '#4b5563' },
          ...RES.flatMap((r, i) =>
            r.map((v, j) => ({ kind: 'segment' as const, from: [i + 1 + (j - 1) * 0.22, 0] as PlotPoint, to: [i + 1 + (j - 1) * 0.22, v] as PlotPoint, dashed: false, size: 9, color: COLORS[j] })),
          ),
          { kind: 'marker', at: [2.22, RES[1][2]], label: 'table, major: +2.28', labelAt: [2.3, 2.45], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'counts',
      kind: 'table',
      label: 'Observed (expected) counts; χ² = Σ (O − E)²/E',
      sub: 'expected counts below 5 make the χ² approximation unreliable: check by simulation or an exact test',
      headers: ['product', 'none', 'minor', 'major'],
      values: [
        ...PRODUCTS.map((p, i) => [p, ...O[i].map((o, j) => `${o} (${E[i][j].toFixed(1)})`)]),
        ['test', 'χ² = 17.63, df 4', 'p = 0.0015', 'Monte Carlo p = 0.0024'],
      ],
    },
  ],
  edges: [],
}
