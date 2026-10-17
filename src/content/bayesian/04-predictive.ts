import type { Section } from '../types'

export const predictiveSection: Section = {
  id: 'predictive',
  title: 'Posterior predictive uncertainty',
  scene: 'bayes-predictive',
  focus: 'compare',
  slide: `## Predicting the next batch

The question the workshop actually faces is about future chairs, not the parameter. The posterior predictive averages the model’s forecast over every plausible defect rate.

### The predictive distribution
P(future) = ∫ P(future | p) × posterior(p) dp. For 50 chairs with a Beta(16, 132) posterior, it is a beta-binomial distribution with mean 5.41 defectives.

### Two forecasts, same mean
- Plug-in binomial, p = 0.108: variance 4.82
- Posterior predictive: variance 6.41
- P(10 or more): 0.039 plug-in, 0.064 predictive
- The tail risk is nearly doubled

### Why it matters
Plugging in a point estimate treats p as known and understates the spread of what will happen. The predictive carries both the sampling variation of a batch and the remaining uncertainty about p.`,
  narration:
    "The workshop's real question is often about future chairs rather than the defect rate itself. How many of the next fifty chairs will be defective? A tempting shortcut is to plug in the estimate, point one zero eight, and use a binomial distribution. That treats the rate as known. The Bayesian answer averages the binomial forecast over the posterior: for each plausible rate, weight its forecast by how plausible the rate is. With a beta posterior, the result is a beta binomial distribution. On the left, pink shows the predictive and grey the plug in. Both have the same mean, five point four defectives in fifty. But the predictive is wider, with variance six point four against four point eight, because it includes the uncertainty about the rate as well as the chance variation of a batch. The difference shows in the tail. The probability of ten or more defectives is about four percent under the plug in, but six and a half percent under the predictive. If ten defectives in a batch triggers a costly recall, the plug in understates that risk by nearly half. Forecasts should carry parameter uncertainty forward.",
}
