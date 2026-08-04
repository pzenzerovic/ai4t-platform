# AI4T Platform — Claude project brief

Project-specific context for Claude when working in this repository.

---

## What this is

**AI4Teachers (AI4T)** — Erasmus+ KA210-SCH-86126A35 project (`2024-1-HR01-KA210-SCH-000256076`).
Educational web platform for K-12 teachers learning to use AI in their classroom.
Coordinator: **OŠ Ivana Cankara, Zagreb**. Partners: 105 Dimotiko Scholio
Thessalonikis (GR), OŠ Horvati (HR), Asociatia Adfaber (RO, București), EDUKA (HR).

## Live deployment

- Production: **[ai4teachers.app](https://ai4teachers.app)** (custom domain bought through Vercel)
- Git remote: `https://github.com/pzenzerovic/ai4t-platform.git`
- Vercel: auto-deploys on push to `main`
- Project memory dir for Claude: `~/.claude/projects/-Users-paolo-Desktop-Claude-Cowork-radni-folder-AI4T-platforma/memory/`
  ⚠️ **Stale path** — named after the old Desktop location, see [Housekeeping](#housekeeping--migration-2026-08-05).

## Repo layout

```
ai4t-platform/
├── src/                      ← React/Vite single-page app (THE platform)
│   ├── components/
│   ├── content/{en,hr,el,ro}/   ← Lesson markdown files
│   ├── i18n/                 ← UI translations (4 languages)
│   └── data/                 ← KAS questions, categories, curated-links.json
├── PLATFORM-STATUS.md        ← Platform feature status (📋/📝/✅) — keep updated
├── CONTENT-STATUS.md         ← Lesson content + translation status — keep updated
├── LESSON-TEMPLATE.md        ← Style guide for new lesson markdown
├── video-pipeline/           ← Remotion-based video renderer (separate workflow)
│   ├── src/                  ← VO scripts (JSON) + audio gen + render scripts
│   ├── remotion/             ← Remotion compositions, templates, theme
│   ├── audio/                ← Per-lesson x.ai TTS MP3s (gitignored)
│   └── out/                  ← Rendered MP4s — review/ and final/ subdirs (gitignored)
└── .env.local                ← XAI_API_KEY for TTS (gitignored)
```

## Project current status (2026-06-20)

### Platform (`ai4teachers.app`)
- ✅ Core platform live: Homepage, Resources, Lesson page, KAS wizard, results,
  PDF export, responsive, multi-language UI, Language switcher (EN + RO active).
- 📋 About page — planned, not done.
- Footer EU disclaimer — draft, needs Erasmus+ formal review.

### Lesson content (English)
- **33/33 lessons drafted** across 4 categories. All published on platform.
- Status doc: [CONTENT-STATUS.md](CONTENT-STATUS.md) (auto-updated alongside changes).

### Translations
- **EN:** 33/33 drafted
- **RO:** 33/33 (29 by partner Adfaber + 4 drafted in partner's style for cat2/05,
  cat2/06, cat3/08, cat3/09 — awaiting partner review)
- **HR / EL:** 0/33 — not started, hidden in LanguageSwitcher
- UI strings: all 4 languages complete

### Curated external resources
- All 4 categories have curated links (38 total): AI Literacy 10, Practical Skills
  10, Considerations 10, Accessibility 8.

### Video materials (NEW — separate from web platform)

Animated 2-3 min explainer videos for each lesson, generated via:
- **x.ai TTS** (voice: Sal) → narration MP3s in `video-pipeline/audio/{lessonId}/`
- **Remotion** (React → MP4) → compositions in `video-pipeline/remotion/src/LessonCxLyy.jsx`
- Reusable scene templates in `video-pipeline/remotion/src/Templates.jsx`
- All 33 compositions registered in `Root.jsx`
- Two render profiles: `review` (1080p CRF 23, ~5 MB) and `final` (native 4K CRF 14, ~17 MB)

**Status: 33/33 review-quality MP4s rendered** (in `video-pipeline/out/review/`).
**Sent for review to colleague via WeTransfer on 2026-06-20.**
Awaiting feedback (free-form Excel table: video name | comments).

## Working conventions

- Workbench root: see [Housekeeping](#housekeeping--migration-2026-08-05) — moved off the Desktop
  on 2026-08-05. Old path was `/Users/paolo/Desktop/Claude Cowork radni folder/AI4T platforma/`.
- Working dir for code: `ai4t-platform/`
- User's primary language: **Croatian** (Paolo communicates in HR; respond in HR
  unless asked otherwise). Technical terms (React, Remotion, frontmatter, commit,
  etc.) stay in English.
- Markdown is the substrate. Outputs → HTML or PDF via Pandoc / WeasyPrint.
- Commit messages: short, descriptive, "why" not "what". Co-author trailer with
  `Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.
- Pushes to `main` need explicit user authorization each time (Vercel deploys
  on push, blast radius is the live site).

## Key files for orientation

| File | Purpose |
|---|---|
| [PLATFORM-STATUS.md](PLATFORM-STATUS.md) | Living feature status for partners. Update when finishing a feature. |
| [CONTENT-STATUS.md](CONTENT-STATUS.md) | Living content/translation status. Update when adding lessons. |
| [LESSON-TEMPLATE.md](LESSON-TEMPLATE.md) | Required style guide for any new EN lesson markdown. |
| [video-pipeline/README.md](video-pipeline/README.md) | How to regenerate audio + render videos. |
| [video-pipeline/AGENT-REFERENCE.md](video-pipeline/AGENT-REFERENCE.md) | Tight brief for parallel agents writing video drafts. |
| [video-pipeline/REVIEW-INSTRUCTIONS-FOR-COLLEAGUE.md](video-pipeline/REVIEW-INSTRUCTIONS-FOR-COLLEAGUE.md) | What we sent to colleague for video review. |

## Open threads / next steps

1. **Awaiting video review feedback** from colleague (Excel: name | comments).
   When it arrives, group by lesson, fix in priority order. Re-render only the
   touched lessons via `node video-pipeline/src/render-all.mjs --only C{N}L{NN}-{Slug}`.
2. **Final render + YouTube upload** (4K profile) once review feedback is in.
3. **RO partner review of the 4 AI-drafted Romanian translations** (cat2/05,
   cat2/06, cat3/08, cat3/09).
4. **About page** — design + implement.
5. **HR / EL translations** — coordinate with OŠ Cankara/Horvati and Thessaloniki.
6. **Curated links** for Cat 2-4 could grow beyond current floor (current 10/10/10/8).

## Housekeeping / migration (2026-08-05)

Context: Paolo is moving to a new MacBook Air M4; the M1 becomes a home server. The old
`Claude Cowork radni folder` on the Desktop (a defensive copy from early Claude Code days) was
emptied and its subfolders filed into their proper Google Drive project trees.

### What changed for this repo

- **Moved.** Repo now lives at
  `~/odrive/Paolo Google Drive/Poslovni projekti/6_Veći projekti/Erasmus - AI4T - Cankarica/Claude radni folderi/AI4T platforma/ai4t-platform/`
  (was under `~/Desktop/Claude Cowork radni folder/`). It is now inside odrive/Drive sync.
- **`node_modules/` deleted** — both the root one and `video-pipeline/remotion/node_modules/`
  (478 MB, incl. a headless-Chrome binary). They were syncing tens of thousands of tiny files to
  Google Drive. Restore with `npm install` in each location; nothing authored was lost.
- **Nothing was committed, pushed, or deployed** in this session.

### ⚠️ Open decision — 3 uncommitted files

Paolo deferred this deliberately: decide when next working on the project, not before.

```
?? audio/                            ← probably generated TTS output; likely should be gitignored
?? generate-narration.js             ← looks like real source, probably should be committed
?? video-pipeline/src/vimeo-upload.mjs   ← looks like real source, probably should be committed
```

Note `video-pipeline/audio/` is already gitignored but a root-level `audio/` is not — worth
checking whether the root one is a stray duplicate before deciding.

### ⚠️ 1 unpushed commit — pushing DEPLOYS TO PRODUCTION

```
0f7936a  Apply review feedback fixes to video lesson pipeline
```

`main` auto-deploys to **ai4teachers.app** via Vercel. Per the standing rule in
[Working conventions](#working-conventions), pushes need explicit authorization each time.
Do not push this as an incidental step in some other task.

### Planned (not done yet)

Move the code out of Drive to `~/Projects/ai4t-platform/` — cloud sync can corrupt `.git` if it
uploads a partially-written commit. Large gitignored assets (`video-pipeline/out/`, ~482 MB of
rendered MP4s) stay in Drive, since GitHub rejects files over 100 MB. When that move happens,
the stale `~/.claude/projects/-Users-paolo-Desktop-...` memory dir should be renamed too.

Until then: **consider pausing odrive during `npm install` or heavy builds.**

## Things to remember

- **Never paste secrets in chat.** XAI_API_KEY is in `.env.local` (gitignored).
- **Test typography/layout changes in Remotion Studio first** (`cd video-pipeline/remotion && npm run preview`), not by full render — render takes 2-5 min per video.
- **Scene durations sync to actual audio length** via `sync-scene-durations.mjs`.
  Don't manually edit `dur` values; regenerate audio first if narration changes.
- **Composition IDs must use `-` not `_`** (Remotion validation).
- **The web platform and the video pipeline are independent** — changes in
  `video-pipeline/` don't trigger Vercel rebuilds of the React app.
