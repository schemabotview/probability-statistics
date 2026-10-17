import type { Scene } from '@graphlearning/flow'
import type { PlotPoint } from '@graphlearning/flow'
import { mean } from '../plot-kit'
import { JOB_CUT, JOB_TOTAL } from '../workshop'

// §4.5 — sample covariance matrix of (X, Y) for the 200 jobs, computed here (n − 1 divisor), matching
// numpy.cov: Var X 3.79, Var Y 14.29, Cov 4.75, correlation 0.645. The line is the least-squares line
// Y = a + bX with b = Cov/Var X. Uncorrelated dependence: D ~ Normal(0, 3.9²), 200 draws (seed 11):
// corr(D, D²) = 0.05 although D² is a function of D.
const mx = mean(JOB_CUT)
const my = mean(JOB_TOTAL)
const n = JOB_CUT.length
const cov = (a: number[], ma: number, b: number[], mb: number) => a.reduce((s, v, i) => s + (v - ma) * (b[i] - mb), 0) / (n - 1)
const vx = cov(JOB_CUT, mx, JOB_CUT, mx)
const vy = cov(JOB_TOTAL, my, JOB_TOTAL, my)
const cxy = cov(JOB_CUT, mx, JOB_TOTAL, my)
const r = cxy / Math.sqrt(vx * vy)
const b = cxy / vx
const PTS: PlotPoint[] = JOB_CUT.map((x, i) => [x, JOB_TOTAL[i]])

export const covariance: Scene = {
  id: 'joint-covariance',
  title: 'Covariance, correlation and the covariance matrix',
  flow: 'TB',
  nodes: [
    {
      id: 'scatter',
      kind: 'plot',
      label: `Cutting time and total time move together: correlation ${r.toFixed(3)}`,
      sub: 'covariance: E[(X − μx)(Y − μy)], positive when both are above or both below their means',
      plot: {
        x: { min: 1, max: 11, step: 1, label: 'X, cutting time (minutes)' },
        y: { min: 4, max: 24, step: 2, label: 'Y, total time (minutes)' },
        series: [
          { kind: 'scatter', points: PTS, label: '200 jobs', labelAt: [1.3, 22.8], color: '#2dd4bf' },
          { kind: 'line', points: [[1, my + b * (1 - mx)], [11, my + b * (11 - mx)]], label: `least-squares line, slope ${b.toFixed(2)}`, labelAt: [6.6, 21.6], color: '#fbbf24' },
          { kind: 'marker', at: [mx, my], label: `means (${mx.toFixed(2)}, ${my.toFixed(2)})`, labelAt: [mx + 0.25, my - 1.5], color: '#f472b6' },
        ],
      },
    },
    {
      id: 'matrix',
      kind: 'table',
      label: 'The covariance matrix Σ = [Var X  Cov; Cov  Var Y], and correlation',
      sub: 'correlation = Cov / (SD X × SD Y): unit-free, between −1 and 1, measures only linear association',
      headers: ['quantity', 'value', 'meaning'],
      values: [
        ['Var X, Var Y', `${vx.toFixed(2)}, ${vy.toFixed(2)}`, 'diagonal of Σ'],
        ['Cov(X, Y)', cxy.toFixed(2), 'off-diagonal, min²'],
        ['corr(X, Y)', r.toFixed(3), 'strong, positive, linear'],
        ['model: Y = X + independent part', 'Cov = Var X', `sample ${cxy.toFixed(2)} vs ${vx.toFixed(2)}: noise`],
        ['corr(D, D²), D symmetric', '0.05', 'uncorrelated, yet fully dependent'],
      ],
    },
  ],
  edges: [],
}
