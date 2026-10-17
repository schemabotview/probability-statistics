import type { Scene } from '@graphlearning/flow'
import { bars } from '../plot-kit'

// §12.3 — settings A (15 jobs) and B (25) from chapter 8, observed difference in means 3.41 minutes. The code
// card is exactly perm.py (numpy seed 41, 5000 relabellings then 5000 bootstrap resamples); its output is the
// last comment. Histograms are those same draws, bins of 0.25: permutation SD 1.20, bootstrap SD 0.88.
const EDGES = Array.from({ length: 45 }, (_, i) => -5 + i * 0.25)
const PERM = [0, 0, 1, 0, 0, 9, 8, 16, 24, 40, 72, 100, 127, 148, 206, 284, 323, 332, 429, 380, 381, 380, 351, 338, 263, 235, 199, 143, 91, 49, 42, 10, 13, 3, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0]
const BOOT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 9, 25, 36, 60, 136, 196, 323, 374, 463, 517, 577, 549, 497, 420, 271, 233, 137, 79, 39, 35, 13]
const dens = (c: number[]) => c.map((k) => k / (5000 * 0.25))

export const permutation: Scene = {
  id: 'rs-permutation',
  title: 'Permutation and randomisation tests and exchangeability',
  flow: 'TB',
  nodes: [
    {
      id: 'two',
      kind: 'plot',
      label: 'Difference in mean time, A − B: a permutation null against a bootstrap distribution',
      sub: 'the null shuffles labels, so it centres on 0; the bootstrap keeps them, so it centres on the estimate',
      plot: {
        x: { min: -5, max: 6, step: 1, label: 'difference in means (minutes)' },
        y: { min: 0, max: 0.5, step: 0.05, label: 'density' },
        series: [
          ...bars(EDGES, dens(PERM)).map((points, i) => ({ kind: 'line' as const, points, color: '#9ca3af', ...(i === 14 ? { label: 'permutation null', labelAt: [-4.6, 0.3] as [number, number] } : {}) })),
          ...bars(EDGES, dens(BOOT)).map((points, i) => ({ kind: 'line' as const, points, color: '#2dd4bf', ...(i === 37 ? { label: 'bootstrap: (1.69, 5.11)', labelAt: [4.55, 0.43] as [number, number] } : {}) })),
          { kind: 'segment', from: [3.41, 0], to: [3.41, 0.47], dashed: false, label: 'observed 3.41', labelAt: [1.2, 0.48], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'perm.py',
      label: `rng = np.random.default_rng(41)
obs = A.mean() - B.mean()
pool = np.concatenate([A, B])
null = np.empty(5000)
for i in range(5000):        # H0: the labels are arbitrary
    s = rng.permutation(pool)
    null[i] = s[:15].mean() - s[15:].mean()
boot = np.array([rng.choice(A, 15).mean() - rng.choice(B, 25).mean()
                 for _ in range(5000)])   # resample within groups
print(round(obs, 2), np.mean(np.abs(null) >= abs(obs)))
print(np.percentile(boot, [2.5, 97.5]).round(2))
# 3.41 0.0032
# [1.69 5.11]`,
    },
  ],
  edges: [],
}
