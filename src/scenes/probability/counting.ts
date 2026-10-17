import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { BATCH20 } from '../workshop'

// §2.3 — a batch of 20 chairs with 3 defective; draw n. Without replacement P(no defective) =
// C(17, n)/C(20, n); with replacement 0.85ⁿ. At n = 5: 6188/15504 = 0.3991 vs 0.4437 (exact).
const choose = (n: number, k: number): number => (k < 0 || k > n ? 0 : k === 0 ? 1 : (choose(n, k - 1) * (n - k + 1)) / k)
const good = BATCH20.n - BATCH20.defective
const NS = Array.from({ length: 11 }, (_, n) => n)
const WITHOUT: PlotPoint[] = NS.map((n) => [n, choose(good, n) / choose(BATCH20.n, n)])
const WITH: PlotPoint[] = NS.map((n) => [n, (good / BATCH20.n) ** n])

export const counting: Scene = {
  id: 'prob-counting',
  title: 'Counting with and without replacement',
  flow: 'TB',
  nodes: [
    {
      id: 'draws',
      kind: 'plot',
      label: 'Chance a sample from the batch contains no defective chair',
      sub: 'batch of 20 with 3 defective; draw n chairs, all subsets equally likely',
      plot: {
        x: { min: 0, max: 10, step: 1, label: 'n, chairs drawn' },
        y: { min: 0, max: 1, step: 0.1, label: 'P(no defective in the sample)' },
        series: [
          { kind: 'line', points: WITH, color: '#9ca3af' },
          { kind: 'scatter', points: WITH, label: 'with replacement: 0.85ⁿ', labelAt: [6.2, 0.42], color: '#9ca3af' },
          { kind: 'line', points: WITHOUT, color: '#2dd4bf' },
          { kind: 'scatter', points: WITHOUT, label: 'without: C(17, n) / C(20, n)', labelAt: [2.1, 0.25], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'rules',
      kind: 'table',
      label: 'Counting samples of 5 from the batch of 20',
      sub: 'equal likelihood is an assumption about how the sample is drawn',
      headers: ['count', 'formula', 'value'],
      values: [
        ['ordered, with replacement', '20⁵', '3 200 000'],
        ['ordered, without replacement', '20 × 19 × 18 × 17 × 16', '1 860 480'],
        ['unordered, without replacement', 'C(20, 5)', '15 504'],
        ['… containing no defective', 'C(17, 5)', '6 188'],
        ['P(no defective)', '6188 / 15 504', '0.399 (vs 0.444 with replacement)'],
      ],
    },
  ],
  edges: [],
}
