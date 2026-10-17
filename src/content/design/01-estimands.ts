import type { Section } from '../types'

export const estimandsSection: Section = {
  id: 'estimands',
  title: 'Populations, estimands, parameters and statistics',
  scene: 'design-estimand',
  focus: 'terms',
  slide: `## From a question to a number

A statistical question names a **population**, the **units** in it, and an **estimand**: the exact quantity you want to know about them.

### The workshop's question
- What share of this quarter's chairs fail?
- Population: the 6000 chairs made this quarter
- Unit: one chair; estimand: the fraction that fail
- Parameter p = 420/6000 = 0.07, usually unknown

### Parameter versus statistic
- A **parameter** is one fixed population value
- A **statistic** comes from a sample: p̂ = d/120
- 20 random samples gave p̂ from 0.033 to 0.117
- p̂ varies from sample to sample; p does not

### Watch out
"How good are our chairs?" is not yet an estimand. Which chairs, judged how, over what period? Until those are fixed, no number answers it.`,
  narration:
    "This chapter turns an informal question into a precise target and a plan for collecting data, and shows how to summarise data without claiming more than they support. Start with the workshop. Someone asks: how good are our chairs? That is not yet a statistical question. Make it precise. The population is every chair made this quarter, six thousand of them. The unit is one chair. The estimand is the fraction that fail the end of line inspection. In this synthetic workshop we happen to know the answer: four hundred and twenty failed, so the parameter p is zero point zero seven. In practice it is unknown, which is why we sample. Take a random sample of a hundred and twenty chairs and count the failures: that fraction is a statistic, p hat. On the left are twenty such samples. Their p hats range from about three percent to almost twelve percent, scattered around the fixed parameter. That is the core distinction of the subject: a parameter is one fixed number describing the population; a statistic is computed from data and changes from sample to sample. Next, what exactly gets recorded.",
}
