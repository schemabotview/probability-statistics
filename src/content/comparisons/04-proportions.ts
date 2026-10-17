import type { Section } from '../types'

export const proportionsSection: Section = {
  id: 'proportions',
  title: 'Proportion comparisons and absolute and relative effects',
  scene: 'cmp-proportions',
  focus: 'effects',
  slide: `## Comparing two proportions

A difference in defect rates can be reported as an **absolute** difference, a **relative risk** or an **odds ratio**. Each needs its own interval.

### Settings A and B, 400 chairs each
- A: 30 defective (7.5%); B: 18 (4.5%)
- Difference: 3 points, CI (−0.3, 6.3)
- Relative risk 1.67, CI (0.94, 2.94)
- Odds ratio 1.72, CI (0.94, 3.14)

### Which to report
- Absolute: the extra defects per chair, 1 in 33
- Relative: "67% more defects", a ratio
- The odds ratio is close to the relative risk only when rates are small

### Watch out
Overlapping intervals for the two rates do not mean "no difference"; compare using the interval for the difference itself. And "67% more" sounds larger than "3 more per 100": report both.`,
  narration:
    "Setting A produced thirty defective chairs out of four hundred, setting B eighteen. How should the difference be stated? There are three common measures. The absolute difference is three percentage points: one extra defective chair for every thirty three made. The relative risk is the ratio of the rates, one point six seven: A has sixty seven percent more defects. The odds ratio, one point seven two, compares odds rather than probabilities; it is close to the relative risk only when the rates are small, as here. Each needs its own interval. The difference's ninety five percent interval runs from slightly below zero to about six points, and the ratio intervals, computed on a log scale, run from just under one to about three. All three just include no difference, consistent with the chi square test's p value of seven percent. On the left, each rate with its own Wilson interval. A common mistake is to conclude from overlapping intervals that the rates are the same. Overlap of separate intervals is not the right test; use the interval for the difference. And report effects in more than one form: sixty seven percent more sounds much larger than three more per hundred. Next, larger tables.",
}
