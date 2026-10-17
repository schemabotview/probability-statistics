import type { Section } from '../types'

export const protocolSection: Section = {
  id: 'protocol',
  title: 'Prespecified metrics, power, stopping and external validity',
  scene: 'exp-protocol',
  focus: 'plan',
  slide: `## Planning the experiment

Write the **protocol** before the first unit: the primary metric, the design, the analysis, the sample size and the stopping rule. Then the results cannot steer the analysis.

### Sizing the blocked experiment
- Each day: 2 A and 2 B batches; within-day SD 1
- SE of the estimate = 1/√days
- To detect −0.8 points with power 0.8: 15 days
- 5 days gives power only 0.28

### External validity
- The experiment covers this product mix and supplier
- Effects can differ for stools, or a new timber
- Generalising needs an argument, not the p-value

### Chapter outcome
You can explain what a design identifies, state the assumptions for a causal reading, and distinguish randomised evidence from observational association.`,
  narration:
    "How should the setting experiment be planned? Write the protocol before the first batch runs: the primary metric, the design, the analysis, the number of days, and the rule for stopping. Fixing these in advance means the results cannot steer the choices, which protects against the selective reporting and optional stopping of chapter seven. Sizing it uses the blocked design. Each day contributes one within day difference between B and A, with a variance of about one, so the standard error of the overall estimate is one over the square root of the number of days. To detect a fall of point eight points with eighty percent power, the experiment needs about fifteen days. The dots on the left are exact t test power; the curve is the normal approximation, which is optimistic for short experiments. Five days would give only about a twenty eight percent chance of detecting a real effect of that size. Finally, external validity. The experiment covers this product mix and this supplier. Its effect may differ for stools, or for new timber, and extending it needs an argument, not a p value. That completes the chapter. Next, regression extends comparisons to conditional relationships and adjustment.",
}
