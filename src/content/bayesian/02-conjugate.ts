import type { Section } from '../types'

export const conjugateSection: Section = {
  id: 'conjugate',
  title: 'Beta–binomial conjugate updating',
  scene: 'bayes-conjugate',
  focus: 'rule',
  slide: `## Beta–binomial conjugate updating

A defect rate can take any value between 0 and 1, so the prior is a density. With a Beta prior and binomial data the posterior is again Beta, and updating is just counting.

### The rule
Prior Beta(a, b), then x defective in n: the posterior is Beta(a + x, b + n − x). The prior behaves like a + b chairs already inspected, a of them defective.

### Two priors, one dataset
- Flat Beta(1, 1): posterior Beta(15, 107), mean 0.123
- Informed Beta(2, 26): mean 0.071, worth 28 chairs
- Its posterior Beta(16, 132) has mean 0.108
- The data alone say 14 / 120 = 0.117

### Reading the shift
The informed prior pulls the estimate a little towards the old rate, because 28 prior chairs are weighed against 120 new ones. As inspections accumulate the data dominate and both posteriors converge.`,
  narration:
    "Three hypotheses were a simplification: the defect rate could be any number between zero and one, so the prior should be a density. The beta family makes this easy. If the prior is a beta distribution with parameters a and b, and we observe x defectives in n chairs, the posterior is beta with parameters a plus x and b plus n minus x. In words, add the defectives to a and the good chairs to b. A useful reading follows: a beta prior behaves like a plus b chairs already inspected, a of them defective. On the left are two priors. The flat prior, beta one one, says every rate is equally plausible; after the data, its posterior is beta fifteen, one hundred and seven, with mean point one two three. The informed prior, beta two, twenty six, has mean point zero seven one, the old supplier's rate, and is worth about twenty eight chairs. Its posterior has mean point one zero eight, pulled a little towards seven percent. The data alone give point one one seven. With more inspections, the twenty eight prior chairs matter less and less, and the two posteriors converge.",
}
