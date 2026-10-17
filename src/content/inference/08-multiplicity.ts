import type { Section } from '../types'

export const multiplicitySection: Section = {
  id: 'multiplicity',
  title: 'Multiplicity, optional stopping and failure to reject',
  scene: 'inf-multiplicity',
  focus: 'remedies',
  slide: `## Multiplicity and optional stopping

A test's α holds for **one** prespecified analysis. Running many tests, or testing repeatedly as data arrive, inflates the chance of a false alarm.

### Many tests
- 20 defect types, none truly changed
- P(at least one p < 0.05) = 1 − 0.95²⁰ = 64%
- Bonferroni: test each at 0.05/20, overall 4.9%

### Many looks
- Test after every 20 chairs, stop at p < 0.05
- With no real change: 16.5% false alarms by 400
- One planned test at 400 chairs: 3.3%

### Chapter outcome
You can interpret coverage, choose an interval matched to the question, explain a test's evidence and error control, read effect sizes with their uncertainty, and recognise selective or sequential claims that void the stated α. Failing to reject is not evidence of no effect.`,
  narration:
    "When does a p value below five percent stop meaning what it says? The five percent error rate holds for one analysis, specified in advance. Break that and the rate climbs. Suppose the workshop tests twenty defect types for a change, when in truth none has changed. Each test has a five percent false alarm rate, but the chance that at least one of twenty raises an alarm is sixty four percent, the pink curve on the left. Reporting whichever came out significant is close to guaranteed to find something. A Bonferroni correction, testing each at a twentieth of five percent, restores an overall rate of about five percent. The second trap is optional stopping. Inspect chairs and run the test after every twenty, stopping as soon as it rejects. With no real change, the simulation shows a false alarm rate of sixteen and a half percent by four hundred chairs, against three percent for a single planned test. And when a test does not reject, say there is insufficient evidence, not that there is no effect. That completes the chapter. You can interpret coverage, choose an interval, and judge a test's evidence and error control. Next, specific data types and comparison units determine the right procedure.",
}
