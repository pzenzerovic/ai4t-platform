// Lesson C4L06 — AI for Students with Intellectual Disabilities
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, TwoColumnScene, QuoteScene, CardGridScene,
  PillCloudScene, BulletListScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c4-l06'

const SCENES = [
  { dur: 10, component: () => (
    <TitleScene
      title="Intellectual Disabilities"
      subtitle="A fundamentally different approach to AI"
      kicker="AI4TEACHERS · 06"
    />
  )},
  { dur: 18, component: () => (
    <TwoColumnScene
      kicker="THE LAYERED APPROACH"
      headline="Who works with whom."
      left={{
        label: 'OTHER LESSONS',
        title: 'Student → AI',
        bullets: [
          'Some independence',
          'Direct interaction',
          'Self-paced use',
        ],
      }}
      right={{
        label: 'THIS LESSON',
        title: 'Mentor → AI → Student',
        bullets: [
          'Always layered',
          'Mentor mediates',
          'Human relationship first',
        ],
      }}
      leftColor={W.sky}
      rightColor={W.sage}
    />
  )},
  { dur: 14, component: () => (
    <QuoteScene
      kicker="THE PRINCIPLE"
      quote="AI may adapt the method of learning — never the goal."
    />
  )},
  { dur: 19, component: () => (
    <CardGridScene
      kicker="THREE CORE USES"
      headline="What the mentor uses AI for."
      columns={3}
      accent={W.sage}
      items={[
        { title: 'Simplify',  body: 'Reformulate instructions in concrete, one-action language.' },
        { title: 'Decompose', body: 'Break a task into small, achievable steps.' },
        { title: 'Structure', body: 'Visual sequences and predictable routines.' },
      ]}
    />
  )},
  { dur: 17, component: () => (
    <PillCloudScene
      kicker="THE TOOLKIT"
      headline="In the mentor's hand — not the student's."
      items={[
        'ChatGPT', 'Claude', 'Goblin Tools',
        'ARASAAC', 'Choiceworks',
      ]}
      accent={W.sky}
    />
  )},
  { dur: 21, component: () => (
    <BulletListScene
      kicker="THE RULES"
      headline="Strict — and for good reason."
      items={[
        { text: 'Student does not use AI alone', sub: 'All interactions through the mentor.' },
        { text: 'Less is more',                  sub: 'One tool. One purpose. Short use.' },
        { text: 'Mentor filters all output',     sub: 'Shorten, simplify, connect to the task.' },
        { text: 'Never for assessment',          sub: 'Human professional observation only.' },
      ]}
      accent={W.clay}
      numbered={true}
    />
  )},
  { dur: 17, component: () => (
    <QuoteScene
      kicker="A SAFETY RULE"
      quote="If the device pulls attention from the activity — turn it off."
      attribution="The relationship comes first"
    />
  )},
  { dur: 18, component: () => (
    <BulletListScene
      kicker="PRIVACY"
      headline="Heightened obligations. Always."
      items={[
        { text: 'No personal data in prompts',  sub: 'No names. No diagnoses. No identifiers.' },
        { text: 'Describe needs generally',     sub: 'A student with limited reading ability — not a specific child.' },
        { text: 'AI is for content',            sub: 'Never for recording, storing, or sharing student progress.' },
      ]}
      accent={W.clay}
      numbered={false}
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene
      tagline="AI in the mentor's hand."
      italicWord="mentor's"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC4L06 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c4-l06/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
