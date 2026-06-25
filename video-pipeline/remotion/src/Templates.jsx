// Reusable scene templates for AI4T lesson videos.
//
// Each template is a parameterized component — pass props for content + accent
// color, and the same motion/typography/layout patterns apply.
//
// LIBRARY GROWS ORGANICALLY: when a new lesson needs a visual pattern that none
// of these handle (e.g. timeline, process flow, stat callout), add a new
// template here. Don't over-design upfront — let the patterns prove themselves
// by appearing in 2+ lessons before being abstracted further.

import { useCurrentFrame, useVideoConfig } from 'remotion'
import { WARM as W, TYPE } from './theme.js'
import { Easing, clamp } from './helpers.js'

// ─── shared primitives ──────────────────────────────────

const useLocal = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  return frame / fps
}

const Blob = ({ cx, cy, r, color, opacity = 0.9, style }) => (
  <div style={{
    position: 'absolute', left: cx - r, top: cy - r,
    width: r * 2, height: r * 2, borderRadius: '50%',
    background: color, opacity, ...style,
  }} />
)

const Kicker = ({ text, color = W.clay, t = 1 }) => (
  <div style={{
    position: 'absolute', left: 160, top: 120,
    fontFamily: W.mono, fontSize: TYPE.kicker, letterSpacing: '0.2em',
    color, opacity: t, fontWeight: 500,
  }}>{text}</div>
)

const Headline = ({ children, t = 1, size = TYPE.headline }) => (
  <div style={{
    position: 'absolute', left: 160, right: 160, top: 200,
    fontFamily: W.display, fontSize: size, color: W.ink,
    letterSpacing: '-0.02em', lineHeight: 1.1, fontWeight: 500,
    opacity: t,
  }}>{children}</div>
)

// ─── TEMPLATE: TitleScene ───────────────────────────────
// Big title with two background blobs growing in from corners.
// Used by lesson openers.
//
// Auto-shrinks the hero font based on title char count so long titles stay on
// one line, and recomputes subtitle/kicker positions accordingly — fixes the
// "title overlaps subtitle at 0:03" bug previously reported on 15 lessons.
//
// Decorative blobs are anchored deep in the corners (small radius) so they
// never overlap the centered title text — fixes the "orange italic letter on
// orange blob" contrast bug (C2L08, C3L05-08). The italic emphasis word now
// uses sage instead of clay for the same reason.
export const TitleScene = ({ title, subtitle, kicker, accentLeft = W.clay, accentRight = W.sage, italicWord }) => {
  const localTime = useLocal()
  const blob1 = Easing.easeOutCubic(clamp(localTime / 1.2, 0, 1))
  const blob2 = Easing.easeOutCubic(clamp((localTime - 0.4) / 1.2, 0, 1))
  const t = Easing.easeOutCubic(clamp((localTime - 0.8) / 1.2, 0, 1))
  const sub = clamp((localTime - 2.2) / 1, 0, 1)

  // Heuristic: pick a hero size that keeps the title to one line (≈1700px
  // usable width, Fraunces avg char width ≈ 0.55× fontSize).
  const len = title.length
  const heroSize = len <= 15 ? 200 : len <= 19 ? 170 : len <= 25 ? 140 : len <= 32 ? 115 : 95
  const lineH = 0.95
  // Assume single-line for all but extreme cases. Conservative buffer below.
  const titleBlock = heroSize * lineH * 1.0
  const titleTop = 290
  const subtitleTop = Math.round(titleTop + titleBlock + 50)
  const kickerTop = subtitle ? subtitleTop + 110 : Math.round(titleTop + titleBlock + 90)

  // Italic emphasis word — sage by default so it doesn't blend into the clay
  // corner blob (and vice versa). Stays italic regardless. Highlights EVERY
  // occurrence — the previous single-split version silently dropped text after
  // a second occurrence (eg "Right tool. Right student." with italicWord
  // "Right" rendered only as "Right tool.").
  const italicColor = accentLeft === W.clay ? W.sage : W.clay
  const renderTitle = () => {
    if (!italicWord) return title
    const parts = title.split(italicWord)
    return parts.flatMap((p, i) => (
      i < parts.length - 1
        ? [p, <span key={i} style={{ fontStyle: 'italic', color: italicColor }}>{italicWord}</span>]
        : [p]
    ))
  }

  return (
    <>
      {/* Blobs pushed deep into corners — out of the title text rectangle */}
      <Blob cx={200} cy={190} r={blob1 * 150} color={accentLeft} opacity={0.85} />
      <Blob cx={1720} cy={890} r={blob2 * 170} color={accentRight} opacity={0.8} />
      <div style={{
        position: 'absolute', left: 80, right: 80, top: titleTop, textAlign: 'center',
        fontFamily: W.display, fontSize: heroSize, fontWeight: 500, color: W.ink,
        letterSpacing: '-0.04em', lineHeight: lineH,
        opacity: t, transform: `translateY(${(1 - t) * 30}px)`,
      }}>{renderTitle()}</div>
      {subtitle && (
        <div style={{
          position: 'absolute', left: 120, right: 120, top: subtitleTop, textAlign: 'center',
          fontFamily: W.sans, fontSize: 40, color: W.muted, fontWeight: 400, lineHeight: 1.3,
          opacity: sub, transform: `translateY(${(1 - sub) * 16}px)`,
        }}>{subtitle}</div>
      )}
      {kicker && (
        <div style={{
          position: 'absolute', left: '50%', top: kickerTop, transform: 'translateX(-50%)',
          fontFamily: W.mono, fontSize: 28, letterSpacing: '0.25em', color: W.muted,
          opacity: sub * 0.7, fontWeight: 600,
        }}>{kicker}</div>
      )}
    </>
  )
}

