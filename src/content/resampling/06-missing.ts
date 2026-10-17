import type { Section } from '../types'

export const missingSection: Section = {
  id: 'missing',
  title: 'Missing-data mechanisms and imputation uncertainty',
  scene: 'rs-missing',
  focus: 'coverage',
  slide: `## Missing data: why is it missing?

What a missing value does to an analysis depends on why it is missing, and that cannot be learned from the observed data alone. It has to be argued from how the data were recorded.

### Three mechanisms
- **MCAR**: missingness unrelated to anything
- **MAR**: explained by recorded variables
- **MNAR**: depends on the missing value itself
- Here: big jobs, or long jobs, lose their times

### What each method assumes
Complete cases are fine under MCAR, but under MAR they cover the true mean in 13% of months. Single imputation treats guesses as data and covers 75%. Multiple imputation adds the spread between imputations and covers 96%.

### Under MNAR
No method using the recorded data fixes it: multiple imputation covers 46%. Report a sensitivity analysis over plausible MNAR departures.`,
  narration:
    "Missing values are rarely missing at random in the everyday sense, and what they do to an analysis depends on why they are missing. Three mechanisms are distinguished. Missing completely at random means missingness is unrelated to anything. Missing at random means it is explained by variables that were recorded, here the job size, because large jobs more often lose their timing sheet. Missing not at random means it depends on the missing value itself, here the long jobs, perhaps because operators stop recording when a job overruns. The plot shows one simulated month, and the table a thousand. Under completely random missingness, simply analysing the complete cases is fine. Under missing at random, complete cases underestimate the mean, and their interval covers the truth in only thirteen percent of months. Filling the gaps with one regression prediction removes most of the bias but treats the guesses as real data, so its intervals are too narrow. Multiple imputation draws several plausible values, analyses each completed dataset, and adds the spread between them; it covers ninety six percent. Under missing not at random, no method using only the recorded data fixes the bias. Report how conclusions change across plausible departures.",
}
