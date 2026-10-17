import type { Section } from '../types'

export const zeroSection: Section = {
  id: 'zero',
  title: 'Probability zero versus impossibility and conditioning boundaries',
  scene: 'prob-zero',
  focus: 'shrink',
  slide: `## Probability zero

For a **continuous** quantity, every single exact value has probability zero, yet one of them occurs. Probability zero is not the same as impossible.

### Processing time as a continuous model
- T lognormal, median 12 minutes
- P(11 < T < 13) = 0.133
- P(11.9 < T < 12.1) = 0.0133
- P(T = 12 exactly) = 0, though T can be 12

### Density, not probability
- Divide by the width: 0.0665 per minute
- That limit is the **density** f(12), a rate
- Probabilities come from areas under f

### Chapter outcome
You can represent events, count and calculate probabilities with valid rules, compute conditional probabilities, and state the assumptions behind independence and Bayesian updating. P(A | T = 12) needs densities, not P(A ∩ B)/P(B).`,
  narration:
    "Can something with probability zero happen? For continuous quantities, it happens every time. Model a job's processing time as a continuous quantity with a median of twelve minutes. The probability it lands between eleven and thirteen minutes is about thirteen percent. Between eleven point nine and twelve point one, about one point three percent. Keep shrinking the interval and the probability shrinks with it, toward zero. So the probability that the time is exactly twelve minutes, to infinitely many decimal places, is zero. Yet some exact value always occurs. Probability zero is not the same as impossible. What stays meaningful is the ratio of probability to interval width, which settles at about zero point zero six six five per minute. That is the density at twelve: a rate, not a probability. Probabilities come from areas under the density curve. This also marks a boundary for conditioning. The definition P of A given B divides by P of B, which fails when B has probability zero, so conditioning on an exact time needs densities, which come later. That completes the chapter. Next, random variables express uncertain quantities under these probability rules.",
}
