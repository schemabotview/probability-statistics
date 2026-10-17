import type { Scene } from '@graphlearning/flow'

// §1.5 — random sampling licenses generalisation to the sampled population; random assignment licenses
// causal comparison of the assigned treatments. The four combinations, with workshop studies as examples.
export const assignment: Scene = {
  id: 'design-assignment',
  title: 'Random assignment versus random sampling',
  flow: 'TB',
  nodes: [
    {
      id: 'quadrants',
      label: 'What each kind of randomness buys',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'both', label: 'Sampled and assigned', sub: 'cause, and for the whole population', pattern: 'service', icon: 'circlecheck' },
        { id: 'assigned', label: 'Assigned only', sub: 'cause, for the units in the study', pattern: 'service', icon: 'scale' },
        { id: 'sampled', label: 'Sampled only', sub: 'describes the population; no cause', pattern: 'storage', icon: 'search' },
        { id: 'neither', label: 'Neither', sub: 'association in these units only', pattern: 'storage', icon: 'ban' },
      ],
    },
    {
      id: 'studies',
      kind: 'table',
      label: 'Four workshop studies, and what each can support',
      sub: 'the unit is what was sampled or assigned, not what was measured',
      headers: ['study', 'sampled?', 'assigned?', 'supports'],
      values: [
        ['inspect 120 random chairs', 'yes', 'no', 'this quarter’s defect rate'],
        ['A on Mon–Wed, B on Thu–Fri', 'no', 'no', 'association only'],
        ['setting drawn by lot per batch', 'no', 'yes', 'effect of B vs A on these batches'],
        ['one chair under B, read 10 times', '—', '—', 'n = 1 chair, not 10'],
      ],
    },
  ],
  edges: [],
}
