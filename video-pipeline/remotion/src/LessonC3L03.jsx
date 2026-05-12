// Lesson C3L03 — AI for Practice and Assessment
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, DefinitionScene, CardGridScene, ProcessFlowScene,
  QuoteScene, MythBustScene, BulletListScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c3-l03'

const SCENES = [
  { dur: 9, component: () => (
    <TitleScene
      title="Practice and Assessment"
      italicWord="Practice"
      subtitle="Turning every mistake into a learning opportunity"
      kicker="AI4TEACHERS · 03"
    />
  )},
  { dur: 18, component: () => (
    <DefinitionScene
      kicker="THE SHIFT"
      headline="From summative testing to formative practice."
      italicTerm="formative"
      flow={['Generate', 'Solve', 'Feedback']}
      tagline="Immediate. Adaptive. Unlimited."
    />
  )},
  { dur: 19, component: () => (
    <CardGridScene
      kicker="USE CASES"
      headline="Four practice formats AI handles well."
      columns={2}
      accent={W.sage}
      items={[
        { title: 'Quizzes',          body: 'Multiple-choice with explanations on each item.' },
        { title: 'Drills',           body: 'Endless practice problems on one specific skill.' },
        { title: 'Interactive Q&A',  body: 'One question at a time, with targeted feedback.' },
        { title: 'Adaptive sets',    body: 'Difficulty rises and falls with the student.' },
      ]}
    />
  )},
  { dur: 20, component: () => (
    <ProcessFlowScene
      kicker="THE PRACTICE LOOP"
      headline="A learning cycle that runs itself."
      steps={[
        { title: 'Generate', sub: 'AI creates a problem' },
        { title: 'Solve',    sub: 'Student attempts it' },
        { title: 'Evaluate', sub: 'AI explains the error' },
        { title: 'Adapt',    sub: 'Next problem fits' },
      ]}
      tagline="Every step is learning, not just the right answer."
    />
  )},
  { dur: 17, component: () => (
    <QuoteScene
      kicker="THE CORE VALUE"
      quote="Feedback turns every mistake into a learning opportunity."
      attribution="Not the questions — the explanations."
    />
  )},
  { dur: 18, component: () => (
    <DefinitionScene
      kicker="ADAPTIVE DIFFICULTY"
      headline="Stay in the zone of growth."
      italicTerm="zone of growth"
      flow={['Struggle', '↔', 'Stretch']}
      tagline="Pacing personalised to every student."
    />
  )},
  { dur: 19, component: () => (
    <MythBustScene
      kicker="USE WITH CARE"
      headline="What students should not do."
      myths={[
        { myth: 'Write me the essay about the water cycle.',         reality: 'Ask me questions that help me write my own essay.' },
        { myth: 'AI feedback is always correct, no need to verify.', reality: 'Treat it as a guide. Check anything that matters.' },
      ]}
    />
  )},
  { dur: 17, component: () => (
    <BulletListScene
      kicker="HELP STUDENTS PRACTISE WELL"
      headline="A practical methodology."
      items={[
        { text: 'Prompt by topic, level, and goal — not generically' },
        { text: 'Ask for diagnostic feedback, not just right/wrong' },
        { text: 'Verify AI explanations against trusted sources' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene
      tagline="Practice with purpose. Feedback with insight."
      italicWord="insight"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC3L03 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c3-l03/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
