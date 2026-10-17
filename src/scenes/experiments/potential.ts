import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §9.1 — 8 batches with BOTH potential defect rates (%) under setting A and B, synthetic (numpy seed 40),
// so the truth is known: individual effects −0.9 to −2.3, average effect ATE = −1.575. One randomised
// assignment (4 to B) shows only one outcome per batch; its difference in means is −1.30. Over all 70
// possible assignments of 4 to B, the difference averages exactly −1.575 (SD 1.33): randomisation is unbiased.
const YA = [4.7, 4.9, 5.5, 8.5, 4.9, 4.9, 6.2, 9.8]
const YB = [2.8, 3.1, 4.5, 7.4, 4.0, 3.2, 4.3, 7.5]
const Z = [0, 1, 1, 0, 1, 0, 0, 1]

export const potential: Scene = {
  id: 'exp-potential',
  title: 'Potential outcomes, interventions and target effects',
  flow: 'TB',
  nodes: [
    {
      id: 'both',
      kind: 'plot',
      label: 'Each batch has two potential defect rates; we only ever see one',
      sub: 'grey: the outcome hidden by the assignment; bright: the one observed',
      plot: {
        x: { min: 0.4, max: 8.6, step: 1, label: 'batch' },
        y: { min: 2, max: 10.5, step: 1, label: 'defect rate (%)' },
        series: [
          ...YA.map((a, i) => ({ kind: 'line' as const, points: [[i + 1, a], [i + 1, YB[i]]] as PlotPoint[], color: '#4b5563' })),
          { kind: 'scatter', points: YA.map((a, i): PlotPoint => [i + 1, a]).filter((_, i) => Z[i] === 0), label: 'observed under A', labelAt: [0.5, 10.1], color: '#2dd4bf' },
          { kind: 'scatter', points: YB.map((b, i): PlotPoint => [i + 1, b]).filter((_, i) => Z[i] === 1), label: 'observed under B', labelAt: [2.7, 10.1], color: '#f472b6' },
          { kind: 'scatter', points: [...YA.map((a, i): PlotPoint => [i + 1, a]).filter((_, i) => Z[i] === 1), ...YB.map((b, i): PlotPoint => [i + 1, b]).filter((_, i) => Z[i] === 0)], label: 'unobserved (counterfactual)', labelAt: [4.9, 10.1], color: '#4b5563' },
        ],
      },
    },
    {
      id: 'effects',
      kind: 'table',
      label: 'The causal effect of B for a batch is Y(B) − Y(A); the target is their average',
      sub: 'only a synthetic example can show both columns',
      headers: ['quantity', 'value', 'available in practice?'],
      values: [
        ['individual effects', '−0.9 to −2.3 points', 'never: one outcome per batch'],
        ['average treatment effect', '−1.575', 'no, but estimable'],
        ['this assignment’s difference in means', '−1.30', 'yes'],
        ['average over all 70 assignments', '−1.575', 'randomisation is unbiased'],
        ['SD over the 70 assignments', '1.33', 'why replication matters'],
      ],
    },
  ],
  edges: [],
}
