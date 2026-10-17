import type { Section } from '../types'

export const coverageSection: Section = {
  id: 'coverage',
  title: 'Frequentist coverage and compatible interval and test procedures',
  scene: 'inf-coverage',
  focus: 'meaning',
  slide: `## Confidence intervals and coverage

A **95% confidence interval** comes from a procedure that, over repeated samples, captures the true parameter 95% of the time. That long-run rate is its **coverage**.

### Forty samples of 30 chairs
- True mean seat height μ = 450 mm, fixed
- Each sample gives its own t-interval
- 35 of these 40 cover 450; 5 miss
- Over 10 000 samples: 95.2% cover

### Intervals and tests agree
- A 95% interval holds the values of μ that a 5% test would not reject
- Same assumptions, same data, one procedure

### Watch out
After the data are in, a particular interval either contains μ or it does not. "95% probability that μ is in (448.1, 451.2)" is a Bayesian statement, which needs a prior (chapter 11); the frequentist 95% describes the method.`,
  narration:
    "This chapter builds intervals and tests, and keeps clear what each one claims, so that a threshold never substitutes for reasoning. Start with what confidence means. On the left, forty samples of thirty chairs each, from a population whose mean seat height is exactly four hundred and fifty millimetres. Each sample produces its own ninety five percent interval. The true mean never moves; the intervals do. Thirty five of these forty cover four hundred and fifty, and five, in pink, miss it. Over ten thousand such samples, ninety five point two percent cover it. That long run success rate is the interval's coverage, and it is what ninety five percent confidence means: a property of the procedure, under its assumptions. Intervals and tests are two views of the same procedure: a ninety five percent interval contains exactly the parameter values that a five percent test would not reject. A common misreading is to say there is a ninety five percent probability that the mean lies in a particular interval. Once computed, the interval either contains the fixed mean or it does not. A probability statement about the parameter itself needs a prior distribution, which is the Bayesian approach of chapter eleven. Next, intervals for a mean.",
}
