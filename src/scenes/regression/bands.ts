import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { sample } from '../plot-kit'
import { fitLine, PARTS, TIME } from './jobs'

// §10.4 — 95% bands for time on parts, computed here: confidence band for the mean ŷ ± t s √(1/n + (x − x̄)²/Sxx),
// prediction band ŷ ± t s √(1 + 1/n + (x − x̄)²/Sxx), t₀.₉₇₅,₅₈ = 2.0017. At 10 parts: mean 13.62, CI (12.98,
// 14.25), PI (9.17, 18.06). At 30 parts (outside the data, max 20): CI (32.11, 36.46), PI (29.38, 39.19).
const F = fitLine(PARTS, TIME)
const T = 2.0017
const yhat = (x: number) => F.a + F.b * x
const ci = (x: number, sgn: number) => yhat(x) + sgn * T * F.s * Math.sqrt(1 / F.n + (x - F.mx) ** 2 / F.sxx)
const pi = (x: number, sgn: number) => yhat(x) + sgn * T * F.s * Math.sqrt(1 + 1 / F.n + (x - F.mx) ** 2 / F.sxx)
const PTS: PlotPoint[] = PARTS.map((p, i) => [p, TIME[i]])

export const bands: Scene = {
  id: 'reg-bands',
  title: 'Coefficient uncertainty and response and prediction intervals',
  flow: 'TB',
  nodes: [
    {
      id: 'bands',
      kind: 'plot',
      label: 'Uncertainty about the mean time versus about one new job',
      sub: 'narrow band: where the average job of that size lies; wide band: where one new job will fall',
      plot: {
        x: { min: 2, max: 32, step: 2, label: 'parts in the job' },
        y: { min: 0, max: 40, step: 5, label: 'processing time (minutes)' },
        series: [
          { kind: 'area', points: [[20, 40], [32, 40]], color: '#4b5563' },
          { kind: 'scatter', points: PTS, color: '#9ca3af' },
          { kind: 'line', points: sample(2, 32, 60, (x) => pi(x, 1)), label: '95% prediction band', labelAt: [3, 13], color: '#f472b6' },
          { kind: 'line', points: sample(2, 32, 60, (x) => pi(x, -1)), color: '#f472b6' },
          { kind: 'line', points: sample(2, 32, 60, (x) => ci(x, 1)), label: '95% confidence band', labelAt: [10, 21.5], color: '#fbbf24' },
          { kind: 'line', points: sample(2, 32, 60, (x) => ci(x, -1)), color: '#fbbf24' },
          { kind: 'marker', at: [26, 38], size: 0, label: 'no data beyond 20 parts', labelAt: [21, 38], color: '#e5e7eb' },
        ],
      },
    },
    {
      id: 'at10',
      kind: 'table',
      label: 'Two intervals at the same number of parts',
      sub: 'the confidence band widens away from x̄ = 12.4; extrapolation adds risk the band does not show',
      headers: ['parts', 'fitted mean', 'CI for the mean', 'PI for one job'],
      values: [
        ['10', yhat(10).toFixed(2), `(${ci(10, -1).toFixed(2)}, ${ci(10, 1).toFixed(2)})`, `(${pi(10, -1).toFixed(2)}, ${pi(10, 1).toFixed(2)})`],
        ['18', yhat(18).toFixed(2), `(${ci(18, -1).toFixed(2)}, ${ci(18, 1).toFixed(2)})`, `(${pi(18, -1).toFixed(2)}, ${pi(18, 1).toFixed(2)})`],
        ['30 (extrapolated)', yhat(30).toFixed(2), `(${ci(30, -1).toFixed(2)}, ${ci(30, 1).toFixed(2)})`, `(${pi(30, -1).toFixed(2)}, ${pi(30, 1).toFixed(2)})`],
      ],
    },
  ],
  edges: [],
}
