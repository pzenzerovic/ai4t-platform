// Lesson C3L02 — AI as a Tutor
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, DefinitionScene, BulletListScene, CardGridScene,
  ProcessFlowScene, MythBustScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c3-l02'

const SCENES = [
  { dur: 8, component: () => (
    <TitleScene
      title="AI as a Tutor"
      italicWord="Tutor"
      subtitle="Guided learning, one question at a time"
      kicker="AI4TEACHERS · 02"
    />
  )},
  { dur: 18, component: () => (
    <DefinitionScene
      kicker="DEFINITION"
      headline="A tutor asks questions. A tool delivers answers."
      italicTerm="asks questions"
      flow={['Diagnose', 'Guide', 'Adapt']}
      tagline="Set AI up to teach — not to solve."
    />
  )},
  { dur: 19, component: () => (
    <CardGridScene
      kicker="HOW TO ACTIVATE"
      headline="Three ways to put AI in tutor mode."
      columns={3}
      accent={W.sage}
      items={[
        { title: 'ChatGPT',  body: 'Use the Study and Learn mode in settings.' },
        { title: 'Claude',   body: 'Choose the Learning response style.' },
        { title: 'Any tool', body: 'Prompt: do not give me the answer — guide me step by step.' },
      ]}
    />
  )},
  { dur: 20, component: () => (
    <ProcessFlowScene
      kicker="THE TUTORING PATTERN"
      headline="A familiar rhythm to any experienced teacher."
      steps={[
        { title: 'Diagnose',  sub: 'What do you already know?' },
        { title: 'Question',  sub: 'What is the next step?' },
        { title: 'Adapt',     sub: 'Simpler or harder' },
        { title: 'Scaffold',  sub: 'Confirm and continue' },
      ]}
      tagline="The AI provides structure. The student does the thinking."
    />
  )},
  { dur: 20, component: () => (
    <BulletListScene
      kicker="EXAMPLE · MATHS"
      headline="A Year 6 student solves 2x + 3 = 11."
      items={[
        { text: 'AI asks: what is preventing x from being alone?' },
        { text: 'Student identifies the +3' },
        { text: 'AI asks: what do we do to both sides?' },
        { text: 'Student reasons, the AI confirms, step by step' },
      ]}
      accent={W.sky}
    />
  )},
  { dur: 18, component: () => (
    <DefinitionScene
      kicker="ADAPTIVE DIFFICULTY"
      headline="The AI keeps the student in the zone of growth."
      italicTerm="zone of growth"
      flow={['Struggle', '↔', 'Stretch']}
      tagline="Personalised differentiation — automatic and on demand."
    />
  )},
  { dur: 19, component: () => (
    <MythBustScene
      kicker="THE LIMITS"
      headline="What the digital tutor cannot do."
      myths={[
        { myth: 'It reads body language and frustration.', reality: 'It cannot. It has no awareness of the student’s state.' },
        { myth: 'It understands what it is teaching.',     reality: 'It produces statistical responses. It can be confidently wrong.' },
      ]}
    />
  )},
  { dur: 18, component: () => (
    <BulletListScene
      kicker="THE TEACHER'S ROLE"
      headline="The AI is the tool. You are the architect."
      items={[
        { text: 'Teach students how to prompt for guided learning' },
        { text: 'Design the learning context and objectives' },
        { text: 'Monitor and review tutoring transcripts' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene
      tagline="Patient tutor. Human architect."
      italicWord="architect"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC3L02 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c3-l02/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
