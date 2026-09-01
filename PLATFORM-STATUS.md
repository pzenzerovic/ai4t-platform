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
| End-of-lesson self-check quizzes | ✅ Final version | All 33 lessons, EN + RO — see section above |
| Vercel Web Analytics | ✅ Final version | Anonymous page-view counting, no cookies |
| Footer with partner info + EU disclaimer | 📝 Draft published | Short emblem statement now reads "Co-funded by the European Union"; the long EACEA paragraph is the prescribed template. **Open:** the emblem itself is still a placeholder box, not the official EU flag artwork |
| Accessibility quick wins | ✅ Final version | Page language follows the route, page titles per route, skip link, quiz result announced to screen readers, translated ARIA labels, contrast of secondary text raised. **Open:** brand orange `#E8732A` at 3.04:1 — awaiting a decision |
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
