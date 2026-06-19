// Lesson C3L05 — Responsible Use of AI
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, BulletListScene, NumberedPillsScene,
  QuoteScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c3-l05'

const SCENES = [
  { dur: 6.9, component: () => (
    <TitleScene
      title="Responsible Use of AI"
      italicWord="Responsible"
      subtitle="A framework for thoughtful integration"
      kicker="AI4TEACHERS · 05"
    />
  )},
  { dur: 13.7, component: () => (
    <BulletListScene
      kicker="WHAT GOES WRONG"
      headline="The risks of unintentional use."
      items={[
        { text: 'Passive consumption of ready-made answers' },
        { text: 'Reduced cognitive effort' },
        { text: 'Avoidance of productive struggle' },
        { text: 'Dependence on external assistance' },
      ]}
      accent={W.clay}
    />
  )},
  { dur: 11.1, component: () => (
    <NumberedPillsScene
      kicker="THE FRAMEWORK"
      headline="Four steps for responsible integration."
      items={[
        'Define the objective',
        'Choose the mode',
        'Set student autonomy',
        'Plan reflection without AI',
      ]}
    />
  )},
  { dur: 11.5, component: () => (
    <BulletListScene
      kicker="01 · DEFINE THE OBJECTIVE"
      headline="What should the student develop?"
      items={[
        { text: 'Conceptual understanding' },
        { text: 'Procedural skill' },
        { text: 'Analytical ability' },
        { text: 'Metacognitive reflection' },
      ]}
      accent={W.sky}
      numbered={true}
    />
  )},
  { dur: 11.8, component: () => (
    <BulletListScene
      kicker="02 · CHOOSE THE MODE"
      headline="Pick the right AI role for the goal."
      items={[
        { text: 'Tutor — guided dialogue' },
        { text: 'Practice — exercises and feedback' },
        { text: 'Structuring — summaries and notes' },
        { text: 'Examples — extra illustrations' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 11.2, component: () => (
    <BulletListScene
      kicker="03 · SET AUTONOMY"
      headline="Draw the line clearly."
      items={[
        { text: 'Where does the student work alone?' },
        { text: 'Where does the student use AI?' },
        { text: 'When is AI absent — for assessment?' },
      ]}
      accent={W.clay}
      numbered={true}
    />
  )},
  { dur: 11, component: () => (
    <BulletListScene
      kicker="04 · REFLECT WITHOUT AI"
      headline="The final phase belongs to the student."
      items={[
        { text: 'Articulate what was learned, alone' },
        { text: 'Demonstrate through new independent work' },
        { text: 'Knowledge belongs to the student — not the tool' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 8.5, component: () => (
    <QuoteScene
      kicker="THE KEY TEST"
      quote="If I remove the AI, can the student still demonstrate the objective?"
      attribution="If not — the activity may be building dependence, not competence."
    />
  )},
  { dur: 4.8, component: () => (
    <ClosingScene
      tagline="Tool with purpose. Learning that lasts."
      italicWord="lasts"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC3L05 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c3-l05/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
