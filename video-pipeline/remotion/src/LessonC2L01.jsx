// Lesson C2L01 — Context and AI
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, QuoteScene, DefinitionScene, BeforeAfterScene,
  NumberedPillsScene, TwoColumnScene, BulletListScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c2-l01'

const SCENES = [
  { dur: 10, component: () => (
    <TitleScene
      title="Context and AI"
      subtitle="The foundation of every useful AI interaction"
      kicker="AI4TEACHERS · 01"
    />
  )},
  { dur: 16, component: () => (
    <QuoteScene
      kicker="THE PROBLEM"
      quote="Technically correct. Completely useless."
      attribution="What thin context produces"
    />
  )},
  { dur: 18, component: () => (
    <DefinitionScene
      kicker="CONTEXT"
      headline="Everything available to AI when it answers."
      italicTerm="Everything available"
      flow={['Question', 'Details', 'History']}
      tagline="Not the same as knowledge."
    />
  )},
  { dur: 20, component: () => (
    <BeforeAfterScene
      kicker="THIN vs RICH"
      headline="Same task. Very different results."
      weak="Create a quiz about fractions."
      strong="Create a 10-question quiz on adding fractions with unlike denominators for Year 6, including two word problems and an answer key."
      tagline="Difference isn't in the model. It's in the context."
    />
  )},
  { dur: 18, component: () => (
    <NumberedPillsScene
      kicker="WHAT CONTEXT HELPS MOST"
      headline="Five things that change every output."
      items={[
        'Student age',
        'Prior knowledge',
        'Learning objectives',
        'Output format',
        'Role for the AI',
      ]}
    />
  )},
  { dur: 20, component: () => (
    <TwoColumnScene
      kicker="TWO COMMON MISTAKES"
      headline="What goes wrong with context."
      left={{
        label: 'MISTAKE 1',
        title: 'Too little',
        bullets: [
          'Assumes AI will guess',
          'Goals stay implicit',
          'Output is generic',
        ],
      }}
      right={{
        label: 'MISTAKE 2',
        title: 'Too much, wrong kind',
        bullets: [
          'Pasting whole curricula',
          'Irrelevant details',
          'Buries what matters',
        ],
      }}
      leftColor={W.clay}
      rightColor={W.clay}
    />
  )},
  { dur: 18, component: () => (
    <BulletListScene
      kicker="WORKING MEMORY"
      headline="Large — but finite."
      items={[
        { text: 'Tens of thousands of words at once' },
        { text: 'Older parts can fall out in long chats' },
        { text: 'Restate key requirements periodically' },
      ]}
      accent={W.sky}
    />
  )},
  { dur: 16, component: () => (
    <QuoteScene
      kicker="THE GOOD NEWS"
      quote="It is not a technical skill. It is something teachers already do every day."
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene
      tagline="Clear context. Useful output."
      italicWord="Clear"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC2L01 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c2-l01/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
