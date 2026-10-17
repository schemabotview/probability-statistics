# probability-statistics

The GraphL concept app for **Probability and Statistics — from uncertainty to defensible
inference**: 12 courses (one per chapter), 92 sections, each section one `(scene, slide, narration)`
video segment.

Scaffolded from [`content-repo-template`](https://github.com/schemabotview/content-repo-template),
with the density tooling and plot builders developed on
[`linear-algebra`](https://github.com/schemabotview/linear-algebra) and
[`calculus-optimisation`](https://github.com/schemabotview/calculus-optimisation).

- `PROBABILITY-AND-STATISTICS-COURSE-PLAN.md` — the syllabus.
- `AUTHORING-PLAN.md` — how the syllabus becomes sections, in what order, and the density check.
- `CLAUDE.md` — route contract, course ids, scene vocabulary, and the invariants inherited from the
  template.

## Running it

```sh
npm ci
npm run dev          # http://localhost:5173
```

Routes are `#/<course>-<section>`, e.g. `#/design-estimands`. `#/` is the catalog.

## Verifying a change

```sh
npm run build && npx tsc --noEmit && npm run check
CHROME_PATH=/opt/pw-browsers/chromium npm run density
```

The first three are a floor; `density` reports how full each frame is and writes a screenshot per
route to `density/`. The rendered route is the real bar.
