import type { Section } from '../types'

export const unitsSection: Section = {
  id: 'units',
  title: 'Units, measurement scales and data provenance',
  scene: 'design-units',
  focus: 'readings',
  slide: `## Units, scales and provenance

A dataset is a set of **units** with recorded **variables**. Each variable has a **scale**, which decides which summaries make sense, and a **provenance**: who or what recorded it, and how.

### Measurement scales
- **Nominal**: unordered, such as defect type
- **Ordinal**: ordered, such as finish grade 1–4
- **Interval**: arbitrary zero, such as °C
- **Ratio**: true zero, such as mm or minutes

### Units, not readings
- 5 chairs × 4 readings: 20 numbers, 5 units
- Readings of one chair differ by about 0.49 mm
- Different chairs differ by about 3.89 mm
- Four readings of one chair are not four chairs

### Watch out
Averaging finish grades treats 1→2 and 3→4 as equal steps. And "the machine log" is a provenance claim: check what the log records and when it fails to record.`,
  narration:
    "Before summarising anything, ask what each number is. A dataset records variables on units, and every variable has a measurement scale. Nominal variables are unordered categories, like the type of defect. Ordinal variables are ordered, like a finish grade from one to four, but the gaps between grades are not known to be equal. Interval variables have meaningful differences but an arbitrary zero, like temperature in Celsius. Ratio variables have a true zero, like seat height in millimetres or processing time in minutes, so twice as long really means twice as long. Each variable also has a provenance: an inspector's judgement, a gauge, a wall sensor, a machine log. Now the unit question. On the left, five chairs each had their seat height read four times. The four readings of one chair agree to about half a millimetre, while different chairs differ by about four millimetres. Twenty numbers, but only five units. Treating the readings as twenty independent chairs would overstate how much you know about chairs in general. Next, choosing which units to measure.",
}
