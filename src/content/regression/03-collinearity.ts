import type { Section } from '../types'

export const collinearitySection: Section = {
  id: 'collinearity',
  title: 'Coefficient interpretation, collinearity and identifiability',
  scene: 'reg-collinearity',
  focus: 'unstable',
  slide: `## Collinearity

When predictors are strongly correlated, the data cannot separate their effects. Fitted values stay stable, but individual coefficients become uncertain and can flip sign.

### Parts and job weight
- Weight ≈ 0.5 × parts: correlation 0.992
- Alone, parts: slope 1.033 (SE 0.059)
- Alone, weight: slope 2.02 (SE 0.12)
- Together: 1.26 (0.46) and −0.46 (0.91)

### Diagnosing it
- Variance inflation factor 1/(1 − r²) = 59.7
- SEs about 7.7 times larger
- Weight at fixed parts barely varies

### Watch out
A negative weight coefficient does not mean heavier jobs are faster. It means these data cannot answer that question. Choose predictors for the question, or collect data where they vary separately.`,
  narration:
    "What happens when two predictors carry almost the same information? Each job's weight is roughly half its number of parts; on the left, the correlation is ninety nine percent. Fit either one alone and the answer is clear: about one minute per part, or about two minutes per kilogram, with small standard errors. Put both in the same model, and the coefficients become unstable. The parts coefficient's standard error jumps from point oh six to point four six, and the weight coefficient turns negative, minus point four six, with a standard error twice its size. The fitted values hardly change, because the model can trade one predictor against the other almost freely. The data simply cannot tell how the time divides between parts and weight. The variance inflation factor measures this: one over one minus the squared correlation, about sixty, so standard errors are inflated nearly eight times. A negative weight coefficient here does not mean heavier jobs are faster; it means the question of weight holding parts fixed has almost no information behind it, because weight barely varies once parts is known. Choose predictors for the question, or collect data where they vary separately. Next, the uncertainty in a fitted line.",
}
