import type { Section } from '../types'

export const intervalsSection: Section = {
  id: 'intervals',
  title: 'Coefficient uncertainty and response and prediction intervals',
  scene: 'reg-bands',
  focus: 'at10',
  slide: `## Uncertainty about the line

The fitted line is uncertain: a **confidence interval** for the mean response at x is ŷ ± t s √(1/n + (x − x̄)²/Sxx). A **prediction interval** for one new job adds the job's own scatter: ŷ ± t s √(1 + 1/n + (x − x̄)²/Sxx).

### At 10 parts
- Fitted mean 13.62 minutes
- Mean time of such jobs: (12.98, 14.25)
- One new 10-part job: (9.17, 18.06)

### Shapes of the bands
- Narrowest at the mean, x̄ = 12.4 parts
- Wider towards the edges of the data
- The prediction band never shrinks below ± 2s

### Watch out
At 30 parts, outside the data, the bands are only a little wider, but the real risk is larger: they assume the straight line continues. Normal-error t intervals need roughly normal, equal-variance, independent errors.`,
  narration:
    "How uncertain is a fitted line, and how uncertain is a prediction from it? These are different questions. A confidence interval for the mean response asks where the average time of all ten part jobs lies. A prediction interval asks where one new ten part job will fall, which adds that job's own scatter. On the left, the narrow orange band is the confidence band and the wide pink band the prediction band. At ten parts, the average time is between about thirteen and fourteen and a quarter minutes, but a single new job could take anywhere from about nine to eighteen. The confidence band is narrowest at the average number of parts and widens towards the edges, because the slope's uncertainty matters more far from the centre. The prediction band never shrinks below about two residual standard deviations, however much data you collect, because individual jobs vary. Beyond twenty parts, the shaded region, there are no data. At thirty parts the bands are only a little wider, but they assume the straight line continues, which the data cannot confirm. And these intervals rest on errors that are roughly normal, equal in variance and independent. Next, checking those assumptions.",
}
