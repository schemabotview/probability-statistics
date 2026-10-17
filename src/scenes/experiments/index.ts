import type { Scene } from '@graphlearning/flow'
import { potential } from './potential'
import { blocking } from './blocking'
import { factorial } from './factorial'
import { confounding } from './confounding'
import { assumptions } from './assumptions'
import { itt } from './itt'
import { protocol } from './protocol'

// Chapter 9 — one scene per section. Ids are prefixed `exp-`.
export const experimentsScenes: Scene[] = [potential, blocking, factorial, confounding, assumptions, itt, protocol]
