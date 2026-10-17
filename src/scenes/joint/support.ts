import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { DEFECT_STATUS, JOB_CUT, JOB_TOTAL, PRODUCT_DEFECT, PRODUCTS } from '../workshop'

// §4.1 — two joint models. Discrete: product × defect status for 1000 items (joint pmf = count/1000).
// Continuous: 200 jobs' cutting time X and total time Y (numpy seed 10); Y = X + finishing time, so every
// point lies above y = x: the support is not a rectangle.
const PTS: PlotPoint[] = JOB_CUT.map((x, i) => [x, JOB_TOTAL[i]])

export const support: Scene = {
  id: 'joint-support',
  title: 'Joint distributions and support regions',
  flow: 'TB',
  nodes: [
    {
      id: 'region',
      kind: 'plot',
      label: '200 jobs: cutting time X and total processing time Y',
      sub: 'total includes cutting, so Y ≥ X: no job can fall below the line y = x',
      plot: {
        x: { min: 0, max: 12, step: 1, label: 'X, cutting time (minutes)' },
        y: { min: 0, max: 26, step: 2, label: 'Y, total time (minutes)' },
        series: [
          { kind: 'area', points: [[0, 0], [12, 12]], color: '#f472b6' },
          { kind: 'line', points: [[0, 0], [12, 12]], label: 'y = x: outside the support below it', labelAt: [6.4, 4.4], color: '#f472b6' },
          { kind: 'scatter', points: PTS, label: 'one job', labelAt: [0.6, 23.5], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'pmf',
      kind: 'table',
      label: 'A discrete joint distribution: product and defect status, P(product, status)',
      sub: 'from 1000 inspected items; the nine probabilities sum to 1',
      headers: ['product', ...DEFECT_STATUS],
      values: PRODUCTS.map((p, i) => [p, ...PRODUCT_DEFECT[i].map((c) => (c / 1000).toFixed(3))]),
    },
  ],
  edges: [],
}
