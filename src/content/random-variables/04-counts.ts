import type { Section } from '../types'

export const countsSection: Section = {
  id: 'counts',
  title: 'Geometric and Poisson counts with parameter conventions',
  scene: 'rv-counts',
  focus: 'conventions',
  slide: `## Waiting times and rare counts

The **geometric** distribution counts trials until the first success. The **Poisson** counts events in a fixed amount of space or time when they occur independently at a steady rate.

### Inspections until the first defective
- P(N = k) = 0.93ᵏ⁻¹ × 0.07, for k = 1, 2, …
- Most likely value: 1; median 10; mean 1/p = 14.3
- P(N > 30) = 0.93³⁰ = 0.113: long runs are common

### Flaws on a panel
- Poisson with mean λ = 1.5 flaws per panel
- P(no flaws) = e⁻¹·⁵ = 0.223
- Mean and variance are both λ
- P(3 or more) = 0.191

### Watch out
Some software counts the failures before the first success instead: mean 13.3, not 14.3. Always state the convention, and check that the Poisson's equal mean and variance match the data.`,
  narration:
    "How long until the first defective chair? Inspect chairs one by one, each defective with probability seven percent, independently. The number of inspections up to and including the first defective follows a geometric distribution. Its most likely value is one: the very first chair. Yet its median is ten and its mean is one over p, about fourteen. And eleven percent of the time you inspect more than thirty chairs before seeing a defect. The long right tail on the left is why a run of good chairs is weak evidence that the defect rate has fallen. A caution about conventions: some textbooks and software count the good chairs before the first defective instead, which shifts everything down by one, to a mean of thirteen point three. State which you mean. The Poisson distribution counts events in a fixed amount of space or time, when they occur independently at a steady rate, such as surface flaws on a panel. With a mean of one and a half flaws per panel, the chance of a flawless panel is about twenty two percent. A Poisson's variance equals its mean, which is worth checking against data, because clustered flaws break it. Next, continuous models.",
}
