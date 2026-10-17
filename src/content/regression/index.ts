import type { Course } from '../types'
import { leastSquaresSection } from './01-least-squares'
import { multipleSection } from './02-multiple'
import { collinearitySection } from './03-collinearity'
import { intervalsSection } from './04-intervals'
import { diagnosticsSection } from './05-diagnostics'
import { specificationSection } from './06-specification'
import { glmSection } from './07-glm'
import { limitsSection } from './08-limits'

// Chapter 10 — Regression and Model Checking.
export const regression: Course = {
  id: 'regression',
  title: 'Regression and model checking',
  sections: [
    leastSquaresSection,
    multipleSection,
    collinearitySection,
    intervalsSection,
    diagnosticsSection,
    specificationSection,
    glmSection,
    limitsSection,
  ],
}
