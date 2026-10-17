import type { Section } from '../types'

export const ecdfSection: Section = {
  id: 'ecdf',
  title: 'Empirical distributions and nonparametric estimation',
  scene: 'rs-ecdf',
  focus: 'plugin',
  slide: `## The data as their own model

Every method so far assumed a family of distributions. The empirical distribution assumes none: it puts probability 1/n on each observation and lets the sample stand in for the population.

### The empirical CDF
F̂(t) is the proportion of jobs that took at most t minutes. It rises by 1/40 at each of the 40 processing times, and it converges to the true CDF as n grows.

### Plug-in estimation
- Mean 14.07, median 10.75
- Quartiles 9.23 and 15.85
- P(a job takes over 20 minutes) = 0.10
- Each is computed on F̂ as if it were the truth

### Honest uncertainty
The DKW band, ± 0.215 for n = 40, covers the whole true CDF with probability 0.95. Nonparametric does not mean assumption-free: it still needs independent jobs from one stable process.`,
  narration:
    "This chapter explains methods beyond simple parametric inference while keeping their assumptions and limits in view, and ends by evaluating a statistical argument as a whole. Every method so far began with a family of distributions: binomial, normal, Poisson. The empirical distribution begins with none. It places probability one over n on each observation, and lets the sample stand in for the population. Its cumulative distribution function, shown for the forty processing times from chapter one, is a staircase rising by one fortieth at each observed time. Any quantity defined on a distribution can be computed on this staircase. This is the plug-in principle. The mean is fourteen point one minutes, the median ten point seven five, the quartiles about nine and sixteen, and one job in ten took over twenty minutes. How close is the staircase to the truth? The grey band, from the Dvoretzky Kiefer Wolfowitz inequality, is plus or minus point two one five for forty observations, and covers the whole true curve at once with ninety five percent probability. Notice how wide that is. Nonparametric is not assumption free: the jobs must still be independent draws from one stable process.",
}
