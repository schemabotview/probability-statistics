import type { Section } from '../types'

export const conditionalSection: Section = {
  id: 'conditional',
  title: 'Conditional probability and multiplication trees',
  scene: 'prob-tree',
  focus: 'conditional',
  slide: `## Conditional probability

**P(B | A)** is the probability of B once we know A happened: **P(B | A) = P(A ∩ B) / P(A)**, defined when P(A) > 0.

### The multiplication rule
- Rearranged: P(A ∩ B) = P(A) × P(B | A)
- A tree applies it branch by branch
- Multiply along a path; add across paths

### Two draws from the batch of 20
- P(first defective) = 3/20
- Given that, 2 defective remain in 19: P = 2/19
- P(both defective) = 3/20 × 2/19 = 0.0158
- P(second defective) = 0.0158 + 0.1342 = 3/20

### Watch out
The second draw's chance depends on the first: 2/19 after a defective, 3/19 after a good one. Yet unconditionally it is 3/20, the same as the first. Conditioning changes probabilities; ignoring the condition does not.`,
  narration:
    "How should a probability change when you learn something? Conditional probability answers it. The probability of B given A is the probability of both, divided by the probability of A: you restrict attention to the outcomes where A happened and renormalise. Rearranged, it becomes the multiplication rule: the probability of A and B is the probability of A times the probability of B given A. A tree applies this one branch at a time. Draw two chairs from the batch of twenty with three defective. The first is defective with probability three twentieths. If it was, two defective chairs remain among nineteen, so the second is defective with probability two nineteenths; if the first was good, three nineteenths. Multiply along each path: both defective has probability about zero point zero one six. Add across paths that end the same way: the second chair is defective with probability zero point zero one six plus zero point one three four, which is exactly three twentieths. Unconditionally, the second draw is no different from the first. Only once you know the first result does it change. Next, reversing a condition.",
}
