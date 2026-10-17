import type { Section } from '../types'

export const potentialOutcomesSection: Section = {
  id: 'potential-outcomes',
  title: 'Potential outcomes, interventions and target effects',
  scene: 'exp-potential',
  focus: 'effects',
  slide: `## Potential outcomes

Each unit has a **potential outcome** under each treatment: Y(A) if run on setting A, Y(B) if run on B. Its causal effect is **Y(B) − Y(A)**.

### The fundamental problem
- A batch runs on one setting, so we see one outcome
- The other is a counterfactual, never observed
- Individual effects cannot be measured directly

### A synthetic check, where both are known
- 8 batches; true effects from −0.9 to −2.3 points
- Average treatment effect (ATE): −1.575
- One random assignment: difference in means −1.30
- Across all 70 assignments: average exactly −1.575

### Watch out
Name the target first: the average effect in these batches, in all future batches, or in hard batches only. Randomisation makes the difference in means **unbiased** for the ATE, but any one experiment can miss it by more than a point.`,
  narration:
    "This chapter explains how an experiment's design supports claims about interventions, and why observational comparisons need extra assumptions. Start with what a causal effect is. Each batch has two potential outcomes: the defect rate it would have under setting A, and the rate it would have under setting B. The causal effect of B for that batch is the difference. The trouble is that a batch runs on one setting only, so one of the two outcomes is always unobserved, a counterfactual. Individual effects cannot be measured directly. On the left is a synthetic example where both outcomes are known, which never happens in practice. Every batch improves under B, by between one and two and a third points, and the average treatment effect is minus one point five seven five. Now run an experiment: randomly assign four batches to B. We see the bright points only, and the difference in observed means is minus one point three. Over all seventy possible random assignments, the difference averages exactly the true effect. That is what randomisation buys: an unbiased estimate of the average effect. But a single experiment can miss by more than a point, which is why replication matters. Next, the principles of good design.",
}
