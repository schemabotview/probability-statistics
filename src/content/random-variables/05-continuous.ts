import type { Section } from '../types'

export const continuousSection: Section = {
  id: 'continuous',
  title: 'Uniform and exponential models and normal standardisation',
  scene: 'rv-continuous',
  focus: 'models',
  slide: `## Continuous models

A continuous model has a **density** f, with P(a < X < b) = area under f from a to b. Three workhorses: uniform, exponential and normal.

### The normal and standardising
- Seat height ~ Normal(450, 3.9²) mm
- Standardise: Z = (X − 450)/3.9 ~ Normal(0, 1)
- Spec 444–456 mm is −1.54 < Z < 1.54
- P(in spec) = 0.876; P(too high) = 0.062

### Exponential waiting times
- Minutes between stoppages, mean 40
- P(T > 60) = e⁻¹·⁵ = 0.223
- Memoryless: P(T > 60 | T > 30) = 0.472

### Watch out
A density is not a probability and can exceed 1: Uniform(0, 0.5) has density 2 throughout. Only areas are probabilities, and every density's total area is 1.`,
  narration:
    "How do you calculate with a continuous model? Probabilities are areas under the density curve. The normal distribution is the most used. Model seat height as normal with mean four hundred and fifty millimetres and standard deviation three point nine, the spread between chairs from chapter one. The specification allows four hundred and forty four to four hundred and fifty six. To find the share within it, standardise: subtract the mean and divide by the standard deviation. The limits become minus and plus one point five four standard units, and the standard normal table, or software, gives an area of about zero point eight eight, the shaded region on the left. About six percent of seats are too high. The exponential distribution models waiting times between events that occur at a steady rate, like machine stoppages, averaging forty minutes apart. The chance of going an hour without one is about twenty two percent. It is memoryless: having already run thirty minutes without a stoppage, the chance of reaching sixty is the same as the chance of lasting thirty more from scratch. One warning: density values are not probabilities, and can exceed one. Only areas are probabilities. Next, choosing a family.",
}
