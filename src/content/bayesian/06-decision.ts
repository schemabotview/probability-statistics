import type { Section } from '../types'

export const decisionSection: Section = {
  id: 'decision',
  title: 'Expected loss and Bayesian decisions',
  scene: 'bayes-decision',
  focus: 'choice',
  slide: `## Choosing an action under a stated loss

A decision needs more than a posterior: it needs the cost of each action under each possible defect rate. Bayesian decision theory picks the action with the smallest expected loss.

### The workshop’s decision
Next month 2000 chairs, and each defective one costs £8 to repair. Keeping the new supplier costs 16 000 × p. Switching back costs a £300 fee plus the old rate, £1420 in all.

### Expected loss
- Cost is linear in p, so use the posterior mean
- Keep is cheaper only if E[p] < 0.0888
- Flat and informed priors: switch
- Sceptical prior: E[p] = 0.075, so keep

### Separate the pieces
The loss is a business judgement and the posterior is the evidence. Stating both lets a reader see which one drives the choice. A p-value alone cannot make this trade-off.`,
  narration:
    "Estimating the defect rate does not by itself say what to do. A decision needs the cost of each action under each possible rate. Next month the workshop will make two thousand chairs, and each defective chair costs eight pounds to repair. Keeping the new supplier therefore costs sixteen thousand times the defect rate. Switching back costs a three hundred pound fee plus the old supplier's seven percent, one thousand four hundred and twenty pounds in all. On the left, the amber line is the cost of keeping and the violet line the cost of switching. They cross at a break even rate of about point zero eight nine. Because the cost of keeping is linear in the rate, its expected cost under the posterior is sixteen thousand times the posterior mean. Under the flat and informed priors, that is one thousand nine hundred and sixty seven and one thousand seven hundred and thirty pounds, so switching back is cheaper. Under the sceptical prior it is one thousand two hundred pounds, and keeping wins. The loss function is a business judgement and the posterior is the evidence. Stating both separately shows which one drives the decision.",
}
