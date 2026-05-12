// Lesson C1L03 — A Brief History of AI

import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, BulletListScene, TimelineScene, QuoteScene,
  DefinitionScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c1-l03'

const SCENES = [
  { dur: 10, component: () => (
    <TitleScene
      title="A Brief History of AI"
      subtitle="Seventy years of attempts, failures, and breakthroughs"
      kicker="AI4TEACHERS · 03"
    />
  )},
  { dur: 14, component: () => (
    <BulletListScene
      kicker="WHY HISTORY MATTERS"
      headline="Two reasons for teachers to care."
      items={[
        { text: 'It explains why AI has been talked about for decades' },
        { text: 'It shows why this moment is genuinely different' },
      ]}
      accent={W.clay}
      numbered={true}
    />
  )},
  { dur: 24, component: () => (
    <TimelineScene
      kicker="FIVE TURNING POINTS"
      headline="The shape of seven decades of AI."
      events={[
        { year: '1950',  label: 'The Turing question', sub: 'Can machines think?' },
        { year: '1960s', label: 'Symbolic AI',         sub: 'ELIZA, early reasoning' },
        { year: '1970s', label: 'First AI winter',     sub: 'Funding collapses' },
        { year: '1997',  label: 'Deep Blue',           sub: 'Beats Kasparov at chess' },
        { year: '2010s', label: 'Deep learning',       sub: 'Neural networks scale' },
        { year: '2022',  label: 'ChatGPT',             sub: 'AI for everyone' },
      ]}
    />
  )},
  { dur: 16, component: () => (
    <QuoteScene
      kicker="KEY INSIGHT"
      quote="AI's progress has never been linear."
      attribution="A lesson from seven decades"
    />
  )},
  { dur: 16, component: () => (
    <DefinitionScene
      kicker="WHY NOW IS DIFFERENT"
      headline="Two things changed at once."
      flow={['Better', '+', 'Accessible']}
      tagline="From a specialist topic to a daily tool."
    />
  )},
  { dur: 18, component: () => (
    <BulletListScene
      kicker="NOVEMBER 2022"
      headline="The day AI became a daily tool."
      items={[
        { text: 'ChatGPT released to the public' },
        { text: 'No coding required — just type' },
        { text: 'Teachers, students, everyone — same day' },
      ]}
      accent={W.clay}
    />
  )},
  { dur: 22, component: () => (
    <BulletListScene
      kicker="WHAT THIS MEANS FOR YOU"
      headline="The teachers who navigate this best…"
      items={[
        { text: 'Understand AI is powerful but imperfect' },
        { text: 'Know it took decades to get here' },
        { text: 'Treat it as work in progress, not magic' },
      ]}
      accent={W.sage}
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene
      tagline="Old question. New answer."
      italicWord="New"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC1L03 = () => (
  <AbsoluteFill style={{
    background: W.bg,
    WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale',
    textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1
      const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)} durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC />
          <Audio src={staticFile(`audio/c1-l03/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
