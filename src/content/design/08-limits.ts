import type { Section } from '../types'

export const limitsSection: Section = {
  id: 'limits',
  title: 'Ethical collection and limits of generalisation',
  scene: 'design-generalise',
  focus: 'claims',
  slide: `## Ethics and the limits of a study

A study supports claims about the population it **sampled**, in the **period** it covered. Collecting the data also carries obligations to the people involved.

### When the population moves
- Weeks 1–4 sampled: defect rate 6.55%
- The timber supplier changed in week 7
- Weeks 7–12: 10.53%, outside anything the study saw
- Night shift never sampled: no claim about it

### Collecting responsibly
- Collect only what the question needs
- Keep people's identities out of shared files
- Report how the data were gathered, not just results

### Chapter outcome
You can state a statistical question with its unit and population, explain how the collection method limits conclusions, and choose summaries and plots without claiming more than the data show.`,
  narration:
    "How far can a well run study be trusted? Only as far as the population and period it actually sampled. Suppose a careful random sample of weeks one to four put the defect rate at about six and a half percent. That claim is well supported for those weeks. In week seven the timber supplier changed, and the rate rose to about ten and a half percent. On the left, the shaded window is what the study saw; the later weeks are a different population. Claims about now, or about the night shift that was never sampled, go beyond the evidence. Collection has ethical limits too. Gather only what the question needs, keep people's identities out of shared files unless there is consent and a reason, and report how the data were gathered as well as what they showed, so others can judge the limits for themselves. That completes the chapter. You can state a statistical question with its unit and population, explain how the way data were collected limits what they show, and choose summaries that do not claim too much. Next, probability provides a model for the uncertainty observed in data.",
}
