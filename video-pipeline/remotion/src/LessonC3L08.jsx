// Lesson C3L08 — AI Policy for Schools
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, QuoteScene, BulletListScene, NumberedPillsScene,
  TwoColumnScene, ProcessFlowScene, ClosingScene,
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c3-l08'

const SCENES = [
  { dur: 6.7, component: () => (
    <TitleScene
      title="AI Policy for Schools"
      italicWord="Policy"
      subtitle="GDPR, data privacy, and acceptable use"
      kicker="AI4TEACHERS · 08"
    />
  )},
  { dur: 14.2, component: () => (
    <QuoteScene
      kicker="WHY IT MATTERS"
      quote="In the absence of policy, individuals make their own rules."
      attribution="That is not governance."
    />
  )},
  { dur: 15.7, component: () => (
    <BulletListScene
      kicker="GDPR · THE BASELINE"
      headline="Three principles that govern AI tools."
      items={[
        { text: 'Purpose limitation',  sub: 'Data collected for X cannot be used for Y' },
        { text: 'Data minimisation',   sub: 'Only what is strictly necessary' },
        { text: 'Storage limitation',  sub: 'No longer than needed' },
      ]}
      accent={W.sky}
      numbered={true}
    />
  )},
  { dur: 9.9, component: () => (
    <NumberedPillsScene
      kicker="SIX COMPONENTS"
      headline="A workable policy covers six things."
      items={[
        'Scope',
        'Permitted uses',
        'Data handling',
        'Tool approval',
        'Disclosure',
        'Review and governance',
      ]}
    />
  )},
  { dur: 15.4, component: () => (
    <TwoColumnScene
      kicker="02 · PERMITTED & PROHIBITED"
      headline="The practical core of every policy."
      left={{
        label: 'PERMITTED',
        title: 'Teachers may',
        bullets: ['Use anonymised material', 'Draft communications', 'Brainstorm lesson plans'],
      }}
      right={{
        label: 'PROHIBITED',
        title: 'Teachers may not',
        bullets: ['Enter identifiable student data', 'Use AI grades without review', 'Replace teacher feedback'],
      }}
      leftColor={W.sage}
      rightColor={W.clay}
    />
  )},
  { dur: 13.2, component: () => (
    <ProcessFlowScene
      kicker="04 · TOOL APPROVAL"
      headline="Before any new AI tool touches student data."
      steps={[
        { title: 'Review',  sub: 'Provider documentation' },
        { title: 'Sign',    sub: 'Data Processing Agreement' },
        { title: 'Assess',  sub: 'Impact assessment (DPIA)' },
      ]}
      tagline="No agreement means no compliance."
    />
  )},
  { dur: 13.7, component: () => (
    <BulletListScene
      kicker="STUDENT USE BY AGE"
      headline="Calibrate to developmental stage."
      items={[
        { text: 'Primary',         sub: 'Direct use restricted; teacher-curated only' },
        { text: 'Lower secondary', sub: 'Supervised use in specific lessons' },
        { text: 'Upper secondary', sub: 'Structured individual use, no personal data' },
        { text: 'Assessment',      sub: 'Treated as a separate policy question' },
      ]}
      accent={W.clay}
    />
  )},
  { dur: 14.5, component: () => (
    <BulletListScene
      kicker="FROM POLICY TO PRACTICE"
      headline="Three things make a policy real."
      items={[
        { text: 'Active communication — training, not just publication' },
        { text: 'Practical infrastructure — anonymisation routines, approved-tool lists' },
        { text: 'Consistent enforcement — in routine decisions, not just incidents' },
      ]}
      accent={W.sage}
      numbered={true}
    />
  )},
  { dur: 5.2, component: () => (
    <ClosingScene
      tagline="Written policy. Defensible practice."
      italicWord="Defensible"
      kicker="AI4TEACHERS · NEXT LESSON →"
    />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC3L08 = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c3-l08/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
