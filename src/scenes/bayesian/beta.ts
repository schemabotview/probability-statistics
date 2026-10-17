import { lgamma } from '../random-variables/dist'

// Beta and beta-binomial helpers for chapter 11, exact via log-gamma (not a scene).
export const lbeta = (a: number, b: number) => lgamma(a) + lgamma(b) - lgamma(a + b)
export const betaPdf = (a: number, b: number) => (p: number) =>
  p <= 0 || p >= 1 ? 0 : Math.exp((a - 1) * Math.log(p) + (b - 1) * Math.log(1 - p) - lbeta(a, b))
export const lchoose = (n: number, k: number) => lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1)
export const binomPmf = (n: number, p: number) => (k: number) => Math.exp(lchoose(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p))
export const betaBinomPmf = (n: number, a: number, b: number) => (k: number) => Math.exp(lchoose(n, k) + lbeta(k + a, n - k + b) - lbeta(a, b))

/** The new supplier's inspection: 14 defective in 120 chairs (chapter 7). */
export const X = 14
export const N = 120
