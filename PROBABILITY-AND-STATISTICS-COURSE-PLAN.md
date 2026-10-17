# Probability and Statistics — From Uncertainty to Defensible Inference

## Audience and prerequisites

For learners with algebra, fractions, powers, elementary functions, and graph-reading skills. No previous probability, statistics, or programming is assumed. Introduce sets, counting, summation notation, and basic reasoning locally.

The companion [Calculus and Optimisation plan](CALCULUS-AND-OPTIMISATION-COURSE-PLAN.md) supplies the derivatives, integrals, and change-of-variable reasoning used from continuous probability onward. Learners can follow graphical and supplied-calculation interpretations before completing those foundations; analytical derivations require them. The companion [Linear Algebra plan](LINEAR-ALGEBRA-COURSE-PLAN.md) supplies vectors, covariance-matrix geometry, quadratic forms, and least-squares structure for multivariate and regression material. Refresh notation locally without reproducing either course.

Scope: Study design/description, probability and joint models, sampling and simulation, estimation, uncertainty/evidence, comparisons/experiments, regression, Bayesian decisions, and robust/resampling analysis. Advanced asymptotic information theory and specialist inferential-method surveys are deferred.

Target capability: formulate questions and estimands; evaluate data-collection designs; calculate and interpret probabilities; construct elementary estimators and inference procedures; explain their assumptions; and reason about uncertainty, practical effects, and causal limits. Demonstrations support these capabilities without claiming observed individual mastery.

Structure: **12 chapters, 92 sections**, distributed **8, 8, 8, 8, 8, 7, 8, 7, 7, 8, 7, 8**. Counts reflect coherent learning milestones, not equal duration.

## Learning spine

Questions, Data, and Study Design → Events, Conditioning, and Independence → Random Variables and Probability Models → Joint Structure and Conditional Moments → Sampling Distributions and Simulation → Estimation and Likelihood → Intervals, Tests, and Statistical Evidence → Comparing Groups and Outcomes → Experiments and Causal Reasoning → Regression and Model Checking → Bayesian Inference and Decisions → Resampling, Robustness, and Honest Analysis.

Progression rationale: Collection/description become one data-understanding milestone; events/conditioning share a probability foundation. Sampling distributions and Monte Carlo jointly explain repeated-sampling behaviour. Confidence intervals and tests share uncertainty/evidence reasoning, while group procedures and causal experiments retain separate milestones.

Recurring example: a fictional workshop inspects product defects, records processing times and material use, samples production batches, and compares equipment settings. Specify inspection rules, exposure, units, product mix, batch dependence, and missing/rejected records. Discrete counts and continuous measurements remain separate modelling questions. A prespecified randomised setting experiment is a separate data-generating design, not retrospectively attributed to the observational sample. Coins, sampling urns, geometry, and contrasting synthetic examples expose ideas more clearly when needed.

Teaching method: question/estimand → data-generating or sampling assumptions → representation and calculation → explanation/derivation → uncertainty/diagnostics → failure contrast → outcome → bridge. Use frequency trees, tables, density diagrams, sampling-distribution plots, worked sums/integrals, supplied simulation summaries, and annotated code/output when useful. Explain why procedures behave as claimed and where hypotheses are needed. State parameter conventions and distinguish exact, asymptotic, model-based, design-based, and Monte Carlo claims. Running examples is optional. No submitted exercises, assessments, learner monitoring, executable lessons, applications, or deployments are delivered.

Course ownership: Mathematical derivations belong to the relevant mathematics plan; probability/inference and experiment theory to Probability and Statistics; general predictive/discovery evaluation to Machine Learning; neural computations and training-state behaviour to Neural Networks and Deep Learning; operational contracts, delivery, monitoring, and retraining to ML Engineering and MLOps. A local refresher or domain-specific failure case is intentional overlap, not a second full treatment.

## Chapter 1 — Questions, Data, and Study Design

Objective: Turn an informal question into a population, target quantity, and defensible data-collection plan. Summarise observations without confusing descriptive patterns with population or causal conclusions.

1. Populations, estimands, parameters, and statistics
2. Units, measurement scales, and data provenance
3. Sampling frames, random/stratified/cluster sampling
4. Selection, nonresponse, measurement bias, and missingness
5. Random assignment versus random sampling
6. Distributions, plots, location, and spread
7. Association, aggregation reversals, and exploratory claims
8. Ethical collection and limits of generalisation

Worked illustrations: Use workshop defect/time estimands, a skewed sample, and an aggregation reversal; show why repeated readings of one item are not independent experimental units.

Outcome: Specify a statistical question, its unit and target population, and explain the limits introduced by how the data were collected. Choose and interpret appropriate summaries and plots, and identify descriptive claims that exceed the evidence.

Bridge: Probability provides a model for the uncertainty observed in data.

