import type { Section } from '../types'

export const conditionalSection: Section = {
  id: 'conditional',
  title: 'Conditional distributions and conditional expectation',
  scene: 'joint-conditional',
  focus: 'expect',
  slide: `## Conditional distributions

The **conditional distribution** of Y given X = x is the joint row at x, rescaled: P(Y = y | X = x) = P(x, y) / P(X = x).

### Defect status given product
- Chairs: 92.5% none, 5.5% minor, 2.0% major
- Tables: 85% none, 10% minor, 5% major
- Stools: 96% none, 3% minor, 1% major

### Conditional expectation
- Repair cost: none £0, minor £8, major £40
- E[cost | chair] = £1.24, table £2.80, stool £0.64
- E[cost | product] is itself a random variable
- Its average, weighted by product share, is £1.648

### Watch out
A conditional expectation is a function of the condition: E[Y | X] changes as X changes. Reporting the overall £1.65 for a batch of tables understates their expected cost by more than £1 a piece.`,
  narration:
    "How does defect status depend on the product? Look at one row of the joint table and rescale it so it sums to one. That is the conditional distribution of defect status given the product. Among chairs, ninety two and a half percent have no defect, five and a half percent a minor one, two percent a major one. Tables are worse: ten percent minor and five percent major. Stools are best. On the left, the minor and major rates for each product side by side. Now attach a cost: nothing for no defect, eight pounds for minor, forty for major. The conditional expectation of cost given the product averages the costs using that product's row: one pound twenty four for a chair, two pounds eighty for a table, sixty four pence for a stool. Notice that this conditional expectation depends on the product, so it is itself a random quantity, a function of which product turns up. And averaging it, with weights sixty, thirty and ten percent, gives back the overall expected cost, one pound sixty five. Using that overall figure for a batch of tables would understate the cost by more than a pound a piece. Next, when the rows are all alike.",
}
