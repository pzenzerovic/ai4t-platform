// Lesson C2L04 — Meta-prompting
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, QuoteScene, DefinitionScene,
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
    <BulletListScene
      kicker="VERSION 1.0"
      headline="Improving an existing prompt."
      items={[
        { text: 'You have a draft prompt' },
        { text: 'Ask: how could I improve this for a more precise result?' },
        { text: 'Rewrite using the suggestions' },
      ]}
      accent={W.clay}
      numbered={true}
    />
  )},
  { dur: 14.3, component: () => (
    <BulletListScene
      kicker="VERSION 2.0"
      headline="Exploring options before you commit."
      items={[
        { text: 'Start with no prompt — just the problem' },
        { text: 'Ask: what are my options?' },
        { text: 'Pick an approach — then write the prompt' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 12.3, component: () => (
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
  { dur: 12.2, component: () => (
    <CardGridScene
      kicker="WHEN TO USE IT"
      headline="Four good moments."
      columns={2}
      accent={W.sky}
      items={[
        { title: 'Problem, not solution', body: 'You don\'t yet know the form.' },
        { title: 'Complex task',          body: 'Multiple components to plan.' },
        { title: 'Compare approaches',    body: 'Before committing time.' },
        { title: 'Simple, well-defined',  body: 'Skip it — direct prompting is enough.' },
      ]}
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
