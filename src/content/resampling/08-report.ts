import type { Section } from '../types'

export const reportSection: Section = {
  id: 'report',
  title: 'Integrated evidence, unresolved bias and population change',
  scene: 'rs-report',
  focus: 'summary',
  slide: `## What the evidence supports

A statistical conclusion is an argument: an effect, its uncertainty, the assumptions that carry it, and what it leaves unresolved. A good report says all four.

### Setting B against setting A
B is 3.4 minutes faster on average, bootstrap interval (1.7, 5.1). Six analyses agree, all with p < 0.005, so the result is not fragile to the choice of method, and the permutation test needs no normality.

### What remains unresolved
- How jobs were assigned to each setting
- Whether B's extra variability matters
- Whether it holds after the week-7 change

### Course outcome
You can match a resampling scheme to a design, find robustness limits, reason about missing data, and state clearly what a conclusion supports and what it leaves open. Next, apply these to unfamiliar problems, with the companion courses for specialist depth.`,
  narration:
    "The course ends where any analysis should: with a report that says what the evidence supports. For settings A and B, the effect is that B processes jobs about three and a half minutes faster on average, with a bootstrap interval from one point seven to five point one minutes. Six different analyses agree, so the conclusion is not fragile to the choice of method. That is the strength of the evidence. Its limits must be stated just as plainly. The record does not show how jobs reached each setting, so a difference in job mix could explain part of the effect, as chapter nine warned. Setting B is also far more variable, which matters if deadlines are tight. And the population may have moved. The weekly defect rate stepped up from about seven to ten and a half percent when the timber supplier changed in week seven, so findings from before need checking after. This completes the course. You can match a resampling scheme to a design, identify robustness limits, reason about missing data, and communicate what a conclusion supports and what it leaves unresolved. Continue with unfamiliar examples and implementation practice, and use the companion courses for specialist depth.",
}
