// Lesson 02 — Introduction to Prompt Engineering
//
// Composed almost entirely from the reusable templates in Templates.jsx.
// Only the per-scene content (text, lists, examples) lives here. Visual
// motion + typography come from the library.

import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, EqualityScene, DefinitionScene, NumberedPillsScene,
  BeforeAfterScene, AnnotatedPromptScene, CycleStepsScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30

// Audio durations measured from x.ai TTS (Sal voice) + 1.0s tail per scene.
// Closing gets a longer tail so the short last line breathes.
const SCENES = [
  { dur: 9.5,  component: () => (
    <TitleScene
      title="Prompt Engineering"
      italicWord="Engineering"
      subtitle="It's just clear communication"
      kicker="AI4TEACHERS · 02"
    />
  )},
  { dur: 12.5, component: () => (
    <EqualityScene
      kicker="CHAPTER ONE"
      headline="What you already do — under a new name."
      left={{
        label: 'ASSIGNMENT BRIEF',
        title: 'For students',
        bullets: ['Goal', 'Audience', 'Format', 'Criteria'],
      }}
      right={{
        label: 'PROMPT',
        title: 'For an AI',
        bullets: ['Goal', 'Audience', 'Format', 'Criteria'],
      }}
      tagline="Same skill. Different audience."
    />
  )},
  { dur: 14.5, component: () => (
    <DefinitionScene
      kicker="DEFINITION"
      headline="A prompt is just an instruction."
      italicTerm="instruction"
      flow={['Prompt', 'AI', 'Response']}
      tagline="Vague in — vague out."
    />
  )},
  { dur: 17.7, component: () => (
    <NumberedPillsScene
      kicker="THE FUNDAMENTALS"
      headline="Seven principles. All borrowed from teaching."
      items={[
        'Define the goal',
        'Specify audience',
        'Constrain scope',
        'Assign a role',
        'Set expectations',
        'Provide examples',
        'Step-by-step reasoning',
      ]}
    />
  )},
  { dur: 20.6, component: () => (
    <BeforeAfterScene
      kicker="01 · DEFINE THE GOAL"
      headline="Watch the difference."
      weak="Make some maths exercises."
      strong="Create 15 multiplication exercises for Year 3 students practising the 6 times table, formatted as a worksheet."
      tagline="A few seconds longer to write. Output, night and day."
    />
  )},
  { dur: 18.5, component: () => (
    <BeforeAfterScene
      kicker="02 · SPECIFY YOUR AUDIENCE"
      headline="The age changes everything."
      weak="Explain fractions."
      strong="Explain fractions to Year 5 students, using examples like sharing a pizza or a chocolate bar."
      tagline="Vocabulary, pace, and what counts as a good example."
    />
  )},
  { dur: 25.7, component: () => (
    <BeforeAfterScene
      kicker="04 · ASSIGN A ROLE"
      headline="The single most efficient trick."
      weak="Write a lesson plan on photosynthesis."
      strong="You are a Year 7 biology teacher. Write a 45-min lesson plan with objectives, a warm-up, the main explanation, a hands-on activity, and a quick formative check."
      tagline="One phrase = tone + audience + approach + expertise."
    />
  )},
  { dur: 17.0, component: () => (
    <AnnotatedPromptScene
      kicker="STACK THEM"
      headline="In practice, you combine several at once."
      segments={[
        { label: 'ROLE',     color: W.clay, text: 'You are an English teacher for Year 6.' },
        { label: 'TASK',     color: W.sage, text: ' Create a short story of 8–10 sentences' },
        { label: 'CONSTRAINT', color: W.sky,  text: ' using the Present Simple tense,' },
        { label: 'TOPIC',    color: W.clay, text: ' about a student\'s morning routine.' },
        { label: 'STRUCTURE', color: W.sage, text: ' Then 3 exercises: True/False, fill-in-gaps, question-formation.' },
        { label: 'CRITERIA', color: W.sky,  text: ' Include an answer key for all exercises.' },
      ]}
    />
  )},
  { dur: 17.5, component: () => (
    <CycleStepsScene
      kicker="ITERATE"
      headline="Like a lesson plan."
      steps={[
        { title: 'Prompt',   sub: 'Set direction' },
        { title: 'Response', sub: 'See what you get' },
        { title: 'Adjust',   sub: 'Tone, length, format' },
        { title: 'Repeat',   sub: 'Until it lands' },
      ]}
      tagline="A conversation — not a vending machine."
    />
  )},
  { dur: 5.5, component: () => (
    <ClosingScene
      tagline="Clear input. Useful output."
      italicWord="Useful"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

// Build cumulative start times
const STARTS = SCENES.reduce((acc, sc) => {
  acc.push((acc[acc.length - 1] ?? 0) + sc.dur)
  return acc
}, [])
STARTS.unshift(0)
STARTS.pop()

export const LESSON_02_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const Lesson02 = () => {
  return (
    <AbsoluteFill style={{
      background: W.bg,
      // Greyscale AA — disables Chromium's macOS subpixel AA that would produce
      // RGB fringing on small text after H.264 chroma subsampling.
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'geometricPrecision',
      // Composition is 3840×2160 but scene coordinates are authored for the
      // 1920×1080 design canvas. `zoom: 2` causes Chromium to re-render text
      // and shapes at the higher resolution (unlike transform:scale which
      // would only upscale already-rasterised pixels).
      zoom: 2,
    }}>
      {SCENES.map((scene, i) => {
        const sceneNumber = i + 1
        const fromFrame = Math.round(STARTS[i] * FPS)
        const durationFrames = Math.round(scene.dur * FPS)
        const audioFile = `audio/lesson-02/scene-${String(sceneNumber).padStart(2, '0')}.mp3`
        const SceneComponent = scene.component
        return (
          <Sequence
            key={sceneNumber}
            from={fromFrame}
            durationInFrames={durationFrames}
            name={`Scene ${sceneNumber}`}
          >
            <SceneComponent />
            <Audio src={staticFile(audioFile)} />
          </Sequence>
        )
      })}
    </AbsoluteFill>
  )
}
