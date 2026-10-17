import type { Scene } from '@graphlearning/flow'
import { cdf } from './cdf'
import { expectation } from './expectation'
import { binomial } from './binomial'
import { counts } from './counts'
import { continuous } from './continuous'
import { families } from './families'
import { tails } from './tails'
import { reference } from './reference'

// Chapter 3 — one scene per section; dist.ts holds exact pmf/pdf helpers. Ids are prefixed `rv-`.
export const randomVariablesScenes: Scene[] = [cdf, expectation, binomial, counts, continuous, families, tails, reference]