// ─── TEMPLATE: BeforeAfterScene ─────────────────────────
// Side-by-side weak vs strong comparison. Two cards slide in: left (weak, clay)
// and right (strong, sage). Optional tagline at the bottom.
//
// Use when contrasting two versions of the same thing (bad prompt vs good
// prompt, vague vs specific, before vs after).
export const BeforeAfterScene = ({ kicker, headline, weak, strong, tagline, accentKicker = W.clay }) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const leftIn = clamp((localTime - 1.2) / 0.7, 0, 1)
  const rightIn = clamp((localTime - 2.4) / 0.7, 0, 1)
  const tag = clamp((localTime - 5.5) / 0.7, 0, 1)
  const leftE = Easing.easeOutBack(leftIn)
  const rightE = Easing.easeOutBack(rightIn)

  return (
    <>
      <Kicker text={kicker} color={accentKicker} t={head} />
      <Headline t={head} size={TYPE.headline}>{headline}</Headline>

      {/* Auto-shrink body fonts when prompts are long so cards don't push the
         tagline off-screen. */}
      {(() => {
        const weakSize  = weak.length  > 100 ? 36 : 44
        const strongSize = strong.length > 100 ? 32 : strong.length > 60 ? 36 : 40
        return (
          <>
            {/* WEAK card — clay, left */}
            <div style={{
              position: 'absolute', left: 160, top: 380, width: 760, maxHeight: 600,
              background: W.clay, color: W.cream, borderRadius: 28, padding: '36px 44px',
              boxShadow: '0 8px 24px rgba(42,38,32,0.14)', overflow: 'hidden',
              opacity: leftIn, transform: `translateY(${(1 - leftE) * 30}px) scale(${0.94 + 0.06 * leftE})`,
            }}>
              <div style={{ fontFamily: W.mono, fontSize: TYPE.monoLabel, letterSpacing: '0.25em', opacity: 0.75, marginBottom: 16, fontWeight: 600 }}>WEAK PROMPT</div>
              <div style={{ fontFamily: W.display, fontSize: weakSize, fontStyle: 'italic', lineHeight: 1.25 }}>
                “{weak}”
              </div>
            </div>

            {/* STRONG card — sage, right */}
            <div style={{
              position: 'absolute', left: 1000, top: 380, width: 760, maxHeight: 600,
              background: W.sage, color: W.cream, borderRadius: 28, padding: '36px 44px',
              boxShadow: '0 8px 24px rgba(42,38,32,0.14)', overflow: 'hidden',
              opacity: rightIn, transform: `translateY(${(1 - rightE) * 30}px) scale(${0.94 + 0.06 * rightE})`,
            }}>
              <div style={{ fontFamily: W.mono, fontSize: TYPE.monoLabel, letterSpacing: '0.25em', opacity: 0.75, marginBottom: 16, fontWeight: 600 }}>STRONG PROMPT</div>
              <div style={{ fontFamily: W.display, fontSize: strongSize, fontStyle: 'italic', lineHeight: 1.3 }}>
                “{strong}”
              </div>
            </div>
          </>
        )
      })()}

      {tagline && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 28, textAlign: 'center',
          fontFamily: W.display, fontSize: 40, fontStyle: 'italic', color: W.muted,
          opacity: tag, transform: `translateY(${(1 - Easing.easeOutCubic(tag)) * 12}px)`,
        }}>{tagline}</div>
      )}
    </>
  )
}

// ─── TEMPLATE: NumberedPillsScene ───────────────────────
// Cloud of numbered pills appearing in sequence. Each pill has 01/02/...
// prefix in mono and a label in sans.
//
// Use when introducing a numbered list of concepts that will be expanded later.
export const NumberedPillsScene = ({ kicker, headline, items, accentKicker = W.clay }) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)

  const cols = [W.clay, W.sage, W.sky]

  return (
    <>
      <Kicker text={kicker} color={accentKicker} t={head} />
      <Headline t={head} size={TYPE.headlineSm}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 160, right: 160, top: 440,
        display: 'flex', flexWrap: 'wrap', gap: 22,
      }}>
        {items.map((label, i) => {
          const t = clamp((localTime - 1.5 - i * 0.4) / 0.5, 0, 1)
          const e = Easing.easeOutBack(t)
          const color = cols[i % cols.length]
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 18,
              background: W.cream, padding: '24px 36px', borderRadius: 999,
              border: `3px solid ${color}`,
              opacity: t, transform: `scale(${0.6 + 0.4 * e})`,
            }}>
              <span style={{
                fontFamily: W.mono, fontSize: TYPE.monoSmall, letterSpacing: '0.15em',
                color, fontWeight: 600,
              }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{
                fontFamily: W.sans, fontSize: TYPE.pill, fontWeight: 500, color: W.ink,
              }}>{label}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

// ─── TEMPLATE: DefinitionScene ──────────────────────────
// Bold definition statement + optional 3-step flow visualization at the
// bottom. Used to introduce a core concept clearly.
export const DefinitionScene = ({ kicker, headline, italicTerm, flow, tagline, accentKicker = W.clay }) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const flowIn = clamp((localTime - 2.5) / 0.8, 0, 1)
  const tag = clamp((localTime - 5) / 0.8, 0, 1)

  const renderHeadline = () => {
    if (!italicTerm) return headline
    const parts = headline.split(italicTerm)
    return parts.flatMap((p, i) => (
      i < parts.length - 1
        ? [p, <span key={i} style={{ fontStyle: 'italic', color: W.clay }}>{italicTerm}</span>]
        : [p]
    ))
  }

  return (
    <>
      <Kicker text={kicker} color={accentKicker} t={head} />
      <Headline t={head} size={TYPE.headline}>{renderHeadline()}</Headline>

      {flow && (
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 560,
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 48,
          opacity: flowIn, transform: `translateY(${(1 - Easing.easeOutCubic(flowIn)) * 20}px)`,
        }}>
          {flow.map((item, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
              <div style={{
                background: W.cream, border: `3px solid ${i === 1 ? W.clay : W.ink + '20'}`,
                borderRadius: 24, padding: '30px 48px',
                fontFamily: W.display, fontSize: 64, fontWeight: 500,
                color: i === 1 ? W.clay : W.ink,
                minWidth: 280, textAlign: 'center',
              }}>{item}</div>
              {i < flow.length - 1 && (
                <span style={{ fontFamily: W.display, fontSize: 72, color: W.muted }}>→</span>
              )}
            </span>
          ))}
        </div>
      )}

      {tagline && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 100, textAlign: 'center',
          fontFamily: W.display, fontSize: TYPE.callout, fontStyle: 'italic', color: W.ink,
          opacity: tag, transform: `translateY(${(1 - Easing.easeOutCubic(tag)) * 16}px)`,
        }}>{tagline}</div>
      )}
    </>
  )
}

