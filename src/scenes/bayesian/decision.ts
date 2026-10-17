import type { Scene } from '@graphlearning/flow'

// §11.6 — next month's 2000 chairs, £8 per defective chair. Keep the new supplier: expected cost 16 000 × E[p].
// Switch back: £300 fee + 2000 × 8 × 0.07 = £1420. Break-even p* = 1120 / 16 000 = 0.0700 + 300 / 16 000 = 0.08875.
// Posterior means from §11.5 (scipy.stats.beta): flat 0.123 → £1967, informed 0.108 → £1730, sceptical 0.075 →
// £1200. P(p > 0.08875): 0.883, 0.768, 0.046 (beta.sf).
const KEEP = 16000
const SWITCH = 300 + 2000 * 8 * 0.07
const PSTAR = SWITCH / KEEP
const MEANS: [string, number, string][] = [
  ['flat', 15 / 122, '#9ca3af'],
  ['informed', 16 / 148, '#f472b6'],
  ['sceptical', 84 / 1120, '#2dd4bf'],
]

export const decision: Scene = {
  id: 'bayes-decision',
  title: 'Expected loss and Bayesian decisions',
  flow: 'TB',
  nodes: [
    {
      id: 'loss',
      kind: 'plot',
      label: 'Expected cost of each action, as a function of the defect rate',
      sub: 'cost is linear in p, so the expected cost of keeping is 16 000 × posterior mean',
      plot: {
        x: { min: 0.04, max: 0.14, step: 0.01, label: 'defect rate p' },
        y: { min: 500, max: 2300, step: 200, label: 'expected cost next month (£)' },
        series: [
          { kind: 'line', points: [[0.04, KEEP * 0.04], [0.14, KEEP * 0.14]], label: 'keep new supplier: 16 000 p', labelAt: [0.1, 2050], color: '#fbbf24' },
          { kind: 'line', points: [[0.04, SWITCH], [0.14, SWITCH]], label: 'switch back: £1420', labelAt: [0.045, 1500], color: '#a78bfa' },
          { kind: 'segment', from: [PSTAR, 500], to: [PSTAR, SWITCH], label: `break-even p* = ${PSTAR.toFixed(5)}`, labelAt: [0.0905, 700] },
          ...MEANS.map(([name, m, color]) => ({
            kind: 'scatter' as const,
            points: [[m, KEEP * m]] as [number, number][],
            size: 7,
            color,
            label: `${name}: £${Math.round(KEEP * m)}`,
            labelAt: (m < PSTAR ? [m - 0.013, KEEP * m + 90] : [m + 0.003, KEEP * m - 110]) as [number, number],
          })),
        ],
      },
    },
    {
      id: 'choice',
      kind: 'table',
      label: 'Choose the action with the smaller posterior expected loss',
      sub: 'the decision follows the prior once the prior outweighs the data',
      headers: ['prior', 'E[p | data]', 'E[cost of keeping]', 'decision', 'P(p > p*)'],
      values: [
        ...MEANS.map(([name, m], i) => [name, m.toFixed(3), `£${Math.round(KEEP * m)}`, KEEP * m > SWITCH ? 'switch (£1420)' : 'keep', ['0.883', '0.768', '0.046'][i]]),
      ],
    },
  ],
  edges: [],
}
