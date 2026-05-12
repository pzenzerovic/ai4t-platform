// Lesson C4L03 — AI for Students with Hearing Impairments
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, DefinitionScene, CardGridScene, BulletListScene,
  ProcessFlowScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c4-l03'

const SCENES = [
  { dur: 10, component: () => (
    <TitleScene
      title="AI for Hearing Impairments"
      subtitle="When the lesson is spoken — and speech is a barrier"
      kicker="AI4TEACHERS · 03"
    />
  )},
  { dur: 18, component: () => (
    <BulletListScene
      kicker="THE INVISIBLE BARRIER"
      headline="Teaching is mostly spoken."
      items={[
        { text: 'Explanations',  sub: 'Concepts delivered verbally' },
        { text: 'Instructions',  sub: 'Often given once, in passing' },
        { text: 'Discussions',   sub: 'Rapid, overlapping, multi-speaker' },
        { text: 'Feedback',      sub: 'Spoken corrections and praise' },
      ]}
      accent={W.clay}
      numbered={false}
    />
  )},
  { dur: 18, component: () => (
    <DefinitionScene
      kicker="REAL-TIME TRANSCRIPTION"
      headline="Speech becomes permanent, reviewable text."
      italicTerm="permanent"
      flow={['Spoken', 'Transcript', 'Reviewable']}
      tagline="The student can go back to what was said five minutes ago."
    />
  )},
  { dur: 18, component: () => (
    <CardGridScene
      kicker="THE TOOLKIT"
      headline="Capture during. Process after."
      columns={3}
      accent={W.sage}
      items={[
        { title: 'Otter.ai',         body: 'Real-time transcription with speaker labels.' },
        { title: 'Teams / Meet',     body: 'Built-in live captions for video classes.' },
        { title: 'ChatGPT / Claude', body: 'Transform transcripts into study material.' },
      ]}
    />
  )},
  { dur: 19, component: () => (
    <CardGridScene
      kicker="FROM RAW TRANSCRIPT"
      headline="Four prompts that turn text into study material."
      columns={2}
      accent={W.sky}
      items={[
        { title: 'Summarise',        body: 'Ten key points, organised by topic.' },
        { title: 'Structured notes', body: 'Headings, subheadings, key terms highlighted.' },
        { title: 'Vocabulary',       body: 'Specialised terms with brief definitions.' },
        { title: 'Simplify',         body: 'Main ideas in accessible language.' },
      ]}
    />
  )},
  { dur: 18, component: () => (
    <ProcessFlowScene
      kicker="THE WORKFLOW"
      headline="Two stages. Two strengths."
      steps={[
        { title: 'Capture',    sub: 'Transcription runs live' },
        { title: 'Organise',   sub: 'AI structures the text' },
        { title: 'Review',     sub: 'Student studies at own pace' },
      ]}
      tagline="Fast capture, intelligent processing."
    />
  )},
  { dur: 19, component: () => (
    <BulletListScene
      kicker="IMPROVE ACCURACY"
      headline="Small habits that lift transcription quality."
      items={[
        { text: 'Speak clearly',          sub: 'Moderate pace. Face the class.' },
        { text: 'Repeat questions',       sub: 'So the full exchange is captured.' },
        { text: 'Manage discussions',     sub: 'One speaker at a time when possible.' },
        { text: 'Minimise background noise', sub: 'During important explanations.' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 18, component: () => (
    <CardGridScene
      kicker="LIMITS AND PRIVACY"
      headline="Use the tool well — and lawfully."
      columns={3}
      accent={W.clay}
      items={[
        { title: 'Multi-speaker',    body: 'Discussions reduce accuracy.' },
        { title: 'Data protection',  body: 'Recording is regulated. Set school policy.' },
        { title: 'Personal study',   body: 'Transcripts are not for wide sharing.' },
      ]}
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene
      tagline="Spoken lesson. Reviewable text."
      italicWord="Reviewable"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC4L03 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c4-l03/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
