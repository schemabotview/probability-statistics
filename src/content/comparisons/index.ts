import type { Course } from '../types'
import { unitsSection } from './01-units'
import { welchSection } from './02-welch'
import { pairedSection } from './03-paired'
import { proportionsSection } from './04-proportions'
import { contingencySection } from './05-contingency'
import { goodnessOfFitSection } from './06-goodness-of-fit'
import { anovaSection } from './07-anova'

// Chapter 8 — Comparing Groups and Outcomes.
export const comparisons: Course = {
  id: 'comparisons',
  title: 'Comparing groups and outcomes',
  sections: [unitsSection, welchSection, pairedSection, proportionsSection, contingencySection, goodnessOfFitSection, anovaSection],
}
