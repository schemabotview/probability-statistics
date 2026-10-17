import type { Section } from '../types'

export const mleSection: Section = {
  id: 'mle',
  title: 'Log likelihood and maximum likelihood',
  scene: 'est-mle',
  focus: 'derive',
  slide: `## Maximum likelihood

The **maximum likelihood estimate** (MLE) is the parameter value that maximises L(θ). Work with the **log-likelihood** ℓ(θ) = ln L(θ): products become sums, and the maximiser is the same.

### The Bernoulli MLE
- ℓ(p) = x ln p + (n − x) ln(1 − p)
- ℓ′(p) = x/p − (n − x)/(1 − p) = 0
- So p̂ = x/n = 9/120 = 0.075

### Curvature gives precision
- A sharp peak means the data pin p down
- Information −ℓ″(p̂) = n/(p̂(1 − p̂)) = 1730
- SE ≈ 1/√1730 = 0.024
- The quadratic approximation is good near p̂

### Watch out
The quadratic shape is a large-sample approximation. Here the log-likelihood is visibly skewed: it falls faster towards 0 than towards 0.15. Intervals built from the curvature alone are symmetric and can misplace that asymmetry.`,
  narration:
    "How do you find the parameter value that best explains the data? Maximise the likelihood, or more conveniently its logarithm, which turns products into sums and has the same maximiser. For inspections, the log likelihood is x times log p plus n minus x times log of one minus p. Set its derivative to zero, and the answer is p hat equals x over n: nine over a hundred and twenty, nought point oh seven five. The sample proportion is the maximum likelihood estimate. The peak's sharpness carries the precision. On the left, the log likelihood relative to its peak. A sharply curved peak means the data rule out nearby values strongly. The curvature at the peak, called the observed information, is n over p hat times one minus p hat, about seventeen hundred, and one over its square root gives the standard error, about nought point oh two four, the same as the familiar formula. The orange curve is the quadratic approximation that this standard error implies. It is close near the peak, but the true log likelihood is skewed: it falls faster towards zero than towards higher rates. That asymmetry is lost by symmetric intervals built from curvature alone, a point that returns in chapter seven. Next, examples and a boundary case.",
}
