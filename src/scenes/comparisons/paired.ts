import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §8.1 — glue drying time (minutes) on 12 boards, each glued with the old glue and with the new one (numpy
// seed 30: board effect SD 3, true change −1.0, noise SD 0.8). Boards differ far more than glues do
// (corr(old, new) = 0.96). Paired t on the 12 differences: mean −1.66, SE 0.25, t = −6.59, p = 0.00004.
// Treating them as 24 independent boards (Welch): SE 1.26, t = −1.31, p = 0.20. scipy.stats.
export const OLD = [25.1, 22.3, 17.6, 19.6, 20.1, 28.5, 17.1, 24.0, 20.7, 21.7, 20.2, 20.8]
export const NEW = [23.1, 20.0, 15.9, 18.8, 17.7, 25.4, 15.7, 23.0, 18.4, 21.6, 18.1, 20.1]

export const paired: Scene = {
  id: 'cmp-paired',
  title: 'Independent versus paired experimental units',
  flow: 'TB',
  nodes: [
    {
      id: 'boards',
      kind: 'plot',
      label: 'Each board glued twice: old glue (left) and new glue (right)',
      sub: 'boards differ by up to 11 minutes; within every board the new glue is faster',
      plot: {
        x: { min: -0.3, max: 1.3, step: 0.1, label: 'glue: 0 = old, 1 = new' },
        y: { min: 14, max: 30, step: 2, label: 'drying time (minutes)' },
        series: [
          ...OLD.map((o, i) => ({ kind: 'line' as const, points: [[0, o], [1, NEW[i]]] as PlotPoint[], color: '#2dd4bf' })),
          { kind: 'scatter', points: OLD.map((o): PlotPoint => [0, o]), label: 'old glue', labelAt: [-0.28, 29.2], color: '#9ca3af' },
          { kind: 'scatter', points: NEW.map((v): PlotPoint => [1, v]), label: 'new glue', labelAt: [1.02, 29.2], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'analyses',
      kind: 'table',
      label: 'The same 24 numbers, analysed as pairs and as independent groups',
      sub: 'pairing removes the board-to-board variation from the comparison',
      headers: ['analysis', 'SE of the difference', 't', 'p'],
      values: [
        ['paired: 12 board differences', '0.25', '−6.59', '0.00004'],
        ['as if 24 separate boards (Welch)', '1.26', '−1.31', '0.20'],
        ['estimate (both)', '−1.66 min', '—', '—'],
        ['which is right?', 'the design was paired', '—', 'paired'],
      ],
    },
  ],
  edges: [],
}
