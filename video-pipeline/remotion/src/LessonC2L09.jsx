// Lesson C2L09 — Building Simple Web Tools with Lovable
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, DefinitionScene, ToolWalkthroughScene, PillCloudScene,
  CycleStepsScene, BulletListScene, MythBustScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c2-l09'

const SCENES = [
  { dur: 6.9, component: () => (
    <TitleScene
      title="Building Tools with Lovable"
      italicWord="Lovable"
      subtitle="Describe an app — get a working web tool"
      kicker="AI4TEACHERS · 09"
    />
  )},
  { dur: 9, component: () => (
    <DefinitionScene
      kicker="WHAT IT IS"
      headline="An AI builder for small, interactive web apps."
      italicTerm="builder"
      flow={['Describe', 'Generate', 'Refine']}
      tagline="No code. Plain-language conversation with a developer."
    />
  )},
  { dur: 7, component: () => (
    <ToolWalkthroughScene
      kicker="WHERE IT LIVES"
      headline="Sign up at lovable.dev."
      toolName="Lovable"
      toolTagline="Chat on the left · live preview on the right"
      features={[
        { title: 'Chat window', sub: 'Your prompts and follow-ups' },
        { title: 'Live preview', sub: 'The app, building in real time' },
        'Best on a laptop — test on student devices',
      ]}
      accent={W.sage}
    />
  )},
  { dur: 10.8, component: () => (
    <PillCloudScene
      kicker="GOOD FOR"
      headline="Small, focused, interactive."
      items={[
        'Quick quizzes', 'Exit tickets', 'Learning games',
        'Flashcards', 'Rubric helpers', 'Resource hubs',
        'Vocabulary drills', 'Parent landing pages',
      ]}
      accent={W.sky}
      filled={false}
    />
  )},
  { dur: 3.6, component: () => (
    <CycleStepsScene
      kicker="THE CORE LOOP"
      headline="Generate, test, observe, refine."
      steps={[
        { title: 'Generate', sub: 'Write the brief' },
        { title: 'Test', sub: 'Use it as a student would' },
        { title: 'Observe', sub: 'What feels off' },
        { title: 'Refine', sub: 'One change at a time' },
      ]}
      tagline="The same iteration habit from prompt engineering."
    />
  )},
  { dur: 11.1, component: () => (
    <BulletListScene
      kicker="YOUR FIRST PROMPT"
      headline="The details that decide version one."
      items={[
        { text: 'Who uses it', sub: 'Age, grade, prior knowledge.' },
        { text: 'On what device', sub: 'Phone portrait? Tablet? Laptop?' },
        { text: 'What they do', sub: 'Inputs, feedback, scoring.' },
        { text: 'When the activity ends', sub: 'A clear win condition.' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 10.4, component: () => (
    <ToolWalkthroughScene
      kicker="VISUAL EDIT MODE"
      headline="Point and ask for a change."
      toolName="Visual edit"
      toolTagline="Click an element · describe the fix"
      features={[
        'Make the start button green',
        'Bigger fonts for young readers',
        { title: 'You name the change', sub: 'Lovable writes the code' },
      ]}
      accent={W.clay}
    />
  )},
  { dur: 9.2, component: () => (
    <MythBustScene
      kicker="PUBLISH & PRIVACY"
      headline="Two non-negotiables before class."
      myths={[
        { myth: 'If it works in preview, it works on the school network.', reality: 'Test the published link on student devices, on your school Wi-Fi.' },
        { myth: 'Students can log in to Lovable to use my app.', reality: 'Lovable is for adults. Teachers build — students just open the link.' },
      ]}
    />
  )},
  { dur: 10.6, component: () => (
    <ClosingScene
      tagline="Words in. Apps out."
      italicWord="out"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC2L09 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c2-l09/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
