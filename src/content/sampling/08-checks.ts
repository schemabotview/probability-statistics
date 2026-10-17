import type { Section } from '../types'

export const checksSection: Section = {
  id: 'checks',
  title: 'Analytical checks and repeated-sampling demonstrations',
  scene: 'samp-checks',
  focus: 'agree',
  slide: `## Checking a simulation

Before trusting a simulator on a question with no formula, run it on questions that **have** one, and require agreement within Monte Carlo error.

### Checks that passed
- Batch of 20: P(X ≥ 3) simulated 0.1578, exact 0.1610
- Gap 0.9 Monte Carlo SEs: consistent
- Shift mean: 108.52 simulated, 108.78 exact (1.3 SE)
- Each pmf value close to its binomial probability

### What simulation can and cannot show
- It reproduces a model's consequences
- It can expose an analytic error, or a coding one
- It cannot show the model describes the workshop

### Chapter outcome
You can explain a sampling distribution, distinguish the LLN from the CLT, assess a normal approximation against its assumptions, and report a simulation estimate with its uncertainty and its limits.`,
  narration:
    "How do you know a simulation is right? Test it where the answer is known. A simulator for batch defect counts should reproduce the binomial distribution exactly, so run it ten thousand times and compare. On the left, the simulated proportions and the exact probabilities agree closely at every count. The probability of three or more defective chairs is zero point one five seven eight simulated and zero point one six one zero exact, a gap of under one Monte Carlo standard error. The same simulator's mean shift length is within one point three standard errors of its exact value. Agreement within Monte Carlo error is the test; a gap of five standard errors would mean a bug or a mistaken formula. Simulation reproduces a model's consequences, and comparing them with analytic results can expose errors in either. But no amount of simulation shows that the model describes the workshop. That needs data, and the methods of the coming chapters. That completes the chapter. You can explain a sampling distribution, distinguish the law of large numbers from the central limit theorem, and report a simulation with its uncertainty. Next, these distributions and simulations prepare inference about unknown parameters.",
}
