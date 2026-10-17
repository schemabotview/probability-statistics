import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §7.2 — actual coverage of the nominal 95% t-interval for a mean, by simulation (numpy seed 22, 20 000
// samples per n): normal data 0.949–0.953 at every n; heavily skewed lognormal data (log-sd 1) 0.820 at n = 5,
// 0.889 at 40, 0.926 at 160. Processing times (n = 40): x̄ = 14.07, s = 10.38, t₀.₉₇₅,₃₉ = 2.023, so
// 14.07 ± 3.32 = (10.75, 17.39).
const N = [5, 10, 20, 40, 80, 160]
const NORM = [0.949, 0.9526, 0.952, 0.9473, 0.9492, 0.9494]
const SKEW = [0.8202, 0.8442, 0.8686, 0.8886, 0.9138, 0.9257]
const pts = (v: number[]): PlotPoint[] => v.map((c, i) => [Math.log10(N[i]), 100 * c])

export const meanCi: Scene = {
  id: 'inf-mean-ci',
  title: 'Intervals for a mean and the normal/t assumptions',
  flow: 'TB',
  nodes: [
    {
      id: 'actual',
      kind: 'plot',
      label: 'Actual coverage of the nominal 95% t-interval, by sample size',
      sub: 'exact for normal data; for heavily skewed data it falls short, and recovers only slowly',
      plot: {
        x: { min: 0.6, max: 2.3, step: 0.1, label: 'log₁₀ n' },
        y: { min: 80, max: 97, step: 2, label: 'coverage (%)' },
        series: [
          { kind: 'line', points: [[0.6, 95], [2.3, 95]], label: 'nominal 95%', labelAt: [2.0, 95.5], color: '#9ca3af' },
          { kind: 'line', points: pts(NORM), color: '#2dd4bf' },
          { kind: 'scatter', points: pts(NORM), label: 'normal data', labelAt: [1.0, 93.7], color: '#2dd4bf' },
          { kind: 'line', points: pts(SKEW), color: '#f472b6' },
          { kind: 'scatter', points: pts(SKEW), label: 'skewed lognormal data', labelAt: [1.25, 85.6], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'times',
      kind: 'table',
      label: 'The t-interval x̄ ± t s/√n for mean processing time',
      sub: '40 jobs; t uses n − 1 = 39 degrees of freedom',
      headers: ['quantity', 'value'],
      values: [
        ['x̄, s', '14.07, 10.38 min'],
        ['t₀.₉₇₅ with 39 df', '2.023'],
        ['margin t s/√n', '3.32 min'],
        ['95% interval', '(10.75, 17.39) min'],
        ['caution', 'skewed data: true coverage below 95%'],
      ],
    },
  ],
  edges: [],
}
