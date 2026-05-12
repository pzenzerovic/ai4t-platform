import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import { loadFont as loadFraunces } from '@remotion/google-fonts/Fraunces'
import { loadFont as loadInter } from '@remotion/google-fonts/Inter'
import { loadFont as loadJBMono } from '@remotion/google-fonts/JetBrainsMono'
import { WARM } from './theme.js'
import {
  Scene01, Scene02, Scene03, Scene04, Scene05, Scene06,
  Scene07, Scene08, Scene09, Scene10, Scene11, Scene12,
} from './Scenes.jsx'

// Load fonts (idempotent — Remotion deduplicates)
loadFraunces('normal', { weights: ['400', '500', '600'], subsets: ['latin'] })
loadFraunces('italic', { weights: ['400', '500', '600'], subsets: ['latin'] })
loadInter('normal',    { weights: ['400', '500', '600', '700'], subsets: ['latin'] })
loadJBMono('normal',   { weights: ['400', '500'], subsets: ['latin'] })

export const FPS = 30

// Scene durations (seconds) derived from Sal-voice MP3 lengths + tail padding.
// Each scene's audio fits inside its window; the tail is silent breathing room.
// To regenerate timings: run video-pipeline/src/generate-audio.mjs, then
// `ffprobe` each MP3 and add ~1.0s tail. Last scene gets longer tail for
// the closing "Use it with judgment" line to breathe.
const SCENE_DURATIONS = [
  11.0,  // S1 Title              (audio 9.87  + 1.13)
  14.5,  // S2 Clear the noise    (audio 13.51 + 0.99)
  19.8,  // S3 Definition         (audio 18.76 + 1.04)
  20.5,  // S4 Key insight        (audio 19.51 + 0.99)
  21.5,  // S5 Can do             (audio 20.51 + 0.99)
  26.0,  // S6 Cannot do          (audio 25.03 + 0.97)
  26.0,  // S7 Three myths        (audio 24.97 + 1.03)
  21.7,  // S8 Chatbot vs LLM     (audio 20.74 + 0.96)
  17.9,  // S9 Narrow vs AGI      (audio 16.88 + 1.02)
  14.0,  // S10 Already in edu    (audio 13.06 + 0.94)
  21.6,  // S11 Skills            (audio 20.58 + 1.02)
  5.0,   // S12 Closing           (audio 1.96  + 3.04 — long tail)
]

const SCENE_COMPONENTS = [
  Scene01, Scene02, Scene03, Scene04, Scene05, Scene06,
  Scene07, Scene08, Scene09, Scene10, Scene11, Scene12,
]

// Build cumulative start times
const SCENE_STARTS = SCENE_DURATIONS.reduce((acc, d) => {
  acc.push((acc[acc.length - 1] ?? 0) + d)
  return acc
}, [])
SCENE_STARTS.unshift(0)
SCENE_STARTS.pop() // we want starts, not the final end

export const LESSON_01_DURATION_SECONDS = SCENE_DURATIONS.reduce((a, b) => a + b, 0)

export const Lesson01 = () => {
  return (
    <AbsoluteFill style={{
      background: WARM.bg,
      // Greyscale AA — disables Chromium's macOS subpixel AA that would produce
      // RGB fringing on small text after H.264 chroma subsampling.
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'geometricPrecision',
      // Composition is 3840×2160 but scene coordinates are authored for the
      // 1920×1080 design canvas. `zoom: 2` causes Chromium to re-render text
      // and shapes at the higher resolution (unlike transform:scale which
      // would only upscale already-rasterised pixels).
      zoom: 2,
    }}>
      {SCENE_COMPONENTS.map((SceneComponent, i) => {
        const sceneNumber = i + 1
        const startSeconds = SCENE_STARTS[i]
        const durationSeconds = SCENE_DURATIONS[i]
        const fromFrame = Math.round(startSeconds * FPS)
        const durationFrames = Math.round(durationSeconds * FPS)
        const audioFile = `audio/lesson-01/scene-${String(sceneNumber).padStart(2, '0')}.mp3`
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
