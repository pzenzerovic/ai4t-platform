// All 12 scenes for Lesson 01 — "What is AI?"
// Ported from the Claude design handoff prototype (scenes-warm.jsx).
// Typography scaled for video viewing (see theme.js → TYPE).

import { useCurrentFrame, useVideoConfig } from 'remotion'
import { WARM as W, TYPE } from './theme.js'
import { Easing, clamp } from './helpers.js'

const Blob = ({ cx, cy, r, color, opacity = 0.9, style }) => (
  <div style={{
    position: 'absolute', left: cx - r, top: cy - r,
    width: r * 2, height: r * 2, borderRadius: '50%',
    background: color, opacity, ...style,
  }} />
)

const Card = ({ x, y, w, h, color = W.cream, t = 1, rotate = 0, children, style }) => (
  <div style={{
    position: 'absolute', left: x, top: y, width: w, height: h,
    background: color, borderRadius: 20,
    boxShadow: '0 4px 16px rgba(42,38,32,0.08), 0 1px 2px rgba(42,38,32,0.04)',
    opacity: t,
    transform: `translateY(${(1 - t) * 30}px) rotate(${rotate}deg) scale(${0.92 + 0.08 * t})`,
    transformOrigin: 'center',
    ...style,
  }}>{children}</div>
)

const useLocal = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  return frame / fps
}

const kickerStyle = (color, opacity) => ({
  position: 'absolute', left: 160, top: 120,
  fontFamily: W.mono, fontSize: TYPE.kicker, letterSpacing: '0.2em',
  color, opacity, fontWeight: 600,
})

const headlineStyle = (opacity, size = TYPE.headline) => ({
  position: 'absolute', left: 160, right: 160, top: 200,
  fontFamily: W.display, fontSize: size, color: W.ink,
  letterSpacing: '-0.02em', fontWeight: 500, opacity, lineHeight: 1.1,
})

// ── SCENE 1 — Title ─────────────────────────────────────
export const Scene01 = () => {
  const localTime = useLocal()
  const blob1 = Easing.easeOutCubic(clamp(localTime / 1.2, 0, 1))
  const blob2 = Easing.easeOutCubic(clamp((localTime - 0.4) / 1.2, 0, 1))
  const title = Easing.easeOutCubic(clamp((localTime - 0.8) / 1.2, 0, 1))
  const sub = clamp((localTime - 2.2) / 1, 0, 1)
  return (
    <>
      <Blob cx={300} cy={280} r={blob1 * 200} color={W.clay} opacity={0.85} />
      <Blob cx={1650} cy={820} r={blob2 * 240} color={W.sage} opacity={0.8} />
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center',
        fontFamily: W.display, fontSize: 260, fontWeight: 500, color: W.ink,
        letterSpacing: '-0.04em', lineHeight: 0.95,
        opacity: title, transform: `translateY(${(1 - title) * 30}px)`,
      }}>What is AI?</div>
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 660, textAlign: 'center',
        fontFamily: W.sans, fontSize: 44, color: W.muted, fontWeight: 400,
        opacity: sub, transform: `translateY(${(1 - sub) * 16}px)`,
      }}>A lesson for teachers · 3 minutes · no jargon</div>
      <div style={{
        position: 'absolute', left: '50%', top: 820, transform: 'translateX(-50%)',
        fontFamily: W.mono, fontSize: 28, letterSpacing: '0.25em', color: W.muted,
        opacity: sub * 0.7, fontWeight: 600,
      }}>AI4TEACHERS · 01</div>
    </>
  )
}

