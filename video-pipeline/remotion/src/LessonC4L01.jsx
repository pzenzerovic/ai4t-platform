// Lesson C4L01 — AI and Accessibility — An Overview
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, BulletListScene, CardGridScene, PillCloudScene,
  DefinitionScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c4-l01'

const SCENES = [
  { dur: 10.3, component: () => (
    <TitleScene
      title="AI and Accessibility"
      subtitle="A bridge between the barrier and the support"
      kicker="AI4TEACHERS · 01"
    />
  )},
  { dur: 14.3, component: () => (
    <BulletListScene
      kicker="THE GAP"
      headline="Traditional support is real — but not always present."
      items={[
        { text: 'Assistants',         sub: 'Not always available' },
        { text: 'Adapted materials',  sub: 'Require advance planning' },
        { text: 'Translations',       sub: 'Often arrive late' },
      ]}
      accent={W.clay}
      numbered={false}
    />
  )},
  { dur: 11.6, component: () => (
    <CardGridScene
      kicker="FOUR CORE AREAS"
      headline="Different barriers. Different bridges."
      columns={2}
      accent={W.sage}
      items={[
        { title: 'Vision',     body: 'Reading and interpreting visual content.' },
        { title: 'Hearing',    body: 'Transcribing spoken content.' },
        { title: 'Cognitive',  body: 'Simplifying and restructuring text.' },
        { title: 'Language',   body: 'Translating and adapting language level.' },
      ]}
    />
  )},
  { dur: 17.7, component: () => (
    <DefinitionScene
      kicker="THE PRINCIPLE"
      headline="Real-time adaptation, at the moment of need."
      italicTerm="Real-time"
      flow={['Barrier', 'AI', 'Access']}
      tagline="Complements advance preparation — does not replace it."
    />
  )},
  { dur: 12.3, component: () => (
    <PillCloudScene
      kicker="THE TOOLKIT"
      headline="Most run on the phone in a student's pocket."
      items={[
        'ChatGPT', 'Claude', 'Otter.ai', 'Microsoft Immersive Reader',
        'Goblin Tools', 'ARASAAC', 'Read&Write', 'Copilot',
      ]}
      accent={W.sky}
    />
  )},
  { dur: 14.4, component: () => (
    <CardGridScene
      kicker="WHAT AI CANNOT DO"
      headline="Outputs are approximations — not certainties."
      columns={3}
      accent={W.clay}
      items={[
        { title: 'Assess needs',     body: 'It cannot judge individual learners.' },
        { title: 'Set the level',    body: 'It simplifies as asked, not as right.' },
        { title: 'Replace support',  body: 'Emotional and social work stays human.' },
      ]}
    />
  )},
  { dur: 14.7, component: () => (
    <BulletListScene
      kicker="THE TEACHER'S ROLE"
      headline="Three functions in every accessibility moment."
      items={[
        { text: 'Gatekeeper',         sub: 'Decide when AI is appropriate.' },
        { text: 'Quality controller', sub: 'Review the adapted output.' },
        { text: 'Learning designer',  sub: 'Fit the tool into the lesson.' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 11.6, component: () => (
    <BulletListScene
      kicker="A STARTING POINT"
      headline="Practical access that didn't exist before."
      items={[
        { text: 'Tools already exist',     sub: 'No specialised equipment required.' },
        { text: 'No technical expertise',  sub: 'Same platforms you already use.' },
        { text: 'Try this week',           sub: 'One student, one barrier, one tool.' },
      ]}
      accent={W.sky}
      numbered={false}
    />
  )},
  { dur: 4.5, component: () => (
    <ClosingScene
      tagline="A bridge. In real time."
      italicWord="bridge"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC4L01 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c4-l01/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
