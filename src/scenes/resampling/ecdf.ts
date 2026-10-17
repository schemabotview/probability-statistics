import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { mean, quantile } from '../plot-kit'
import { TIMES } from '../workshop'

// §12.1 — empirical CDF of the 40 processing times (chapter 1). Plug-in estimates computed here: mean 14.07,
// median 10.75, quartiles 9.23 / 15.85 (numpy linear), P(T > 20) = 4/40 = 0.10. The 95% DKW band is
// F̂ ± √(ln(2/0.05) / 2n) = ± 0.215 for n = 40, clipped to [0, 1]; it holds for the whole curve at once.
const n = TIMES.length
const EPS = Math.sqrt(Math.log(2 / 0.05) / (2 * n))
const steps = (shift: number): PlotPoint[] => {
  const clip = (v: number) => Math.min(1, Math.max(0, v + shift))
  const pts: PlotPoint[] = [[0, clip(0)]]
  TIMES.forEach((t, i) => pts.push([t, clip(i / n)], [t, clip((i + 1) / n)]))
  pts.push([70, clip(1)])
  return pts
}

export const ecdf: Scene = {
  id: 'rs-ecdf',
  title: 'Empirical distributions and nonparametric estimation',
  flow: 'TB',
  nodes: [
    {
      id: 'curve',
      kind: 'plot',
      label: 'The empirical CDF of 40 processing times: a step of 1/40 at each observation',
      sub: 'no model assumed; the band covers the true CDF everywhere at once with probability 0.95',
      plot: {
        x: { min: 0, max: 70, step: 5, label: 'processing time (minutes)' },
        y: { min: 0, max: 1.05, step: 0.1, label: 'proportion of jobs ≤ t' },
        series: [
          { kind: 'line', points: steps(EPS), color: '#4b5563' },
          { kind: 'line', points: steps(-EPS), label: '95% DKW band: ± 0.215', labelAt: [35, 0.72], color: '#4b5563' },
          { kind: 'line', points: steps(0), label: 'empirical CDF F̂(t)', labelAt: [35, 0.9], color: '#2dd4bf' },
          { kind: 'segment', from: [10.75, 0], to: [10.75, 0.5], label: 'median 10.75', labelAt: [12, 0.3], color: '#fbbf24' },
          { kind: 'segment', from: [0, 0.5], to: [10.75, 0.5], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'plugin',
      kind: 'table',
      label: 'Plug-in estimates: compute the quantity on F̂ as if it were the population',
      sub: 'each is a functional of the empirical distribution',
      headers: ['quantity', 'plug-in estimate', 'read from F̂'],
      values: [
        ['mean', mean(TIMES).toFixed(2), 'average of the steps'],
        ['median', quantile(TIMES, 0.5).toFixed(2), 'where F̂ crosses 0.5'],
        ['quartiles', `${quantile(TIMES, 0.25).toFixed(2)} / ${quantile(TIMES, 0.75).toFixed(2)}`, 'crossings of 0.25 and 0.75'],
        ['P(T > 20 minutes)', (TIMES.filter((t) => t > 20).length / n).toFixed(2), '1 − F̂(20)'],
      ],
    },
  ],
  edges: [],
}
