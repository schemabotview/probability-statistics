import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §9.2 — a setting experiment over 5 days, 4 batches a day, 2 randomised to B within each day (blocked).
// Model: 7 + day effect (SD 2) + batch noise (SD 1), true effect of B −0.8. One run (numpy seed 42) is
// plotted; day differences −0.24, −1.31, −0.52, +0.19, −0.24, mean −0.42 (SE 0.25). Over 20 000 simulated
// experiments (seed 41) the estimate's SD is 0.94 completely randomised and 0.44 blocked by day.
const Y = [6.31, 6.94, 6.49, 7.59, 3.27, 5.8, 4.9, 4.99, 9.63, 8.17, 7.64, 8.07, 7.92, 8.96, 8.03, 8.7, 1.62, 3.52, 2.94, 2.67]
const T = [0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0]
const pts = (arm: number, dx: number): PlotPoint[] => Y.map((y, i): [number, number, number] => [Math.floor(i / 4) + 1 + dx, y, T[i]]).filter((p) => p[2] === arm).map((p) => [p[0], p[1]])

export const blocking: Scene = {
  id: 'exp-blocking',
  title: 'Randomisation, replication, blocking and blinding',
  flow: 'TB',
  nodes: [
    {
      id: 'days',
      kind: 'plot',
      label: 'A setting experiment blocked by day: 2 batches per setting, randomised within each day',
      sub: 'days differ by 7 points; within a day, the comparison of A and B is protected from that',
      plot: {
        x: { min: 0.5, max: 5.5, step: 1, label: 'day (block)' },
        y: { min: 0.5, max: 10.5, step: 1, label: 'defect rate (%)' },
        series: [
          { kind: 'scatter', points: pts(0, -0.1), label: 'setting A', labelAt: [0.6, 10.1], color: '#2dd4bf' },
          { kind: 'scatter', points: pts(1, 0.1), label: 'setting B', labelAt: [1.4, 10.1], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'design',
      kind: 'table',
      label: 'Design principles and what each buys',
      sub: 'SDs of the B − A estimate over 20 000 simulated experiments, true effect −0.8',
      headers: ['principle', 'how', 'buys'],
      values: [
        ['randomisation', 'setting drawn by lot', 'no systematic confounding'],
        ['replication', '4 batches a day, 5 days', 'an estimate of noise'],
        ['blocking by day', '2 A and 2 B each day', 'SD 0.44 instead of 0.94'],
        ['blinding', 'inspector not told the setting', 'no measurement bias'],
        ['this run', 'mean of day differences', '−0.42, SE 0.25'],
      ],
    },
  ],
  edges: [],
}
