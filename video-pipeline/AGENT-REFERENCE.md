# Video Pipeline — Agent Reference

This file is a self-contained brief for autonomous agents writing lesson video
drafts. Read it once before processing assigned lessons.

## What you produce per lesson

Two files:

1. **VO script** → `video-pipeline/src/lesson-c{N}-l{NN}-script.json`
2. **Remotion composition** → `video-pipeline/remotion/src/LessonC{N}L{NN}.jsx`

Where `{N}` is the category (1-4) and `{NN}` is the lesson order within
category, zero-padded (e.g. `c1-l02`, `c3-l05`).

## VO script format

```json
{
  "lesson": "c{N}-l{NN} / {Title}",
  "title": "{Title}",
  "voice_id": "sal",
  "language": "en",
  "scenes": [
    { "id": 1, "name": "Title",   "text": "..." },
    { "id": 2, "name": "...",     "text": "..." },
    ...
    { "id": N, "name": "Closing", "text": "..." }
  ]
}
```

Rules:
- **8-10 scenes total** (not more)
- **150-180 words total narration** across all scenes (target 2-3 min video)
- First scene = title intro (~10s, short)
- Last scene = closing tagline (3-5s, 2-6 words)
- Use `[pause]` for natural breath pauses
- Use `<emphasis>word</emphasis>` for emphasised single words
- No newlines inside `text` strings
- Conversational tone — Sal will read with warmth
- Each scene's text should fit comfortably in 15-25 seconds of speech at 150 wpm

## Composition format

Use this skeleton EXACTLY (copy then replace content). The scene count and
durations must match the VO script.

```jsx
// Lesson C{N}L{NN} — {Title}
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion'
import { WARM as W } from './theme.js'
import {
  TitleScene, ClosingScene,
  // import only templates you use
} from './Templates.jsx'

export const FPS = 30
export const LESSON_ID = 'c{N}-l{NN}'

const SCENES = [
  { dur: 10, component: () => (
    <TitleScene title="..." subtitle="..." kicker="AI4TEACHERS · {NN}" />
  )},
  // ... one entry per scene, durations sum to ~150-180s
  { dur: 5, component: () => (
    <ClosingScene tagline="..." italicWord="..." kicker="AI4TEACHERS · NEXT LESSON →" />
  )},
]

const STARTS = SCENES.reduce((acc, sc) => { acc.push((acc[acc.length - 1] ?? 0) + sc.dur); return acc }, [])
STARTS.unshift(0); STARTS.pop()
export const LESSON_DURATION_SECONDS = SCENES.reduce((a, b) => a + b.dur, 0)

export const LessonC{N}L{NN} = () => (
  <AbsoluteFill style={{
    background: W.bg, WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale', textRendering: 'geometricPrecision', zoom: 2,
  }}>
    {SCENES.map((scene, i) => {
      const n = i + 1; const SC = scene.component
      return (
        <Sequence key={n} from={Math.round(STARTS[i] * FPS)}
          durationInFrames={Math.round(scene.dur * FPS)} name={`Scene ${n}`}>
          <SC /><Audio src={staticFile(`audio/c{N}-l{NN}/scene-${String(n).padStart(2, '0')}.mp3`)} />
        </Sequence>
      )
    })}
  </AbsoluteFill>
)
```

## Scene durations

Match `dur` (seconds) to expected narration length + ~1s tail. Calibration:
- Title scene (short intro): 10s
- Closing scene (short tagline): 5s
- Average content scene: 14-20s
- Heavy/list scene: 20-26s

For 8-10 scenes summing to ~150-180s.

## Templates (all in `./Templates.jsx`)

Each takes props as listed. Examples in `LessonC1L02.jsx` and `LessonC1L03.jsx`.

### TitleScene
```jsx
<TitleScene title="..." italicWord="..." subtitle="..." kicker="..." />
```
Lesson openers. The `italicWord` is rendered in clay italic within the title.

### BulletListScene
```jsx
<BulletListScene
  kicker="..."
  headline="..."
  items={[
    { text: '...', sub: '...' },   // sub is optional
    ...
  ]}
  accent={W.sage}     // W.clay | W.sage | W.sky
  numbered={true}     // shows 01, 02, 03 markers; false = colored squares
/>
```
3-5 items typically. For principles, takeaways, instructions.

### CardGridScene
```jsx
<CardGridScene
  kicker="..."
  headline="..."
  columns={3}         // 2 or 3
  accent={W.sage}     // border + swatch color
  items={[
    { title: '...', body: '...' },
    ...
  ]}
/>
```
4-6 cards. For capability lists, considerations, characteristics.

### NumberedPillsScene
```jsx
<NumberedPillsScene
  kicker="..."
  headline="..."
  items={['Item 1', 'Item 2', ...]}    // strings
/>
```
4-8 numbered pills wrapping. For introducing a numbered list (principles,
components) before expanding on each.

### PillCloudScene
```jsx
<PillCloudScene
  kicker="..."
  headline="..."
  items={['Item 1', ...]}
  accent={W.sage}
  filled={false}      // true = solid accent fill; false = cream w/ accent border
/>
```
6-10 wrapping pills. For tool inventories, example lists.

### BeforeAfterScene
```jsx
<BeforeAfterScene
  kicker="..."
  headline="..."
  weak="weak example text"
  strong="strong example text"
  tagline="..."       // optional, italic line below
/>
```
Two side-by-side cards (clay + sage). For weak/strong comparisons, before/after.

### EqualityScene
```jsx
<EqualityScene
  kicker="..."
  headline="..."
  left={{ label: '...', title: '...', bullets: [...] }}
  right={{ label: '...', title: '...', bullets: [...] }}
  tagline="..."
/>
```
Two cards with big "=" between. For "X is the same as Y under different labels".

