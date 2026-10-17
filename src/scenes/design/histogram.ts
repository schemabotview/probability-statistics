import type { Scene } from '@graphlearning/flow'
import { bars, histogram, mean, quantile, sd } from '../plot-kit'
import { TIMES } from '../workshop'

// §1.6 — 40 processing times (numpy seed 3), right-skewed with one 63.2-minute job (a jammed feed).
// Summaries computed here, matching numpy (percentile, linear): mean 14.07, median 10.75, SD 10.38,
// IQR 6.63 (6.625); without the jam mean 12.81, median 10.70, SD 6.73, IQR 6.60.
const EDGES = Array.from({ length: 14 }, (_, i) => 5 * i)
const COUNTS = histogram(TIMES, EDGES)
const rest = TIMES.slice(0, -1)
const iqr = (xs: number[]) => quantile(xs, 0.75) - quantile(xs, 0.25)
const f = (v: number) => v.toFixed(2)

export const histogramScene: Scene = {
  id: 'design-histogram',
  title: 'Distributions, location and spread',
  flow: 'TB',
  nodes: [
    {
      id: 'times',
      kind: 'plot',
      label: 'Processing time of 40 jobs, in 5-minute bins',
      sub: 'right-skewed: most jobs take 7–16 minutes, a few take far longer, one 63 minutes',
      plot: {
        x: { min: 0, max: 65, step: 5, label: 'minutes' },
        y: { min: 0, max: 16, step: 2, label: 'jobs' },
        series: [
          ...bars(EDGES, COUNTS).map((points) => ({ kind: 'line' as const, points, color: '#2dd4bf' })),
          { kind: 'segment', from: [quantile(TIMES, 0.5), 0], to: [quantile(TIMES, 0.5), 15.2], dashed: false, label: `median ${f(quantile(TIMES, 0.5))}`, labelAt: [3.2, 15.4], color: '#fbbf24' },
          { kind: 'segment', from: [mean(TIMES), 0], to: [mean(TIMES), 13.2], dashed: false, label: `mean ${f(mean(TIMES))}: pulled right by the tail`, labelAt: [15, 13.4], color: '#f472b6' },
          { kind: 'marker', at: [63.2, 1], label: 'jammed feed, 63.2', labelAt: [50, 2.6], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'summaries',
      kind: 'table',
      label: 'Location and spread, with and without the 63-minute job',
      sub: 'the median and IQR barely move; the mean and SD move a lot',
      headers: ['summary', 'all 40 jobs', 'without the jam', 'resistant?'],
      values: [
        ['mean', f(mean(TIMES)), f(mean(rest)), 'no'],
        ['median', f(quantile(TIMES, 0.5)), f(quantile(rest, 0.5)), 'yes'],
        ['standard deviation', f(sd(TIMES)), f(sd(rest)), 'no'],
        ['interquartile range', f(iqr(TIMES)), f(iqr(rest)), 'yes'],
      ],
    },
  ],
  edges: [],
}
