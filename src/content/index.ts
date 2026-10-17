import { design } from './design'
import { probability } from './probability'
import { randomVariables } from './random-variables'
import { joint } from './joint'
import { sampling } from './sampling'
import { estimation } from './estimation'
import { inference } from './inference'
import { comparisons } from './comparisons'
import { experiments } from './experiments'
import { regression } from './regression'
import { bayesian } from './bayesian'
import { resampling } from './resampling'
import type { Course, Section } from './types'

// Course registry, in syllabus order. Courses are added here as each is authored.
export const COURSES: Record<string, Course> = {
  [design.id]: design,
  [probability.id]: probability,
  [randomVariables.id]: randomVariables,
  [joint.id]: joint,
  [sampling.id]: sampling,
  [estimation.id]: estimation,
  [inference.id]: inference,
  [comparisons.id]: comparisons,
  [experiments.id]: experiments,
  [regression.id]: regression,
  [bayesian.id]: bayesian,
  [resampling.id]: resampling,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
