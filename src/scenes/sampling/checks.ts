import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §5.8 — check a simulator against an exact answer before trusting it elsewhere: 10 000 simulated
// Binomial(20, 0.07) batch counts (numpy seed 17) against the exact pmf. P(X ≥ 3): simulated 0.1578, exact
// 0.1610, MC SE 0.0037 (0.9 SE apart). Shift-length mean: simulated 108.52, exact 8 × 12e^(0.125) = 108.78,
// MC SE 0.205 (1.3 SE apart). Exponential P(X > 60) from §5.1: 0.6 SE; mean of 10 000 30-time samples (§5.4): 0.4 SE.
const K = [0, 1, 2, 3, 4, 5, 6, 7]
const SIM = [0.2377, 0.3597, 0.2448, 0.1105, 0.0353, 0.0098, 0.0018, 0.0004]
const EXACT = [0.2342, 0.3526, 0.2521, 0.1139, 0.0364, 0.0088, 0.0017, 0.0002]

export const checks: Scene = {
  id: 'samp-checks',
  title: 'Analytical checks and repeated-sampling demonstrations',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'plot',
      label: 'Simulated against exact: defective chairs in a batch of 20',
      sub: 'bars: 10 000 simulated batches; dots: the exact binomial probabilities',
      plot: {
        x: { min: -0.6, max: 7.6, step: 1, label: 'k, defective chairs' },
        y: { min: 0, max: 0.4, step: 0.05, label: 'proportion of batches' },
        series: [
          ...K.map((k) => ({ kind: 'line' as const, points: [[k - 0.3, 0], [k - 0.3, SIM[k]], [k + 0.3, SIM[k]], [k + 0.3, 0]] as PlotPoint[], color: '#2dd4bf' })),
          { kind: 'scatter', points: K.map((k): PlotPoint => [k, EXACT[k]]), label: 'exact Binomial(20, 0.07)', labelAt: [3.4, 0.3], color: '#fbbf24' },
          { kind: 'marker', at: [4, 0.25], size: 0, label: 'simulated', labelAt: [3.4, 0.27], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'agree',
      kind: 'table',
      label: 'Agreement within Monte Carlo error is the test',
      sub: 'a simulation can confirm a model’s consequences, never the model itself',
      headers: ['check', 'simulated', 'exact', 'gap in SEs'],
      values: [
        ['P(X ≥ 3), batch of 20', '0.1578', '0.1610', '0.9'],
        ['mean shift length (min)', '108.52', '108.78', '1.3'],
        ['P(X > 60), exponential', '0.2175', '0.2231', '0.6'],
        ['mean of 30-time samples', '13.592', '13.598', '0.4'],
      ],
    },
  ],
  edges: [],
}
