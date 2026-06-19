// Lesson C1L04 — How Large Language Models Work
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, BulletListScene, ConceptCirclesScene, DefinitionScene,
  ProcessFlowScene, QuoteScene, CardGridScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c1-l04'

const SCENES = [
  { dur: 8.6, component: () => (
    <TitleScene
      title="How LLMs Work"
      subtitle="No engineering background required"
      kicker="AI4TEACHERS · 04"
    />
  )},
  { dur: 11.1, component: () => (
    <BulletListScene
      kicker="WHY THE MECHANISM MATTERS"
      headline="Three things change when you understand it."
      items={[
        { text: 'You stop being surprised by hallucinations' },
        { text: 'You write better prompts' },
        { text: 'You know when to trust the output' },
      ]}
      accent={W.clay}
      numbered={true}
    />
  )},
  { dur: 15.7, component: () => (
    <CardGridScene
      kicker="WHAT AN LLM IS NOT"
      headline="Not a database. Not a search engine. Not understanding."
      columns={3}
      accent={W.clay}
      items={[
        { title: 'Not a database',     body: 'It does not look up facts.' },
        { title: 'Not a search engine',body: 'It does not retrieve existing text.' },
        { title: 'Not understanding',  body: 'It does not know meaning the way you do.' },
      ]}
    />
  )},
  { dur: 16.9, component: () => (
    <DefinitionScene
      kicker="TOKENS"
      headline="LLMs work with chunks, not words."
      italicTerm="chunks"
      flow={['"understanding"', '→', 'under + standing']}
      tagline="Which is why AI sometimes can't count letters in a word."
    />
  )},
  { dur: 14, component: () => (
    <ProcessFlowScene
      kicker="GENERATION"
      headline="Word by word. One token at a time."
      steps={[
        { title: 'Prompt',      sub: 'Your text in' },
        { title: 'Tokenise',    sub: 'Break into chunks' },
        { title: 'Predict',     sub: 'Most likely next token' },
        { title: 'Emit + loop', sub: 'Add it, repeat' },
      ]}
      tagline="No plan. Just statistical next-token prediction."
    />
  )},
  { dur: 16.9, component: () => (
    <QuoteScene
      kicker="THE KEY INSIGHT"
      quote="The model does not plan its response. It builds it word by word."
    />
  )},
  { dur: 17.4, component: () => (
    <ConceptCirclesScene
      kicker="CONTEXT"
      headline="The model's working memory."
      left={{
        label: 'IN',
        caption: 'Whole conversation up to now',
        color: W.sage,
      }}
      right={{
        label: 'OUT',
        caption: 'Predictions based on it',
        color: W.clay,
      }}
      connector="arrow"
      tagline="When conversation gets too long, the earliest parts drop out."
    />
  )},
  { dur: 15.6, component: () => (
    <QuoteScene
      kicker="A USEFUL MENTAL MODEL"
      quote="Think of it as the world's most well-read parrot."
    />
  )},
  { dur: 16.1, component: () => (
    <BulletListScene
      kicker="WHAT THIS MEANS"
      headline="Three habits for your practice."
      items={[
        { text: 'Write clearer prompts',           sub: 'Better patterns produce better output.' },
        { text: 'Verify factual claims',           sub: 'Dates, statistics, citations.' },
        { text: 'Provide context all at once',     sub: 'Don\'t rely on memory across many messages.' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 5.5, component: () => (
    <ClosingScene
      tagline="Patterns in. Plausible text out."
      italicWord="Plausible"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC1L04 = () => (
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
          <Audio src={staticFile(`audio/c1-l04/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
