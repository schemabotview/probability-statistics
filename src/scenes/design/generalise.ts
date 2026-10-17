import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { WEEKLY_DEFECTS, WEEKLY_N } from '../workshop'

// §1.8 — weekly defect proportions, 500 chairs a week (numpy seed 8, binomial with p = 0.07 to week 6 and
// 0.10 from week 7, when the timber supplier changed). Weeks 1–4: 131/2000 = 6.55%; weeks 7–12:
// 316/3000 = 10.53%.
const W: PlotPoint[] = WEEKLY_DEFECTS.map((d, i) => [i + 1, (100 * d) / WEEKLY_N])

export const generalise: Scene = {
  id: 'design-generalise',
  title: 'Ethics and the limits of generalisation',
  flow: 'TB',
  nodes: [
    {
      id: 'drift',
      kind: 'plot',
      label: 'Weekly defect rate: a study in weeks 1–4, a new supplier from week 7',
      sub: 'the study estimated 6.55%; after the change the rate is 10.53%: the population moved',
      plot: {
        x: { min: 0.5, max: 12.5, step: 1, label: 'week' },
        y: { min: 0, max: 14, step: 2, label: 'defect rate (%)' },
        series: [
          { kind: 'area', points: [[0.5, 14], [4.5, 14]], color: '#2dd4bf' },
          { kind: 'segment', from: [6.5, 0], to: [6.5, 14], label: 'supplier changed', labelAt: [6.65, 1.2], color: '#f472b6' },
          { kind: 'line', points: W, color: '#9ca3af' },
          { kind: 'scatter', points: W, label: 'weekly rate', labelAt: [9.6, 12.7], color: '#fbbf24' },
          { kind: 'line', points: [[0.5, 6.55], [4.5, 6.55]], label: 'study: 6.55%', labelAt: [1.4, 4.9], color: '#2dd4bf' },
        ],
      },
    },
    {
      id: 'claims',
      kind: 'table',
      label: 'Which conclusions the weeks 1–4 study supports',
      sub: 'and what collecting it ethically required',
      headers: ['claim or practice', 'verdict', 'why'],
      values: [
        ['defect rate in weeks 1–4 was about 6.5%', 'supported', 'random sample of that period'],
        ['the rate is about 6.5% now', 'not supported', 'supplier changed in week 7'],
        ['night shift is as good as day shift', 'not supported', 'night shift was not sampled'],
        ['inspector names in the shared file', 'not acceptable', 'consent, privacy, no need'],
      ],
    },
  ],
  edges: [],
}
