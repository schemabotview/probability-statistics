import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §3.7 — running means of 100 000 Pareto draws (x_m = 1) for tail index α = 1, 1.5 and 3 (numpy seed 9,
// inverse-CDF sampling), at 39 log-spaced n. α = 3: mean 1.5 and finite variance, settles. α = 1.5: mean 3,
// infinite variance, settles slowly. α = 1: no mean, keeps jumping. Repair cost (mixed): P(0) = 0.93, else
// lognormal median £25, log-sd 0.6: median £0, 95th percentile £17.80, 99th £47.44, mean £2.10 (scipy).
const NS = [1, 2, 3, 4, 6, 7, 10, 13, 18, 24, 32, 42, 56, 75, 100, 133, 178, 237, 316, 422, 562, 750, 1000, 1334, 1778, 2371, 3162, 4217, 5623, 7499, 10000, 13335, 17783, 23714, 31623, 42170, 56234, 74989, 100000]
const A1 = [7.707, 4.555, 3.876, 4.031, 5.244, 5.518, 5.366, 4.437, 7.387, 12.437, 10.7, 9.195, 7.758, 6.482, 5.637, 6.555, 5.782, 6.319, 6.45, 6.961, 6.011, 5.521, 9.495, 9.121, 8.364, 8.254, 8.427, 7.717, 17.686, 16.537, 19.955, 17.114, 14.905, 13.879, 12.542, 11.298, 12.593, 12.132, 13.384]
const A15 = [5.43, 3.603, 2.765, 6.096, 5.416, 4.874, 3.931, 3.438, 2.879, 4.475, 4.13, 3.777, 3.955, 3.51, 3.216, 2.991, 2.818, 3.01, 3.0, 3.292, 3.157, 3.047, 2.917, 2.78, 2.686, 2.742, 2.97, 2.932, 3.406, 3.296, 3.168, 3.078, 2.969, 2.989, 2.972, 2.942, 2.957, 2.952, 2.929]
const A3 = [1.032, 1.206, 1.28, 1.241, 1.342, 1.335, 1.343, 1.36, 1.313, 1.318, 1.447, 1.435, 1.4, 1.498, 1.485, 1.548, 1.573, 1.549, 1.508, 1.521, 1.529, 1.514, 1.499, 1.492, 1.497, 1.49, 1.497, 1.504, 1.508, 1.512, 1.507, 1.511, 1.51, 1.508, 1.505, 1.503, 1.502, 1.501, 1.501]
const pts = (v: number[]): PlotPoint[] => v.map((m, i) => [Math.log10(NS[i]), m])

export const tails: Scene = {
  id: 'rv-tails',
  title: 'Quantiles, tails, moments and mixed distributions',
  flow: 'TB',
  nodes: [
    {
      id: 'running',
      kind: 'plot',
      label: 'Running mean of n draws from three heavy-tailed Pareto models',
      sub: 'a sample mean settles only if the mean exists; with α = 1 there is no mean to settle on',
      plot: {
        x: { min: 0, max: 5, step: 0.5, label: 'log₁₀ n' },
        y: { min: 0, max: 21, step: 2, label: 'mean of the first n draws' },
        series: [
          { kind: 'line', points: pts(A1), label: 'α = 1: no mean, keeps jumping', labelAt: [2.0, 15.5], color: '#f472b6' },
          { kind: 'line', points: pts(A15), label: 'α = 1.5: mean 3, infinite variance', labelAt: [2.6, 4.6], color: '#fbbf24' },
          { kind: 'line', points: pts(A3), label: 'α = 3: mean 1.5, settles', labelAt: [3.2, 0.6], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'summaries',
      kind: 'table',
      label: 'Quantiles exist for every distribution; moments may not',
      sub: 'repair cost per chair is mixed: a 0.93 point mass at £0 plus a continuous part',
      headers: ['quantity', 'model', 'value'],
      values: [
        ['median repair cost', 'mixed', '£0'],
        ['95th percentile', 'mixed', '£17.80'],
        ['99th percentile', 'mixed', '£47.44'],
        ['mean repair cost', 'mixed', '£2.10'],
        ['mean, Pareto α = 1', 'x⁻² tail', 'does not exist'],
        ['variance, Pareto α = 1.5', 'x⁻²·⁵ tail', 'infinite'],
      ],
    },
  ],
  edges: [],
}
