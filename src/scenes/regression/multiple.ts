import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { OAK, PARTS, TIME } from './jobs'

// §10.2 — time ~ parts + oak (numpy lstsq): 2.86 + 0.990 parts + 2.76 oak, SEs 0.64, 0.049, 0.49;
// residual SD 1.77 (down from 2.20). With an interaction parts × oak: 2.62 + 1.010 parts + 3.87 oak
// − 0.085 parts × oak; interaction SE 0.114, so no evidence the slopes differ.
const pine: PlotPoint[] = PARTS.map((p, i): PlotPoint => [p, TIME[i]]).filter((_, i) => OAK[i] === 0)
const oak: PlotPoint[] = PARTS.map((p, i): PlotPoint => [p, TIME[i]]).filter((_, i) => OAK[i] === 1)
const line = (a: number, b: number): PlotPoint[] => [[3, a + 3 * b], [21, a + 21 * b]]

export const multiple: Scene = {
  id: 'reg-multiple',
  title: 'Multiple predictors, categories and interactions',
  flow: 'TB',
  nodes: [
    {
      id: 'two-lines',
      kind: 'plot',
      label: 'Adding the wood type: two parallel lines, 2.76 minutes apart',
      sub: 'a category enters as an indicator (oak = 1); its coefficient shifts the line',
      plot: {
        x: { min: 2, max: 22, step: 2, label: 'parts in the job' },
        y: { min: 3, max: 27, step: 2, label: 'processing time (minutes)' },
        series: [
          { kind: 'scatter', points: pine, label: 'pine', labelAt: [2.5, 25.8], color: '#2dd4bf' },
          { kind: 'scatter', points: oak, label: 'oak', labelAt: [5, 25.8], color: '#f472b6' },
          { kind: 'line', points: line(2.861, 0.9896), label: 'pine: 2.86 + 0.99 × parts', labelAt: [14.5, 14], color: '#2dd4bf' },
          { kind: 'line', points: line(2.861 + 2.759, 0.9896), label: 'oak: + 2.76', labelAt: [8, 18.5], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'models',
      kind: 'table',
      label: 'Three nested models for processing time',
      sub: 'coefficient (SE); each is the change holding the other predictors fixed',
      headers: ['term', 'parts only', '+ oak', '+ parts × oak'],
      values: [
        ['intercept', '3.29 (0.79)', '2.86 (0.64)', '2.62 (0.72)'],
        ['parts', '1.033 (0.059)', '0.990 (0.049)', '1.010 (0.056)'],
        ['oak', '—', '2.76 (0.49)', '3.87 (1.57)'],
        ['parts × oak', '—', '—', '−0.085 (0.114)'],
        ['residual SD', '2.20', '1.77', '1.79'],
      ],
    },
  ],
  edges: [],
}
