import type { Section } from '../types'

export const goodnessOfFitSection: Section = {
  id: 'goodness-of-fit',
  title: 'Goodness of fit and estimated-parameter degrees of freedom',
  scene: 'cmp-gof',
  focus: 'test',
  slide: `## Goodness of fit

A **goodness-of-fit** test compares observed category counts with those a model predicts. Each parameter **estimated from the data** costs one degree of freedom.

### Flaws on 200 panels
- Mean 1.435 flaws, variance 2.62
- A Poisson model needs mean = variance
- Fitted Poisson(1.435) over cells 0, 1, …, 6+
- χ² = 50.1: far from the fit

### Degrees of freedom
- 7 cells − 1 − 1 estimated λ = 5 df: p = 1.3 × 10⁻⁹
- Too few 2-flaw panels; too many 0 and 6+
- Flaws cluster: some panels come from bad sheets

### Watch out
Using 6 df would ignore that λ was fitted to these same data, which makes any fit look better than it is. And a sparse tail cell (expected 0.7) should be pooled or simulated, not trusted to the χ² approximation.`,
  narration:
    "Does the Poisson model of chapter three actually describe flaws on panels? A goodness of fit test compares the observed count in each category with the count the model predicts. Two hundred panels were inspected. They average one point four three flaws, but the variance is two point six two, much larger than the mean, which already warns against a Poisson, since a Poisson's variance equals its mean. Fit a Poisson with that mean anyway, and compare. On the left, the bars are observed panels and the dots are the Poisson's expected counts. There are too many flawless panels, too few with two flaws, and far too many with six or more. The chi square statistic is about fifty. The degrees of freedom need care. There are seven categories, so start from six, then subtract one more because the Poisson's mean was estimated from these same data, which pulls the fit closer than a model fixed in advance would be. Five degrees of freedom, and a p value of about one in a billion: the Poisson is clearly wrong. The likely reason is clustering, with some panels cut from bad sheets. And the six or more cell, expected under one, should be pooled or simulated. Next, comparing several groups at once.",
}
