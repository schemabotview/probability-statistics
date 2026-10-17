import type { Section } from '../types'

export const samplingSection: Section = {
  id: 'sampling',
  title: 'Sampling frames and random, stratified and cluster sampling',
  scene: 'design-frames',
  focus: 'designs',
  slide: `## Sampling designs

A **sampling frame** is the list you actually sample from. A **design** says how units are drawn from it, and that decides how precise the estimate is.

### Three designs for 20 of 120 batches
- **Simple random**: every set of 20 equally likely
- **Stratified**: 2 at random from each of the 10 days
- **Cluster**: 2 random days, then 10 batches from each
- All three estimate the 6.66% mean without bias

### Why precision differs
- Days differ a lot: day averages run from 3.8% to 10.25%
- Stratifying guarantees every day is represented: SE 0.21
- Clusters put the sample in two days: SE 1.30
- Simple random sampling sits between: SE 0.45

### Watch out
The frame can miss part of the population. If reworked batches never reach the list, no design, however random, can estimate their defect rate.`,
  narration:
    "How should you choose which units to measure? First you need a sampling frame: the list you actually draw from. Here it is the hundred and twenty batches made over ten days, shown on the left by day. Notice that days differ a lot: some days average under four percent defective, one over ten percent. Now compare three designs that each pick twenty batches. A simple random sample makes every set of twenty equally likely. A stratified sample takes two batches at random from every day. A cluster sample picks two whole days at random and takes ten batches from each, which is often cheaper. All three are unbiased: averaged over many repetitions they hit the population mean of six point six six percent. But their precision differs. Over ten thousand simulated repetitions, the stratified estimate has a standard error of about zero point two, simple random about zero point four five, and the cluster estimate about one point three, because two days can easily both be unusual, like days five and seven here. One limit no design fixes: units missing from the frame cannot be sampled at all. Next, other ways data can mislead.",
}