### TwoColumnScene
```jsx
<TwoColumnScene
  kicker="..."
  headline="..."
  left={{ label: '...', title: '...', bullets: [...] }}
  right={{ label: '...', title: '...', bullets: [...] }}
  leftColor={W.clay}     // optional
  rightColor={W.sage}    // optional
/>
```
Two cards side-by-side without "=". For "X vs Y" or "Changes vs Stays".

### ConceptCirclesScene
```jsx
<ConceptCirclesScene
  kicker="..."
  headline="..."
  left={{ label: 'WORD', caption: 'small desc', color: W.sage }}
  right={{ label: 'WORD', caption: 'small desc', color: W.clay }}
  connector="x"          // "x" | "plus" | "arrow" | "equal"
  tagline="..."
/>
```
Two big colored circles with a connector. For contrasting two ideas as orbits.

### DefinitionScene
```jsx
<DefinitionScene
  kicker="..."
  headline="A concept is just an instruction."
  italicTerm="instruction"       // word within headline to render italic-clay
  flow={['Input', 'Process', 'Output']}   // optional 3-element flow row
  tagline="..."                  // optional callout at bottom
/>
```
A bold definition + optional small process flow viz.

### MythBustScene
```jsx
<MythBustScene
  kicker="..."
  headline="..."
  myths={[
    { myth: 'Misconception in quotes', reality: 'The correction.' },
    ...
  ]}
/>
```
1-3 myth/reality pairs with strike-through animation.

### TimelineScene
```jsx
<TimelineScene
  kicker="..."
  headline="..."
  events={[
    { year: '1950',  label: '...', sub: '...' },   // sub optional
    ...
  ]}
/>
```
Horizontal timeline. 4-6 events optimal.

### ProcessFlowScene
```jsx
<ProcessFlowScene
  kicker="..."
  headline="..."
  steps={[
    { title: '...', sub: '...' },
    ...
  ]}
  tagline="..."
/>
```
3-5 step cards in a row with arrows between.

### CycleStepsScene
```jsx
<CycleStepsScene
  kicker="..."
  headline="..."
  steps={[
    { title: '...', sub: '...' },
    ...
  ]}    // 4 steps in a clockwise cycle
  tagline="..."
/>
```
4 cards in a clockwise loop with curved arrow.

### AnnotatedPromptScene
```jsx
<AnnotatedPromptScene
  kicker="..."
  headline="..."
  segments={[
    { label: 'LABEL', color: W.clay, text: '...' },
    ...
  ]}
/>
```
A multi-segment block where each segment has a colored side-bar and label.
For showing structure of a prompt, document, framework, etc.

### StackScene
```jsx
<StackScene
  kicker="..."
  headline="..."
  layers={[
    { title: '...', sub: '...', color: W.clay },    // color optional
    ...
  ]}
/>
```
Vertical layer-cake. For pyramids, hierarchies, layered concepts.

### StatCalloutScene
```jsx
<StatCalloutScene
  kicker="..."
  headline="..."
  stat="99%"
  statLabel="OF CASES"
  context="...italic context line..."
/>
```
Big number with surrounding context. For emphasis on a single statistic.

### QuoteScene
```jsx
<QuoteScene
  kicker="..."
  quote="The memorable line in quotes."
  attribution="..."     // optional
/>
```
Big italic pulled-quote, centered. For principle statements.

### ToolWalkthroughScene
```jsx
<ToolWalkthroughScene
  kicker="..."
  headline="..."
  toolName="ChatGPT"
  toolTagline="One-line description of the tool"
  features={[
    'A feature',
    { title: 'Headline', sub: 'detail line' },
    ...
  ]}
  accent={W.clay}
/>
```
For tool-introduction lessons. Tool name + tagline on left, feature list on right.

### ClosingScene
```jsx
<ClosingScene
  tagline="Short closing phrase."
  italicWord="word"          // optional, italic-clay within tagline
  kicker="AI4TEACHERS · NEXT LESSON →"
/>
```
Lesson ender.

## Colors

Pull from `import { WARM as W } from './theme.js'`:
- `W.clay` — terracotta, used for caution / can't-do / myths
- `W.sage` — green, used for affirming / can-do / good news
- `W.sky` — dusty blue, third accent
- `W.ink`  — dark text
- `W.cream`— card surface
- `W.muted`— secondary text

## Rules

1. **Do NOT invent new templates.** If a lesson's content does not fit existing
   templates, choose the closest fit. Templates exist precisely so we keep
   consistency across 33 lessons.
2. **No newlines in JSON text strings.** Use `[pause]` for breath instead.
3. **Don't use template props that are not documented.** Stick to the API.
4. **Audio path is always `audio/c{N}-l{NN}/scene-NN.mp3`** — even though the
   audio doesn't exist yet (it will be generated separately).
5. **Use `WARM as W`** — not `WARM`. Templates expect the alias.
6. **Title scenes don't need an `italicWord`.** Only use if there's a natural
   word to italicise.
7. **One scene per concept.** Don't cram. Use the 8-10 scene budget for clarity.

## Reference compositions

- `remotion/src/LessonC1L02.jsx` — uses Title, PillCloud, Definition, CardGrid,
  NumberedPills, TwoColumn, BulletList, Closing.
- `remotion/src/LessonC1L03.jsx` — uses Title, BulletList, Timeline, Quote,
  Definition, Closing.
- `remotion/src/LessonC1L04.jsx` — uses Title, BulletList, CardGrid, Definition,
  ProcessFlow, Quote, ConceptCircles, Closing.
- `remotion/src/LessonC1L05.jsx` — uses Title, Definition, CardGrid,
  BulletList, Quote, Closing.

Look at these before writing yours so you match the style.
