import type { Course } from '../types'
import { potentialOutcomesSection } from './01-potential-outcomes'
import { designSection } from './02-design'
import { factorialSection } from './03-factorial'
import { confoundingSection } from './04-confounding'
import { assumptionsSection } from './05-assumptions'
import { ittSection } from './06-itt'
import { protocolSection } from './07-protocol'

// Chapter 9 — Experiments and Causal Reasoning.
export const experiments: Course = {
  id: 'experiments',
  title: 'Experiments and causal reasoning',
  sections: [potentialOutcomesSection, designSection, factorialSection, confoundingSection, assumptionsSection, ittSection, protocolSection],
}
