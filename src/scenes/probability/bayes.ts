import type { Scene } from '@graphlearning/flow'
import { SCREEN } from '../workshop'

// §2.5 — the visual check on 10 000 chairs: 7% defective, flags 90% of defects and 5% of good chairs.
// Expected counts (exact under the model): 700 → 630 flagged + 70 missed; 9300 → 465 flagged + 8835
// passed. P(flag) = 1095/10 000 = 0.1095; P(defective | flag) = 630/1095 = 0.575.
const N = 10000
const d = Math.round(SCREEN.prevalence * N)
const g = N - d
const tp = Math.round(SCREEN.sensitivity * d)
const fp = Math.round(SCREEN.falsePositive * g)

export const bayes: Scene = {
  id: 'prob-bayes',
  title: 'Total probability and Bayes’ rule',
  flow: 'TB',
  nodes: [
    {
      id: 'frequency',
      label: 'The end-of-line check on 10 000 chairs, as expected counts',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'all', label: '10 000 chairs', sub: '7% defective', pattern: 'user', icon: 'layers' },
        { id: 'def', label: `${d} defective`, sub: 'check flags 90%', pattern: 'warn', icon: 'ban' },
        { id: 'good', label: `${g} good`, sub: 'check flags 5%', pattern: 'service', icon: 'circlecheck' },
        { id: 'tp', label: `${tp} flagged`, sub: 'defective and flagged', pattern: 'warn', icon: 'search' },
        { id: 'fn', label: `${d - tp} missed`, sub: 'defective, passed', pattern: 'storage', icon: 'circleslash' },
        { id: 'fp', label: `${fp} flagged`, sub: 'good but flagged', pattern: 'warn', icon: 'search' },
        { id: 'tn', label: `${g - fp} passed`, sub: 'good and passed', pattern: 'service', icon: 'circlecheck' },
      ],
      edges: [
        { source: 'all', target: 'def' },
        { source: 'all', target: 'good' },
        { source: 'def', target: 'tp' },
        { source: 'def', target: 'fn' },
        { source: 'good', target: 'fp' },
        { source: 'good', target: 'tn' },
      ],
    },
    {
      id: 'rule',
      kind: 'table',
      label: 'Bayes’ rule: P(D | flag) = P(flag | D) P(D) / P(flag)',
      sub: 'total probability: P(flag) = P(flag | D) P(D) + P(flag | G) P(G)',
      headers: ['quantity', 'from the tree', 'value'],
      values: [
        ['P(flag)', `(${tp} + ${fp}) / 10 000`, (tp + fp) / N + ''],
        ['P(defective | flag)', `${tp} / ${tp + fp}`, (tp / (tp + fp)).toFixed(3)],
        ['P(defective | passed)', `${d - tp} / ${N - tp - fp}`, ((d - tp) / (N - tp - fp)).toFixed(4)],
        ['P(flag | defective)', `${tp} / ${d}`, SCREEN.sensitivity + ''],
      ],
    },
  ],
  edges: [],
}
