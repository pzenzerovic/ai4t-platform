// Lesson C3L07 — Human in the Loop
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, DefinitionScene, BulletListScene, ConceptCirclesScene,
  CardGridScene, QuoteScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c3-l07'

const SCENES = [
  { dur: 5.2, component: () => (
    <TitleScene
      title="Human in the Loop"
      italicWord="Human"
      subtitle="The teacher decides. The AI assists."
      kicker="AI4TEACHERS · 07"
    />
  )},
  { dur: 13.2, component: () => (
    <DefinitionScene
      kicker="THE PRINCIPLE"
      headline="A human approves at every critical decision."
      italicTerm="human"
      flow={['Aviation', 'Medicine', 'Education']}
      tagline="Technology assists. Humans decide."
    />
  )},
  { dur: 11.3, component: () => (
    <ConceptCirclesScene
      kicker="WHY EDUCATION NEEDS IT"
      headline="Three independent arguments."
      left={{ label: 'AI', caption: 'errors, no context, no relationship', color: W.clay }}
      right={{ label: 'TEACHER', caption: 'judgement, context, presence', color: W.sage }}
      connector="x"
      tagline="Each reason on its own is sufficient."
    />
  )},
  { dur: 16, component: () => (
    <BulletListScene
      kicker="THREE LEVELS OF OVERSIGHT"
      headline="When and how to look."
      items={[
        { text: 'Pre-use review',     sub: 'Check AI content before students see it' },
        { text: 'Real-time monitoring', sub: 'Watch student-AI interactions in class' },
        { text: 'Post-use evaluation', sub: 'Assess learning outcomes after' },
      ]}
      accent={W.sky}
      numbered={true}
    />
  )},
  { dur: 13.1, component: () => (
    <CardGridScene
      kicker="IRREPLACEABLE FUNCTIONS"
      headline="Four things only a teacher can do."
      columns={2}
      accent={W.sage}
      items={[
        { title: 'Emotional attunement',  body: 'Notice frustration, confusion, or anxiety.' },
        { title: 'Ethical judgement',     body: 'Recognise bias, risk, and the right thing.' },
        { title: 'Curriculum integration', body: 'Connect to the broader programme.' },
        { title: 'Accountability',        body: 'Take responsibility when something goes wrong.' },
      ]}
    />
  )},
  { dur: 12.9, component: () => (
    <BulletListScene
      kicker="MAKING IT SUSTAINABLE"
      headline="Oversight without overwhelm."
      items={[
        { text: 'Build review into existing workflows, not as extra work' },
        { text: 'Sample student-AI transcripts, do not read every one' },
        { text: 'Add reflection prompts after AI-assisted activities' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 10.8, component: () => (
    <QuoteScene
      kicker="WARNING"
      quote="Clicking 'approve' without reading is not oversight."
      attribution="Presence is not enough — engagement is."
    />
  )},
  { dur: 12.4, component: () => (
    <BulletListScene
      kicker="THE CHECKLIST"
      headline="Six questions before students see AI content."
      items={[
        { text: 'Is it factually accurate?' },
        { text: 'Is it free of bias and stereotype?' },
        { text: 'Is it age-appropriate?' },
        { text: 'Does it align with the learning objective?' },
        { text: 'Is it culturally sensitive?' },
        { text: 'Would I defend it to a parent?' },
      ]}
      accent={W.clay}
      numbered={true}
    />
  )},
  { dur: 4.9, component: () => (
    <ClosingScene
      tagline="AI assists. You decide."
      italicWord="decide"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC3L07 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c3-l07/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
