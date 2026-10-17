import type { Section } from '../types'

export const sensitivitySection: Section = {
  id: 'sensitivity',
  title: 'Prior and predictive checks and sensitivity',
  scene: 'bayes-sensitivity',
  focus: 'table',
  slide: `## How much does the prior matter?

A prior is an assumption, and like any assumption it should be stated, checked against data, and varied to see whether the conclusion survives.

### Sensitivity analysis
- Flat: mean 0.123, P(p > 0.07) = 0.978
- Informed Beta(2, 26): 0.108, and 0.947
- Sceptical Beta(70, 930): 0.075, and 0.731
- Worth 1000 earlier chairs, it barely moves

### Prior predictive check
Before seeing the data, the sceptical prior expects 8.4 ± 3.0 defectives in 120 chairs; only 5% of its predictions reach 14. A prior that finds the observed data surprising deserves scrutiny.

### Reporting
Show the conclusion under several reasonable priors. Here every prior favours "worse than 7%", but how strongly depends on how much weight the old supplier’s history is given.`,
  narration:
    "A prior is an assumption, so treat it like one: state it, check it, and vary it. On the left, the same fourteen defectives in one hundred and twenty are combined with three priors. The flat prior and the light informed prior give posterior means of point one two three and point one zero eight. The third prior is sceptical: beta seventy, nine hundred and thirty, as if a thousand earlier chairs had shown exactly seven percent. That prior hardly moves. Its posterior mean is point zero seven five, and the probability that the supplier is worse falls from about point nine five to point seven three. Is such a prior reasonable? A prior predictive check asks what data the prior expected before seeing any. The sceptical prior expects eight point four defectives in one hundred and twenty, give or take three, and gives only about five percent probability to fourteen or more. The observed data sit in its tail, which suggests the old supplier's history may not describe the new one. A sensitivity analysis reports the conclusion under several priors. Here they all lean towards worse, but the strength of that conclusion depends on how much the old history is trusted.",
}
