import type { Section } from '../types'

export const confoundingSection: Section = {
  id: 'confounding',
  title: 'Confounding, selection and simple causal diagrams',
  scene: 'exp-confounding',
  focus: 'adjust',
  slide: `## Confounding

A **confounder** affects both the treatment received and the outcome, creating an association that is not the treatment's effect. A **causal diagram** makes such paths explicit.

### Chapter 1's observational month
- Operators chose setting B mostly for tables
- Tables fail more often, whatever the setting
- Product → setting and product → defect
- Crude comparison: B worse by 5.75 points

### Adjusting for the confounder
- Compare within each product: B better by 2 and 5 points
- Standardise to a 50/50 mix: B better by 3.5 points
- This closes the back-door path through product

### Watch out
Adjustment works only for confounders you measured and modelled. Randomisation breaks every arrow into the treatment, measured or not; observational adjustment needs the assumption that nothing else is open.`,
  narration:
    "What goes wrong when treatments are not randomised? Return to chapter one's observational month, where setting B looked worse overall. Operators chose the setting themselves, and they ran B mostly for tables. Tables are harder and fail more often whatever the setting. So product type affects both which setting a batch gets and whether it is defective. That makes it a confounder, and the diagram on the left shows the paths. The arrow from setting to defect is the effect we want. The path from setting back through product to defect is a back door, carrying association that is not causation. The crude comparison mixes both, and says B is worse by almost six points. Adjusting for product closes the back door. Within chairs, B is better by two points; within tables, by five. Standardised to an equal product mix, B is better by three and a half. But adjustment is only as good as the variables you measured. If operators also chose B for jobs that looked hard in some unrecorded way, the adjusted answer would still be confounded. Randomisation removes every arrow into the treatment, recorded or not, which is why it is the strongest design. Next, the assumptions observational analysis relies on.",
}
