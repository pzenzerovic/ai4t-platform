// Lesson C3L04 — Structuring Knowledge
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, QuoteScene, CardGridScene, DefinitionScene,
  ProcessFlowScene, BeforeAfterScene, BulletListScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c3-l04'

const SCENES = [
  { dur: 4.5, component: () => (
    <TitleScene
      title="Structuring Knowledge"
      italicWord="Structuring"
      subtitle="Where understanding becomes memory"
      kicker="AI4TEACHERS · 04"
    />
  )},
  { dur: 12.8, component: () => (
    <QuoteScene
      kicker="WHY IT MATTERS"
      quote="Understanding is necessary. It is not sufficient."
      attribution="Without structure, knowledge fades."
    />
  )},
  { dur: 13.1, component: () => (
    <CardGridScene
      kicker="FOUR TECHNIQUES"
      headline="Where AI helps organise learning."
      columns={2}
      accent={W.sage}
      items={[
        { title: 'Summaries',         body: 'Condense long text into the key ideas.' },
        { title: 'Flashcards',        body: 'Active recall for facts, terms, formulas.' },
        { title: 'Concept maps',      body: 'See relationships and patterns.' },
        { title: 'Structured outlines', body: 'Hierarchical notes with subheadings.' },
      ]}
    />
  )},
  { dur: 12.1, component: () => (
    <DefinitionScene
      kicker="THE PEDAGOGICAL PRINCIPLE"
      headline="The student does the thinking. AI checks the work."
      italicTerm="checks"
      flow={['Student', '→', 'AI review']}
      tagline="Generation alone produces material — not learning."
    />
  )},
  { dur: 11.7, component: () => (
    <ProcessFlowScene
      kicker="THE WORKFLOW"
      headline="Three steps that turn AI into a learning tool."
      steps={[
        { title: 'Attempt', sub: 'Student writes the summary' },
        { title: 'Check',   sub: 'AI identifies gaps' },
        { title: 'Revise',  sub: 'Student integrates feedback' },
      ]}
      tagline="The act of creating is itself a form of learning."
    />
  )},
  { dur: 13.1, component: () => (
    <BeforeAfterScene
      kicker="FLASHCARDS · TWO PATHS"
      headline="The same deck. Different learning."
      weak="Ask AI to generate 20 flashcards on the circulatory system."
      strong="Make your own first. Then ask AI for five more on what you missed."
      tagline="Deciding what to test is itself a learning act."
    />
  )},
  { dur: 12.8, component: () => (
    <DefinitionScene
      kicker="A RECURRING CYCLE"
      headline="Structures grow as learning grows."
      italicTerm="grow"
      flow={['Add', 'Reorganise', 'Revisit']}
      tagline="Retention lives in the revisit."
    />
  )},
  { dur: 12.4, component: () => (
    <BulletListScene
      kicker="IN YOUR CLASSROOM"
      headline="One small habit, every lesson."
      items={[
        { text: 'Ask students to write a five-sentence summary' },
        { text: 'Use AI to flag what they missed' },
        { text: 'Discuss the gaps as a class' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 5.2, component: () => (
    <ClosingScene
      tagline="Student first. AI second."
      italicWord="first"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC3L04 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c3-l04/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
