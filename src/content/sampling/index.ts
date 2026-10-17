import type { Course } from '../types'
import { transformationsSection } from './01-transformations'
import { samplingDistributionsSection } from './02-sampling-distributions'
import { boundsSection } from './03-bounds'
import { llnCltSection } from './04-lln-clt'
import { failuresSection } from './05-failures'
import { monteCarloSection } from './06-monte-carlo'
import { budgetsSection } from './07-budgets'
import { checksSection } from './08-checks'

// Chapter 5 — Sampling Distributions and Simulation.
export const sampling: Course = {
  id: 'sampling',
  title: 'Sampling distributions and simulation',
  sections: [
    transformationsSection,
    samplingDistributionsSection,
    boundsSection,
    llnCltSection,
    failuresSection,
    monteCarloSection,
    budgetsSection,
    checksSection,
  ],
}
