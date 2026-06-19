// Lesson C3L01 — From Answers to Learning
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, BulletListScene, QuoteScene, EqualityScene,
  DefinitionScene, TwoColumnScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c3-l01'

const SCENES = [
  { dur: 4.6, component: () => (
    <TitleScene
      title="From Answers to Learning"
      italicWord="Learning"
      subtitle="A paradigm shift for the AI classroom"
      kicker="AI4TEACHERS · 01"
    />
  )},
  { dur: 12.4, component: () => (
    <BulletListScene
      kicker="THE DEFAULT PATTERN"
      headline="What students do first."
      items={[
        { text: 'Ask',     sub: 'Type the task into the chat.' },
        { text: 'Receive', sub: 'Read the finished product.' },
        { text: 'Copy',    sub: 'Paste it into the assignment.' },
        { text: 'Move on', sub: 'Homework done. Learning skipped.' },
      ]}
      accent={W.clay}
      numbered={true}
    />
  )},
  { dur: 12.1, component: () => (
    <QuoteScene
      kicker="KEY INSIGHT"
      quote="Learning is the effort that produces the product."
      attribution="Not the product itself."
    />
  )},
  { dur: 13.5, component: () => (
    <EqualityScene
      kicker="ONE TOOL · TWO EFFECTS"
      headline="The technology is neutral. The pedagogy is not."
      left={{
        label: 'ANSWER MACHINE',
        title: 'Bypasses thinking',
        bullets: ['Solve 2/3 + 1/4', 'Copy result', 'No reasoning'],
      }}
      right={{
        label: 'LEARNING PARTNER',
        title: 'Guides thinking',
        bullets: ['Walk me through it', 'Ask me questions', 'I do the thinking'],
      }}
      tagline="Same tool. Opposite outcomes."
    />
  )},
  { dur: 7.6, component: () => (
    <DefinitionScene
      kicker="THE PARADIGM SHIFT"
      headline="From product tool to process tool."
      italicTerm="process"
      flow={['Write me an essay', '→', 'Help me think']}
      tagline="The question changes everything."
    />
  )},
  { dur: 12.4, component: () => (
    <TwoColumnScene
      kicker="TWO STUDENTS · ONE TOPIC"
      headline="Both use ChatGPT to study fractions."
      left={{
        label: 'STUDENT A',
        title: 'Gets the answer',
        bullets: ['Types: solve 2/3 + 1/4', 'Copies the result', 'Learns nothing'],
      }}
      right={{
        label: 'STUDENT B',
        title: 'Builds the skill',
        bullets: ['Asks for step-by-step', 'Answers questions', 'Learns deeply'],
      }}
      leftColor={W.clay}
      rightColor={W.sage}
    />
  )},
  { dur: 9.3, component: () => (
    <BulletListScene
      kicker="THE TEACHER'S NEW ROLE"
      headline="Design the conditions for learning."
      items={[
        { text: 'Teach AI as a process tool, not a product tool' },
        { text: 'Design assignments that value drafts and reasoning' },
        { text: 'Be explicit about the purpose of each activity' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 12.9, component: () => (
    <ClosingScene
      tagline="Build understanding. Don't bypass it."
      italicWord="Build"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC3L01 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c3-l01/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
