import type { Section } from '../types'

export const budgetsSection: Section = {
  id: 'budgets',
  title: 'Simulation uncertainty, replication budgets and seeds',
  scene: 'samp-budget',
  focus: 'budgets',
  slide: `## Planning a simulation

Monte Carlo error falls like **1/√R**: four times the replications halves the standard error. Plan R from the precision you need, and record the seed.

### Repeating the shift simulation
- 200 runs with different seeds at each R
- R = 1000: estimates spread with SD 0.0134
- R = 4000: 0.0065; R = 16 000: 0.0035
- Theory √(p(1 − p)/R): 0.0140, 0.0070, 0.0035

### Budgets
- For ±δ at 2 SE: R ≈ 4p(1 − p)/δ²
- ±0.002 around 0.27 needs about 195 000 runs
- Rare events need far more: SE relative to p grows

### Seeds
A **seed** fixes the random stream, so a run can be reproduced exactly: seed 16 gives 0.2634 every time. Report it. Changing seeds until a result looks good is selective reporting.`,
  narration:
    "How many replications are enough? Monte Carlo error shrinks like one over the square root of R, so precision is expensive: four times the replications halves the standard error. On the left, the shift simulation was rerun two hundred times with different seeds at each of three budgets. With a thousand replications the estimates spread with a standard deviation of about zero point zero one three; with four thousand, about zero point zero zero six five; with sixteen thousand, zero point zero zero three five. The theoretical curve, square root of p times one minus p over R, matches. This gives a planning rule: to get within plus or minus delta at two standard errors, you need about four p times one minus p over delta squared replications. Pinning this probability to within zero point zero zero two needs nearly two hundred thousand runs. Rare events are harder still, because the error relative to a small probability is large. Finally, seeds. A seed fixes the stream of random numbers, so a run can be reproduced exactly. Record it and report it. Re running with new seeds until the answer looks favourable is a form of selective reporting. Next, checking a simulator before trusting it.",
}
