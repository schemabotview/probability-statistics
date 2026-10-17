import type { Section } from '../types'

export const sumsSection: Section = {
  id: 'sums',
  title: 'Variance of sums and dependence',
  scene: 'joint-sums',
  focus: 'sd',
  slide: `## Variance of a sum

**Var(X + Y) = Var X + Var Y + 2 Cov(X, Y)**. Means always add; variances add only when the covariances are zero.

### Batches that share a day
- Batch rate = 7 + day effect + batch noise
- Var(batch) = 4 + 1 = 5
- Two batches on the same day: Cov = 4
- On different days: Cov = 0

### Averaging n batches
- Different days: Var = 5/n, which goes to 0
- Same day: Var = (5n + 4n(n − 1))/n², which goes to 4
- 12 batches from one day: SD 2.02, not 0.65
- Extra batches from the same day add little

### Watch out
This is why chapter 1's cluster sample was so imprecise. Treating 12 same-day batches as 12 independent observations understates the uncertainty threefold.`,
  narration:
    "How uncertain is a total, or an average, of several quantities? Expectations always add. Variances add only when the quantities are uncorrelated; otherwise each pair contributes twice its covariance. Take the batch defect rates from chapter one. Each is seven percent plus a day effect with variance four, plus batch noise with variance one, so each batch has variance five. Two batches from different days are independent. Two batches from the same day share the day effect, so their covariance is four. Now average n batches. Spread over different days, the variance of the average is five over n, and it shrinks toward zero as n grows: the teal curve on the left. All from the same day, the shared day effect never averages out. The variance approaches four, so the standard deviation of the average levels off near two percentage points, the pink curve. Twelve batches from one day give a standard deviation of about two, against about zero point six five for twelve batches from twelve days. This is exactly why the cluster sample in chapter one was so imprecise, and why treating same day batches as independent observations understates the uncertainty threefold. Next, splitting variance into parts.",
}
