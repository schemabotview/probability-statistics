import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { sample } from '../plot-kit'

// §10.6 — batch assembly time against chairs in the batch, 50 batches (numpy seed 53) generated with a learning
// effect: 3 + 8 ln(chairs) + Normal(0, 1.2²). Straight line: 13.02 + 0.648 chairs, residual SD 2.03; on
// log(chairs): 3.68 + 7.73 ln(chairs), residual SD 1.58 (numpy lstsq). At 60 chairs (twice the largest batch)
// the line predicts 51.9 minutes, the log model 35.3; the generating curve gives 35.8.
const C = [23, 2, 21, 22, 25, 11, 16, 29, 12, 5, 5, 21, 23, 25, 7, 22, 23, 30, 25, 24, 21, 10, 30, 10, 6, 19, 4, 20, 13, 7, 10, 24, 29, 28, 16, 22, 7, 4, 9, 25, 3, 12, 9, 4, 12, 2, 18, 21, 4, 27]
const Y = [27.4, 8.6, 27.2, 32.1, 27.6, 18.8, 26.1, 28.3, 21.2, 17.5, 14.8, 25.8, 28.1, 27.2, 19.5, 26.8, 28.2, 32.0, 31.2, 25.7, 26.8, 20.9, 31.2, 20.9, 16.2, 28.4, 15.7, 27.1, 21.0, 18.4, 19.7, 30.9, 30.6, 30.1, 26.3, 28.6, 17.1, 14.9, 21.0, 25.6, 13.2, 23.4, 20.5, 14.8, 21.9, 9.8, 25.7, 25.8, 16.6, 30.4]
const PTS: PlotPoint[] = C.map((c, i) => [c, Y[i]])

export const specification: Scene = {
  id: 'reg-specification',
  title: 'Transformations, extrapolation and specification',
  flow: 'TB',
  nodes: [
    {
      id: 'curve',
      kind: 'plot',
      label: 'Batch assembly time flattens as the crew warms up: a straight line misses the shape',
      sub: 'shaded: beyond the largest batch observed, where neither model has any data',
      plot: {
        x: { min: 0, max: 62, step: 5, label: 'chairs in the batch' },
        y: { min: 0, max: 55, step: 5, label: 'assembly time (minutes)' },
        series: [
          { kind: 'area', points: [[30, 55], [62, 55]], color: '#4b5563' },
          { kind: 'scatter', points: PTS, label: '50 batches', labelAt: [1, 52], color: '#2dd4bf' },
          { kind: 'line', points: [[1, 13.02 + 0.648], [60, 13.02 + 0.648 * 60]], label: 'straight line: 51.9 at 60', labelAt: [39, 49.5], color: '#f472b6' },
          { kind: 'line', points: sample(1, 60, 120, (c) => 3.681 + 7.731 * Math.log(c)), label: 'on log(chairs): 35.3 at 60', labelAt: [40, 31.5], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'spec',
      kind: 'table',
      label: 'Specification choices, and what checks them',
      sub: 'a transformation changes what a coefficient means: here, minutes per doubling of the batch',
      headers: ['model', 'residual SD', 'at 60 chairs', 'meaning of slope'],
      values: [
        ['time ~ chairs', '2.03', '51.9 min', '0.65 min per chair'],
        ['time ~ log(chairs)', '1.58', '35.3 min', '7.73 × ln 2 = 5.4 min per doubling'],
        ['generating curve', '1.2', '35.8 min', '—'],
        ['either model at 60', 'extrapolation', 'no data', 'assumes the shape persists'],
      ],
    },
  ],
  edges: [],
}
