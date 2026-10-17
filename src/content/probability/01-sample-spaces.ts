import type { Section } from '../types'

export const sampleSpacesSection: Section = {
  id: 'sample-spaces',
  title: 'Sample spaces, events and probability axioms',
  scene: 'prob-sample-space',
  focus: 'outcomes',
  slide: `## Sample spaces and events

The **sample space** lists every possible outcome. An **event** is a set of outcomes. A **probability** assigns each event a number obeying three axioms.

### The axioms
- P(A) ≥ 0 for every event A
- P(whole sample space) = 1
- For disjoint events, P(A or B) = P(A) + P(B)
- Everything else follows: P(not A) = 1 − P(A)

### Three inspected chairs
- Each chair good (G) or defective (D): 2³ = 8 outcomes
- Model: each defective with p = 0.07, independently
- P(GGG) = 0.93³ = 0.804
- "At least one defective" = 1 − 0.804 = 0.196

### Watch out
The outcomes are not equally likely here: GGG is 2000 times as likely as DDD. Probabilities come from a model, and "independently" is part of that model, to be checked, not assumed.`,
  narration:
    "This chapter builds probability models and calculates with them under explicit assumptions, including how to update probabilities when new information arrives. Start with the building blocks. The sample space is the list of everything that could happen. Inspect three chairs, and each is good or defective, so there are two times two times two, eight outcomes. An event is any set of those outcomes, such as at least one chair is defective. A probability assigns each event a number, and it must follow three rules: no probability is negative, the whole sample space has probability one, and probabilities of events that cannot happen together add. Everything else follows from these, including that the probability of not A is one minus the probability of A. Now a model. Suppose each chair is defective with probability seven percent, independently of the others. Then all three are good with probability zero point nine three cubed, about zero point eight. So at least one is defective with probability about zero point two. On the left, the outcomes grouped by the number of defectives. Notice they are far from equally likely. Next, combining events.",
}
