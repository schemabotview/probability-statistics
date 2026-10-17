import type { Scene } from '@graphlearning/flow'
import { coverage } from './coverage'
import { meanCi } from './mean-ci'
import { proportionCi } from './proportion-ci'
import { prediction } from './prediction'
import { nullDist } from './null'
import { effects } from './effects'
import { power } from './power'
import { multiplicity } from './multiplicity'

// Chapter 7 — one scene per section. Ids are prefixed `inf-`.
export const inferenceScenes: Scene[] = [coverage, meanCi, proportionCi, prediction, nullDist, effects, power, multiplicity]
