import type { Section } from '../types'

export const permutationSection: Section = {
  id: 'permutation',
  title: 'Permutation and randomisation tests and exchangeability',
  scene: 'rs-permutation',
  focus: 'code',
  slide: `## Permutation tests: shuffle the labels

If the setting made no difference, the labels A and B would be arbitrary. A permutation test reshuffles them, recomputes the difference each time, and asks how unusual the observed difference is.

### Settings A and B
The observed difference is 3.41 minutes. In 5000 relabellings, 0.32% were at least as extreme, so the permutation p-value is 0.0032.

### Two different questions
- Permutation: a null distribution, centred at 0
- Bootstrap: uncertainty, centred at 3.41
- One tests; the other gives (1.69, 5.11)

### Exchangeability
Shuffling is valid when, under the null, the labels are exchangeable. Unequal spreads (SD 1.6 against 4.0) break that for a test of means. With randomised assignment, the test follows from the design itself.`,
  narration:
    "A permutation test answers a testing question with almost no distributional assumptions. If the machine setting made no difference to processing times, the labels A and B would be arbitrary: any fifteen of the forty times could have carried the label A. So shuffle the labels, recompute the difference in means, and repeat. The grey histogram is five thousand such shuffles: the distribution of the difference when the null hypothesis is true. The observed difference, three point four one minutes, lies far in its tail; only about a third of one percent of shuffles were as extreme, so the p value is point zero zero three. The teal histogram is a bootstrap of the same difference, resampling within each group. It is centred at the estimate, not at zero, and gives a ninety five percent interval from one point seven to five point one. The permutation test asks whether there is any effect; the bootstrap asks how large it is. The shuffling is justified by exchangeability: under the null, the labels must be interchangeable. Here B is far more variable than A, so equal means alone do not make the labels exchangeable. When the settings were randomly assigned, the randomisation itself justifies the test.",
}
