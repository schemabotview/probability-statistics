import type { Section } from '../types'

export const ranksSection: Section = {
  id: 'ranks',
  title: 'Rank methods, ties and estimand interpretation',
  scene: 'rs-ranks',
  focus: 'wmw',
  slide: `## Rank methods: what do they estimate?

Replacing values by their ranks makes a test insensitive to outliers and to the scale of measurement. The price is a different estimand, and it is often misreported.

### Wilcoxon–Mann–Whitney
For settings A and B, U = 289.5 with p = 0.0046. U divided by 15 × 25 is 0.772: an estimate that a random A job is slower than a random B job, counting ties as half.

### Not a median test
- Both curves have median exactly 12 minutes
- Yet P(X > Y) = 0.597, and the test rejects
- It detects a shift only if the shapes match
- Then the Hodges–Lehmann shift, 3.3, fits

### Ties
Rounded times produce ties: 8 values here. They get mid-ranks, the average of the positions they share, and the test variance is corrected for them.`,
  narration:
    "Rank methods replace each value by its position in the combined sample. That makes them insensitive to outliers and to monotone changes of scale, such as taking logarithms. The Wilcoxon Mann Whitney test, applied to settings A and B, gives U of two hundred and eighty nine and a half, with a p value of about half a percent. But what does it estimate? Dividing U by fifteen times twenty five gives point seven seven: an estimate of the probability that a randomly chosen A job takes longer than a randomly chosen B job, with ties counted as half. It is often described as a test of medians, and that is wrong. On the left are two distributions with exactly the same median, twelve minutes, one skewed right and one skewed left. The probability that the first exceeds the second is point six, and with two hundred observations each the test rejects decisively. Only if the two distributions have the same shape, differing by a shift, does the test speak about a shift, and then the Hodges Lehmann estimate, three point three minutes here, summarises it. Rounded measurements produce ties, eight values here. They receive the average of their ranks, and the test variance is corrected.",
}
