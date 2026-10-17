import type { Scene } from '@graphlearning/flow'
import { bars, sample } from '../plot-kit'
import { betaPdf, binomPmf, lbeta, N, X } from './beta'

// §11.7 — prior 0.8·Beta(2, 26) + 0.2·Beta(2, 8) (a quality engineer's belief with a 20% "bad batch" component);
// no single conjugate update, but the posterior is still a mixture of Beta(16, 132) and Beta(16, 114) with
// weights 0.810 / 0.190 (computed here from the marginal likelihoods). Exact mean 0.1110, P(p > 0.0888) 0.7907.
// The 20-point grid is computed below; the code card is exactly grid.py, run with numpy/scipy.
const PRIOR: [number, number, number][] = [[0.8, 2, 26], [0.2, 2, 8]]
const raw = PRIOR.map(([w, a, b]) => w * Math.exp(lbeta(a + X, b + N - X) - lbeta(a, b)))
const W = raw.map((r) => r / raw.reduce((s, v) => s + v, 0))
const exact = (p: number) => PRIOR.reduce((s, [, a, b], i) => s + W[i] * betaPdf(a + X, b + N - X)(p), 0)

const M = 20
const MID = Array.from({ length: M }, (_, i) => (i + 0.5) / M)
const un = MID.map((p) => PRIOR.reduce((s, [w, a, b]) => s + w * betaPdf(a, b)(p), 0) * binomPmf(N, p)(X))
const GW = un.map((u) => u / un.reduce((s, v) => s + v, 0))
const EDGES = Array.from({ length: 7 }, (_, i) => i / M)

export const grid: Scene = {
  id: 'bayes-grid',
  title: 'Computational approximation without conjugacy',
  flow: 'TB',
  nodes: [
    {
      id: 'approx',
      kind: 'plot',
      label: 'Posterior under a two-part prior: exact curve against a 20-point grid',
      sub: 'prior × likelihood, evaluated at grid points and normalised; a coarse grid misplaces the tail',
      plot: {
        x: { min: 0, max: 0.3, step: 0.05, label: 'defect rate p' },
        y: { min: 0, max: 18, step: 2, label: 'posterior density' },
        series: [
          ...bars(EDGES, GW.slice(0, 6).map((w) => w * M)).map((points, i) => ({ kind: 'line' as const, points, color: '#4b5563', ...(i === 3 ? { label: '20-point grid (weight ÷ width)', labelAt: [0.17, 7] as [number, number] } : {}) })),
          { kind: 'line', points: sample(0.005, 0.3, 300, exact), label: `exact mixture: weights ${W[0].toFixed(3)} / ${W[1].toFixed(3)}`, labelAt: [0.135, 14], color: '#f472b6' },
          { kind: 'segment', from: [0.0888, 0], to: [0.0888, 16], label: 'p* = 0.0888', labelAt: [0.02, 16.5] },
        ],
      },
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'grid.py',
      label: `x, n = 14, 120
def grid_post(m):
    p = (np.arange(m) + 0.5) / m          # midpoints in (0, 1)
    prior = (0.8 * stats.beta.pdf(p, 2, 26)
             + 0.2 * stats.beta.pdf(p, 2, 8))
    post = prior * stats.binom.pmf(x, n, p)
    post /= post.sum()                    # normalise on the grid
    return p, post
for m in (20, 1000):
    p, w = grid_post(m)
    print(m, round((p * w).sum(), 4), round(w[p > 0.0888].sum(), 4))
# 20 0.1107 0.6524      1000 0.111 0.7883     exact 0.1110 0.7907`,
    },
  ],
  edges: [],
}