// ─── TEMPLATE: AnnotatedPromptScene ─────────────────────
// One labeled row per principle segment. Each row has a fixed-width mono
// label on the left and the prompt-text on the right with a colored
// highlight bar. Rows fade in sequentially.
//
// Used to demonstrate how multiple principles combine in a single prompt
// without the inline-label-collision problem caused by wrapping prose.
export const AnnotatedPromptScene = ({ kicker, headline, segments, accentKicker = W.clay }) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)

  return (
    <>
      <Kicker text={kicker} color={accentKicker} t={head} />
      <Headline t={head} size={TYPE.headline}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 160, right: 160, top: 400,
        background: W.cream, borderRadius: 28, padding: '40px 52px',
        boxShadow: '0 8px 24px rgba(42,38,32,0.08)',
      }}>
        {segments.map((seg, i) => {
          const t = clamp((localTime - 1.0 - i * 0.55) / 0.5, 0, 1)
          const e = Easing.easeOutCubic(t)
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 36,
              padding: '14px 0',
              borderBottom: i < segments.length - 1 ? `1px solid ${W.ink}10` : 'none',
              opacity: t, transform: `translateY(${(1 - e) * 12}px)`,
            }}>
              {/* Label column — fixed width */}
              <div style={{
                width: 260, flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: 16,
                paddingTop: 6,
              }}>
                <div style={{
                  width: 10, height: 32, borderRadius: 5,
                  background: seg.color, flexShrink: 0,
                }} />
                <div style={{
                  fontFamily: W.mono, fontSize: 26, letterSpacing: '0.2em',
                  color: seg.color, fontWeight: 600,
                }}>{seg.label}</div>
              </div>
              {/* Text column — fluid */}
              <div style={{
                flex: 1,
                fontFamily: W.display, fontSize: 40, lineHeight: 1.35, color: W.ink,
              }}>{seg.text}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

// ─── TEMPLATE: CycleStepsScene ──────────────────────────
// 4 cards arranged in a circular / cyclic loop with curved arrows between
// them. Used to show iterative processes (prompt → response → adjust → repeat).
export const CycleStepsScene = ({ kicker, headline, steps, tagline, accentKicker = W.sage }) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const tag = clamp((localTime - 5.5) / 0.7, 0, 1)

  // 4 positions roughly around a center: top, right, bottom, left.
  // Tightened vertically so the larger card font sizes don't push the bottom
  // card into the tagline area near `bottom: 60`.
  const positions = [
    { x: 760, y: 360 },   // top
    { x: 1200, y: 540 },  // right
    { x: 760, y: 720 },   // bottom
    { x: 320, y: 540 },   // left
  ]

  return (
    <>
      <Kicker text={kicker} color={accentKicker} t={head} />
      <Headline t={head} size={TYPE.headline}>{headline}</Headline>

      {steps.map((s, i) => {
        const t = clamp((localTime - 1.2 - i * 0.6) / 0.5, 0, 1)
        const e = Easing.easeOutBack(t)
        const pos = positions[i % positions.length]
        return (
          <div key={i} style={{
            position: 'absolute', left: pos.x, top: pos.y, width: 420, minHeight: 170,
            background: W.sage, color: W.cream, borderRadius: 24, padding: '28px 36px',
            boxShadow: '0 8px 24px rgba(42,38,32,0.12)',
            opacity: t, transform: `scale(${0.7 + 0.3 * e})`,
          }}>
            <div style={{ fontFamily: W.mono, fontSize: TYPE.monoSmall, letterSpacing: '0.2em', opacity: 0.8, marginBottom: 12, fontWeight: 600 }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{ fontFamily: W.display, fontSize: TYPE.cardTitle, fontWeight: 500, lineHeight: 1.15 }}>{s.title}</div>
            {s.sub && (
              <div style={{ fontFamily: W.sans, fontSize: 30, marginTop: 10, opacity: 0.9 }}>{s.sub}</div>
            )}
          </div>
        )
      })}

      {/* central circular arrow hint — sits between the 4 cards */}
      <div style={{
        position: 'absolute', left: 880, top: 540, width: 160, height: 160,
        opacity: clamp((localTime - 3.5) / 0.8, 0, 1),
      }}>
        <svg width="160" height="160" viewBox="0 0 160 160">
          <path
            d="M 80 20 A 60 60 0 1 1 20 80"
            stroke={W.clay} strokeWidth="6" fill="none" strokeLinecap="round"
            opacity="0.55"
          />
          <polygon points="12,78 32,70 28,90" fill={W.clay} opacity="0.7" />
        </svg>
      </div>

      {tagline && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 24, textAlign: 'center',
          fontFamily: W.display, fontSize: TYPE.callout, fontStyle: 'italic', color: W.ink,
          opacity: tag,
        }}>{tagline}</div>
      )}
    </>
  )
}

// ─── TEMPLATE: EqualityScene ────────────────────────────
// Two cards side-by-side with a big "=" between them. Used to show that two
// concepts are the same thing under different labels (e.g. assignment brief =
// prompt).
export const EqualityScene = ({ kicker, headline, left, right, tagline, accentKicker = W.clay }) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const leftIn = clamp((localTime - 1.2) / 0.7, 0, 1)
  const equalIn = clamp((localTime - 2.6) / 0.6, 0, 1)
  const rightIn = clamp((localTime - 3.4) / 0.7, 0, 1)
  const tag = clamp((localTime - 6) / 0.7, 0, 1)
  const leftE = Easing.easeOutBack(leftIn)
  const rightE = Easing.easeOutBack(rightIn)

  const Item = ({ data, t, e, color }) => (
    <div style={{
      width: 720, minHeight: 420,
      background: W.cream, borderRadius: 28, padding: '40px 48px',
      border: `3px solid ${color}`,
      opacity: t, transform: `translateY(${(1 - e) * 30}px) scale(${0.94 + 0.06 * e})`,
    }}>
      <div style={{ fontFamily: W.mono, fontSize: TYPE.monoLabel, letterSpacing: '0.25em', color, fontWeight: 600, marginBottom: 20 }}>
        {data.label}
      </div>
      <div style={{ fontFamily: W.display, fontSize: TYPE.cardTitle, fontWeight: 500, color: W.ink, marginBottom: 22 }}>
        {data.title}
      </div>
      <ul style={{
        fontFamily: W.sans, fontSize: 36, color: W.muted, lineHeight: 1.55,
        listStyle: 'none', padding: 0, margin: 0,
      }}>
        {data.bullets.map((b, i) => (
          <li key={i} style={{ marginBottom: 8 }}>· {b}</li>
        ))}
      </ul>
    </div>
  )

  return (
    <>
      <Kicker text={kicker} color={accentKicker} t={head} />
      <Headline t={head} size={TYPE.headlineSm}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 0, right: 0, top: 400,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32,
      }}>
        <Item data={left} t={leftIn} e={leftE} color={W.clay} />
        <div style={{
          fontFamily: W.display, fontSize: 130, color: W.muted, fontWeight: 500,
          opacity: equalIn, transform: `scale(${0.6 + 0.4 * Easing.easeOutBack(equalIn)})`,
        }}>=</div>
        <Item data={right} t={rightIn} e={rightE} color={W.sage} />
      </div>

      {tagline && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 80, textAlign: 'center',
          fontFamily: W.display, fontSize: TYPE.callout, fontStyle: 'italic', color: W.ink,
          opacity: tag, transform: `translateY(${(1 - Easing.easeOutCubic(tag)) * 14}px)`,
        }}>{tagline}</div>
      )}
    </>
  )
}

