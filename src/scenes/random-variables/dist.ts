// Small exact distribution helpers for chapter 3 (no sampling): pmfs by direct formula.
export const choose = (n: number, k: number): number => (k < 0 || k > n ? 0 : k === 0 ? 1 : (choose(n, k - 1) * (n - k + 1)) / k)
export const binom = (n: number, p: number) => (k: number) => choose(n, k) * p ** k * (1 - p) ** (n - k)
export const hyper = (N: number, K: number, n: number) => (k: number) => (choose(K, k) * choose(N - K, n - k)) / choose(N, n)
export const poisson = (lam: number) => (k: number): number => (k === 0 ? Math.exp(-lam) : (poisson(lam)(k - 1) * lam) / k)
export const normalPdf = (m: number, s: number) => (x: number) => Math.exp(-(((x - m) / s) ** 2) / 2) / (s * Math.sqrt(2 * Math.PI))
export const lognormPdf = (median: number, s: number) => (x: number) =>
  x <= 0 ? 0 : Math.exp(-(Math.log(x / median) ** 2) / (2 * s * s)) / (x * s * Math.sqrt(2 * Math.PI))
