// Lesson C4L07 — Accessibility Tools Directory
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, CardGridScene, PillCloudScene, BulletListScene,
  ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c4-l07'

const SCENES = [
  { dur: 10, component: () => (
    <TitleScene
      title="Accessibility Tools"
      subtitle="A practical reference — what helps, and how"
      kicker="AI4TEACHERS · 07"
    />
  )},
  { dur: 18, component: () => (
    <CardGridScene
      kicker="THREE CATEGORIES"
      headline="Effective support combines them."
      columns={3}
      accent={W.sage}
      items={[
        { title: 'General-purpose AI', body: 'Versatile across every need.' },
        { title: 'Specialised tools',  body: 'Designed for one task.' },
        { title: 'Supporting tools',   body: 'Complement the AI ones.' },
      ]}
    />
  )},
  { dur: 19, component: () => (
    <CardGridScene
      kicker="GENERAL-PURPOSE AI"
      headline="The most versatile starting point."
      columns={3}
      accent={W.sky}
      items={[
        { title: 'ChatGPT',  body: 'Vision and Voice mode. Image analysis. Text simplification.' },
        { title: 'Claude',   body: 'Long-form processing. Interactive Artifacts.' },
        { title: 'Copilot',  body: 'AI inside Microsoft 365 with Immersive Reader.' },
      ]}
    />
  )},
  { dur: 20, component: () => (
    <CardGridScene
      kicker="SPECIALISED TOOLS"
      headline="One job — done extremely well."
      columns={2}
      accent={W.sage}
      items={[
        { title: 'Otter.ai',              body: 'Real-time transcription for hearing impairments.' },
        { title: 'Microsoft Immersive Reader', body: 'Reading support inside Word, OneNote, Teams.' },
        { title: 'Read&Write',            body: 'Text prediction, vocabulary, focus support.' },
        { title: 'Goblin Tools',          body: 'Task decomposition — built for it.' },
      ]}
    />
  )},
  { dur: 18, component: () => (
    <CardGridScene
      kicker="VISUAL & SYMBOLIC"
      headline="Where text alone is not enough."
      columns={2}
      accent={W.clay}
      items={[
        { title: 'ARASAAC',     body: 'Free, open pictogram library — for AAC support.' },
        { title: 'Choiceworks', body: 'Visual routines, transitions, choice boards.' },
      ]}
    />
  )},
  { dur: 19, component: () => (
    <PillCloudScene
      kicker="THE FULL INVENTORY"
      headline="More than a teacher needs."
      items={[
        'ChatGPT', 'Claude', 'Microsoft Copilot',
        'Otter.ai', 'Immersive Reader', 'Read&Write',
        'Goblin Tools', 'ARASAAC', 'Choiceworks',
      ]}
      accent={W.sky}
      filled={true}
    />
  )},
  { dur: 19, component: () => (
    <BulletListScene
      kicker="HOW TO SELECT"
      headline="Start simple. Add tools gradually."
      items={[
        { text: 'One general-purpose AI tool', sub: 'ChatGPT or Claude as the versatile core.' },
        { text: 'One specialised tool',        sub: 'Matched to the student\'s primary need.' },
        { text: 'Establish routine first',     sub: 'Then add more only if needed.' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 17, component: () => (
    <BulletListScene
      kicker="PRACTICAL CONSIDERATIONS"
      headline="Beyond what the tool does."
      items={[
        { text: 'Cost & access',         sub: 'Some free, some subscription. Verify before recommending.' },
        { text: 'Data privacy',          sub: 'No personal student information into AI platforms.' },
        { text: 'Training & routine',    sub: 'Matter more than the choice of tool itself.' },
      ]}
      accent={W.clay}
      numbered={false}
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene
      tagline="Right tool. Right student."
      italicWord="Right"
      kicker="AI4TEACHERS · CATEGORY COMPLETE →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC4L07 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c4-l07/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
