# AI4T Video Pipeline

End-to-end pipeline that turns a lesson script + x.ai TTS into a 1920×1080 narrated MP4 using Remotion.

## What's here

```
video-pipeline/
├── README.md              ← you are here
├── src/
│   ├── lesson-01-script.json   ← VO script, per-scene (text + speech tags)
│   └── generate-audio.mjs      ← TTS pipeline (x.ai /v1/tts → audio/*.mp3)
├── audio/                 ← generated narration MP3s (gitignored)
├── out/                   ← rendered MP4s (gitignored)
└── remotion/              ← React + Remotion video renderer
    ├── package.json
    ├── remotion.config.mjs
    ├── public/
    │   └── audio → ../../audio  (symlink for staticFile())
    └── src/
        ├── index.jsx
        ├── Root.jsx           ← registers <Composition>
        ├── Lesson01.jsx       ← main movie: scene timings + audio mixing
        ├── Scenes.jsx         ← 12 scene React components
        ├── theme.js           ← WARM design tokens
        └── helpers.js         ← Easing functions + clamp
```

## Prerequisites

- Node 18+
- `XAI_API_KEY` in `../.env.local` (gitignored, Vite-style)

## Render Lesson 01 end-to-end

```bash
# 1. Generate narration (idempotent — skips existing MP3s)
cd src
node generate-audio.mjs
cd ..

# 2. Install Remotion deps (one-time, ~150 MB)
cd remotion
npm install --cache /tmp/npm-cache-ai4t

# 3. Render MP4 1920×1080 30fps
npm run render
# → ../out/lesson-01-what-is-ai.mp4
```

Force-regenerate audio if the script changes:

```bash
node src/generate-audio.mjs --force
```

Generate just one scene:

```bash
node src/generate-audio.mjs --scene 4
```

## Live preview while editing scenes

```bash
cd remotion
npm run preview     # opens Remotion Studio at http://localhost:3000
```

## Why the timings live in Lesson01.jsx (and not in the audio script)

Each scene's window must be slightly longer than its narration MP3 to give a clean
tail before the next scene starts. After regenerating audio with a different voice,
re-measure with `ffprobe -show_entries format=duration` and update the
`SCENE_DURATIONS` array at the top of `remotion/src/Lesson01.jsx`. The last scene
gets a generous tail because the closing line is short and should breathe.

## Mapping back to the Claude design handoff

The handoff prototype (`AI4T-video-Claude-design/design_handoff_what_is_ai_video/prototype/`)
used a custom timeline engine: `<Stage>` + `<Sprite start end>` + `useSprite()`.
Direct translation to Remotion:

| Handoff prototype                 | Remotion equivalent                          |
|-----------------------------------|----------------------------------------------|
| `<Stage duration={228}>`          | `<Composition durationInFrames={228 * 30}>`  |
| `<Sprite start={11.24} end={27.4}>` | `<Sequence from={11.24*30} durationInFrames={(27.4-11.24)*30}>` |
| `useSprite().localTime`           | `useCurrentFrame() / fps` (Sequence is local) |
| `<Narrator>` + `<audio>`          | `<Audio src={staticFile(...)}>`              |

Coordinates, easing curves, and animation choreography are preserved verbatim.

## Cost

x.ai TTS is $15 / 1M characters. Lesson 01 narration is ~3,000 chars → **$0.045 per render**.
Rendering on a laptop is free; 3:40 video takes ~5 min on M-series Mac at 2-thread
concurrency.
