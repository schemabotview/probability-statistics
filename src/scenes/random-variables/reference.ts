import type { Scene } from '@graphlearning/flow'
import { sample } from '../plot-kit'
import { normalPdf } from './dist'

// §3.8 — Student t densities, f(t) = Γ((ν+1)/2) / (√(νπ) Γ(ν/2)) (1 + t²/ν)^(−(ν+1)/2), computed here with
// a Lanczos log-gamma. Critical values from scipy.stats: t₀.₉₇₅ = 4.303 (2 df), 2.571 (5), 2.228 (10),
// 2.042 (30), z = 1.960; χ²₀.₉₅ = 3.841 (1), 5.991 (2), 11.070 (5); F₀.₉₅(2, 20) = 3.493.
// P(|T| > 2): 0.184 (2 df), 0.102 (5), 0.055 (30); normal 0.046.
const lgamma = (z: number): number => {
  const g = 7
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lgamma(1 - z)
  z -= 1
  let x = c[0]
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i)
  const t = z + g + 0.5
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x)
}
const tPdf = (nu: number) => (t: number) =>
  Math.exp(lgamma((nu + 1) / 2) - lgamma(nu / 2) - 0.5 * Math.log(nu * Math.PI) - ((nu + 1) / 2) * Math.log(1 + (t * t) / nu))

export const reference: Scene = {
  id: 'rv-reference',
  title: 't, chi-square and F reference distributions',
  flow: 'TB',
  nodes: [
    {
      id: 't',
      kind: 'plot',
      label: 'Student t densities against the standard normal',
      sub: 'fewer degrees of freedom, heavier tails: more probability beyond ±2',
      plot: {
        x: { min: -5, max: 5, step: 1, label: 't' },
        y: { min: 0, max: 0.42, step: 0.05, label: 'density' },
        series: [
          { kind: 'line', points: sample(-5, 5, 200, normalPdf(0, 1)), label: 'normal', labelAt: [0.25, 0.405], color: '#9ca3af' },
          { kind: 'line', points: sample(-5, 5, 200, tPdf(30)), label: 't, 30 df', labelAt: [1.25, 0.33], color: '#2dd4bf' },
          { kind: 'line', points: sample(-5, 5, 200, tPdf(5)), label: 't, 5 df', labelAt: [1.75, 0.2], color: '#fbbf24' },
          { kind: 'line', points: sample(-5, 5, 200, tPdf(2)), label: 't, 2 df: heaviest tails', labelAt: [2.6, 0.075], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'critical',
      kind: 'table',
      label: 'Reference distributions used in later chapters',
      sub: 'they arise from normal samples: t for a mean, χ² for a variance, F for a ratio of variances',
      headers: ['distribution', 'degrees of freedom', 'point', 'value'],
      values: [
        ['t', '2 / 5 / 10 / 30', '97.5th percentile', '4.303 / 2.571 / 2.228 / 2.042'],
        ['normal', '—', '97.5th percentile', '1.960'],
        ['t', '2 / 5 / 30', 'P(|T| > 2)', '0.184 / 0.102 / 0.055'],
        ['χ²', '1 / 2 / 5', '95th percentile', '3.841 / 5.991 / 11.070'],
        ['F', '(2, 20)', '95th percentile', '3.493'],
      ],
    },
  ],
  edges: [],
}
