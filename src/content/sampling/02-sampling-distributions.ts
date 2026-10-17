import type { Section } from '../types'

export const samplingDistributionsSection: Section = {
  id: 'sampling-distributions',
  title: 'Sampling distributions, sample means and proportions, and standard errors',
  scene: 'samp-se',
  focus: 'phat',
  slide: `## Sampling distributions

A statistic's **sampling distribution** is its distribution over all the samples the design could have produced. Its standard deviation is the **standard error** (SE).

### The defect proportion
- p̂ = defectives / 120, with p = 0.07
- Exactly: 120 p̂ ~ Binomial(120, 0.07)
- Mean of p̂ is p: unbiased
- SE = √(p(1 − p)/n) = 0.0233

### What the SE predicts
- About two thirds of samples within 0.07 ± 0.023
- The 20 samples of chapter 1 had SD 0.018
- Quadruple n to halve the SE: 0.047, 0.023, 0.012

### Watch out
The SE describes variation across hypothetical repeated samples under the stated design. It does not describe how far one particular p̂ is from p, which we never know, and it ignores bias entirely.`,
  narration:
    "How much would an estimate change if the study were repeated? That variation is described by the sampling distribution: the distribution of a statistic across all the samples the design could have produced. For the defect proportion from samples of a hundred and twenty chairs, it is known exactly. The count of defectives is binomial, so p hat has stems at every possible proportion, shown on the left. The distribution is centred on the true seven percent, so p hat is unbiased. Its standard deviation, the standard error, is the square root of p times one minus p over n, about two point three percentage points. Below the stems are chapter one's twenty actual samples, scattered much as the distribution predicts; their standard deviation was about one point eight points. The standard error shrinks like one over the square root of n: four times the sample size halves it. Two cautions. The standard error describes variation over hypothetical repeated samples under a stated design. It does not tell you how far your one estimate is from the truth. And it says nothing about bias, such as the missing long jobs of chapter one. Next, guarantees that hold with very few assumptions.",
}
