import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §7.7 — one-sided exact binomial test of H₀: p = 0.07 at α = 0.05. Rejection region found here: X ≥ 14
// for n = 120 (actual size 0.041), X ≥ 44 for n = 480 (size 0.042). Power P(reject | p) by exact binomial
// sums. Power at p = 0.10: 0.313 (n = 120), 0.750 (n = 480); n = 560 reaches 0.80 (scipy search).
const choose = (a: number, b: number): number => (b === 0 ? 1 : (choose(a, b - 1) * (a - b + 1)) / b)
const tail = (n: number, p: number, c: number) => {
  let s = 0
  for (let k = c; k <= n; k++) s += Math.exp(Math.log(choose(n, k)) + k * Math.log(p) + (n - k) * Math.log(1 - p))
  return s
}
const PS = Array.from({ length: 61 }, (_, i) => 0.06 + i * 0.0015)
const curve = (n: number, c: number): PlotPoint[] => PS.map((p) => [p, tail(n, p, c)])

export const power: Scene = {
  id: 'inf-power',
  title: 'Type I and II errors, power and precision planning',
  flow: 'TB',
  nodes: [
    {
      id: 'curves',
      kind: 'plot',
      label: 'Power to detect a worse supplier, for 120 and 480 inspected chairs',
      sub: 'probability the test rejects H₀: p = 0.07, as a function of the true defect rate',
      plot: {
        x: { min: 0.06, max: 0.15, step: 0.01, label: 'true defect rate p' },
        y: { min: 0, max: 1.02, step: 0.1, label: 'P(reject H₀)' },
        series: [
          { kind: 'line', points: [[0.06, 0.05], [0.15, 0.05]], label: 'α = 0.05: type I error at p = 0.07', labelAt: [0.105, 0.08], color: '#9ca3af' },
          { kind: 'line', points: [[0.06, 0.8], [0.15, 0.8]], label: 'target power 0.8', labelAt: [0.061, 0.83], color: '#9ca3af' },
          { kind: 'line', points: curve(120, 14), label: 'n = 120: power 0.31 at p = 0.10', labelAt: [0.113, 0.4], color: '#f472b6' },
          { kind: 'line', points: curve(480, 44), label: 'n = 480: power 0.75 at p = 0.10', labelAt: [0.07, 0.62], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'errors',
      kind: 'table',
      label: 'Two kinds of error, and planning the sample size',
      sub: 'exact binomial; the planned difference must be one that matters',
      headers: ['quantity', 'n = 120', 'n = 480'],
      values: [
        ['reject H₀ if X ≥', '14', '44'],
        ['type I error (p = 0.07)', '0.041', '0.042'],
        ['power at p = 0.10', '0.313', '0.750'],
        ['type II error at p = 0.10', '0.687', '0.250'],
        ['n for power 0.8 at p = 0.10', '560', '560'],
      ],
    },
  ],
  edges: [],
}
