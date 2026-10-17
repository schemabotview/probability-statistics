import type { Section } from '../types'

export const meanIntervalsSection: Section = {
  id: 'mean-intervals',
  title: 'Mean intervals and normal/t assumptions',
  scene: 'inf-mean-ci',
  focus: 'times',
  slide: `## Intervals for a mean

The **t-interval** x̄ ± t s/√n uses the t distribution with n − 1 degrees of freedom, because σ is estimated by s. It is exact for normal data.

### Mean processing time
- 40 jobs: x̄ = 14.07, s = 10.38 minutes
- t₀.₉₇₅ with 39 df = 2.023
- 95% interval: 14.07 ± 3.32 = (10.75, 17.39)

### When the assumption fails
- Normal data: coverage 95% at every n
- Heavily skewed data: 82% at n = 5
- Still 89% at n = 40, 93% at n = 160
- Skewness, not sample size alone, decides

### Watch out
"n ≥ 30 makes it fine" is a rule of thumb, not a theorem. Processing times are skewed with one extreme job, so this interval's true coverage is likely below 95%; a bootstrap or a log-scale model (chapter 12) is safer.`,
  narration:
    "How should you put an interval around a sample mean? The standard tool is the t interval: the sample mean, plus or minus a t value times the standard error. The t value replaces the normal one point nine six because the standard deviation is estimated from the same data, and it comes from the t distribution with n minus one degrees of freedom. For the forty processing times, the mean is fourteen point oh seven minutes and the standard deviation ten point three eight. With thirty nine degrees of freedom the t value is two point oh two three, so the interval is fourteen point oh seven plus or minus three point three two: from about ten point eight to seventeen point four minutes. For normal data this procedure has exactly ninety five percent coverage at any sample size, the teal points on the left. For heavily skewed data it falls short: about eighty two percent at five observations, eighty nine percent at forty, still under ninety three at a hundred and sixty. The popular rule that thirty observations is enough is a rule of thumb. Processing times are skewed, with one extreme job, so this interval probably covers less than claimed. Next, the harder case of proportions.",
}
