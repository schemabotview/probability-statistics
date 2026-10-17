import type { Scene } from '@graphlearning/flow'
import { transform } from './transform'
import { seScene } from './se'
import { bounds } from './bounds'
import { clt } from './clt'
import { failures } from './failures'
import { monteCarlo } from './monte-carlo'
import { budget } from './budget'
import { checks } from './checks'

// Chapter 5 — one scene per section. Ids are prefixed `samp-`.
export const samplingScenes: Scene[] = [transform, seScene, bounds, clt, failures, monteCarlo, budget, checks]