// ─── TEMPLATE: ClosingScene ─────────────────────────────
// Single big italic-highlighted phrase + mono "next lesson" hint.
// Used at the end of every lesson video.
export const ClosingScene = ({ tagline, italicWord, kicker, accent = W.clay }) => {
  const localTime = useLocal()
  const progress = clamp(localTime / 1.5, 0, 1)
  const t = Easing.easeOutCubic(progress)

  const renderTagline = () => {
    if (!italicWord) return tagline
    const parts = tagline.split(italicWord)
    return parts.flatMap((p, i) => (
      i < parts.length - 1
        ? [p, <span key={i} style={{ fontStyle: 'italic', color: accent }}>{italicWord}</span>]
        : [p]
    ))
  }

  return (
    <>
      <Blob cx={960} cy={540} r={t * 380} color={accent} opacity={0.15} />
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 30,
      }}>
        <div style={{
          fontFamily: W.display, fontSize: TYPE.closing, color: W.ink,
          letterSpacing: '-0.025em', fontWeight: 500, textAlign: 'center',
          opacity: t, transform: `translateY(${(1 - t) * 20}px)`,
        }}>
          {renderTagline()}
        </div>
        {kicker && (
          <div style={{
            fontFamily: W.mono, fontSize: 26, color: W.muted,
            letterSpacing: '0.25em', opacity: t * 0.7, fontWeight: 600,
          }}>{kicker}</div>
        )}
      </div>
    </>
  )
}

