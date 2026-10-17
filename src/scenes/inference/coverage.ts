import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'

// §7.1 — 40 samples of n = 30 seat heights, Normal(450, 3.9²) (numpy seed 20), each with a 95% t-interval
// x̄ ± t₀.₉₇₅,₂₉ s/√30. 35 of these 40 cover μ = 450 (samples 10, 15, 28, 32, 33 miss). Over 10 000 samples
// (seed 21) the coverage is 0.9523: the 95% describes the procedure, not any one interval.
const LO = [447.36, 447.64, 447.06, 448.55, 447.99, 447.55, 448.84, 447.62, 448.65, 446.98, 448.09, 448.8, 449.4, 447.18, 450.46, 448.96, 447.4, 447.44, 447.55, 448.41, 449.84, 448.91, 447.95, 448.47, 448.5, 449.57, 449.0, 447.03, 449.27, 447.95, 447.9, 447.03, 446.75, 448.6, 448.34, 449.21, 448.51, 448.2, 447.39, 447.19]
const HI = [450.38, 451.13, 450.4, 452.13, 450.67, 450.05, 451.85, 450.28, 451.19, 449.72, 451.22, 452.34, 452.56, 450.5, 452.56, 451.4, 450.24, 450.55, 450.22, 451.08, 452.3, 451.47, 451.4, 451.52, 451.67, 452.01, 452.24, 449.86, 452.09, 451.69, 450.48, 449.54, 449.41, 451.59, 451.6, 451.92, 451.73, 451.24, 450.63, 450.61]
const covers = (i: number) => LO[i] < 450 && HI[i] > 450

export const coverage: Scene = {
  id: 'inf-coverage',
  title: 'Frequentist coverage',
  flow: 'TB',
  nodes: [
    {
      id: 'intervals',
      kind: 'plot',
      label: '40 samples of 30 chairs, each with its own 95% interval for the mean seat height',
      sub: 'the true mean 450 is fixed; the intervals move. Pink: the 5 of 40 that miss it',
      plot: {
        x: { min: 446, max: 453.5, step: 0.5, label: 'seat height (mm)' },
        y: { min: 0, max: 41, step: 5, label: 'sample number' },
        series: [
          ...LO.map((lo, i) => ({ kind: 'segment' as const, from: [lo, i + 1] as PlotPoint, to: [HI[i], i + 1] as PlotPoint, dashed: false, color: covers(i) ? '#2dd4bf' : '#f472b6' })),
          { kind: 'segment', from: [450, 0], to: [450, 41], label: 'μ = 450', labelAt: [450.1, 40.3], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'meaning',
      kind: 'table',
      label: 'What “95% confidence” promises',
      sub: 'a property of the method across repeated samples, under its assumptions',
      headers: ['statement', 'correct?', 'why'],
      values: [
        ['95% of such intervals cover μ', 'yes', '0.952 over 10 000 samples'],
        ['this sample: 35 of 40 covered', 'yes', 'chance variation around 38'],
        ['P(μ in this interval) = 0.95', 'no', 'μ is fixed: it is in or out'],
        ['assumes', 'random sample, normal-ish data', 'otherwise the 95% may be wrong'],
      ],
    },
  ],
  edges: [],
}
