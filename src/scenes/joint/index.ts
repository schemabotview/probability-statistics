import type { Scene } from '@graphlearning/flow'
import { support } from './support'
import { margins } from './margins'
import { conditional } from './conditional'
import { factor } from './factor'
import { covariance } from './covariance'
import { sums } from './sums'
import { totalVariance } from './total-variance'
import { mvn } from './mvn'

// Chapter 4 — one scene per section. Ids are prefixed `joint-`.
export const jointScenes: Scene[] = [support, margins, conditional, factor, covariance, sums, totalVariance, mvn]
