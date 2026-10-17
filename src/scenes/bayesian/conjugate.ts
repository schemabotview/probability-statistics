import type { Scene } from '@graphlearning/flow'
import { sample } from '../plot-kit'
import { betaPdf, N, X } from './beta'

// §11.2 — Beta(a, b) prior + x defective in n → Beta(a + x, b + n − x) posterior (exact). Flat Beta(1, 1) →
// Beta(15, 107), mean 0.123. Informed Beta(2, 26) (mean 0.071, worth 28 chairs) → Beta(16, 132), mean 0.108.
export const conjugate: Scene = {
  id: 'bayes-conjugate',
  title: 'Beta–binomial conjugate updating',
  flow: 'TB',
  nodes: [
    {
      id: 'curves',
      kind: 'plot',
      label: 'Two priors for the defect rate, and their posteriors after 14 defective in 120',
      sub: 'grey and teal: priors; amber and pink: posteriors. The informed prior pulls the answer slightly towards 0.07',
      plot: {
        x: { min: 0, max: 0.3, step: 0.02, label: 'defect rate p' },
        y: { min: 0, max: 20, step: 2, label: 'density' },
        series: [
          { kind: 'line', points: sample(0.002, 0.3, 200, betaPdf(1, 1)), label: 'flat prior', labelAt: [0.25, 1.6], color: '#9ca3af' },
          { kind: 'line', points: sample(0.002, 0.3, 200, betaPdf(2, 26)), label: 'informed prior, mean 0.071', labelAt: [0.005, 14.6], color: '#2dd4bf' },
          { kind: 'line', points: sample(0.002, 0.3, 300, betaPdf(1 + X, 1 + N - X)), label: 'posterior from flat: mean 0.123', labelAt: [0.155, 12], color: '#f59e0b' },
          { kind: 'line', points: sample(0.002, 0.3, 300, betaPdf(2 + X, 26 + N - X)), label: 'posterior from informed: mean 0.108', labelAt: [0.135, 16], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'rule',
      kind: 'table',
      label: 'Conjugate updating: add defects to a, good chairs to b',
      sub: 'a prior Beta(a, b) acts like a + b earlier chairs, a of them defective',
      headers: ['prior', 'prior mean', 'posterior', 'posterior mean'],
      values: [
        ['Beta(1, 1), flat', '0.500', `Beta(${1 + X}, ${1 + N - X})`, ((1 + X) / (2 + N)).toFixed(3)],
        ['Beta(2, 26), informed', '0.071', `Beta(${2 + X}, ${26 + N - X})`, ((2 + X) / (28 + N)).toFixed(3)],
        ['data alone', '—', '14 of 120', '0.117'],
      ],
    },
  ],
  edges: [],
}