// ─── TEMPLATE: CardGridScene ────────────────────────────
// Grid of 2-6 cards, each with a colored swatch, title, and body line.
// Cards stagger in with easeOutBack. Accent color drives swatches and borders.
//
// Use for: capability lists, considerations, characteristics, principles.
export const CardGridScene = ({
  kicker, headline, items,
  columns = 3,
  accent = W.sage,
  accentKicker,
  swatch = true,
}) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const stagger = 0.55

  // Safe-area: grid is now bounded (top→bottom) so cards can never push beyond
  // the visible frame. gridAutoRows: 1fr keeps rows equal-height. Cards that
  // would overflow within their cell are visually clipped by overflow:hidden
  // instead of pushing the next row off-screen (fixes the "odrezan donji dio"
  // bug on C2L07, C2L08, C3L03, C4L01, C4L03, C4L04, C4L07).
  //
  // For dense grids (5+ items) we also drop title/body sizes so the body
  // doesn't crop.
  const count = items.length
  const dense = count >= 5
  const titleSize = dense ? 46 : TYPE.cardTitle
  const bodySize  = dense ? 32 : 38
  const pad       = dense ? '28px 32px' : '36px 40px'
  const swatchMb  = dense ? 18 : 24

  return (
    <>
      <Kicker text={kicker} color={accentKicker || accent} t={head} />
      <Headline t={head} size={TYPE.headline}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 160, right: 160, top: 430, bottom: 60,
        display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridAutoRows: '1fr', gap: 28, alignContent: 'stretch',
      }}>
        {items.map((c, i) => {
          const t = clamp((localTime - 1 - i * stagger) / 0.6, 0, 1)
          const e = Easing.easeOutBack(t)
          return (
            <div key={i} style={{
              background: W.cream, borderRadius: 28, padding: pad,
              opacity: t, transform: `translateY(${(1 - e) * 30}px)`,
              border: `2px solid ${accent}33`,
              overflow: 'hidden', display: 'flex', flexDirection: 'column',
            }}>
              {swatch && (
                <div style={{
                  width: 40, height: 40, borderRadius: 10, background: accent,
                  marginBottom: swatchMb, flexShrink: 0,
                }} />
              )}
              <div style={{
                fontFamily: W.sans, fontSize: titleSize, fontWeight: 600, color: W.ink,
                marginBottom: 12, lineHeight: 1.15,
              }}>{c.title}</div>
              {c.body && (
                <div style={{
                  fontFamily: W.sans, fontSize: bodySize, color: W.muted, lineHeight: 1.35,
                }}>{c.body}</div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

// ─── TEMPLATE: MythBustScene ────────────────────────────
// Up to 3 myths. Each is a clay quote tile with strike-through, paired with a
// cream rebuttal tile to the right. Staggered reveal.
export const MythBustScene = ({ kicker, headline, myths, accentKicker = W.clay }) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const stagger = 5.5

  return (
    <>
      <Blob cx={-100} cy={900} r={340} color={W.sage} opacity={0.18} />
      <Kicker text={kicker} color={accentKicker} t={head} />
      <Headline t={head} size={TYPE.headline}>{headline}</Headline>

      <div style={{ position: 'absolute', left: 160, right: 160, top: 420 }}>
        {myths.map((m, i) => {
          const t = clamp((localTime - 0.8 - i * stagger) / 0.6, 0, 1)
          const e = Easing.easeOutBack(t)
          const stamp = clamp((localTime - 0.8 - i * stagger - 1.5) / 0.5, 0, 1)
          // Auto-shrink myth size for long quotes so the row doesn't overflow.
          const mythSize = m.myth.length > 40 ? 40 : TYPE.myth
          const realitySize = m.reality.length > 80 ? 30 : 36
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'stretch', gap: 24, marginBottom: 20,
              opacity: t, transform: `translateY(${(1 - e) * 20}px)`,
            }}>
              {/* Strike-through via CSS text-decoration so it correctly crosses
                  every line of multi-line myths (the previous absolute-positioned
                  line at top:52% only struck the gap between lines on 2-line
                  quotes — read as an underline in 11 of the rendered videos). */}
              <div style={{
                background: W.clay, color: W.cream, padding: '24px 32px', borderRadius: 24,
                fontFamily: W.display, fontStyle: 'italic', fontSize: mythSize,
                minWidth: 560, lineHeight: 1.2,
                textDecorationLine: 'line-through',
                textDecorationColor: `rgba(250, 246, 237, ${Easing.easeOutQuart(stamp)})`,
                textDecorationStyle: 'solid',
                textDecorationThickness: '6px',
                WebkitTextDecorationLine: 'line-through',
                WebkitTextDecorationColor: `rgba(250, 246, 237, ${Easing.easeOutQuart(stamp)})`,
                WebkitTextDecorationStyle: 'solid',
              }}>
                “{m.myth}”
              </div>
              <div style={{
                flex: 1, background: W.cream, padding: '24px 32px', borderRadius: 24,
                fontFamily: W.sans, fontSize: realitySize, color: W.ink,
                display: 'flex', alignItems: 'center', opacity: stamp, lineHeight: 1.3,
              }}>{m.reality}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

// ─── TEMPLATE: PillCloudScene ───────────────────────────
// Wrapping cloud of pill chips. Colors rotate through clay/sage/sky. Each pill
// pops in with a slight scale. Designed for tool inventories or example lists.
export const PillCloudScene = ({
  kicker, headline, items, accent = W.sage, accentKicker,
  filled = false,        // if true, pill bg = accent; otherwise cream w/ accent border
}) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const palette = [W.clay, W.sage, W.sky]

  // Tighter pills + bigger row gap for 6+ items so neighbours don't dodirnuti
  // (fixes C1L01@2:37 "zadnja tri se dodiruju/preklapaju" issue on PillCloud).
  const count = items.length
  const dense = count >= 6
  const pillPadV = dense ? 22 : 28
  const pillPadH = dense ? 36 : 44
  const fontSz   = dense ? 36 : TYPE.pill
  const rowGap   = dense ? 28 : 24
  const colGap   = dense ? 22 : 22

  return (
    <>
      <Kicker text={kicker} color={accentKicker || accent} t={head} />
      <Headline t={head} size={TYPE.headline}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 160, right: 160, top: 440, bottom: 80,
        display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start',
        rowGap, columnGap: colGap,
      }}>
        {items.map((label, i) => {
          const t = clamp((localTime - 1 - i * 0.28) / 0.4, 0, 1)
          const e = Easing.easeOutBack(t)
          const color = palette[i % palette.length]
          return (
            <div key={i} style={{
              background: filled ? color : W.cream,
              color: filled ? W.cream : W.ink,
              padding: `${pillPadV}px ${pillPadH}px`, borderRadius: 999,
              fontFamily: W.sans, fontSize: fontSz, fontWeight: 500,
              border: filled ? 'none' : `3px solid ${color}`,
              opacity: t, transform: `scale(${0.6 + 0.4 * e})`,
              boxShadow: filled ? '0 6px 18px rgba(42,38,32,0.12)' : 'none',
              whiteSpace: 'nowrap',
            }}>{label}</div>
          )
        })}
      </div>
    </>
  )
}

// ─── TEMPLATE: BulletListScene ──────────────────────────
// Sequential animated bullet points down the screen. Each line has a colored
// indicator (square or number). Use for principles, takeaways, lists where
// reading order matters.
export const BulletListScene = ({
  kicker, headline, items, accent = W.sage, accentKicker,
  numbered = false,
}) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)

  // Auto-scale font and gap to keep all items on screen regardless of count.
  // For 4+ items with subs the per-item height grows fast, so we drop sizes
  // more aggressively here to keep the bottom of the list within the canvas
  // (fixes "odrezan donji dio slajda" on C4L04@1:10).
  const count = items.length
  const hasSubs = items.some(it => typeof it === 'object' && it.sub)
  const big = count <= 3
  const medium = count === 4
  const tight = (count >= 4 && hasSubs) || count >= 5
  const mainSize = big ? 52 : tight ? 36 : medium ? 44 : 40
  const subSize  = big ? 32 : tight ? 22 : medium ? 26 : 22
  const gap      = big ? 28 : tight ? 16 : medium ? 22 : 16
  const indSize  = big ? 38 : tight ? 26 : medium ? 32 : 28
  const indWidth = big ? 84 : tight ? 56 : 64

  return (
    <>
      <Kicker text={kicker} color={accentKicker || accent} t={head} />
      <Headline t={head} size={TYPE.headline}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 200, right: 200, top: 420, bottom: 50,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap,
        overflow: 'hidden',
      }}>
        {items.map((item, i) => {
          const t = clamp((localTime - 1 - i * 0.7) / 0.5, 0, 1)
          const e = Easing.easeOutCubic(t)
          const indicator = numbered ? String(i + 1).padStart(2, '0') : null
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 22,
              opacity: t, transform: `translateX(${(1 - e) * -30}px)`,
            }}>
              {numbered ? (
                <div style={{
                  fontFamily: W.mono, fontSize: indSize, color: accent, fontWeight: 600,
                  letterSpacing: '0.1em', flexShrink: 0, width: indWidth, paddingTop: 4,
                }}>{indicator}</div>
              ) : (
                <div style={{
                  width: 14, height: 14, borderRadius: 4, background: accent,
                  flexShrink: 0, marginTop: mainSize * 0.45,
                }} />
              )}
              <div style={{
                fontFamily: W.display, fontSize: mainSize, color: W.ink, lineHeight: 1.2,
                fontWeight: 500, flex: 1, minWidth: 0,
              }}>
                {typeof item === 'string' ? item : item.text}
                {typeof item === 'object' && item.sub && (
                  <div style={{
                    fontFamily: W.sans, fontSize: subSize, color: W.muted, marginTop: 4,
                    fontWeight: 400, lineHeight: 1.3,
                  }}>{item.sub}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

// ─── TEMPLATE: ConceptCirclesScene ──────────────────────
// Two big circles labelled with single words and captions, separated by a
// connector (defaults to X for "different things"). Like Scene 4 of Lesson 01.
//
// Use when contrasting two ideas as orbits/spheres rather than tiles.
export const ConceptCirclesScene = ({
  kicker, headline, left, right, tagline,
  connector = 'x', // 'x' | 'plus' | 'arrow' | 'equal'
  accentKicker = W.clay,
}) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const leftIn = Easing.easeOutBack(clamp((localTime - 1.5) / 0.7, 0, 1))
  const rightIn = Easing.easeOutBack(clamp((localTime - 3.5) / 0.7, 0, 1))
  const conn = clamp((localTime - 5) / 0.5, 0, 1)
  const tag = clamp((localTime - 7) / 0.8, 0, 1)

  const renderConnector = () => {
    const c = W.clay
    switch (connector) {
      case 'plus':
        return (
          <svg width="160" height="160" viewBox="0 0 160 160">
            <line x1="80" y1="20" x2="80" y2="140" stroke={c} strokeWidth="12" strokeLinecap="round" />
            <line x1="20" y1="80" x2="140" y2="80" stroke={c} strokeWidth="12" strokeLinecap="round" />
          </svg>
        )
      case 'arrow':
        return (
          <svg width="200" height="80" viewBox="0 0 200 80">
            <line x1="20" y1="40" x2="170" y2="40" stroke={c} strokeWidth="10" strokeLinecap="round" />
            <polyline points="140,15 175,40 140,65" stroke={c} strokeWidth="10" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        )
      case 'equal':
        return (
          <div style={{ fontFamily: W.display, fontSize: 140, color: c, fontWeight: 500, lineHeight: 1 }}>=</div>
        )
      default:
        return (
          <svg width="160" height="160" viewBox="0 0 160 160">
            <line x1="28" y1="28" x2="132" y2="132" stroke={c} strokeWidth="12" strokeLinecap="round" />
            <line x1="132" y1="28" x2="28" y2="132" stroke={c} strokeWidth="12" strokeLinecap="round" />
          </svg>
        )
    }
  }

  return (
    <>
      <Kicker text={kicker} color={accentKicker} t={head} />
      <Headline t={head} size={TYPE.headline}>{headline}</Headline>

      {/* Left circle — pulled up + caption pushed further below so multi-line
          captions don't dotaknu the circle (C1L01@0:46, C1L04, C1L08@0:46,
          C3L07@0:20-24 in the review feedback). */}
      <div style={{
        position: 'absolute', left: 320, top: 420, width: 400, height: 400,
        opacity: leftIn, transform: `scale(${0.7 + 0.3 * leftIn})`,
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: left.color || W.sage,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: W.display, fontSize: 96, color: W.cream, fontWeight: 500,
          textAlign: 'center', padding: 20,
          boxShadow: '0 12px 40px rgba(42,38,32,0.12)',
        }}>{left.label}</div>
        {left.caption && (
          <div style={{
            position: 'absolute', bottom: -100, left: -40, right: -40, textAlign: 'center',
            fontFamily: W.sans, fontSize: 34, color: W.muted, lineHeight: 1.3,
          }}>{left.caption}</div>
        )}
      </div>

      {/* Connector in middle */}
      <div style={{
        position: 'absolute', left: 880, top: 580, width: 160, height: 160,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: conn, transform: `scale(${0.4 + 0.6 * Easing.easeOutBack(conn)})`,
      }}>
        {renderConnector()}
      </div>

      {/* Right circle */}
      <div style={{
        position: 'absolute', left: 1200, top: 420, width: 400, height: 400,
        opacity: rightIn, transform: `scale(${0.7 + 0.3 * rightIn})`,
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: right.color || W.clay,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: W.display, fontSize: 96, color: W.cream, fontWeight: 500,
          textAlign: 'center', padding: 20,
          boxShadow: '0 12px 40px rgba(42,38,32,0.12)',
        }}>{right.label}</div>
        {right.caption && (
          <div style={{
            position: 'absolute', bottom: -100, left: -40, right: -40, textAlign: 'center',
            fontFamily: W.sans, fontSize: 34, color: W.muted, lineHeight: 1.3,
          }}>{right.caption}</div>
        )}
      </div>

      {tagline && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center',
          fontFamily: W.display, fontSize: TYPE.callout, color: W.ink, fontStyle: 'italic',
          opacity: tag,
          transform: `translateY(${(1 - Easing.easeOutCubic(tag)) * 16}px)`,
        }}>{tagline}</div>
      )}
    </>
  )
}

// ─── TEMPLATE: TimelineScene ────────────────────────────
// Horizontal timeline with year markers + event labels. Events appear left to
// right with a drawing-in line connecting them. Designed for history-of and
// future-of narratives.
export const TimelineScene = ({ kicker, headline, events, accentKicker = W.clay }) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const lineIn = clamp((localTime - 1.2) / 1.5, 0, 1)

  const n = events.length
  // Distribute events evenly across the canvas (160-1760 = 1600 wide)
  const startX = 200
  const endX = 1720
  const span = endX - startX

  return (
    <>
      <Kicker text={kicker} color={accentKicker} t={head} />
      <Headline t={head} size={TYPE.headlineSm}>{headline}</Headline>

      {/* Horizontal baseline — lowered so it doesn't cut into the
          above-labels' bottom edge (C1L08@1:01-1:04 had labels touching the
          line). */}
      <div style={{
        position: 'absolute', left: startX, top: 640, height: 4,
        background: W.ink, opacity: 0.25,
        width: span,
        transformOrigin: 'left center',
        transform: `scaleX(${Easing.easeOutCubic(lineIn)})`,
      }} />

      {/* Event markers */}
      {events.map((evt, i) => {
        const eventT = 1.5 + i * 0.8
        const t = clamp((localTime - eventT) / 0.6, 0, 1)
        const e = Easing.easeOutBack(t)
        const xPos = startX + (n === 1 ? span / 2 : (span * i) / (n - 1))
        const above = i % 2 === 0  // alternate above/below to avoid overlap
        const palette = [W.clay, W.sage, W.sky]
        const color = palette[i % palette.length]
        return (
          <div key={i} style={{
            position: 'absolute', left: xPos - 8, top: 632, width: 16, height: 16,
            background: color, borderRadius: '50%',
            opacity: t, transform: `scale(${0.4 + 0.6 * e})`,
            boxShadow: `0 0 0 6px ${W.bg}`,
          }} />
        )
      })}

      {/* Event labels — moved further away from the baseline so the year +
          label + sub block doesn't run into the line on alternating sides. */}
      {events.map((evt, i) => {
        const eventT = 1.5 + i * 0.8
        const t = clamp((localTime - eventT) / 0.6, 0, 1)
        const xPos = startX + (n === 1 ? span / 2 : (span * i) / (n - 1))
        const above = i % 2 === 0
        const palette = [W.clay, W.sage, W.sky]
        const color = palette[i % palette.length]
        return (
          <div key={`label-${i}`} style={{
            position: 'absolute', left: xPos - 130, width: 260,
            top: above ? 400 : 720,
            textAlign: 'center', opacity: t,
            transform: `translateY(${above ? -(1 - t) * 12 : (1 - t) * 12}px)`,
          }}>
            <div style={{
              fontFamily: W.mono, fontSize: 28, letterSpacing: '0.1em',
              color, fontWeight: 600, marginBottom: 8,
            }}>{evt.year}</div>
            <div style={{
              fontFamily: W.display, fontSize: 36, color: W.ink, fontWeight: 500,
              lineHeight: 1.15,
            }}>{evt.label}</div>
            {evt.sub && (
              <div style={{
                fontFamily: W.sans, fontSize: 24, color: W.muted, marginTop: 8,
                lineHeight: 1.35,
              }}>{evt.sub}</div>
            )}
          </div>
        )
      })}
    </>
  )
}

// ─── TEMPLATE: ProcessFlowScene ─────────────────────────
// Horizontal sequence of N step cards with arrows between. Each step shows up
// in order. Designed for showing how a process works (e.g. how LLMs generate
// tokens, how AI policy approval works).
export const ProcessFlowScene = ({
  kicker, headline, steps, tagline, accentKicker = W.clay,
}) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const tag = clamp((localTime - 1.5 - steps.length * 0.9) / 0.7, 0, 1)

  return (
    <>
      <Kicker text={kicker} color={accentKicker} t={head} />
      <Headline t={head} size={TYPE.headlineSm}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 160, right: 160, top: 460,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24,
      }}>
        {steps.map((s, i) => {
          const stepT = 1.5 + i * 0.9
          const t = clamp((localTime - stepT) / 0.6, 0, 1)
          const e = Easing.easeOutBack(t)
          const arrowT = clamp((localTime - stepT - 0.5) / 0.5, 0, 1)
          const palette = [W.clay, W.sage, W.sky]
          const color = s.color || palette[i % palette.length]
          return (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{
                background: W.cream, border: `3px solid ${color}`, borderRadius: 24,
                padding: '32px 36px', minWidth: 230, maxWidth: 320, minHeight: 220,
                opacity: t, transform: `translateY(${(1 - e) * 20}px) scale(${0.9 + 0.1 * e})`,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div style={{
                  fontFamily: W.mono, fontSize: 22, letterSpacing: '0.2em',
                  color, fontWeight: 600,
                }}>{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div style={{ fontFamily: W.display, fontSize: 38, color: W.ink, fontWeight: 500, lineHeight: 1.15 }}>{s.title}</div>
                  {s.sub && (
                    <div style={{ fontFamily: W.sans, fontSize: 22, color: W.muted, marginTop: 8, lineHeight: 1.35 }}>{s.sub}</div>
                  )}
                </div>
              </div>
              {i < steps.length - 1 && (
                <span style={{
                  fontFamily: W.display, fontSize: 56, color: W.muted,
                  opacity: arrowT, transform: `translateX(${(1 - arrowT) * -10}px)`,
                }}>→</span>
              )}
            </span>
          )
        })}
      </div>

      {tagline && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 70, textAlign: 'center',
          fontFamily: W.display, fontSize: TYPE.callout, fontStyle: 'italic', color: W.ink,
          opacity: tag,
        }}>{tagline}</div>
      )}
    </>
  )
}

