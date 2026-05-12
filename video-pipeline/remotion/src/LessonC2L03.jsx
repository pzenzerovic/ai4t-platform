// Lesson C2L03 — Prompt Engineering Examples
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, BulletListScene, BeforeAfterScene, CardGridScene,
  ProcessFlowScene, QuoteScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c2-l03'

const SCENES = [
  { dur: 10, component: () => (
    <TitleScene
      title="Prompt Engineering"
      subtitle="Real examples — math, language, history"
      kicker="AI4TEACHERS · 03"
    />
  )},
  { dur: 14, component: () => (
    <BulletListScene
      kicker="FROM PRINCIPLES TO PRACTICE"
      headline="What you'll see in this lesson."
      items={[
        { text: 'Three concrete examples' },
        { text: 'Weak prompt vs strong prompt' },
        { text: 'The patterns to take with you' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 22, component: () => (
    <BeforeAfterScene
      kicker="EXAMPLE 1 — MATHEMATICS"
      headline="Year 1 addition worksheet."
      weak="Make maths exercises for Year 1."
      strong="You are a Year 1 maths teacher. Create 20 addition exercises adding two single-digit numbers with a sum of 10 or less. Use each digit at least once. No answers. Include name and date fields."
      tagline="Role + count + math constraint + format."
    />
  )},
  { dur: 22, component: () => (
    <BeforeAfterScene
      kicker="EXAMPLE 2 — LANGUAGE"
      headline="Year 6 Present Simple story exercises."
      weak="Make English exercises."
      strong="Write an 8-sentence Present Simple story about a morning routine. Then add true/false, gap-fill, question-formation, and a free writing task. Answer keys for objective exercises."
      tagline="Receptive → productive → free production."
    />
  )},
  { dur: 22, component: () => (
    <BeforeAfterScene
      kicker="EXAMPLE 3 — HISTORY"
      headline="Inventions 1800-2000 review."
      weak="List important inventions."
      strong="Chronological overview, 1800 to 2000. At least 12 inventions. Inventor, year, country, one-line significance. Span transport, communication, medicine, and computing."
      tagline="Constraints make it pedagogical."
    />
  )},
  { dur: 18, component: () => (
    <CardGridScene
      kicker="WHAT EVERY STRONG PROMPT HAS"
      headline="Four ingredients that always help."
      columns={2}
      accent={W.sage}
      items={[
        { title: 'Role',         body: 'You are a Year 6 teacher...' },
        { title: 'Audience',     body: 'Age, grade, prior knowledge.' },
        { title: 'Constraints',  body: 'Count, length, format, scope.' },
        { title: 'Final form',   body: 'Answer keys, fields, rubrics.' },
      ]}
    />
  )},
  { dur: 18, component: () => (
    <ProcessFlowScene
      kicker="THE WORKFLOW"
      headline="From idea to classroom-ready."
      steps={[
        { title: 'Design',  sub: 'Pedagogy comes first' },
        { title: 'Specify', sub: 'Role, audience, format' },
        { title: 'Refine',  sub: 'Iterate on output' },
      ]}
      tagline="AI handles production. You handle design."
    />
  )},
  { dur: 14, component: () => (
    <QuoteScene
      kicker="THE TAKEAWAY"
      quote="The AI is a production tool. The pedagogy comes from you."
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene
      tagline="Pedagogy first. Then the prompt."
      italicWord="first"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC2L03 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c2-l03/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
