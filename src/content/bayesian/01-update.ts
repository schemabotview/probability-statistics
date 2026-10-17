import type { Section } from '../types'

export const updateSection: Section = {
  id: 'update',
  title: 'Prior, likelihood, posterior and marginal likelihood',
  scene: 'bayes-update',
  focus: 'bayes-table',
  slide: `## Updating belief with Bayes’ rule

Bayesian inference treats the unknown defect rate as uncertain and describes that uncertainty with a probability distribution. Data update it by the same rule as chapter 2’s screening test.

### Four ingredients
- **Prior**: belief about p before the data
- **Likelihood**: P(data | p), from the model
- **Marginal likelihood**: P(data), the prior average
- **Posterior** = prior × likelihood ÷ marginal

### Three hypotheses about the new supplier
Prior 0.25 / 0.50 / 0.25 on p = 0.04, 0.07, 0.10. Seeing 14 defective in 120 chairs, the likelihoods are 0.0002, 0.021 and 0.095. The marginal likelihood is 0.034, and the posterior becomes 0.002 / 0.304 / 0.694.

### What changed
The data were twenty times likelier under "worse" than under "better", so belief moved from "same" to "worse". The posterior is a probability about p given the model and the prior, not a long-run rate of a procedure.`,
  narration:
    "This chapter explains posterior learning and distinguishes its interpretations from frequentist procedures. The idea is to describe uncertainty about a parameter itself with a probability distribution, and to update it with data using Bayes' rule, exactly as the screening test was updated in chapter two. Take the new chair supplier from chapter seven, with fourteen defective chairs in a sample of one hundred and twenty. Suppose, before inspecting, the workshop considered three possibilities: the new supplier is better, at four percent, the same, at seven percent, or worse, at ten percent, with prior probabilities one quarter, one half, and one quarter. The likelihood is the binomial probability of fourteen in one hundred and twenty under each rate: about two in ten thousand, two percent, and nine and a half percent. Multiply each prior by its likelihood and add; that total, point zero three four, is the marginal likelihood, the probability of the data averaged over the prior. Dividing by it gives the posterior: almost no belief left in better, thirty percent on same, and seventy percent on worse. The posterior is a statement about the rate, given a model and a prior.",
}