// ── SCENE 2 — Clear the noise ───────────────────────────
export const Scene02 = () => {
  const localTime = useLocal()
  const bubbles = [
    { t: 0.5, x: 200,  y: 280, text: '“AI will replace us.”',         color: W.clay, rot: -3, w: 480 },
    { t: 2.0, x: 780,  y: 220, text: '“Just use it, it’s magic.”',     color: W.sage, rot:  2, w: 520 },
    { t: 3.5, x: 1340, y: 350, text: '“Don’t trust any of it.”',       color: W.sky,  rot: -4, w: 460 },
    { t: 5.0, x: 300,  y: 660, text: '“It knows everything.”',         color: W.sage, rot:  3, w: 480 },
    { t: 6.5, x: 1060, y: 680, text: '“It’s basically a human.”',      color: W.clay, rot: -2, w: 500 },
  ]
  const head = clamp(localTime / 0.8, 0, 1)
  return (
    <>
      <div style={kickerStyle(W.clay, head)}>CHAPTER ONE</div>
      <div style={headlineStyle(head, TYPE.headline)}>
        Before we explain what AI is,<br />let’s clear the noise.
      </div>
      {bubbles.map((b, i) => {
        const t = clamp((localTime - b.t) / 0.5, 0, 1)
        const e = Easing.easeOutBack(t)
        return (
          <div key={i} style={{
            position: 'absolute', left: b.x, top: b.y, width: b.w,
            background: b.color, color: W.cream, borderRadius: 28, padding: '28px 36px',
            fontFamily: W.display, fontSize: TYPE.myth, fontStyle: 'italic',
            boxShadow: '0 8px 24px rgba(42,38,32,0.14)', opacity: t,
            transform: `scale(${0.6 + 0.4 * e}) rotate(${b.rot * (0.5 + 0.5 * e)}deg)`,
            transformOrigin: 'center',
          }}>{b.text}</div>
        )
      })}
    </>
  )
}

