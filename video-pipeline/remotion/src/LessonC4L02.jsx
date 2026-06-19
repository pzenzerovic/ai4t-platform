// Lesson C4L02 — AI for Students with Visual Impairments
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, BulletListScene, DefinitionScene, CardGridScene,
  PillCloudScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c4-l02'

const SCENES = [
  { dur: 5.4, component: () => (
    <TitleScene
      title="AI for Visual Impairments"
      subtitle="When seeing the board is not enough"
      kicker="AI4TEACHERS · 02"
    />
  )},
  { dur: 15.4, component: () => (
    <PillCloudScene
      kicker="THE VISUAL CHANNEL"
      headline="Most teaching is locked behind sight."
      items={[
        'Board notes', 'Slides', 'Worksheets', 'Diagrams',
        'Textbook pages', 'Lab setups',
      ]}
      accent={W.clay}
    />
  )},
  { dur: 12.6, component: () => (
    <DefinitionScene
      kicker="IMAGE ANALYSIS"
      headline="The AI can see what the student cannot."
      italicTerm="see"
      flow={['Photo', 'AI', 'Structured notes']}
      tagline="Beyond OCR — it understands structure and context."
    />
  )},
  { dur: 13.8, component: () => (
    <CardGridScene
      kicker="THE TOOLKIT"
      headline="One phone. Two AI capabilities."
      columns={2}
      accent={W.sage}
      items={[
        { title: 'ChatGPT Vision',   body: 'Photograph boards, worksheets, diagrams — get organised notes.' },
        { title: 'ChatGPT Voice',    body: 'Speak a question. Hear an answer. No reading required.' },
      ]}
    />
  )},
  { dur: 12.1, component: () => (
    <DefinitionScene
      kicker="VOICE INTERACTION"
      headline="Not text-to-speech. A real conversation."
      italicTerm="conversation"
      flow={['Speak', 'Hear', 'Ask more']}
      tagline="A learning partner — not just a reader."
    />
  )},
  { dur: 13.2, component: () => (
    <CardGridScene
      kicker="PRACTICAL SCENARIOS"
      headline="Try these this week."
      columns={3}
      accent={W.sky}
      items={[
        { title: 'The board',     body: 'Photograph after explanation. Ask for structured notes.' },
        { title: 'A worksheet',   body: 'Small print becomes readable text — at the student\'s size.' },
        { title: 'The lab',       body: 'Describe what is on the table. What does the display show?' },
      ]}
    />
  )},
  { dur: 13.8, component: () => (
    <CardGridScene
      kicker="LIMITS TO REMEMBER"
      headline="Descriptions are approximations."
      columns={2}
      accent={W.clay}
      items={[
        { title: 'Image quality',    body: 'Distance, angle, lighting all matter.' },
        { title: 'Handwriting',      body: 'And complex diagrams can be misread.' },
      ]}
    />
  )},
  { dur: 11.4, component: () => (
    <BulletListScene
      kicker="YOUR ROLE"
      headline="Modest steps with real impact."
      items={[
        { text: 'Allow phone use',         sub: 'For AI-supported learning during lessons.' },
        { text: 'Teach effective prompts', sub: 'Describe, read, structure, explain.' },
        { text: 'Set classroom norms',     sub: 'For photography and voice interaction.' },
        { text: 'Review output',           sub: 'Periodically check for accuracy.' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 5.5, component: () => (
    <ClosingScene
      tagline="Visual content. Spoken access."
      italicWord="Spoken"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC4L02 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c4-l02/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
