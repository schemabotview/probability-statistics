import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { BATCH20 } from '../workshop'
import { binom, hyper } from './dist'

// §3.3 — sample 5 chairs from the batch of 20 (3 defective). Without replacement: Hypergeometric(20, 3, 5),
// pmf 0.399, 0.461, 0.132, 0.009, mean 0.75, variance 0.503. With replacement: Binomial(5, 0.15), pmf
// 0.444, 0.392, 0.138, 0.024, mean 0.75, variance 0.6375. Exact (scipy.stats agrees).
const H = hyper(BATCH20.n, BATCH20.defective, 5)
const B = binom(5, BATCH20.defective / BATCH20.n)
const K = [0, 1, 2, 3, 4]
const off = 0.12

export const binomial: Scene = {
  id: 'rv-binomial',
  title: 'Binomial and hypergeometric sampling',
  flow: 'TB',
  nodes: [
    {
      id: 'two',
      kind: 'plot',
      label: 'Defectives among 5 chairs drawn from a batch of 20 with 3 defective',
      sub: 'with replacement each draw is a Bernoulli(0.15) trial; without, the draws are dependent',
      plot: {
        x: { min: -0.5, max: 4.5, step: 1, label: 'k, defective chairs among the 5' },
        y: { min: 0, max: 0.5, step: 0.05, label: 'P(X = k)' },
        series: [
          ...K.map((k) => ({ kind: 'segment' as const, from: [k - off, 0] as PlotPoint, to: [k - off, H(k)] as PlotPoint, dashed: false, color: '#2dd4bf' })),
          { kind: 'scatter', points: K.map((k): PlotPoint => [k - off, H(k)]), label: 'without replacement: hypergeometric', labelAt: [1.3, 0.47], color: '#2dd4bf' },
          ...K.map((k) => ({ kind: 'segment' as const, from: [k + off, 0] as PlotPoint, to: [k + off, B(k)] as PlotPoint, dashed: false, color: '#9ca3af' })),
          { kind: 'scatter', points: K.map((k): PlotPoint => [k + off, B(k)]), label: 'with replacement: Binomial(5, 0.15)', labelAt: [1.3, 0.42], color: '#9ca3af' },
        ],
      },
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'Same mean, different variance',
      sub: 'finite-population correction: (N − n)/(N − 1) = 15/19',
      headers: ['k', 'hypergeometric', 'binomial'],
      values: [
        ...K.slice(0, 4).map((k) => [String(k), H(k).toFixed(3), B(k).toFixed(3)]),
        ['mean', '0.75', '0.75'],
        ['variance', '0.503', '0.638'],
      ],
    },
  ],
  edges: [],
}
