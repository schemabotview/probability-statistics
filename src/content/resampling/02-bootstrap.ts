import type { Section } from '../types'

export const bootstrapSection: Section = {
  id: 'bootstrap',
  title: 'Bootstrap units, interval families and failure cases',
  scene: 'rs-bootstrap',
  focus: 'schemes',
  slide: `## The bootstrap: resample what was sampled

The bootstrap estimates a sampling distribution by drawing new samples, with replacement, from the empirical distribution and recomputing the statistic on each one.

### Choose the right unit
120 batch defect rates come from 10 days, and batches on one day are alike. Resampling batches gives SE 0.20; resampling whole days gives 0.62. The design sampled days, so the honest interval is three times wider.

### Interval families
- Percentile: the 2.5% and 97.5% quantiles
- Basic and studentised intervals correct for bias
- BCa adjusts for skew; all need many resamples

### When it fails
The bootstrap maximum equals the observed 63.2 in 64% of resamples, so it cannot see beyond the data. Extremes, tiny samples and dependent data break the bootstrap.`,
  narration:
    "The bootstrap applies the plug-in idea to uncertainty itself. To learn how a statistic would vary over repeated samples, draw new samples of the same size, with replacement, from the data, and recompute the statistic each time. The spread of those values estimates the standard error. The crucial choice is what to resample. The workshop's one hundred and twenty batch defect rates came from ten days, and batches made on the same day are alike. Resampling individual batches, in pink, treats them as one hundred and twenty independent units and gives a standard error of point two. Resampling whole days, in teal, matches how the data were gathered, and gives point six two, three times larger. Resample the unit that was sampled. From the bootstrap draws, several interval families are possible: the simple percentile interval, basic and studentised intervals, and the bias corrected and accelerated interval. They agree when the distribution is symmetric and differ when it is skewed. The bootstrap also fails in known places. For the maximum processing time, sixty four percent of resamples simply reproduce the observed maximum, because no resample can exceed the data. Extremes, very small samples and dependent data all need different methods.",
}
