import type { Course } from '../types'
import { estimatorsSection } from './01-estimators'
import { biasVarianceSection } from './02-bias-variance'
import { momentsSection } from './03-moments'
import { likelihoodSection } from './04-likelihood'
import { mleSection } from './05-mle'
import { boundarySection } from './06-boundary'
import { summariesSection } from './07-summaries'

// Chapter 6 — Estimation and Likelihood.
export const estimation: Course = {
  id: 'estimation',
  title: 'Estimation and likelihood',
  sections: [estimatorsSection, biasVarianceSection, momentsSection, likelihoodSection, mleSection, boundarySection, summariesSection],
}
