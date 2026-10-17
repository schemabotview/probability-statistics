import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { binom } from './dist'

// §3.2 — X = defective chairs in a batch of 20, Binomial(20, 0.07): E[X] = 1.4, Var(X) = 1.302 (exact).
// Rework cost g(X) = £10 set-up if X > 0, plus £15 per defective. E[g(X)] = 10 × 0.7658 + 15 × 1.4 =
// £28.66, while g(E[X]) = g(1.4) = £31: E[g(X)] ≠ g(E[X]) for nonlinear g.
const f = binom(20, 0.07)
const K = Array.from({ length: 8 }, (_, k) => k)
const PMF: PlotPoint[] = K.map((k) => [k, f(k)])
const g = (x: number) => (x > 0 ? 10 : 0) + 15 * x
const Eg = Array.from({ length: 21 }, (_, k) => g(k) * f(k)).reduce((a, b) => a + b, 0)

export const expectation: Scene = {
  id: 'rv-expectation',
  title: 'Expectation, transformations and variance',
  flow: 'TB',
  nodes: [
    {
      id: 'balance',
      kind: 'plot',
      label: 'Defective chairs in a batch of 20: the mean is the balance point',
      sub: 'E[X] = Σ k P(X = k) = 1.4; Var(X) = Σ (k − 1.4)² P(X = k) = 1.302',
      plot: {
        x: { min: -0.5, max: 7.5, step: 1, label: 'k, defective chairs in the batch' },
        y: { min: 0, max: 0.4, step: 0.05, label: 'P(X = k)' },
        series: [
          ...PMF.map((pt) => ({ kind: 'segment' as const, from: [pt[0], 0] as PlotPoint, to: pt, dashed: false, color: '#2dd4bf' })),
          { kind: 'scatter', points: PMF, label: 'Binomial(20, 0.07)', labelAt: [3.3, 0.2], color: '#2dd4bf' },
          { kind: 'segment', from: [1.4, 0], to: [1.4, 0.38], dashed: false, label: 'E[X] = 1.4', labelAt: [1.5, 0.375], color: '#fbbf24' },
          { kind: 'segment', from: [1.4 - Math.sqrt(1.302), 0.02], to: [1.4 + Math.sqrt(1.302), 0.02], label: '± SD 1.14', labelAt: [2.65, 0.03], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'rules',
      kind: 'table',
      label: 'Rework cost g(X) = £10 if any defect, plus £15 each',
      sub: 'linear rules pass through expectation; nonlinear ones do not',
      headers: ['quantity', 'calculation', 'value'],
      values: [
        ['E[X]', 'np = 20 × 0.07', '1.4'],
        ['Var(X)', 'np(1 − p)', '1.302'],
        ['E[15X]', '15 E[X] (linear)', '£21.00'],
        ['E[g(X)]', '10 P(X > 0) + 15 E[X]', `£${Eg.toFixed(2)}`],
        ['g(E[X])', 'g(1.4) = 10 + 21', '£31.00: not E[g(X)]'],
      ],
    },
  ],
  edges: [],
}
