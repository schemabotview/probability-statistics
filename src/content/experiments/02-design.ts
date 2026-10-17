import type { Section } from '../types'

export const designSection: Section = {
  id: 'design',
  title: 'Randomisation, replication, blocking and blinding',
  scene: 'exp-blocking',
  focus: 'design',
  slide: `## Principles of design

Four principles turn a comparison into an experiment: **randomise** treatments, **replicate** units, **block** on known nuisance variables, and **blind** where judgement enters.

### A setting experiment over 5 days
- 4 batches a day; 2 drawn by lot for setting B
- Days differ by about 7 points in defect rate
- Compare A and B within each day, then average

### What blocking buys
- Simulated, true effect −0.8 points:
- completely randomised: estimate SD 0.94
- blocked by day: SD 0.44, less than half
- Day effects cancel inside each block

### Watch out
Blocking removes variation you can name in advance; randomisation protects against what you cannot. Blinding matters whenever a person judges the outcome: an inspector who knows the setting may grade borderline chairs differently.`,
  narration:
    "What makes an experiment trustworthy? Four principles. Randomise: let chance, not an operator, decide which batches get which setting, so nothing systematic differs between the groups. Replicate: use enough units to estimate the noise as well as the effect. Block: group units that are alike, and randomise within each group, so known nuisance variation drops out of the comparison. And blind: keep whoever judges the outcome unaware of the treatment. Here is a setting experiment run over five days, four batches a day, with two batches each day drawn by lot for setting B. On the left, the days differ hugely, by about seven points in defect rate, as chapter one found. Because each day contains both settings, the comparison is made within days, and the day effects cancel. In a simulation with a true effect of minus point eight, a completely randomised design that ignores days gives estimates with a standard deviation of about point nine four; blocking by day cuts it to point four four, less than half. Blocking removes variation you can name in advance; randomisation protects against what you cannot. And blinding matters whenever a person makes a judgement call. Next, studying two factors at once.",
}