// ── SCENE 3 — Definition ────────────────────────────────
export const Scene03 = () => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const cards = [
    { t: 2, label: 'Patterns',    icon: '◐' },
    { t: 3, label: 'Language',    icon: '¶' },
    { t: 4, label: 'Decisions',   icon: '⊕' },
    { t: 5, label: 'Generation',  icon: '✦' },
  ]
  return (
    <>
      <Blob cx={1700} cy={-80} r={360} color={W.clay} opacity={0.15} />
      <div style={kickerStyle(W.clay, head)}>DEFINITION</div>
      <div style={{
        position: 'absolute', left: 160, right: 500, top: 200,
        fontFamily: W.display, fontSize: 84, color: W.ink,
        letterSpacing: '-0.018em', lineHeight: 1.15, opacity: head, fontWeight: 500,
      }}>
        A field of computer science focused on systems that do things we call{' '}
        <span style={{ fontStyle: 'italic', color: W.clay }}>cognitive</span>.
      </div>
      <div style={{ position: 'absolute', left: 160, right: 160, top: 660, display: 'flex', gap: 32 }}>
        {cards.map((c, i) => {
          const t = clamp((localTime - c.t) / 0.6, 0, 1)
          const e = Easing.easeOutBack(t)
          return (
            <div key={i} style={{
              flex: 1, height: 320, background: W.cream, borderRadius: 28,
              border: `2px solid ${W.ink}10`, padding: 40,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              opacity: t, transform: `translateY(${(1 - e) * 30}px) scale(${0.9 + 0.1 * e})`,
            }}>
              <div style={{ fontFamily: W.display, fontSize: 110, color: W.clay, lineHeight: 1 }}>{c.icon}</div>
              <div style={{ fontFamily: W.sans, fontSize: TYPE.cardTitle, fontWeight: 500, color: W.ink }}>{c.label}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

// ── SCENE 4 — Key insight ───────────────────────────────
export const Scene04 = () => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const brainIn = Easing.easeOutBack(clamp((localTime - 1.5) / 0.7, 0, 1))
  const mathIn  = Easing.easeOutBack(clamp((localTime - 3.5) / 0.7, 0, 1))
  const x = clamp((localTime - 5) / 0.5, 0, 1)
  const tag = clamp((localTime - 8) / 0.8, 0, 1)
  return (
    <>
      <div style={kickerStyle(W.clay, head)}>KEY INSIGHT</div>
      <div style={headlineStyle(head, TYPE.headline)}>
        AI doesn’t think the way you do.
      </div>
      <div style={{
        position: 'absolute', left: 360, top: 480, width: 380, height: 380,
        opacity: brainIn, transform: `scale(${0.7 + 0.3 * brainIn})`,
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: W.sage, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: W.display, fontSize: 90, color: W.cream,
          boxShadow: '0 12px 40px rgba(42,38,32,0.12)',
        }}>Human</div>
        <div style={{ position: 'absolute', bottom: -64, left: 0, right: 0, textAlign: 'center', fontFamily: W.sans, fontSize: 36, color: W.muted }}>
          Understanding. Intention. Feeling.
        </div>
      </div>
      <div style={{
        position: 'absolute', left: 880, top: 620, width: 160, height: 160,
        opacity: x, transform: `scale(${0.3 + 0.7 * Easing.easeOutBack(x)}) rotate(${x * 90}deg)`,
      }}>
        <svg width="160" height="160" viewBox="0 0 160 160">
          <line x1="28" y1="28" x2="132" y2="132" stroke={W.clay} strokeWidth="12" strokeLinecap="round" />
          <line x1="132" y1="28" x2="28" y2="132" stroke={W.clay} strokeWidth="12" strokeLinecap="round" />
        </svg>
      </div>
      <div style={{
        position: 'absolute', left: 1180, top: 480, width: 380, height: 380,
        opacity: mathIn, transform: `scale(${0.7 + 0.3 * mathIn})`,
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: W.clay, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: W.display, fontSize: 90, color: W.cream,
          boxShadow: '0 12px 40px rgba(42,38,32,0.12)',
        }}>AI</div>
        <div style={{ position: 'absolute', bottom: -64, left: 0, right: 0, textAlign: 'center', fontFamily: W.sans, fontSize: 36, color: W.muted }}>
          Statistical patterns. Math.
        </div>
      </div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 70, textAlign: 'center',
        fontFamily: W.display, fontSize: TYPE.callout, color: W.ink, fontStyle: 'italic',
        opacity: tag,
        transform: `translateY(${(1 - Easing.easeOutCubic(tag)) * 16}px)`,
      }}>
        Different process. Different thing.
      </div>
    </>
  )
}

// ── SCENE 5 — What it does well ─────────────────────────
export const Scene05 = () => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const caps = [
    ['Pattern recognition', 'In text, images, and data.'],
    ['Text generation',     'Paragraphs, emails, rubrics.'],
    ['Translation',         'Dozens of languages, real time.'],
    ['Summarization',       'Long docs → the gist.'],
    ['Image generation',    'From a written description.'],
    ['Question answering',  'Based on training data.'],
  ]
  return (
    <>
      <div style={kickerStyle(W.sage, head)}>WHAT IT DOES WELL</div>
      <div style={headlineStyle(head, TYPE.headline)}>
        The things <span style={{ color: W.sage }}>really</span> worth using it for.
      </div>
      <div style={{ position: 'absolute', left: 160, right: 160, top: 420, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
        {caps.map((c, i) => {
          const t = clamp((localTime - 1 - i * 0.7) / 0.6, 0, 1)
          const e = Easing.easeOutBack(t)
          return (
            <div key={i} style={{
              background: W.cream, borderRadius: 24, padding: '36px 40px', minHeight: 240,
              opacity: t, transform: `translateY(${(1 - e) * 30}px)`,
              border: `2px solid ${W.sage}22`,
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: W.sage, marginBottom: 24 }} />
              <div style={{ fontFamily: W.sans, fontSize: TYPE.cardTitle, fontWeight: 600, color: W.ink, marginBottom: 10, lineHeight: 1.15 }}>{c[0]}</div>
              <div style={{ fontFamily: W.sans, fontSize: 38, color: W.muted, lineHeight: 1.35 }}>{c[1]}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

// ── SCENE 6 — What it can't do ──────────────────────────
export const Scene06 = () => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const items = [
    ['Understand meaning',    'Only the statistics of words.'],
    ['Feel anything',         'Opinions aren’t real opinions.'],
    ['Guarantee truth',       'It hallucinates — confidently.'],
    ['Replace your judgment', 'Reading a room. Reading a student.'],
  ]
  return (
    <>
      <div style={kickerStyle(W.clay, head)}>WHAT IT CAN’T DO</div>
      <div style={headlineStyle(head, TYPE.headline)}>
        And the limits, honestly.
      </div>
      <div style={{ position: 'absolute', left: 160, right: 160, top: 440, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        {items.map((c, i) => {
          const t = clamp((localTime - 1 - i * 2.5) / 0.6, 0, 1)
          const e = Easing.easeOutBack(t)
          return (
            <div key={i} style={{
              background: W.cream, borderRadius: 24, padding: '42px 48px', minHeight: 220, position: 'relative',
              opacity: t, transform: `translateY(${(1 - e) * 30}px)`,
              border: `2px solid ${W.clay}33`,
            }}>
              <div style={{ position: 'absolute', top: 26, right: 32, fontFamily: W.display, fontSize: 40, color: W.clay }}>✕</div>
              <div style={{ fontFamily: W.sans, fontSize: TYPE.cardTitle, fontWeight: 600, color: W.ink, marginBottom: 14, lineHeight: 1.15 }}>{c[0]}</div>
              <div style={{ fontFamily: W.sans, fontSize: 38, color: W.muted, lineHeight: 1.35 }}>{c[1]}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

// ── SCENE 7 — Three myths ───────────────────────────────
export const Scene07 = () => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const myths = [
    { q: 'AI knows everything.',           a: 'No. It learned patterns up to a cutoff. It invents.' },
    { q: 'AI will replace teachers.',      a: 'No. It’s a tool — like the calculator was a tool.' },
    { q: 'AI understands what I’m saying.', a: 'No. It matches patterns. That isn’t understanding.' },
  ]
  return (
    <>
      <Blob cx={-100} cy={900} r={340} color={W.sage} opacity={0.18} />
      <div style={kickerStyle(W.clay, head)}>THREE MYTHS</div>
      <div style={headlineStyle(head, TYPE.headline)}>
        Three things teachers hear — and why they’re wrong.
      </div>
      <div style={{ position: 'absolute', left: 160, right: 160, top: 440 }}>
        {myths.map((m, i) => {
          const t = clamp((localTime - 0.8 - i * 5.5) / 0.6, 0, 1)
          const e = Easing.easeOutBack(t)
          const stamp = clamp((localTime - 0.8 - i * 5.5 - 1.5) / 0.5, 0, 1)
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
                “{m.q}”
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
              }}>{m.a}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

// ── SCENE 8 — Chatbot vs LLM ────────────────────────────
export const Scene08 = () => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const phone = clamp((localTime - 1.5) / 0.6, 0, 1)
  const llm   = clamp((localTime - 4) / 0.6, 0, 1)
  const wire  = clamp((localTime - 5.5) / 1, 0, 1)
  const tag   = clamp((localTime - 8) / 0.6, 0, 1)
  return (
    <>
      <div style={kickerStyle(W.clay, head)}>A USEFUL DISTINCTION</div>
      <div style={headlineStyle(head, TYPE.headline)}>
        A chatbot is not the AI.
      </div>
      <Card x={200} y={460} w={500} h={440} color={W.cream} t={phone}>
        <div style={{ padding: 48 }}>
          <div style={{ fontFamily: W.mono, fontSize: TYPE.monoLabel, letterSpacing: '0.25em', color: W.muted, fontWeight: 600 }}>INTERFACE</div>
          <div style={{ fontFamily: W.display, fontSize: TYPE.cardTitleLg, color: W.ink, marginTop: 18, fontWeight: 500 }}>Chatbot</div>
          <div style={{ fontFamily: W.sans, fontSize: 30, color: W.muted, marginTop: 26, lineHeight: 1.4 }}>
            The phone you use to talk to the AI. ChatGPT, Claude, Gemini — these are doors.
          </div>
        </div>
      </Card>
      <div style={{
        position: 'absolute', left: 700, top: 680, width: 520, height: 5,
        background: W.ink, opacity: 0.2,
        transformOrigin: 'left center',
        transform: `scaleX(${Easing.easeOutCubic(wire)})`,
      }} />
      <Card x={1220} y={460} w={500} h={440} color={W.clay} t={llm}>
        <div style={{ padding: 48, color: W.cream }}>
          <div style={{ fontFamily: W.mono, fontSize: TYPE.monoLabel, letterSpacing: '0.25em', opacity: 0.75, fontWeight: 600 }}>SYSTEM</div>
          <div style={{ fontFamily: W.display, fontSize: TYPE.cardTitleLg, marginTop: 18, fontWeight: 500 }}>LLM</div>
          <div style={{ fontFamily: W.sans, fontSize: 30, marginTop: 26, lineHeight: 1.4, opacity: 0.92 }}>
            The actual AI on the other end. Large Language Model. Also powers translation, images, code.
          </div>
        </div>
      </Card>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 60, textAlign: 'center',
        fontFamily: W.display, fontSize: TYPE.callout, fontStyle: 'italic', color: W.ink, opacity: tag,
      }}>
        One is the phone. One is the voice.
      </div>
    </>
  )
}

// ── SCENE 9 — Narrow vs general ─────────────────────────
export const Scene09 = () => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const chips = [
    { t: 1.5, x: 200,  y: 400, text: 'Write',      color: W.clay },
    { t: 2.2, x: 420,  y: 460, text: 'Translate',  color: W.sage },
    { t: 2.9, x: 720,  y: 400, text: 'Summarize',  color: W.sky  },
    { t: 3.6, x: 1020, y: 470, text: 'See images', color: W.clay },
    { t: 4.3, x: 1310, y: 400, text: 'Recommend',  color: W.sage },
    { t: 5.0, x: 1570, y: 460, text: 'Transcribe', color: W.sky  },
  ]
  const agi = clamp((localTime - 7) / 0.8, 0, 1)
  return (
    <>
      <div style={kickerStyle(W.clay, head)}>NARROW vs GENERAL</div>
      <div style={headlineStyle(head, TYPE.headline)}>
        Every tool is a <span style={{ fontStyle: 'italic', color: W.clay }}>specialist</span>.
      </div>
      {chips.map((c, i) => {
        const t = clamp((localTime - c.t) / 0.4, 0, 1)
        const e = Easing.easeOutBack(t)
        return (
          <div key={i} style={{
            position: 'absolute', left: c.x, top: c.y,
            background: c.color, color: W.cream, padding: '24px 38px', borderRadius: 999,
            fontFamily: W.sans, fontSize: TYPE.pill, fontWeight: 500,
            boxShadow: '0 6px 18px rgba(42,38,32,0.12)',
            opacity: t, transform: `scale(${0.5 + 0.5 * e})`,
          }}>{c.text}</div>
        )
      })}
      <div style={{
        position: 'absolute', left: 160, right: 160, top: 760,
        fontFamily: W.display, fontSize: TYPE.callout, color: W.muted, opacity: agi, lineHeight: 1.3,
      }}>
        A general AI — one thing that does them all, like a human —
        <span style={{ color: W.ink, fontStyle: 'italic' }}> doesn’t exist yet.</span>
      </div>
    </>
  )
}

// ── SCENE 10 — Already in education ─────────────────────
export const Scene10 = () => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  // Reduced from 10 to 8 — at larger pill font (44px) more than 8 don't fit
  // cleanly. Removed DeepL (overlaps with Google Translate) and YouTube (less
  // pedagogically specific than the others).
  const tools = [
    'Khan Academy', 'Duolingo', 'Google Translate',
    'Grammarly', 'ChatGPT', 'Claude', 'Gemini',
    'Autograders',
  ]
  return (
    <>
      <div style={kickerStyle(W.sage, head)}>ALREADY IN EDUCATION</div>
      <div style={headlineStyle(head, TYPE.headline)}>
        You’ve used it for years.
      </div>
      <div style={{ position: 'absolute', left: 160, right: 160, top: 420, display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {tools.map((tname, i) => {
          const t = clamp((localTime - 1 - i * 0.25) / 0.4, 0, 1)
          const e = Easing.easeOutBack(t)
          const color = i % 3 === 0 ? W.clay : i % 3 === 1 ? W.sage : W.sky
          return (
            <div key={i} style={{
              background: W.cream, color: W.ink, padding: '30px 44px', borderRadius: 999,
              fontFamily: W.sans, fontSize: TYPE.pill, fontWeight: 500,
              border: `3px solid ${color}`,
              opacity: t, transform: `scale(${0.6 + 0.4 * e})`,
            }}>{tname}</div>
          )
        })}
      </div>
    </>
  )
}

// ── SCENE 11 — You already have the skills ──────────────
export const Scene11 = () => {
  const localTime = useLocal()
  const head = clamp(localTime / 0.8, 0, 1)
  const skills = [
    ['Setting clear goals',  'Lesson plans = prompts.'],
    ['Structuring tasks',    'You scaffold every day.'],
    ['Evaluating quality',   'You already grade work.'],
    ['Iterating on results', 'You adjust when it doesn’t land.'],
  ]
  return (
    <>
      <div style={kickerStyle(W.sage, head)}>GOOD NEWS</div>
      <div style={headlineStyle(head, TYPE.headline)}>
        You already have the skills.
      </div>
      <div style={{ position: 'absolute', left: 160, right: 160, top: 460, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        {skills.map((s, i) => {
          const t = clamp((localTime - 1.2 - i * 1.5) / 0.6, 0, 1)
          const e = Easing.easeOutBack(t)
          return (
            <div key={i} style={{
              background: W.sage, color: W.cream, padding: '36px 42px', borderRadius: 28,
              minHeight: 200,
              opacity: t, transform: `translateY(${(1 - e) * 30}px)`,
            }}>
              <div style={{ fontFamily: W.mono, fontSize: TYPE.monoSmall, letterSpacing: '0.2em', opacity: 0.8, fontWeight: 600 }}>0{i + 1}</div>
              <div style={{ fontFamily: W.display, fontSize: TYPE.cardTitle, marginTop: 14, fontWeight: 500, lineHeight: 1.15 }}>{s[0]}</div>
              <div style={{ fontFamily: W.sans, fontSize: 32, marginTop: 14, opacity: 0.92, lineHeight: 1.35 }}>{s[1]}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}

// ── SCENE 12 — Closing ──────────────────────────────────
export const Scene12 = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const localTime = frame / fps
  const progress = clamp(localTime / 1.5, 0, 1)
  const t = Easing.easeOutCubic(progress)
  return (
    <>
      <Blob cx={960} cy={540} r={t * 380} color={W.clay} opacity={0.15} />
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 36,
      }}>
        <div style={{
          fontFamily: W.display, fontSize: TYPE.closing, color: W.ink,
          letterSpacing: '-0.025em', fontWeight: 500,
          opacity: t, transform: `translateY(${(1 - t) * 20}px)`,
        }}>
          Use it with <span style={{ fontStyle: 'italic', color: W.clay }}>judgment</span>.
        </div>
        <div style={{
          fontFamily: W.mono, fontSize: 26, color: W.muted,
          letterSpacing: '0.25em', opacity: t * 0.7, fontWeight: 600,
        }}>AI4TEACHERS · NEXT LESSON →</div>
      </div>
    </>
  )
}
