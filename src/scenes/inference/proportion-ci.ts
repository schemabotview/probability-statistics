import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §7.3 — exact coverage of 95% intervals for a proportion, n = 40, computed here by summing binomial
// probabilities over the x whose interval contains p. Wald p̂ ± 1.96√(p̂(1 − p̂)/n) falls to 33% at p = 0.01;
// Wilson stays near 95% (minimum 0.91). Intervals for 2/40 and 0/40 from scipy (Clopper–Pearson by beta
// quantiles): Wald (−0.018, 0.118), Wilson (0.014, 0.165), CP (0.006, 0.169); 0/40: Wald (0, 0), Wilson
// (0, 0.088), CP (0, 0.088).
const n = 40
const z = 1.959964
const choose = (a: number, b: number): number => (b === 0 ? 1 : (choose(a, b - 1) * (a - b + 1)) / b)
const pmf = (x: number, p: number) => choose(n, x) * p ** x * (1 - p) ** (n - x)
const wald = (x: number) => {
  const q = x / n
  const h = z * Math.sqrt((q * (1 - q)) / n)
  return [q - h, q + h]
}
const wilson = (x: number) => {
  const q = x / n
  const d = 1 + (z * z) / n
  const c = (q + (z * z) / (2 * n)) / d
  const h = (z * Math.sqrt((q * (1 - q)) / n + (z * z) / (4 * n * n))) / d
  return [c - h, c + h]
}
const cover = (f: (x: number) => number[]) => (p: number) => {
  let c = 0
  for (let x = 0; x <= n; x++) {
    const [lo, hi] = f(x)
    if (lo <= p && p <= hi) c += pmf(x, p)
  }
  return 100 * c
}
const PS = Array.from({ length: 191 }, (_, i) => 0.01 + i * 0.001)
const curve = (f: (x: number) => number[]): PlotPoint[] => PS.map((p) => [p, cover(f)(p)])

export const proportionCi: Scene = {
  id: 'inf-proportion-ci',
  title: 'Intervals for a proportion and sparse samples',
  flow: 'TB',
  nodes: [
    {
      id: 'exact',
      kind: 'plot',
      label: 'Exact coverage of two nominal 95% intervals for p, with n = 40',
      sub: 'the textbook Wald interval collapses when defects are rare; Wilson’s stays close to 95%',
      plot: {
        x: { min: 0.01, max: 0.2, step: 0.01, label: 'true defect rate p' },
        y: { min: 30, max: 100, step: 10, label: 'coverage (%)' },
        series: [
          { kind: 'line', points: [[0.01, 95], [0.2, 95]], label: 'nominal 95%', labelAt: [0.165, 97], color: '#9ca3af' },
          { kind: 'line', points: curve(wilson), label: 'Wilson', labelAt: [0.12, 89], color: '#2dd4bf' },
          { kind: 'line', points: curve(wald), label: 'Wald: p̂ ± 1.96 SE', labelAt: [0.03, 52], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'sparse',
      kind: 'table',
      label: 'Three 95% intervals for a sparse count',
      sub: 'Clopper–Pearson is exact and conservative; Wald can leave [0, 1] or have zero width',
      headers: ['data', 'Wald', 'Wilson', 'Clopper–Pearson'],
      values: [
        ['2 of 40', '(−0.018, 0.118)', '(0.014, 0.165)', '(0.006, 0.169)'],
        ['0 of 40', '(0, 0)', '(0, 0.088)', '(0, 0.088)'],
        ['coverage at p = 0.07', '93.9%', '94.2%', '98.0%'],
        ['worst coverage, p ≥ 0.01', '33%', '91%', '95.3%'],
      ],
    },
  ],
  edges: [],
}
