import type { Section } from '../types'

export const ittSection: Section = {
  id: 'itt',
  title: 'Attrition, noncompliance and intention-to-treat',
  scene: 'exp-itt',
  focus: 'analyses',
  slide: `## Noncompliance and intention to treat

When units do not receive their assigned treatment, or drop out, the groups as **randomised** remain comparable, but the groups as **treated** may not be.

### 200 randomised batches
- 100 assigned to B, 100 to A
- Operators switched 9 hard B batches back to A
- True effect of running B: −1.0 point

### Three analyses
- **Intention to treat**, as assigned: −1.25
- **Per protocol**, switchers dropped: −1.55
- **As treated**, by setting run: −1.70
- The last two move hard batches out of B

### Watch out
Excluding or regrouping units after randomisation can reintroduce confounding: here B looks better than it is. ITT estimates the effect of **assigning** B. For the effect of receiving it, divide by compliance (−1.37), under extra assumptions.`,
  narration:
    "What happens when an experiment does not go to plan? Two hundred batches were randomised, a hundred to each setting. But operators, worried about jams, switched nine of the hardest batches assigned to B back to setting A. In this simulation the true effect of running B is a one point fall in defect rate. There are three ways to analyse it. Intention to treat compares the groups as randomised, keeping every batch where it was assigned. Per protocol drops the nine switched batches. As treated regroups batches by the setting they actually ran. On the left, the per protocol and as treated estimates are larger, about minus one and a half and minus one point seven, because both move hard batches out of the B group, leaving B with easier batches. That is confounding reintroduced after randomisation. Intention to treat keeps the randomised comparison intact. It answers a slightly different question, the effect of assigning B, which includes the reality that operators sometimes override it; its estimate, minus one point two five, is consistent with that. The effect of actually receiving B can be recovered by dividing by the compliance rate, under further assumptions. Next, planning an experiment properly.",
}
