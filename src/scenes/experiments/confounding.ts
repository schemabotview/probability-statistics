import type { Scene } from '@graphlearning/flow'
import { SETTINGS } from '../workshop'

// §9.4 — chapter 1's observational month: operators chose setting B mostly for tables. Product affects both
// the setting chosen and the defect rate: a confounder. Crude B − A = 20.75 − 15 = +5.75 points;
// standardised to a 50/50 product mix: A 0.5 × 10 + 0.5 × 30 = 20, B 0.5 × 8 + 0.5 × 25 = 16.5, so −3.5.
const r = (c: { n: number; defects: number }) => (100 * c.defects) / c.n
const A = SETTINGS.A
const B = SETTINGS.B
const crude = (s: typeof A) => (100 * (s.chairs.defects + s.tables.defects)) / (s.chairs.n + s.tables.n)
const std = (s: typeof A) => 0.5 * r(s.chairs) + 0.5 * r(s.tables)

export const confounding: Scene = {
  id: 'exp-confounding',
  title: 'Confounding, selection and simple causal diagrams',
  flow: 'TB',
  nodes: [
    {
      id: 'dag',
      label: 'A causal diagram for the observational month',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'product', label: 'Product type', sub: 'chair or table', pattern: 'user', icon: 'layers' },
        { id: 'hidden', label: 'Job looks hard', sub: 'unrecorded: not adjustable', pattern: 'warn', icon: 'search' },
        { id: 'setting', label: 'Setting chosen', sub: 'operators pick B for tables', pattern: 'service', icon: 'gauge' },
        { id: 'defect', label: 'Defect', sub: 'tables fail more often', pattern: 'warn', icon: 'ban' },
      ],
      edges: [
        { source: 'product', target: 'setting', label: 'confounding path' },
        { source: 'product', target: 'defect' },
        { source: 'hidden', target: 'setting' },
        { source: 'hidden', target: 'defect' },
        { source: 'setting', target: 'defect', label: 'the effect we want' },
      ],
    },
    {
      id: 'adjust',
      kind: 'table',
      label: 'Crude versus adjusted comparison of B with A',
      sub: 'adjusting for product closes the back-door path product → setting',
      headers: ['estimate', 'A', 'B', 'B − A'],
      values: [
        ['crude, as run', `${crude(A)}%`, `${crude(B)}%`, `+${(crude(B) - crude(A)).toFixed(2)} points`],
        ['within chairs', `${r(A.chairs)}%`, `${r(B.chairs)}%`, `${r(B.chairs) - r(A.chairs)} points`],
        ['within tables', `${r(A.tables)}%`, `${r(B.tables)}%`, `${r(B.tables) - r(A.tables)} points`],
        ['standardised to a 50/50 mix', `${std(A)}%`, `${std(B)}%`, `${(std(B) - std(A)).toFixed(1)} points`],
        ['valid only if', 'no unrecorded confounder', 'such as how hard a job looks', '—'],
      ],
    },
  ],
  edges: [],
}
