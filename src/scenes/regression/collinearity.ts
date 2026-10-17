import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { PARTS, WEIGHT } from './jobs'

// §10.3 — weight is nearly a copy of parts: correlation 0.992, VIF 1/(1 − r²) = 59.7. Fits (numpy lstsq):
// parts alone, slope 1.033 (SE 0.059); weight alone 2.02 (0.12); both: parts 1.26 (0.46), weight −0.46 (0.91).
// The fitted values hardly change; the split between the two coefficients is not identified by these data.
const PTS: PlotPoint[] = PARTS.map((p, i) => [p, WEIGHT[i]])

export const collinearity: Scene = {
  id: 'reg-collinearity',
  title: 'Coefficient interpretation, collinearity and identifiability',
  flow: 'TB',
  nodes: [
    {
      id: 'pair',
      kind: 'plot',
      label: 'Two predictors that carry the same information: parts and job weight',
      sub: 'correlation 0.992: the data cannot tell which one the time depends on',
      plot: {
        x: { min: 2, max: 22, step: 2, label: 'parts in the job' },
        y: { min: 1, max: 11.5, step: 1, label: 'job weight (kg)' },
        series: [
          { kind: 'line', points: [[2, 1], [22, 11]], label: 'weight ≈ 0.5 × parts', labelAt: [13, 5.4], color: '#9ca3af' },
          { kind: 'scatter', points: PTS, label: '60 jobs', labelAt: [2.5, 10.8], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'unstable',
      kind: 'table',
      label: 'Each alone is clear; together their coefficients are not',
      sub: 'variance inflation factor 59.7: SEs about √59.7 ≈ 7.7 times larger',
      headers: ['model', 'parts', 'weight', 'reading'],
      values: [
        ['parts alone', '1.033 (0.059)', '—', 'clear'],
        ['weight alone', '—', '2.02 (0.12)', 'clear'],
        ['both together', '1.26 (0.46)', '−0.46 (0.91)', 'unstable, sign flips'],
        ['"effect of weight holding parts fixed"', '—', '—', 'barely varies in data'],
      ],
    },
  ],
  edges: [],
}
