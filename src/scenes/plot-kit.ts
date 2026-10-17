import type { PlotPoint, PlotSeries } from '@graphlearning/flow'

// Small builders for the plot series every chapter repeats. Everything here computes DATA (points in
// the axes' own units) — never a position on the canvas, which stays the engine's.

export type M2 = [[number, number], [number, number]]

/** M · p for a 2×2 matrix. */
export const apply = (m: M2, p: PlotPoint): PlotPoint => [
  m[0][0] * p[0] + m[0][1] * p[1],
  m[1][0] * p[0] + m[1][1] * p[1],
]

/** A solid vector with an arrowhead — the only way this repo draws a vector. */
export function arrow(to: PlotPoint, label?: string, color?: string, from: PlotPoint = [0, 0]): PlotSeries {
  return { kind: 'segment', from, to, arrow: true, dashed: false, label, color }
}

/** The unit square, closed, as a polyline. */
export const UNIT_SQUARE: PlotPoint[] = [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]

/** The image of a closed polyline under M. */
export const image = (m: M2, pts: PlotPoint[]): PlotPoint[] => pts.map((p) => apply(m, p))

/** A circle of radius r about c, sampled closed. */
export const circle = (r = 1, c: PlotPoint = [0, 0], n = 72): PlotPoint[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const a = (2 * Math.PI * i) / n
    return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]
  })

/** n+1 evenly spaced samples of f over [a, b]. */
export const sample = (a: number, b: number, n: number, f: (x: number) => number): PlotPoint[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const x = a + ((b - a) * i) / n
    return [x, f(x)]
  })

/** Format a 2×2 or m×n matrix compactly for a table cell: [a b; c d]. */
export const fmt = (m: number[][]): string =>
  '[' + m.map((r) => r.map((v) => (Object.is(v, -0) ? 0 : v)).map((v) => String(v).replace('-', '−')).join(' ')).join('; ') + ']'

export const GREY = '#9ca3af'

const num = (v: number | string) => (typeof v === 'number' ? String(v).replace('-', '−') : v)

/**
 * An augmented matrix [A | b] as a table node. `rows` are full rows including the right-hand side;
 * `vars` names the unknowns. Row labels default to R1, R2, ….
 */
export function augmented(
  id: string,
  label: string,
  sub: string,
  rows: (number | string)[][],
  vars = ['x₁', 'x₂', 'x₃'],
  names?: string[],
) {
  return {
    id,
    kind: 'table' as const,
    label,
    sub,
    headers: ['row', ...vars.slice(0, rows[0].length - 1), '| b'],
    values: rows.map((r, i) => [names?.[i] ?? `R${i + 1}`, ...r.map(num)]),
  }
}

/** The points of the line a·x + b·y = c across x ∈ [x0, x1] (b ≠ 0), or the vertical line x = c/a. */
export function lineEq(a: number, b: number, c: number, x0: number, x1: number, y0 = -100, y1 = 100): PlotPoint[] {
  if (b === 0) return [[c / a, y0], [c / a, y1]]
  return [[x0, (c - a * x0) / b], [x1, (c - a * x1) / b]]
}

/** A plain matrix as a table node: one header per column, rows labelled R1, R2, … */
export function matrixTable(id: string, label: string, sub: string, rows: (number | string)[][], cols?: string[]) {
  const n = rows[0].length
  return {
    id,
    kind: 'table' as const,
    label,
    sub,
    headers: ['row', ...(cols ?? Array.from({ length: n }, (_, j) => `c${j + 1}`))],
    values: rows.map((r, i) => [`R${i + 1}`, ...r.map(num)]),
  }
}

/** Histogram bars as closed polygons: bar i spans [edges[i], edges[i+1]] with height heights[i]. */
export const bars = (edges: number[], heights: number[]): PlotPoint[][] =>
  heights.map((h, i) => [[edges[i], 0], [edges[i], h], [edges[i + 1], h], [edges[i + 1], 0], [edges[i], 0]])

/** Counts of xs in [edges[i], edges[i+1]), the last bin closed on the right. */
export const histogram = (xs: number[], edges: number[]): number[] =>
  edges.slice(0, -1).map((a, i) => xs.filter((x) => x >= a && (x < edges[i + 1] || (i === edges.length - 2 && x === edges[i + 1]))).length)

export const mean = (xs: number[]) => xs.reduce((s, x) => s + x, 0) / xs.length

/** Linear-interpolation quantile (numpy's default), xs need not be sorted. */
export const quantile = (xs: number[], q: number) => {
  const s = [...xs].sort((a, b) => a - b)
  const h = (s.length - 1) * q
  const lo = Math.floor(h)
  return s[lo] + (h - lo) * ((s[lo + 1] ?? s[lo]) - s[lo])
}

export const sd = (xs: number[]) => {
  const m = mean(xs)
  return Math.sqrt(xs.reduce((s, x) => s + (x - m) ** 2, 0) / (xs.length - 1))
}
