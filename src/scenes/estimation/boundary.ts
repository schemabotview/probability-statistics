import type { Scene } from '@graphlearning/flow'
import { sample } from '../plot-kit'

// §6.6 — 0 defective in 40 chairs: L(p) = (1 − p)⁴⁰, maximised at the boundary p̂ = 0, where ℓ′ ≠ 0 and the
// curvature formula gives SE 0. Exact one-sided 95% upper bound: 1 − 0.05^(1/40) = 0.072 (two-sided 97.5%
// Clopper–Pearson 0.088); "rule of three" 3/40 = 0.075. MLEs of other models: standard results.
const L = (p: number) => (1 - p) ** 40

export const boundary: Scene = {
  id: 'est-boundary',
  title: 'Bernoulli, normal and rate examples and boundary estimates',
  flow: 'TB',
  nodes: [
    {
      id: 'zero',
      kind: 'plot',
      label: 'No defectives in 40 chairs: the likelihood peaks at the boundary p = 0',
      sub: 'p̂ = 0 is the MLE, but the usual SE formula gives 0 and an interval of zero width',
      plot: {
        x: { min: 0, max: 0.15, step: 0.01, label: 'defect rate p' },
        y: { min: 0, max: 1.08, step: 0.1, label: 'relative likelihood (1 − p)⁴⁰' },
        series: [
          { kind: 'line', points: sample(0, 0.15, 150, L), label: 'L(p) = (1 − p)⁴⁰', labelAt: [0.02, 0.6], color: '#2dd4bf' },
          { kind: 'segment', from: [1 - 0.05 ** (1 / 40), 0], to: [1 - 0.05 ** (1 / 40), 0.4], dashed: false, label: 'exact 95% upper bound 0.072', labelAt: [0.076, 0.42], color: '#fbbf24' },
          { kind: 'segment', from: [0.075, 0], to: [0.075, 0.25], label: 'rule of three: 3/40 = 0.075', labelAt: [0.079, 0.22], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'mles',
      kind: 'table',
      label: 'Maximum likelihood estimates for common models',
      sub: 'all assume independent observations from the stated model',
      headers: ['model', 'parameter', 'MLE', 'note'],
      values: [
        ['Bernoulli', 'p', 'x / n', '0 if no defects'],
        ['normal', 'μ, σ²', 'x̄, Σ(x − x̄)²/n', 'σ̂² biased (§6.2)'],
        ['Poisson', 'flaws per panel λ', 'total flaws / panels', 'a rate needs exposure'],
        ['exponential', 'mean θ', 'x̄', 'mean stoppage gap'],
        ['0 of 40 defective', 'p', '0', 'report an upper bound'],
      ],
    },
  ],
  edges: [],
}
