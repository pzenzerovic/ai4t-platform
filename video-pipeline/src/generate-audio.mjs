#!/usr/bin/env node
/**
 * Generate per-scene narration MP3s using x.ai TTS.
 *
 * Reads lesson-01-script.json, calls https://api.x.ai/v1/tts for each scene,
 * writes scene-NN.mp3 into ../audio/. Skips scenes whose MP3 already exists
 * unless --force is passed.
 *
 * Usage:
 *   XAI_API_KEY=... node generate-audio.mjs [--scene N] [--force]
 *
 * Env:
 *   XAI_API_KEY  — required, x.ai API bearer token (loaded from .env.local)
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ENV_PATH = path.resolve(__dirname, '..', '..', '.env.local')

// Lesson is selected via --lesson c1-l01 (or any matching id). Each lesson has
// its own script JSON and per-lesson audio subdirectory.
function lessonPaths(lessonId) {
  return {
    script: path.join(__dirname, `lesson-${lessonId}-script.json`),
    audioDir: path.resolve(__dirname, '..', 'audio', lessonId),
  }
}

// Minimal .env.local loader — no extra deps. Picks up KEY=VALUE lines.
async function loadEnv(envPath) {
  try {
    const raw = await fs.readFile(envPath, 'utf8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq < 0) continue
      const key = trimmed.slice(0, eq).trim()
      const value = trimmed.slice(eq + 1).trim()
      if (!(key in process.env)) process.env[key] = value
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err
  }
}

async function generateScene({ apiKey, voiceId, language, scene, outPath }) {
  const body = {
    text: scene.text,
    voice_id: voiceId,
    language,
    output_format: {
      codec: 'mp3',
      sample_rate: 44100,
      bit_rate: 128000,
    },
  }

  const res = await fetch('https://api.x.ai/v1/tts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`x.ai TTS failed for scene ${scene.id} (${res.status}): ${errText}`)
  }

  const buffer = Buffer.from(await res.arrayBuffer())
  await fs.writeFile(outPath, buffer)
  return buffer.length
}

async function main() {
  await loadEnv(ENV_PATH)
  const apiKey = process.env.XAI_API_KEY
  if (!apiKey) {
    console.error('ERROR: XAI_API_KEY not set. Put it in ai4t-platform/.env.local')
    process.exit(1)
  }

  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const sceneFilterIdx = args.indexOf('--scene')
  const sceneFilter = sceneFilterIdx >= 0 ? parseInt(args[sceneFilterIdx + 1], 10) : null
  const lessonIdx = args.indexOf('--lesson')
  if (lessonIdx < 0) {
    console.error('ERROR: --lesson <id> is required (e.g. --lesson c1-l01)')
    process.exit(1)
  }
  const lessonId = args[lessonIdx + 1]

  const { script: scriptPath, audioDir } = lessonPaths(lessonId)
  const scriptRaw = await fs.readFile(scriptPath, 'utf8')
  const script = JSON.parse(scriptRaw)
  const { voice_id: voiceId, language, scenes } = script

  await fs.mkdir(audioDir, { recursive: true })

  console.log(`Lesson: ${lessonId} (${script.lesson})`)
  console.log(`Voice: ${voiceId} · Language: ${language}`)
  console.log(`Output: ${audioDir}`)
  console.log('')

  for (const scene of scenes) {
    if (sceneFilter !== null && scene.id !== sceneFilter) continue

    const fileName = `scene-${String(scene.id).padStart(2, '0')}.mp3`
    const outPath = path.join(audioDir, fileName)

    if (!force) {
      try {
        const stat = await fs.stat(outPath)
        if (stat.size > 0) {
          console.log(`[skip] ${fileName} (already exists, ${(stat.size / 1024).toFixed(1)} KB — use --force to regenerate)`)
          continue
        }
      } catch (_) { /* file does not exist, continue */ }
    }

    const startedAt = Date.now()
    process.stdout.write(`[gen ] ${fileName} — ${scene.name} ... `)
    try {
      const bytes = await generateScene({ apiKey, voiceId, language, scene, outPath })
      const ms = Date.now() - startedAt
      console.log(`${(bytes / 1024).toFixed(1)} KB (${ms} ms)`)
    } catch (err) {
      console.log('FAILED')
      console.error(err.message)
      process.exit(1)
    }
  }

  console.log('')
  console.log('Done.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
