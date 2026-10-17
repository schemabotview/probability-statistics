import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §9.5 — overlap in the observational month: share of each product run on setting B. Chairs 100/400 = 25%,
// tables 300/400 = 75% (chapter 1 counts). Stools (an added contrast) were never run on B: 0 of 100, so no
// data can say how stools fare under B. Exact proportions.
const SHARE: PlotPoint[] = [[1, 25], [2, 75], [3, 0]]

export const assumptions: Scene = {
  id: 'exp-assumptions',
  title: 'Consistency, overlap, exchangeability and interference',
  flow: 'TB',
  nodes: [
    {
      id: 'overlap',
      kind: 'plot',
      label: 'Overlap: how often each product was run on setting B',
      sub: 'a causal comparison needs both settings within every group; stools never ran on B',
      plot: {
        x: { min: 0.4, max: 3.6, step: 1, label: 'product: 1 chair, 2 table, 3 stool' },
        y: { min: 0, max: 100, step: 10, label: 'share run on setting B (%)' },
        series: [
          ...SHARE.map((p) => ({ kind: 'line' as const, points: [[p[0] - 0.25, 0], [p[0] - 0.25, p[1]], [p[0] + 0.25, p[1]], [p[0] + 0.25, 0]] as PlotPoint[], color: p[1] === 0 ? '#f472b6' : '#2dd4bf' })),
          { kind: 'marker', at: [3, 2], label: 'stools: 0 of 100, no overlap', labelAt: [2.45, 8], color: '#f472b6' },
          { kind: 'marker', at: [1, 27], size: 0, label: '25%', labelAt: [0.9, 29], color: '#2dd4bf' },
          { kind: 'marker', at: [2, 77], size: 0, label: '75%', labelAt: [1.9, 79], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'conditions',
      kind: 'table',
      label: 'Four assumptions behind a causal reading',
      sub: 'randomisation secures exchangeability by design; the others still need checking',
      headers: ['assumption', 'means', 'workshop risk'],
      values: [
        ['consistency', '"setting B" is one well-defined treatment', 'B run at two different speeds'],
        ['overlap', 'every group can get either setting', 'stools never on B'],
        ['exchangeability', 'no unmeasured confounding', 'operators pick B for hard jobs'],
        ['no interference', 'one batch’s setting does not affect another', 'a shared kiln runs hotter'],
      ],
    },
  ],
  edges: [],
}
