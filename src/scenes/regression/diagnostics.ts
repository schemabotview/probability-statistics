import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { fitLine } from './jobs'

// §10.5 — a second batch of 60 jobs (numpy seed 52) whose scatter grows with size (noise SD 0.25 × parts),
// plus one 40-part job logged at 20 minutes (a timer left running from the wrong job). With it: slope 0.72;
// leverage h = 0.365 (mean 0.033), Cook's distance 6.87 (others ≤ 0.29). Without it: slope 1.001 (numpy).
// Residual SD among jobs of ≤ 10 parts 1.46, of ≥ 16 parts 4.30: heteroscedastic.
const P = [20, 14, 8, 13, 11, 12, 17, 4, 9, 13, 8, 20, 19, 10, 5, 4, 8, 8, 19, 20, 13, 19, 5, 12, 8, 5, 7, 5, 16, 20, 12, 5, 11, 12, 4, 10, 16, 17, 9, 5, 4, 12, 8, 18, 7, 11, 5, 17, 5, 13, 8, 7, 18, 17, 6, 8, 7, 14, 9, 8, 40]
const Y = [28.8, 17.4, 12.8, 12.4, 6.9, 17.1, 20.8, 8.3, 12.4, 14.7, 10.7, 27.1, 17.6, 12.3, 8.5, 7.9, 15.6, 10.2, 33.2, 22.9, 15.8, 19.1, 9.7, 19.9, 9.5, 8.4, 9.9, 7.8, 14.5, 24.3, 17.1, 8.9, 12.6, 15.6, 8.6, 14.2, 22.5, 18.7, 14.0, 9.4, 7.1, 14.5, 9.9, 21.1, 10.1, 14.2, 8.5, 17.0, 9.2, 12.2, 11.3, 6.3, 15.8, 22.4, 9.1, 11.8, 8.7, 11.4, 9.7, 11.2, 20.0]
const WITH = fitLine(P, Y)
const WITHOUT = fitLine(P.slice(0, -1), Y.slice(0, -1))
const PTS: PlotPoint[] = P.slice(0, -1).map((p, i) => [p, Y[i]])

export const diagnostics: Scene = {
  id: 'reg-diagnostics',
  title: 'Residuals, heteroscedasticity, leverage and influence',
  flow: 'TB',
  nodes: [
    {
      id: 'influence',
      kind: 'plot',
      label: 'One mislogged 40-part job drags the whole line',
      sub: 'the point sits far out in x (high leverage) and off the pattern (large residual): together, influence',
      plot: {
        x: { min: 2, max: 42, step: 4, label: 'parts in the job' },
        y: { min: 4, max: 45, step: 5, label: 'processing time (minutes)' },
        series: [
          { kind: 'scatter', points: PTS, label: 'scatter widens with size', labelAt: [3, 36], color: '#2dd4bf' },
          { kind: 'marker', at: [40, 20], label: '40 parts, logged 20 min', labelAt: [29, 17], color: '#f472b6' },
          { kind: 'line', points: [[2, WITH.a + 2 * WITH.b], [42, WITH.a + 42 * WITH.b]], label: `with it: slope ${WITH.b.toFixed(2)}`, labelAt: [30, 30], color: '#f472b6' },
          { kind: 'line', points: [[2, WITHOUT.a + 2 * WITHOUT.b], [42, WITHOUT.a + 42 * WITHOUT.b]], label: `without it: slope ${WITHOUT.b.toFixed(2)}`, labelAt: [23, 39], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'checks',
      kind: 'table',
      label: 'What to look for in the residuals',
      sub: 'diagnostics computed with numpy for the 61 jobs',
      headers: ['problem', 'symptom', 'here'],
      values: [
        ['heteroscedasticity', 'residual spread changes with fit', 'SD 1.46 small jobs, 4.30 large'],
        ['dependence', 'patterns in time or by group', 'check by day and batch'],
        ['leverage', 'unusual x: h far above mean 0.033', 'h = 0.365'],
        ['influence', 'Cook’s distance well above 1', '6.87; next largest 0.29'],
        ['action', 'check the record, not just delete', 'timer left running'],
      ],
    },
  ],
  edges: [],
}
