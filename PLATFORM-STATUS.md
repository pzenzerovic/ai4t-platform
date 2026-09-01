# AI4Teachers — Platform & Feature Status

> **Last updated:** 2026-09-01
>
> This document tracks the status of platform features and the Knowledge Assessment System.
> Partners can use this to see what is built, what needs refinement, and what is planned.
>
> See also: [CONTENT-STATUS.md](CONTENT-STATUS.md) for educational content and translation status.

**The course is 33 lessons in four categories: 8 + 9 + 9 + 7.** The homepage counts
these from the lesson files themselves rather than from a stored number, so the
figure shown to visitors cannot drift away from what is actually published.

### Status Legend

| Icon | Status | Meaning |
|------|--------|---------|
| 📋 | Planned | Not yet started |
| 📝 | Draft published | On the platform, still being refined |
| ✅ | Final version | Reviewed, finalized, no further changes expected |

---

## Knowledge Assessment System (KAS)

| Component | Status | Notes |
|-----------|--------|-------|
| Questions — AI Literacy (5 questions) | 📝 Draft published | |
| Questions — Practical AI Skills (5 questions) | 📝 Draft published | |
| Questions — Considerations on AI (5 questions) | 📝 Draft published | |
| Questions — AI for All Learners (5 questions) | 📝 Draft published | |
| Scoring logic and level assignment | ✅ Final version | |
| Radar chart visualization | ✅ Final version | |
| Personalized learning path generation | ✅ Final version | |
| PDF export of results | 📝 Draft published | Needs graphical reworking and header/footer addition |
| Results persistence (browser storage) | ✅ Final version | |
| KAS question translations (HR, EL, RO) | 📋 Planned | |

---

## End-of-lesson self-check quizzes

Every lesson ends with a short self-check: 4 questions mixing single-choice,
multiple-choice and true/false, with an explanation revealed after checking.
Nothing is stored and nothing is graded — reloading the page starts over.

| Category | Lessons | Quizzes (EN) | Quizzes (RO) | Status |
|---|---|---|---|---|
| AI Literacy | 8 | 8 | 8 | ✅ Final version |
| Practical AI Skills | 9 | 9 | 9 | ✅ Final version |
| Considerations on AI | 9 | 9 | 9 | ✅ Final version |
| AI for All Learners | 7 | 7 | 7 | ✅ Final version |
| **Total** | **33** | **33** | **33** | |

Quiz files live in `src/data/quizzes/<lang>/<category>/<lesson-slug>.json`, mirroring
how `src/content/<lang>/` is organised. Adding a language means adding a folder — no
code changes. A lesson with no quiz in the current language falls back to English.

Romanian questions were translated against the Romanian lesson text so the
terminology matches what the partner used, and still await partner review.

---

## Lesson plans

Classroom lesson plans contributed by the project's schools, published as a section
of their own at `/<lang>/lesson-plans`. They are not part of the 33-lesson course and
are counted separately: the course teaches teachers about AI, the plans show what
teachers then did with it in front of a class.

| Item | Count | Status |
|---|---|---|
| Lesson plans (EN) | 13 | 📝 Draft published |
| — documented as taught in a classroom | 4 | 📝 Draft published |
| — published as teaching material, ready for delivery | 9 | 📝 Draft published |
| Lesson plans (RO) | 0 | 📋 Planned — the English plans are served on the RO route |

Contributing schools: OŠ Ivana Cankara, Zagreb (12) and OŠ Horvati, Zagreb (1).

Each plan carries an 18-key frontmatter block: subject, age group, duration, the AI
tools used, **how** the AI was used, author, school, and an `implemented` flag. The
"Implemented in classroom" badge appears only where `implemented: true` — that is,
only where a school report documents the lesson actually being taught. The remaining
plans are honest teaching material with no classroom record yet, and the interface
does not blur the difference.

Plan files live in `src/content/<lang>/lesson-plans/<NN>-<slug>.md`, alongside the
lesson categories but loaded separately by `src/utils/lessonPlanLoader.js`; the course
loader skips that folder so plans never leak into the Resources library. Plans render
through the same `MarkdownArticle` component as the lessons, so the two read identically.

