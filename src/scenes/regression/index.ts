import type { Scene } from '@graphlearning/flow'
import { leastSquares } from './least-squares'
import { multiple } from './multiple'
import { collinearity } from './collinearity'
import { bands } from './bands'
import { diagnostics } from './diagnostics'
import { specification } from './specification'
import { glm } from './glm'
import { selection } from './selection'

// Chapter 10 — one scene per section; jobs.ts holds the dataset. Ids are prefixed `reg-`.
export const regressionScenes: Scene[] = [leastSquares, multiple, collinearity, bands, diagnostics, specification, glm, selection]
