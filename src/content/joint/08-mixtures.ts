import type { Section } from '../types'

export const mixturesSection: Section = {
  id: 'mixtures',
  title: 'Mixtures and introductory multivariate-normal geometry',
  scene: 'joint-mvn',
  focus: 'contours',
  slide: `## Mixtures and the multivariate normal

A **mixture** first picks a group at random, then draws from that group's distribution. A **multivariate normal** is fixed entirely by its mean vector and covariance matrix Σ.

### A mixture of job times
- 60% chairs (mean 10.5 min), 40% tables (mean 20.9)
- Mixture mean 14.64; variance 48.9
- = within-group 22.7 + between-group 26.3
- Two peaks: no single "typical" job

### Bivariate normal geometry
- Contours of equal density are ellipses
- ρ = 0: circles; X and Y independent
- ρ = 0.8: ellipses stretched along y = x
- Inner contour holds 39%, outer 86%

### Chapter outcome
You can derive marginal and conditional summaries, quantify dependence, and explain its effect on totals and averages. Matrix and PCA derivations belong to Linear Algebra.`,
  narration:
    "Two structures recur whenever data come from groups or from several correlated measurements. A mixture picks a group at random, then draws a value from that group. Job times are a mixture: sixty percent chairs, averaging about ten and a half minutes, and forty percent tables, averaging about twenty one. The mixture's mean is the weighted average, about fourteen point six. Its variance, about forty nine, is the law of total variance again: the average spread within the groups plus the spread between the group means. A mixture can have two peaks, and then no single typical job exists. The multivariate normal is the standard model for several correlated continuous measurements, and it is determined entirely by the means and the covariance matrix. On the left, standardised bivariate normals. Contours of equal density are ellipses. With correlation zero they are circles, and for the normal, uncorrelated really does mean independent. With correlation zero point eight, the ellipses stretch along the diagonal. The inner contour holds thirty nine percent of the probability, the outer eighty six. That completes the chapter. You can derive marginal and conditional summaries and explain dependence. Next, repeated sampling turns joint models into distributions of statistics.",
}
