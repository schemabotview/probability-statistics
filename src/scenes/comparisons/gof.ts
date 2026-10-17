import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §8.6 — flaws on 200 panels (numpy seed 34, negative binomial with mean 1.5, overdispersed): mean 1.435,
// variance 2.62. Poisson fitted with λ̂ = 1.435; cells 0, 1, …, 5, 6+. χ² = 50.1 with df = 7 cells − 1 − 1
// estimated parameter = 5, p = 1.3 × 10⁻⁹ (scipy). Counting df as 6 ignores the estimated λ.
const K = [0, 1, 2, 3, 4, 5, 6]
const OBS = [61, 70, 32, 18, 10, 3, 6]
const EXP = [47.62, 68.34, 49.03, 23.45, 8.41, 2.41, 0.72]

export const gof: Scene = {
  id: 'cmp-gof',
  title: 'Goodness of fit and estimated-parameter degrees of freedom',
  flow: 'TB',
  nodes: [
    {
      id: 'fit',
      kind: 'plot',
      label: 'Flaws per panel on 200 panels, against a fitted Poisson',
      sub: 'too many flawless panels and too many badly flawed ones: flaws cluster, the variance exceeds the mean',
      plot: {
        x: { min: -0.6, max: 6.6, step: 1, label: 'flaws on a panel (6 = six or more)' },
        y: { min: 0, max: 75, step: 10, label: 'panels' },
        series: [
          ...K.map((k) => ({ kind: 'line' as const, points: [[k - 0.3, 0], [k - 0.3, OBS[k]], [k + 0.3, OBS[k]], [k + 0.3, 0]] as PlotPoint[], color: '#2dd4bf' })),
          { kind: 'scatter', points: K.map((k): PlotPoint => [k, EXP[k]]), size: 7, label: 'Poisson(1.435) expected', labelAt: [2.6, 52], color: '#fbbf24' },
          { kind: 'marker', at: [4.5, 60], size: 0, label: 'observed panels', labelAt: [3.6, 66], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'test',
      kind: 'table',
      label: 'χ² goodness of fit: df = cells − 1 − parameters estimated',
      sub: 'estimating λ from the same data makes the fit look better, so it costs a degree of freedom',
      headers: ['quantity', 'value'],
      values: [
        ['sample mean, variance', '1.435, 2.62'],
        ['χ² over 7 cells', '50.1'],
        ['df: 7 − 1 − 1 (λ estimated)', '5: p = 1.3 × 10⁻⁹'],
        ['df if λ were known', '6: p = 4.6 × 10⁻⁹'],
        ['6+ cell expected 0.7', 'sparse: pool or simulate'],
      ],
    },
  ],
  edges: [],
}
