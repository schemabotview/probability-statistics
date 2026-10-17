import type { Scene } from '@graphlearning/flow'
import { sample } from '../plot-kit'

// §6.5 — log-likelihood ℓ(p) = 9 ln p + 111 ln(1 − p) minus its maximum. ℓ′(p) = 9/p − 111/(1 − p) = 0 at
// p̂ = 9/120 = 0.075. Observed information −ℓ″(p̂) = n/(p̂(1 − p̂)) = 1729.7, so SE = 1/√1729.7 = 0.0240.
// The quadratic −(p − p̂)²/(2 SE²) is the local approximation. Exact.
const ll = (p: number) => 9 * Math.log(p / 0.075) + 111 * Math.log((1 - p) / 0.925)
const SE = Math.sqrt((0.075 * 0.925) / 120)
const quad = (p: number) => -((p - 0.075) ** 2) / (2 * SE * SE)

export const mle: Scene = {
  id: 'est-mle',
  title: 'Log likelihood and maximum likelihood',
  flow: 'TB',
  nodes: [
    {
      id: 'log',
      kind: 'plot',
      label: 'Log-likelihood for 9 defective in 120, and its quadratic approximation',
      sub: 'the peak gives the estimate; the curvature at the peak gives its standard error',
      plot: {
        x: { min: 0.01, max: 0.18, step: 0.01, label: 'defect rate p' },
        y: { min: -8, max: 0.5, step: 1, label: 'ℓ(p) − ℓ(p̂)' },
        series: [
          { kind: 'line', points: sample(0.012, 0.18, 200, quad), label: 'quadratic: curvature 1730 → SE 0.024', labelAt: [0.1, -6.6], color: '#fbbf24' },
          { kind: 'line', points: sample(0.012, 0.18, 200, ll), label: 'log-likelihood: skewed', labelAt: [0.125, -2.9], color: '#2dd4bf' },
          { kind: 'marker', at: [0.075, 0], label: 'p̂ = 0.075, where ℓ′(p) = 0', labelAt: [0.08, 0.25], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'derive',
      kind: 'table',
      label: 'Maximum likelihood for a Bernoulli sample, step by step',
      sub: 'x defective in n independent inspections',
      headers: ['step', 'expression', 'here'],
      values: [
        ['likelihood', 'L(p) = pˣ(1 − p)ⁿ⁻ˣ', 'p⁹(1 − p)¹¹¹'],
        ['log-likelihood', 'ℓ(p) = x ln p + (n − x) ln(1 − p)', 'products become sums'],
        ['set ℓ′(p) = 0', 'x/p − (n − x)/(1 − p) = 0', 'p̂ = x/n = 0.075'],
        ['curvature', '−ℓ″(p̂) = n / (p̂(1 − p̂))', '1729.7'],
        ['standard error', '1/√(−ℓ″(p̂))', '0.0240'],
      ],
    },
  ],
  edges: [],
}
