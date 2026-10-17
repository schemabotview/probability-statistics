import type { Section } from '../types'

export const likelihoodSection: Section = {
  id: 'likelihood',
  title: 'Likelihood versus parameter probability',
  scene: 'est-likelihood',
  focus: 'compare',
  slide: `## The likelihood function

The **likelihood** L(θ) is the probability (or density) of the observed data, viewed as a function of the parameter θ with the data held fixed.

### 9 defective chairs in 120
- L(p) = p⁹(1 − p)¹¹¹, for p between 0 and 1
- Largest at p = 0.075, the sample proportion
- At p = 0.05 it is half as large; at 0.03, a twentieth
- Values with L above 1/8 of the peak: 0.036 to 0.134

### What it is not
- It is not the probability that p takes a value
- Its area need not be 1; only ratios matter
- A probability for p needs a prior: chapter 11

### Watch out
"p = 0.075 is the most likely value of p" is a common misreading. Better: p = 0.075 makes the observed data most probable. The difference matters as soon as uncertainty about p is reported.`,
  narration:
    "Which values of the defect rate are consistent with finding nine defective chairs in a hundred and twenty? The likelihood function answers it. Take the probability of the observed data under the model, here p to the ninth times one minus p to the hundred and eleventh, and read it as a function of p with the data held fixed. On the left, scaled so its peak is one. It is largest at p equal to nought point oh seven five, the sample proportion. At five percent it is about half as large, meaning the data are half as probable if the true rate were five percent. At three percent it is a twentieth. The values whose likelihood is at least an eighth of the maximum run from about three and a half to thirteen percent, a likelihood interval. Be careful about what the curve is not. It is not a probability distribution for p: its area need not be one, and only ratios between its values have meaning. Saying that nought point oh seven five is the most probable value of p is a common misreading; the accurate statement is that it makes the observed data most probable. Turning a likelihood into probabilities for p needs a prior, the subject of chapter eleven. Next, maximising it.",
}
