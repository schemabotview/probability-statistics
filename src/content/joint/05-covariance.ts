import type { Section } from '../types'

export const covarianceSection: Section = {
  id: 'covariance',
  title: 'Covariance, correlation and covariance-matrix interpretation',
  scene: 'joint-covariance',
  focus: 'matrix',
  slide: `## Covariance and correlation

**Covariance** Cov(X, Y) = E[(X − μx)(Y − μy)] is positive when the variables tend to be high together. **Correlation** rescales it to lie between −1 and 1.

### Cutting time and total time
- Var X = 3.79, Var Y = 14.29, Cov = 4.75 (min²)
- Correlation 0.645: strong, positive
- Least-squares slope Cov/Var X = 1.25
- Model Y = X + independent: Cov = Var X in theory

### The covariance matrix
- Σ = [Var X  Cov; Cov  Var Y], symmetric
- Diagonal: each variable's spread
- Off-diagonal: how they move together

### Watch out
Correlation measures **linear** association only. For a deviation D symmetric about 0, D² is completely determined by D, yet corr(D, D²) is about 0. Zero correlation does not mean independence.`,
  narration:
    "How strongly do two quantities move together? Covariance measures it: the expected product of their deviations from their means. When both tend to be above their means together, or below together, the products are positive and so is the covariance. Correlation divides by both standard deviations, giving a unit free number between minus one and one. For the two hundred jobs, cutting time has variance three point eight, total time fourteen point three, and their covariance is about four point eight square minutes. The correlation is about zero point six five: a strong positive linear association, visible in the scatter on the left. The least squares line has slope equal to covariance over the variance of X, about one point two five. Arrange the variances and covariance in a square and you have the covariance matrix: spreads on the diagonal, joint movement off it. In this model the total is cutting time plus an independent finishing time, so in theory the covariance equals the variance of X; the sample's gap is sampling noise. A crucial limit: correlation sees only straight line association. A deviation and its square are completely dependent, yet their correlation is about zero. Next, what dependence does to totals.",
}
