import type { Scene } from '@graphlearning/flow'
import { paired } from './paired'
import { welch } from './welch'
import { differences } from './differences'
import { proportions } from './proportions'
import { contingency } from './contingency'
import { gof } from './gof'
import { anova } from './anova'

// Chapter 8 — one scene per section. Ids are prefixed `cmp-`.
export const comparisonsScenes: Scene[] = [paired, welch, differences, proportions, contingency, gof, anova]