// ─── TEMPLATE: StatCalloutScene ─────────────────────────
// Big number + small label, with surrounding context text. Used for emphasis
// on a single statistic or claim ("99%", "33 lessons", etc.).
export const StatCalloutScene = ({
  kicker, headline, stat, statLabel, context,
  accent = W.clay, accentKicker,
}) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const statT = clamp((localTime - 1.5) / 0.8, 0, 1)
  const ctxT = clamp((localTime - 3) / 0.8, 0, 1)
  const statE = Easing.easeOutBack(statT)

  return (
    <>
      <Kicker text={kicker} color={accentKicker || accent} t={head} />
      <Headline t={head} size={TYPE.headlineSm}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 0, right: 0, top: 460,
        textAlign: 'center',
        opacity: statT, transform: `scale(${0.7 + 0.3 * statE})`,
      }}>
        <div style={{
          fontFamily: W.display, fontSize: 260, color: accent, fontWeight: 500,
          letterSpacing: '-0.03em', lineHeight: 1,
        }}>{stat}</div>
        {statLabel && (
          <div style={{
            fontFamily: W.mono, fontSize: 30, color: W.muted, marginTop: 12,
            letterSpacing: '0.18em',
          }}>{statLabel}</div>
        )}
      </div>

      {context && (
        <div style={{
          position: 'absolute', left: 200, right: 200, bottom: 80, textAlign: 'center',
          fontFamily: W.display, fontSize: TYPE.callout, fontStyle: 'italic', color: W.ink,
          opacity: ctxT,
        }}>{context}</div>
      )}
    </>
  )
}

