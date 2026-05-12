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
        position: 'absolute', left: 0, right: 0, top: 320, textAlign: 'center',
        fontFamily: W.display, fontSize: TYPE.hero, fontWeight: 500, color: W.ink,
        letterSpacing: '-0.04em', lineHeight: 0.95,
        opacity: t, transform: `translateY(${(1 - t) * 30}px)`,
      }}>{renderTitle()}</div>
      {subtitle && (
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 620, textAlign: 'center',
          fontFamily: W.sans, fontSize: 44, color: W.muted, fontWeight: 400,
          opacity: sub, transform: `translateY(${(1 - sub) * 16}px)`,
        }}>{subtitle}</div>
      )}
      {kicker && (
        <div style={{
          position: 'absolute', left: '50%', top: 800, transform: 'translateX(-50%)',
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

      {/* WEAK card — clay, left */}
      <div style={{
        position: 'absolute', left: 160, top: 400, width: 760, minHeight: 320,
        background: W.clay, color: W.cream, borderRadius: 28, padding: '42px 48px',
        boxShadow: '0 8px 24px rgba(42,38,32,0.14)',
        opacity: leftIn, transform: `translateY(${(1 - leftE) * 30}px) scale(${0.94 + 0.06 * leftE})`,
      }}>
        <div style={{ fontFamily: W.mono, fontSize: TYPE.monoLabel, letterSpacing: '0.25em', opacity: 0.75, marginBottom: 18, fontWeight: 600 }}>WEAK PROMPT</div>
        <div style={{ fontFamily: W.display, fontSize: 44, fontStyle: 'italic', lineHeight: 1.25 }}>
          “{weak}”
        </div>
      </div>

      {/* STRONG card — sage, right */}
      <div style={{
        position: 'absolute', left: 1000, top: 400, width: 760, minHeight: 320,
        background: W.sage, color: W.cream, borderRadius: 28, padding: '42px 48px',
        boxShadow: '0 8px 24px rgba(42,38,32,0.14)',
        opacity: rightIn, transform: `translateY(${(1 - rightE) * 30}px) scale(${0.94 + 0.06 * rightE})`,
      }}>
        <div style={{ fontFamily: W.mono, fontSize: TYPE.monoLabel, letterSpacing: '0.25em', opacity: 0.75, marginBottom: 18, fontWeight: 600 }}>STRONG PROMPT</div>
        <div style={{ fontFamily: W.display, fontSize: 40, fontStyle: 'italic', lineHeight: 1.3 }}>
          “{strong}”
        </div>
      </div>

      {tagline && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 80, textAlign: 'center',
          fontFamily: W.display, fontSize: 44, fontStyle: 'italic', color: W.muted,
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

  return (
    <>
      <Kicker text={kicker} color={accentKicker || accent} t={head} />
      <Headline t={head} size={TYPE.headline}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 160, right: 160, top: 430,
        display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 32,
      }}>
        {items.map((c, i) => {
          const t = clamp((localTime - 1 - i * stagger) / 0.6, 0, 1)
          const e = Easing.easeOutBack(t)
          return (
            <div key={i} style={{
              background: W.cream, borderRadius: 28, padding: '36px 40px', minHeight: 240,
              opacity: t, transform: `translateY(${(1 - e) * 30}px)`,
              border: `2px solid ${accent}33`,
            }}>
              {swatch && (
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: accent, marginBottom: 24,
                }} />
              )}
              <div style={{ fontFamily: W.sans, fontSize: TYPE.cardTitle, fontWeight: 600, color: W.ink, marginBottom: 12, lineHeight: 1.15 }}>{c.title}</div>
              {c.body && (
                <div style={{ fontFamily: W.sans, fontSize: 38, color: W.muted, lineHeight: 1.35 }}>{c.body}</div>
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
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'stretch', gap: 24, marginBottom: 24,
              opacity: t, transform: `translateY(${(1 - e) * 20}px)`,
            }}>
              <div style={{
                background: W.clay, color: W.cream, padding: '28px 36px', borderRadius: 24,
                fontFamily: W.display, fontStyle: 'italic', fontSize: TYPE.myth,
                minWidth: 620, position: 'relative',
              }}>
                “{m.myth}”
                <div style={{
                  position: 'absolute', left: -6, right: -6, top: '52%',
                  height: 5, background: W.cream, borderRadius: 3,
                  transformOrigin: 'left center',
                  transform: `scaleX(${Easing.easeOutQuart(stamp)})`,
                }} />
              </div>
              <div style={{
                flex: 1, background: W.cream, padding: '28px 36px', borderRadius: 24,
                fontFamily: W.sans, fontSize: 38, color: W.ink,
                display: 'flex', alignItems: 'center', opacity: stamp, lineHeight: 1.35,
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

  return (
    <>
      <Kicker text={kicker} color={accentKicker || accent} t={head} />
      <Headline t={head} size={TYPE.headline}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 160, right: 160, top: 440,
        display: 'flex', flexWrap: 'wrap', gap: 24,
      }}>
        {items.map((label, i) => {
          const t = clamp((localTime - 1 - i * 0.28) / 0.4, 0, 1)
          const e = Easing.easeOutBack(t)
          const color = palette[i % palette.length]
          return (
            <div key={i} style={{
              background: filled ? color : W.cream,
              color: filled ? W.cream : W.ink,
              padding: '30px 44px', borderRadius: 999,
              fontFamily: W.sans, fontSize: TYPE.pill, fontWeight: 500,
              border: filled ? 'none' : `3px solid ${color}`,
              opacity: t, transform: `scale(${0.6 + 0.4 * e})`,
              boxShadow: filled ? '0 6px 18px rgba(42,38,32,0.12)' : 'none',
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

  return (
    <>
      <Kicker text={kicker} color={accentKicker || accent} t={head} />
      <Headline t={head} size={TYPE.headline}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 200, right: 200, top: 430,
        display: 'flex', flexDirection: 'column', gap: 28,
      }}>
        {items.map((item, i) => {
          const t = clamp((localTime - 1 - i * 0.7) / 0.5, 0, 1)
          const e = Easing.easeOutCubic(t)
          const indicator = numbered ? String(i + 1).padStart(2, '0') : null
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 28,
              opacity: t, transform: `translateX(${(1 - e) * -30}px)`,
            }}>
              {numbered ? (
                <div style={{
                  fontFamily: W.mono, fontSize: 36, color: accent, fontWeight: 600,
                  letterSpacing: '0.1em', flexShrink: 0, width: 80,
                  paddingTop: 6,
                }}>{indicator}</div>
              ) : (
                <div style={{
                  width: 16, height: 16, borderRadius: 4, background: accent,
                  flexShrink: 0, marginTop: 22,
                }} />
              )}
              <div style={{
                fontFamily: W.display, fontSize: 48, color: W.ink, lineHeight: 1.25,
                fontWeight: 500,
              }}>
                {typeof item === 'string' ? item : item.text}
                {typeof item === 'object' && item.sub && (
                  <div style={{
                    fontFamily: W.sans, fontSize: 30, color: W.muted, marginTop: 6,
                    fontWeight: 400, lineHeight: 1.35,
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

      {/* Left circle */}
      <div style={{
        position: 'absolute', left: 320, top: 480, width: 400, height: 400,
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
            position: 'absolute', bottom: -68, left: 0, right: 0, textAlign: 'center',
            fontFamily: W.sans, fontSize: 36, color: W.muted,
          }}>{left.caption}</div>
        )}
      </div>

      {/* Connector in middle */}
      <div style={{
        position: 'absolute', left: 880, top: 640, width: 160, height: 160,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: conn, transform: `scale(${0.4 + 0.6 * Easing.easeOutBack(conn)})`,
      }}>
        {renderConnector()}
      </div>

      {/* Right circle */}
      <div style={{
        position: 'absolute', left: 1200, top: 480, width: 400, height: 400,
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
            position: 'absolute', bottom: -68, left: 0, right: 0, textAlign: 'center',
            fontFamily: W.sans, fontSize: 36, color: W.muted,
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

      {/* Horizontal baseline */}
      <div style={{
        position: 'absolute', left: startX, top: 620, height: 4,
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
            position: 'absolute', left: xPos - 8, top: 612, width: 16, height: 16,
            background: color, borderRadius: '50%',
            opacity: t, transform: `scale(${0.4 + 0.6 * e})`,
            boxShadow: `0 0 0 6px ${W.bg}`,
          }} />
        )
      })}

      {/* Event labels */}
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
            top: above ? 430 : 680,
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

  return (
    <>
      <Kicker text={kicker} color={accentKicker} t={head} />
      <Headline t={head} size={TYPE.headline}>{headline}</Headline>

      <div style={{
        position: 'absolute', left: 360, right: 360, top: 430,
        display: 'flex', flexDirection: 'column', gap: 18,
      }}>
        {layers.map((layer, i) => {
          const t = clamp((localTime - 1.2 - i * 0.7) / 0.6, 0, 1)
          const e = Easing.easeOutBack(t)
          const color = layer.color || palette[i % palette.length]
          return (
            <div key={i} style={{
              background: color, borderRadius: 22, padding: '28px 40px',
              color: W.cream, display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', gap: 24, minHeight: 110,
              opacity: t, transform: `translateY(${(1 - e) * 30}px) scale(${0.96 + 0.04 * e})`,
              boxShadow: '0 6px 20px rgba(42,38,32,0.12)',
            }}>
              <div>
                <div style={{
                  fontFamily: W.mono, fontSize: 20, letterSpacing: '0.2em',
                  opacity: 0.8, fontWeight: 600, marginBottom: 6,
                }}>LAYER {String(layers.length - i).padStart(2, '0')}</div>
                <div style={{
                  fontFamily: W.display, fontSize: 44, fontWeight: 500, lineHeight: 1.1,
                }}>{layer.title}</div>
              </div>
              {layer.sub && (
                <div style={{
                  fontFamily: W.sans, fontSize: 24, opacity: 0.92,
                  flex: 1, textAlign: 'right', lineHeight: 1.4,
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
