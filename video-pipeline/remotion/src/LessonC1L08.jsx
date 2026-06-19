// Lesson C1L08 — The Future of AI
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, CardGridScene, DefinitionScene, BulletListScene,
  ConceptCirclesScene, TimelineScene, QuoteScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c1-l08'

const SCENES = [
  { dur: 8.2, component: () => (
    <TitleScene
      title="The Future of AI"
      subtitle="Memory, AGI, and what comes next"
      kicker="AI4TEACHERS · 08"
    />
  )},
  { dur: 12.1, component: () => (
    <CardGridScene
      kicker="THREE CATEGORIES"
      headline="Keep them separate."
      columns={3}
      accent={W.sky}
      items={[
        { title: 'Real today',  body: 'Narrow AI — chatbots, multimodal, tool use.' },
        { title: 'Coming',      body: 'Better memory, more capable agents.' },
        { title: 'Theoretical', body: 'AGI, superintelligence — no timeline.' },
      ]}
    />
  )},
  { dur: 12.8, component: () => (
    <DefinitionScene
      kicker="MEMORY"
      headline="Information that survives the conversation."
      italicTerm="survives"
      flow={['Context', '→', 'Memory']}
      tagline="From a tool you use to a tool that adapts to you."
    />
  )},
  { dur: 11.7, component: () => (
    <BulletListScene
      kicker="ABOUT MEMORY"
      headline="Not the same as human memory."
      items={[
        { text: 'Selective',    sub: 'Stores what it judges important' },
        { text: 'Limited',      sub: 'Caps on how much it holds' },
        { text: 'Manageable',   sub: 'You can view, edit, delete' },
        { text: 'Can be wrong', sub: 'May apply a stored fact in the wrong context' },
      ]}
      accent={W.sage}
    />
  )},
  { dur: 14.4, component: () => (
    <ConceptCirclesScene
      kicker="AGI vs ASI"
      headline="Two terms — kept apart."
      left={{
        label: 'AGI',
        caption: 'Human-level across all domains',
        color: W.sky,
      }}
      right={{
        label: 'ASI',
        caption: 'Beyond any human, at everything',
        color: W.clay,
      }}
      connector="arrow"
      tagline="Neither exists. Today's tools are still narrow AI."
    />
  )},
  { dur: 12.5, component: () => (
    <TimelineScene
      kicker="NEXT 2-5 YEARS"
      headline="What is actually coming."
      events={[
        { year: 'Soon',  label: 'Better memory',          sub: 'Persistent personalization' },
        { year: 'Soon',  label: 'More capable agents',    sub: 'Multi-step task handling' },
        { year: 'Soon',  label: 'Deeper integration',     sub: 'AI inside the tools you use' },
        { year: 'Soon',  label: 'Better multimodal',      sub: 'Real-time translation, video' },
        { year: 'Soon',  label: 'Education-specific',     sub: 'Tools built for teaching' },
      ]}
    />
  )},
  { dur: 12.4, component: () => (
    <BulletListScene
      kicker="HOW TO PREPARE"
      headline="The fundamentals change more slowly than the tools."
      items={[
        { text: 'Build a strong foundation now' },
        { text: 'Develop critical evaluation skills' },
        { text: 'Stay curious — but skeptical' },
        { text: 'Focus on what AI cannot replace' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 15, component: () => (
    <QuoteScene
      kicker="THE GOAL"
      quote="Not an AI expert — an AI-literate teacher."
    />
  )},
  { dur: 5, component: () => (
    <ClosingScene
      tagline="AI-literate. Not AI-anxious."
      italicWord="literate"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC1L08 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c1-l08/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
