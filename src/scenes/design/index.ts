import type { Scene } from '@graphlearning/flow'
import { estimand } from './estimand'
import { units } from './units'
import { frames } from './frames'
import { bias } from './bias'
import { assignment } from './assignment'
import { histogramScene } from './histogram'
import { simpson } from './simpson'
import { generalise } from './generalise'

// Chapter 1 — one scene per section. Ids are prefixed `design-`: scene ids are global.
export const designScenes: Scene[] = [estimand, units, frames, bias, assignment, histogramScene, simpson, generalise]
