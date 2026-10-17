import type { Section } from '../types'

export const marginalsSection: Section = {
  id: 'marginals',
  title: 'Marginalisation by summation and integration',
  scene: 'joint-margins',
  focus: 'table',
  slide: `## Marginal distributions

A **marginal** distribution is one variable's distribution on its own, found by summing (or integrating) the joint over the other variable.

### From the product × defect table
- Sum each row: chair 0.6, table 0.3, stool 0.1
- Sum each column: none 0.906, minor 0.066, major 0.028
- The margins are literally the table's margins

### The continuous version
- f_X(x) = ∫ f(x, y) dy, over the support at that x
- For cutting and total time, y runs from x upward
- The limits come from the support region

### Watch out
Margins do not determine the joint. Many different tables share these exact row and column totals, with very different relationships between product and defect status. Knowing each variable alone is not knowing how they go together.`,
  narration:
    "How do you get one variable's distribution from a joint model? Sum out the other one. That gives the marginal distribution, named because in a table it appears in the margins. Add along each row of the product by defect table: chairs make up sixty percent of items, tables thirty, stools ten. Add down each column: ninety point six percent have no defect, six point six percent a minor defect, two point eight a major one. On the left are both marginal distributions, each obtained by summing over the other variable. For continuous variables the sum becomes an integral: the marginal density of X at a value x integrates the joint density over all y. The support matters here, because it sets the limits. For cutting time and total time, the integral over y starts at x, since the total can never be less than the cutting time. One important limitation: margins do not determine the joint distribution. Many different tables have exactly these row and column totals, with very different relationships between product and defect. Knowing each variable on its own is not knowing how they go together. Next, how one variable's distribution changes when the other is known.",
}
