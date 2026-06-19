// Lesson C1L07 — The Layers of AI
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, BulletListScene, StackScene, TwoColumnScene,
  DefinitionScene, QuoteScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c1-l07'

const SCENES = [
  { dur: 7.6, component: () => (
    <TitleScene
      title="The Layers of AI"
      subtitle="From chatbots to agent systems"
      kicker="AI4TEACHERS · 07"
    />
  )},
  { dur: 11.6, component: () => (
    <BulletListScene
      kicker="WHY THINK IN LAYERS"
      headline="A mental map, not a hierarchy."
      items={[
        { text: 'Know what is possible' },
        { text: 'Set realistic expectations' },
        { text: 'See where the tools are heading' },
      ]}
      accent={W.clay}
      numbered={true}
    />
  )},
  { dur: 14.5, component: () => (
    <StackScene
      kicker="SIX LAYERS"
      headline="Each layer extends the one below."
      layers={[
        { title: 'Layer 6 — Agent systems',  sub: 'Multiple agents collaborate',     color: W.clay },
        { title: 'Layer 5 — Agents',         sub: 'Goal-driven, plans its own steps', color: W.clay },
        { title: 'Layer 4 — Computer use',   sub: 'Operates apps and files',          color: W.sky },
        { title: 'Layer 3 — Tool use',       sub: 'Searches, analyzes, calculates',   color: W.sky },
        { title: 'Layer 2 — Multimodal',     sub: 'Images, audio, video',             color: W.sage },
        { title: 'Layer 1 — Chatbot',        sub: 'Text in, text out',                color: W.sage },
      ]}
    />
  )},
  { dur: 13.3, component: () => (
    <TwoColumnScene
      kicker="LAYERS 1 & 2"
      headline="Where most teachers work today."
      left={{
        label: 'LAYER 1',
        title: 'Chatbot',
        bullets: [
          'Explain concepts',
          'Draft worksheets',
          'Brainstorm ideas',
        ],
      }}
      right={{
        label: 'LAYER 2',
        title: 'Multimodal',
        bullets: [
          'Analyze student work',
          'Generate diagrams',
          'Transcribe audio',
        ],
      }}
    />
  )},
  { dur: 12.7, component: () => (
    <DefinitionScene
      kicker="LAYER 3"
      headline="From knowing things to finding things out."
      italicTerm="finding things out"
      flow={['Search', 'Analyze', 'Calculate']}
      tagline="Models gain access to external tools."
    />
  )},
  { dur: 12.1, component: () => (
    <TwoColumnScene
      kicker="LAYERS 4 & 5"
      headline="From operating tools to setting goals."
      left={{
        label: 'LAYER 4',
        title: 'Computer use',
        bullets: [
          'Opens apps',
          'Clicks buttons',
          'Fills forms',
        ],
      }}
      right={{
        label: 'LAYER 5',
        title: 'Agents',
        bullets: [
          'You give a goal',
          'It plans the steps',
          'It executes',
        ],
      }}
    />
  )},
  { dur: 12.4, component: () => (
    <BulletListScene
      kicker="LAYER 6 — AGENT SYSTEMS"
      headline="A team of AIs, each with a role."
      items={[
        { text: 'One researches the topic' },
        { text: 'One designs the lesson' },
        { text: 'One builds the assessment' },
        { text: 'One checks for quality' },
      ]}
      accent={W.clay}
      numbered={true}
    />
  )},
  { dur: 11, component: () => (
    <QuoteScene
      kicker="THE TEACHER'S ROLE"
      quote="As AI gets more capable, the teacher becomes more important — not less."
    />
  )},
  { dur: 5.7, component: () => (
    <ClosingScene
      tagline="One map. Six layers."
      italicWord="Six"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC1L07 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c1-l07/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
