// Lesson C3L06 — Ethics of AI in Education
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, QuoteScene, BulletListScene, DefinitionScene,
  MythBustScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c3-l06'

const SCENES = [
  { dur: 5.8, component: () => (
    <TitleScene
      title="Ethics of AI in Education"
      italicWord="Ethics"
      subtitle="Bias, fairness, and human agency"
      kicker="AI4TEACHERS · 06"
    />
  )},
  { dur: 13.2, component: () => (
    <QuoteScene
      kicker="THE PRINCIPLE"
      quote="Ethics is not separate from technology."
      attribution="Every AI tool carries real consequences."
    />
  )},
  { dur: 18, component: () => (
    <BulletListScene
      kicker="01 · ALGORITHMIC BIAS"
      headline="AI inherits the world's inequalities."
      items={[
        { text: 'Gender stereotypes in word problems' },
        { text: 'Underrepresented ethnic groups in imagery' },
        { text: 'Cultural references that exclude some students' },
        { text: 'Language patterns that disadvantage non-native speakers' },
      ]}
      accent={W.clay}
    />
  )},
  { dur: 13.9, component: () => (
    <DefinitionScene
      kicker="02 · THE ORACLE EFFECT"
      headline="Students trust computers too much."
      italicTerm="too much"
      flow={['Confident', '≠', 'Correct']}
      tagline="Make AI errors visible. Turn them into lessons."
    />
  )},
  { dur: 14, component: () => (
    <BulletListScene
      kicker="03 · DATA AND PRIVACY"
      headline="Every interaction is recorded."
      items={[
        { text: 'Names, school, family, struggles — all logged' },
        { text: 'GDPR requires informed consent and minimisation' },
        { text: 'Teach students never to share personal data with AI' },
      ]}
      accent={W.sky}
      numbered={true}
    />
  )},
  { dur: 14.7, component: () => (
    <QuoteScene
      kicker="04 · HUMAN AGENCY"
      quote="AI suggests. The teacher decides."
      attribution="Pedagogical judgement is never delegated."
    />
  )},
  { dur: 15.2, component: () => (
    <MythBustScene
      kicker="COMMON ETHICAL MISUSES"
      headline="Things teachers should not do."
      myths={[
        { myth: 'AI-generated quizzes are ready to use as-is.',           reality: 'Always review for bias and accuracy first.' },
        { myth: 'AI grades student work — final, no review needed.',     reality: 'AI suggestions, teacher decides. Always.' },
        { myth: 'It is fine to paste student data into a public tool.',  reality: 'Anonymise. Or use a school-approved tool only.' },
      ]}
    />
  )},
  { dur: 13.7, component: () => (
    <BulletListScene
      kicker="ETHICS AS AI LITERACY"
      headline="Turn every concern into a lesson."
      items={[
        { text: 'Analyse a biased AI example with the class' },
        { text: 'Show a hallucination and dissect it' },
        { text: 'Discuss what AI does with student data' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 5.1, component: () => (
    <ClosingScene
      tagline="Technology serves learning. Not the other way around."
      italicWord="serves"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC3L06 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c3-l06/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
