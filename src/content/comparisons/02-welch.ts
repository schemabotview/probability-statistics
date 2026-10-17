import type { Section } from '../types'

export const welchSection: Section = {
  id: 'welch',
  title: 'Welch and pooled mean comparisons and assumptions',
  scene: 'cmp-welch',
  focus: 'methods',
  slide: `## Comparing two independent means

The **two-sample t** compares means of independent groups. The **pooled** version assumes equal variances; **Welch's** version estimates each group's variance separately.

### Settings A and B
- A: 15 jobs, mean 14.70, SD 1.59
- B: 25 jobs, mean 11.29, SD 4.01
- Difference 3.41 minutes; B is faster

### Welch versus pooled
- Welch: SE 0.90, df 34.2, CI (1.58, 5.24)
- Pooled: SE 1.09, df 38, CI (1.21, 5.61)
- Simulated, equal means, unequal SDs and sizes:
- false-alarm rate Welch 4.8%, pooled 25.6%

### Watch out
Pooling is badly wrong when the smaller group has the larger variance. Use Welch by default; it loses almost nothing when variances are equal. Both still assume independent jobs and roughly normal means.`,
  narration:
    "How do you compare two independent groups? Take processing times under two machine settings: fifteen jobs under A and twenty five under B. Setting B averages about three and a half minutes faster, but its times are far more variable: a standard deviation of four minutes against A's one and a half. The two sample t procedure divides the difference in means by its standard error. There are two versions. The pooled version assumes both groups share one variance and averages them. Welch's version estimates each group's variance separately and adjusts the degrees of freedom. Here they give different standard errors and intervals: Welch's interval runs from about one and a half to five and a quarter minutes. The bigger issue shows up in the table's last line. In a simulation where the true means are equal, with ten observations of high variance against forty of low variance, the pooled test raises a false alarm a quarter of the time instead of five percent. Welch's stays near five. Pooling fails badly when the smaller group is the more variable one. So use Welch by default; when variances really are equal, it loses almost nothing. Next, paired differences in detail.",
}
