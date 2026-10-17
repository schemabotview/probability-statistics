import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { sample } from '../plot-kit'
import { TIME_MODEL } from '../workshop'

// §2.8 — processing time T modelled as lognormal (median 12, log-sd 0.5). P(12 − h < T < 12 + h) from
// scipy.stats.lognorm: h = 1: 0.13267; 0.1: 0.013298; 0.01: 0.0013298; 0.001: 0.00013298. Divided by 2h
// it tends to the density f(12) = 0.06649. P(T = 12) = 0, yet 12 is a possible value.
const f = (t: number) => Math.exp(-((Math.log(t / TIME_MODEL.median) ** 2) / (2 * TIME_MODEL.sigma ** 2))) / (t * TIME_MODEL.sigma * Math.sqrt(2 * Math.PI))
const band: PlotPoint[] = [[11, 0], ...sample(11, 13, 20, f), [13, 0], [11, 0]]

export const zero: Scene = {
  id: 'prob-zero',
  title: 'Probability zero and conditioning boundaries',
  flow: 'TB',
  nodes: [
    {
      id: 'density',
      kind: 'plot',
      label: 'A continuous model for processing time: probability lives in intervals',
      sub: 'shaded: P(11 < T < 13) = 0.133; shrink the interval to one point and the probability goes to 0',
      plot: {
        x: { min: 0, max: 40, step: 5, label: 'processing time T (minutes)' },
        y: { min: 0, max: 0.09, step: 0.01, label: 'density' },
        series: [
          { kind: 'area', points: band, color: '#2dd4bf' },
          { kind: 'line', points: band, color: '#2dd4bf' },
          { kind: 'line', points: sample(0.5, 40, 200, f), label: 'lognormal density, median 12', labelAt: [17, 0.05], color: '#fbbf24' },
          { kind: 'marker', at: [12, f(12)], label: 'f(12) = 0.0665 per minute: a rate, not a probability', labelAt: [13.2, 0.071], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'shrink',
      kind: 'table',
      label: 'P(12 − h < T < 12 + h) as the interval shrinks',
      sub: 'scipy.stats.lognorm; the ratio to the width 2h settles at the density',
      headers: ['h (minutes)', 'probability', 'probability / 2h'],
      values: [
        ['1', '0.1327', '0.06633'],
        ['0.1', '0.01330', '0.06649'],
        ['0.01', '0.001330', '0.06649'],
        ['0', '0: P(T = 12) = 0', 'undefined'],
      ],
    },
  ],
  edges: [],
}
