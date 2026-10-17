import type { Section } from '../types'

export const baseRatesSection: Section = {
  id: 'base-rates',
  title: 'Base rates and reversed-condition errors',
  scene: 'prob-base-rates',
  focus: 'ppv',
  slide: `## Base rates

The **base rate** is how common a condition is before any evidence. The same evidence means very different things at different base rates.

### Reversing the condition
- P(flag | defective) = 0.9 describes the check
- P(defective | flag) describes a flagged chair
- At a 7% defect rate it is 0.575, not 0.9
- Treating one as the other is the **reversal error**

### As defects get rarer
- At a 1% rate, a flagged chair is defective 15% of the time
- At 0.1%, under 2%: nearly every flag is false
- Cutting false positives to 1% lifts 0.575 to 0.871

### Watch out
A test's accuracy figures (sensitivity, false-positive rate) do not tell you what a positive result means. That needs the base rate in the population where the test is used.`,
  narration:
    "What does a flag mean if defects become rarer? The check catches ninety percent of defective chairs, and that number describes the check. It is the probability of a flag given a defect. What an inspector wants is the reverse: the probability of a defect given a flag. At the workshop's seven percent defect rate, that is fifty eight percent, not ninety. Treating one conditional probability as the other is the reversal error, and it is one of the most common mistakes in reasoning about evidence. The curves on the left show why the base rate matters. As defects become rarer, the good chairs vastly outnumber the defective ones, and even a small false positive rate produces more false flags than true ones. At a one percent defect rate, a flagged chair is defective only about fifteen percent of the time; at a tenth of a percent, under two percent. Lowering the false positive rate to one percent, the teal curve, helps a lot: fifty eight percent becomes eighty seven. The lesson is general: accuracy figures describe a test, but what a positive result means depends on how common the condition is. Next, events with probability zero.",
}
