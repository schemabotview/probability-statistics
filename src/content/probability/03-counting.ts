import type { Section } from '../types'

export const countingSection: Section = {
  id: 'counting',
  title: 'Counting with and without replacement and equal-likelihood assumptions',
  scene: 'prob-counting',
  focus: 'rules',
  slide: `## Counting outcomes

When every outcome is **equally likely**, P(A) = (outcomes in A) / (all outcomes). Counting rules make that division possible.

### The rules
- Ordered, with replacement: nᵏ
- Ordered, without replacement: n(n − 1)…(n − k + 1)
- Unordered, without replacement: C(n, k) = n! / (k!(n − k)!)

### A batch of 20 with 3 defective
- Draw 5 chairs at random, without replacement
- All C(20, 5) = 15 504 subsets equally likely
- Subsets with no defective: C(17, 5) = 6188
- P(no defective) = 6188/15 504 = 0.399

### Watch out
With replacement the answer would be 0.85⁵ = 0.444: removing a good chair makes the next draw slightly more likely to be defective. And "equally likely" is a claim about how chairs were picked: grabbing the top five from the pallet is not random.`,
  narration:
    "When every outcome is equally likely, a probability is just a count divided by a count. The work is in counting correctly. Three rules cover most cases. Choosing k items in order with replacement gives n to the k possibilities. In order without replacement, n times n minus one, and so on, k times. And unordered without replacement, the number of subsets, n choose k. Take a batch of twenty chairs with three defective, and draw five at random without replacement. There are fifteen thousand five hundred and four possible subsets of five. Those that avoid all three defective chairs are subsets of the seventeen good ones: six thousand one hundred and eighty eight. So the chance the sample contains no defective chair is about zero point four. On the left, that probability for every sample size, compared with drawing with replacement. The curves differ because, without replacement, each good chair removed makes the remaining batch slightly richer in defects. And remember the assumption behind the division: every subset equally likely. Taking the five chairs on top of the pallet is not that. Next, probabilities that change as information arrives.",
}
