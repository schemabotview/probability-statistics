import type { Section } from '../types'

export const summariesSection: Section = {
  id: 'summaries',
  title: 'Information retained by summaries and regularity limits',
  scene: 'est-summaries',
  focus: 'sufficient',
  slide: `## What summaries keep

A statistic is **sufficient** for a parameter if, under the model, it carries all the information the sample has about it. Other summaries can discard some.

### Sufficient summaries
- Bernoulli: the count of defectives; which chairs failed adds nothing
- Normal: the mean and variance together
- Uniform(0, θ): the largest value

### Efficiency
- Normal seat heights, n = 25: SD of mean 0.78
- SD of median 0.97: variance 1.55 times larger
- The median keeps about 65% of the information
- It pays that price for resistance to outliers

### Chapter outcome
You can construct estimators and likelihoods, compare their bias, variance and MSE, and recognise identification failures and boundary or regularity problems where the usual approximations break.`,
  narration:
    "How much does a summary throw away? A statistic is sufficient if, under the model, it carries all the information the sample has about the parameter. For inspections, the count of defectives is sufficient: two samples with the same count give identical likelihoods, whichever chairs failed. For normal data, the sample mean and variance together are sufficient. Other summaries can lose information. On the left, the sample mean and the sample median of twenty five normal seat heights, each over twenty thousand samples. Both centre on the true value, but the median is more spread out: its variance is about one and a half times the mean's, so it uses only about sixty five percent of the available information. It pays that price for resistance to outliers, a trade worth making when the normal model is doubtful. Sufficiency is always relative to a model, so keeping the full data matters when the model might be wrong. And some models break the usual regularity conditions: for a uniform distribution the maximum likelihood estimate is the sample maximum, which is biased and not normally distributed even in large samples. That completes the chapter. Next, a point estimate needs a calibrated statement of uncertainty and evidence.",
}
