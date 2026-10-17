import type { Section } from '../types'

export const monteCarloSection: Section = {
  id: 'monte-carlo',
  title: 'Monte Carlo probability and expectation estimates',
  scene: 'samp-monte-carlo',
  focus: 'code',
  slide: `## Monte Carlo estimation

When a probability or expectation has no formula, **simulate** the model many times and average. The LLN makes the average converge; the CLT gives its uncertainty.

### A shift of 8 jobs
- Each time lognormal, median 12 minutes
- No closed form for the sum's distribution
- Simulate R = 10 000 shifts of 8 jobs
- P(total > 120 minutes) ≈ 0.2634

### Its uncertainty
- Monte Carlo SE = √(p̂(1 − p̂)/R) = 0.0044
- Report 0.263 ± 0.009 (±2 SE)
- A 2 000 000-replication run gives 0.266

### Watch out
Monte Carlo error is only part of the story. The estimate is exactly as good as the model: if job times are dependent within a shift, or not lognormal, 10 million replications will estimate the wrong number very precisely.`,
  narration:
    "What if a probability has no formula? Simulate. Monte Carlo estimation generates the model's random outcome many times and averages. Here is a workshop question: if each of a shift's eight jobs takes a lognormal time with median twelve minutes, how likely is the shift to run over two hours? The sum of lognormals has no closed form, so the code on the right simulates ten thousand shifts, adds up each shift's eight times, and records the fraction over a hundred and twenty minutes: about twenty six percent. The law of large numbers says this fraction converges to the true probability. The central limit theorem gives its uncertainty: a Monte Carlo standard error of the square root of p hat times one minus p hat over R, about zero point zero zero four four. So report zero point two six three, plus or minus about zero point zero zero nine. On the left, the running estimate and its uncertainty band narrowing as replications accumulate, around the value from a two million replication run. One limit dominates everything else. Monte Carlo error measures the simulation, not the model. If the times are dependent within a shift, the answer is precisely wrong. Next, planning a simulation's size.",
}
