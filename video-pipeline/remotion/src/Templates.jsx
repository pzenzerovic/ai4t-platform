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
import { WARM as W } from './theme.js'
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
    fontFamily: W.mono, fontSize: 16, letterSpacing: '0.2em',
    color, opacity: t,
  }}>{text}</div>
)

const Headline = ({ children, t = 1, size = 72 }) => (
  <div style={{
    position: 'absolute', left: 160, right: 160, top: 180,
    fontFamily: W.display, fontSize: size, color: W.ink,
    letterSpacing: '-0.02em', lineHeight: 1.1, fontWeight: 500,
    opacity: t,
  }}>{children}</div>
)

// ─── TEMPLATE: TitleScene ───────────────────────────────
// Big title with two background blobs growing in from corners.
// Used by lesson openers.
export const TitleScene = ({ title, subtitle, kicker, accentLeft = W.clay, accentRight = W.sage, italicWord }) => {
  const localTime = useLocal()
  const blob1 = Easing.easeOutCubic(clamp(localTime / 1.2, 0, 1))
  const blob2 = Easing.easeOutCubic(clamp((localTime - 0.4) / 1.2, 0, 1))
  const t = Easing.easeOutCubic(clamp((localTime - 0.8) / 1.2, 0, 1))
  const sub = clamp((localTime - 2.2) / 1, 0, 1)

  // Optionally render an italic emphasis word
  const renderTitle = () => {
    if (!italicWord) return title
    const parts = title.split(italicWord)
    return (
      <>
        {parts[0]}
        <span style={{ fontStyle: 'italic', color: W.clay }}>{italicWord}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <>
      <Blob cx={300} cy={280} r={blob1 * 200} color={accentLeft} opacity={0.85} />
      <Blob cx={1650} cy={820} r={blob2 * 240} color={accentRight} opacity={0.8} />
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center',
        fontFamily: W.display, fontSize: 180, fontWeight: 500, color: W.ink,
        letterSpacing: '-0.04em', lineHeight: 0.95,
        opacity: t, transform: `translateY(${(1 - t) * 30}px)`,
      }}>{renderTitle()}</div>
      {subtitle && (
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 620, textAlign: 'center',
          fontFamily: W.sans, fontSize: 28, color: W.muted,
          opacity: sub, transform: `translateY(${(1 - sub) * 16}px)`,
        }}>{subtitle}</div>
      )}
      {kicker && (
        <div style={{
          position: 'absolute', left: '50%', top: 780, transform: 'translateX(-50%)',
          fontFamily: W.mono, fontSize: 14, letterSpacing: '0.25em', color: W.muted,
          opacity: sub * 0.7,
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
      <Headline t={head} size={56}>{headline}</Headline>

      {/* WEAK card — clay, left */}
      <div style={{
        position: 'absolute', left: 160, top: 360, width: 720, minHeight: 280,
        background: W.clay, color: W.cream, borderRadius: 24, padding: '36px 40px',
        boxShadow: '0 8px 24px rgba(42,38,32,0.14)',
        opacity: leftIn, transform: `translateY(${(1 - leftE) * 30}px) scale(${0.94 + 0.06 * leftE})`,
      }}>
        <div style={{ fontFamily: W.mono, fontSize: 14, letterSpacing: '0.25em', opacity: 0.7, marginBottom: 12 }}>WEAK PROMPT</div>
        <div style={{ fontFamily: W.display, fontSize: 36, fontStyle: 'italic', lineHeight: 1.25 }}>
          „{weak}"
        </div>
      </div>

      {/* STRONG card — sage, right */}
      <div style={{
        position: 'absolute', left: 1040, top: 360, width: 720, minHeight: 280,
        background: W.sage, color: W.cream, borderRadius: 24, padding: '36px 40px',
        boxShadow: '0 8px 24px rgba(42,38,32,0.14)',
        opacity: rightIn, transform: `translateY(${(1 - rightE) * 30}px) scale(${0.94 + 0.06 * rightE})`,
      }}>
        <div style={{ fontFamily: W.mono, fontSize: 14, letterSpacing: '0.25em', opacity: 0.7, marginBottom: 12 }}>STRONG PROMPT</div>
        <div style={{ fontFamily: W.display, fontSize: 28, fontStyle: 'italic', lineHeight: 1.3 }}>
          „{strong}"
        </div>
      </div>

      {tagline && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 90, textAlign: 'center',
          fontFamily: W.display, fontSize: 32, fontStyle: 'italic', color: W.muted,
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
      <Headline t={head} size={60}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 160, right: 160, top: 420,
        display: 'flex', flexWrap: 'wrap', gap: 18,
      }}>
        {items.map((label, i) => {
          const t = clamp((localTime - 1.5 - i * 0.4) / 0.5, 0, 1)
          const e = Easing.easeOutBack(t)
          const color = cols[i % cols.length]
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              background: W.cream, padding: '18px 28px', borderRadius: 999,
              border: `3px solid ${color}`,
              opacity: t, transform: `scale(${0.6 + 0.4 * e})`,
            }}>
              <span style={{
                fontFamily: W.mono, fontSize: 14, letterSpacing: '0.15em',
                color, fontWeight: 500,
              }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{
                fontFamily: W.sans, fontSize: 26, fontWeight: 500, color: W.ink,
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
    return (
      <>
        {parts[0]}
        <span style={{ fontStyle: 'italic', color: W.clay }}>{italicTerm}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <>
      <Kicker text={kicker} color={accentKicker} t={head} />
      <Headline t={head} size={68}>{renderHeadline()}</Headline>

      {flow && (
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 540,
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40,
          opacity: flowIn, transform: `translateY(${(1 - Easing.easeOutCubic(flowIn)) * 20}px)`,
        }}>
          {flow.map((item, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              <div style={{
                background: W.cream, border: `3px solid ${i === 1 ? W.clay : W.ink + '20'}`,
                borderRadius: 20, padding: '24px 36px',
                fontFamily: W.display, fontSize: 38, fontWeight: 500,
                color: i === 1 ? W.clay : W.ink,
                minWidth: 220, textAlign: 'center',
              }}>{item}</div>
              {i < flow.length - 1 && (
                <span style={{ fontFamily: W.display, fontSize: 48, color: W.muted }}>→</span>
              )}
            </span>
          ))}
        </div>
      )}

      {tagline && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 110, textAlign: 'center',
          fontFamily: W.display, fontSize: 38, fontStyle: 'italic', color: W.ink,
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
      <Headline t={head} size={56}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 160, right: 160, top: 350,
        background: W.cream, borderRadius: 28, padding: '36px 44px',
        boxShadow: '0 8px 24px rgba(42,38,32,0.08)',
      }}>
        {segments.map((seg, i) => {
          const t = clamp((localTime - 1.0 - i * 0.55) / 0.5, 0, 1)
          const e = Easing.easeOutCubic(t)
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 28,
              padding: '12px 0',
              borderBottom: i < segments.length - 1 ? `1px solid ${W.ink}10` : 'none',
              opacity: t, transform: `translateY(${(1 - e) * 12}px)`,
            }}>
              {/* Label column — fixed width */}
              <div style={{
                width: 200, flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: 12,
                paddingTop: 6,
              }}>
                <div style={{
                  width: 8, height: 28, borderRadius: 4,
                  background: seg.color, flexShrink: 0,
                }} />
                <div style={{
                  fontFamily: W.mono, fontSize: 16, letterSpacing: '0.2em',
                  color: seg.color, fontWeight: 600,
                }}>{seg.label}</div>
              </div>
              {/* Text column — fluid */}
              <div style={{
                flex: 1,
                fontFamily: W.display, fontSize: 30, lineHeight: 1.4, color: W.ink,
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

  // 4 positions roughly around a center: top, right, bottom, left
  const positions = [
    { x: 760, y: 380 },   // top
    { x: 1180, y: 580 },  // right
    { x: 760, y: 780 },   // bottom
    { x: 340, y: 580 },   // left
  ]

  return (
    <>
      <Kicker text={kicker} color={accentKicker} t={head} />
      <Headline t={head} size={64}>{headline}</Headline>

      {steps.map((s, i) => {
        const t = clamp((localTime - 1.2 - i * 0.6) / 0.5, 0, 1)
        const e = Easing.easeOutBack(t)
        const pos = positions[i % positions.length]
        return (
          <div key={i} style={{
            position: 'absolute', left: pos.x, top: pos.y, width: 380, minHeight: 140,
            background: W.sage, color: W.cream, borderRadius: 24, padding: '24px 30px',
            boxShadow: '0 8px 24px rgba(42,38,32,0.12)',
            opacity: t, transform: `scale(${0.7 + 0.3 * e})`,
          }}>
            <div style={{ fontFamily: W.mono, fontSize: 14, letterSpacing: '0.2em', opacity: 0.75, marginBottom: 8 }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{ fontFamily: W.display, fontSize: 30, fontWeight: 500, lineHeight: 1.15 }}>{s.title}</div>
            {s.sub && (
              <div style={{ fontFamily: W.sans, fontSize: 17, marginTop: 6, opacity: 0.9 }}>{s.sub}</div>
            )}
          </div>
        )
      })}

      {/* central circular arrow hint */}
      <div style={{
        position: 'absolute', left: 870, top: 580, width: 180, height: 180,
        opacity: clamp((localTime - 3.5) / 0.8, 0, 1),
      }}>
        <svg width="180" height="180" viewBox="0 0 180 180">
          <path
            d="M 90 30 A 60 60 0 1 1 30 90"
            stroke={W.clay} strokeWidth="6" fill="none" strokeLinecap="round"
            opacity="0.55"
          />
          <polygon points="22,88 42,80 38,100" fill={W.clay} opacity="0.7" />
        </svg>
      </div>

      {tagline && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 80, textAlign: 'center',
          fontFamily: W.display, fontSize: 36, fontStyle: 'italic', color: W.ink,
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
      width: 680, minHeight: 360,
      background: W.cream, borderRadius: 28, padding: '36px 40px',
      border: `3px solid ${color}`,
      opacity: t, transform: `translateY(${(1 - e) * 30}px) scale(${0.94 + 0.06 * e})`,
    }}>
      <div style={{ fontFamily: W.mono, fontSize: 14, letterSpacing: '0.25em', color, fontWeight: 500, marginBottom: 16 }}>
        {data.label}
      </div>
      <div style={{ fontFamily: W.display, fontSize: 38, fontWeight: 500, color: W.ink, marginBottom: 20 }}>
        {data.title}
      </div>
      <ul style={{
        fontFamily: W.sans, fontSize: 22, color: W.muted, lineHeight: 1.6,
        listStyle: 'none', padding: 0, margin: 0,
      }}>
        {data.bullets.map((b, i) => (
          <li key={i} style={{ marginBottom: 6 }}>· {b}</li>
        ))}
      </ul>
    </div>
  )

  return (
    <>
      <Kicker text={kicker} color={accentKicker} t={head} />
      <Headline t={head} size={60}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 0, right: 0, top: 380,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40,
      }}>
        <Item data={left} t={leftIn} e={leftE} color={W.clay} />
        <div style={{
          fontFamily: W.display, fontSize: 90, color: W.muted, fontWeight: 500,
          opacity: equalIn, transform: `scale(${0.6 + 0.4 * Easing.easeOutBack(equalIn)})`,
        }}>=</div>
        <Item data={right} t={rightIn} e={rightE} color={W.sage} />
      </div>

      {tagline && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 90, textAlign: 'center',
          fontFamily: W.display, fontSize: 36, fontStyle: 'italic', color: W.ink,
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
    return (
      <>
        {parts[0]}
        <span style={{ fontStyle: 'italic', color: accent }}>{italicWord}</span>
        {parts[1]}
      </>
    )
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
          fontFamily: W.display, fontSize: 110, color: W.ink,
          letterSpacing: '-0.025em', fontWeight: 500, textAlign: 'center',
          opacity: t, transform: `translateY(${(1 - t) * 20}px)`,
        }}>
          {renderTagline()}
        </div>
        {kicker && (
          <div style={{
            fontFamily: W.mono, fontSize: 14, color: W.muted,
            letterSpacing: '0.25em', opacity: t * 0.7,
          }}>{kicker}</div>
        )}
      </div>
    </>
  )
}
