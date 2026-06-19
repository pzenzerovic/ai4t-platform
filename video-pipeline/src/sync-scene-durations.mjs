#!/usr/bin/env node
/**
 * Sync scene `dur` values in every Lesson*.jsx file to actual MP3 lengths.
 *
 * For each lesson:
 *   1. Read its composition file (remotion/src/LessonCxLnn.jsx)
 *   2. Find the SCENES = [{ dur: X, ... }, ...] array
 *   3. For each scene index, ffprobe audio/c{N}-l{NN}/scene-NN.mp3
 *   4. Rewrite each `dur: X` to `audioDuration + TAIL` (rounded to 1dp)
 *
 * TAIL is the silent breathing-room after the audio ends. Was 1.0s — felt
 * dead. Now 0.4s default, 1.5s for closings to let the final line linger.
 *
 * Usage:
 *   node sync-scene-durations.mjs              # all lessons
 *   node sync-scene-durations.mjs c1-l03 c2-l05  # specific lessons only
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REMOTION_SRC = path.resolve(__dirname, '..', 'remotion', 'src')
const AUDIO_ROOT = path.resolve(__dirname, '..', 'audio')

const TAIL_DEFAULT = 0.4
const TAIL_CLOSING = 1.5  // last scene gets longer tail so the closing line breathes

function probeDuration(mp3Path) {
  const out = execSync(
    `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${mp3Path}"`,
    { encoding: 'utf8' }
  ).trim()
  return parseFloat(out)
}

async function processLesson(lessonId) {
  // Map c1-l03 -> LessonC1L03.jsx
  const m = lessonId.match(/^c(\d+)-l(\d+)$/)
  if (!m) {
    console.warn(`[skip] ${lessonId} — invalid id`)
    return
  }
  const compName = `LessonC${m[1]}L${m[2]}`
  const compFile = path.join(REMOTION_SRC, `${compName}.jsx`)

  let src
  try {
    src = await fs.readFile(compFile, 'utf8')
  } catch (_) {
    console.warn(`[skip] ${lessonId} — composition file not found`)
    return
  }

  const audioDir = path.join(AUDIO_ROOT, lessonId)
  let audioFiles
  try {
    audioFiles = (await fs.readdir(audioDir)).filter(f => f.endsWith('.mp3')).sort()
  } catch (_) {
    console.warn(`[skip] ${lessonId} — no audio dir`)
    return
  }

  if (audioFiles.length === 0) {
    console.warn(`[skip] ${lessonId} — no MP3s`)
    return
  }

  // Find every `dur: NUMBER,` inside the SCENES array.
  // We replace them in order using the audio durations.
  const durRegex = /\bdur:\s*([\d.]+)/g
  const matches = [...src.matchAll(durRegex)]

  if (matches.length !== audioFiles.length) {
    console.warn(`[warn] ${lessonId} — ${matches.length} dur entries but ${audioFiles.length} audio scenes`)
  }

  const newDurs = []
  let updated = src
  let lastIndex = 0
  let outChunks = []

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i]
    const audioPath = path.join(audioDir, `scene-${String(i + 1).padStart(2, '0')}.mp3`)
    let audioDur
    try {
      audioDur = probeDuration(audioPath)
    } catch (e) {
      console.warn(`  scene ${i + 1}: ffprobe failed — leaving dur unchanged`)
      // keep old dur
      outChunks.push(updated.slice(lastIndex, m.index + m[0].length))
      lastIndex = m.index + m[0].length
      newDurs.push(parseFloat(m[1]))
      continue
    }
    const tail = (i === matches.length - 1) ? TAIL_CLOSING : TAIL_DEFAULT
    const newDur = Math.round((audioDur + tail) * 10) / 10
    newDurs.push(newDur)

    // emit everything before this match, then the replacement
    outChunks.push(updated.slice(lastIndex, m.index))
    outChunks.push(`dur: ${newDur}`)
    lastIndex = m.index + m[0].length
  }
  outChunks.push(updated.slice(lastIndex))
  const rewritten = outChunks.join('')

  await fs.writeFile(compFile, rewritten)

  const oldTotal = matches.reduce((s, m) => s + parseFloat(m[1]), 0)
  const newTotal = newDurs.reduce((s, d) => s + d, 0)
  console.log(`${lessonId}: ${matches.length} scenes · ${oldTotal.toFixed(1)}s → ${newTotal.toFixed(1)}s (saved ${(oldTotal - newTotal).toFixed(1)}s)`)
}

async function main() {
  let lessons = process.argv.slice(2)
  if (lessons.length === 0) {
    // discover all
    const audioRoots = await fs.readdir(AUDIO_ROOT)
    lessons = audioRoots.filter(d => /^c\d+-l\d+$/.test(d)).sort()
  }
  console.log(`Syncing ${lessons.length} lessons:\n`)
  for (const id of lessons) {
    await processLesson(id)
  }
  console.log(`\nDone.`)
}

main().catch(err => { console.error(err); process.exit(1) })
