import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { binomPmf, N, X } from './beta'

// §11.1 — three hypotheses about the new supplier: p = 0.04 (better), 0.07 (same), 0.10 (worse), prior
// 0.25 / 0.50 / 0.25. Likelihood of 14 in 120: 0.00024, 0.0207, 0.0945; marginal likelihood
// Σ prior × likelihood = 0.0340; posterior 0.002 / 0.304 / 0.694. Exact.
const PS = [0.04, 0.07, 0.1]
const PRIOR = [0.25, 0.5, 0.25]
const LIK = PS.map((p) => binomPmf(N, p)(X))
const MARG = PRIOR.reduce((s, pr, i) => s + pr * LIK[i], 0)
const POST = PRIOR.map((pr, i) => (pr * LIK[i]) / MARG)
const bar = (x: number, h: number): PlotPoint[] => [[x - 0.004, 0], [x - 0.004, h], [x + 0.004, h], [x + 0.004, 0]]

export const update: Scene = {
  id: 'bayes-update',
  title: 'Prior, likelihood, posterior and marginal likelihood',
  flow: 'TB',
  nodes: [
    {
      id: 'bars',
      kind: 'plot',
      label: 'Three hypotheses about the new supplier, before and after 14 defective in 120',
      sub: 'posterior ∝ prior × likelihood: the data move belief from "same" to "worse"',
      plot: {
        x: { min: 0.025, max: 0.115, step: 0.01, label: 'defect rate p' },
        y: { min: 0, max: 0.8, step: 0.1, label: 'probability' },
        series: [
          ...PS.map((p, i) => ({ kind: 'line' as const, points: bar(p - 0.005, PRIOR[i]), color: '#9ca3af' })),
          ...PS.map((p, i) => ({ kind: 'line' as const, points: bar(p + 0.005, POST[i]), color: '#f472b6' })),
          { kind: 'marker', at: [0.03, 0.75], size: 0, label: 'grey: prior', labelAt: [0.028, 0.75], color: '#9ca3af' },
          { kind: 'marker', at: [0.03, 0.69], size: 0, label: 'pink: posterior', labelAt: [0.028, 0.69], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'bayes-table',
      kind: 'table',
      label: 'Bayes’ rule over the three hypotheses',
      sub: 'the marginal likelihood is the probability of the data averaged over the prior',
      headers: ['p', 'prior', 'likelihood of 14/120', 'prior × likelihood', 'posterior'],
      values: [
        ...PS.map((p, i) => [p.toFixed(2), PRIOR[i].toFixed(2), LIK[i].toFixed(5), (PRIOR[i] * LIK[i]).toFixed(5), POST[i].toFixed(3)]),
        ['total', '1', '—', `${MARG.toFixed(4)} (marginal)`, '1'],
      ],
    },
  ],
  edges: [],
}
