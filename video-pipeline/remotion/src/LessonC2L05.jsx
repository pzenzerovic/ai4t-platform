// Lesson C2L05 — Getting Started with ChatGPT for Teachers
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, DefinitionScene, ToolWalkthroughScene, ProcessFlowScene,
  CardGridScene, MythBustScene, BulletListScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c2-l05'

const SCENES = [
  { dur: 10, component: () => (
    <TitleScene
      title="Getting Started with ChatGPT"
      italicWord="ChatGPT"
      subtitle="The tool most teachers meet first"
      kicker="AI4TEACHERS · 05"
    />
  )},
  { dur: 16, component: () => (
    <DefinitionScene
      kicker="WHAT IT IS"
      headline="A conversational AI built on a large language model."
      italicTerm="language model"
      flow={['Prompt', 'Generate', 'Response']}
      tagline="Generates text — does not look up answers."
    />
  )},
  { dur: 14, component: () => (
    <ToolWalkthroughScene
      kicker="WHERE TO START"
      headline="Free at chat.openai.com."
      toolName="ChatGPT"
      toolTagline="By OpenAI · web + mobile"
      features={[
        { title: 'Free tier', sub: 'Enough for most teacher work' },
        { title: 'ChatGPT Plus', sub: 'Better models, file uploads, images' },
        'Sign in with email, Google, Microsoft, or Apple',
      ]}
      accent={W.sage}
    />
  )},
  { dur: 18, component: () => (
    <ToolWalkthroughScene
      kicker="INTERFACE TOUR"
      headline="The layout — and the one habit to build."
      toolName="The chat window"
      toolTagline="Sidebar · conversation · input"
      features={[
        { title: 'Past chats', sub: 'Listed in the left sidebar' },
        { title: 'Model selector', sub: 'At the top of the conversation' },
        { title: 'Fresh start', sub: 'Each chat begins with no memory' },
        'Habit: give context at the start of every chat',
      ]}
      accent={W.sky}
    />
  )},
  { dur: 17, component: () => (
    <ProcessFlowScene
      kicker="THE CORE WORKFLOW"
      headline="The same four moves, every time."
      steps={[
        { title: 'Set context', sub: 'Subject, grade, objective' },
        { title: 'Give task', sub: 'Be specific' },
        { title: 'Read critically', sub: 'Check, edit' },
        { title: 'Iterate', sub: 'Refine in follow-ups' },
      ]}
      tagline="Same prompt-engineering moves — inside this UI."
    />
  )},
  { dur: 20, component: () => (
    <CardGridScene
      kicker="FOUR STARTER WORKFLOWS"
      headline="High-value uses for tomorrow."
      columns={2}
      accent={W.sage}
      items={[
        { title: 'Lesson drafts', body: 'First-draft outlines you can edit into shape.' },
        { title: 'Differentiated texts', body: 'Same passage, three reading levels.' },
        { title: 'Practice questions', body: 'Quizzes with answer keys.' },
        { title: 'Rewrite your own', body: 'Parent letters, instructions, briefs.' },
      ]}
    />
  )},
  { dur: 16, component: () => (
    <MythBustScene
      kicker="PRIVACY"
      headline="One rule, no exceptions."
      myths={[
        { myth: 'I can paste student work to get feedback.', reality: 'Anonymise first. Never enter identifying data.' },
      ]}
    />
  )},
  { dur: 16, component: () => (
    <BulletListScene
      kicker="MAKE IT A HABIT"
      headline="From first try to weekly practice."
      items={[
        { text: 'Pick two recurring tasks', sub: 'Quiz items, parent letters, worksheets.' },
        { text: 'Use it consistently for a fortnight', sub: 'Build intuition about where it helps.' },
        { text: 'Save the prompts that worked', sub: 'A personal library compounds fast.' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene
      tagline="First draft. Your judgement."
      italicWord="judgement"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC2L05 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c2-l05/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
