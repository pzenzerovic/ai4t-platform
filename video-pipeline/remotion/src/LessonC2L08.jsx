// Lesson C2L08 — MagicSchool.ai for Teachers
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, EqualityScene, ToolWalkthroughScene, PillCloudScene,
  ProcessFlowScene, DefinitionScene, MythBustScene, CardGridScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c2-l08'

const SCENES = [
  { dur: 10, component: () => (
    <TitleScene
      title="MagicSchool.ai"
      italicWord="MagicSchool"
      subtitle="80+ specialised AI tools, built for teachers"
      kicker="AI4TEACHERS · 08"
    />
  )},
  { dur: 18, component: () => (
    <EqualityScene
      kicker="A DIFFERENT APPROACH"
      headline="Blank kitchen versus recipe app."
      left={{
        label: 'CHATGPT',
        title: 'Open chat',
        bullets: ['You write the prompt', 'Anything is possible', 'Knowledge required'],
      }}
      right={{
        label: 'MAGICSCHOOL',
        title: 'Guided forms',
        bullets: ['Pick the tool', 'Fill specific fields', 'Structured output'],
      }}
      tagline="Same AI underneath — wildly different friction."
    />
  )},
  { dur: 14, component: () => (
    <ToolWalkthroughScene
      kicker="SIGN UP"
      headline="Free at magicschool.ai."
      toolName="MagicSchool"
      toolTagline="80+ teacher tools in one dashboard"
      features={[
        { title: 'Free tier', sub: 'All tools, monthly generation cap' },
        { title: 'Single sign-on', sub: 'Google, Microsoft, or school SSO' },
        'Languages: English UI · output in HR, EL, RO + 90 more',
      ]}
      accent={W.sage}
    />
  )},
  { dur: 17, component: () => (
    <PillCloudScene
      kicker="TOOL CATEGORIES"
      headline="The dashboard, by job to be done."
      items={[
        'Lesson Planning', 'Assessment', 'Differentiation',
        'Communication', 'Rubrics', 'Quizzes', 'Worksheets',
        'YouTube Questions', 'Translate', 'Text Leveller',
      ]}
      accent={W.sky}
      filled={false}
    />
  )},
  { dur: 22, component: () => (
    <ProcessFlowScene
      kicker="THE CORE WORKFLOW"
      headline="From form to finished material."
      steps={[
        { title: 'Choose tool', sub: 'Search or browse' },
        { title: 'Fill form', sub: 'Grade, topic, context' },
        { title: 'Generate', sub: 'Draft in seconds' },
        { title: 'Refine', sub: 'Edit or ask Raina' },
        { title: 'Export', sub: 'Docs, PDF, paste' },
      ]}
      tagline="The Additional Context field is where you put the real classroom."
    />
  )},
  { dur: 17, component: () => (
    <DefinitionScene
      kicker="RAINA"
      headline="The chat assistant turns one-shot into iteration."
      italicTerm="iteration"
      flow={['Output', 'Ask Raina', 'Refined']}
      tagline="One specific change — without regenerating from scratch."
    />
  )},
  { dur: 16, component: () => (
    <MythBustScene
      kicker="PRIVACY"
      headline="Strong protections — not a free pass."
      myths={[
        { myth: 'FERPA / GDPR compliant means I can paste anything.', reality: 'Still no real student names. Use placeholders.' },
      ]}
    />
  )},
  { dur: 18, component: () => (
    <CardGridScene
      kicker="BEST USES"
      headline="Where MagicSchool wins back the most time."
      columns={3}
      accent={W.sage}
      items={[
        { title: 'Lesson plans', body: 'Differentiated, with materials lists.' },
        { title: 'Quizzes', body: 'From a topic — or a YouTube video.' },
        { title: 'Rubrics', body: 'Aligned criteria and performance levels.' },
      ]}
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene
      tagline="80 tools. One workflow."
      italicWord="One"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC2L08 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c2-l08/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
