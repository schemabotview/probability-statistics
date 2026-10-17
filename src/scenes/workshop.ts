// The recurring workshop, shared by every chapter so the example reads the same each time it returns.
// A fictional workshop makes chairs and tables, inspects them for defects, times each job, and runs its
// machines at one of two settings, A or B. All data here are SYNTHETIC: generated once with numpy from
// the seeds noted on each block, then frozen, so every chapter sees the same numbers.
//
// Inspection rule: an item is defective if any of the seat, joints or finish fails the end-of-line
// check; one inspection per item, recorded with the batch, day, product and setting.

/** The quarter's chair production: 6000 chairs, 420 defective, so p = 0.07. */
export const QUARTER = { N: 6000, defective: 420 }

/** Defectives found in 20 simple random samples of 120 chairs from the quarter (numpy seed 1). */
export const SAMPLE_DEFECTS = [8, 5, 14, 8, 8, 9, 4, 8, 10, 5, 9, 9, 9, 7, 8, 6, 6, 8, 9, 8]
export const SAMPLE_SIZE = 120

/** Seat height (mm) of five chairs, each read four times with the same gauge (numpy seed 2). */
export const READINGS = [
  [448.1, 447.7, 447.8, 446.5],
  [453.1, 452.7, 451.8, 452.5],
  [445.2, 444.7, 445.6, 444.8],
  [454.8, 454.5, 455.3, 454.9],
  [450.3, 449.6, 450.1, 449.5],
]

/** Processing time (minutes) of 40 jobs, sorted; lognormal, median about 12 (numpy seed 3). */
export const TIMES = [
  2.9, 3.3, 4.4, 5.2, 7.1, 7.4, 7.7, 7.8, 8.6, 9.0, 9.3, 9.6, 9.9, 10.1, 10.4, 10.4, 10.5, 10.6, 10.7,
  10.7, 10.8, 10.9, 11.0, 12.1, 12.6, 13.4, 14.8, 15.3, 15.7, 15.8, 16.0, 16.8, 18.7, 19.4, 19.8, 20.0,
  26.0, 31.6, 33.3, 63.2,
]

/**
 * Defect rate (%) of each of 12 batches on each of 10 days: 7 + day effect (sd 2) + batch noise (sd 1),
 * numpy seed 4. Days differ (3.8% to 10.25% on average), so batches from one day are alike.
 */
export const BATCH_RATES = [
  [5.93, 7.27, 6.01, 6.21, 4.2, 7.95, 3.78, 6.8, 5.37, 4.82, 5.04, 5.02],
  [7.03, 6.54, 8.13, 4.82, 6.65, 5.76, 7.43, 4.53, 6.31, 6.86, 5.17, 7.64],
  [10.51, 11.33, 11.29, 9.35, 9.53, 10.12, 11.08, 11.18, 9.62, 9.72, 9.53, 9.74],
  [8.08, 8.19, 10.38, 7.81, 8.03, 8.78, 7.37, 7.95, 8.33, 9.09, 7.0, 9.69],
  [3.36, 3.89, 4.56, 4.38, 4.78, 3.89, 3.7, 4.03, 2.72, 4.93, 2.94, 2.46],
  [9.05, 6.85, 5.81, 8.84, 6.66, 8.05, 6.16, 6.74, 5.3, 5.08, 6.01, 6.91],
  [6.55, 8.18, 4.72, 6.76, 5.15, 5.6, 4.27, 4.27, 4.97, 4.56, 5.75, 5.05],
  [8.55, 7.45, 7.46, 8.43, 7.82, 7.26, 7.21, 7.18, 8.37, 8.08, 7.66, 8.1],
  [3.24, 4.29, 2.37, 5.13, 3.87, 3.97, 4.38, 3.77, 3.53, 4.97, 3.9, 2.87],
  [7.92, 5.78, 9.14, 7.31, 7.53, 9.74, 9.64, 7.6, 8.11, 8.57, 9.17, 7.35],
]

/**
 * Defects by setting and product over one month: setting B has the lower rate for chairs AND for
 * tables, yet the higher rate overall, because B ran mostly tables (the harder product).
 */
export const SETTINGS = {
  A: { chairs: { n: 300, defects: 30 }, tables: { n: 100, defects: 30 } },
  B: { chairs: { n: 100, defects: 8 }, tables: { n: 300, defects: 75 } },
}

/** Defective chairs in each of 12 weeks, 500 inspected per week; supplier changed in week 7 (seed 8). */
export const WEEKLY_DEFECTS = [34, 35, 29, 33, 38, 37, 59, 50, 56, 48, 55, 48]
export const WEEKLY_N = 500

/**
 * Defect types among the quarter's 420 defective chairs (an item can have several): seat 150, joint 180,
 * finish 180; seat∩joint 40, seat∩finish 30, joint∩finish 35, all three 15. Inclusion–exclusion gives 420.
 */
export const DEFECT_TYPES = { S: 150, J: 180, F: 180, SJ: 40, SF: 30, JF: 35, SJF: 15 }

/** A batch of 20 chairs, 3 of them defective: the urn for chapters 2 and 3. */
export const BATCH20 = { n: 20, defective: 3 }

/**
 * The quick visual check at the end of the line: flags 90% of defective chairs (sensitivity) and 5% of
 * good ones (false-positive rate), against a 7% defect rate.
 */
export const SCREEN = { prevalence: 0.07, sensitivity: 0.9, falsePositive: 0.05 }

/** Processing time model: lognormal with median 12 minutes and log-sd 0.5 (as the TIMES data). */
export const TIME_MODEL = { median: 12, sigma: 0.5 }
