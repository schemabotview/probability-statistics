import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { fitLine, PARTS, TIME } from './jobs'

// §10.1 — least-squares line for processing time on number of parts, 60 jobs, computed here (numpy lstsq
// agrees): intercept 3.29 (SE 0.79), slope 1.033 (SE 0.059), residual SD 2.20, R² 0.839.
const F = fitLine(PARTS, TIME)
const PTS: PlotPoint[] = PARTS.map((p, i) => [p, TIME[i]])

export const leastSquares: Scene = {
  id: 'reg-least-squares',
  title: 'Conditional-mean models and least squares',
  flow: 'TB',
  nodes: [
    {
      id: 'fit',
      kind: 'plot',
      label: 'Processing time against number of parts, 60 jobs',
      sub: `the line estimates E[time | parts] = a + b × parts; least squares picks a, b to minimise Σ residual²`,
      plot: {
        x: { min: 2, max: 22, step: 2, label: 'parts in the job' },
        y: { min: 3, max: 27, step: 2, label: 'processing time (minutes)' },
        series: [
          ...PTS.filter((_, i) => i % 6 === 0).map((p) => ({ kind: 'segment' as const, from: p, to: [p[0], F.a + F.b * p[0]] as PlotPoint, color: '#f472b6' })),
          { kind: 'scatter', points: PTS, label: '60 jobs', labelAt: [2.5, 25.8], color: '#2dd4bf' },
          { kind: 'line', points: [[2, F.a + 2 * F.b], [22, F.a + 22 * F.b]], label: `fitted: ${F.a.toFixed(2)} + ${F.b.toFixed(3)} × parts`, labelAt: [13.2, 25.2], color: '#fbbf24' },
          { kind: 'marker', at: [3, 4], size: 0, label: 'pink: some residuals y − ŷ', labelAt: [14, 6], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'coef',
      kind: 'table',
      label: 'The fitted model and what each number means',
      sub: 'a model for the conditional mean, not a rule every job follows',
      headers: ['quantity', 'estimate', 'meaning'],
      values: [
        ['slope b', `${F.b.toFixed(3)} (SE ${F.seB.toFixed(3)})`, 'minutes per extra part, on average'],
        ['intercept a', F.a.toFixed(2), 'set-up time; parts = 0 is outside the data'],
        ['residual SD s', F.s.toFixed(2), 'typical scatter around the line'],
        ['R²', F.r2.toFixed(3), 'share of time variance explained'],
      ],
    },
  ],
  edges: [],
}
