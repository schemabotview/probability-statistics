import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §7.5 — 120 chairs from the new supplier, 14 defective. H₀: p = 0.07, H₁: p > 0.07. Under H₀,
// X ~ Binomial(120, 0.07), mean 8.4. One-sided exact p-value P(X ≥ 14) = 0.0414 (scipy binom.sf);
// normal-approximation z = (14/120 − 0.07)/√(0.07 × 0.93/120) = 2.00.
const n = 120
const p0 = 0.07
const choose = (a: number, b: number): number => (b === 0 ? 1 : (choose(a, b - 1) * (a - b + 1)) / b)
const pmf = (k: number) => choose(n, k) * p0 ** k * (1 - p0) ** (n - k)
const K = Array.from({ length: 23 }, (_, k) => k)
const pval = K.filter((k) => k >= 14).reduce((s, k) => s + pmf(k), 0) + Array.from({ length: n - 22 }, (_, i) => pmf(23 + i)).reduce((a, b) => a + b, 0)

export const nullDist: Scene = {
  id: 'inf-null',
  title: 'Hypotheses, test statistics and null distributions',
  flow: 'TB',
  nodes: [
    {
      id: 'reference',
      kind: 'plot',
      label: 'If the new supplier is no worse (p = 0.07), how surprising are 14 defectives in 120?',
      sub: `stems: the null distribution of X; pink: outcomes at least as extreme as 14, total ${pval.toFixed(4)}`,
      plot: {
        x: { min: -0.5, max: 22.5, step: 2, label: 'X, defective chairs among 120' },
        y: { min: 0, max: 0.15, step: 0.02, label: 'probability under H₀' },
        series: [
          ...K.map((k) => ({ kind: 'segment' as const, from: [k, 0] as PlotPoint, to: [k, pmf(k)] as PlotPoint, dashed: false, color: k >= 14 ? '#f472b6' : '#2dd4bf' })),
          { kind: 'segment', from: [14, 0], to: [14, 0.1], label: 'observed: 14', labelAt: [14.3, 0.1], color: '#fbbf24' },
          { kind: 'segment', from: [8.4, 0], to: [8.4, 0.145], label: 'expected under H₀: 8.4', labelAt: [8.7, 0.143], color: '#9ca3af' },
        ],
      },
    },
    {
      id: 'parts',
      kind: 'table',
      label: 'The parts of a test',
      sub: 'a p-value is computed assuming H₀ is true',
      headers: ['part', 'here'],
      values: [
        ['null hypothesis H₀', 'p = 0.07: the new supplier is no worse'],
        ['alternative H₁', 'p > 0.07 (one-sided, chosen before seeing data)'],
        ['test statistic', 'X, defectives among 120'],
        ['null distribution', 'Binomial(120, 0.07)'],
        ['p-value', `P(X ≥ 14 | H₀) = ${pval.toFixed(4)} (exact)`],
      ],
    },
  ],
  edges: [],
}
