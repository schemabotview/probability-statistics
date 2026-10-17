import type { Section } from '../types'

export const setOperationsSection: Section = {
  id: 'set-operations',
  title: 'Set operations, partitions and inclusion–exclusion',
  scene: 'prob-venn',
  focus: 'inclusion',
  slide: `## Combining events

Events combine like sets: **A ∪ B** (A or B), **A ∩ B** (A and B), and **Aᶜ** (not A). A **partition** splits the sample space into disjoint pieces that cover it.

### Defect types this quarter
- Seat 150, joint 180, finish 180 chairs
- Many chairs fail on more than one count
- Adding 150 + 180 + 180 = 510 overcounts

### Inclusion–exclusion
- P(A ∪ B) = P(A) + P(B) − P(A ∩ B)
- Three events: add singles, subtract pairs, add the triple
- 510 − (40 + 30 + 35) + 15 = 420 defective chairs
- So P(any defect) = 420/6000 = 0.07

### Partitions
The seven regions of the diagram, plus "no defect", partition the 6000 chairs: every chair is in exactly one, so their counts add to 6000.`,
  narration:
    "How do you count chairs that can fail in more than one way? Treat events as sets. A union B means A or B or both; A intersect B means both; the complement means not A. This quarter, a hundred and fifty chairs failed on the seat, a hundred and eighty on joints and a hundred and eighty on finish. Adding those gives five hundred and ten, but that is too many, because a chair with a bad seat and a bad joint was counted twice. Inclusion exclusion fixes the count. For two events, add their probabilities and subtract the overlap once. For three, add the three singles, subtract the three pairwise overlaps, and add back the triple overlap, which the subtraction removed once too often. Five hundred and ten, minus a hundred and five, plus fifteen, gives four hundred and twenty defective chairs, a probability of seven percent. On the left, each region of the diagram holds its own count. Those seven regions, together with the chairs with no defect, form a partition: every chair falls in exactly one piece, so the pieces add up to all six thousand. Next, counting outcomes systematically.",
}
