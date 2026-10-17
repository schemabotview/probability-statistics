import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { betaBinomPmf, binomPmf } from './beta'

// §11.4 — defectives in the next 50 chairs. Posterior predictive: beta-binomial(50, 16, 132), mean 5.41,
// variance 6.41. Plug-in: Binomial(50, 0.108), variance 4.82. P(10 or more): 0.064 predictive vs 0.039
// plug-in (scipy.stats.betabinom / binom).
const K = Array.from({ length: 16 }, (_, k) => k)
const PRED = betaBinomPmf(50, 16, 132)
const PLUG = binomPmf(50, 16 / 148)
const tail = (f: (k: number) => number) => 1 - Array.from({ length: 10 }, (_, k) => f(k)).reduce((a, b) => a + b, 0)

export const predictive: Scene = {
  id: 'bayes-predictive',
  title: 'Posterior predictive uncertainty',
  flow: 'TB',
  nodes: [
    {
      id: 'next50',
      kind: 'plot',
      label: 'How many of the next 50 chairs will be defective?',
      sub: 'the predictive spreads wider than plugging in p = 0.108, because it carries the uncertainty about p',
      plot: {
        x: { min: -0.5, max: 15.5, step: 1, label: 'defective chairs among the next 50' },
        y: { min: 0, max: 0.2, step: 0.02, label: 'probability' },
        series: [
          ...K.map((k) => ({ kind: 'segment' as const, from: [k - 0.12, 0] as PlotPoint, to: [k - 0.12, PRED(k)] as PlotPoint, dashed: false, size: 6, color: '#f472b6' })),
          ...K.map((k) => ({ kind: 'segment' as const, from: [k + 0.12, 0] as PlotPoint, to: [k + 0.12, PLUG(k)] as PlotPoint, dashed: false, size: 6, color: '#9ca3af' })),
          { kind: 'marker', at: [10, 0.15], size: 0, label: 'pink: posterior predictive', labelAt: [9, 0.17], color: '#f472b6' },
          { kind: 'marker', at: [10, 0.13], size: 0, label: 'grey: plug-in binomial', labelAt: [9, 0.155], color: '#9ca3af' },
        ],
      },
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'P(future) = ∫ P(future | p) × posterior(p) dp',
      sub: 'averaging over p rather than fixing it at one value',
      headers: ['quantity', 'posterior predictive', 'plug-in p = 0.108'],
      values: [
        ['mean defectives in 50', '5.41', '5.41'],
        ['variance', '6.41', '4.82'],
        ['P(10 or more)', tail(PRED).toFixed(3), tail(PLUG).toFixed(3)],
        ['P(none)', PRED(0).toFixed(4), PLUG(0).toFixed(4)],
      ],
    },
  ],
  edges: [],
}
