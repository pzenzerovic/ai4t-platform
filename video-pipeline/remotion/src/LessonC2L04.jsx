// Lesson C2L04 — Meta-prompting
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, QuoteScene, DefinitionScene, TwoColumnScene,
  CycleStepsScene, CardGridScene, BulletListScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c2-l04'

const SCENES = [
  { dur: 7, component: () => (
    <TitleScene
      title="Meta-prompting"
      subtitle="Thinking before you ask"
      kicker="AI4TEACHERS · 04"
    />
  )},
  { dur: 13.1, component: () => (
    <QuoteScene
      kicker="THE SITUATION"
      quote="I know the problem. I just don't know what the solution should look like."
    />
  )},
  { dur: 9.6, component: () => (
    <DefinitionScene
      kicker="META-PROMPTING"
      headline="Prompting about prompting."
      italicTerm="about prompting"
      flow={['Problem', 'Dialogue', 'Prompt']}
      tagline="Not the answer — the process of arriving at it."
    />
  )},
  { dur: 13.2, component: () => (
    <BulletListScene
      kicker="A NATURAL EXTENSION"
      headline="Reflective practice — with a partner."
      items={[
        { text: 'What do I want to achieve?' },
        { text: 'Which approach suits this group?' },
        { text: 'How will I know it worked?' },
      ]}
      accent={W.sage}
    />
  )},
  { dur: 15.3, component: () => (
    <TwoColumnScene
      kicker="TWO VERSIONS"
      headline="Both useful — for different moments."
      left={{
        label: '1.0',
        title: 'Improve a draft',
        bullets: [
          'You have a prompt already',
          'Ask: how could I improve this?',
          'Rewrite using suggestions',
        ],
      }}
      right={{
        label: '2.0',
        title: 'Explore options',
        bullets: [
          'You only have a problem',
          'Ask: what are my options?',
          'Then write the real prompt',
        ],
      }}
    />
  )},
  { dur: 14.3, component: () => (
    <CycleStepsScene
      kicker="THE META-PROMPTING CYCLE"
      headline="Four moves before the final ask."
      steps={[
        { title: 'Explore',  sub: 'What are my options?' },
        { title: 'Decide',   sub: 'Pick the approach' },
        { title: 'Prompt',   sub: 'Write the specific request' },
        { title: 'Refine',   sub: 'Iterate on the output' },
      ]}
      tagline="The dialogue does the thinking."
    />
  )},
  { dur: 12.3, component: () => (
    <CardGridScene
      kicker="WHEN TO USE IT"
      headline="Four good moments."
      columns={2}
      accent={W.sky}
      items={[
        { title: 'Problem, not solution', body: 'You don\'t yet know the form.' },
        { title: 'Complex task',          body: 'Multiple components to plan.' },
        { title: 'Compare approaches',    body: 'Before committing time.' },
        { title: 'Learning to prompt',    body: 'The dialogue teaches you.' },
      ]}
    />
  )},
  { dur: 12.2, component: () => (
    <QuoteScene
      kicker="THE LIMIT"
      quote="For simple, well-defined tasks — direct prompting is enough."
    />
  )},
  { dur: 4.2, component: () => (
    <ClosingScene
      tagline="Think first. Then ask."
      italicWord="first"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC2L04 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c2-l04/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
