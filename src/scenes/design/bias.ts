import type { Scene } from '@graphlearning/flow'
import { bars } from '../plot-kit'

// §1.4 — 400 jobs (numpy seed 7), lognormal times, mean 12.64 min. Jobs over 20 minutes run past the end
// of the shift and are logged with probability 0.4, so 26 of 46 long jobs go missing. The recorded 374
// have mean 11.74: the record is biased low. Counts per 5-minute bin from numpy.histogram.
const EDGES = [0, 5, 10, 15, 20, 25, 30, 35, 40]
const ALL = [15, 131, 145, 63, 26, 12, 6, 2]
const RECORDED = [15, 131, 145, 63, 13, 5, 1, 1]

export const bias: Scene = {
  id: 'design-bias',
  title: 'Selection, nonresponse, measurement bias and missingness',
  flow: 'TB',
  nodes: [
    {
      id: 'missing',
      kind: 'plot',
      label: 'Processing times of 400 jobs: all, and those that reached the log',
      sub: 'long jobs spill past the shift and often go unlogged, so the log under-represents them',
      plot: {
        x: { min: 0, max: 40, step: 5, label: 'processing time (minutes)' },
        y: { min: 0, max: 160, step: 20, label: 'jobs' },
        series: [
          ...bars(EDGES, ALL).map((points, i) => ({ kind: 'line' as const, points, color: '#4b5563', ...(i === 4 ? { label: 'all 400 jobs: mean 12.64', labelAt: [21, 52] as [number, number] } : {}) })),
          ...bars(EDGES, RECORDED).map((points, i) => ({ kind: 'line' as const, points, color: '#2dd4bf', ...(i === 4 ? { label: 'logged 374: mean 11.74', labelAt: [21, 38] as [number, number] } : {}) })),
        ],
      },
    },
    {
      id: 'kinds',
      kind: 'table',
      label: 'Ways the data can differ from the population, and which way they push',
      sub: 'a bigger sample of the same kind repeats the same bias',
      headers: ['problem', 'in the workshop', 'effect'],
      values: [
        ['selection', 'only batches flagged by operators get timed', 'overstates trouble'],
        ['nonresponse', 'night shift skips the defect survey', 'misses a whole shift'],
        ['measurement', 'gauge reads 0.8 mm high after a knock', 'every height too large'],
        ['missing not at random', 'jobs over 20 min often unlogged', 'mean 11.74, true 12.64'],
      ],
    },
  ],
  edges: [],
}
