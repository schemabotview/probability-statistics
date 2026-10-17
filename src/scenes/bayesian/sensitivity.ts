import type { Scene } from '@graphlearning/flow'
import { sample } from '../plot-kit'
import { betaPdf, N, X } from './beta'

// §11.5 — three priors, same data (14/120): flat Beta(1, 1) → mean 0.123, 95% CrI (0.071, 0.187); informed
// Beta(2, 26) → 0.108 (0.064, 0.163); sceptical Beta(70, 930) (as if 1000 earlier chairs at 7%) → 0.075
// (0.060, 0.091). P(p > 0.07): 0.978, 0.947, 0.731 (scipy.stats.beta). Prior predictive check of the sceptical
// prior: it expects 8.4 ± 3.0 defectives in 120, so 14 sits in its upper tail.
export const sensitivity: Scene = {
  id: 'bayes-sensitivity',
  title: 'Prior and predictive checks and sensitivity',
  flow: 'TB',
  nodes: [
    {
      id: 'three',
      kind: 'plot',
      label: 'The same data under three priors',
      sub: 'a prior worth 1000 earlier chairs barely moves; flat and light priors let the 120 new chairs speak',
      plot: {
        x: { min: 0.02, max: 0.22, step: 0.02, label: 'defect rate p' },
        y: { min: 0, max: 50, step: 5, label: 'posterior density' },
        series: [
          { kind: 'line', points: sample(0.02, 0.22, 300, betaPdf(1 + X, 1 + N - X)), label: 'flat: 0.123', labelAt: [0.15, 11], color: '#9ca3af' },
          { kind: 'line', points: sample(0.02, 0.22, 300, betaPdf(2 + X, 26 + N - X)), label: 'informed: 0.108', labelAt: [0.12, 17], color: '#f472b6' },
          { kind: 'line', points: sample(0.02, 0.22, 300, betaPdf(70 + X, 930 + N - X)), label: 'sceptical, Beta(70, 930): 0.075', labelAt: [0.085, 43], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'table',
      kind: 'table',
      label: 'Sensitivity analysis: report how much the conclusion depends on the prior',
      sub: 'posterior mean, 95% credible interval, and P(worse than 0.07)',
      headers: ['prior', 'posterior mean', '95% CrI', 'P(p > 0.07)'],
      values: [
        ['flat Beta(1, 1)', '0.123', '(0.071, 0.187)', '0.978'],
        ['informed Beta(2, 26)', '0.108', '(0.064, 0.163)', '0.947'],
        ['sceptical Beta(70, 930)', '0.075', '(0.060, 0.091)', '0.731'],
        ['prior check, sceptical', 'expects 8.4 ± 3.0 in 120', 'saw 14', 'prior in tension with data'],
      ],
    },
  ],
  edges: [],
}
