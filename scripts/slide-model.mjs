// The slide-height model, shared by check-content.mjs (the 1000px ceiling) and density.mjs (the
// 865px floor). One copy, so the ceiling and the floor are always measured the same way.
//
// Landscape design metrics, read off index.css (.stage--section .slide-panel__scaler).
// Lowered from the 1100 the sibling repos carry. 1100 is the ceiling at a true 16:9 frame; every
// `storage` slide modelled between 1021 and 1096, passed this guard, and then clipped its last line
// in a review window whose viewport was shorter than 16:9 (browser chrome eats ~190px of an already
// short laptop screen, so a 1600×990 window renders at about 0.53 rather than 0.5625). Authoring to
// 1000 costs two bullets a slide and makes the frame safe to review anywhere. The `models` course,
// authored before this was found, sits at 753–904 and renders correctly in every window tried.
export const SLIDE_H_MAX = 1000
const PANE = 806, PAD_X = 60, FS = 26
const TEXT_W = PANE - PAD_X * 2 // 686
const LI_W = TEXT_W - 30 // li has padding-left: 30
// An ORDERED list indents further than a bulleted one — the number sits in its own gutter, so the
// text column is ~43px narrower. Measured off a rendered runbook slide whose numbered command list
// wrapped a line more than the model predicted, and clipped.
const LI_W_OL = TEXT_W - 73
const BODY_LH = FS * 1.45
const H2_H = FS * 1.73 * 1.15
const H3_H = FS * 1.2 * 1.2
const CPX = 12.4 // px per character at 26px IBM Plex Sans (measured off a rendered slide)

/** Wrapped line count for one markdown block at the given column width. */
function textLines(text, widthPx) {
  // **bold** is ~10% wider at weight 700 — pad it so a bold-heavy line wraps when it really does.
  const padded = text.replace(/\*\*(.+?)\*\*/g, (_, b) => b + 'x'.repeat(Math.ceil(b.length * 0.1)))
  // `inline code` renders as a monospace CHIP: horizontal padding either side, and a wider glyph
  // than the body face. Counting the bare characters underestimated a chip-heavy slide badly enough
  // to pass a runbook slide that clipped its last line on screen — a numbered list of commands is
  // almost all chips. Two characters of allowance per chip is calibrated against the slides that
  // DID render correctly — three flagged several that were verified fine on screen.
  const chipped = padded.replace(/`([^`]+)`/g, (_, c) => c + 'xx')
  const clean = chipped.replace(/[*`_]/g, '')
  const cpl = Math.floor(widthPx / CPX)
  let n = 1
  let cur = 0
  for (const w of clean.split(/\s+/)) {
    const add = w.length + (cur ? 1 : 0)
    if (cur + add > cpl && cur) {
      n++
      cur = w.length
    } else cur += add
  }
  return n
}

/** Modelled rendered height of a slide, in design px. Adjacent CSS margins COLLAPSE to their max. */
export function slideHeight(md) {
  const blocks = []
  let ul = null
  const closeUl = () => {
    if (ul) {
      blocks.push({ mt: 0, h: ul.lines * BODY_LH + (ul.items - 1) * 14, mb: 18 })
      ul = null
    }
  }
  for (const raw of md.split('\n')) {
    const l = raw.trim()
    if (!l) continue
    if (l.startsWith('## ')) {
      closeUl()
      blocks.push({ mt: 0, h: H2_H, mb: 20 })
    } else if (l.startsWith('### ')) {
      closeUl()
      blocks.push({ mt: 30, h: H3_H, mb: 12 })
    } else if (/^([-*]|\d+\.)\s/.test(l)) {
      ul ??= { lines: 0, items: 0 }
      ul.items++
      ul.lines += textLines(l.replace(/^([-*]|\d+\.)\s/, ''), /^\d/.test(l) ? LI_W_OL : LI_W)
    } else {
      closeUl()
      blocks.push({ mt: 0, h: textLines(l, TEXT_W) * BODY_LH, mb: 16 })
    }
  }
  closeUl()
  let h = 0
  let prevMb = 0
  blocks.forEach((b, i) => {
    h += (i === 0 ? 0 : Math.max(prevMb, b.mt)) + b.h
    prevMb = b.mb
  })
  return Math.round(h) // CSS zeroes the last child's margin-bottom
}
