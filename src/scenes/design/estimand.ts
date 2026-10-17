import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { QUARTER, SAMPLE_DEFECTS, SAMPLE_SIZE } from '../workshop'

// §1.1 — the parameter p = 420/6000 = 0.07 is fixed; the statistic p̂ = defects/120 changes with the
// sample. 20 simple random samples of 120 chairs (numpy seed 1): p̂ from 4/120 = 0.033 to 14/120 = 0.117,
// average 158/2400 = 0.066.
const P = QUARTER.defective / QUARTER.N
const PHAT: PlotPoint[] = SAMPLE_DEFECTS.map((d, i) => [i + 1, d / SAMPLE_SIZE])

export const estimand: Scene = {
  id: 'design-estimand',
  title: 'Populations, estimands, parameters and statistics',
  flow: 'TB',
  nodes: [
    {
      id: 'samples',
      kind: 'plot',
      label: 'One parameter, twenty statistics: p̂ from 20 random samples of 120 chairs',
      sub: 'the quarter’s defect proportion is p = 0.07; each sample estimates it differently',
      plot: {
        x: { min: 0, max: 21, step: 2, label: 'sample number' },
        y: { min: 0, max: 0.13, step: 0.01, label: 'proportion defective' },
        series: [
          { kind: 'line', points: [[0, P], [21, P]], label: 'parameter p = 0.07 (fixed, unknown in practice)', labelAt: [10.6, 0.092], color: '#9ca3af' },
          ...PHAT.map((pt) => ({ kind: 'segment' as const, from: [pt[0], P] as PlotPoint, to: pt, dashed: false, color: '#2dd4bf' })),
          { kind: 'scatter', points: PHAT, label: 'statistic p̂ = defects / 120', labelAt: [12.4, 0.118], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'terms',
      kind: 'table',
      label: 'From question to statistic',
      sub: 'question: what fraction of this quarter’s chairs fail inspection?',
      headers: ['term', 'meaning', 'in the workshop'],
      values: [
        ['population', 'every unit the question is about', 'the 6000 chairs made this quarter'],
        ['unit', 'one member of the population', 'one chair'],
        ['estimand', 'the quantity the question asks for', 'proportion that fail inspection'],
        ['parameter', 'its value in the population', 'p = 420/6000 = 0.07'],
        ['statistic', 'a number computed from a sample', 'p̂ = 0.033 to 0.117 across samples'],
      ],
    },
  ],
  edges: [],
}
