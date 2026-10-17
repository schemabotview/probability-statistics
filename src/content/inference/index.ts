import type { Course } from '../types'
import { coverageSection } from './01-coverage'
import { meanIntervalsSection } from './02-mean-intervals'
import { proportionIntervalsSection } from './03-proportion-intervals'
import { predictionSection } from './04-prediction'
import { testsSection } from './05-tests'
import { effectSizeSection } from './06-effect-size'
import { powerSection } from './07-power'
import { multiplicitySection } from './08-multiplicity'

// Chapter 7 — Intervals, Tests, and Statistical Evidence.
export const inference: Course = {
  id: 'inference',
  title: 'Intervals, tests and statistical evidence',
  sections: [
    coverageSection,
    meanIntervalsSection,
    proportionIntervalsSection,
    predictionSection,
    testsSection,
    effectSizeSection,
    powerSection,
    multiplicitySection,
  ],
}
