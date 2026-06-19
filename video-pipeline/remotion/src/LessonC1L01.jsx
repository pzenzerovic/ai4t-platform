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
export const LESSON_ID = 'c1-l01' // What is AI?

// Scene durations (seconds) derived from Sal-voice MP3 lengths + tail padding.
// Each scene's audio fits inside its window; the tail is silent breathing room.
// To regenerate timings: run video-pipeline/src/generate-audio.mjs, then
// `ffprobe` each MP3 and add ~1.0s tail. Last scene gets longer tail for
// the closing "Use it with judgment" line to breathe.
// Scene durations = audio length + 0.4s tail (1.5s tail for the closing).
// Synced from MP3 lengths by video-pipeline/src/sync-scene-durations.mjs.
const SCENE_DURATIONS = [
  10.3,  // S1 Title
  13.9,  // S2 Clear the noise
  19.2,  // S3 Definition
  19.9,  // S4 Key insight
  20.9,  // S5 Can do
  25.4,  // S6 Cannot do
  25.4,  // S7 Three myths
  21.1,  // S8 Chatbot vs LLM
  17.3,  // S9 Narrow vs AGI
  13.5,  // S10 Already in edu
  21.0,  // S11 Skills
  3.5,   // S12 Closing
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

export const LESSON_DURATION_SECONDS = SCENE_DURATIONS.reduce((a, b) => a + b, 0)

export const LessonC1L01 = () => {
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
        const audioFile = `audio/c1-l01/scene-${String(sceneNumber).padStart(2, '0')}.mp3`
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
