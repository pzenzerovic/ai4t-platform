// Lesson C1L05 — Understanding AI's Limitations
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, DefinitionScene, CardGridScene, BulletListScene,
  QuoteScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c1-l05'

const SCENES = [
  { dur: 11, component: () => (
    <TitleScene title="AI's Limitations"
      subtitle="What it cannot do — and what that means for you"
      kicker="AI4TEACHERS · 05" />
  )},
  { dur: 18, component: () => (
    <DefinitionScene
      kicker="HALLUCINATION"
      headline="Confident output. Factually wrong."
      italicTerm="Confident"
      flow={['Plausible', '≠', 'True']}
      tagline="Not a bug — a feature of how LLMs work."
    />
  )},
  { dur: 17, component: () => (
    <CardGridScene
      kicker="WHAT AI IS GOOD AT"
      headline="Use it generously here."
      columns={3}
      accent={W.sage}
      items={[
        { title: 'First drafts',   body: 'Lesson plans, materials, communications.' },
        { title: 'Brainstorming',  body: 'Discussion questions, project ideas.' },
        { title: 'Reformatting',   body: 'Different reading levels, different formats.' },
      ]}
    />
  )},
  { dur: 18, component: () => (
    <CardGridScene
      kicker="WHAT AI STRUGGLES WITH"
      headline="Verify these. Always."
      columns={3}
      accent={W.clay}
      items={[
        { title: 'Factual precision',   body: 'Dates, statistics, citations.' },
        { title: 'Math reasoning',      body: 'Multi-step problems.' },
        { title: 'Current events',      body: 'Anything after training cutoff.' },
      ]}
    />
  )},
  { dur: 19, component: () => (
    <DefinitionScene
      kicker="CONTEXT WINDOW"
      headline="The AI's working memory has a limit."
      italicTerm="working memory"
      flow={['Long chat', '→', 'Drops oldest']}
      tagline="Provide critical info upfront, in one message."
    />
  )},
  { dur: 19, component: () => (
    <BulletListScene
      kicker="PRACTICAL STRATEGIES"
      headline="Three habits that catch trouble early."
      items={[
        { text: 'Review every AI output before classroom use' },
        { text: 'Verify specific facts independently' },
        { text: 'Treat AI as a first draft, not a final source' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 14, component: () => (
    <QuoteScene
      kicker="A TEACHING OPPORTUNITY"
      quote="Teaching students about AI limitations is itself a critical thinking lesson."
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene tagline="Your expertise. More important, not less."
      italicWord="More" kicker="AI4TEACHERS · NEXT LESSON →" />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC1L05 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c1-l05/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
