import type { Course } from '../types'
import { jointSection } from './01-joint'
import { marginalsSection } from './02-marginals'
import { conditionalSection } from './03-conditional'
import { independenceSection } from './04-independence'
import { covarianceSection } from './05-covariance'
import { sumsSection } from './06-sums'
import { totalVarianceSection } from './07-total-variance'
import { mixturesSection } from './08-mixtures'

// Chapter 4 — Joint Structure and Conditional Moments.
export const joint: Course = {
  id: 'joint',
  title: 'Joint structure and conditional moments',
  sections: [
    jointSection,
    marginalsSection,
    conditionalSection,
    independenceSection,
    covarianceSection,
    sumsSection,
    totalVarianceSection,
    mixturesSection,
  ],
}
