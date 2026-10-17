import type { Section } from '../types'

export const pairedSection: Section = {
  id: 'paired',
  title: 'Paired differences and repeated-reading pitfalls',
  scene: 'cmp-differences',
  focus: 'units',
  slide: `## Paired differences

A paired comparison is a **one-sample** analysis of the within-unit differences: their mean, SD and a t-interval with n − 1 df, where n counts **units**.

### Twelve board differences
- Mean −1.66 minutes, SD 0.87
- t₀.₉₇₅ with 11 df = 2.201
- 95% CI (−2.21, −1.10): faster on average

### The repeated-reading trap
- Each board also read 4 times per glue
- 48 reading differences, treated as units: SE 0.143
- Correct, 12 board means: SE 0.204
- t = −11.5 instead of −8.0: overstated certainty

### Watch out
Readings of the same board share that board's quirks, so they are not independent replications. The experimental unit is what received the treatment: here the board. Average readings within a unit first.`,
  narration:
    "Once data are paired, the analysis is simple: compute each unit's difference, and treat those differences as one sample. The twelve boards' differences, new glue minus old, are shown on the left. Their mean is minus one point six six minutes, with a standard deviation of under one minute. A t interval with eleven degrees of freedom, because there are twelve boards, runs from about minus two point two to minus one point one. The new glue saves between about one and two minutes a board. Now the trap. Suppose each board was read four times under each glue, giving forty eight reading differences. It is tempting to treat those as forty eight observations. That gives a standard error about thirty percent too small and a t statistic of eleven and a half instead of eight. The four readings of one board share that board's quirks, its wood, its joint, its position on the bench, so they are not independent replications of the comparison. They improve each board's measurement; they do not add boards. The experimental unit is whatever received the treatment, here the board. Average the readings within each board first, then analyse twelve differences. Next, comparing proportions.",
}
