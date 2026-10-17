// Small exact distribution helpers for chapter 3 (no sampling): pmfs by direct formula.
export const choose = (n: number, k: number): number => (k < 0 || k > n ? 0 : k === 0 ? 1 : (choose(n, k - 1) * (n - k + 1)) / k)
export const binom = (n: number, p: number) => (k: number) => choose(n, k) * p ** k * (1 - p) ** (n - k)
export const hyper = (N: number, K: number, n: number) => (k: number) => (choose(K, k) * choose(N - K, n - k)) / choose(N, n)
export const poisson = (lam: number) => (k: number): number => (k === 0 ? Math.exp(-lam) : (poisson(lam)(k - 1) * lam) / k)
export const normalPdf = (m: number, s: number) => (x: number) => Math.exp(-(((x - m) / s) ** 2) / 2) / (s * Math.sqrt(2 * Math.PI))
export const lognormPdf = (median: number, s: number) => (x: number) =>
  x <= 0 ? 0 : Math.exp(-(Math.log(x / median) ** 2) / (2 * s * s)) / (x * s * Math.sqrt(2 * Math.PI))

/** log Γ(z) by the Lanczos approximation (g = 7, 9 terms), accurate to ~1e-15 for z > 0. */
export const lgamma = (z: number): number => {
  const g = 7
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lgamma(1 - z)
  z -= 1
  let x = c[0]
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i)
  const t = z + g + 0.5
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x)
}
export const gammaPdf = (shape: number, scale: number) => (x: number) =>
  x <= 0 ? 0 : Math.exp((shape - 1) * Math.log(x) - x / scale - lgamma(shape) - shape * Math.log(scale))
