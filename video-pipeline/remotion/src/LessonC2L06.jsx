// Lesson C2L06 — Getting Started with Claude for Teachers
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, DefinitionScene, ToolWalkthroughScene, CardGridScene,
  ProcessFlowScene, MythBustScene, TwoColumnScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c2-l06'

const SCENES = [
  { dur: 10, component: () => (
    <TitleScene
      title="Getting Started with Claude"
      italicWord="Claude"
      subtitle="A second assistant, with a different feel"
      kicker="AI4TEACHERS · 06"
    />
  )},
  { dur: 15, component: () => (
    <DefinitionScene
      kicker="WHO BUILDS IT"
      headline="Claude is built by Anthropic."
      italicTerm="Anthropic"
      flow={['Same tech', '→', 'Different choices']}
      tagline="Same kind of LLM — different design priorities."
    />
  )},
  { dur: 14, component: () => (
    <ToolWalkthroughScene
      kicker="WHERE IT LIVES"
      headline="Sign in at claude.ai."
      toolName="Claude"
      toolTagline="By Anthropic · web + mobile"
      features={[
        { title: 'Free tier', sub: 'Meaningful daily limits' },
        { title: 'Claude Pro', sub: 'Higher limits, best models' },
        'Email or single sign-on to start',
      ]}
      accent={W.sage}
    />
  )},
  { dur: 16, component: () => (
    <CardGridScene
      kicker="STRENGTHS FOR TEACHERS"
      headline="Where Claude tends to shine."
      columns={3}
      accent={W.sage}
      items={[
        { title: 'Long documents', body: 'Whole chapters and curricula in one go.' },
        { title: 'Structured prose', body: 'Comfortable with long-form writing.' },
        { title: 'Iteration', body: 'Conversational refinement over time.' },
      ]}
    />
  )},
  { dur: 19, component: () => (
    <ToolWalkthroughScene
      kicker="TWO KEY FEATURES"
      headline="Built for sustained classroom work."
      toolName="Projects & Artefacts"
      toolTagline="The teacher-friendly extras"
      features={[
        { title: 'Projects', sub: 'Persistent workspace with reference docs' },
        { title: 'Artefacts', sub: 'Drafts in a side panel you can edit' },
        { title: 'Result', sub: 'No more re-pasting context every chat' },
      ]}
      accent={W.sky}
    />
  )},
  { dur: 20, component: () => (
    <ProcessFlowScene
      kicker="STARTER WORKFLOWS"
      headline="Four high-value uses, in order."
      steps={[
        { title: 'Long reading', sub: 'Summary + questions' },
        { title: 'Unit plan', sub: 'Sequenced lessons' },
        { title: 'Rubric', sub: 'Criteria + levels' },
        { title: 'Project', sub: 'Course workspace' },
      ]}
      tagline="One conversation. A package of materials."
    />
  )},
  { dur: 16, component: () => (
    <MythBustScene
      kicker="PRIVACY"
      headline="Same rule. Every assistant."
      myths={[
        { myth: 'A different company means different rules.', reality: 'No student data. No confidential docs. Anonymise first.' },
      ]}
    />
  )},
  { dur: 18, component: () => (
    <TwoColumnScene
      kicker="USING BOTH TOOLS"
      headline="You do not have to pick just one."
      left={{
        label: 'CHATGPT',
        title: 'Quick drafts',
        bullets: ['Fast iteration', 'Short prompts', 'Wide general help'],
      }}
      right={{
        label: 'CLAUDE',
        title: 'Long-form work',
        bullets: ['Big documents', 'Sustained projects', 'Structured writing'],
      }}
      leftColor={W.clay}
      rightColor={W.sage}
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene
      tagline="Long form. Steady partner."
      italicWord="Steady"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC2L06 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c2-l06/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
