import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { sample } from '../plot-kit'
import { SEAT, STOPPAGE_MEAN } from '../workshop'
import { normalPdf } from './dist'

// §3.5 — seat height ~ Normal(450, 3.9²). Spec 444–456 mm: z = ±6/3.9 = ±1.538, P(in spec) = 0.876
// (scipy.stats.norm). Stoppages ~ Exponential(mean 40): P(T > 60) = e^(−1.5) = 0.223; memoryless,
// P(T > 60 | T > 30) = e^(−0.75) = 0.472. Uniform(0, 0.5) has density 2 on its support.
const f = normalPdf(SEAT.mean, SEAT.sd)
const spec: PlotPoint[] = [[SEAT.lower, 0], ...sample(SEAT.lower, SEAT.upper, 60, f), [SEAT.upper, 0], [SEAT.lower, 0]]

export const continuous: Scene = {
  id: 'rv-continuous',
  title: 'Uniform, exponential and normal models',
  flow: 'TB',
  nodes: [
    {
      id: 'spec',
      kind: 'plot',
      label: 'Seat height ~ Normal(450, 3.9²): the share within the 444–456 mm spec',
      sub: 'standardise: z = (x − 450)/3.9, so the spec is −1.54 < Z < 1.54; shaded area 0.876',
      plot: {
        x: { min: 436, max: 464, step: 2, label: 'seat height (mm)' },
        y: { min: 0, max: 0.115, step: 0.01, label: 'density' },
        series: [
          { kind: 'area', points: spec, color: '#2dd4bf' },
          { kind: 'line', points: sample(436, 464, 200, f), label: 'Normal(450, 3.9²)', labelAt: [452.5, 0.1], color: '#fbbf24' },
          { kind: 'segment', from: [SEAT.lower, 0], to: [SEAT.lower, 0.11], label: 'lower spec 444 (z = −1.54)', labelAt: [436.3, 0.112], color: '#f472b6' },
          { kind: 'segment', from: [SEAT.upper, 0], to: [SEAT.upper, 0.11], label: 'upper 456 (z = 1.54)', labelAt: [456.3, 0.06], color: '#f472b6' },
          { kind: 'marker', at: [450, 0.04], size: 0, label: 'in spec: 0.876', labelAt: [447.4, 0.04], color: '#e5e7eb' },
        ],
      },
    },
    {
      id: 'models',
      kind: 'table',
      label: 'Three continuous models and what their parameters mean',
      sub: 'probabilities are areas: P(a < X < b) = F(b) − F(a)',
      headers: ['model', 'workshop use', 'calculation', 'value'],
      values: [
        ['Normal(450, 3.9²)', 'seat height', 'P(444 < X < 456)', '0.876'],
        ['Normal(450, 3.9²)', 'seat too high', 'P(Z > 1.54)', '0.062'],
        ['Exponential, mean 40', 'minutes between stoppages', `P(T > 60) = e^(−60/${STOPPAGE_MEAN})`, '0.223'],
        ['… memoryless', 'already 30 min without one', 'P(T > 60 | T > 30)', '0.472'],
        ['Uniform(0, 0.5)', 'density 2 on its range', 'a density can exceed 1', 'area still 1'],
      ],
    },
  ],
  edges: [],
}
