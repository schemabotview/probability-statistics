import type { Section } from '../types'

export const biasSection: Section = {
  id: 'bias',
  title: 'Selection, nonresponse, measurement bias and missingness',
  scene: 'design-bias',
  focus: 'missing',
  slide: `## Bias and missing data

**Bias** is a systematic gap between what the data estimate and the estimand. Unlike random error, it does not shrink as the sample grows.

### Four common sources
- **Selection**: entry depends on the outcome
- **Nonresponse**: chosen units never report
- **Measurement**: the instrument reads off
- **Missingness**: absent because of their value

### A missing-not-at-random log
- 400 jobs, true mean time 12.64 minutes
- Jobs over 20 minutes run past the shift end
- Only 40% of those get logged: 26 of 46 go missing
- The logged 374 average 11.74: biased low

### Watch out
Dropping incomplete records is not neutral. Here the missing values are the long ones, so a complete-case average understates the typical job, and logging more of the same jobs would not fix it.`,
  narration:
    "Can a large, carefully computed average still be wrong? Yes, if the data are systematically unlike the population. That is bias, and unlike random error it does not shrink with more data. It has several common sources. Selection: units enter the data in a way linked to the outcome, such as timing only the batches operators flag as troublesome. Nonresponse: some selected units never report, such as a night shift that skips the survey. Measurement: an instrument or rule reads off target, such as a gauge knocked out of calibration. And missingness: values that are absent for reasons connected to the values themselves. On the left is that last case. Of four hundred jobs, those that take longer than twenty minutes run past the end of the shift, and only forty percent of them get logged. The grey bars are all jobs; the teal bars are those in the log. The long tail is thinned out, so the logged average is eleven point seven four minutes when the truth is twelve point six four. Logging more jobs the same way would only reproduce the gap more precisely. Next, two kinds of randomness.",
}
