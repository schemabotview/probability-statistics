import type { Section } from '../types'

export const randomVariablesSection: Section = {
  id: 'random-variables',
  title: 'Random variables, support, mass and density functions, and CDFs',
  scene: 'rv-cdf',
  focus: 'mass',
  slide: `## Random variables

A **random variable** X assigns a number to each outcome. Its **support** is the set of values it can take; its **distribution** says how probability spreads over them.

### Discrete: a mass function
- X = defective chairs among 10 sampled
- Support {0, 1, …, 10}; model Binomial(10, 0.07)
- Mass function: P(X = 0) = 0.484, P(X = 1) = 0.364
- The masses add to 1

### The CDF works for every kind
- F(x) = P(X ≤ x), from 0 up to 1, never decreasing
- Discrete: a step at each value, by its mass
- Continuous: a smooth rise; its slope is the density
- P(a < X ≤ b) = F(b) − F(a) in every case

### Watch out
A random variable is a rule, not a number: "X = 2" is an event, with probability 0.123 here. The data you record are one realised value of it.`,
  narration:
    "This chapter describes uncertain quantities with probability models, and connects those models to averages, variability, tails and the reference distributions used later for inference. A random variable is a rule that attaches a number to each outcome. Count the defective chairs in a random sample of ten, and you have a random variable X. Its support is the set of values it can take, zero to ten, and its distribution says how probability is spread over them. For a discrete variable like this one, the mass function gives the probability of each value. Under a binomial model with a seven percent defect rate, there is a forty eight percent chance of no defectives and a thirty six percent chance of exactly one. The stems on the left show the mass function. The orange steps show the cumulative distribution function, the probability of being at most x. It works for every kind of variable. For discrete variables it rises in steps, one for each value, by that value's mass. For continuous variables it rises smoothly, and its slope is the density. Either way, the probability of an interval is a difference of two CDF values. Next, summarising a distribution with one or two numbers.",
}
