import type { Section } from '../types'

export const assignmentSection: Section = {
  id: 'assignment',
  title: 'Random assignment versus random sampling',
  scene: 'design-assignment',
  focus: 'studies',
  slide: `## Random sampling, random assignment

Two different uses of chance. **Random sampling** chooses which units are studied; **random assignment** chooses which treatment each unit gets.

### What each one licenses
- Sampling: generalise to the sampled population
- Assignment: compare treatments causally
- Both: a causal effect for the whole population
- Neither: an association among the units observed

### Workshop studies
- Random chairs from the quarter: a rate, no cause
- A early in the week, B later: confounded
- Setting by lot per batch: causal, these batches
- One chair read 10 times: one unit, not ten

### Watch out
The experimental unit is what was assigned. If settings are assigned per batch, the batch is the unit, however many chairs or readings each batch produces.`,
  narration:
    "Chance enters a study in two different ways, and they answer different questions. Random sampling decides which units from a population get studied. It lets you generalise from the sample to that population. Random assignment decides which treatment each studied unit receives. It lets you attribute differences in outcome to the treatment, because nothing else systematically differs between the groups. The four combinations on the left follow. With both, you can make causal claims about the whole population. With assignment only, causal claims hold for the units in the study. With sampling only, you can describe the population but not explain it. With neither, you have an association among the units you happened to see. The table applies this to the workshop. Running setting A early in the week and B later confounds the setting with the day. Drawing the setting by lot for each batch supports a causal comparison for those batches. And measuring one chair ten times under setting B is still one chair: the experimental unit is whatever was assigned, not however many readings it yields. Next, describing what was measured.",
}
