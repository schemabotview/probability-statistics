import type { Scene } from '@graphlearning/flow'
import { sampleSpace } from './sample-space'
import { venn } from './venn'
import { counting } from './counting'
import { tree } from './tree'
import { bayes } from './bayes'
import { independence } from './independence'
import { baseRates } from './base-rates'
import { zero } from './zero'

// Chapter 2 — one scene per section. Ids are prefixed `prob-`.
export const probabilityScenes: Scene[] = [sampleSpace, venn, counting, tree, bayes, independence, baseRates, zero]
