import type { Section } from '../types'

export const momentsSection: Section = {
  id: 'moments',
  title: 'Sample moments and the method of moments',
  scene: 'est-moments',
  focus: 'match',
  slide: `## The method of moments

Set the model's **moments** (mean, variance, …) equal to the sample's, and solve for the parameters. One equation per parameter.

### A gamma model for processing times
- Gamma(shape k, scale θ): mean kθ, variance kθ²
- Sample: x̄ = 14.07, s² = 107.7
- Solve: θ = s²/x̄ = 7.65, k = x̄²/s² = 1.84

### Against maximum likelihood
- ML fit: shape 2.94, scale 4.78, same mean
- Log-likelihood −136.0 versus −138.2: ML fits better
- s² is inflated by the one 63-minute job
- The moment fit is pulled towards that outlier

### Watch out
Method-of-moments estimates are quick and often consistent, but they use only a few summaries and inherit their fragility: one extreme value moves s², and with it the fitted shape.`,
  narration:
    "Is there a simple general way to estimate a model's parameters? The method of moments: write the model's mean and variance in terms of its parameters, set them equal to the sample mean and variance, and solve. Fit a gamma model to the forty processing times. A gamma with shape k and scale theta has mean k theta and variance k theta squared. The sample mean is fourteen point oh seven and the sample variance a hundred and eight. Dividing the variance by the mean gives a scale of seven point six five, and the shape follows: one point eight four. It takes two lines of algebra. On the left, compare it with the maximum likelihood fit, which has a shape of two point nine four. Both match the sample mean, but the moment fit is wider and more skewed, and its log likelihood is lower, so it explains the data less well. The reason is the one sixty three minute jammed job. The sample variance is inflated by it, and the moment fit, which uses only the mean and variance, follows. Moment estimators are quick and usually consistent, but they inherit the fragility of the summaries they use. Next, the principle behind the better fit.",
}
