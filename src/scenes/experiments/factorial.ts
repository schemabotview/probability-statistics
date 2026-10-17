import type { Scene } from '@graphlearning/flow'

// §9.3 — 2 × 2 factorial: machine setting (A, B) × glue (old, new), cell mean processing times (minutes),
// two scenarios. Additive: 14.0, 12.5, 12.0, 10.5: glue effect −1.5 under both settings, interaction 0.
// Interaction: 14.0, 12.5, 12.0, 12.3: glue helps under A (−1.5) but not under B (+0.3); interaction
// (difference of differences)/2 = 0.9, and the "main effect" of glue, −0.6, describes neither setting.
export const factorial: Scene = {
  id: 'exp-factorial',
  title: 'Factorial main effects, interactions and nuisance variation',
  flow: 'TB',
  nodes: [
    {
      id: 'lines',
      kind: 'plot',
      label: 'Interaction plots: glue effect at each machine setting',
      sub: 'left: parallel lines, the glue saves 1.5 min whatever the setting; right: the lines cross',
      plot: {
        x: { min: -0.3, max: 3.3, step: 1, label: 'glue: 0 old, 1 new (additive) · 2 old, 3 new (interaction)' },
        y: { min: 10, max: 14.6, step: 0.5, label: 'mean processing time (minutes)' },
        series: [
          { kind: 'line', points: [[0, 14.0], [1, 12.5]], label: 'A', labelAt: [0.5, 13.55], color: '#2dd4bf' },
          { kind: 'line', points: [[0, 12.0], [1, 10.5]], label: 'B', labelAt: [0.5, 10.95], color: '#f472b6' },
          { kind: 'line', points: [[2, 14.0], [3, 12.5]], label: 'A', labelAt: [2.5, 13.55], color: '#2dd4bf' },
          { kind: 'line', points: [[2, 12.0], [3, 12.3]], label: 'B: glue no help', labelAt: [2.3, 11.85], color: '#f472b6' },
          { kind: 'scatter', points: [[0, 14.0], [1, 12.5], [2, 14.0], [3, 12.5]], color: '#2dd4bf' },
          { kind: 'scatter', points: [[0, 12.0], [1, 10.5], [2, 12.0], [3, 12.3]], color: '#f472b6' },
          { kind: 'segment', from: [1.5, 10], to: [1.5, 14.6], color: '#4b5563' },
        ],
      },
    },
    {
      id: 'effects',
      kind: 'table',
      label: 'Main effects average over the other factor; an interaction says they differ by level',
      sub: 'effects in minutes, from the four cell means',
      headers: ['effect', 'additive', 'interaction'],
      values: [
        ['glue under A', '−1.5', '−1.5'],
        ['glue under B', '−1.5', '+0.3'],
        ['glue main effect', '−1.5', '−0.6: true nowhere'],
        ['setting main effect', '−2.0', '−1.1'],
        ['interaction', '0', '0.9'],
      ],
    },
  ],
  edges: [],
}
