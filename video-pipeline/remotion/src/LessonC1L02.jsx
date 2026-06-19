// Lesson C1L02 — AI in Education Today
// Composed from Templates.jsx with content drawn from the lesson markdown.

import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, PillCloudScene, DefinitionScene, CardGridScene,
  NumberedPillsScene, TwoColumnScene, BulletListScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c1-l02'

const SCENES = [
  { dur: 6.4,  component: () => (
    <TitleScene
      title="AI in Education Today"
      subtitle="You've been using it for years — you just didn't call it that"
      kicker="AI4TEACHERS · 02"
    />
  )},
  { dur: 13.4, component: () => (
    <PillCloudScene
      kicker="ALREADY HERE"
      headline="AI has been in your school for over a decade."
      items={[
        'Spell-check', 'Translation', 'Video recommendations',
        'Adaptive practice', 'Plagiarism detectors', 'Search ranking',
        'Email filters', 'Predictive text',
      ]}
      accent={W.sage}
    />
  )},
  { dur: 14.9, component: () => (
    <DefinitionScene
      kicker="ADAPTIVE LEARNING"
      headline="Platforms that adjust difficulty in real time."
      italicTerm="adjust difficulty"
      flow={['Student work', 'Model', 'Next question']}
      tagline="Khan Academy. Duolingo. National platforms."
    />
  )},
  { dur: 14.1, component: () => (
    <CardGridScene
      kicker="AUTOMATED ASSESSMENT"
      headline="Helpful for routine. Limited for judgment."
      columns={2}
      accent={W.clay}
      items={[
        { title: 'Can do',     body: 'Grade multiple choice. Flag plagiarism. Spot class-wide patterns.' },
        { title: "Cannot do",  body: 'Judge creativity, originality, or the quality of thinking.' },
      ]}
    />
  )},
  { dur: 14.8, component: () => (
    <PillCloudScene
      kicker="THE BIGGEST SHIFT"
      headline="One tool. Many tasks."
      items={[
        'Lesson plans', 'Differentiated texts', 'Quiz questions',
        'Translation', 'Brainstorming', 'Parent letters',
        'Summaries', 'Rubrics',
      ]}
      accent={W.clay}
      filled={true}
    />
  )},
  { dur: 17.9, component: () => (
    <NumberedPillsScene
      kicker="SKILLS THAT TRANSFER"
      headline="What you already do — applied to AI."
      items={[
        'Writing clear learning objectives',
        'Differentiating for diverse learners',
        'Evaluating student work',
        'Giving specific feedback',
        'Scaffolding complex tasks',
        'Reflecting and iterating',
      ]}
    />
  )},
  { dur: 15.1, component: () => (
    <TwoColumnScene
      kicker="WHAT IS AND ISN'T CHANGING"
      headline="A balanced view."
      left={{
        label: 'CHANGES',
        title: 'New',
        bullets: [
          'Speed of preparation',
          'Range of tasks AI can help with',
          'Society\'s expectations of schools',
        ],
      }}
      right={{
        label: 'STAYS',
        title: 'Unchanged',
        bullets: [
          'Teacher–student relationship',
          'Need for professional judgment',
          'Learning is social',
        ],
      }}
    />
  )},
  { dur: 15.7, component: () => (
    <BulletListScene
      kicker="WHERE TO BEGIN"
      headline="A practical starting plan."
      items={[
        { text: 'Pick one routine task',       sub: 'Quiz questions. A parent letter. A worksheet.' },
        { text: 'Compare to your own work',    sub: 'Where does AI help — where does your expertise matter?' },
        { text: 'Talk to colleagues',          sub: 'Shared experience accelerates learning.' },
        { text: 'Be patient with yourself',    sub: 'It is a new professional skill.' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 4.7,  component: () => (
    <ClosingScene
      tagline="Same skills. New tools."
      italicWord="New"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => {
  acc.push((acc[acc.length - 1] ?? 0) + sc.dur)
  return acc
}, [])
STARTS.unshift(0)
STARTS.pop()

export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC1L02 = () => {
  return (
    <AbsoluteFill style={{
      background: W.bg,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'geometricPrecision',
      zoom: 2,
    }}>
      {SCENES.map((scene, i) => {
        const sceneNumber = i + 1
        const fromFrame = Math.round(STARTS[i] * FPS)
        const durationFrames = Math.round(scene.dur * FPS)
        const audioFile = `audio/c1-l02/scene-${String(sceneNumber).padStart(2, '0')}.mp3`
        const SceneComponent = scene.component
        return (
          <Sequence
            key={sceneNumber}
            from={fromFrame}
            durationInFrames={durationFrames}
            name={`Scene ${sceneNumber}`}
          >
            <SceneComponent />
            <Audio src={staticFile(audioFile)} />
          </Sequence>
        )
      })}
    </AbsoluteFill>
  )
}
