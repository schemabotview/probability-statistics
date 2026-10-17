import type { Section } from '../types'

export const associationSection: Section = {
  id: 'association',
  title: 'Association, aggregation reversals and exploratory claims',
  scene: 'design-simpson',
  focus: 'mix',
  slide: `## Association and aggregation

An **association** is a pattern in which values of two variables occur together. Aggregating over a third variable can hide or even **reverse** it.

### Settings A and B, one month
- Chairs: A 10%, B 8%; tables: A 30%, B 25%
- B has the lower defect rate for both products
- Overall: A 15%, B 20.75%, so B looks worse
- B ran 75% tables, the harder product; A ran 25%

### Why it reverses
- An overall rate is a weighted average of product rates
- The weights are each setting's product mix
- At any fixed mix, B's line lies below A's

### Watch out
This is **Simpson's paradox**. Neither table is "the truth": the right comparison depends on the question. An exploratory pattern found by slicing data is a lead to investigate, not a conclusion.`,
  narration:
    "Is setting B better or worse than setting A? Look at one month of inspections. For chairs, B's defect rate is eight percent against A's ten. For tables, B's is twenty five percent against A's thirty. B is better for both products. Yet overall, A's rate is fifteen percent and B's is almost twenty one. How can B be better within every group and worse in total? Because an overall rate is a weighted average of the product rates, and the weights are each setting's product mix. Setting A ran mostly chairs, the easy product; setting B ran mostly tables, the hard one. On the left, each setting's overall rate is drawn as a function of the share of chairs. B's line is below A's everywhere, but the two settings sit at very different points along it. This reversal is called Simpson's paradox. Which comparison is right depends on the question, and the product is a lurking variable that must be considered. More generally, patterns found by slicing data many ways are leads to investigate, not conclusions. Next, the limits of what any of this supports.",
}
