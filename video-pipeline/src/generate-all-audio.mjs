#!/usr/bin/env node
/**
 * Batch-generate narration MP3s for every lesson script in this folder.
 *
 * Walks src/ for files matching `lesson-c{N}-l{NN}-script.json`, then for each
 * lesson script runs the same TTS pipeline as generate-audio.mjs but skips
 * lessons whose audio folder already has MP3s (unless --force).
 *
 * Usage:
 *   node generate-all-audio.mjs            # all lessons, skip done
 *   node generate-all-audio.mjs --force    # regenerate everything
 *   node generate-all-audio.mjs --only c1-l05 c2-l03   # specific lessons only
 *
 * Env: XAI_API_KEY loaded from ai4t-platform/.env.local.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ENV_PATH = path.resolve(__dirname, '..', '..', '.env.local')
const AUDIO_ROOT = path.resolve(__dirname, '..', 'audio')

async function loadEnv() {
  try {
    const raw = await fs.readFile(ENV_PATH, 'utf8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq < 0) continue
      const k = trimmed.slice(0, eq).trim()
      const v = trimmed.slice(eq + 1).trim()
      if (!(k in process.env)) process.env[k] = v
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err
  }
}

async function callTts({ apiKey, text, voiceId, language }) {
  const res = await fetch('https://api.x.ai/v1/tts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text, voice_id: voiceId, language,
      output_format: { codec: 'mp3', sample_rate: 44100, bit_rate: 128000 },
    }),
  })
  if (!res.ok) {
    throw new Error(`x.ai TTS ${res.status}: ${await res.text()}`)
  }
  return Buffer.from(await res.arrayBuffer())
}

async function lessonDirHasAudio(lessonId, sceneCount) {
  const dir = path.join(AUDIO_ROOT, lessonId)
  try {
    const files = await fs.readdir(dir)
    const mp3s = files.filter(f => f.endsWith('.mp3'))
    return mp3s.length >= sceneCount
  } catch (_) { return false }
}

async function main() {
  await loadEnv()
  const apiKey = process.env.XAI_API_KEY
  if (!apiKey) {
    console.error('ERROR: XAI_API_KEY missing')
    process.exit(1)
  }

  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const onlyIdx = args.indexOf('--only')
  const onlyList = onlyIdx >= 0 ? args.slice(onlyIdx + 1).filter(a => !a.startsWith('--')) : null

  const files = await fs.readdir(__dirname)
  const scripts = files
    .filter(f => /^lesson-c\d-l\d{2}-script\.json$/.test(f))
    .sort()

  console.log(`Found ${scripts.length} lesson scripts.\n`)

  let totalScenes = 0
  let totalGen = 0
  let totalSkipped = 0
  let totalChars = 0

  for (const scriptFile of scripts) {
    const m = scriptFile.match(/^lesson-(c\d-l\d{2})-script\.json$/)
    const lessonId = m[1]
    if (onlyList && !onlyList.includes(lessonId)) continue

    const script = JSON.parse(await fs.readFile(path.join(__dirname, scriptFile), 'utf8'))
    const { voice_id: voiceId = 'sal', language = 'en', scenes } = script
    const audioDir = path.join(AUDIO_ROOT, lessonId)
    await fs.mkdir(audioDir, { recursive: true })

    if (!force && await lessonDirHasAudio(lessonId, scenes.length)) {
      console.log(`[skip] ${lessonId} — already has ${scenes.length} scene MP3s`)
      totalSkipped += scenes.length
      continue
    }

    console.log(`\n[lesson] ${lessonId} (${script.lesson || ''}) — ${scenes.length} scenes`)

    for (const scene of scenes) {
      const fileName = `scene-${String(scene.id).padStart(2, '0')}.mp3`
      const outPath = path.join(audioDir, fileName)
      try {
        const stat = await fs.stat(outPath)
        if (!force && stat.size > 0) {
          console.log(`  [skip] ${fileName}`)
          totalSkipped++
          continue
        }
      } catch (_) { /* missing — proceed */ }

      const started = Date.now()
      process.stdout.write(`  [gen ] ${fileName} ... `)
      try {
        const buf = await callTts({ apiKey, text: scene.text, voiceId, language })
        await fs.writeFile(outPath, buf)
        const ms = Date.now() - started
        console.log(`${(buf.length / 1024).toFixed(0)} KB (${ms} ms)`)
        totalGen++
        totalChars += scene.text.length
      } catch (err) {
        console.log('FAILED')
        console.error('  ', err.message)
      }
    }

    totalScenes += scenes.length
  }

  console.log('\n=================================')
  console.log(`Generated: ${totalGen} scenes`)
  console.log(`Skipped:   ${totalSkipped} scenes`)
  console.log(`Total chars sent: ${totalChars}`)
  console.log(`Estimated cost:   $${(totalChars / 1_000_000 * 15).toFixed(4)}`)
}

main().catch(err => { console.error(err); process.exit(1) })
