// Lesson C2L07 — Canva AI for Education
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, DefinitionScene, ToolWalkthroughScene, ProcessFlowScene,
  CardGridScene, MythBustScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c2-l07'

const SCENES = [
  { dur: 9, component: () => (
    <TitleScene
      title="Canva AI for Education"
      italicWord="Education"
      subtitle="Polished classroom visuals — no design skills"
      kicker="AI4TEACHERS · 07"
    />
  )},
  { dur: 16, component: () => (
    <DefinitionScene
      kicker="WHAT IT IS"
      headline="An online design platform with an AI suite called Magic Studio."
      italicTerm="Magic Studio"
      flow={['You · pedagogy', '+', 'Canva · design']}
      tagline="You provide the teaching. Canva handles the look."
    />
  )},
  { dur: 14, component: () => (
    <ToolWalkthroughScene
      kicker="FREE FOR TEACHERS"
      headline="Canva for Education — verified, premium, free."
      toolName="canva.com/education"
      toolTagline="Free for verified teachers and students"
      features={[
        { title: 'School email sign-up', sub: 'Approval in 1–2 days' },
        { title: 'All AI features included', sub: 'No paid plan needed' },
        'Thousands of education templates',
      ]}
      accent={W.sage}
    />
  )},
  { dur: 20, component: () => (
    <ToolWalkthroughScene
      kicker="MAGIC STUDIO"
      headline="The AI features you will actually use."
      toolName="Magic Studio"
      toolTagline="Canva's built-in AI suite"
      features={[
        { title: 'Magic Design', sub: 'A whole deck from one prompt' },
        { title: 'Magic Write', sub: 'Drafts, rewrites, simplifications' },
        { title: 'Text-to-image', sub: 'Illustrations from a description' },
        { title: 'Background remover', sub: 'One-click clean photos' },
      ]}
      accent={W.sky}
    />
  )},
  { dur: 22, component: () => (
    <ProcessFlowScene
      kicker="THE CORE WORKFLOW"
      headline="Same five steps, every project."
      steps={[
        { title: 'Choose format', sub: 'Deck, poster, sheet' },
        { title: 'Prompt AI', sub: 'Magic Design / Write' },
        { title: 'Review & edit', sub: 'Accuracy, age fit' },
        { title: 'Personalise', sub: 'Your examples, brand' },
        { title: 'Share', sub: 'PDF, PPT, link' },
      ]}
      tagline="The AI gives a first draft. You make it pedagogical."
    />
  )},
  { dur: 20, component: () => (
    <CardGridScene
      kicker="BEST CLASSROOM USES"
      headline="Where Canva AI saves you the most time."
      columns={3}
      accent={W.sage}
      items={[
        { title: 'Lesson decks', body: 'Topic-specific slides in under a minute.' },
        { title: 'Worksheets', body: 'Layouts, prompts, and answer space.' },
        { title: 'Posters', body: 'Visual summaries for the classroom wall.' },
        { title: 'Infographics', body: 'Data and processes at a glance.' },
        { title: 'Certificates', body: 'Recognition for student work.' },
        { title: 'Newsletters', body: 'Polished family communications.' },
      ]}
    />
  )},
  { dur: 18, component: () => (
    <MythBustScene
      kicker="CAUTION"
      headline="Pretty is not the same as pedagogically sound."
      myths={[
        { myth: 'If the slides look polished, they\'re classroom-ready.', reality: 'Check facts, age fit, and cultural sensitivity first.' },
      ]}
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene
      tagline="Your pedagogy. Their design."
      italicWord="Your"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC2L07 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c2-l07/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
