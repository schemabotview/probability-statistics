import type { Section } from '../types'

export const glmSection: Section = {
  id: 'glm',
  title: 'Logistic, binomial and Poisson modelling orientation',
  scene: 'reg-glm',
  focus: 'models',
  slide: `## Binary and count outcomes

For yes/no and count outcomes, **generalised linear models** put the linear predictor on a suitable scale: the **log-odds** for logistic regression, the **log-rate** for Poisson regression.

### Defects against machine speed
- 400 chairs; logistic fit −4.81 + 0.326 × speed
- Each extra chair per hour: odds × 1.38 (1.14, 1.68)
- P(defect) 0.021 at speed 3, 0.099 at speed 8

### Reading coefficients
- Odds ratios are constant across speeds
- Changes in probability are not
- Poisson: rate ratios; include exposure (panel area)

### Watch out
A straight line for a 0/1 outcome can predict probabilities below 0 or above 1. And Poisson standard errors assume variance equals mean; chapter 8's flaw counts were overdispersed, so they would be too small.`,
  narration:
    "How should you model a yes or no outcome, like whether a chair is defective? A straight line can predict probabilities below zero or above one. Logistic regression instead models the log odds of a defect as a linear function of the predictors. On the left, four hundred chairs made at different machine speeds, with the observed defect rate in each speed band and the fitted logistic curve. The fitted coefficient for speed, point three three, means each extra chair per hour multiplies the odds of a defect by about one point three eight, with an interval from one point one four to one point six eight. On the probability scale the effect is not constant: the defect probability is about two percent at three chairs an hour and about ten percent at eight. Report results on the scale people use, with the caveat that the odds ratio is the constant part. Counts get the same treatment through Poisson regression, which models the log of a rate; it needs the exposure, such as panel area, so that bigger panels are not simply credited with more flaws. And it assumes the variance equals the mean, which chapter eight's clustered flaws violated. Next, the limits of what any regression shows.",
}
