import type { Scene } from '@graphlearning/flow'
import { identify } from './identify'
import { bias } from './bias'
import { moments } from './moments'
import { likelihood } from './likelihood'
import { mle } from './mle'
import { boundary } from './boundary'
import { summaries } from './summaries'

// Chapter 6 — one scene per section. Ids are prefixed `est-`.
export const estimationScenes: Scene[] = [identify, bias, moments, likelihood, mle, boundary, summaries]
