import type { Section } from '../types'

export const bayesSection: Section = {
  id: 'bayes',
  title: 'Total probability and Bayes’ rule',
  scene: 'prob-bayes',
  focus: 'rule',
  slide: `## Total probability and Bayes' rule

**Total probability** adds over a partition: P(F) = P(F | D) P(D) + P(F | G) P(G). **Bayes' rule** reverses a condition: P(D | F) = P(F | D) P(D) / P(F).

### The end-of-line check
- 7% of chairs are defective
- The check flags 90% of defective chairs
- It also flags 5% of good chairs

### Per 10 000 chairs
- 700 defective: 630 flagged, 70 missed
- 9300 good: 465 flagged, 8835 passed
- P(flag) = 1095/10 000 = 0.1095
- P(defective | flag) = 630/1095 = **0.575**

### Reading the tree
Counts make Bayes' rule concrete: among flagged chairs, how many are really defective? Only 58%, because the many good chairs contribute 465 false flags. A passed chair is defective with probability 70/8905 = 0.008.`,
  narration:
    "If the end of line check flags a chair, how likely is it really defective? This needs two tools. Total probability splits an event across a partition: a flag comes either from a defective chair or from a good one, so add the two routes. Bayes' rule then reverses the condition: the probability of defective given flagged equals the probability of flagged given defective, times the probability of defective, divided by the probability of a flag. The numbers are easiest as expected counts. Picture ten thousand chairs. Seven percent, seven hundred, are defective, and the check flags ninety percent of them: six hundred and thirty. Of the nine thousand three hundred good chairs, it flags five percent: four hundred and sixty five. So one thousand and ninety five chairs are flagged, and six hundred and thirty of those are truly defective. The probability that a flagged chair is defective is about fifty eight percent, far below the ninety percent sensitivity. The many good chairs produce almost as many flags as the few defective ones. And a chair that passes is defective with probability under one percent. Next, when knowing one event says nothing about another.",
}
