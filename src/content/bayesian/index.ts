import type { Course } from '../types'
import { updateSection } from './01-update'
import { conjugateSection } from './02-conjugate'
import { summariesSection } from './03-summaries'
import { predictiveSection } from './04-predictive'
import { sensitivitySection } from './05-sensitivity'
import { decisionSection } from './06-decision'
import { gridSection } from './07-grid'

// Chapter 11 — Bayesian Inference and Decisions.
export const bayesian: Course = {
  id: 'bayesian',
  title: 'Bayesian inference and decisions',
  sections: [
    updateSection,
    conjugateSection,
    summariesSection,
    predictiveSection,
    sensitivitySection,
    decisionSection,
    gridSection,
  ],
}
