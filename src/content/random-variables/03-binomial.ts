import type { Section } from '../types'

export const binomialSection: Section = {
  id: 'binomial',
  title: 'Bernoulli, binomial and hypergeometric sampling',
  scene: 'rv-binomial',
  focus: 'compare',
  slide: `## Binomial and hypergeometric

A **Bernoulli** trial is one yes/no outcome with P(yes) = p. The **binomial** counts yeses in n independent trials with the same p: P(k) = C(n, k) pᵏ(1 − p)ⁿ⁻ᵏ.

### Assumptions behind the binomial
- A fixed number of trials n
- Each trial the same probability p
- Trials independent of one another

### Sampling 5 from a batch of 20
- Without replacement the draws are dependent
- Exact model: hypergeometric, P(k) = C(3, k)C(17, 5 − k)/C(20, 5)
- Both have mean 5 × 3/20 = 0.75
- Variance 0.503 versus binomial 0.638

### Watch out
The binomial is a good approximation when the sample is a small fraction of the population: the correction factor (N − n)/(N − 1) is 15/19 here, but 0.999 for 5 chairs from 6000.`,
  narration:
    "Which model fits a count of defectives in a sample? Start with a Bernoulli trial: one inspection, defective or not, with probability p. The binomial distribution counts the defectives in n such trials, and it rests on three assumptions: a fixed number of trials, the same probability every time, and independence between trials. Drawing chairs from a large production run comes close. Drawing from a small batch does not. Take five chairs from the batch of twenty that contains three defective. Without replacement, each draw changes the batch, so the draws are dependent, and the exact model is the hypergeometric: count subsets, as in chapter two. On the left, the two models side by side. They agree on the mean, five times three twentieths, zero point seven five. But the hypergeometric is less spread out, with variance zero point five against zero point six four, because sampling without replacement cannot keep hitting the same defective chairs. The ratio is the finite population correction, fifteen nineteenths. When the sample is a small fraction of the population, like five chairs from six thousand, the correction is nearly one, and the binomial is an excellent approximation. Next, waiting times and rare counts.",
}
