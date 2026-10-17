import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { binom } from './dist'

// §3.1 — X = defective chairs in a random sample of 10, modelled Binomial(10, 0.07). pmf and CDF exact:
// P(X = k) = 0.484, 0.364, 0.123, 0.025, 0.0033; F(k) = 0.484, 0.848, 0.972, 0.996, 0.9997.
const f = binom(10, 0.07)
const K = [0, 1, 2, 3, 4, 5]
const PMF: PlotPoint[] = K.map((k) => [k, f(k)])
let acc = 0
const CDF = K.map((k) => (acc += f(k)))
const steps: PlotPoint[] = K.flatMap((k, i): PlotPoint[] => [[k, i === 0 ? 0 : CDF[i - 1]], [k, CDF[i]], [k + 1, CDF[i]]])

export const cdf: Scene = {
  id: 'rv-cdf',
  title: 'Random variables, mass functions and CDFs',
  flow: 'TB',
  nodes: [
    {
      id: 'mass',
      kind: 'plot',
      label: 'X = defective chairs among 10 sampled: mass function and CDF',
      sub: 'stems: P(X = k); steps: F(k) = P(X ≤ k), which jumps by P(X = k) at each k',
      plot: {
        x: { min: -0.5, max: 6, step: 1, label: 'k' },
        y: { min: 0, max: 1.05, step: 0.1, label: 'probability' },
        series: [
          { kind: 'line', points: [[-0.5, 0], ...steps], label: 'CDF F(k)', labelAt: [3.4, 0.93], color: '#fbbf24' },
          ...PMF.map((pt) => ({ kind: 'segment' as const, from: [pt[0], 0] as PlotPoint, to: pt, dashed: false, color: '#2dd4bf' })),
          { kind: 'scatter', points: PMF, label: 'mass P(X = k)', labelAt: [1.3, 0.4], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'table',
      kind: 'table',
      label: 'Binomial(10, 0.07), exact',
      sub: 'support {0, 1, …, 10}; values above 5 have probability below 0.0001',
      headers: ['k', 'P(X = k)', 'F(k) = P(X ≤ k)'],
      values: K.slice(0, 5).map((k) => [String(k), f(k).toFixed(4), CDF[k].toFixed(4)]),
    },
  ],
  edges: [],
}
