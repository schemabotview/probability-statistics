import type { Section } from '../types'

export const planSection: Section = {
  id: 'plan',
  title: 'Analysis plans, sensitivity and reproducible reporting',
  scene: 'rs-plan',
  focus: 'forks',
  slide: `## Plan the analysis, then report all of it

The same data admit many defensible analyses. If the analysis is chosen after seeing which one looks best, the reported p-value no longer means what it says.

### The forking paths
Six reasonable tests of setting A against B give p-values from 0.0006 to 0.0046. Here they agree. But under the null, taking the smallest of the six rejects in 10.7% of datasets, not 5%.

### An analysis plan fixes in advance
- The question and the estimand
- One primary analysis
- Sensitivity analyses, and exclusion rules
- How missing data will be handled

### Reproducible reporting
Pin the code, the random seeds and the library versions. Report every analysis that was run, with effects and intervals, so a reader can see how much the conclusion depends on the choices.`,
  narration:
    "Every analysis in this course involved choices: which test, which scale, whether to drop an unusual value, how to handle missing data. For settings A and B, six defensible analyses give p values between six in ten thousand and about half a percent. Here they agree, which is reassuring. But the danger lies in choosing among them after looking. In a simulation where the two settings are identical, a single planned Welch test rejects in five percent of datasets, as it should. Reporting whichever of the six gives the smallest p value rejects in nearly eleven percent. The p value of a chosen analysis ignores the choosing. The remedy is an analysis plan, written before the data are seen. It states the question and the quantity to be estimated, one primary analysis, the sensitivity analyses, the rules for exclusions, and how missing data will be handled. Departures from the plan are allowed, but labelled as exploratory. Reproducibility completes the plan: pin the code, the random seeds and the library versions, so another analyst gets the same numbers. And report every analysis that was run, with effects and intervals, not only the most striking result.",
}
