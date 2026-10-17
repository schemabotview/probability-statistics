import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §4.8 — standard bivariate normal contours (x, y)ᵀΣ⁻¹(x, y) = c with Σ = [1 ρ; ρ 1], drawn from the
// eigen-decomposition (variances 1 ± ρ along the diagonals), for ρ = 0 (centred at −3) and ρ = 0.8 (at +3).
// P(inside the c contour) = 1 − e^(−c/2): 0.393 for c = 1, 0.865 for c = 4 (exact). Mixture of chair times
// (60%, lognormal median 10, log-sd 0.3) and table times (40%, median 20): moments computed here.
const ellipse = (rho: number, c: number, cx: number): PlotPoint[] =>
  Array.from({ length: 97 }, (_, i) => {
    const t = (2 * Math.PI * i) / 96
    const a = Math.sqrt(c * (1 + rho)) * Math.cos(t)
    const b = Math.sqrt(c * (1 - rho)) * Math.sin(t)
    return [cx + (a + b) / Math.SQRT2, (a - b) / Math.SQRT2]
  })
const lnMean = (m: number, s: number) => m * Math.exp((s * s) / 2)
const lnVar = (m: number, s: number) => lnMean(m, s) ** 2 * (Math.exp(s * s) - 1)
const m1 = lnMean(10, 0.3)
const m2 = lnMean(20, 0.3)
const mixMean = 0.6 * m1 + 0.4 * m2
const within = 0.6 * lnVar(10, 0.3) + 0.4 * lnVar(20, 0.3)
const between = 0.6 * (m1 - mixMean) ** 2 + 0.4 * (m2 - mixMean) ** 2

export const mvn: Scene = {
  id: 'joint-mvn',
  title: 'Mixtures and multivariate-normal geometry',
  flow: 'TB',
  nodes: [
    {
      id: 'contours',
      kind: 'plot',
      label: 'Bivariate normal contours, standardised: correlation 0 (left) and 0.8 (right)',
      sub: 'inner contour holds 39% of the probability, outer 86%; correlation tilts and squeezes the ellipses',
      plot: {
        equal: true,
        x: { min: -6, max: 6, step: 1 },
        y: { min: -3.2, max: 3.2, step: 1 },
        series: [
          { kind: 'line', points: ellipse(0, 1, -3), label: 'ρ = 0: circles', labelAt: [-4.2, 2.6], color: '#2dd4bf' },
          { kind: 'line', points: ellipse(0, 4, -3), color: '#2dd4bf' },
          { kind: 'line', points: ellipse(0.8, 1, 3), label: 'ρ = 0.8: along y = x', labelAt: [1.2, 2.9], color: '#f472b6' },
          { kind: 'line', points: ellipse(0.8, 4, 3), color: '#f472b6' },
        ],
      },
    },
    {
      id: 'facts',
      kind: 'table',
      label: 'Two structures built from simpler pieces',
      sub: 'a mixture draws a group, then a value; a multivariate normal is fixed by its means and Σ',
      headers: ['quantity', 'value', 'why'],
      values: [
        ['mixture: job time, 60% chairs', `mean ${mixMean.toFixed(2)} min`, '0.6 × 10.46 + 0.4 × 20.92'],
        ['… its variance', `${(within + between).toFixed(1)}`, `within ${within.toFixed(1)} + between ${between.toFixed(1)}`],
        ['bivariate normal, ρ = 0', 'X, Y independent', 'for normals, uncorrelated ⇒ independent'],
        ['… inside the c = 4 contour', '0.865', '1 − e⁻²'],
      ],
    },
  ],
  edges: [],
}
