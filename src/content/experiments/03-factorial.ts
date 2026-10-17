import type { Section } from '../types'

export const factorialSection: Section = {
  id: 'factorial',
  title: 'Factorial main effects, interactions and nuisance variation',
  scene: 'exp-factorial',
  focus: 'effects',
  slide: `## Factorial experiments

A **factorial** design crosses factors: every setting with every glue. Each run informs both factors, and the design can reveal whether they **interact**.

### Main effects and interaction
- Main effect of glue: average change across settings
- Interaction: does the glue's effect depend on the setting?
- Interaction = (difference of differences) / 2

### Two scenarios, four cell means each
- Additive: glue saves 1.5 min under A and under B
- Interaction: saves 1.5 under A, costs 0.3 under B
- "Main effect" of glue then −0.6: true at neither

### Watch out
With an interaction, report effects **within** each level, not averaged main effects. And one-factor-at-a-time testing can miss an interaction entirely; the crossed design is what reveals it.`,
  narration:
    "How do you study two changes at once, a new glue and a new machine setting? Cross them. A factorial design runs every combination: setting A with old glue, A with new, B with old, B with new. Every run then informs both questions, which is more efficient than testing one factor at a time, and the design can reveal something one factor at a time cannot: an interaction. The main effect of the glue is its effect averaged over both settings. An interaction means the glue's effect depends on the setting. On the left are two scenarios. In the first, the lines are parallel: the new glue saves a minute and a half under either setting, so the effects simply add, and the interaction is zero. In the second, the lines cross: the glue saves a minute and a half under setting A but costs a third of a minute under B. The averaged main effect of the glue is then minus point six minutes, a number that describes neither setting. When factors interact, report the effect within each level. And this is exactly what changing one factor at a time can miss. Next, what goes wrong without randomisation.",
}
