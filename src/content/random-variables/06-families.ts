import type { Section } from '../types'

export const familiesSection: Section = {
  id: 'families',
  title: 'Positive, bounded and skewed families and model selection',
  scene: 'rv-families',
  focus: 'fits',
  slide: `## Choosing a family

Pick a model whose **support** matches the quantity's possible values and whose **shape** matches what the data show, then check it where decisions are made.

### Processing times, two fitted models
- Normal fit: 8.8% of it below 0 minutes
- Lognormal fit by maximum likelihood: median 11.76
- Log-likelihood −133.6 vs −149.8 for normal
- Over 40 min: data 2.5%, lognormal 1.8%, normal 0.6%

### Support first
- Positive quantities: lognormal, gamma, exponential
- Proportions in (0, 1): beta
- Symmetric, unbounded: normal, t

### Watch out
A family that fits the middle can fail the tail. If a decision depends on how often jobs exceed 40 minutes, the normal model understates it fourfold, and no summary of the centre will show that.`,
  narration:
    "Which model should describe processing times? Start with what values are possible. Times are positive, so a model that allows negative times is wrong in principle. On the left are the forty processing times as a histogram, with two fitted curves. The normal curve, matched to the sample mean and standard deviation, puts almost nine percent of its probability below zero minutes, and it is too thin in the long right tail. The lognormal, a distribution whose logarithm is normal, lives on positive values and is right skewed, like the data. Fitted by maximum likelihood, it has a median of about eleven point eight minutes, and its log likelihood is much higher, which means the data are far more probable under it. Families can be organised by support: lognormal, gamma and exponential for positive quantities, beta for proportions between zero and one, normal and t for symmetric unbounded ones. Then check the model where the decision lies. If the question is how often a job takes over forty minutes, the data say two and a half percent, the lognormal says about two, and the normal says under one: a fourfold understatement. Next, tails, quantiles and moments.",
}
