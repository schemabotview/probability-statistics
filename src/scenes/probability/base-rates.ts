import type { Scene } from '@graphlearning/flow'
import { sample } from '../plot-kit'
import { SCREEN } from '../workshop'

// §2.7 — P(defective | flag) as a function of the defect rate π, sensitivity 0.9, false-positive rate
// 5% or 1%: 0.9π / (0.9π + f(1 − π)). Exact: at π = 0.07, 0.575 (f = 5%) and 0.871 (f = 1%); at
// π = 0.01, 0.154 and 0.476.
const ppv = (f: number) => (pi: number) => (SCREEN.sensitivity * pi) / (SCREEN.sensitivity * pi + f * (1 - pi))

export const baseRates: Scene = {
  id: 'prob-base-rates',
  title: 'Base rates and reversed conditions',
  flow: 'TB',
  nodes: [
    {
      id: 'ppv',
      kind: 'plot',
      label: 'P(defective | flagged) depends on how common defects are',
      sub: 'the check always catches 90% of defects; what a flag means changes with the base rate',
      plot: {
        x: { min: 0, max: 0.3, step: 0.02, label: 'defect rate π (base rate)' },
        y: { min: 0, max: 1, step: 0.1, label: 'P(defective | flagged)' },
        series: [
          { kind: 'line', points: [[0, 0.9], [0.3, 0.9]], label: 'P(flagged | defective) = 0.9: not the same thing', labelAt: [0.105, 0.93], color: '#9ca3af' },
          { kind: 'line', points: sample(0.0005, 0.3, 200, ppv(0.01)), label: 'false positives 1%', labelAt: [0.2, 0.84], color: '#2dd4bf' },
          { kind: 'line', points: sample(0.0005, 0.3, 200, ppv(0.05)), label: 'false positives 5%', labelAt: [0.2, 0.7], color: '#f472b6' },
          { kind: 'marker', at: [0.07, ppv(0.05)(0.07)], label: 'workshop: 0.575', labelAt: [0.075, 0.5], color: '#f472b6' },
          { kind: 'marker', at: [0.01, ppv(0.05)(0.01)], label: 'rare defects (1%): 0.154', labelAt: [0.015, 0.1], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'reversed',
      kind: 'table',
      label: 'The same check, different base rates',
      sub: 'confusing P(flag | defective) with P(defective | flag) ignores the base rate',
      headers: ['defect rate', 'P(D | flag), 5% false pos.', 'P(D | flag), 1% false pos.'],
      values: [
        ['0.1%', ppv(0.05)(0.001).toFixed(3), ppv(0.01)(0.001).toFixed(3)],
        ['1%', ppv(0.05)(0.01).toFixed(3), ppv(0.01)(0.01).toFixed(3)],
        ['7% (workshop)', ppv(0.05)(0.07).toFixed(3), ppv(0.01)(0.07).toFixed(3)],
        ['20%', ppv(0.05)(0.2).toFixed(3), ppv(0.01)(0.2).toFixed(3)],
      ],
    },
  ],
  edges: [],
}
