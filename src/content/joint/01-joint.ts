import type { Section } from '../types'

export const jointSection: Section = {
  id: 'joint',
  title: 'Joint distributions and support regions',
  scene: 'joint-support',
  focus: 'region',
  slide: `## Joint distributions

A **joint distribution** describes two or more random variables together: which combinations occur and how likely each is. Its **support** is the set of combinations that can occur.

### Discrete: a joint table
- Product (chair, table, stool) and defect status
- P(chair, none) = 0.555, P(table, major) = 0.015
- Nine probabilities, summing to 1

### Continuous: a joint density
- X = cutting time, Y = total processing time
- Probabilities are volumes under f(x, y)
- Y includes X, so Y ≥ X: no job below y = x
- The support is a region, not a rectangle

### Watch out
Constraints between variables live in the support. Treating X and Y as if any combination were possible, by modelling each separately and pairing them at random, would produce impossible jobs that finish before cutting does.`,
  narration:
    "This chapter models several uncertain quantities at once, and separates association from independence. A joint distribution describes variables together: which combinations of values occur, and how likely each combination is. For two discrete variables, it is a table. Inspect a thousand items, classify each by product and by defect status, and the nine cell proportions form a joint distribution: fifty five and a half percent are chairs with no defect, one and a half percent are tables with a major defect, and all nine add up to one. For continuous variables, the joint distribution is a density over the plane, and probabilities are volumes under it. On the left, two hundred jobs, each with its cutting time and its total processing time. Because the total includes the cutting, every job lies above the line where the two are equal. That region is the support, and it is not a rectangle. Constraints like this are part of the joint model. If you modelled cutting time and total time separately and paired values at random, you would create impossible jobs that finish before they are cut. Next, recovering one variable's distribution from the joint.",
}
