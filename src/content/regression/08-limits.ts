import type { Section } from '../types'

export const limitsSection: Section = {
  id: 'limits',
  title: 'Selection uncertainty and causal and predictive claim limits',
  scene: 'reg-selection',
  focus: 'limits',
  slide: `## What a regression can claim

A fitted regression describes **conditional association** in the data as collected. Causal and predictive claims need more, and choosing the model from the data changes what its p-values mean.

### Selection among candidates
- 10 candidate predictors, none related to time
- Keep the one with the largest |t|
- It looks "significant" in 40% of datasets
- 1 − 0.95¹⁰ = 0.40; with 30 candidates, 0.79

### Three kinds of claim
- Association: needs a fitting model and clean diagnostics
- Causation: needs design or no unmeasured confounding
- Prediction: needs validation on new data

### Chapter outcome
You can interpret regression coefficients and their uncertainty, diagnose important model failures, and separate conditional association from causal or predictive guarantees.`,
  narration:
    "What does a fitted regression actually establish? It describes conditional association in the data as collected. Two further steps need more. A causal claim, that changing a predictor would change the outcome, needs randomisation or a convincing argument that no unmeasured confounders remain, as chapter nine showed. A predictive claim, that the model will work on new jobs, needs validation on data not used to fit it, which the machine learning courses develop. A subtler problem is selection. Suppose ten candidate predictors are tried, none of them related to processing time, and the one with the largest t statistic is kept. On the left, its p value is below five percent about forty percent of the time, matching one minus point nine five to the tenth. With thirty candidates, nearly eighty percent. The p value of a selected variable ignores the search that found it. So report how the model was chosen, and treat discoveries from a search as leads for a confirmatory study. That completes the chapter. You can interpret coefficients and their uncertainty, diagnose failures, and separate association from causal and predictive claims. Next, Bayesian inference offers a different interpretation of parameter and predictive uncertainty.",
}
