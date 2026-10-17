import type { Section } from '../types'

export const summariesSection: Section = {
  id: 'summaries',
  title: 'Distributions, plots, location and spread',
  scene: 'design-histogram',
  focus: 'summaries',
  slide: `## Describing a distribution

A **distribution** shows which values occur and how often. Look at its shape before choosing summaries of **location** (centre) and **spread**.

### Forty processing times
- Most jobs take 7 to 16 minutes
- The right tail is long; one jammed job took 63.2
- Shape: unimodal, right-skewed, one outlier

### Choosing summaries
- Mean 14.07 is pulled towards the tail; median 10.75 is not
- Without the jam: mean 12.81, median 10.70
- SD falls from 10.38 to 6.73; IQR barely moves
- Median and IQR are **resistant** to extreme values

### Watch out
Resistant is not the same as right. If the question is total machine time, the mean is the estimand and the jam belongs in it. Choose the summary from the question, then check how sensitive it is.`,
  narration:
    "How should forty processing times be summarised? Start by looking. The histogram on the left shows most jobs taking between seven and sixteen minutes, a long tail to the right, and one job at sixty three minutes, when a feed jammed. The shape is single peaked and right skewed. Shape matters because summaries respond to it differently. The mean, fourteen point oh seven minutes, is pulled toward the tail; the median, ten point seven five, sits in the middle of the typical jobs. The table shows what happens when the jammed job is removed. The mean drops by more than a minute and the standard deviation falls from about ten to under seven, while the median and the interquartile range barely change. Summaries that barely react to a few extreme values are called resistant. But resistant does not mean correct. If the question is how much machine time the jobs consumed in total, the mean is exactly the right estimand, and the jam is part of the answer. So choose summaries from the question, then report how sensitive they are to the extreme values. Next, relationships between variables, and a trap.",
}
