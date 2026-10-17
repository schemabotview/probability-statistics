import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { QUARTER, SAMPLE_DEFECTS, SAMPLE_SIZE } from '../workshop'

// §5.2 — the exact sampling distribution of p̂ = X/120 with X ~ Binomial(120, 0.07) (exact pmf), its mean
// p and SE √(p(1 − p)/n) = 0.0233, with chapter 1's 20 sample proportions on top. SE for n = 30 / 120 / 480:
// 0.0466 / 0.0233 / 0.0116; the 20 observed p̂ have SD 0.0179. Mean of n processing times: SE = σ/√n = 7.25/√40 = 1.15.
const p = QUARTER.defective / QUARTER.N
const n = SAMPLE_SIZE
const choose = (a: number, b: number): number => (b === 0 ? 1 : (choose(a, b - 1) * (a - b + 1)) / b)
const PMF: PlotPoint[] = Array.from({ length: 21 }, (_, k): PlotPoint => [k / n, choose(n, k) * p ** k * (1 - p) ** (n - k)])
const seP = (m: number) => Math.sqrt((p * (1 - p)) / m)
const phats = SAMPLE_DEFECTS.map((d) => d / n)
const pm = phats.reduce((a, b) => a + b, 0) / phats.length
const obsSd = Math.sqrt(phats.reduce((a, v) => a + (v - pm) ** 2, 0) / (phats.length - 1))
const count = new Map<number, number>()
const DOTS: PlotPoint[] = SAMPLE_DEFECTS.map((d) => {
  const c = (count.get(d) ?? 0) + 1
  count.set(d, c)
  return [d / n, -0.008 * c]
})

export const seScene: Scene = {
  id: 'samp-se',
  title: 'Sampling distributions and standard errors',
  flow: 'TB',
  nodes: [
    {
      id: 'phat',
      kind: 'plot',
      label: 'Sampling distribution of p̂ for samples of 120 chairs, p = 0.07',
      sub: 'stems: exact probabilities; dots below: chapter 1’s twenty actual samples',
      plot: {
        x: { min: 0, max: 0.17, step: 0.01, label: 'p̂ = defectives / 120' },
        y: { min: -0.045, max: 0.17, step: 0.02, label: 'probability' },
        series: [
          ...PMF.map((pt) => ({ kind: 'segment' as const, from: [pt[0], 0] as PlotPoint, to: pt, dashed: false, color: '#2dd4bf' })),
          { kind: 'segment', from: [p - seP(n), 0.16], to: [p + seP(n), 0.16], dashed: false, label: 'p ± 1 SE: 0.07 ± 0.023', labelAt: [p + seP(n) + 0.004, 0.157], color: '#fbbf24' },
          { kind: 'scatter', points: DOTS, label: '20 observed samples', labelAt: [0.105, -0.022], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'errors',
      kind: 'table',
      label: 'Standard error: the SD of a statistic over repeated samples',
      sub: 'it shrinks like 1/√n: four times the sample halves the SE',
      headers: ['statistic', 'sample size', 'SE'],
      values: [
        ['p̂', '30', seP(30).toFixed(4)],
        ['p̂', '120', seP(120).toFixed(4)],
        ['p̂', '480', seP(480).toFixed(4)],
        ['mean processing time', '40', '7.25 / √40 = 1.15 min'],
        ['p̂, 20 samples of 120', 'observed SD', obsSd.toFixed(4)],
      ],
    },
  ],
  edges: [],
}
