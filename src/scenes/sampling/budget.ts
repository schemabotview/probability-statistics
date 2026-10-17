import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { sample } from '../plot-kit'

// §5.7 — the P(shift > 120 min) simulation repeated with 200 different seeds (1000–1199) at R = 1000,
// 4000 and 16 000: SD of the 200 estimates 0.0134, 0.0065, 0.0035 (numpy). Theory √(p(1 − p)/R) with
// p = 0.266: 0.0140, 0.0070, 0.0035. Four times the replications halves the Monte Carlo SE.
const p = 0.266
const theory = (logR: number) => Math.sqrt((p * (1 - p)) / 10 ** logR)
const OBS: PlotPoint[] = [[3, 0.0134], [Math.log10(4000), 0.0065], [Math.log10(16000), 0.0035]]

export const budget: Scene = {
  id: 'samp-budget',
  title: 'Simulation uncertainty, replication budgets and seeds',
  flow: 'TB',
  nodes: [
    {
      id: 'se',
      kind: 'plot',
      label: 'Monte Carlo SE against the number of replications',
      sub: 'dots: spread of 200 repeated runs with different seeds; curve: √(p(1 − p)/R)',
      plot: {
        x: { min: 2.8, max: 4.4, step: 0.2, label: 'log₁₀ R' },
        y: { min: 0, max: 0.018, step: 0.002, label: 'standard error' },
        series: [
          { kind: 'line', points: sample(2.8, 4.4, 80, theory), label: 'theory: halves when R quadruples', labelAt: [3.35, 0.0105], color: '#fbbf24' },
          { kind: 'scatter', points: OBS, size: 7, label: '200 seeds per R', labelAt: [2.85, 0.0152], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'budgets',
      kind: 'table',
      label: 'Choosing R for a target precision, and recording seeds',
      sub: 'R needed for ±2 SE ≈ ±δ: R = 4p(1 − p)/δ²',
      headers: ['R', 'observed SE', 'theory SE', '±2 SE'],
      values: [
        ['1 000', '0.0134', '0.0140', '±0.028'],
        ['4 000', '0.0065', '0.0070', '±0.014'],
        ['16 000', '0.0035', '0.0035', '±0.007'],
        ['seed 16, rerun', 'identical 0.2634', 'reproducible', '—'],
        ['for ±0.002', 'R ≈ 195 000', '—', '—'],
      ],
    },
  ],
  edges: [],
}
