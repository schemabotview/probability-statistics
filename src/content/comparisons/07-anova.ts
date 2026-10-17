import type { Section } from '../types'

export const anovaSection: Section = {
  id: 'anova',
  title: 'ANOVA, omnibus hypotheses, contrasts and multiplicity',
  scene: 'cmp-anova',
  focus: 'table',
  slide: `## Comparing several means

**One-way ANOVA** tests the omnibus hypothesis that all group means are equal, comparing variation **between** groups with variation **within** them: F = MS_between / MS_within.

### Four machine settings, 12 jobs each
- Means 11.97, 11.94, 14.60, 11.68 minutes
- F = 10.95 on 3 and 44 df, p = 0.00002
- So the four means are not all equal

### Which differ?
- 6 pairwise comparisons: adjust, e.g. Bonferroni
- Only pairs involving setting 3 exclude 0
- Planned contrast 3 vs the rest: 2.74 (1.77, 3.70)

### Chapter outcome
You can choose a comparison method for a stated estimand and design, and interpret its result without exceeding its assumptions. A significant F does not mean every pair differs.`,
  narration:
    "With four machine settings, how do you compare their mean processing times without running six separate tests? Analysis of variance starts with one omnibus question: are all four means equal? It compares how far the group means spread around the overall mean with how much jobs vary within each group. If the group means differ by more than within group noise can explain, the ratio F is large. Here F is about eleven, with three and forty four degrees of freedom, and the p value is two in a hundred thousand. The means are not all equal. But the omnibus test does not say which differ, and it certainly does not say that every pair differs. On the left, settings one, two and four look alike, and setting three is slower. Making all six pairwise comparisons needs a multiplicity adjustment, as in chapter seven. With Bonferroni adjusted intervals, only the comparisons involving setting three exclude zero. Better still is a planned contrast, decided in advance: setting three against the average of the others, about two and three quarter minutes slower, with an interval from one point eight to three point seven. That completes the chapter. Next, credible treatment comparisons depend on experimental design and causal assumptions.",
}
