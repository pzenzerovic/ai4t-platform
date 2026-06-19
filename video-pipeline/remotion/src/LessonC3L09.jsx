// Lesson C3L09 — Detecting AI-Generated Work
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, MythBustScene, BulletListScene, QuoteScene,
  BeforeAfterScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c3-l09'

const SCENES = [
  { dur: 6.6, component: () => (
    <TitleScene
      title="Detecting AI-Generated Work"
      italicWord="Detecting"
      subtitle="Why the wrong question gives the wrong answer"
      kicker="AI4TEACHERS · 09"
    />
  )},
  { dur: 10.4, component: () => (
    <MythBustScene
      kicker="THE FALSE PROMISE"
      headline="The detector myth."
      myths={[
        { myth: 'AI detectors reliably separate student work from AI work.', reality: 'They miss AI content and falsely flag genuine student writing.' },
        { myth: 'A 99% accurate detector is reliable enough for assessment.', reality: '1% means dozens of wrongful accusations per school per year.' },
      ]}
    />
  )},
  { dur: 13.9, component: () => (
    <BulletListScene
      kicker="FALSE POSITIVES"
      headline="Who gets wrongly accused."
      items={[
        { text: 'Students with polished, well-structured writing' },
        { text: 'Second-language learners using simple vocabulary' },
        { text: 'Students using standard grammar and spell-check tools' },
      ]}
      accent={W.clay}
    />
  )},
  { dur: 13.5, component: () => (
    <QuoteScene
      kicker="ON INTUITION"
      quote="A reason to look more carefully is not evidence of misconduct."
      attribution="Conversation comes before accusation."
    />
  )},
  { dur: 12.7, component: () => (
    <BeforeAfterScene
      kicker="THE SHIFT"
      headline="Stop trying to catch. Start designing differently."
      weak="Generic take-home essay. One submission. No process record. Easy to AI-generate without effort."
      strong="Drafts. Notes. In-class defence. Specific to classroom context. AI shortcuts become useless."
      tagline="From surveillance to pedagogy."
    />
  )},
  { dur: 9.2, component: () => (
    <QuoteScene
      kicker="KEY INSIGHT"
      quote="AI is a forcing function for better assessment design."
      attribution="The vulnerable assessments are the weak ones."
    />
  )},
  { dur: 16.2, component: () => (
    <BulletListScene
      kicker="THE PRACTICAL PROGRAMME"
      headline="What to do instead of detecting."
      items={[
        { text: 'Assess process — drafts, notes, revisions' },
        { text: 'Include in-class components in major work' },
        { text: 'Ask for context-specific, classroom-anchored tasks' },
        { text: 'Use iterative feedback cycles, not single submissions' },
        { text: 'Make AI-use rules explicit for every task' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 18.7, component: () => (
    <BulletListScene
      kicker="WORK WITH STUDENTS"
      headline="Shared problem, not adversarial."
      items={[
        { text: 'Transparent rules about permitted AI use per task' },
        { text: 'Conversation about misuse, not immediate prosecution' },
        { text: 'Address the conditions that drive misuse — overload, unclear expectations' },
      ]}
      accent={W.sky}
    />
  )},
  { dur: 5.1, component: () => (
    <ClosingScene
      tagline="Better assessment. Not better surveillance."
      italicWord="Better"
      kicker="AI4TEACHERS · CATEGORY COMPLETE →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC3L09 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c3-l09/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
