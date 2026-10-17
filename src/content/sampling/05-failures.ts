import type { Section } from '../types'

export const failuresSection: Section = {
  id: 'failures',
  title: 'Dependence, heavy tails and finite-population corrections',
  scene: 'samp-failures',
  focus: 'conditions',
  slide: `## When the standard results fail

The formula SE = σ/√n and the normal approximation rest on **independence**, **finite variance** and a sample that is a **small part** of the population.

### Heavy tails
- Pareto α = 1.5: finite mean 3, infinite variance
- Means of 30 draws: median 2.52, 72% below 3
- Rare huge draws drag a few means far above
- No normal limit at the √n rate

### Dependence and finite populations
- 12 same-day batches: SD 2.02, not 0.65
- Sampling without replacement shrinks the SE
- Factor √((N − n)/(N − 1)): 0.990 for 120 of 6000
- 0.707 when half the population is sampled

### Watch out
A large n does not rescue a broken assumption. Heavy tails and dependence are the common real failures; the finite-population correction matters only when the sample is a sizeable fraction of the population.`,
  narration:
    "When do the standard results mislead? The familiar standard error and the normal approximation rest on three conditions: independent observations, a finite variance, and a sample that is a small part of the population. Each can fail. On the left, heavy tails. Draw thirty values from a Pareto distribution with tail index one and a half: its mean is three but its variance is infinite. Ten thousand such sample means form a strongly skewed distribution. Most fall below the true mean, because the rare enormous values that balance them out usually do not appear, and when one does it drags that sample's mean far above. A normal curve with the same centre has the wrong shape entirely. Dependence fails differently, as chapter four showed: twelve batches from one day have a standard error three times the independent formula. The third condition goes the other way. Sampling without replacement from a finite population gives a smaller standard error, by the square root of N minus n over N minus one. For a hundred and twenty chairs out of six thousand that factor is zero point nine nine, ignorable. Sampling half the population, it is zero point seven one. A large n never rescues a broken assumption. Next, simulation.",
}
