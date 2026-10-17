import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { mean, sd } from '../plot-kit'
import { READINGS } from '../workshop'

// §1.2 — five chairs, four gauge readings each (numpy seed 2). Within-chair SD (pooled) 0.49 mm, SD of
// the five chair means 3.89 mm: readings of one chair are alike, so the chair is the unit, not the reading.
const ALL: PlotPoint[] = READINGS.flatMap((r, i) => r.map((v): PlotPoint => [i + 1, v]))
const MEANS: PlotPoint[] = READINGS.map((r, i) => [i + 1, mean(r)])
const within = Math.sqrt(mean(READINGS.map((r) => sd(r) ** 2)))
const between = sd(READINGS.map(mean))

export const units: Scene = {
  id: 'design-units',
  title: 'Units, measurement scales and provenance',
  flow: 'TB',
  nodes: [
    {
      id: 'readings',
      kind: 'plot',
      label: 'Seat height of five chairs, each read four times',
      sub: `readings of one chair differ by SD ${within.toFixed(2)} mm; chairs differ by SD ${between.toFixed(2)} mm`,
      plot: {
        x: { min: 0.5, max: 5.5, step: 1, label: 'chair' },
        y: { min: 443, max: 457, step: 1, label: 'seat height (mm)' },
        series: [
          { kind: 'scatter', points: ALL, label: 'gauge readings: 20 numbers, 5 units', labelAt: [0.6, 456.2], color: '#2dd4bf' },
          { kind: 'scatter', points: MEANS, size: 7, label: 'chair mean', labelAt: [3.25, 444.0], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'scales',
      kind: 'table',
      label: 'What each recorded variable is, and where it came from',
      sub: 'the scale decides which summaries make sense; provenance decides what to trust',
      headers: ['variable', 'scale', 'unit', 'recorded by'],
      values: [
        ['defective?', 'nominal, binary', 'yes / no', 'end-of-line inspector'],
        ['defect type', 'nominal', 'seat, joint, finish', 'inspector'],
        ['finish grade', 'ordinal', '1 to 4', 'inspector, by eye'],
        ['workshop temperature', 'interval', '°C', 'wall sensor, hourly'],
        ['seat height', 'ratio', 'mm', 'gauge G2, per reading'],
        ['processing time', 'ratio', 'minutes', 'machine log, per job'],
      ],
    },
  ],
  edges: [],
}
