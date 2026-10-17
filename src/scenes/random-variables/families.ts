import type { Scene } from '@graphlearning/flow'
import { bars, histogram, sample } from '../plot-kit'
import { TIMES } from '../workshop'
import { lognormPdf, normalPdf } from './dist'

// §3.6 — the 40 processing times as a density histogram (5-minute bins), with two fitted models.
// Normal: mean 14.07, sd 10.38, puts P(T < 0) = 0.088 on impossible negative times. Lognormal by maximum
// likelihood: median e^2.465 = 11.76, log-sd 0.581. Log-likelihoods −149.8 (normal) vs −133.6 (lognormal).
// P(T > 40): data 1/40 = 0.025, lognormal 0.018, normal 0.006. scipy.stats.
const EDGES = Array.from({ length: 14 }, (_, i) => 5 * i)
const DENS = histogram(TIMES, EDGES).map((c) => c / (TIMES.length * 5))
const nf = normalPdf(14.07, 10.38)
const lf = lognormPdf(11.76, 0.581)

export const families: Scene = {
  id: 'rv-families',
  title: 'Positive, bounded and skewed families',
  flow: 'TB',
  nodes: [
    {
      id: 'fits',
      kind: 'plot',
      label: 'Processing times with two fitted models',
      sub: 'the normal curve spills below zero and is too thin in the right tail; the lognormal respects T > 0',
      plot: {
        x: { min: -15, max: 65, step: 5, label: 'minutes' },
        y: { min: 0, max: 0.08, step: 0.01, label: 'density' },
        series: [
          ...bars(EDGES, DENS).map((points) => ({ kind: 'line' as const, points, color: '#4b5563' })),
          { kind: 'line', points: sample(-15, 65, 200, nf), label: 'normal fit: 8.8% below 0', labelAt: [-14, 0.03], color: '#f472b6' },
          { kind: 'line', points: sample(0.3, 65, 200, lf), label: 'lognormal fit', labelAt: [15.5, 0.062], color: '#2dd4bf' },
          { kind: 'segment', from: [0, 0], to: [0, 0.08], label: 'impossible below 0', labelAt: [0.8, 0.075], color: '#9ca3af' },
        ],
      },
    },
    {
      id: 'choose',
      kind: 'table',
      label: 'Match the family’s support and shape to the quantity',
      sub: 'then check the fit where the decision is made, often in a tail',
      headers: ['family', 'support', 'shape', 'workshop quantity'],
      values: [
        ['normal', 'all real numbers', 'symmetric', 'seat height'],
        ['lognormal, gamma', 'positive', 'right-skewed', 'processing time'],
        ['exponential', 'positive', 'mode at 0, memoryless', 'time between stoppages'],
        ['beta', 'between 0 and 1', 'flexible', 'a proportion'],
        ['P(T > 40)', 'data 0.025', 'lognormal 0.018', 'normal 0.006'],
      ],
    },
  ],
  edges: [],
}
