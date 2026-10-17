import type { Section } from '../types'

export const summariesSection: Section = {
  id: 'summaries',
  title: 'Posterior summaries, credible intervals and MAP caveats',
  scene: 'bayes-summaries',
  focus: 'reading',
  slide: `## Summarising a posterior

The posterior is the whole answer. A report condenses it into a few numbers, and each one answers a different question about the defect rate.

### Point summaries
The mean 0.108, median 0.106 and mode 0.103 differ because the posterior is skewed. The mode, or MAP, maximises prior × likelihood and is the least stable: with 0 of 40 and a flat prior it is 0, while the mean is 0.024.

### Credible against confidence
- 95% credible interval: (0.064, 0.163)
- It says P(p in it | data, prior) = 0.95
- Wilson 95% confidence interval: (0.071, 0.186)
- It says the method covers p in 95% of samples

### Direct probabilities
P(p > 0.07 | data) = 0.947 answers "is the new supplier worse?" directly. It is not a p-value, and it depends on the prior chosen.`,
  narration:
    "A posterior is a whole distribution, so a report has to summarise it. Here is the informed posterior, beta sixteen, one hundred and thirty two. Its mean, median and mode are point one zero eight, point one zero six and point one zero three. They differ because the distribution is skewed to the right. The mode, also called the maximum a posteriori estimate, deserves a caveat. With zero defects in forty chairs and a flat prior, the mode is exactly zero, which suggests a perfect supplier, while the mean is point zero two four and the upper credible limit is seven percent. Reporting the mode alone hides the uncertainty. The shaded region is the ninety five percent credible interval, from point zero six four to point one six three. Its reading is direct: given the model and the prior, the rate lies in this range with probability point nine five. The Wilson confidence interval, from chapter seven, is similar in numbers but different in meaning: it describes how often the procedure covers the true rate across repeated samples. Neither reading transfers to the other. Finally, the posterior probability that the new supplier is worse than seven percent is point nine four seven, which is not a p value.",
}
