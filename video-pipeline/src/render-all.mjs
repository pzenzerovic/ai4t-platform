#!/usr/bin/env node
/**
 * Render every registered Remotion composition to MP4.
 *
 * Walks Root.jsx for `id="..."` entries, then runs `npx remotion render` for
 * each one into ../out/{id}.mp4 (skipping already-rendered files unless
 * --force is passed).
 *
 * Two output profiles:
 *   --review (default): 1920×1080, CRF 23, concurrency 4 — ~2 min per video,
 *     ~5 MB files. Good enough for internal review and YouTube unlisted share.
 *   --final: native 4K (3840×2160), CRF 14, concurrency 2 — ~7 min per video,
 *     ~20 MB files. Use when uploading the final cut to the public YouTube
 *     channel.
 *
 * Usage:
 *   node render-all.mjs                          # review (1080p)
 *   node render-all.mjs --final                  # 4K
 *   node render-all.mjs --force                  # re-render even if file exists
 *   node render-all.mjs --only C1L01-WhatIsAi    # specific compositions
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REMOTION_ROOT = path.resolve(__dirname, '..', 'remotion')
const OUT_DIR = path.resolve(__dirname, '..', 'out')

async function discoverCompositions() {
  const rootJsx = await fs.readFile(path.join(REMOTION_ROOT, 'src', 'Root.jsx'), 'utf8')
  return [...rootJsx.matchAll(/id="([A-Z][0-9A-Za-z-]+)"/g)].map(m => m[1])
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })

  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const final = args.includes('--final')
  const onlyIdx = args.indexOf('--only')
  const onlyList = onlyIdx >= 0
    ? args.slice(onlyIdx + 1).filter(a => !a.startsWith('--'))
    : null

  // Profile selection: review (default) vs final.
  const profile = final ? {
    label: 'final 4K',
    scale: 1,
    crf: 14,
    concurrency: 2,
    subdir: 'final',
  } : {
    label: 'review 1080p',
    scale: 0.5,           // composition is 3840×2160, scale 0.5 → 1920×1080 output
    crf: 23,
    concurrency: 4,
    subdir: 'review',
  }

  const outProfileDir = path.join(OUT_DIR, profile.subdir)
  await fs.mkdir(outProfileDir, { recursive: true })

  const compositions = await discoverCompositions()
  console.log(`Found ${compositions.length} compositions in Root.jsx.`)
  console.log(`Profile: ${profile.label} (scale ${profile.scale}, CRF ${profile.crf}, conc ${profile.concurrency})`)
  console.log(`Output:  ${outProfileDir}\n`)

  let rendered = 0
  let skipped = 0
  let failed = 0
  const startedAll = Date.now()

  for (const id of compositions) {
    if (onlyList && !onlyList.includes(id)) continue

    const outPath = path.join(outProfileDir, `${id}.mp4`)
    if (!force) {
      try {
        const stat = await fs.stat(outPath)
        if (stat.size > 0) {
          console.log(`[skip] ${id} (${(stat.size / 1_000_000).toFixed(1)} MB)`)
          skipped++
          continue
        }
      } catch (_) { /* not present */ }
    }

    console.log(`\n[render] ${id}`)
    const started = Date.now()
    const result = spawnSync(
      'npx',
      [
        'remotion', 'render', 'src/index.jsx', id, outPath,
        '--scale', String(profile.scale),
        '--crf', String(profile.crf),
        '--concurrency', String(profile.concurrency),
        '--overwrite',
      ],
      { cwd: REMOTION_ROOT, stdio: 'inherit' }
    )
    const mins = ((Date.now() - started) / 60000).toFixed(1)
    if (result.status === 0) {
      console.log(`[done]  ${id} — ${mins} min`)
      rendered++
    } else {
      console.error(`[fail]  ${id} — exit ${result.status}`)
      failed++
    }
  }

  const totalMin = ((Date.now() - startedAll) / 60000).toFixed(1)
  console.log(`\n========================`)
  console.log(`Profile:  ${profile.label}`)
  console.log(`Rendered: ${rendered}`)
  console.log(`Skipped:  ${skipped}`)
  console.log(`Failed:   ${failed}`)
  console.log(`Total:    ${totalMin} min`)
}

main().catch(e => { console.error(e); process.exit(1) })
