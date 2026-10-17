import type { Section } from '../types'

export const totalVarianceSection: Section = {
  id: 'total-variance',
  title: 'Total expectation and total variance',
  scene: 'joint-total-variance',
  focus: 'decompose',
  slide: `## Total expectation and total variance

Averages and spreads can be built up group by group. **E[Y] = E[E[Y | X]]**, and **Var(Y) = E[Var(Y | X)] + Var(E[Y | X])**.

### Batches grouped by day
- E[Y | day]: the day's mean rate
- E[Y] is the average of the day means: 6.66%
- Within-day variance, averaged: 0.937
- Variance of the day means: 3.781

### Reading the split
- Total variance 4.718 = 0.937 + 3.781
- 80% of the spread is between days
- The model behind the data has 1 + 4 = 5

### Watch out
The decomposition says where variation lives, which says where to act. Here, tightening batch-to-batch control within a day removes at most a fifth of the variance; the day-level cause, such as materials or staffing, drives the rest.`,
  narration:
    "Where does variability come from? The law of total variance answers that by splitting it into parts. First, total expectation: the overall mean is the average of the group means. Grouping the hundred and twenty batches by day, each day has its own mean, the orange points on the left, and averaging those day means gives the overall six point six six percent. Now variance. The total variance equals the average variance within groups, plus the variance between the group means. Computed from the batches, the average within day variance is about zero point nine four, and the variance of the day means is about three point seven eight. Together they make the total, four point seven two, exactly. So about eighty percent of the variation in batch defect rates is between days, and only twenty percent within a day. The model that generated these data has one and four, so the split is recovered well. The point is practical. The decomposition tells you where variation lives, and so where to act. Tightening control from batch to batch within a day could remove at most a fifth of the variance; the day level causes drive the rest. Next, mixtures and the multivariate normal.",
}
