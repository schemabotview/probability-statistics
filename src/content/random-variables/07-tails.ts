import type { Section } from '../types'

export const tailsSection: Section = {
  id: 'tails',
  title: 'Quantiles, tails, moment existence and mixed distributions',
  scene: 'rv-tails',
  focus: 'running',
  slide: `## Quantiles, tails and moments

The **q-quantile** is a value with probability q below it. Every distribution has quantiles; not every distribution has a mean or a variance.

### When moments fail
- Pareto tail: P(X > x) = x⁻ᵅ for x ≥ 1
- α = 3: mean 1.5, finite variance: settles
- α = 1.5: mean 3, infinite variance: slow
- α = 1: no mean at all: keeps jumping

### A mixed distribution: repair cost
- 93% of chairs cost £0: a point mass
- The rest: lognormal cost, median £25
- Median £0, 95th percentile £17.80, 99th £47.44
- Mean £2.10: neither typical nor rare

### Watch out
A sample mean always exists, even when the population mean does not. Computing it says nothing about whether it estimates anything; check the tail first.`,
  narration:
    "Does every distribution have a mean? No, and this matters more than it sounds. A quantile always exists: the value with a given share of probability below it. A mean exists only if the tail thins out fast enough. Pareto distributions make this concrete: the chance of exceeding x falls like x to the minus alpha. On the left are running means of a hundred thousand simulated draws for three tail indices. With alpha three, the running mean settles at one point five. With alpha one point five, the mean is three but the variance is infinite, and the running mean wanders before settling. With alpha one, there is no mean at all, and the running mean keeps jumping upward whenever a huge draw arrives, however many draws you take. Every sample has a mean; whether it estimates anything depends on the tail. Distributions can also be mixed. Repair cost per chair is zero for the ninety three percent that pass, a point mass, and a continuous cost for the rest. Its median is zero, its ninety fifth percentile about eighteen pounds, and its mean two pounds ten. Which summary to report depends on the question. Next, distributions that inference relies on.",
}
