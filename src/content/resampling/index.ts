import type { Course } from '../types'
import { ecdfSection } from './01-ecdf'
import { bootstrapSection } from './02-bootstrap'
import { permutationSection } from './03-permutation'
import { ranksSection } from './04-ranks'
import { robustSection } from './05-robust'
import { missingSection } from './06-missing'
import { planSection } from './07-plan'
import { reportSection } from './08-report'

// Chapter 12 — Resampling, Robustness, and Honest Analysis.
export const resampling: Course = {
  id: 'resampling',
  title: 'Resampling, robustness and honest analysis',
  sections: [
    ecdfSection,
    bootstrapSection,
    permutationSection,
    ranksSection,
    robustSection,
    missingSection,
    planSection,
    reportSection,
  ],
}
