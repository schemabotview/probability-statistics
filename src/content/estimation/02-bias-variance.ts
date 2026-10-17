import type { Section } from '../types'

export const biasVarianceSection: Section = {
  id: 'bias-variance',
  title: 'Bias, variance, MSE and consistency',
  scene: 'est-bias',
  focus: 'errors',
  slide: `## Judging an estimator

An estimator's **bias** is E[θ̂] − θ; its **variance** measures spread across samples. The **mean squared error** combines them: **MSE = bias² + variance**.

### Two variance estimators, n = 5
- s²: divide by n − 1; unbiased for σ² = 15.21
- σ̂²: divide by n; mean 12.17, bias −3.04
- MSE 115.7 for s², but 83.3 for σ̂²
- Simulated MSEs: 115.0 and 83.4

### Consistency
- **Consistent**: converges to θ as n grows
- Both versions are consistent: their bias, −σ²/n, vanishes
- Unbiased: fixed n; consistent: large n

### Watch out
"Unbiased" does not mean "closer". Here the biased estimator is closer on average, because its smaller variance outweighs its bias. Choose by the error that matters for the use.`,
  narration:
    "What makes one estimator better than another? Look at its sampling distribution. Bias is how far its average sits from the true value; variance is how much it scatters around that average. Mean squared error combines the two: bias squared plus variance. Take the variance of seat heights, fifteen point two one, estimated from samples of only five chairs. The usual sample variance divides the sum of squared deviations by n minus one, and it is unbiased. Dividing by n instead gives an estimator whose average is only twelve point one seven: biased low by three. On the left, twenty thousand simulated samples show both sampling distributions. The surprise is in the table. The biased estimator has the smaller mean squared error, eighty three against a hundred and sixteen, because dividing by the larger n shrinks its variance more than the bias costs. So unbiased does not mean closer. Both estimators are consistent: their bias, minus sigma squared over n, vanishes as the sample grows, and both converge to the truth. Unbiasedness is a property at a fixed sample size; consistency is about large samples. Choose by the error that matters for the use. Next, a simple general recipe for estimators.",
}
