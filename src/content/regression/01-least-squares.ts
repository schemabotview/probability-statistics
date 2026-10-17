import type { Section } from '../types'

export const leastSquaresSection: Section = {
  id: 'least-squares',
  title: 'Conditional-mean models and least-squares estimation',
  scene: 'reg-least-squares',
  focus: 'coef',
  slide: `## Regression as a model for the mean

A regression models the **conditional mean** of an outcome given predictors: E[time | parts] = a + b × parts. **Least squares** chooses a and b to minimise the sum of squared residuals.

### 60 jobs: time on parts
- Fitted line: 3.29 + 1.033 × parts minutes
- Each extra part adds about 1 minute, on average
- Residual SD 2.20: typical scatter around the line
- R² = 0.84 of the variance in time explained

### What the model says
- The line is the average time for jobs of each size
- Individual jobs scatter around it
- Least squares needs no distribution; inference does

### Watch out
The intercept, 3.29 minutes for zero parts, lies outside the data (4 to 20 parts). It is a set-up estimate only if the straight line really extends there, which these data cannot show.`,
  narration:
    "This chapter interprets regression models and assesses their assumptions, uncertainty and scope. A regression is a model for a conditional mean: the average outcome among units with given predictor values. On the left, sixty jobs, with processing time against the number of parts. The fitted line is about three point three minutes, plus about one minute per part. It estimates the average time for jobs of each size; individual jobs scatter around it, with a typical residual of about two minutes, and some of those residuals are drawn in pink. Least squares chooses the intercept and slope that make the sum of squared residuals as small as possible, and the formulas come from the projection geometry in Linear Algebra. R squared, zero point eight four, is the share of the variation in time that the line accounts for. Note what least squares itself needs: nothing about distributions. It is a fitting rule. The standard errors and intervals that follow rest on further assumptions about the errors. And be careful with the intercept: three point three minutes for a job with no parts sits outside the data, which run from four to twenty parts. Next, more than one predictor.",
}
