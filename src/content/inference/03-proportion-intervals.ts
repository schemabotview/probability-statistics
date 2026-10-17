import type { Section } from '../types'

export const proportionIntervalsSection: Section = {
  id: 'proportion-intervals',
  title: 'Proportion intervals and sparse-sample failures',
  scene: 'inf-proportion-ci',
  focus: 'exact',
  slide: `## Intervals for a proportion

Coverage of a proportion interval can be computed **exactly**, by summing binomial probabilities over the outcomes whose interval contains p.

### Three common intervals
- **Wald**: p̂ ± 1.96 √(p̂(1 − p̂)/n), the textbook one
- **Wilson**: inverts the score test; recentres towards ½
- **Clopper–Pearson**: exact, from binomial tails

### With n = 40 and rare defects
- Wald coverage falls to 33% at p = 0.01
- 0 of 40: Wald gives (0, 0), certainty from nothing
- 2 of 40: Wald dips below zero, to −0.018
- Wilson stays near 95%; Clopper–Pearson above it

### Watch out
Coverage oscillates with p because counts are discrete, so no interval is exactly 95% everywhere. For small counts use Wilson or Clopper–Pearson; never Wald when np̂ is under about 10.`,
  narration:
    "Is the textbook interval for a proportion trustworthy? For proportions, coverage can be computed exactly: for each possible count, check whether its interval contains the true p, and add up the binomial probabilities of the counts that succeed. On the left, the exact coverage with forty inspected chairs, as the true defect rate varies. The textbook Wald interval, p hat plus or minus one point nine six standard errors, in pink, does badly for rare defects. At a one percent defect rate it covers the truth only a third of the time. The reasons show in the table. With no defectives among forty, Wald gives an interval of zero width, claiming certainty from nothing. With two defectives, its lower end is negative. The Wilson interval, in teal, inverts the score test and stays close to ninety five percent everywhere; its worst coverage here is ninety one. The Clopper Pearson interval, built directly from binomial tail probabilities, never covers less than ninety five percent, at the price of being wider. The jagged curves are real: counts are discrete, so no interval can be exactly ninety five percent for every p. For small counts, use Wilson or Clopper Pearson. Next, intervals for something other than a parameter.",
}