// ─── TEMPLATE: QuoteScene ───────────────────────────────
// A big pulled-out italic quote, centered. Used for principle statements or
// memorable phrasings within a lesson.
export const QuoteScene = ({ kicker, headline, quote, attribution, accentKicker = W.clay }) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const q = clamp((localTime - 1) / 1, 0, 1)
  const attr = clamp((localTime - 3) / 0.8, 0, 1)
  const e = Easing.easeOutCubic(q)

  return (
    <>
      {kicker && <Kicker text={kicker} color={accentKicker} t={head} />}
      {headline && <Headline t={head} size={TYPE.headlineSm}>{headline}</Headline>}

      <div style={{
        position: 'absolute', left: 160, right: 160, top: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 32,
      }}>
        <div style={{
          fontFamily: W.display, fontSize: 78, color: W.ink, fontStyle: 'italic',
          textAlign: 'center', lineHeight: 1.25,
          opacity: q, transform: `translateY(${(1 - e) * 24}px)`,
          letterSpacing: '-0.01em',
        }}>“{quote}”</div>
        {attribution && (
          <div style={{
            fontFamily: W.mono, fontSize: 24, color: W.muted,
            letterSpacing: '0.2em', textTransform: 'uppercase', opacity: attr,
          }}>— {attribution}</div>
        )}
      </div>
    </>
  )
}

