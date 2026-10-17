import type { Scene } from '@graphlearning/flow'
import { sample } from '../plot-kit'
import { SCREEN } from '../workshop'

// §6.1 — if only the check's flag rate is recorded, P(flag) = s·p + f(1 − p). With f = 0.05 and an observed
// flag rate of 0.1095, every (p, s) on the curve s = (0.1095 − 0.05(1 − p))/p fits equally well, from
// p = 0.0626 (s = 1) upward. The true (0.07, 0.90) is one point among them. Exact algebra.
const FLAG = SCREEN.prevalence * SCREEN.sensitivity + (1 - SCREEN.prevalence) * SCREEN.falsePositive
const s = (p: number) => (FLAG - SCREEN.falsePositive * (1 - p)) / p
const pMin = (FLAG - SCREEN.falsePositive) / (1 - SCREEN.falsePositive)

export const identify: Scene = {
  id: 'est-identify',
  title: 'Models, parameters, identifiability and estimators',
  flow: 'TB',
  nodes: [
    {
      id: 'curve',
      kind: 'plot',
      label: 'From flag counts alone, defect rate and check sensitivity cannot be separated',
      sub: `every point on the curve predicts the same flag rate, ${FLAG.toFixed(4)}: the data cannot choose between them`,
      plot: {
        x: { min: 0.05, max: 0.3, step: 0.025, label: 'defect rate p' },
        y: { min: 0, max: 1.05, step: 0.1, label: 'sensitivity s of the check' },
        series: [
          { kind: 'line', points: sample(pMin, 0.3, 120, s), label: 'all (p, s) with P(flag) = 0.1095', labelAt: [0.13, 0.5], color: '#2dd4bf' },
          { kind: 'marker', at: [SCREEN.prevalence, SCREEN.sensitivity], label: 'the truth (0.07, 0.90): one of many', labelAt: [0.08, 0.95], color: '#fbbf24' },
          { kind: 'marker', at: [0.15, s(0.15)], label: '(0.15, 0.45): fits as well', labelAt: [0.155, 0.32], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'terms',
      kind: 'table',
      label: 'A model’s parameters, and estimators for them',
      sub: 'identifiable: different parameter values give different data distributions',
      headers: ['model', 'parameter', 'estimator', 'identifiable?'],
      values: [
        ['Bernoulli inspections', 'defect rate p', 'p̂ = defectives / n', 'yes'],
        ['normal seat heights', 'mean μ, SD σ', 'x̄, s', 'yes'],
        ['flags only', 'p and sensitivity s', 'none can separate them', 'no'],
        ['flags + a re-inspected subsample', 'p and s', 'two equations', 'yes'],
      ],
    },
  ],
  edges: [],
}
