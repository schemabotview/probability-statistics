import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §12.6 — numpy seed 43, 1000 simulated months of N = 400 jobs: size ~ U(1, 5) always recorded, time
// lognormal with log-mean ln 6 + 0.3 size, log-sd 0.35; true mean time 16.65. Missing times: MCAR 30%;
// MAR 30%, more likely for large jobs (logistic in size); MNAR 24%, more likely for long jobs (logistic in time).
// Complete-case mean, single regression imputation (log time on size), and multiple imputation (20 draws,
// coefficients and residual drawn, Rubin's rules) with 95% intervals. Plot: month 1; table: 1000 months.
const TRUE = 16.65
const ROWS: [string, number, number, number, string][] = [
  ['no missing data', 16.79, 15.92, 17.66, '#9ca3af'],
  ['MCAR, complete cases', 16.28, 15.36, 17.19, '#2dd4bf'],
  ['MAR, complete cases', 15.31, 14.33, 16.3, '#f472b6'],
  ['MAR, single imputation', 16.23, 15.48, 16.98, '#a78bfa'],
  ['MAR, multiple imputation', 16.62, 15.61, 17.62, '#2dd4bf'],
  ['MNAR, complete cases', 15.38, 14.51, 16.24, '#f472b6'],
  ['MNAR, multiple imputation', 15.93, 15.08, 16.79, '#f472b6'],
]

export const missing: Scene = {
  id: 'rs-missing',
  title: 'Missing-data mechanisms and imputation uncertainty',
  flow: 'TB',
  nodes: [
    {
      id: 'intervals',
      kind: 'plot',
      label: 'Mean processing time with 95% intervals: one simulated month, seven analyses',
      sub: 'pink: the method assumes less than the mechanism needs; the dashed line is the true mean 16.65',
      plot: {
        x: { min: 13, max: 19.5, step: 0.5, label: 'estimated mean time (minutes)' },
        y: { min: 0.3, max: 7.7, step: 1, label: 'analysis' },
        series: [
          ...ROWS.flatMap(([name, m, lo, hi, color], i) => [
            { kind: 'segment' as const, from: [lo, 7 - i] as PlotPoint, to: [hi, 7 - i] as PlotPoint, dashed: false, size: 3, color, label: name, labelAt: [hi + 0.1, 7 - i] as PlotPoint },
            { kind: 'scatter' as const, points: [[m, 7 - i]] as PlotPoint[], size: 6, color },
          ]),
          { kind: 'segment', from: [TRUE, 0.3], to: [TRUE, 7.7], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'coverage',
      kind: 'table',
      label: 'Over 1000 simulated months: average estimate and interval coverage',
      sub: 'Monte Carlo, seed 43; nominal coverage 95%, true mean 16.65',
      headers: ['mechanism', 'complete cases', 'single imputation', 'multiple imputation'],
      values: [
        ['MCAR (30% missing)', '16.65, covers 95%', '—', '—'],
        ['MAR on job size (30%)', '15.17, covers 13%', '16.32, covers 75%', '16.69, covers 96%'],
        ['MNAR on time (24%)', '14.98, covers 4%', '—', '15.74, covers 46%'],
      ],
    },
  ],
  edges: [],
}
