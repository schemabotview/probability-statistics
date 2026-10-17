import type { Scene } from '@graphlearning/flow'
import { update } from './update'
import { conjugate } from './conjugate'
import { summaries } from './summaries'
import { predictive } from './predictive'
import { sensitivity } from './sensitivity'
import { decision } from './decision'
import { grid } from './grid'

// Chapter 11 — one scene per section; beta.ts holds the helpers. Ids are prefixed `bayes-`.
export const bayesianScenes: Scene[] = [update, conjugate, summaries, predictive, sensitivity, decision, grid]
