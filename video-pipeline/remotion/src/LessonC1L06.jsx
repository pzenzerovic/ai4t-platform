// Lesson C1L06 — Multimodal AI
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, BulletListScene, DefinitionScene, CardGridScene,
  PillCloudScene, ProcessFlowScene, QuoteScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c1-l06'

const SCENES = [
  { dur: 10, component: () => (
    <TitleScene
      title="Multimodal AI"
      subtitle="When AI sees, hears, and speaks"
      kicker="AI4TEACHERS · 06"
    />
  )},
  { dur: 18, component: () => (
    <BulletListScene
      kicker="BEYOND TEXT"
      headline="A real shift in the past two years."
      items={[
        { text: 'Text only',          sub: 'How AI worked until recently' },
        { text: 'Text + images',      sub: 'Photos, diagrams, charts' },
        { text: 'Text + audio + video', sub: 'A single conversation, multiple modes' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 16, component: () => (
    <DefinitionScene
      kicker="MULTIMODAL"
      headline="Multiple modes of information at once."
      italicTerm="Multiple modes"
      flow={['Text', 'Image', 'Audio']}
      tagline="Closer to how teaching actually works."
    />
  )},
  { dur: 20, component: () => (
    <CardGridScene
      kicker="WHAT IT CAN ANALYZE"
      headline="Upload — and ask."
      columns={3}
      accent={W.sage}
      items={[
        { title: 'Photo of a leaf',    body: 'Identify species, describe features.' },
        { title: 'Handwritten essay',  body: 'Read the text. Give feedback.' },
        { title: 'A chart or diagram', body: 'Explain trends. Spot patterns.' },
      ]}
    />
  )},
  { dur: 18, component: () => (
    <PillCloudScene
      kicker="WHAT IT CAN GENERATE"
      headline="Not just analyze — create."
      items={[
        'Custom diagrams', 'Text-to-speech',
        'Image generation', 'Voice mode',
        'Audio transcripts', 'Short video',
      ]}
      accent={W.clay}
      filled={true}
    />
  )},
  { dur: 20, component: () => (
    <ProcessFlowScene
      kicker="A BIOLOGY LESSON"
      headline="Three modalities, one class."
      steps={[
        { title: 'Before',  sub: 'AI generates a leaf diagram' },
        { title: 'During',  sub: 'Students upload their photos' },
        { title: 'After',   sub: 'AI transcribes their reflections' },
      ]}
      tagline="Each step uses a different multimodal capability."
    />
  )},
  { dur: 16, component: () => (
    <QuoteScene
      kicker="THE SAME CAUTION"
      quote="The model recognizes patterns — not meaning. Verify visual analysis as carefully as text."
    />
  )},
  { dur: 14, component: () => (
    <BulletListScene
      kicker="HOW TO START"
      headline="Begin with one image."
      items={[
        { text: 'Upload one photo to ChatGPT or Claude' },
        { text: 'Ask a single question about it' },
        { text: 'Notice both the power — and the limits' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene
      tagline="AI that sees. AI that listens."
      italicWord="listens"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC1L06 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c1-l06/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
