import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §5.6 — Monte Carlo estimate of P(8 lognormal jobs total > 120 min), numpy seed 16, R = 10 000: 0.2634,
// ±2 SE 0.0088. The running estimate and its ±2 SE band at 21 log-spaced R come from the same draws.
// A 2 000 000-replication run (seed 99) gives 0.2660. The code card is exactly the script run.
const R = [100, 126, 158, 200, 251, 316, 398, 501, 631, 794, 1000, 1259, 1585, 1995, 2512, 3162, 3981, 5012, 6310, 7943, 10000]
const P = [0.25, 0.2698, 0.2658, 0.255, 0.2869, 0.2816, 0.2739, 0.2735, 0.2615, 0.2708, 0.264, 0.2653, 0.2732, 0.2782, 0.2731, 0.2672, 0.2668, 0.2676, 0.2637, 0.2639, 0.2634]
const E = [0.0866, 0.0791, 0.0703, 0.0616, 0.0571, 0.0506, 0.0447, 0.0398, 0.035, 0.0315, 0.0279, 0.0249, 0.0224, 0.0201, 0.0178, 0.0157, 0.014, 0.0125, 0.0111, 0.0099, 0.0088]
const at = (v: number[]): PlotPoint[] => v.map((p, i) => [Math.log10(R[i]), p])

export const monteCarlo: Scene = {
  id: 'samp-monte-carlo',
  title: 'Monte Carlo probability and expectation estimates',
  flow: 'TB',
  nodes: [
    {
      id: 'running',
      kind: 'plot',
      label: 'Simulated P(a shift of 8 jobs exceeds 2 hours), as replications accumulate',
      sub: 'no formula exists for a sum of lognormals; the band is the estimate ± 2 Monte Carlo SE',
      plot: {
        x: { min: 2, max: 4, step: 0.25, label: 'log₁₀ replications' },
        y: { min: 0.15, max: 0.37, step: 0.02, label: 'estimated probability' },
        series: [
          { kind: 'line', points: at(P.map((p, i) => p + E[i])), color: '#4b5563' },
          { kind: 'line', points: at(P.map((p, i) => p - E[i])), label: '± 2 SE', labelAt: [2.05, 0.17], color: '#4b5563' },
          { kind: 'line', points: [[2, 0.266], [4, 0.266]], label: 'long run (2 × 10⁶ reps): 0.266', labelAt: [3.05, 0.252], color: '#fbbf24' },
          { kind: 'line', points: at(P), label: 'running estimate', labelAt: [2.55, 0.3], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'shift.py',
      label: `rng = np.random.default_rng(16)
R = 10_000                                   # replications
times = rng.lognormal(np.log(12), 0.5, size=(R, 8))
over = times.sum(axis=1) > 120               # shift over 2 h
p_hat = over.mean()
se = np.sqrt(p_hat * (1 - p_hat) / R)
print(f"{p_hat:.4f} ± {2*se:.4f}")           # 0.2634 ± 0.0088
print(times.sum(axis=1).mean())              # 108.52 (exact 108.78)`,
    },
  ],
  edges: [],
}
