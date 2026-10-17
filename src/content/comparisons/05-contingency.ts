import type { Section } from '../types'

export const contingencySection: Section = {
  id: 'contingency',
  title: 'Contingency tables, expected counts and sparse alternatives',
  scene: 'cmp-contingency',
  focus: 'counts',
  slide: `## Testing a two-way table

The **χ² test of independence** compares observed counts O with the counts expected if the variables were independent: **E = row total × column total / grand total**.

### Product by defect status, 1000 items
- χ² = Σ (O − E)²/E = 17.63
- df = (3 − 1)(3 − 1) = 4; p = 0.0015
- Tables: 15 major defects, 8.4 expected
- Pearson residuals show which cells drive it

### Sparse cells
- χ² needs expected counts of about 5 or more
- Stool with major defect: expected 2.8
- Monte Carlo, fixed margins: p = 0.0024
- Or Fisher's exact test for small tables

### Watch out
A significant χ² says the table is not independent, not where or why. Read the residuals, then think about mechanism: tables are harder to make, which is an engineering explanation, not a statistical one.`,
  narration:
    "Is defect status related to product type? The chi square test of independence answers that for a whole table. First compute the counts you would expect if product and defect status were independent: for each cell, the row total times the column total, divided by the grand total. Then add up, over all cells, the squared difference between observed and expected, divided by expected. For the thousand item table from chapter four, that sum is about seventeen and a half, with four degrees of freedom, giving a p value of about one and a half in a thousand. The variables are not independent. On the left, the Pearson residuals show which cells drive the result: tables have more minor and major defects than independence predicts, about one and a half times as many major ones. One caution concerns sparse cells. The chi square approximation needs expected counts of roughly five or more, and stools with a major defect are expected only about three times. A Monte Carlo version, shuffling defect labels while keeping the margins fixed, gives a p value of about two in a thousand, confirming the result. A significant test says the table departs from independence; the residuals say where, and the reason is a question of mechanism. Next, testing a model's fit.",
}
