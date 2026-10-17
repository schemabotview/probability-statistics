import type { Section } from '../types'

export const expectationSection: Section = {
  id: 'expectation',
  title: 'Expectation, transformations of quantities and variance',
  scene: 'rv-expectation',
  focus: 'rules',
  slide: `## Expectation and variance

The **expectation** E[X] = Σ x P(X = x) is the long-run average and the distribution's balance point. The **variance** Var(X) = E[(X − E[X])²] measures spread.

### Defective chairs in a batch of 20
- Binomial(20, 0.07): E[X] = 20 × 0.07 = 1.4
- Var(X) = 20 × 0.07 × 0.93 = 1.302, SD 1.14
- No batch has 1.4 defectives: a mean need not be a value

### Linear versus nonlinear rules
- E[a + bX] = a + b E[X] and Var(a + bX) = b² Var(X)
- Rework costs £10 if any defect, plus £15 each
- E[cost] = 10 × 0.766 + 15 × 1.4 = £28.66
- But cost(1.4) = 10 + 21 = £31

### Watch out
E[g(X)] ≠ g(E[X]) unless g is linear. Plugging the average defect count into a nonlinear cost rule misstates the average cost, here by £2.34 a batch.`,
  narration:
    "What single number best summarises a random quantity? Usually its expectation: the sum of each value times its probability. It is the long run average over many repetitions, and the balance point of the distribution. For defective chairs in a batch of twenty, with a seven percent rate, the expectation is twenty times zero point zero seven, one point four. No batch ever has one point four defective chairs; an expectation need not be a possible value. The variance measures spread around it: the expected squared distance from the mean, here one point three, so the standard deviation is about one point one four. For linear rules, expectation passes straight through: adding a constant shifts the mean, and multiplying by b multiplies the mean by b and the variance by b squared. But many real quantities are nonlinear. Suppose rework costs ten pounds to set up whenever a batch has any defect, plus fifteen per defective chair. The expected cost is ten times the probability of any defect, plus fifteen times one point four: twenty eight pounds sixty six. Plugging the average count into the rule instead gives thirty one pounds, which is wrong. Next, the binomial family.",
}
