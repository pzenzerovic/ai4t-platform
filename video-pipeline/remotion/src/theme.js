// Warm sage + clay palette, ported verbatim from the Claude design handoff
// (scenes-warm.jsx → WARM object). Single source of truth for colors and fonts.

export const WARM = {
  bg: '#F4EFE6',
  ink: '#2A2620',
  muted: '#7A6F62',
  clay: '#D97757',
  sage: '#7A9B76',
  sky:  '#6E8EA8',
  cream: '#FAF6ED',
  sans: '"Inter", -apple-system, system-ui, sans-serif',
  display: '"Fraunces", "Iowan Old Style", Georgia, serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
}

// Typography scale tuned for VIDEO viewing (not PPT/web).
// All values are px in the 1920×1080 design canvas — rendered at 4K via
// the `zoom: 2` trick in Lesson01.jsx / Lesson02.jsx.
//
// Sizing rationale:
//   - body min 28 — readable on a phone held at arm's length
//   - kicker min 22 — labels readable within ~1s glance
//   - headlines stay strong but not larger than necessary
//   - hero/closing untouched (already video-appropriate)
//
// Reference: TED-Ed (32px body minimum), Khan Academy (28px body min),
// "1/40th of frame height" rule = 27px @ 1080p as absolute floor.
// Reference points (1080p):
//   TED-Ed body         ≈ 48-60
//   3Blue1Brown body    ≈ 40-50
//   Veritasium callouts ≈ 40-50
//   "1/30th frame"      ≈ 36 (recommended floor for educational video)
export const TYPE = {
  // Mono — uppercase section labels and numeric markers
  kicker:        32,   // section labels like "CHAPTER ONE"
  monoSmall:     26,   // numerical markers like "01" inside cards
  monoLabel:     24,   // small uppercase labels like "INTERFACE" / "WEAK PROMPT"

  // Sans body
  caption:       38,   // small descriptive text under headings or in cards
  body:          40,   // primary body text in cards
  bodyLarge:     44,   // emphasised body text
  pill:          44,   // text inside pill chips

  // Display — Fraunces titles
  cardLabel:     40,   // card meta text (italic context lines, small bullets)
  cardTitle:     56,   // card heading (e.g. "Pattern recognition")
  cardTitleLg:   72,   // larger card title (e.g. "Chatbot", "LLM")
  myth:          50,   // italic myth quote in the strike-through scene
  headline:      90,   // standard scene headline
  headlineSm:    80,   // smaller headline when subtitle present
  callout:       64,   // italic emphasis taglines
  hero:          200,  // lesson opener title (~17-char titles)
  closing:       150,  // closing scene huge line
}
