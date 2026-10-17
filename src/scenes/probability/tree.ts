import type { Scene } from '@graphlearning/flow'

// §2.4 — draw two chairs without replacement from the batch of 20 (3 defective). Exact: P(D₁) = 3/20,
// P(D₂ | D₁) = 2/19, P(D₂ | G₁) = 3/19. Path products: DD 0.0158, DG 0.1342, GD 0.1342, GG 0.7158.
// P(D₂) = 0.0158 + 0.1342 = 0.15 = 3/20, as symmetry says it must.
export const tree: Scene = {
  id: 'prob-tree',
  title: 'Conditional probability and multiplication trees',
  flow: 'TB',
  nodes: [
    {
      id: 'branches',
      label: 'Two draws from a batch of 20 with 3 defective',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'start', label: 'Batch of 20', sub: '3 defective, 17 good', pattern: 'user', icon: 'layers' },
        { id: 'd1', label: 'First defective', sub: 'P(D₁) = 3/20', pattern: 'warn', icon: 'ban' },
        { id: 'g1', label: 'First good', sub: 'P(G₁) = 17/20', pattern: 'service', icon: 'circlecheck' },
        { id: 'dd', label: 'D then D', sub: '3/20 × 2/19 = 0.0158', pattern: 'warn', icon: 'ban' },
        { id: 'dg', label: 'D then G', sub: '3/20 × 17/19 = 0.1342', pattern: 'storage', icon: 'swap' },
        { id: 'gd', label: 'G then D', sub: '17/20 × 3/19 = 0.1342', pattern: 'storage', icon: 'swap' },
        { id: 'gg', label: 'G then G', sub: '17/20 × 16/19 = 0.7158', pattern: 'service', icon: 'circlecheck' },
      ],
      edges: [
        { source: 'start', target: 'd1' },
        { source: 'start', target: 'g1' },
        { source: 'd1', target: 'dd', label: '2/19' },
        { source: 'd1', target: 'dg', label: '17/19' },
        { source: 'g1', target: 'gd', label: '3/19' },
        { source: 'g1', target: 'gg', label: '16/19' },
      ],
    },
    {
      id: 'conditional',
      kind: 'table',
      label: 'P(A ∩ B) = P(A) P(B | A): multiply along a path, add across paths',
      sub: 'P(B | A) = P(A ∩ B) / P(A), defined when P(A) > 0',
      headers: ['quantity', 'calculation', 'value'],
      values: [
        ['P(both defective)', '3/20 × 2/19', '0.0158'],
        ['P(exactly one defective)', '0.1342 + 0.1342', '0.2684'],
        ['P(second defective)', '0.0158 + 0.1342', '0.15 = 3/20'],
        ['P(D₂ | D₁) vs P(D₂)', '2/19 vs 3/20', '0.105 vs 0.150: dependent'],
      ],
    },
  ],
  edges: [],
}
