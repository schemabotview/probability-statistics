import type { Scene } from '@graphlearning/flow'
import { bars, sample } from '../plot-kit'
import { STOPPAGE_MEAN } from '../workshop'

// §5.1 — inverse-CDF method: if U ~ Uniform(0, 1), X = −40 ln U has P(X > x) = P(U < e^(−x/40)) = e^(−x/40),
// so X ~ Exponential(mean 40). 2000 draws (numpy seed 12), 10-minute bins: sample mean 39.40,
// P(X > 60) = 0.2175 against e^(−1.5) = 0.2231.
const EDGES = Array.from({ length: 21 }, (_, i) => 10 * i)
const COUNTS = [450, 362, 259, 194, 166, 134, 91, 72, 57, 46, 35, 28, 33, 17, 12, 12, 9, 6, 4, 4]
const DENS = COUNTS.map((c) => c / (2000 * 10))

export const transform: Scene = {
  id: 'samp-transform',
  title: 'Transformations, the CDF method and Jacobian factors',
  flow: 'TB',
  nodes: [
    {
      id: 'inverse',
      kind: 'plot',
      label: '2000 values of X = −40 ln U, with U uniform on (0, 1)',
      sub: 'the CDF method predicts an exponential density with mean 40; the histogram agrees',
      plot: {
        x: { min: 0, max: 200, step: 20, label: 'x (minutes between stoppages)' },
        y: { min: 0, max: 0.026, step: 0.002, label: 'density' },
        series: [
          ...bars(EDGES, DENS).map((points) => ({ kind: 'line' as const, points, color: '#2dd4bf' })),
          { kind: 'line', points: sample(0, 200, 120, (x) => Math.exp(-x / STOPPAGE_MEAN) / STOPPAGE_MEAN), label: 'derived density (1/40) e^(−x/40)', labelAt: [42, 0.016], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'method',
      kind: 'table',
      label: 'Two ways to find the distribution of Y = g(X)',
      sub: 'CDF method: find P(Y ≤ y) directly; density method: f_Y(y) = f_X(x) |dx/dy| for monotone g',
      headers: ['step', 'for X = −40 ln U', 'result'],
      values: [
        ['P(X > x)', 'P(−40 ln U > x) = P(U < e^(−x/40))', 'e^(−x/40)'],
        ['differentiate the CDF', 'd/dx (1 − e^(−x/40))', '(1/40) e^(−x/40)'],
        ['Jacobian check', 'u = e^(−x/40), |du/dx| = (1/40) e^(−x/40)', 'same density'],
        ['simulation, 2000 draws', 'mean, P(X > 60)', '39.40, 0.2175'],
        ['exact', 'mean, P(X > 60)', '40, 0.2231'],
      ],
    },
  ],
  edges: [],
}
