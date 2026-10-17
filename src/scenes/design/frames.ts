import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { mean } from '../plot-kit'
import { BATCH_RATES } from '../workshop'

// §1.3 — the frame is the list of 120 batches (10 days × 12). Population mean 6.66%. Standard errors of
// the sample mean over 10 000 repeated draws of 20 batches each (numpy seed 5): simple random 0.45,
// stratified by day (2 per day) 0.21, cluster (2 whole days, 10 batches each) 1.30. One example draw of
// each design (seed 6) is highlighted.
const ALL: PlotPoint[] = BATCH_RATES.flatMap((r, d) => r.map((v): PlotPoint => [d + 1, v]))
const STRAT = [[4, 6], [1, 8], [2, 6], [9, 11], [0, 5], [5, 10], [1, 11], [1, 7], [3, 5], [8, 10]]
const STRAT_PTS: PlotPoint[] = STRAT.flatMap((js, d) => js.map((j): PlotPoint => [d + 1 - 0.18, BATCH_RATES[d][j]]))
const CLUSTER: [number, number[]][] = [[4, [1, 3, 4, 5, 6, 7, 8, 9, 10, 11]], [6, [0, 1, 2, 4, 5, 6, 8, 9, 10, 11]]]
const CLUSTER_PTS: PlotPoint[] = CLUSTER.flatMap(([d, js]) => js.map((j): PlotPoint => [d + 1 + 0.18, BATCH_RATES[d][j]]))
const est = (pts: PlotPoint[]) => mean(pts.map((p) => p[1])).toFixed(2)

export const frames: Scene = {
  id: 'design-frames',
  title: 'Sampling frames and sampling designs',
  flow: 'TB',
  nodes: [
    {
      id: 'batches',
      kind: 'plot',
      label: 'Defect rate of all 120 batches, by day: the sampling frame',
      sub: `one stratified draw estimates ${est(STRAT_PTS)}%; one cluster draw (days 5 and 7) estimates ${est(CLUSTER_PTS)}%; truth 6.66%`,
      plot: {
        x: { min: 0.4, max: 10.6, step: 1, label: 'day' },
        y: { min: 1.5, max: 12, step: 1, label: 'batch defect rate (%)' },
        series: [
          { kind: 'line', points: [[0.4, 6.66], [10.6, 6.66]], label: 'population mean 6.66%', labelAt: [8.4, 6.95], color: '#4b5563' },
          { kind: 'scatter', points: ALL, label: 'all batches', labelAt: [0.6, 11.6], color: '#4b5563' },
          { kind: 'scatter', points: STRAT_PTS, label: 'stratified: 2 per day', labelAt: [2.5, 11.6], color: '#2dd4bf' },
          { kind: 'scatter', points: CLUSTER_PTS, label: 'cluster: 2 whole days', labelAt: [4.9, 11.6], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'designs',
      kind: 'table',
      label: 'Three ways to choose 20 batches, judged over 10 000 repetitions',
      sub: 'all three are unbiased here; their precision differs because days differ',
      headers: ['design', 'how the 20 are chosen', 'SE of the mean'],
      values: [
        ['simple random', 'any 20 of the 120, equally likely', '0.45 points'],
        ['stratified by day', '2 at random from every day', '0.21 points'],
        ['cluster by day', '2 random days, 10 batches each', '1.30 points'],
        ['frame gap', 'reworked batches never listed', 'bias no design fixes'],
      ],
    },
  ],
  edges: [],
}
