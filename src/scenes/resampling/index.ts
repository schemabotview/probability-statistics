import type { Scene } from '@graphlearning/flow'
import { ecdf } from './ecdf'
import { bootstrap } from './bootstrap'
import { permutation } from './permutation'
import { ranks } from './ranks'
import { robust } from './robust'
import { missing } from './missing'
import { plan } from './plan'
import { report } from './report'

// Chapter 12 — one scene per section. Ids are prefixed `rs-`.
export const resamplingScenes: Scene[] = [ecdf, bootstrap, permutation, ranks, robust, missing, plan, report]
