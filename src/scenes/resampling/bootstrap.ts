import type { Scene } from '@graphlearning/flow'
import { bars } from '../plot-kit'

// §12.2 — mean defect rate of the 120 batches in BATCH_RATES (10 days × 12 batches): 6.663%. Bootstrap,
// numpy seed 40, 5000 resamples each. Rows resampled as if independent: SE 0.199, 95% percentile (6.28, 7.06).
// Days resampled whole (the sampling unit): SE 0.620, (5.46, 7.89). Failure case: the bootstrap maximum of
// the 40 TIMES equals the observed 63.2 in 64% of resamples (theory 1 − (39/40)⁴⁰ = 0.637); bootstrap
// median SE 0.92, percentile (10.25, 14.10). Histograms below are those resamples, bins of 0.1.
const EDGES = Array.from({ length: 46 }, (_, i) => 4.5 + i * 0.1)
const ROW = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 14, 32, 110, 294, 587, 798, 1022, 899, 629, 366, 177, 55, 10, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const DAY = [0, 0, 3, 6, 5, 11, 15, 22, 36, 56, 58, 90, 104, 129, 166, 176, 218, 243, 283, 320, 323, 323, 284, 283, 334, 269, 237, 219, 154, 156, 126, 104, 73, 58, 38, 33, 11, 16, 9, 4, 4, 1, 0, 0, 0]
const dens = (c: number[]) => c.map((k) => k / (5000 * 0.1))

export const bootstrap: Scene = {
  id: 'rs-bootstrap',
  title: 'Bootstrap units, interval families and failure cases',
  flow: 'TB',
  nodes: [
    {
      id: 'units',
      kind: 'plot',
      label: 'Bootstrap distribution of the mean defect rate, under two resampling schemes',
      sub: 'batches from one day are alike, so resampling batches pretends there are 120 independent units, not 10',
      plot: {
        x: { min: 4.5, max: 9, step: 0.5, label: 'bootstrap mean defect rate (%)' },
        y: { min: 0, max: 2.2, step: 0.2, label: 'density' },
        series: [
          ...bars(EDGES, dens(DAY)).map((points, i) => ({ kind: 'line' as const, points, color: '#2dd4bf', ...(i === 33 ? { label: 'resample days: SE 0.62', labelAt: [7.6, 0.9] as [number, number] } : {}) })),
          ...bars(EDGES, dens(ROW)).map((points, i) => ({ kind: 'line' as const, points, color: '#f472b6', ...(i === 22 ? { label: 'resample batches: SE 0.20', labelAt: [7.15, 1.9] as [number, number] } : {}) })),
          { kind: 'segment', from: [6.663, 0], to: [6.663, 2.15], label: 'observed 6.66', labelAt: [5.2, 2.05], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'schemes',
      kind: 'table',
      label: 'Resample what was sampled; and know when the bootstrap fails',
      sub: '5000 resamples each (Monte Carlo, seed 40); percentile intervals',
      headers: ['statistic and scheme', 'bootstrap SE', '95% percentile interval'],
      values: [
        ['mean rate, resample batches', '0.199', '(6.28, 7.06), too narrow'],
        ['mean rate, resample days', '0.620', '(5.46, 7.89)'],
        ['median time, resample jobs', '0.92', '(10.25, 14.10)'],
        ['maximum time, resample jobs', '—', 'fails: 64% of resamples = 63.2'],
      ],
    },
  ],
  edges: [],
}
