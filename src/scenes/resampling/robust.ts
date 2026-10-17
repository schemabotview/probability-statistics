import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { mean, quantile } from '../plot-kit'
import { TIMES } from '../workshop'

// §12.5 — the 40 TIMES with the largest value (63.2) replaced by v, for v from 0 to 300: mean, median,
// 10% trimmed mean (4 dropped each end) and Huber M-estimate (c = 1.345, scale = normalised MAD, iterated
// reweighting), all computed here. At v = 63.2: 14.07 / 10.75 / 12.28 / 12.16 (matches scipy.stats.trim_mean
// and a numpy Huber loop). Breakdown: replacing k of the 40 values by 500 minutes, computed here too.
const median = (x: number[]) => quantile(x, 0.5)
const trim = (x: number[]) => mean([...x].sort((a, b) => a - b).slice(4, x.length - 4))
const huber = (x: number[]) => {
  const med = median(x)
  const s = 1.4826 * median(x.map((v) => Math.abs(v - med)))
  let mu = med
  for (let it = 0; it < 100; it++) {
    const w = x.map((v) => Math.min(1, 1.345 / Math.max(Math.abs((v - mu) / s), 1e-12)))
    mu = x.reduce((a, v, i) => a + w[i] * v, 0) / w.reduce((a, b) => a + b, 0)
  }
  return mu
}
const swap = (v: number) => [...TIMES.slice(0, -1), v]
const curve = (f: (x: number[]) => number): PlotPoint[] => Array.from({ length: 151 }, (_, i) => [i * 2, f(swap(i * 2))])
const contam = (k: number) => [...TIMES.slice(0, TIMES.length - k), ...Array(k).fill(500)]
const EST: [string, (x: number[]) => number][] = [['mean', mean], ['10% trimmed mean', trim], ['Huber M-estimate', huber], ['median', median]]

export const robust: Scene = {
  id: 'rs-robust',
  title: 'Robust estimation and contamination sensitivity',
  flow: 'TB',
  nodes: [
    {
      id: 'sensitivity',
      kind: 'plot',
      label: 'Move one processing time from 0 to 300 minutes: how far does each estimate follow?',
      sub: 'the mean follows without limit; the others stop moving once the value is far enough out',
      plot: {
        x: { min: 0, max: 300, step: 25, label: 'value of the largest job (observed: 63.2)' },
        y: { min: 9, max: 22, step: 1, label: 'estimate of the centre (minutes)' },
        series: [
          { kind: 'line', points: curve(mean), label: 'mean', labelAt: [240, 20.3], color: '#f472b6' },
          { kind: 'line', points: curve(trim), label: '10% trimmed mean', labelAt: [210, 12.7], color: '#a78bfa' },
          { kind: 'line', points: curve(huber), label: 'Huber M-estimate', labelAt: [210, 11.6], color: '#2dd4bf' },
          { kind: 'line', points: curve(median), label: 'median', labelAt: [210, 10.2], color: '#fbbf24' },
          { kind: 'segment', from: [63.2, 9], to: [63.2, 21], label: 'observed', labelAt: [66, 21.3] },
        ],
      },
    },
    {
      id: 'breakdown',
      kind: 'table',
      label: 'Contamination: replace the k largest of 40 times by 500 minutes',
      sub: 'breakdown point: the fraction of bad values an estimator can absorb',
      headers: ['estimator', 'as observed', 'k = 1', 'k = 4', 'k = 8', 'breakdown'],
      values: EST.map(([name, f], i) => [name, f(TIMES).toFixed(2), f(contam(1)).toFixed(2), f(contam(4)).toFixed(2), f(contam(8)).toFixed(2), ['0', '10%', '≈ 50%', '50%'][i]]),
    },
  ],
  edges: [],
}
