import type { Section } from '../types'

export const specificationSection: Section = {
  id: 'specification',
  title: 'Transformations, extrapolation and specification',
  scene: 'reg-specification',
  focus: 'spec',
  slide: `## Getting the shape right

A model is **misspecified** when its form misses the pattern in the data. A **transformation** of a predictor or outcome can straighten a curved relationship.

### Batch assembly time
- The crew speeds up as a batch goes on
- A straight line in chairs: residual SD 2.03
- A line in log(chairs): residual SD 1.58
- Slope 7.73: about 5.4 minutes per doubling

### Extrapolating
- Largest batch observed: 30 chairs
- At 60 chairs the straight line says 51.9 minutes
- The log model says 35.3; the truth here is 35.8

### Watch out
Both models agree inside the data and differ wildly outside it. No goodness of fit within 2–30 chairs can show which shape continues to 60. Extrapolation needs subject knowledge, or new data.`,
  narration:
    "What if the relationship is not a straight line? Look at batch assembly time against the number of chairs in a batch. The crew speeds up as a batch goes on, so each extra chair adds less time than the one before. A straight line, in pink on the left, misses that shape: it is too low for small batches and too high in the middle, and its residuals show a curved pattern. Using the logarithm of the number of chairs as the predictor straightens the relationship. The residual standard deviation drops from about two to one point six minutes, and the slope has a new meaning: about five and a half extra minutes for each doubling of the batch size. Now extrapolate to sixty chairs, twice the largest batch ever observed, in the shaded region. The straight line predicts fifty two minutes; the log model thirty five. In this synthetic example the truth is known, about thirty six, but in practice it is not. Both models fit the observed range reasonably well, and nothing in the data from two to thirty chairs can show which shape continues to sixty. Extrapolation rests on knowledge of the process or on new data. Next, outcomes that are counts or yes and no.",
}
