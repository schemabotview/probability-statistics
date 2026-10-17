import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { sample } from '../plot-kit'
import { betaPdf } from './beta'

// §11.3 — posterior Beta(16, 132) (informed prior): mean 0.108, median 0.106, mode (MAP) 0.103, 95% equal-tail
// credible interval (0.064, 0.163), P(p > 0.07) = 0.947 (scipy.stats.beta). Frequentist Wilson 95% CI for
// 14/120: (0.071, 0.186). Zero defects in 40 with a flat prior: Beta(1, 41), MAP 0, mean 0.024, 95% upper 0.070.
const f = betaPdf(16, 132)
const LO = 0.0635
const HI = 0.1627
const band: PlotPoint[] = [[LO, 0], ...sample(LO, HI, 80, f), [HI, 0], [LO, 0]]

export const summaries: Scene = {
  id: 'bayes-summaries',
  title: 'Posterior summaries, credible intervals and MAP caveats',
  flow: 'TB',
  nodes: [
    {
      id: 'posterior',
      kind: 'plot',
      label: 'Posterior for the new supplier’s defect rate, Beta(16, 132)',
      sub: 'shaded: the 95% credible interval, 0.064 to 0.163; P(p > 0.07) = 0.95',
      plot: {
        x: { min: 0.02, max: 0.22, step: 0.02, label: 'defect rate p' },
        y: { min: 0, max: 17, step: 2, label: 'posterior density' },
        series: [
          { kind: 'area', points: band, color: '#f472b6' },
          { kind: 'line', points: sample(0.02, 0.22, 200, f), color: '#f472b6' },
          { kind: 'segment', from: [0.103, 0], to: [0.103, f(0.103)], dashed: false, label: 'mode (MAP) 0.103', labelAt: [0.12, 15.5], color: '#fbbf24' },
          { kind: 'segment', from: [0.108, 0], to: [0.108, f(0.108)], label: 'mean 0.108', labelAt: [0.12, 14], color: '#2dd4bf' },
          { kind: 'segment', from: [0.07, 0], to: [0.07, 6], label: 'old rate 0.07', labelAt: [0.032, 6.4], color: '#9ca3af' },
        ],
      },
    },
    {
      id: 'reading',
      kind: 'table',
      label: 'Posterior summaries and how they differ from frequentist ones',
      sub: 'a credible interval is a probability statement about p, given the prior and the model',
      headers: ['summary', 'value', 'reading'],
      values: [
        ['posterior mean / median / mode', '0.108 / 0.106 / 0.103', 'skewed: they differ'],
        ['95% credible interval', '(0.064, 0.163)', 'P(p in it | data) = 0.95'],
        ['Wilson 95% confidence interval', '(0.071, 0.186)', 'covers p in 95% of samples'],
        ['P(new supplier worse than 0.07)', '0.947', 'a direct answer'],
        ['0 of 40, flat prior: MAP', '0, mean 0.024', 'MAP alone hides the uncertainty'],
      ],
    },
  ],
  edges: [],
}
