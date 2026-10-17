import type { Section } from '../types'

export const diagnosticsSection: Section = {
  id: 'diagnostics',
  title: 'Residuals, heteroscedasticity, dependence, leverage and influence',
  scene: 'reg-diagnostics',
  focus: 'checks',
  slide: `## Checking a regression

**Residuals** are the data's verdict on the model. Look for spread that changes (**heteroscedasticity**), patterns over time or groups (**dependence**), and points that move the fit (**influence**).

### A second batch of jobs
- Scatter grows with job size
- Residual SD 1.46 for small jobs, 4.30 for large
- Equal-variance standard errors are then wrong

### One mislogged job
- 40 parts, logged at 20 minutes
- Leverage 0.365, eleven times the average
- Cook's distance 6.87; next largest 0.29
- It pulls the slope from 1.00 to 0.72

### Watch out
High leverage alone is not wrong: an unusual x can be informative. Investigate before deleting: this point was a timer left running. Report the fit with and without it if the record cannot be fixed.`,
  narration:
    "How do you know whether a regression's assumptions hold? Look at the residuals. Three problems are common. Heteroscedasticity, spread that changes with the fitted value: in this second batch of jobs, residuals for small jobs have a standard deviation of about one and a half minutes, and for large jobs over four. The usual standard errors assume equal spread and are then wrong. Dependence: residuals that cluster by day, batch or time, as earlier chapters warned. And influence. On the left, one job with forty parts was logged at twenty minutes. It sits far beyond the other jobs in parts, so it has high leverage, eleven times the average, and it is far below the pattern. Together, that gives a Cook's distance of almost seven, when the next largest is under a third. It drags the slope from about one minute per part down to point seven two. Leverage alone is not a fault: an unusual job can be very informative. So investigate before deleting. Here the record shows a timer left running from another job. If a record cannot be checked, report the fit with and without it, and let readers see the difference. Next, getting the model's shape right.",
}
