// Lesson C4L05 — AI for Multilingual Classrooms
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, PillCloudScene, BeforeAfterScene, CardGridScene,
  DefinitionScene, BulletListScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c4-l05'

const SCENES = [
  { dur: 10, component: () => (
    <TitleScene
      title="Multilingual Classrooms"
      subtitle="When language is the barrier"
      kicker="AI4TEACHERS · 05"
    />
  )},
  { dur: 17, component: () => (
    <PillCloudScene
      kicker="EVERY SUBJECT, EVERY MOMENT"
      headline="Language locks content away."
      items={[
        'Maths problems', 'Science instructions', 'History passages',
        'Group activities', 'Verbal directions', 'PE warm-ups',
      ]}
      accent={W.clay}
    />
  )},
  { dur: 19, component: () => (
    <BeforeAfterScene
      kicker="THE SHIFT"
      headline="From waiting — to access in seconds."
      weak="Worksheet sits untouched. Student waits days for a translation that may not arrive."
      strong="Student pastes the text into ChatGPT. Reads a clear version in their mother tongue. Joins the lesson."
      tagline="A bilingual assistant — available for every student, every subject."
    />
  )},
  { dur: 19, component: () => (
    <CardGridScene
      kicker="MORE THAN TRANSLATION"
      headline="Three levels of language support."
      columns={3}
      accent={W.sage}
      items={[
        { title: 'Full translation', body: 'Into the mother tongue, for beginners.' },
        { title: 'Level adaptation', body: 'Same content at B1 or A2 in the target language.' },
        { title: 'Vocabulary help',  body: 'Define only the words the student does not know.' },
      ]}
    />
  )},
  { dur: 19, component: () => (
    <DefinitionScene
      kicker="VOICE MODE"
      headline="Speak in one language. Hear the other."
      italicTerm="hear"
      flow={['Speak', 'AI', 'Comprehensible input']}
      tagline="Instruction lands. The new language gets heard in context."
    />
  )},
  { dur: 19, component: () => (
    <CardGridScene
      kicker="TECHNICAL VOCABULARY"
      headline="Translate the text. Keep the key terms."
      columns={2}
      accent={W.sky}
      items={[
        { title: 'The prompt',     body: 'Translate into Arabic, but keep all scientific terms in English.' },
        { title: 'The result',     body: 'Bilingual text — content access plus vocabulary learning.' },
      ]}
    />
  )},
  { dur: 18, component: () => (
    <CardGridScene
      kicker="THE LIMITS"
      headline="Linguistic equivalence is not cultural equivalence."
      columns={2}
      accent={W.clay}
      items={[
        { title: 'Idioms & references', body: 'Cultural humour, wordplay, local context.' },
        { title: 'Implicit knowledge',  body: 'Assumptions a translation cannot supply.' },
      ]}
    />
  )},
  { dur: 18, component: () => (
    <BulletListScene
      kicker="MULTILINGUALISM AS ASSET"
      headline="Use AI for access — and for celebration."
      items={[
        { text: 'Bridge approach',    sub: 'Engage with the original first. Translate only what blocks comprehension.' },
        { text: 'Bilingual glossary', sub: 'AI builds it in minutes — share before the lesson.' },
        { text: 'Show us your language', sub: 'Compare how the concept is expressed.' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene
      tagline="Different language. Same content."
      italicWord="Same"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC4L05 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c4-l05/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
