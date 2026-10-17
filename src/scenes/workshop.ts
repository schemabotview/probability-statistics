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

/** Seat height of a chair: normal, mean 450 mm, sd 3.9 mm (the spread across chairs, chapter 1). Spec 444–456. */
export const SEAT = { mean: 450, sd: 3.9, lower: 444, upper: 456 }

/** Minutes between machine stoppages: exponential with mean 40. */
export const STOPPAGE_MEAN = 40

/** Surface flaws per panel: Poisson with mean 1.5. */
export const FLAWS_PER_PANEL = 1.5

/** Repair cost per chair (£): 0 for the 93% that pass, else lognormal with median £25, log-sd 0.6. */
export const REPAIR = { pZero: 0.93, median: 25, sigma: 0.6 }

/**
 * 200 jobs: cutting time X (minutes, lognormal median 5, log-sd 0.4) and total processing time Y = X +
 * finishing time (lognormal median 7, log-sd 0.4, independent of X), numpy seed 10, rounded to 0.01.
 * Y ≥ X always: the joint support is the region above the line y = x.
 */
export const JOB_CUT = [
  3.22, 3.74, 3.66, 5.56, 4.53, 5.26, 7.01, 7.05, 6.05, 4.18, 3.7, 3.61, 4.36, 4.9, 3.39, 3.18,
  5.65, 2.38, 4.66, 5.93, 3.37, 3.2, 3.69, 6.48, 4.75, 2.37, 4.22, 7.5, 7.41, 6.43, 4.55, 2.39,
  5.35, 4.66, 5.16, 9.27, 5.38, 5.58, 6.37, 4.51, 3.83, 3.72, 6.8, 6.12, 4.11, 7.93, 5.38, 2.93,
  6.37, 4.73, 2.94, 6.14, 4.36, 4.27, 6.33, 2.08, 3, 4.22, 5.52, 3.83, 3.36, 3.28, 4.77, 6.55, 2.8,
  2.18, 4.44, 4.29, 3.48, 6.39, 6.9, 3.99, 4.36, 6.28, 4.21, 2.85, 4.87, 3.48, 5.69, 4.09, 4.64,
  6.15, 4.76, 3.88, 3.34, 9.95, 7.78, 2.74, 3.28, 6.32, 3.95, 5.03, 6.92, 5.26, 4.75, 4.14, 4.83,
  5.84, 10.01, 7.66, 4.62, 7.21, 5.24, 2.76, 4.79, 7.44, 3.94, 7.27, 4.42, 5.05, 3.1, 11.44, 5.99,
  7.48, 4.17, 2.78, 8.12, 3.76, 9.68, 4.67, 9.58, 3.74, 2.47, 6.61, 4.87, 4.99, 7.61, 3.51, 2.98,
  3.13, 2.55, 2.43, 2.99, 3.39, 4.16, 3.08, 4.71, 6.7, 4.52, 5.82, 3.41, 5.5, 5.88, 3.75, 2.62,
  4.46, 4.77, 8.42, 4.02, 9.06, 1.81, 4.15, 3.84, 4.01, 3.77, 4.56, 8.89, 4.36, 7.42, 4.46, 4.83,
  1.81, 4.79, 5.88, 2.95, 3.63, 3.3, 10.67, 3.13, 3.47, 1.58, 2.47, 5, 2.78, 1.55, 4.1, 4.78, 5.1,
  5.31, 3.61, 13.86, 3.68, 5.46, 2.78, 3.59, 2.51, 4.99, 3.92, 3.09, 2.08, 5.71, 6.34, 6.39, 4.44,
  6.05, 6.61, 5.65, 8.14, 4.34, 5.03,
]
export const JOB_TOTAL = [
  6.79, 18.63, 8.52, 13, 12.95, 10.03, 13.48, 15.71, 12.41, 10.05, 9.54, 8.62, 10.57, 12.58, 11.35,
  13.44, 12.46, 7.83, 13.98, 13.61, 13.32, 10.42, 11.98, 14.32, 13.72, 6.95, 10.68, 14.73, 20.69,
  12.98, 12.63, 8.67, 8.33, 15.7, 13.98, 20.32, 9.32, 13.12, 13.6, 8.14, 11.94, 9.02, 14.99, 9.62,
  8.87, 13.03, 9.07, 9.83, 17.7, 11.43, 11.6, 18.22, 12.77, 10.1, 9.49, 9.84, 8.93, 9.86, 14.53,
  12.23, 6.99, 10.72, 10.72, 16.04, 9.51, 11.95, 9.65, 10.07, 8.94, 12.69, 13.05, 14.84, 8.95,
  13.28, 8.47, 6.67, 10.22, 7.21, 12.95, 9.15, 10.12, 14.25, 17.3, 9.37, 6.46, 15.74, 14.54, 13.38,
  9.95, 11.11, 13.76, 15.49, 13.24, 12.91, 12.63, 23.19, 10.22, 11.65, 16.6, 16.79, 10.72, 15.63,
  15.07, 17.82, 11.27, 13.53, 9.98, 10.57, 8.74, 12.37, 10.43, 30.7, 17.27, 16.86, 16.54, 8.12,
  13.63, 8.89, 16.16, 20.89, 15.8, 9.09, 9.5, 16.25, 13.24, 14.71, 11.9, 8.42, 9.31, 10.33, 14.47,
  6.63, 11.95, 9.73, 13.02, 8.44, 8.71, 17.82, 12.33, 9.04, 12.59, 10.16, 12.55, 10.66, 6.69, 15.26,
  10.41, 21.69, 12.44, 17.58, 9.54, 19.37, 8.47, 9.11, 9.12, 15.55, 19.46, 11.56, 15.16, 8.07,
  17.41, 8.19, 12.1, 12.06, 11.99, 10.03, 10.61, 17.9, 8.83, 8.94, 9.74, 10.61, 14.36, 15.24, 5.82,
  7.45, 10.72, 16.71, 12.17, 6.99, 27.06, 12.22, 9.31, 7.8, 10.86, 8.11, 11.61, 12.52, 10.1, 14.27,
  12.19, 19.02, 11.93, 8.83, 9.08, 11.56, 12.9, 18.39, 6.11, 11.9,
]

/** Product × defect status for 1000 items (counts): rows chair, table, stool; columns none, minor, major. */
export const PRODUCT_DEFECT = [
  [555, 33, 12],
  [255, 30, 15],
  [96, 3, 1],
]
export const PRODUCTS = ['chair', 'table', 'stool']
export const DEFECT_STATUS = ['none', 'minor', 'major']
/** Repair cost by defect status (£): none 0, minor 8, major 40. */
export const STATUS_COST = [0, 8, 40]
