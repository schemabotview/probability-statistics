import type { Section } from '../types'

export const predictionSection: Section = {
  id: 'prediction',
  title: 'Confidence versus prediction and tolerance intervals',
  scene: 'inf-prediction',
  focus: 'targets',
  slide: `## Which interval answers the question?

A **confidence interval** targets a parameter. A **prediction interval** targets one future observation. A **tolerance interval** targets a stated share of the population.

### 25 seat heights: x̄ = 449.41, s = 3.46
- Mean seat height: (447.99, 450.84), ± 1.43
- Next chair: (442.14, 456.69), ± 7.27
- 95% of chairs, 95% confidence: (440.32, 458.51)

### How they behave with more data
- The confidence interval shrinks towards μ
- Prediction and tolerance intervals settle near μ ± 1.96σ
- Individual chairs vary however much you sample

### Watch out
Quoting the confidence interval when asked "will this chair fit the 444–456 mm spec?" understates the spread fivefold. And all three assume roughly normal seat heights: the prediction and tolerance intervals depend on the tails directly.`,
  narration:
    "Which interval answers the question you are actually asking? Three different targets get confused. A confidence interval targets a parameter, such as the mean seat height. A prediction interval targets a single future observation, such as the next chair off the line. A tolerance interval targets a stated share of the whole population, such as the range containing ninety five percent of chairs, with ninety five percent confidence. From the same twenty five seat heights, they are very different. The confidence interval for the mean is about plus or minus one and a half millimetres. The prediction interval for the next chair is about plus or minus seven. The tolerance interval is about plus or minus nine. As the sample grows, the confidence interval shrinks towards the true mean, because the mean is estimated ever more precisely. The other two do not shrink to nothing: they settle near the population's own spread, because individual chairs vary however much you sample. So if a customer asks whether their chair will fit within specification, the confidence interval is the wrong answer, by a factor of five. And the prediction and tolerance intervals lean directly on the normal shape of the tails. Next, testing.",
}
