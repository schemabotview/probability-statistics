import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { NEW, OLD } from './paired'

// §8.3 — the 12 board differences new − old (from §8.1): mean −1.66, SD 0.87, t₀.₉₇₅,₁₁ = 2.201, 95% CI
// (−2.21, −1.10). If each board is also read 4 times per glue (reading noise SD 0.5, same seed stream) and
// the 48 reading differences are treated as independent: SE 0.143 instead of the board-level 0.204, t −11.5.
const D = NEW.map((v, i) => Math.round((v - OLD[i]) * 10) / 10)
const m = D.reduce((a, b) => a + b, 0) / D.length
const s = Math.sqrt(D.reduce((a, v) => a + (v - m) ** 2, 0) / (D.length - 1))
const h = (2.201 * s) / Math.sqrt(D.length)
const DOTS: PlotPoint[] = [...D].sort((a, b) => a - b).map((d, i) => [d, 0.6 + (i % 3) * 0.25])

export const differences: Scene = {
  id: 'cmp-differences',
  title: 'Paired differences and repeated-reading pitfalls',
  flow: 'TB',
  nodes: [
    {
      id: 'diffs',
      kind: 'plot',
      label: 'The 12 within-board differences, new glue minus old',
      sub: `a paired analysis is a one-sample analysis of these: mean ${m.toFixed(2)}, 95% CI (${(m - h).toFixed(2)}, ${(m + h).toFixed(2)})`,
      plot: {
        x: { min: -3.5, max: 0.5, step: 0.5, label: 'difference in drying time (minutes)' },
        y: { min: 0, max: 2.4, step: 0.5 },
        series: [
          { kind: 'segment', from: [0, 0], to: [0, 2.4], label: 'no change', labelAt: [0.04, 2.25], color: '#9ca3af' },
          { kind: 'scatter', points: DOTS, label: 'one board each', labelAt: [-3.4, 1.35], color: '#2dd4bf' },
          { kind: 'segment', from: [m - h, 1.8], to: [m + h, 1.8], dashed: false, size: 9, label: '95% CI for the mean change', labelAt: [m - h, 2.0], color: '#fbbf24' },
          { kind: 'marker', at: [m, 1.8], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'units',
      kind: 'table',
      label: 'The unit is the board, not the reading',
      sub: 'readings of one board share that board’s effect, so they are not independent',
      headers: ['analysis', 'n', 'SE', 't'],
      values: [
        ['12 board means of the readings (correct)', '12', '0.204', '−8.0'],
        ['48 reading differences as units', '48', '0.143', '−11.5'],
        ['effect of the error', '—', 'SE 30% too small', 'overstated certainty'],
      ],
    },
  ],
  edges: [],
}