// ─── TEMPLATE: ToolWalkthroughScene ─────────────────────
// Tool-introduction layout: name + tagline on the left, a "screen" mockup
// (just a card with key features listed) on the right. Used for tool-tutorial
// lessons (ChatGPT, Claude, Canva, MagicSchool, Lovable, etc.) where we don't
// have real screenshots.
export const ToolWalkthroughScene = ({
  kicker, headline, toolName, toolTagline, features,
  accent = W.clay, accentKicker,
}) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const leftIn = clamp((localTime - 1.2) / 0.7, 0, 1)
  const screenIn = clamp((localTime - 2.4) / 0.7, 0, 1)
  const leftE = Easing.easeOutBack(leftIn)
  const screenE = Easing.easeOutBack(screenIn)

  return (
    <>
      <Kicker text={kicker} color={accentKicker || accent} t={head} />
      <Headline t={head} size={TYPE.headlineSm}>{headline}</Headline>

      {/* Tool name + tagline on left */}
      <div style={{
        position: 'absolute', left: 160, top: 460, width: 700,
        opacity: leftIn, transform: `translateX(${(1 - leftE) * -30}px)`,
      }}>
        <div style={{
          fontFamily: W.mono, fontSize: 24, color: accent, letterSpacing: '0.25em',
          fontWeight: 600, marginBottom: 18,
        }}>TOOL</div>
        <div style={{
          fontFamily: W.display, fontSize: 110, color: W.ink, fontWeight: 500,
          lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 24,
        }}>{toolName}</div>
        <div style={{
          fontFamily: W.sans, fontSize: 32, color: W.muted, lineHeight: 1.35,
        }}>{toolTagline}</div>
      </div>

      {/* "Screen" with feature list on right */}
      <div style={{
        position: 'absolute', left: 1000, top: 440, width: 760, minHeight: 480,
        background: W.cream, borderRadius: 32, padding: '40px 44px',
        boxShadow: '0 12px 40px rgba(42,38,32,0.12)',
        opacity: screenIn,
        transform: `translateY(${(1 - screenE) * 30}px) scale(${0.94 + 0.06 * screenE})`,
        border: `3px solid ${accent}22`,
      }}>
        <div style={{
          fontFamily: W.mono, fontSize: 18, color: W.muted, letterSpacing: '0.25em',
          marginBottom: 28, fontWeight: 600,
        }}>WHAT YOU GET</div>
        {features.map((f, i) => {
          const fT = clamp((localTime - 3.5 - i * 0.5) / 0.5, 0, 1)
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 18,
              marginBottom: 22, opacity: fT,
              transform: `translateX(${(1 - fT) * -16}px)`,
            }}>
              <div style={{
                width: 14, height: 14, borderRadius: 4, background: accent,
                flexShrink: 0, marginTop: 14,
              }} />
              <div style={{
                fontFamily: W.sans, fontSize: 30, color: W.ink,
                lineHeight: 1.35, fontWeight: 500,
              }}>
                {typeof f === 'string' ? f : f.title}
                {typeof f === 'object' && f.sub && (
                  <div style={{
                    fontFamily: W.sans, fontSize: 22, color: W.muted, marginTop: 4,
                    fontWeight: 400, lineHeight: 1.4,
                  }}>{f.sub}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

// ─── TEMPLATE: StackScene ───────────────────────────────
// Vertical stack of horizontal bands (like a pyramid or layer cake). Each band
// labelled. Used for "layers of AI" or capability tiers.
export const StackScene = ({ kicker, headline, layers, accentKicker = W.clay }) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const palette = [W.clay, W.sage, W.sky, W.muted]

  // Available vertical space is roughly y=430 to y=1040 (~610px). Distribute
  // height + gap across layers so a 6-layer stack still fits comfortably.
  const count = layers.length
  const compact = count >= 5
  const gap        = compact ? 12 : 18
  const minHeight  = compact ? 78 : 110
  const padY       = compact ? 16 : 28
  const padX       = compact ? 28 : 40
  const layerLabel = compact ? 16 : 20
  const titleSize  = compact ? 32 : 44
  const subSize    = compact ? 20 : 24

  return (
    <>
      <Kicker text={kicker} color={accentKicker} t={head} />
      <Headline t={head} size={TYPE.headline}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 360, right: 360, top: 430, bottom: 40,
        display: 'flex', flexDirection: 'column', gap, justifyContent: 'flex-start',
      }}>
        {layers.map((layer, i) => {
          const t = clamp((localTime - 1.2 - i * 0.7) / 0.6, 0, 1)
          const e = Easing.easeOutBack(t)
          const color = layer.color || palette[i % palette.length]
          return (
            <div key={i} style={{
              background: color, borderRadius: 18, padding: `${padY}px ${padX}px`,
              color: W.cream, display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', gap: 24, minHeight,
              opacity: t, transform: `translateY(${(1 - e) * 30}px) scale(${0.96 + 0.04 * e})`,
              boxShadow: '0 6px 20px rgba(42,38,32,0.12)',
            }}>
              <div>
                <div style={{
                  fontFamily: W.mono, fontSize: layerLabel, letterSpacing: '0.2em',
                  opacity: 0.8, fontWeight: 600, marginBottom: 4,
                }}>LAYER {String(layers.length - i).padStart(2, '0')}</div>
                <div style={{
                  fontFamily: W.display, fontSize: titleSize, fontWeight: 500, lineHeight: 1.1,
                }}>{layer.title}</div>
              </div>
              {layer.sub && (
                <div style={{
                  fontFamily: W.sans, fontSize: subSize, opacity: 0.92,
                  flex: 1, textAlign: 'right', lineHeight: 1.3,
                }}>{layer.sub}</div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

// ─── TEMPLATE: TwoColumnScene ───────────────────────────
// Side-by-side card pair (no equality sign). Each column has its own kicker,
// title, and bullet list. Use for "X vs Y" comparisons or "for teachers /
// for students" framings.
export const TwoColumnScene = ({
  kicker, headline, left, right,
  leftColor = W.clay, rightColor = W.sage,
  accentKicker = W.clay,
}) => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const leftIn = clamp((localTime - 1.2) / 0.7, 0, 1)
  const rightIn = clamp((localTime - 2.4) / 0.7, 0, 1)
  const leftE = Easing.easeOutBack(leftIn)
  const rightE = Easing.easeOutBack(rightIn)

  const Col = ({ data, t, e, color }) => (
    <div style={{
      flex: 1, background: W.cream, borderRadius: 28, padding: '40px 44px',
      border: `3px solid ${color}`, minHeight: 460,
      opacity: t, transform: `translateY(${(1 - e) * 30}px) scale(${0.96 + 0.04 * e})`,
    }}>
      <div style={{
        fontFamily: W.mono, fontSize: TYPE.monoLabel, letterSpacing: '0.25em',
        color, fontWeight: 600, marginBottom: 18,
      }}>{data.label}</div>
      <div style={{
        fontFamily: W.display, fontSize: TYPE.cardTitleLg, color: W.ink, fontWeight: 500,
        lineHeight: 1.1, marginBottom: 24,
      }}>{data.title}</div>
      {data.bullets && (
        <ul style={{
          fontFamily: W.sans, fontSize: 30, color: W.muted, lineHeight: 1.5,
          listStyle: 'none', padding: 0, margin: 0,
        }}>
          {data.bullets.map((b, i) => (
            <li key={i} style={{ marginBottom: 10 }}>· {b}</li>
          ))}
        </ul>
      )}
      {data.body && (
        <div style={{
          fontFamily: W.sans, fontSize: 30, color: W.muted, lineHeight: 1.5,
        }}>{data.body}</div>
      )}
    </div>
  )

  return (
    <>
      <Kicker text={kicker} color={accentKicker} t={head} />
      <Headline t={head} size={TYPE.headlineSm}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 160, right: 160, top: 400,
        display: 'flex', gap: 36,
      }}>
        <Col data={left} t={leftIn} e={leftE} color={leftColor} />
        <Col data={right} t={rightIn} e={rightE} color={rightColor} />
      </div>
    </>
  )
}
