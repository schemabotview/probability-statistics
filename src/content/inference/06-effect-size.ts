import type { Section } from '../types'

export const effectSizeSection: Section = {
  id: 'effect-size',
  title: 'p-values, effect size and practical significance',
  scene: 'inf-effects',
  focus: 'forest',
  slide: `## Effect sizes and practical significance

A p-value measures compatibility with H₀. It mixes the **size** of an effect with the **amount of data**, so it cannot say whether an effect matters.

### Three glue studies
- A: 200 000 jobs per arm; −0.05 min; p = 0.029
- B: 20 per arm; −1.5 min, CI −6.0 to 3.0; p = 0.51
- C: 400 per arm; −1.5 min, CI −2.5 to −0.5; p = 0.003
- What matters: a change of at least 1 minute

### Reading them
- A is "significant" and trivial
- B is "not significant" and uninformative
- C is both clear and practically important

### Watch out
Report the **estimate with its interval**, and compare it with a difference that matters. "p < 0.05" alone hides A's triviality; "p > 0.05" alone hides B's ignorance. Neither is a substitute for judgement.`,
  narration:
    "Does a small p value mean an important effect? No. A p value blends the size of an effect with the amount of data, so it cannot by itself say whether anything matters. Here are three studies of a new glue that might shorten processing time, where a change of a minute or more would matter to the workshop. Study A ran two hundred thousand jobs per arm. It found a change of five hundredths of a minute, three seconds, with a p value of nought point oh three. Statistically significant, and practically trivial: the whole interval sits inside the shaded band of changes too small to matter. Study B ran only twenty jobs per arm. It estimated a minute and a half saving, but its interval runs from six minutes faster to three minutes slower, and the p value is about a half. Not significant, but not evidence of no effect either; it simply could not tell. Study C, with four hundred per arm, estimated the same minute and a half, with an interval from half a minute to two and a half. That one is clear and probably important. The lesson: report the estimate and its interval, and compare it with what matters. Next, planning a study to be informative.",
}
