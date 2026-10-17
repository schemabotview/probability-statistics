import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §10.8 — model selection among noise: 60 jobs, an outcome unrelated to 10 candidate predictors; keep the one
// with the largest |t|. 5000 simulated datasets (numpy seed 55): the chosen predictor is "significant" at 5%
// in 40.0% of datasets (theory 1 − 0.95¹⁰ = 0.401). Curve: 1 − 0.95ᵐ for m candidates, exact for independent
// tests; dot: the simulation at m = 10.
const CURVE: PlotPoint[] = Array.from({ length: 30 }, (_, i) => [i + 1, 100 * (1 - 0.95 ** (i + 1))])

export const selection: Scene = {
  id: 'reg-selection',
  title: 'Selection uncertainty and causal and predictive limits',
  flow: 'TB',
  nodes: [
    {
      id: 'chance',
      kind: 'plot',
      label: 'Pick the best of m useless predictors: how often does it look significant?',
      sub: 'the p-value of a selected variable ignores the selection; with 10 candidates, 40% of the time',
      plot: {
        x: { min: 0, max: 31, step: 2, label: 'candidate predictors tried' },
        y: { min: 0, max: 85, step: 10, label: 'chance the winner has p < 0.05 (%)' },
        series: [
          { kind: 'line', points: [[0, 5], [31, 5]], label: 'nominal 5%', labelAt: [24, 7.5], color: '#9ca3af' },
          { kind: 'line', points: CURVE, label: '1 − 0.95ᵐ', labelAt: [20, 70], color: '#f472b6' },
          { kind: 'marker', at: [10, 40.0], label: 'simulated, m = 10: 40.0%', labelAt: [11, 35.5], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'limits',
      kind: 'table',
      label: 'What a fitted regression does and does not establish',
      sub: 'coefficients describe conditional association in the data as collected',
      headers: ['claim', 'needs'],
      values: [
        ['association given the predictors', 'the model fits; diagnostics pass'],
        ['causal effect of a predictor', 'randomisation or no unmeasured confounders (ch. 9)'],
        ['good predictions for new jobs', 'validation on data not used to fit'],
        ['p-values after choosing the model', 'honest only if selection is accounted for'],
      ],
    },
  ],
  edges: [],
}
