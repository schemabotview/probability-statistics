import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §5.3 — T ~ lognormal(median 12, log-sd 0.5): mean μ = 13.60, SD σ = 7.25 (scipy). Upper bounds on
// P(T ≥ t): Markov μ/t (needs T ≥ 0 and a mean); Chebyshev σ²/(t − μ)² (needs a variance). Exact tail
// from scipy.stats.lognorm.sf at t = 20, 30, 40, 60. All on log₁₀ scale.
const T = [20, 30, 40, 60]
const MARKOV = [0.6799, 0.4533, 0.3399, 0.2266]
const CHEB = [1.2812, 0.1952, 0.0753, 0.0244]
const EXACT = [0.1535, 0.03343, 0.008021, 0.0006435]
const lg = (v: number[]): PlotPoint[] => v.map((p, i) => [T[i], Math.log10(Math.min(p, 1))])

export const bounds: Scene = {
  id: 'samp-bounds',
  title: 'Probability bounds and their conditions',
  flow: 'TB',
  nodes: [
    {
      id: 'tails',
      kind: 'plot',
      label: 'How likely is a job of t minutes or more? Bounds against the model’s answer',
      sub: 'bounds need only a mean (Markov) or a variance (Chebyshev); they are safe, and loose',
      plot: {
        x: { min: 15, max: 62, step: 5, label: 't (minutes)' },
        y: { min: -3.4, max: 0.2, step: 0.5, label: 'log₁₀ P(T ≥ t)' },
        series: [
          { kind: 'line', points: lg(MARKOV), color: '#f472b6' },
          { kind: 'scatter', points: lg(MARKOV), label: 'Markov: μ / t', labelAt: [48, -0.45], color: '#f472b6' },
          { kind: 'line', points: lg(CHEB), color: '#fbbf24' },
          { kind: 'scatter', points: lg(CHEB), label: 'Chebyshev: σ² / (t − μ)²', labelAt: [40, -1.45], color: '#fbbf24' },
          { kind: 'line', points: lg(EXACT), color: '#2dd4bf' },
          { kind: 'scatter', points: lg(EXACT), label: 'lognormal model: exact', labelAt: [26, -2.6], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'values',
      kind: 'table',
      label: 'P(T ≥ t): two bounds and the model value',
      sub: 'μ = 13.60, σ = 7.25 minutes; a bound above 1 says nothing',
      headers: ['t', 'Markov ≤', 'Chebyshev ≤', 'lognormal model'],
      values: T.map((t, i) => [String(t), MARKOV[i].toFixed(3), CHEB[i] > 1 ? '1 (vacuous)' : CHEB[i].toFixed(3), EXACT[i] < 0.01 ? EXACT[i].toFixed(4) : EXACT[i].toFixed(3)]),
    },
  ],
  edges: [],
}
