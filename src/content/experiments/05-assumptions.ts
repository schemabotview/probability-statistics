import type { Section } from '../types'

export const assumptionsSection: Section = {
  id: 'assumptions',
  title: 'Consistency, overlap, exchangeability and interference',
  scene: 'exp-assumptions',
  focus: 'conditions',
  slide: `## Causal assumptions

Reading a comparison causally needs four assumptions. A randomised design secures some by construction; an observational one must argue for each.

### The four
- **Consistency**: one well-defined treatment
- **Overlap**: every unit could get either
- **Exchangeability**: no unmeasured confounding
- **No interference**: no spill-over between units

### Overlap in the workshop
- Chairs on setting B: 25%; tables: 75%
- Stools: 0 of 100, never run on B
- No data can say how stools fare under B

### Watch out
Without overlap, any estimate for stools under B is extrapolation from a model, not evidence. And interference is easy to miss: if batches share a kiln, one batch's setting can change its neighbour's outcome.`,
  narration:
    "What has to be true for a comparison to be read as cause and effect? Four assumptions. Consistency: setting B means one well defined intervention. If B is sometimes run fast and sometimes slow, its effect is not one thing. Overlap: every kind of unit could receive every treatment. Exchangeability: the groups receiving each treatment are comparable, with no unmeasured confounding; randomisation secures this by design. And no interference: one unit's treatment does not change another unit's outcome. On the left is overlap in the observational month. A quarter of chairs and three quarters of tables ran on setting B, so both products have data under both settings. Stools never ran on B at all. Nothing in the data can say how stools would fare under B; any estimate would be an extrapolation from a model, not evidence. Interference is easy to overlook. If batches share a kiln, running one batch hot could change the next batch's result, and then a batch's outcome depends on its neighbours' settings as well as its own. Randomisation helps with exchangeability, but the other three still need thought in every experiment. Next, what to do when units do not follow their assignment.",
}
