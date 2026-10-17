import type { Scene } from '@graphlearning/flow'
import { bars, histogram, sample } from '../plot-kit'
import { TIMES } from '../workshop'
import { gammaPdf } from '../random-variables/dist'

// §6.3 — gamma model for the 40 processing times. Method of moments: x̄ = 14.07, s² = 107.7, so
// shape = x̄²/s² = 1.84, scale = s²/x̄ = 7.65. Maximum likelihood (scipy.stats.gamma.fit, loc = 0): shape
// 2.94, scale 4.78. Log-likelihoods −138.15 (moments) and −136.00 (ML).
const EDGES = Array.from({ length: 14 }, (_, i) => 5 * i)
const DENS = histogram(TIMES, EDGES).map((c) => c / (TIMES.length * 5))

export const moments: Scene = {
  id: 'est-moments',
  title: 'Sample moments and the method of moments',
  flow: 'TB',
  nodes: [
    {
      id: 'fits',
      kind: 'plot',
      label: 'A gamma model for processing times, fitted two ways',
      sub: 'moments: match the sample mean and variance; maximum likelihood: make the data most probable',
      plot: {
        x: { min: 0, max: 65, step: 5, label: 'minutes' },
        y: { min: 0, max: 0.08, step: 0.01, label: 'density' },
        series: [
          ...bars(EDGES, DENS).map((points) => ({ kind: 'line' as const, points, color: '#4b5563' })),
          { kind: 'line', points: sample(0.2, 65, 200, gammaPdf(1.839, 7.651)), label: 'method of moments: shape 1.84', labelAt: [20, 0.045], color: '#f472b6' },
          { kind: 'line', points: sample(0.2, 65, 200, gammaPdf(2.943, 4.781)), label: 'maximum likelihood: shape 2.94', labelAt: [20, 0.055], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'match',
      kind: 'table',
      label: 'Method of moments: set model moments equal to sample moments, solve',
      sub: 'gamma: mean = shape × scale, variance = shape × scale²',
      headers: ['step', 'moments', 'maximum likelihood'],
      values: [
        ['mean', 'x̄ = 14.07', '14.07 (also matched)'],
        ['variance', 's² = 107.7', 'shape × scale² = 67.3'],
        ['shape, scale', '1.84, 7.65', '2.94, 4.78'],
        ['log-likelihood', '−138.15', '−136.00'],
        ['sensitivity', 's² swollen by the 63-minute job', 'less affected'],
      ],
    },
  ],
  edges: [],
}
