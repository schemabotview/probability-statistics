import type { Section } from '../types'

export const estimatorsSection: Section = {
  id: 'estimators',
  title: 'Models, parameters, identifiability and estimators',
  scene: 'est-identify',
  focus: 'curve',
  slide: `## Models, parameters and estimators

A **model** describes how data could arise, with unknown **parameters**. An **estimator** is a rule that turns data into a guess at a parameter; its value on one dataset is an **estimate**.

### Examples
- Inspections ~ Bernoulli(p): estimator p̂ = x/n
- Seat heights ~ Normal(μ, σ²): estimators x̄ and s
- Estimator: random; estimate: a number

### Identifiability
- **Identifiable**: different values, different data
- Record only flags: P(flag) = s·p + f(1 − p)
- (0.07, 0.90) and (0.15, 0.45) both give 0.1095

### Watch out
No estimator, sample size or software can separate parameters the data cannot distinguish. Fix it in the design: re-inspect a subsample by a reliable method, adding an equation.`,
  narration:
    "This chapter constructs estimators, judges their quality, and shows how much they depend on the model. A model describes how the data could have arisen, with unknown parameters. An estimator is a rule for turning data into a guess at a parameter: the sample proportion for a defect rate, the sample mean and standard deviation for seat heights. Before any data arrive, an estimator is a random variable with a sampling distribution; applied to one dataset, it gives a number, the estimate. There is a precondition for estimation at all: identifiability. Different parameter values must produce different distributions of data. Suppose the workshop records only whether the end of line check flagged each chair. The flag rate depends on both the true defect rate and the check's sensitivity. On the left, every combination on the curve predicts exactly the same flag rate, about eleven percent. A seven percent defect rate with ninety percent sensitivity fits as well as fifteen percent with forty five. The data cannot choose. No method or sample size fixes this; the design must, for example by re inspecting a subsample with a reliable method. Next, measuring how good an estimator is.",
}
