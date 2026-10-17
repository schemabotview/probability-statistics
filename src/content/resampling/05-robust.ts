import type { Section } from '../types'

export const robustSection: Section = {
  id: 'robust',
  title: 'Robust estimation and contamination sensitivity',
  scene: 'rs-robust',
  focus: 'breakdown',
  slide: `## Robust estimation

A single wrong value, a timer left running or a mistyped digit, can move a mean anywhere. Robust estimators bound the influence any one observation can have.

### Sensitivity to one value
Move the 63.2-minute job between 0 and 300 minutes. The mean follows it without limit, from 12.5 to 20.0. The trimmed mean, Huber estimate and median stop moving once the value is far enough out.

### Four estimators
- Mean 14.07: breaks down with one bad value
- 10% trimmed mean 12.28: absorbs 4 of 40
- Huber 12.16: downweights large residuals
- Median 10.75: absorbs almost half

### They estimate different things
For skewed times the mean, median and trimmed mean are different targets. The total cost of 40 jobs needs the mean; robustness cannot replace checking the data.`,
  narration:
    "Data contain mistakes. A timer left running over lunch, or a misplaced decimal point, produces one wild value, and a single wild value can move the mean anywhere. On the left, the longest of the forty processing times is moved from zero to three hundred minutes while the others stay fixed. The mean, in pink, follows it in a straight line without limit. The ten percent trimmed mean, which drops the four smallest and four largest values, stops moving once the value passes the others. So do the Huber estimate, which gives full weight to values near the centre and less weight to distant ones, and the median. The table pushes further, replacing the largest values by five hundred minutes. One bad value ruins the mean. The trimmed mean absorbs up to four, its ten percent, and the median nearly half. That fraction is the breakdown point. But robustness has a cost in meaning. For skewed processing times, the mean, the median and the trimmed mean are different quantities, not three estimates of one. If the question is the total time of the next forty jobs, only the mean answers it. Robust methods complement checking the data; they do not replace it.",
}
