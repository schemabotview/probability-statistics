import type { Course } from '../types'
import { randomVariablesSection } from './01-random-variables'
import { expectationSection } from './02-expectation'
import { binomialSection } from './03-binomial'
import { countsSection } from './04-counts'
import { continuousSection } from './05-continuous'
import { familiesSection } from './06-families'
import { tailsSection } from './07-tails'
import { referenceSection } from './08-reference'

// Chapter 3 — Random Variables and Probability Models.
export const randomVariables: Course = {
  id: 'random-variables',
  title: 'Random variables and probability models',
  sections: [
    randomVariablesSection,
    expectationSection,
    binomialSection,
    countsSection,
    continuousSection,
    familiesSection,
    tailsSection,
    referenceSection,
  ],
}
