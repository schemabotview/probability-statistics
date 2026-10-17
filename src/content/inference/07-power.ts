import type { Section } from '../types'

export const powerSection: Section = {
  id: 'power',
  title: 'Type I and II errors, power and precision planning',
  scene: 'inf-power',
  focus: 'errors',
  slide: `## Errors and power

A **type I error** rejects a true H₀; its rate is α. A **type II error** misses a real change. **Power** = 1 − P(type II) is the chance of detecting a given true effect.

### Detecting a worse supplier
- Exact one-sided test of p = 0.07 at α = 0.05
- n = 120: reject when X ≥ 14; actual α 0.041
- If truly p = 0.10, power only 0.31
- n = 480: reject when X ≥ 44; power 0.75

### Planning
- Fix α, the change worth detecting, and the power
- Power 0.8 against p = 0.10 needs about 560 chairs
- Or plan for precision: a CI width, not a test

### Watch out
An underpowered study that "finds nothing" was likely to find nothing even if the change were real: with 120 chairs, 69% of the time. Plan power before collecting data, never after a null result.`,
  narration:
    "How likely is a study to detect a change that really happened? Tests can err in two ways. A type one error rejects a null hypothesis that is true; the significance level alpha caps its rate. A type two error fails to reject a null that is false. Power is the probability of correctly detecting a given true effect. Return to the supplier test. With a hundred and twenty chairs, the exact test rejects when fourteen or more are defective, which keeps the false alarm rate at about four percent. But if the true rate has risen to ten percent, the test detects it only thirty one percent of the time, the pink curve on the left. The other sixty nine percent of the time, a real deterioration goes unnoticed. With four hundred and eighty chairs, the teal curve, power at ten percent rises to seventy five. Planning means fixing alpha, the change worth detecting, and the power wanted, then solving for the sample size: about five hundred and sixty chairs for eighty percent power against ten percent. Alternatively, plan for a target interval width. Either way, plan before collecting data. An underpowered study that finds nothing tells you very little. Next, ways the error rates are quietly broken.",
}
