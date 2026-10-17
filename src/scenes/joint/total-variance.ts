import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { mean } from '../plot-kit'
import { BATCH_RATES } from '../workshop'

// §4.7 — law of total variance on the 120 batch rates, grouped by day, computed here with population
// (1/n) variances so the identity is exact: total 4.718 = mean within-day variance 0.937 + variance of day
// means 3.781 (numpy agrees). The model behind the data has 1 and 4.
const pvar = (xs: number[]) => {
  const m = mean(xs)
  return mean(xs.map((x) => (x - m) ** 2))
}
const ALL = BATCH_RATES.flat()
const within = mean(BATCH_RATES.map(pvar))
const between = pvar(BATCH_RATES.map(mean))
const PTS: PlotPoint[] = BATCH_RATES.flatMap((r, d) => r.map((v): PlotPoint => [d + 1, v]))
const MEANS: PlotPoint[] = BATCH_RATES.map((r, d) => [d + 1, mean(r)])

export const totalVariance: Scene = {
  id: 'joint-total-variance',
  title: 'Total expectation and total variance',
  flow: 'TB',
  nodes: [
    {
      id: 'days',
      kind: 'plot',
      label: 'Batch defect rates by day, with each day’s mean',
      sub: 'spread splits into spread within a day and spread between day means',
      plot: {
        x: { min: 0.4, max: 10.6, step: 1, label: 'day' },
        y: { min: 1.5, max: 12, step: 1, label: 'batch defect rate (%)' },
        series: [
          { kind: 'line', points: [[0.4, mean(ALL)], [10.6, mean(ALL)]], label: `overall mean ${mean(ALL).toFixed(2)} = mean of day means`, labelAt: [0.6, 11.4], color: '#9ca3af' },
          { kind: 'scatter', points: PTS, label: 'batches', labelAt: [8.6, 2.1], color: '#2dd4bf' },
          { kind: 'scatter', points: MEANS, size: 8, label: 'day mean E[Y | day]', labelAt: [5.5, 11.4], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'decompose',
      kind: 'table',
      label: 'Var(Y) = E[Var(Y | day)] + Var(E[Y | day])',
      sub: 'and E[Y] = E[E[Y | day]]: average the day means',
      headers: ['part', 'computed from the 120 batches', 'share'],
      values: [
        ['within days: E[Var(Y | day)]', within.toFixed(3), `${((100 * within) / pvar(ALL)).toFixed(0)}%`],
        ['between days: Var(E[Y | day])', between.toFixed(3), `${((100 * between) / pvar(ALL)).toFixed(0)}%`],
        ['total Var(Y)', pvar(ALL).toFixed(3), '100%'],
        ['the model that made them', '1 + 4 = 5', '20% / 80%'],
      ],
    },
  ],
  edges: [],
}
