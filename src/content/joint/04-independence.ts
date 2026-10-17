import type { Section } from '../types'

export const independenceSection: Section = {
  id: 'independence',
  title: 'Factorisation and independence',
  scene: 'joint-factor',
  focus: 'cells',
  slide: `## Independence as factorisation

X and Y are **independent** when the joint factors into its margins: **P(x, y) = P(x) P(y)** for every cell, or f(x, y) = f_X(x) f_Y(y) for densities.

### Checking the product × defect table
- If independent: P(table, major) = 0.3 × 0.028 = 0.84%
- Observed: 1.5%, nearly double
- P(chair, minor): 3.3% observed, 3.96% if independent
- So product and defect status are dependent

### Equivalent statements
- Every conditional row equals the marginal
- P(defect | product) is the same for all products
- For densities: the support must be a product set too

### Watch out
Cutting and total time cannot be independent: the support y ≥ x is not a rectangle, so knowing X = 8 rules out Y = 7. A non-rectangular support alone proves dependence, before any data are looked at.`,
  narration:
    "What would it mean for product and defect status to be unrelated? Independence means the joint distribution factors into its margins: every cell equals its row probability times its column probability. Equivalently, every conditional row is the same as the marginal, so the defect distribution does not depend on the product. Check it. If they were independent, tables with a major defect would make up thirty percent times two point eight percent, about point eight four percent of items. The table shows one and a half percent, nearly double. Chairs with a minor defect are three point three percent, against about four percent under independence. On the left, each defective cell plotted against its independence prediction. Under independence they would all sit on the diagonal. They do not, so product and defect status are dependent. The definition carries over to densities: the joint density must factor into the product of the marginal densities. One consequence is worth remembering. The support must then be a product set, a rectangle. Cutting time and total time have a triangular support, so they cannot be independent: learning that cutting took eight minutes rules out a total of seven. Next, measuring how strongly variables move together.",
}