## Chapter 2 — Events, Conditioning, and Independence

Objective: Construct probability models and justify event calculations under explicit assumptions. Reason about updated probabilities without reversing conditions or ignoring base rates.

1. Sample spaces, events, and probability axioms
2. Set operations, partitions, and inclusion–exclusion
3. Counting with/without replacement and equal-likelihood assumptions
4. Conditional probability and multiplication trees
5. Total probability and Bayes’ rule
6. Independence, exclusivity, and conditional independence
7. Base rates and reversed-condition errors
8. Probability zero versus impossibility and conditioning boundaries

Worked illustrations: Calculate inspection/sample probabilities and a defect-screening frequency tree; distinguish conditional and marginal independence and reserve point conditioning for density definitions.

Outcome: Represent events and calculate probabilities using valid counting and probability rules. Compute conditional probabilities and explain the assumptions behind independence and Bayesian updating.

Bridge: Random variables express uncertain quantities under those probability rules.

## Chapter 3 — Random Variables and Probability Models

Objective: Describe discrete uncertainty and connect distributions to expected values and variability. Explain continuous probability models and interpret their parameters, tails, and moment assumptions.

1. Random variables, support, mass/density, and CDFs
2. Expectation, transformations of quantities, and variance
3. Bernoulli/binomial and hypergeometric sampling
4. Geometric and Poisson counts with parameter conventions
5. Uniform/exponential models and normal standardisation
6. Positive/bounded/skewed families and model selection
7. Quantiles, tails, moment existence, and mixed distributions
8. t, chi-square, and F reference distributions

Worked illustrations: Compare defect counts, first-defect trials, and measured times; explain density heights above one, undefined moments, and why E[g(X)] need not equal g(E[X]).

Outcome: Select a defensible discrete model and calculate or interpret its probabilities, expectation, and variance. Interpret densities and continuous-model parameters, calculate simple interval probabilities, and recognise unsupported tail or moment assumptions.

Bridge: Several quantities require a joint model and explicit dependence reasoning.

## Chapter 4 — Joint Structure and Conditional Moments

Objective: Explain multivariate uncertainty and separate association from independence.

1. Joint distributions and support regions
2. Marginalisation by summation/integration
3. Conditional distributions and conditional expectation
4. Factorisation and independence
5. Covariance, correlation, and covariance-matrix interpretation
6. Variance of sums and dependence
7. Total expectation and total variance
8. Mixtures and introductory multivariate-normal geometry

Worked illustrations: Derive marginal/conditional rates from a small product/defect table, compare correlated batches, and show uncorrelated dependence; matrix/PCA derivations stay in Linear Algebra.

Outcome: Derive marginals and conditional summaries, quantify dependence, and explain its effect on aggregate uncertainty.

Bridge: Repeated sampling transforms joint models into distributions of statistics.

## Chapter 5 — Sampling Distributions and Simulation

Objective: Explain how probability models determine the behaviour of statistics across repeated samples. Use simulation to investigate a specified probability model and quantify simulation error.

1. Transformations, CDF methods, and Jacobian factors
2. Sampling distributions, sample means/proportions, and standard errors
3. Probability bounds with stated moment conditions
4. LLN stabilisation versus CLT distributional approximation
5. Dependence, heavy tails, and finite-population corrections
6. Monte Carlo probability/expectation estimates
7. Simulation uncertainty, replication budgets, and seeds
8. Analytical checks and repeated-sampling demonstrations

Worked illustrations: Compare individual-time and sample-mean distributions, a heavy-tail/dependence failure, and a Monte Carlo summary. Four times the IID finite-variance replications approximately halves Monte Carlo standard error.

Outcome: Explain a sampling distribution, distinguish LLN from CLT, and assess a normal approximation using its assumptions. Explain a simulation estimator and its uncertainty, choose basic checks, and identify conclusions simulation alone cannot establish.

Bridge: These distributions and simulations prepare inference about unknown parameters.

## Chapter 6 — Estimation and Likelihood

Objective: Construct estimators and explain their quality and model dependence.

1. Models, parameters, identifiability, and estimators
2. Bias, variance, MSE, and consistency
3. Sample moments and method of moments
4. Likelihood versus parameter probability
5. Log likelihood and maximum likelihood
6. Bernoulli/normal/rate examples and boundary estimates
7. Information retained by summaries and regularity limits

Worked illustrations: Derive a Bernoulli likelihood and the sample-variance bias contrast; discuss zero-defect boundary estimates without assuming all asymptotic approximations remain valid.

Outcome: Construct simple estimators and likelihoods, compare estimation error properties, and recognise identification or regularity failures.

Bridge: A point estimate needs a calibrated uncertainty and evidence statement.

## Chapter 7 — Intervals, Tests, and Statistical Evidence

