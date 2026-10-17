import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §8.4 — defectives under setting A, 30 of 400, and B, 18 of 400. Wilson 95% intervals computed here.
// Difference 0.030, Wald CI (−0.003, 0.063); relative risk 1.67, CI (0.94, 2.94) on the log scale; odds
// ratio 1.72, CI (0.94, 3.14); χ² (no continuity correction) 3.19, p = 0.074 (scipy). 1/0.03 = 33 chairs.
const z = 1.959964
const wilson = (x: number, n: number) => {
  const q = x / n
  const d = 1 + (z * z) / n
  const c = (q + (z * z) / (2 * n)) / d
  const h = (z * Math.sqrt((q * (1 - q)) / n + (z * z) / (4 * n * n))) / d
  return [100 * (c - h), 100 * (c + h)]
}
const G = [
  { x: 30, n: 400, at: 1, color: '#2dd4bf', name: 'A' },
  { x: 18, n: 400, at: 2, color: '#f472b6', name: 'B' },
]

export const proportions: Scene = {
  id: 'cmp-proportions',
  title: 'Proportion comparisons and absolute and relative effects',
  flow: 'TB',
  nodes: [
    {
      id: 'rates',
      kind: 'plot',
      label: 'Defect rates under settings A and B, 400 chairs each, with 95% Wilson intervals',
      sub: 'the intervals overlap; the difference itself has its own interval, which just includes 0',
      plot: {
        x: { min: 0.4, max: 2.6, step: 0.5, label: 'setting: 1 = A, 2 = B' },
        y: { min: 0, max: 12, step: 1, label: 'defect rate (%)' },
        series: G.flatMap((g) => {
          const [lo, hi] = wilson(g.x, g.n)
          return [
            { kind: 'segment' as const, from: [g.at, lo] as PlotPoint, to: [g.at, hi] as PlotPoint, dashed: false, size: 9, color: g.color },
            { kind: 'marker' as const, at: [g.at, (100 * g.x) / g.n] as PlotPoint, label: `${g.name}: ${g.x}/${g.n} = ${((100 * g.x) / g.n).toFixed(1)}% (${lo.toFixed(1)} to ${hi.toFixed(1)})`, labelAt: [g.at + 0.06, (100 * g.x) / g.n + 0.3] as PlotPoint, color: g.color },
          ]
        }),
      },
    },
    {
      id: 'effects',
      kind: 'table',
      label: 'One comparison, three effect measures',
      sub: 'say which one you report; they answer different questions',
      headers: ['measure', 'estimate', '95% CI'],
      values: [
        ['difference p_A − p_B', '0.030 (3 points)', '(−0.003, 0.063)'],
        ['relative risk p_A / p_B', '1.67', '(0.94, 2.94)'],
        ['odds ratio', '1.72', '(0.94, 3.14)'],
        ['chairs per extra defect', '1 / 0.03 = 33', '—'],
        ['χ² test of equal rates', 'χ² = 3.19', 'p = 0.074'],
      ],
    },
  ],
  edges: [],
}
