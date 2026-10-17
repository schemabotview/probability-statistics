import type { Section } from '../types'

export const transformationsSection: Section = {
  id: 'transformations',
  title: 'Transformations, CDF methods and Jacobian factors',
  scene: 'samp-transform',
  focus: 'method',
  slide: `## Distributions of transformed quantities

If Y = g(X), the distribution of Y follows from that of X. The **CDF method** works directly with P(Y ≤ y); for a monotone g, densities pick up a **Jacobian factor** |dx/dy|.

### From uniform to exponential
- U uniform on (0, 1); set X = −40 ln U
- P(X > x) = P(U < e^(−x/40)) = e^(−x/40)
- So X is exponential with mean 40
- This is how simulators make exponential draws

### The density method
- f_Y(y) = f_X(x) × |dx/dy|, with x = g⁻¹(y)
- The factor accounts for stretching of the axis
- Same answer: (1/40) e^(−x/40)

### Watch out
Densities do not transform like values: f_Y(y) ≠ f_X(g⁻¹(y)) without the Jacobian. A 2000-draw check gives mean 39.4 and P(X > 60) = 0.218 against the exact 40 and 0.223.`,
  narration:
    "This chapter explains how probability models determine the behaviour of statistics over repeated samples, and how simulation can investigate a model when formulas run out. The first tool is transformation. If a quantity Y is a function of X, its distribution follows from X's. The most reliable route is the CDF method: write the probability that Y is at most y in terms of X, and work it out. Take a uniform random number U between zero and one, and set X equal to minus forty times the log of U. X exceeds x exactly when U is below e to the minus x over forty, which has probability e to the minus x over forty. That is the exponential distribution with mean forty, the stoppage model from chapter three. This inverse CDF trick is how simulators turn uniform random numbers into draws from other distributions. On the left, two thousand such draws, matching the derived density. For monotone functions there is also a density shortcut, but it needs a Jacobian factor: the derivative that measures how the transformation stretches the axis. Leaving it out is the most common error in transforming densities. Next, the distribution of a statistic across samples.",
}
