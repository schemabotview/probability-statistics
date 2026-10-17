import type { Course } from '../types'
import { estimandsSection } from './01-estimands'
import { unitsSection } from './02-units'
import { samplingSection } from './03-sampling'
import { biasSection } from './04-bias'
import { assignmentSection } from './05-assignment'
import { summariesSection } from './06-summaries'
import { associationSection } from './07-association'
import { limitsSection } from './08-limits'

// Chapter 1 — Questions, Data, and Study Design.
export const design: Course = {
  id: 'design',
  title: 'Questions, data and study design',
  sections: [
    estimandsSection,
    unitsSection,
    samplingSection,
    biasSection,
    assignmentSection,
    summariesSection,
    associationSection,
    limitsSection,
  ],
}
