# Lesson self-check quizzes

Every lesson ends with a short self-check rendered by
[`src/components/Lessons/Quiz.jsx`](../../components/Lessons/Quiz.jsx) and loaded by
[`src/utils/quizLoader.js`](../../utils/quizLoader.js).

Nothing is stored and nothing is graded. Reloading the page starts over — this is a
"did that stick?" moment for the reader, not an assessment.

## Where files go

```
src/data/quizzes/<lang>/<category-slug>/<lesson-slug>.json
```

- `<lang>` — `en`, `ro`, … Matches the language segment of the route (`/ro/lesson/…`).
- `<category-slug>` — the `category` field from the lesson's frontmatter:
  `ai-literacy`, `practical-skills`, `considerations`, `accessibility`.
- `<lesson-slug>` — the `slug` field from the lesson's frontmatter.

This mirrors how `src/content/<lang>/` is organised, and for the same reason: a quiz
is lesson content and gets translated alongside the lesson.

**Adding a language means adding a folder.** No code change. The loader picks up
anything under `src/data/quizzes/` through a Vite glob at build time.

**Missing translations fall back to English.** A lesson whose quiz has not been
translated yet still shows the English quiz on the translated route, rather than
silently losing its self-check. `getQuiz` returns `null` only when no quiz exists in
any language, and `Quiz.jsx` then renders nothing at all.

## File format

```json
{
  "slug": "what-is-ai",
  "questions": [
    {
      "id": "q1",
      "type": "single",
      "text": "Question shown to the reader",
      "options": [
        { "id": "a", "text": "…" },
        { "id": "b", "text": "…" }
      ],
      "correct": ["b"],
      "explanation": "Shown after the reader checks their answers."
    }
  ]
}
```

| Field | Notes |
|---|---|
| `slug` | Must equal the filename and the lesson's frontmatter slug. **Stays English in every language** — it is a routing key, not reading text. |
| `id` | `q1` … `q4`, in order. |
| `type` | `single` (one answer), `multi` (several), `truefalse`. |
| `options` | Omitted entirely for `truefalse` — the component supplies translated True/False labels from `quiz.true` / `quiz.false`. |
| `correct` | Always an array of strings, even for `single`. For `truefalse` it is `["true"]` or `["false"]` — **these two literals are never translated**. |
| `explanation` | One or two sentences saying why the answer is what it is. Shown for right and wrong answers alike. |

House style, as approved on AI Literacy: four questions per lesson, all three types
represented, `single` with 4 options, `multi` with 5 options and 2–3 correct.

## Writing rules

1. **Answerable from the lesson text alone.** Not from general knowledge of AI.
2. **Every distractor must be unambiguously wrong according to the lesson.** The
   most common defect is a distractor that happens to also be true — check each one
   against the text before shipping it.
3. **Distractors should be plausible**: a misconception the lesson refutes, two
   concepts from the lesson swapped, or a correct claim pushed too far.
4. Ask about what a teacher should take away, not about trivia (names, ordering
   within a list, prices, button labels — these also age badly).
5. Match the lesson's own spelling. The English lessons use British forms
   (`organise`, `summarise`, `behaviour`).

## Translating

Copy the English file and translate **only** `text`, `options[].text` and
`explanation`. Everything structural stays byte-identical: `slug`, question `id`s and
order, `type`, option `id`s and order, and the `correct` array. Changing option order
without changing `correct` will silently mark the wrong answer as right.

Take terminology from the translated lesson, not from the English quiz — the lesson
translation is the authority for how a term is rendered in that language.
