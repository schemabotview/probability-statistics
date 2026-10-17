import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { mean } from '../plot-kit'

// §8.7 — processing times under 4 machine settings, 12 jobs each (numpy seed 36). One-way ANOVA:
// SS_between 67.97 (df 3), SS_within 91.07 (df 44), F = 10.95, p = 1.7 × 10⁻⁵ (scipy f_oneway).
// Bonferroni-adjusted 95% intervals for all 6 pairs (t₀.₉₉₅₈,₄₄ = 2.763, SE 0.587): only pairs involving
// setting 3 exclude 0. Contrast 3 − mean(1, 2, 4) = 2.74, 95% CI (1.77, 3.70).
const G = [
  [10.0, 11.5, 11.5, 11.6, 14.0, 12.2, 12.6, 12.0, 10.4, 12.3, 13.3, 12.2],
  [11.5, 10.3, 15.4, 11.1, 11.1, 10.1, 13.1, 12.7, 11.1, 12.2, 12.9, 11.8],
  [12.7, 14.0, 14.9, 12.7, 13.4, 15.6, 16.4, 15.9, 15.0, 16.6, 13.7, 14.3],
  [11.6, 13.5, 10.6, 11.2, 14.8, 11.1, 8.7, 13.3, 13.7, 10.4, 10.4, 10.9],
]
const COLORS = ['#2dd4bf', '#a78bfa', '#f472b6', '#fbbf24']
const dots = (g: number[], k: number): PlotPoint[] => g.map((v, i) => [k + 1 - 0.2 + (0.4 * i) / (g.length - 1), v])

export const anova: Scene = {
  id: 'cmp-anova',
  title: 'ANOVA, omnibus hypotheses, contrasts and multiplicity',
  flow: 'TB',
  nodes: [
    {
      id: 'settings',
      kind: 'plot',
      label: 'Processing times under four machine settings, 12 jobs each',
      sub: 'ANOVA asks whether all four means are equal; it does not say which differ',
      plot: {
        x: { min: 0.5, max: 4.5, step: 1, label: 'machine setting' },
        y: { min: 8, max: 17.5, step: 1, label: 'minutes' },
        series: G.flatMap((g, k) => [
          { kind: 'scatter' as const, points: dots(g, k), color: COLORS[k] },
          { kind: 'segment' as const, from: [k + 0.7, mean(g)] as PlotPoint, to: [k + 1.3, mean(g)] as PlotPoint, dashed: false, label: `mean ${mean(g).toFixed(2)}`, labelAt: [k + 0.72, k === 2 ? 17.1 : 8.4] as PlotPoint, color: COLORS[k] },
        ]),
      },
    },
    {
      id: 'table',
      kind: 'table',
      label: 'One omnibus test, then targeted comparisons',
      sub: 'F = between-group mean square / within-group mean square',
      headers: ['comparison', 'estimate', 'interval', 'conclusion'],
      values: [
        ['all means equal?', 'F = 10.95 (3, 44 df)', 'p = 0.00002', 'not all equal'],
        ['setting 3 − 1', '2.63', '(1.01, 4.26), Bonferroni', 'differ'],
        ['setting 2 − 1', '−0.02', '(−1.65, 1.60), Bonferroni', 'no evidence'],
        ['setting 4 − 1', '−0.28', '(−1.91, 1.34), Bonferroni', 'no evidence'],
        ['contrast 3 − mean(1, 2, 4)', '2.74', '(1.77, 3.70), planned', 'setting 3 is slower'],
      ],
    },
  ],
  edges: [],
}
