import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §7.8 — optional stopping: chairs inspected one at a time with p = 0.07 TRUE; after every 20 chairs, an exact
// one-sided binomial test at α = 0.05; stop at the first rejection, up to 400 chairs. 20 000 simulated runs
// (numpy seed 24): P(ever reject) 0.046 after 1 look, 0.127 after 10, 0.165 after 20. A single test at 400:
// 0.033. Multiple endpoints: P(at least one of m independent true nulls rejected) = 1 − 0.95ᵐ.
const LOOKS = [0.0462, 0.0558, 0.0654, 0.0729, 0.0916, 0.1012, 0.1076, 0.1116, 0.1219, 0.127, 0.1308, 0.1334, 0.1407, 0.1437, 0.1503, 0.1533, 0.1558, 0.1607, 0.1636, 0.1648]
const PEEK: PlotPoint[] = LOOKS.map((v, i) => [i + 1, 100 * v])
const FWER: PlotPoint[] = Array.from({ length: 20 }, (_, i) => [i + 1, 100 * (1 - 0.95 ** (i + 1))])

export const multiplicity: Scene = {
  id: 'inf-multiplicity',
  title: 'Multiplicity, optional stopping and failure to reject',
  flow: 'TB',
  nodes: [
    {
      id: 'inflation',
      kind: 'plot',
      label: 'False alarms with no real change: many tests, or many looks at growing data',
      sub: 'each single test has a 5% error rate; using many of them does not',
      plot: {
        x: { min: 0, max: 21, step: 2, label: 'number of tests, or of looks' },
        y: { min: 0, max: 70, step: 10, label: 'P(at least one false rejection), %' },
        series: [
          { kind: 'line', points: [[0, 5], [21, 5]], label: 'nominal 5%', labelAt: [16, 7], color: '#9ca3af' },
          { kind: 'line', points: FWER, color: '#f472b6' },
          { kind: 'scatter', points: FWER, label: '20 defect types tested: 64%', labelAt: [10.5, 52], color: '#f472b6' },
          { kind: 'line', points: PEEK, color: '#fbbf24' },
          { kind: 'scatter', points: PEEK, label: 'peeking every 20 chairs: 16.5%', labelAt: [10.5, 22], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'remedies',
      kind: 'table',
      label: 'Invalid claims, and what keeps error control honest',
      sub: 'simulated and exact rates assume every null is true',
      headers: ['practice', 'false-alarm rate', 'remedy'],
      values: [
        ['test 20 defect types, report any', '64%', 'Bonferroni α/20: 4.9%'],
        ['test after every 20 chairs, stop when p < 0.05', '16.5%', 'prespecify one analysis, or a sequential design'],
        ['one planned test at 400 chairs', '3.3%', 'as designed'],
        ['p = 0.51 in study B', '—', '"no evidence", not "no effect"'],
      ],
    },
  ],
  edges: [],
}
