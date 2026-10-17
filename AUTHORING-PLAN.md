# Authoring plan — Probability and Statistics

How `PROBABILITY-AND-STATISTICS-COURSE-PLAN.md` becomes 92 recorded sections, and how each frame is
checked for density as well as overflow. The course ids and scene vocabulary are in `CLAUDE.md`.
The method is the one that produced `linear-algebra` (80 sections) and `calculus-optimisation` (88).

## Mapping

- **Concept** = Probability and Statistics. **Course** = chapter (12). **Section** = plan section (92).
- The plan's per-chapter **Worked illustrations** become scenes. The **Objective** goes into the first
  section's narration; the **Outcome** and **Bridge** into the last.
- Each section compresses the plan's teaching method into one frame: question and estimand
  (narration opening) → definition (slide lead) → assumptions, representation and calculation
  (scene) → failure contrast (a `### Watch out` block) → bridge (narration close).
- Section id = a short kebab form of the section title. Scene ids carry a chapter prefix
  (`design-…`), because scene ids are global. Ids are permanent once wavs exist.

## The unit of work: one chapter

1. **Compute first.** Data are synthetic and generated once with numpy from a recorded seed; every
   probability, estimate, interval and simulation summary on screen is computed from them, then
   rounded for display. The scene file's comment names the seed and says what kind of claim the
   number is: exact, asymptotic, model-based, design-based or Monte Carlo.
2. **Scenes**, using the vocabulary in `CLAUDE.md`.
3. **Slides**: H2, a lead, three `###` blocks. Author to a modelled height of about 930–995px, with
   bullets under ~50 characters.
4. **Narration**: 150–180 words per section (the two earlier repos ran 160–200).
5. **Guards**: `npm run build && npx tsc --noEmit && npm run check && npm run density`.
6. **Look at every frame** on the chapter contact sheet, fix collisions, re-run.
7. **Commit and push per chapter.** Audio after review, one Colab pass per chapter.

**Chapter 1 (`design`, 8 sections) is the pilot**, reviewed before chapters 2–12.

## Density check

Unchanged from the earlier repos: `npm run density` renders every route and reports slide fill
(measured, target 0.80–0.95), scene binding axis (≥ 0.85), scene area (≥ 0.55) and eyebrow overlap,
with a screenshot per route in `density/`. Targets, not thresholds; only eyebrow overlap fails.

## The workshop thread

`src/scenes/workshop.ts` holds the synthetic workshop so it reads the same in every chapter: a
quarter's chair production with a known defect proportion (p = 0.07) and samples drawn from it,
repeated gauge readings, a skewed set of processing times, batch defect rates by day, a
setting-by-product table that reverses on aggregation, and weekly rates across a supplier change.
Later chapters add to it rather than inventing new examples: counts and first-defect trials
(ch. 3), a product × defect table (ch. 4), the settings experiment blocked by day (ch. 9), and the
defect proportion updated under two priors (ch. 11). Coins, urns and synthetic contrasts are used
where they expose an idea more cleanly.

## Scene plan by chapter

| course | dominant scene shapes |
| --- | --- |
| `design` | sample statistics around a parameter; histograms; a sampling frame by day; a Simpson's-mix plot |
| `probability` | frequency trees as `TB` graphs; two-way tables; a screening tree with base rates |
| `random-variables` | stem plots of mass functions; densities with shaded tail areas; CDFs |
| `joint` | joint tables with margins; scatter of dependent and uncorrelated pairs; bivariate-normal contours |
| `sampling` | individual versus sample-mean histograms; LLN running means; Monte Carlo error against replications |
| `estimation` | likelihood curves with the MLE; bias/variance tables; sampling distributions of two estimators |
| `inference` | repeated-interval diagrams; null distributions with p-value tails; power curves |
| `comparisons` | paired versus independent plots; expected-count tables; group means with intervals |
| `experiments` | potential-outcome tables; causal diagrams as graphs; interaction plots |
| `regression` | fitted lines with confidence and prediction bands; residual plots; leverage |
| `bayesian` | prior, likelihood and posterior curves; posterior predictive bars; a loss table |
| `resampling` | bootstrap distributions; permutation nulls; robust versus classical estimates under contamination |

## Open decisions

- **Brand**: `--brand #0d9488` (teal), `--accent-2 #fbbf24` (amber); linear-algebra is blue,
  calculus-optimisation violet.
- **Code cards**: the plan allows annotated code and output. Proposed for chapter 5 (a Monte Carlo
  estimate with its standard error), chapter 11 (a grid posterior) and chapter 12 (bootstrap and
  permutation), each printing output copied from a real run; tables elsewhere.
