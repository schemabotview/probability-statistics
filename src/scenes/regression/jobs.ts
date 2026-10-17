// Chapter 10's dataset, not a scene: 60 jobs (numpy seed 50) with the number of parts, the wood (oak = 1,
// pine = 0) and the processing time in minutes, generated as 4 + 0.9 × parts + 2.5 × oak + Normal(0, 2²).
// WEIGHT (kg, seed 51) is 0.5 × parts + Normal(0, 0.3²): almost a copy of parts, for §10.3.
export const PARTS = [17, 17, 16, 18, 18, 13, 8, 20, 18, 8, 8, 14, 15, 5, 20, 13, 4, 10, 15, 8, 15, 20, 14, 10, 7, 9, 15, 6, 20, 5, 9, 20, 13, 13, 11, 19, 13, 4, 17, 14, 6, 11, 13, 10, 20, 16, 8, 5, 13, 8, 19, 8, 15, 11, 7, 9, 11, 17, 6, 12]
export const OAK = [0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]
export const TIME = [19.4, 24.6, 22.8, 19.7, 18.3, 16.5, 14.6, 21.8, 21.8, 9.4, 11.0, 15.4, 22.3, 8.0, 25.1, 20.2, 9.4, 16.2, 15.0, 13.0, 20.2, 24.2, 14.0, 10.8, 8.3, 9.9, 23.4, 9.7, 24.2, 9.6, 14.0, 23.3, 20.3, 16.9, 13.6, 21.9, 12.6, 5.2, 19.0, 15.8, 7.5, 12.3, 17.5, 16.6, 23.7, 21.9, 13.8, 10.5, 18.3, 10.8, 24.0, 12.7, 18.3, 15.8, 8.1, 12.4, 15.9, 22.2, 7.3, 14.9]
export const WEIGHT = [8.33, 8.31, 8.02, 9.38, 8.9, 6.17, 3.76, 10.53, 8.89, 3.64, 3.91, 7.09, 7.59, 3.06, 9.94, 6.04, 2.45, 5.09, 7.59, 3.8, 7.19, 10.47, 6.54, 4.81, 3.16, 4.93, 7.6, 2.79, 10.21, 3.08, 4.21, 9.73, 6.62, 6.57, 5.16, 9.31, 6.49, 2.26, 8.05, 7.2, 3.15, 6.12, 5.78, 4.9, 9.88, 8.46, 3.65, 2.33, 6.58, 4.19, 9.65, 3.61, 8.1, 5.29, 3.64, 4.8, 5.39, 8.67, 2.54, 5.96]

/** Simple least squares y = a + b x, with residual SD s (n − 2 df), x̄ and Sxx for interval formulas. */
export function fitLine(x: number[], y: number[]) {
  const n = x.length
  const mx = x.reduce((a, v) => a + v, 0) / n
  const my = y.reduce((a, v) => a + v, 0) / n
  const sxx = x.reduce((a, v) => a + (v - mx) ** 2, 0)
  const b = x.reduce((a, v, i) => a + (v - mx) * (y[i] - my), 0) / sxx
  const a = my - b * mx
  const rss = x.reduce((acc, v, i) => acc + (y[i] - a - b * v) ** 2, 0)
  const s = Math.sqrt(rss / (n - 2))
  const tss = y.reduce((acc, v) => acc + (v - my) ** 2, 0)
  return { a, b, s, mx, sxx, n, r2: 1 - rss / tss, seB: s / Math.sqrt(sxx) }
}