Objective: Construct and interpret frequentist intervals while distinguishing parameter, prediction, and population coverage questions. Explain testing without treating a threshold as a substitute for scientific or practical reasoning.

1. Frequentist coverage and compatible interval/test procedures
2. Mean intervals and normal/t assumptions
3. Proportion intervals and sparse-sample failures
4. Confidence versus prediction/tolerance intervals
5. Hypotheses, statistics, and null reference distributions
6. p-values, effect size, and practical significance
7. Type I/II errors, power, and precision planning
8. Multiplicity, optional stopping, and failure to reject

Worked illustrations: Use repeated-interval diagrams, a sparse proportion, and a tiny precisely estimated effect; distinguish confidence coverage from posterior probability and avoid threshold-only conclusions.

Outcome: Interpret confidence coverage, select an elementary interval matched to the design/model, and distinguish different uncertainty targets. Explain the evidence and error control of a test, interpret effect sizes alongside uncertainty, and recognise invalid selective or sequential claims.

Bridge: Specific data types and comparison units determine the appropriate procedure.

## Chapter 8 — Comparing Groups and Outcomes

Objective: Match common comparison procedures to estimands, dependence structures, and assumptions.

1. Independent versus paired experimental units
2. Welch/pooled mean comparisons and assumptions
3. Paired differences and repeated-reading pitfalls
4. Proportion comparisons and absolute/relative effects
5. Contingency tables, expected counts, and sparse alternatives
6. Goodness of fit and estimated-parameter degrees of freedom
7. ANOVA, omnibus hypotheses, contrasts, and multiplicity

Worked illustrations: Compare matched and independent batches, calculate expected table counts, and interpret an ANOVA result without claiming every pair differs.

Outcome: Choose and explain a comparison method for a stated target/design and interpret its result without exceeding its assumptions.

Bridge: Credible treatment comparisons depend on experimental design and causal assumptions.

## Chapter 9 — Experiments and Causal Reasoning

Objective: Explain how design supports intervention claims and why observational adjustment needs additional assumptions.

1. Potential outcomes, interventions, and target effects
2. Randomisation, replication, blocking, and blinding
3. Factorial main effects, interactions, and nuisance variation
4. Confounding, selection, and simple causal diagrams
5. Consistency, overlap, exchangeability, and interference
6. Attrition/noncompliance and intention-to-treat
7. Prespecified metrics, power, stopping, and external validity

Worked illustrations: Design a setting experiment blocked by day, contrast additive and interaction effects, and explain why post-treatment exclusions can undermine randomised evidence.

Outcome: Explain what a design can identify, state assumptions for causal interpretation, and distinguish randomised evidence from observational association.

Bridge: Regression extends comparisons to conditional relationships and adjustment.

## Chapter 10 — Regression and Model Checking

Objective: Interpret statistical regression models and assess their assumptions, uncertainty, and scope.

1. Conditional-mean models and least-squares estimation
2. Multiple predictors, categories, and interactions
3. Coefficient interpretation, collinearity, and identifiability
4. Coefficient uncertainty and response/prediction intervals
5. Residuals, heteroscedasticity, dependence, leverage, and influence
6. Transformations, extrapolation, and specification
7. Logistic/binomial and Poisson modelling orientation
8. Selection uncertainty and causal/predictive claim limits

Worked illustrations: Interpret supplied coefficients/residuals and compare mean-response with future-observation uncertainty. Distinguish assumptions for unbiased estimation from exact normal-error t/F inference; optimisation and predictive tuning belong elsewhere.

Outcome: Interpret regression coefficients and uncertainty, diagnose important model failures, and separate conditional association from causal or predictive guarantees.

Bridge: Bayesian inference offers a distinct interpretation of parameter and predictive uncertainty.

## Chapter 11 — Bayesian Inference and Decisions

Objective: Explain posterior learning and distinguish its interpretations from frequentist procedures.

1. Prior, likelihood, posterior, and marginal likelihood
2. Beta–binomial conjugate updating
3. Posterior summaries, credible intervals, and MAP caveats
4. Posterior predictive uncertainty
5. Prior/predictive checks and sensitivity
6. Expected loss and elementary Bayes decisions
7. Grid approximation and limits of numerical evidence

Worked illustrations: Update a defect proportion under two priors and choose an action under asymmetric loss; contrast credible and frequentist intervals without treating either interpretation as interchangeable.

Outcome: Explain Bayesian updating and predictive uncertainty, compare prior sensitivity, and justify an elementary decision under a stated loss.

Bridge: Resampling and robust reasoning address limits of simple parametric analyses.

## Chapter 12 — Resampling, Robustness, and Honest Analysis

Objective: Explain methods beyond simple parametric inference while retaining their assumptions and limits. Evaluate a statistical argument and communicate what its evidence supports and leaves unresolved.

