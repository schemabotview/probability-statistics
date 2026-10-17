import type { Course } from '../types'
import { sampleSpacesSection } from './01-sample-spaces'
import { setOperationsSection } from './02-set-operations'
import { countingSection } from './03-counting'
import { conditionalSection } from './04-conditional'
import { bayesSection } from './05-bayes'
import { independenceSection } from './06-independence'
import { baseRatesSection } from './07-base-rates'
import { zeroSection } from './08-zero'

// Chapter 2 — Events, Conditioning, and Independence.
export const probability: Course = {
  id: 'probability',
  title: 'Events, conditioning and independence',
  sections: [
    sampleSpacesSection,
    setOperationsSection,
    countingSection,
    conditionalSection,
    bayesSection,
    independenceSection,
    baseRatesSection,
    zeroSection,
  ],
}
