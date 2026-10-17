import type { Scene } from '@graphlearning/flow'

// §12.7 — six defensible analyses of settings A vs B (chapter 8), scipy.stats: Welch 0.0006, pooled 0.0033,
// Welch on log time 0.0008, Mann–Whitney 0.0046, Yuen 20% trimmed 0.0025, Welch after dropping |z| > 2
// 0.0006. Under the null (numpy seed 44, 4000 pairs of lognormal samples, n = 15 and 25, same distribution):
// Welch alone rejects at 5% in 4.95% of datasets; "the smallest of the six" in 10.7%.
export const plan: Scene = {
  id: 'rs-plan',
  title: 'Analysis plans, sensitivity and reproducible reporting',
  flow: 'TB',
  nodes: [
    {
      id: 'plan-cards',
      label: 'An analysis plan, written before the data are seen',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'estimand', label: 'Question and estimand', sub: 'difference in mean time, B − A', pattern: 'service', icon: 'search' },
        { id: 'primary', label: 'Primary analysis', sub: 'Welch interval, two-sided', pattern: 'service', icon: 'circlecheck' },
        { id: 'secondary', label: 'Sensitivity analyses', sub: 'log scale, ranks, trimmed', pattern: 'service', icon: 'layers' },
        { id: 'exclusions', label: 'Exclusions, missing data', sub: 'rules fixed in advance', pattern: 'storage', icon: 'scissors' },
        { id: 'versions', label: 'Seeds and versions', sub: 'code, seed and library pinned', pattern: 'storage', icon: 'lock' },
        { id: 'report-all', label: 'Report every analysis', sub: 'not only the best p-value', pattern: 'storage', icon: 'table' },
      ],
    },
    {
      id: 'forks',
      kind: 'table',
      label: 'Six defensible analyses of the same data',
      sub: 'here they agree; under the null, picking the smallest p doubles the false-alarm rate',
      headers: ['analysis', 'p-value', 'under H₀: rejects at 5%'],
      values: [
        ['Welch t (the planned primary)', '0.0006', '4.95% of datasets'],
        ['pooled t', '0.0033', ''],
        ['Welch t on log time', '0.0008', ''],
        ['Mann–Whitney', '0.0046', ''],
        ['Yuen 20% trimmed', '0.0025', ''],
        ['Welch, |z| > 2 dropped', '0.0006', ''],
        ['smallest of the six', '0.0006', '10.7% of datasets'],
      ],
    },
  ],
  edges: [],
}
