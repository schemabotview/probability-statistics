import type { Scene } from '@graphlearning/flow'
import { sample } from '../plot-kit'

// §12.4 — settings A (15) and B (25) from chapter 8, scipy.stats.mannwhitneyu (two-sided, tie-corrected normal
// approximation): U = 289.5, p = 0.0046; U / (15 × 25) = 0.772 estimates P(A > B) + ½ P(tie); 8 values are
// tied, given mid-ranks. Hodges–Lehmann shift (median of the 375 pairwise differences) 3.3; medians 14.9 and
// 11.3. Equal-median example: X = 12 + 3(E − ln 2) and Y = 12 − 3(E − ln 2), E ~ Exp(1); both medians are 12
// but P(X > Y) = ¼(1 + 2 ln 2) = 0.597 (exact). 200 draws each (numpy seed 42, recentred to median 12):
// U / 40 000 = 0.609, p = 0.0002. CDFs below are the exact ones.
const FX = (t: number) => Math.max(0, 1 - 0.5 * Math.exp(-(t - 12) / 3))
const FY = (t: number) => Math.min(1, 0.5 * Math.exp((t - 12) / 3))

export const ranks: Scene = {
  id: 'rs-ranks',
  title: 'Rank methods, ties and estimand interpretation',
  flow: 'TB',
  nodes: [
    {
      id: 'cdfs',
      kind: 'plot',
      label: 'Same median, different distributions: a rank test can still reject',
      sub: 'X is skewed right and Y skewed left; both cross 0.5 at 12 minutes, yet P(X > Y) = 0.597',
      plot: {
        x: { min: 4, max: 20, step: 1, label: 'processing time (minutes)' },
        y: { min: 0, max: 1.05, step: 0.1, label: 'cumulative probability' },
        series: [
          { kind: 'line', points: sample(4, 20, 300, FX), label: 'X: long right tail', labelAt: [14.6, 0.55], color: '#2dd4bf' },
          { kind: 'line', points: sample(4, 20, 300, FY), label: 'Y: long left tail', labelAt: [6.2, 0.32], color: '#f472b6' },
          { kind: 'segment', from: [4, 0.5], to: [12, 0.5], color: '#fbbf24' },
          { kind: 'segment', from: [12, 0], to: [12, 0.5], label: 'both medians: 12', labelAt: [12.3, 0.08], color: '#fbbf24' },
        ],
      },
    },
    {
      id: 'wmw',
      kind: 'table',
      label: 'Wilcoxon–Mann–Whitney estimates P(A > B), not a difference in medians',
      sub: 'ties get mid-ranks and a variance correction',
      headers: ['quantity', 'settings A vs B', 'equal-median X vs Y'],
      values: [
        ['Mann–Whitney U, two-sided p', '289.5, p = 0.0046', 'p = 0.0002 (n = 200 each)'],
        ['U / (m n) ≈ P(A > B) + ½ P(tie)', '0.772', '0.609 (truth 0.597)'],
        ['difference in medians', '14.9 − 11.3 = 3.6', '0'],
        ['Hodges–Lehmann shift', '3.3', 'no single shift exists'],
        ['tied values', '8, given mid-ranks', 'none'],
      ],
    },
  ],
  edges: [],
}
