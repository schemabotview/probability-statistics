import type { Scene } from '@graphlearning/flow'
import { sample } from '../plot-kit'

// §6.4 — 9 defective in 120 inspected. Likelihood L(p) = p⁹(1 − p)¹¹¹, shown relative to its maximum at
// p̂ = 0.075. Relative likelihood: 0.051 at 0.03, 0.502 at 0.05, 0.636 at 0.10, 0.271 at 0.12. The 1/8
// likelihood interval (scipy brentq) is 0.036 to 0.134.
const rel = (p: number) => Math.exp(9 * Math.log(p / 0.075) + 111 * Math.log((1 - p) / 0.925))

export const likelihood: Scene = {
  id: 'est-likelihood',
  title: 'Likelihood versus parameter probability',
  flow: 'TB',
  nodes: [
    {
      id: 'curve',
      kind: 'plot',
      label: 'Likelihood of p after finding 9 defective chairs in 120',
      sub: 'L(p) = p⁹(1 − p)¹¹¹, scaled so its peak is 1: how well each p explains the data',
      plot: {
        x: { min: 0, max: 0.2, step: 0.02, label: 'defect rate p' },
        y: { min: 0, max: 1.08, step: 0.1, label: 'relative likelihood' },
        series: [
          { kind: 'line', points: sample(0.001, 0.2, 200, rel), label: 'L(p) / L(0.075)', labelAt: [0.105, 0.75], color: '#2dd4bf' },
          { kind: 'segment', from: [0.0356, 0.125], to: [0.1338, 0.125], dashed: false, label: '1/8 likelihood interval: 0.036 to 0.134', labelAt: [0.137, 0.14], color: '#fbbf24' },
          { kind: 'segment', from: [0.075, 0], to: [0.075, 1], label: 'p̂ = 9/120 = 0.075', labelAt: [0.078, 1.03], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'Likelihood compares parameter values; it is not a probability for p',
      sub: 'the data are fixed; p varies along the curve',
      headers: ['p', 'relative likelihood', 'reading'],
      values: [
        ['0.03', '0.051', '20× less able to explain 9/120'],
        ['0.05', '0.502', 'half as well'],
        ['0.075', '1', 'best: the maximum'],
        ['0.10', '0.636', 'nearly as well'],
        ['area under L(p)', 'not 1 in general', 'not a density over p'],
      ],
    },
  ],
  edges: [],
}
