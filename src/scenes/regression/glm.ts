import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { sample } from '../plot-kit'

// §10.7 — 400 chairs, defect (0/1) against machine speed (chairs per hour), simulated from
// logit p = −5 + 0.35 speed (numpy seed 54). Maximum likelihood logistic fit (scipy BFGS): −4.81 + 0.326 speed,
// SEs 0.77 and 0.100; odds ratio per unit speed e^0.326 = 1.38, CI (1.14, 1.68). Fitted p: 0.021 at 3,
// 0.099 at 8. Dots: observed defect rate in 1-unit speed bins (49–60 chairs each).
const p = (s: number) => 1 / (1 + Math.exp(-(-4.8134 + 0.32566 * s)))
const BINS: PlotPoint[] = [[2.5, 0.0], [3.5, 0.0], [4.5, 0.068], [5.5, 0.021], [6.5, 0.071], [7.5, 0.16], [8.5, 0.143], [9.5, 0.059]]

export const glm: Scene = {
  id: 'reg-glm',
  title: 'Logistic and Poisson regression orientation',
  flow: 'TB',
  nodes: [
    {
      id: 'logistic',
      kind: 'plot',
      label: 'Probability of a defect against machine speed: a logistic regression',
      sub: 'the model is linear in the log-odds, so probabilities stay between 0 and 1',
      plot: {
        x: { min: 2, max: 10, step: 1, label: 'machine speed (chairs per hour)' },
        y: { min: 0, max: 0.2, step: 0.02, label: 'P(defect)' },
        series: [
          { kind: 'scatter', points: BINS, size: 7, label: 'observed rate per speed bin', labelAt: [2.2, 0.185], color: '#2dd4bf' },
          { kind: 'line', points: sample(2, 10, 80, p), label: 'fitted: logit p = −4.81 + 0.326 × speed', labelAt: [3.4, 0.07], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'models',
      kind: 'table',
      label: 'Generalised linear models: the right scale for counts and binary outcomes',
      sub: 'coefficients act on a link scale; report them back on the outcome’s scale',
      headers: ['outcome', 'model', 'coefficient means', 'here'],
      values: [
        ['defect yes/no', 'logistic: log-odds linear', 'odds ratio per unit', '1.38 (1.14, 1.68) per chair/h'],
        ['… on the probability scale', 'not constant', 'depends on speed', '0.021 at 3 → 0.099 at 8'],
        ['flaws per panel', 'Poisson: log-rate linear', 'rate ratio per unit', 'needs panel area as offset'],
        ['overdispersed counts', 'Poisson SEs too small', 'chapter 8 flaws', 'use a quasi or NB model'],
      ],
    },
  ],
  edges: [],
}
