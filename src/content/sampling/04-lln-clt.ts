import type { Section } from '../types'

export const llnCltSection: Section = {
  id: 'lln-clt',
  title: 'LLN stabilisation versus CLT distributional approximation',
  scene: 'samp-clt',
  focus: 'means',
  slide: `## Two limit theorems

The **law of large numbers** (LLN) says the sample mean settles at μ. The **central limit theorem** (CLT) says how it fluctuates on the way: approximately normally, with SD σ/√n.

### Means of processing times
- Single times: right-skewed, μ = 13.6, σ = 7.25
- n = 4: SD 3.62, still clearly skewed
- n = 30: SD 1.32, close to normal
- Running mean: 16.9, 14.1, 13.7 at 10, 100, 1000 draws

### Different claims
- LLN: where the mean goes, needs a finite mean
- CLT: the shape of its error, needs finite variance
- "Approximately" depends on n and on skewness

### Watch out
The CLT is about the **mean**, not the data: individual jobs stay skewed however many you collect. And tail probabilities converge slowest: beyond 2 SE the normal says 2.3%; with n = 30 it is still 3.1%.`,
  narration:
    "What happens to an average as the sample grows? Two different theorems answer two different questions. The law of large numbers says the sample mean settles at the true mean. A running mean of simulated processing times is about seventeen after ten jobs, fourteen after a hundred, and thirteen point seven after a thousand, closing in on the true thirteen point six. The central limit theorem describes how the mean fluctuates on the way there: approximately normally, with standard deviation sigma over the square root of n. On the left, the distribution of the mean of four processing times, in pink, is still clearly skewed. The mean of thirty, in teal, is narrower, with standard deviation about one point three, and close to its normal approximation. Keep the claims separate. The law of large numbers needs only a finite mean. The central limit theorem needs a finite variance, and its approximately depends on both n and how skewed the data are. Two warnings. The theorem concerns the mean, not the data: individual jobs stay skewed however many you collect. And tails converge slowest: with thirty jobs, the chance of a mean more than two standard errors high is still three percent, not two point three. Next, when these results fail.",
}
