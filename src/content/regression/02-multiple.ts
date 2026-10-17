import type { Section } from '../types'

export const multipleSection: Section = {
  id: 'multiple',
  title: 'Multiple predictors, categories and interactions',
  scene: 'reg-multiple',
  focus: 'models',
  slide: `## Several predictors

With several predictors, each coefficient is the change in the mean **holding the others fixed**. A category enters through an **indicator**; an **interaction** lets one predictor's slope depend on another.

### Adding the wood type
- time = 2.86 + 0.99 × parts + 2.76 × oak
- Oak jobs take 2.76 minutes longer, same parts
- Two parallel lines; residual SD falls to 1.77

### Testing for an interaction
- Add parts × oak: coefficient −0.085, SE 0.114
- No evidence the per-part time differs by wood
- The simpler additive model is adequate

### Watch out
"Holding the others fixed" is a statement about the model, not about the workshop: it needs jobs with the same parts in both woods to be informative. A coefficient's meaning changes with what else is in the model: parts alone gives 1.033, with oak 0.990.`,
  narration:
    "What changes when a second predictor is added? Each coefficient now means the change in average time when that predictor moves by one, with the other predictors held fixed. Categories, like the type of wood, enter through an indicator: one for oak, zero for pine. With both in the model, the fitted equation is about two point nine, plus point nine nine per part, plus two point seven six for oak. On the left, that is two parallel lines: oak jobs take about two and three quarter minutes longer than pine jobs with the same number of parts. Adding the wood type also shrinks the residual scatter, from two point two to one point eight minutes. Could the per part time itself differ by wood? An interaction term, parts times oak, lets the slopes differ. Its estimate is minus point oh eight five with a standard error of point one one, so there is no evidence for different slopes, and the additive model is adequate. Two cautions. Holding the others fixed is a statement about the model; it is only informative where the data contain such comparisons. And coefficients change meaning with the company they keep. Next, predictors that carry the same information.",
}
