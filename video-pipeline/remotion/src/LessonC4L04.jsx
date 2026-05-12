// Lesson C4L04 — AI for Cognitive Accessibility
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, PillCloudScene, CardGridScene, BulletListScene,
  DefinitionScene, QuoteScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c4-l04'

const SCENES = [
  { dur: 10, component: () => (
    <TitleScene
      title="Cognitive Accessibility"
      subtitle="Real-time differentiation, without changing the goal"
      kicker="AI4TEACHERS · 04"
    />
  )},
  { dur: 17, component: () => (
    <PillCloudScene
      kicker="WHO BENEFITS"
      headline="A wide and often invisible spectrum."
      items={[
        'Dyslexia', 'Dyscalculia', 'ADHD',
        'Autism spectrum', 'Processing differences', 'Anyone facing dense text',
      ]}
      accent={W.sky}
    />
  )},
  { dur: 19, component: () => (
    <CardGridScene
      kicker="THE TRANSFORMATIONS"
      headline="Three ways AI adapts text."
      columns={3}
      accent={W.sage}
      items={[
        { title: 'Simplify',    body: 'Shorter sentences. Everyday vocabulary.' },
        { title: 'Restructure', body: 'Tables, numbered steps, headings.' },
        { title: 'Enrich',      body: 'Concrete examples. Everyday analogies.' },
      ]}
    />
  )},
  { dur: 20, component: () => (
    <BulletListScene
      kicker="PROMPTS THAT WORK"
      headline="Specific beats vague — every time."
      items={[
        { text: 'Rewrite for reading difficulty',   sub: 'Short sentences. Everyday words. Concrete examples.' },
        { text: 'Convert to a numbered list',       sub: 'One action per step.' },
        { text: 'Make a three-column table',        sub: 'Concept · explanation · example.' },
        { text: 'Build a text concept map',         sub: 'Show how ideas relate.' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 21, component: () => (
    <CardGridScene
      kicker="MATCHING ADAPTATION TO NEED"
      headline="Different barriers. Different formats."
      columns={2}
      accent={W.sky}
      items={[
        { title: 'Dyslexia',    body: 'Shorter sentences, clear breaks, audio paired with text.' },
        { title: 'ADHD',        body: 'Small labelled sections. Sequential steps. Bullet summaries.' },
        { title: 'Autism',      body: 'Explicit, systematic, predictable structure.' },
        { title: 'Slower processing', body: 'Reduce volume. Preserve essential content.' },
      ]}
    />
  )},
  { dur: 15, component: () => (
    <QuoteScene
      kicker="THE PRINCIPLE"
      quote="The learning objective stays the same. Only the path to understanding changes."
    />
  )},
  { dur: 18, component: () => (
    <DefinitionScene
      kicker="TEACHER JUDGEMENT"
      headline="AI simplifies as asked — not as right."
      italicTerm="as right"
      flow={['Set boundary', 'Preserve terms', 'Review output']}
      tagline="The pedagogical decision stays with you."
    />
  )},
  { dur: 17, component: () => (
    <BulletListScene
      kicker="FOR EVERY STUDENT"
      headline="Adaptation as a normal classroom skill."
      items={[
        { text: 'No diagnosis required',  sub: 'Anyone can ask for a clearer version.' },
        { text: 'Reduce stigma',          sub: 'Adapting content is a strength, not a weakness.' },
        { text: 'Same engagement',        sub: 'The student still does the cognitive work.' },
      ]}
      accent={W.sage}
      numbered={false}
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene
      tagline="Same objective. Different path."
      italicWord="path"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC4L04 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c4-l04/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
