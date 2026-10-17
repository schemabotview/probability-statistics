// Density report — the floor that `npm run check` does not guard. check fails a slide that clips;
// nothing fails a frame that builds green and leaves half its pane empty. This measures both panes
// of every section against the targets in CLAUDE.md:
//
//   slide (modelled)   slideHeight() from slide-model.mjs, the same model check uses   865–1000
//   slide (measured)   rendered .slide-panel__scaler height ÷ .slide-panel height       0.80–0.95
//   scene, binding     union of .react-flow__node rects ÷ .scene-area, larger ratio      ≥ 0.85
//   scene, area        (union w × h) ÷ (pane w × h)                                     ≥ 0.55
//   eyebrow            .reel-head__eyebrow rect ∩ any node rect                          none
//
// Targets, not thresholds: a deliberately sparse board can sit under them. So this is a REPORT, and
// only an eyebrow overlap (a node drawn under the label, which is never intended) exits non-zero.
// The model is conservative: it over-reserves height, by up to ~75px on a slide of em-dash bullets.
// So the floor is judged on the measured ratio and the model column is shown for the ceiling.
//
// Screenshots of every route land in density/ (gitignored), so a review can be done from images.
//
// Run: npm run density [course ...]     CHROME_PATH=/path/to/chrome to override puppeteer's browser
import { mkdirSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import puppeteer from 'puppeteer'
import { createServer } from 'vite'
import { slideHeight } from './slide-model.mjs'

const FLOOR = 865
const CEIL = 1000
const BIND_MIN = 0.85
const AREA_MIN = 0.55
const SLIDE_RATIO = [0.8, 0.95]

// The modelled height, keyed by `<course>-<section>` — read from source exactly as check does.
const modelled = new Map()
const courses = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync('src/content', { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
for (const course of courses) {
  for (const f of readdirSync(join('src/content', course))) {
    const src = readFileSync(join('src/content', course, f), 'utf8')
    const id = (src.match(/\bid: '([\w-]+)',/) || [])[1]
    const m = src.match(/slide: `([\s\S]*?)`,\n  narration/)
    if (id && m) modelled.set(`${course}-${id}`, slideHeight(m[1].replace(/\\`/g, '`')))
  }
}

const server = await createServer({ logLevel: 'silent', server: { port: 5199, strictPort: false } })
await server.listen()
const base = server.resolvedUrls.local[0]
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH,
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })
mkdirSync('density', { recursive: true })

const settle = () => new Promise((r) => setTimeout(r, 1200)) // fitView + font load
const rows = []
let overlaps = 0

for (const course of courses) {
  await page.goto(`${base}?capture=1#/${course}`, { waitUntil: 'networkidle0' })
  await settle()
  const plan = await page.evaluate(() => window.__scene?.plan() ?? [])
  for (const { slug } of plan) {
    await page.evaluate((s) => (location.hash = `#/${s}`), slug)
    await settle()
    const m = await page.evaluate(() => {
      const rect = (el) => el?.getBoundingClientRect()
      const pane = rect(document.querySelector('.scene-area'))
      const nodes = [...document.querySelectorAll('.scene-area .react-flow__node')].map(rect)
      const brow = rect(document.querySelector('.reel-head__eyebrow'))
      const panel = rect(document.querySelector('.slide-panel'))
      const scaler = rect(document.querySelector('.slide-panel__scaler'))
      if (!pane || !nodes.length) return null
      const u = {
        l: Math.min(...nodes.map((n) => n.left)),
        t: Math.min(...nodes.map((n) => n.top)),
        r: Math.max(...nodes.map((n) => n.right)),
        b: Math.max(...nodes.map((n) => n.bottom)),
      }
      const hit = (a, b) => a && a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom
      return {
        wr: (u.r - u.l) / pane.width,
        hr: (u.b - u.t) / pane.height,
        overlap: nodes.some((n) => hit(brow, n)),
        slide: scaler && panel ? scaler.height / panel.height : null,
      }
    })
    await page.screenshot({ path: `density/${slug}.png` })
    if (!m) {
      rows.push({ slug, note: 'no scene rendered' })
      continue
    }
    const model = modelled.get(slug)
    const flags = []
    // The floor is judged on the RENDERED height. The model over-reserves (the template's first demo
    // slide models at 739 and renders at 663), which is the right error for a ceiling and the wrong
    // one for a floor. The model only falls back in when nothing was measured.
    if (m.slide != null ? m.slide < SLIDE_RATIO[0] : model != null && model < FLOOR) flags.push('slide thin')
    if (m.slide != null && m.slide > SLIDE_RATIO[1]) flags.push('slide tight')
    if (model != null && model > CEIL) flags.push('slide over (check fails)')
    if (Math.max(m.wr, m.hr) < BIND_MIN) flags.push('scene floats')
    if (m.wr * m.hr < AREA_MIN) flags.push('scene area low')
    if (m.overlap) {
      flags.push('EYEBROW OVERLAP')
      overlaps++
    }
    rows.push({
      slug,
      model: model ?? '—',
      measured: m.slide == null ? '—' : m.slide.toFixed(2),
      bind: Math.max(m.wr, m.hr).toFixed(2),
      area: (m.wr * m.hr).toFixed(2),
      flags: flags.join(', ') || 'ok',
    })
  }
}

await browser.close()
await server.close()

const cols = ['slug', 'model', 'measured', 'bind', 'area', 'flags']
const w = cols.map((c) => Math.max(c.length, ...rows.map((r) => String(r[c] ?? r.note ?? '').length)))
const line = (r) => cols.map((c, i) => String(r[c] ?? (c === 'flags' ? r.note : '')).padEnd(w[i])).join('  ')
console.log(line(Object.fromEntries(cols.map((c) => [c, c]))))
for (const r of rows) console.log(line(r))
console.log(`\ntargets: slide ${FLOOR}–${CEIL} modelled, ${SLIDE_RATIO.join('–')} measured; scene bind ≥ ${BIND_MIN}, area ≥ ${AREA_MIN}`)
console.log('screenshots: density/<slug>.png')
if (overlaps) process.exit(1)
