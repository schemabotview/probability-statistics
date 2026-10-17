import type { Section } from '../types'

export const independenceSection: Section = {
  id: 'independence',
  title: 'Independence, exclusivity and conditional independence',
  scene: 'prob-independence',
  focus: 'definitions',
  slide: `## Independence

A and B are **independent** if P(A ∩ B) = P(A) P(B): knowing one does not change the probability of the other, so P(A | B) = P(A).

### Shift and defects
- Left: 7% defective on day and night shifts alike
- Right: 5% by day, 10% by night, still 7% overall
- Same overall rate; only the left pair is independent
- Right: P(D | night) = 0.10 ≠ P(D) = 0.07

### Not the same as exclusive
- Exclusive events cannot happen together
- "No defect" and "seat defect": P(both) = 0
- Knowing one rules out the other: strongly dependent

### Conditional independence
Two inspectors who err independently **given** a chair's true state are still dependent overall: P(both flag) = 0.059, against 0.012 if independent. Both flags point to the same defective chairs.`,
  narration:
    "When does knowing one event tell you nothing about another? When they are independent: the probability of both equals the product of their probabilities, or equivalently, conditioning on one leaves the other unchanged. On the left are two workshops with the same overall defect rate of seven percent. In the first, day and night shifts both run at seven percent, so a chair's shift tells you nothing about whether it is defective: independent. In the second, the day shift runs at five percent and the night shift at ten. The overall rate is the same, but now shift and defects are dependent. Do not confuse independence with exclusivity. Exclusive events cannot happen together, like no defect and a seat defect. Learning one rules out the other, which is about as dependent as events can be. A subtler idea is conditional independence. Two inspectors might make errors independently once the chair's true state is fixed. Yet overall, their flags are strongly dependent: both flag about six percent of chairs, five times the product of their separate rates, because both are reacting to the same defective chairs. Next, a common reversal error.",
}
