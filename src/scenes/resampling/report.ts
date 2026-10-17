import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { WEEKLY_DEFECTS, WEEKLY_N } from '../workshop'

// §12.8 — the integrated report for setting B vs A (chapter 8 data and this chapter's analyses), and the weekly
// defect rate from chapter 1: weeks 1–6 206 / 3000 = 6.87%, weeks 7–12 316 / 3000 = 10.53%; difference 3.67
// points, Wald 95% (2.24, 5.09). Computed here and checked in numpy.
const W: PlotPoint[] = WEEKLY_DEFECTS.map((d, i) => [i + 1, (100 * d) / WEEKLY_N])
const rate = (a: number, b: number) => (100 * WEEKLY_DEFECTS.slice(a, b).reduce((s, v) => s + v, 0)) / (WEEKLY_N * (b - a))
const PRE = rate(0, 6)
const POST = rate(6, 12)

export const report: Scene = {
  id: 'rs-report',
  title: 'Integrated evidence, unresolved bias and population change',
  flow: 'TB',
  nodes: [
    {
      id: 'weeks',
      kind: 'plot',
      label: 'Weekly defect rate: the population the study sampled may no longer exist',
      sub: 'the timber supplier changed in week 7; jobs studied before it need not describe jobs after it',
      plot: {
        x: { min: 0.5, max: 12.5, step: 1, label: 'week' },
        y: { min: 4, max: 13, step: 1, label: 'defect rate (%)' },
        series: [
          { kind: 'line', points: W, color: '#4b5563' },
          { kind: 'scatter', points: W, size: 6, color: '#2dd4bf' },
          { kind: 'segment', from: [0.7, PRE], to: [6.3, PRE], dashed: false, label: `weeks 1–6: ${PRE.toFixed(2)}%`, labelAt: [1, PRE - 0.6], color: '#fbbf24' },
          { kind: 'segment', from: [6.7, POST], to: [12.3, POST], dashed: false, label: `weeks 7–12: ${POST.toFixed(2)}%`, labelAt: [7.2, POST + 1.6], color: '#f472b6' },
          { kind: 'marker', at: [3.5, 11.6], size: 0, label: 'step: +3.67 points, 95% CI (2.24, 5.09)', labelAt: [1, 12.3], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'summary',
      kind: 'table',
      label: 'Report: setting B against setting A',
      sub: 'effect, uncertainty, assumptions, and what remains unresolved',
      headers: ['part', 'what the evidence supports'],
      values: [
        ['effect', 'B is 3.4 minutes faster on average'],
        ['interval', 'bootstrap (1.7, 5.1); Welch agrees'],
        ['robustness', 'six analyses, all p < 0.005'],
        ['assumptions', 'jobs independent; B far more variable'],
        ['unresolved bias', 'how jobs reached each setting is unrecorded'],
        ['population', 'unclear whether it holds after week 7'],
      ],
    },
  ],
  edges: [],
}