1. Empirical distributions and nonparametric estimation
2. Bootstrap units, interval families, and failure cases
3. Permutation/randomisation tests and exchangeability
4. Rank methods, ties, and estimand interpretation
5. Robust estimation and contamination sensitivity
6. Missing-data mechanisms and imputation uncertainty
7. Analysis plans, sensitivity, and reproducible reporting
8. Integrated evidence, unresolved bias, and population change

Worked illustrations: Contrast batch bootstrap with row resampling and bootstrap uncertainty with a permutation null. Interpret a rank test without automatically calling it a median test; finish with an effect/interval/assumptions report.

Outcome: Explain a resampling scheme matched to a design, identify robustness limits, and reason about the assumptions behind missing-data handling. Assess the strength of a statistical conclusion, communicate uncertainty and limitations clearly, and justify a method/design choice with evidence.

Bridge: Continue with unfamiliar examples and reasoned implementation practice; use the companion courses for the named specialist and operational depth.

## Sources and scope

Sources checked on **2026-10-13**. Mathematical concepts are release-independent. Exact library versions, random-generation conventions, test alternatives, and interval settings must be specified when executable illustrations are developed.

Hossein Pishro-Nik's [Introduction to Probability, Statistics, and Random Processes (2014; live online text)](https://www.probabilitycourse.com/) was inspected through its scope and selected sections on [conditioning](https://www.probabilitycourse.com/chapter1/1_4_0_conditional_probability.php), [density](https://www.probabilitycourse.com/chapter4/4_1_1_pdf.php), [probability bounds](https://www.probabilitycourse.com/chapter6/6_2_2_markov_chebyshev_inequalities.php), [limit-theorem overview](https://www.probabilitycourse.com/chapter7/7_1_0_limit_theorems.php), [likelihood](https://www.probabilitycourse.com/chapter8/8_2_3_max_likelihood_estimation.php), and [Bayesian inference](https://www.probabilitycourse.com/chapter9/9_1_0_bayesian_inference.php). Barbara Illowsky and Susan Dean's [Introductory Statistics, second edition (2023)](https://openstax.org/books/introductory-statistics-2e/pages/preface) was inspected through its preface, scope, and selected sampling, CLT, and ANOVA sections. Larry Wasserman's [All of Statistics (first edition, 2004)](https://link.springer.com/book/10.1007/978-0-387-21736-9) was compared through the publisher description and contents only; full book text was not accessed. Its advanced mathematical audience informs boundaries, not the beginner opening.

Selected [NIST/SEMATECH handbook](https://www.itl.nist.gov/div898/handbook/) pages inform confidence intervals, proportions, comparisons, experiments, and diagnostics. The ASA's [2016 p-value guidance release](https://www.amstat.org/asa/files/pdfs/P-ValueStatement.pdf) informs evidence interpretation. Arthur White's [beta–binomial teaching notes](https://www.scss.tcd.ie/arthur.white/Teaching/CS7DS3/Bayes_Inference_1_slides.html) support the elementary Bayesian illustration. Official SciPy [bootstrap](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html) and [permutation-test](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.permutation_test.html) documentation supplies method-assumption cross-checks, not a prescribed runtime. Inspection is selective; detailed evidence, source limits, coverage mapping, and review status remain in [README.md](../README.md).

Deferred specialist depth: measure-theoretic probability; characteristic-function/MGF proof machinery; stochastic processes, Markov-chain theory, and martingales; full asymptotic efficiency theory; advanced survey weighting; time series and forecasting; survival/censoring models; mixed-effects/longitudinal modelling; causal identification algorithms; Bayesian hierarchical modelling and MCMC implementation; high-dimensional inference; specialised nonparametric estimation; and sequential/always-valid testing methods. Dependence, cluster structure, missing-data mechanisms, and optional stopping are taught as foundational reasoning and limitations, without pretending the simple IID procedures solve those specialist problems.

Intentional overlap: Calculus supplies integration/differentiation and numerical optimisation; Linear Algebra supplies matrix structure, least squares, and PCA geometry. This course explains probability models and inferential interpretation around those operations. Machine Learning develops predictive validation, regularisation/tuning, and algorithm families; statistical regression and model checking here supply prerequisites rather than reproducing that course.


Scope refinement checked on **2026-10-14**: Detailed Fisher-information/efficiency theory, convolution catalogues, variance-reduction algorithms, advanced smoothing, complex-survey methods, and formal sequential inference are deferred. Matrix/PCA derivations belong to Linear Algebra; prediction tuning belongs to ML. Keep distribution assumptions, effect/coverage interpretations, causal limits, Bayesian updating, and valid resampling units. Earlier source inspections are retained as research evidence, including sources for topics now deferred; a retained citation does not imply core coverage.
