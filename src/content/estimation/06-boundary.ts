import type { Section } from '../types'

export const boundarySection: Section = {
  id: 'boundary',
  title: 'Bernoulli, normal and rate examples and boundary estimates',
  scene: 'est-boundary',
  focus: 'zero',
  slide: `## MLEs in practice, and at the boundary

The same recipe gives familiar estimators: the sample mean for a normal μ, total count over total exposure for a Poisson rate, and the sample mean for an exponential mean.

### Rates need exposure
- Flaws: 27 on 18 panels → λ̂ = 1.5 per panel
- Defects per hour needs hours, not just counts
- Normal: σ̂² divides by n, biased (§6.2)

### Zero defects in 40 chairs
- L(p) = (1 − p)⁴⁰, largest at p̂ = 0
- The maximum is at the edge: ℓ′(0) ≠ 0
- Curvature formula: SE = 0, an absurd interval
- Exact 95% upper bound: p ≤ 0.072

### Watch out
"No defects seen" does not mean "defect rate zero". Report an upper bound: the rule of three gives 3/n = 0.075, close to the exact 0.072. Large-sample formulas fail at a boundary.`,
  narration:
    "The maximum likelihood recipe reproduces most familiar estimators. For a normal mean it gives the sample mean; for a normal variance, the version that divides by n, which we saw is biased. For a Poisson rate it gives the total count divided by the total exposure: twenty seven flaws on eighteen panels is one and a half flaws per panel. Rates always need their exposure; a count of defects per day means nothing without knowing how many hours ran. Now a case where the recipe needs care. Inspect forty chairs and find no defects. The likelihood is one minus p to the fortieth, shown on the left, and it is largest at p equals zero, on the boundary of the parameter space. The derivative is not zero there, and the usual curvature formula gives a standard error of zero, implying certainty that the rate is exactly zero. That is absurd: forty good chairs are entirely consistent with a few percent defective. Report an upper bound instead. The exact ninety five percent upper bound is about seven percent, and the quick rule of three, three over n, gives seven and a half. Large sample formulas assume the estimate is safely inside the parameter space. Next, how much information a summary keeps.",
}
