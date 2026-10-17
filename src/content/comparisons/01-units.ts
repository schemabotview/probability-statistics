import type { Section } from '../types'

export const unitsSection: Section = {
  id: 'units',
  title: 'Independent versus paired experimental units',
  scene: 'cmp-paired',
  focus: 'analyses',
  slide: `## Paired or independent?

The analysis must follow the **design**. If each unit is measured under both conditions, the data are **paired**; if each unit gets one condition, the groups are **independent**.

### Twelve boards, two glues
- Each board glued once with each glue
- Boards differ by up to 11 minutes in drying time
- Old and new readings correlate at 0.96
- The new glue is faster on all 12 boards

### Same numbers, two analyses
- Paired: SE 0.25, t = −6.6, p = 0.00004
- As 24 independent boards: SE 1.26, p = 0.20
- Pairing removes board-to-board variation

### Watch out
Choosing the analysis that gives the smaller p-value is not allowed: the design decides. Treating paired data as independent wastes the design; treating independent data as paired invents a link that is not there.`,
  narration:
    "This chapter matches common comparison procedures to what is being compared, to how the data depend on each other, and to the assumptions each method makes. The first question is always the design. Twelve boards were each glued twice, once with the old glue and once with the new, and the drying time recorded. On the left, each line is one board. The boards differ enormously, by up to eleven minutes, but within every board the new glue is faster. The two readings from the same board are strongly linked: their correlation is ninety six percent. These are paired data. A paired analysis works on the twelve within board differences. Their standard error is a quarter of a minute, and the evidence for a faster glue is overwhelming. Analyse the same twenty four numbers as if they came from twenty four separate boards, and the board to board variation swamps the comparison: the standard error grows fivefold and the p value is about one in five. Pairing removed the board variation from the comparison. The design determines the analysis. Choosing whichever analysis gives the smaller p value is not allowed, in either direction. Next, comparing two independent groups.",
}
