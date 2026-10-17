import type { Section } from '../types'

export const gridSection: Section = {
  id: 'grid',
  title: 'Grid approximation and limits of numerical evidence',
  scene: 'bayes-grid',
  focus: 'code',
  slide: `## When there is no formula

Most realistic priors and models are not conjugate. The posterior is still prior × likelihood, normalised, and for one parameter it can be computed on a grid.

### A two-part prior
0.8 · Beta(2, 26) + 0.2 · Beta(2, 8) allows a 20% chance of a bad batch. The exact posterior mean is 0.1110, and P(p > 0.0888) = 0.7907.

### Grid accuracy
- 20 points: mean 0.1107, but tail 0.652
- 1000 points: 0.1110 and 0.788
- The mean converges fast, the tail slowly
- Check by refining the grid

### Chapter outcome
You can explain Bayesian updating and predictive uncertainty, compare prior sensitivity, and justify an elementary decision under a stated loss. Next, resampling and robust reasoning address limits of simple parametric analyses.`,
  narration:
    "Conjugate priors are convenient, but most realistic priors and models are not conjugate. Suppose the quality engineer believes the new supplier is probably like the old one, but allows a twenty percent chance of a bad batch with a much higher rate. That prior is a mixture of two beta distributions, and no single update rule applies. The posterior is still prior times likelihood, divided by its total. With one parameter, we can evaluate that product at a grid of points and normalise, as the code does. The pink curve is the exact posterior, and the grey bars a grid of only twenty points. The coarse grid already gets the mean nearly right, point one one zero seven against point one one one zero. But the probability that the rate exceeds the break even value is point six five on twenty points, against point seven nine exactly. Tail probabilities converge much more slowly than means, so refine the grid until the answer stops changing. With many parameters, grids become impossible, and simulation methods take over. This completes the chapter. You can explain Bayesian updating and predictive uncertainty, compare prior sensitivity, and justify an elementary decision under a stated loss. Next, resampling and robust reasoning address limits of simple parametric analyses.",
}
