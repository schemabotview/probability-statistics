import type { Section } from '../types'

export const testsSection: Section = {
  id: 'tests',
  title: 'Hypotheses, statistics and null reference distributions',
  scene: 'inf-null',
  focus: 'parts',
  slide: `## Hypothesis tests

A test asks whether the data are surprising if a **null hypothesis** H₀ is true. The **p-value** is the probability, under H₀, of a result at least as extreme as the one observed.

### Is the new supplier worse?
- H₀: p = 0.07; H₁: p > 0.07, fixed in advance
- 120 chairs inspected, 14 defective
- Under H₀, X ~ Binomial(120, 0.07), mean 8.4
- p-value = P(X ≥ 14) = 0.041, exact

### Reading it
- Small p: the data sit in H₀'s tail
- 0.041 is moderate evidence against H₀
- The normal approximation gives z = 2.00

### Watch out
The p-value is computed **assuming** H₀. It is not the probability that H₀ is true, nor that the result was "due to chance". And choosing a one-sided H₁ after seeing which way the data point halves the p-value dishonestly.`,
  narration:
    "Is the new timber supplier worse than the old one? A hypothesis test asks whether the data would be surprising if nothing had changed. That no change claim is the null hypothesis: the defect rate is still seven percent. The alternative, chosen before looking at the data, is that it has risen. A hundred and twenty chairs from the new supplier are inspected, and fourteen are defective. If the null hypothesis is true, the count follows a binomial distribution with mean eight point four, the reference distribution shown on the left. The p value is the probability, under that distribution, of a count at least as extreme as fourteen: the pink stems, adding up to about four percent. Fourteen is fairly far into the null distribution's tail, so this is moderate evidence that the rate has risen. Be precise about what a p value is. It is computed by assuming the null hypothesis is true. It is not the probability that the null is true, and not the probability that the result is due to chance. And the direction of the alternative must be fixed in advance: choosing one sided after seeing which way the data lean halves the p value without justification. Next, what a p value cannot tell you.",
}
