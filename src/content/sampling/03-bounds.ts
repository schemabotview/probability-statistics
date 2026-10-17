import type { Section } from '../types'

export const boundsSection: Section = {
  id: 'bounds',
  title: 'Probability bounds with stated moment conditions',
  scene: 'samp-bounds',
  focus: 'values',
  slide: `## Probability bounds

A **bound** limits a probability using only a few facts about the distribution. It needs no model shape, and is correspondingly loose.

### Two classic bounds
- **Markov**: if X ≥ 0 with mean μ, P(X ≥ t) ≤ μ/t
- **Chebyshev**: with variance σ², P(|X − μ| ≥ k) ≤ σ²/k²
- Each needs its moment to exist

### Long processing times
- Mean 13.6, SD 7.25 minutes
- P(T ≥ 40): Markov ≤ 0.34, Chebyshev ≤ 0.075
- Lognormal model: 0.008
- At 20 minutes Chebyshev gives 1.28: no information

### Watch out
Bounds are guarantees, not estimates: the true tail can be far smaller. Use them when the model shape is unknown and a safe statement is needed; they also underpin the law of large numbers.`,
  narration:
    "Can anything be said about a tail probability without assuming a model shape? Yes, if a mean or a variance is known, though not much. Markov's inequality says that a non negative quantity exceeds t with probability at most its mean divided by t. Chebyshev's inequality says that a quantity lands k or more away from its mean with probability at most its variance over k squared. Both are guaranteed for every distribution with the needed moment. Apply them to processing times, with mean thirteen point six and standard deviation seven and a quarter minutes. The chance of a job taking forty minutes or more is at most thirty four percent by Markov and seven and a half percent by Chebyshev. The lognormal model says under one percent. On the left, on a log scale, the bounds sit far above the model's answer at every threshold, and at twenty minutes Chebyshev's bound exceeds one, which says nothing at all. So bounds are safe but loose. They are useful when the shape is genuinely unknown and a guarantee is needed, and Chebyshev's is the key step in proving the law of large numbers, which comes next.",
}
