import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { circle } from '../plot-kit'
import { DEFECT_TYPES as D } from '../workshop'

// §2.2 — defect types among the 420 defective chairs. Region counts from the overlaps: seat only 95,
// joint only 120, finish only 130, seat∩joint only 25, seat∩finish only 15, joint∩finish only 20, all
// three 15. Inclusion–exclusion: 150 + 180 + 180 − 40 − 30 − 35 + 15 = 420.
const only = {
  S: D.S - D.SJ - D.SF + D.SJF,
  J: D.J - D.SJ - D.JF + D.SJF,
  F: D.F - D.SF - D.JF + D.SJF,
}
const C_S: PlotPoint = [-0.6, 0.4]
const C_J: PlotPoint = [0.6, 0.4]
const C_F: PlotPoint = [0, -0.62]
const tag = (at: PlotPoint, text: string) => ({ kind: 'marker' as const, at, size: 0, label: text, labelAt: at, color: '#e5e7eb' })

export const venn: Scene = {
  id: 'prob-venn',
  title: 'Set operations and inclusion–exclusion',
  flow: 'TB',
  nodes: [
    {
      id: 'regions',
      kind: 'plot',
      label: 'Defect types among the quarter’s 420 defective chairs',
      sub: 'a chair can fail on more than one count; numbers are chairs in each region',
      plot: {
        equal: true,
        axes: 'corner',
        x: { min: -2, max: 2, step: 0.5 },
        y: { min: -1.8, max: 1.8, step: 0.5 },
        series: [
          { kind: 'line', points: circle(1, C_S), label: 'seat S: 150', labelAt: [-1.9, 1.45], color: '#2dd4bf' },
          { kind: 'line', points: circle(1, C_J), label: 'joint J: 180', labelAt: [1.0, 1.45], color: '#f472b6' },
          { kind: 'line', points: circle(1, C_F), label: 'finish F: 180', labelAt: [0.75, -1.6], color: '#fbbf24' },
          tag([-1.05, 0.55], `${only.S}`),
          tag([0.95, 0.55], `${only.J}`),
          tag([-0.05, -1.05], `${only.F}`),
          tag([-0.08, 0.75], `${D.SJ - D.SJF}`),
          tag([-0.6, -0.25], `${D.SF - D.SJF}`),
          tag([0.52, -0.25], `${D.JF - D.SJF}`),
          tag([-0.08, 0.05], `${D.SJF}`),
        ],
      },
    },
    {
      id: 'inclusion',
      kind: 'table',
      label: 'Inclusion–exclusion for P(S ∪ J ∪ F)',
      sub: 'add singles, subtract pairs, add back the triple',
      headers: ['term', 'chairs', 'running total'],
      values: [
        ['|S| + |J| + |F|', '150 + 180 + 180', '510'],
        ['− |S∩J| − |S∩F| − |J∩F|', '− 40 − 30 − 35', '405'],
        ['+ |S∩J∩F|', '+ 15', '420'],
        ['P(any defect)', '420 / 6000', '0.07'],
        ['exactly one type', `${only.S} + ${only.J} + ${only.F}`, `${only.S + only.J + only.F}`],
        ['complement: no defect', '1 − 0.07', '0.93'],
      ],
    },
  ],
  edges: [],
}