**Language fallback:** a language with no plans of its own falls back to English —
the same rule the quizzes use. `/ro/lesson-plans` therefore shows the 13 English plans
inside Romanian navigation, with a visible note saying the plans are English-only for
now. When Romanian plans are added under `src/content/ro/lesson-plans/`, they take over
automatically and the note disappears; no code change is needed.

Croatian versions exist for 12 of the 13 plans but are **not** published here — the
platform serves EN and RO, and the HR locale is switched off. They are kept in the
project folder as additional Croatian material for the report.

---

## Platform Features

| Feature | Status | Notes |
|---------|--------|-------|
| Homepage with category overview | ✅ Final version | |
| Resource library with filtering | ✅ Final version | |
| Lesson page with Markdown rendering | ✅ Final version | Breadcrumbs, prev/next navigation |
| Curated external resources | ✅ Final version | Shown at category level on resources page |
| Image support in lessons | ✅ Final version | Local images, 3 sizes (full/medium/small), auto-captions |
| YouTube video embeds | ✅ Final version | Auto-detected from links, privacy-enhanced mode |
| Lesson writing template | ✅ Final version | LESSON-TEMPLATE.md with full authoring guide |
| Knowledge Assessment System | ✅ Final version | Full wizard flow |
| KAS results with radar chart | ✅ Final version | |
| Personalized learning path | ✅ Final version | |
| PDF export | ✅ Final version | |
| Multi-language UI | ✅ Final version | EN, HR, EL, RO |
| Responsive mobile layout | ✅ Final version | |
| Vercel deployment | ✅ Final version | Auto-deploys on push |
| Community page | ✅ Final version | Points to the project's three eTwinning groups on ESEP |
| Lesson plans section | 📝 Draft published | 13 EN plans at `/<lang>/lesson-plans` — see section above |
| End-of-lesson self-check quizzes | ✅ Final version | All 33 lessons, EN + RO — see section above |
| Vercel Web Analytics | ✅ Final version | Anonymous page-view counting, no cookies |
| Footer with partner info + EU disclaimer | ✅ Final version | Official EU emblem artwork, NEG variant, switching on the route language (EN/RO live, HR/EL ready). The separate "Co-funded by the European Union" text line was dropped as a duplicate — the emblem sets that wording as type and carries it as alt text. The long disclaimer paragraph is the prescribed template and stays; since 2026-09-01 it is the AMPEU wording (KA210 is a decentralised action, so the granting authority named in it is our national agency, not EACEA) — decision memo AIT-33. Provenance: [EU-EMBLEM-SOURCES.md](EU-EMBLEM-SOURCES.md) |
| Accessibility quick wins | ✅ Final version | Page language follows the route, page titles per route, skip link, quiz result announced to screen readers, translated ARIA labels, contrast of secondary text raised |
| Brand orange passes AA | ✅ Final version | `accent` moved `#E8732A` → `#AB4D13` (3.04:1 → 5.52:1 on white). Same hue and saturation, lightness lowered — one axis. Because WCAG contrast is symmetric, that single shade covers orange text on light *and* white text on orange, so no component picks a token by direction. `accent-dark` `#893E0F` (7.61:1) for hover and emphasis; `accent-light` `#F09050` (7.44:1) on the dark footer; `accent-vivid` keeps the original `#E8732A` for decoration only — the hero glow, where nothing sits on top |
| Language switcher | ✅ Final version | Active in header — EN + RO live; HR + EL commented out until translations land |
| Search functionality | ✅ Final version | Implemented, hidden for now |
| About page | 📋 Planned | |

---

## How to Update This Document

When a feature or component status changes:
1. Change 📋 Planned → 📝 Draft published → ✅ Final version
2. Add or update notes as needed
3. Update the "Last updated" date at the top

---

*AI4T Project (2025-1-HR01-KA210-SCH-000356497) — Co-funded by the European Union through the Erasmus+ programme.*
