import type { Section } from '../types'

export const referenceSection: Section = {
  id: 'reference',
  title: 't, chi-square and F reference distributions',
  scene: 'rv-reference',
  focus: 'critical',
  slide: `## Reference distributions

Three families appear whenever normal data are summarised. They are reference distributions for statistics, not usually models for raw data.

### Where they come from
- **t**: a standardised mean when σ is estimated
- **χ²**: a sum of squared standard normals; sample variances
- **F**: a ratio of two independent χ²s over their df
- Each is indexed by **degrees of freedom**

### The t family
- Heavier tails than the normal, more so with few df
- 97.5th percentile: 4.30 (2 df), 2.57 (5), 2.04 (30)
- It approaches the normal's 1.96 as df grows
- P(|T| > 2) is 0.18 with 2 df, 0.05 with 30

### Chapter outcome
You can choose a discrete or continuous model, calculate its probabilities, expectation and variance, interpret its parameters, and recognise unsupported tail or moment assumptions.`,
  narration:
    "Some distributions are rarely used to model raw data, yet appear constantly in inference. They are reference distributions for statistics computed from normal samples. The t distribution describes a standardised sample mean when the standard deviation is estimated from the same data. The chi square describes sums of squared standard normals, and so sample variances. The F describes a ratio of two independent variance estimates. Each is indexed by degrees of freedom, roughly the amount of independent information behind the estimate. On the left, t densities with two, five and thirty degrees of freedom against the standard normal. With few degrees of freedom the tails are much heavier: the chance of a value beyond plus or minus two is eighteen percent with two degrees of freedom, against under five percent for the normal. The ninety seven point five percent point falls from four point three with two degrees of freedom to two point oh four with thirty, approaching the normal's one point nine six. That completes the chapter. You can choose and calculate with discrete and continuous models, and recognise unsupported tail and moment assumptions. Next, several quantities require a joint model and explicit dependence reasoning.",
}
