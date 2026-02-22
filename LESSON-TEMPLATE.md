# AI4Teachers — Lesson Writing Guide & Template

> Use this document as a reference when writing new lessons in Claude.ai.
> You can paste it into a Claude.ai conversation alongside your source material.

---

## How to Write a Lesson

1. Open **Claude.ai** (claude.ai)
2. Upload or paste your source material (Word doc, PDF, notes)
3. Paste this template and tell Claude which lesson you're writing
4. Iterate until happy with the result
5. Copy the finished Markdown to **Claude Code** — it will place the file, commit, and deploy

---

## Frontmatter (Required)

Every lesson file starts with a YAML frontmatter block between `---` markers. All fields are required:

```yaml
---
title: "Your Lesson Title Here"
slug: "your-lesson-slug"
category: "ai-literacy"
level: "beginner"
description: "One or two sentences describing what the teacher will learn."
order: 3
---
```

### Field Reference

| Field | Description | Allowed Values |
|-------|-------------|----------------|
| `title` | Display title of the lesson | Any text in quotes |
| `slug` | URL identifier (lowercase, hyphens, no spaces) | e.g. `"how-llms-work"` |
| `category` | Which category this lesson belongs to | `"ai-literacy"`, `"practical-skills"`, `"considerations"`, `"accessibility"` |
| `level` | Difficulty level | `"beginner"`, `"intermediate"`, `"advanced"` |
| `description` | Short summary shown on lesson cards | 1-2 sentences in quotes |
| `order` | Position within the category (1 = first) | Number (no quotes) |

> **Note:** Reading time is calculated automatically from word count (200 words per minute). You do not need to set it.

---

## Content Structure

After the frontmatter, write the lesson content in Markdown. Every lesson must follow this structure:

### 1. Opening Hook (required)

The first section must explain **why this topic matters to teachers**. This is not a brief intro — it is a substantial paragraph (4-6 sentences) that establishes relevance, sets expectations for the lesson, and motivates the reader to continue.

Good hooks connect the topic to something teachers already experience, set up the problem the lesson will solve, or explain what the reader will be able to do differently after reading.

```markdown
## Why This Topic Matters

[4-6 sentences establishing relevance for teachers. Connect to their
daily practice. Set expectations for what the lesson will cover.]
```

### 2. Main Content Sections

The body of the lesson consists of 3-6 main concept sections using `##` headings, with optional `###` subsections for deeper detail.

Each concept section should be developed in **flowing prose paragraphs**, not bullet-point lists. Use blockquotes to highlight key insights at natural pause points (2-4 per lesson, not more).

When a section introduces a conceptual idea, end it by connecting back to classroom practice — explain what this means for the reader as a teacher.

### 3. Summary (required)

Every lesson must end with a `## Summary` section containing 5-7 bullet points. Each bullet should be a **complete sentence** that captures a key message, not a short fragment. A reader who only reads the summary should get the essential takeaways of the entire lesson.

```markdown
## Summary

- [Complete sentence capturing key message 1]
- [Complete sentence capturing key message 2]
- [Complete sentence capturing key message 3]
- [Complete sentence capturing key message 4]
- [Complete sentence capturing key message 5]
```

### Structural Template

```markdown
## Opening Hook / Why This Matters

[4-6 sentences of motivation and relevance]

## Main Concept 1

[Prose paragraphs with examples. End by connecting to classroom practice.]

> **Key Insight**: [Important takeaway]

## Main Concept 2

[More prose paragraphs...]

### Subsection (if needed)

[Deeper detail...]

## Main Concept 3

[Continue pattern...]

> **Tip**: [Practical advice for teachers]

## Practical Implications / What This Means for Teachers

[Explicit connection to classroom practice — may be woven into earlier
sections instead of a standalone section, but the connection must exist.]

## Summary

- [Complete sentence 1]
- [Complete sentence 2]
- [Complete sentence 3]
- [Complete sentence 4]
- [Complete sentence 5]
```

---

## Writing Style Rules

These rules ensure consistency across all lessons. They are based on the style established in Category 1 and must be followed for all future content.

### Prose Over Lists

Write in **flowing paragraphs**, not bullet-point lists. Lists should be used sparingly and only for content that is genuinely list-like: summaries, step-by-step procedures, comparison tables, or series of short parallel items.

**Wrong** — bullet-point dump:
```markdown
AI can help teachers by:
- Creating lesson plans
- Generating worksheets
- Translating content
- Summarizing texts
- Brainstorming ideas
```

**Right** — developed prose:
```markdown
Teachers are increasingly using AI to generate first drafts of lesson plans
and teaching materials, create differentiated worksheets for students at
different reading levels, produce quiz questions aligned with specific
learning objectives, translate content for multilingual classrooms, and
summarize long texts into student-appropriate versions.
```

### Formal but Warm Register

Avoid contractions. Write "do not" instead of "don't", "cannot" instead of "can't", "it is" instead of "it's". This creates a professional tone without being cold. Combine this with direct second-person address ("you", "your") to keep the tone warm and personal despite the formal register.

### Define Technical Terms Inline

When introducing a technical term for the first time, define it immediately — in the same sentence or the next. Use *italics* for the term on first use. Do not assume the reader will look up unfamiliar terms.

```markdown
This phenomenon is known as *hallucination* — when an AI model generates
information that sounds confident and plausible but is actually incorrect.
```

### Use Teaching Analogies

Wherever possible, explain AI concepts through analogies drawn from teaching practice. Teachers understand scaffolding, lesson planning, assessment, differentiation, and feedback loops — use these as bridges to AI concepts.

```markdown
Think of context as a lesson plan: just as a good lesson plan gives
structure to your teaching, good context gives structure to AI's responses.
```

### Connect Every Concept to Practice

Every major concept section should explicitly connect back to what this means for teachers in their classroom. Do not leave the reader to make the connection themselves. Either include a paragraph at the end of each section or dedicate a standalone section to practical implications.

### Reference Other Lessons

When a concept was covered in a previous lesson or will be explored in a later one, reference it briefly. This creates a sense of a cohesive course rather than isolated articles.

```markdown
Recall from the previous lesson that an LLM generates text by predicting
the most likely next token based on patterns learned from training data.
```

```markdown
This skill — communicating clearly with AI — is explored in depth in the
Practical AI Skills lessons.
```

### Myth-Busting Pattern

When addressing common misconceptions, use the explicit pattern: **name the myth, then dismantle it**. Bold the myth as a quote, then explain why it is wrong.

```markdown
**Myth: "AI understands what I'm saying."** AI processes patterns in language.
When you type a question and receive a remarkably relevant response, it is
easy to feel that you are being understood. In reality, the AI has learned
from billions of text examples what kind of response typically follows your
kind of question.
```

### Blockquote Discipline

Use blockquotes (Key Insight, Tip, Warning) **2-4 times per lesson**, not more. Each blockquote should mark a genuine highlight moment — something worth remembering even if the reader skims everything else. Overusing blockquotes dilutes their impact.

| Blockquote Type | When to Use |
|-----------------|-------------|
| `> **Key Insight**:` | For fundamental conceptual takeaways |
| `> **Tip**:` | For practical, actionable advice |
| `> **Warning**:` | For important cautions or common pitfalls |

### Tables for Comparison, Not Decoration

Use tables when comparing features, listing tools with attributes, or presenting structured data. Do not use tables as a substitute for prose or as decoration. Every table should serve a clear purpose that would be harder to achieve in paragraph form.

### No "Next Steps" Section

Do not end lessons with a "Next Steps" or "Coming Up Next" section. End with the Summary. If the lesson naturally connects to the next topic, weave that reference into the final content paragraphs before the Summary.

---

## Word Count Targets

The platform auto-calculates reading time at 200 words per minute:

| Target Reading Time | Word Count |
|-------------------|------------|
| 5 min | ~1,000 words |
| 8 min | ~1,600 words |
| 10 min | ~2,000 words |
| 12 min | ~2,400 words |

**Minimum word count: 1,600 words.** Most lessons should aim for **8-10 minutes** (1,600-2,000 words). Lessons may go up to 2,400 words if the topic requires it, but should not exceed that. If a lesson is running long, consider splitting it into two lessons.

---

## Formatting Reference

### Text Formatting

```markdown
**Bold text** for emphasis
*Italic text* for terms on first use, or for titles
`inline code` for technical terms, tool names, or commands
```

### Lists

```markdown
- Bullet point
- Another point
  - Nested point

1. Numbered step
2. Another step
3. Final step
```

### Blockquotes (for key insights, tips, warnings)

```markdown
> **Key Insight**: This is an important takeaway.

> **Tip**: Practical advice for teachers.

> **Warning**: Something to be careful about.
```

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data | Data | Data |
| Data | Data | Data |
```

---

## Images

Images are stored locally in the project. Place image files in the correct category folder:

```
public/images/lessons/
  ai-literacy/          ← for Category 1 lessons
  practical-skills/     ← for Category 2 lessons
  considerations/       ← for Category 3 lessons
  accessibility/        ← for Category 4 lessons
```

### Image Syntax

```markdown
![Caption text](/images/lessons/ai-literacy/my-diagram.png)
```

### Size Control

By default, images display at full content width. You can control the size by adding a size hint after a `|` in the caption:

```markdown
![AI timeline diagram](/images/lessons/ai-literacy/timeline.png)

![Screenshot of ChatGPT interface|medium](/images/lessons/practical-skills/chatgpt-screenshot.png)

![OpenAI logo|small](/images/lessons/practical-skills/openai-logo.png)
```

| Size | Width | Best For |
|------|-------|----------|
| *(default)* | Full width | Diagrams, infographics, wide illustrations |
| `\|medium` | 65% width | Screenshots, charts |
| `\|small` | 40% width | Logos, icons, small illustrations |

All images are automatically centered with the caption displayed below in italics.

### Image Guidelines

- Use descriptive filenames: `ai-timeline-1950-2024.png` not `image1.png`
- Preferred formats: PNG (for diagrams/screenshots), JPG (for photos)
- Keep file sizes reasonable (under 500KB per image)
- Always include a caption — it serves as alt text for accessibility

---

## Videos

YouTube videos are automatically embedded when you use a standard Markdown link with a YouTube URL. The link text becomes the video title displayed above the player.

### Video Syntax

```markdown
[Neural Networks Explained - 3Blue1Brown](https://www.youtube.com/watch?v=aircAruvnKk)
```

This renders as an embedded YouTube player with the title above it. No special syntax needed — just a regular Markdown link to YouTube.

### Supported YouTube URL Formats

All of these work:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

### Video Guidelines

- Always provide a descriptive link text (it becomes the video title)
- Place videos on their own line, with blank lines before and after
- Add a sentence before the video explaining what the viewer will learn
- Non-YouTube links render as normal clickable links
- Videos are embedded in privacy-enhanced mode (youtube-nocookie.com)
- YouTube may show related videos from the same channel after playback ends — this is a YouTube limitation that cannot be fully disabled

---

## Links

Regular links to external resources use standard Markdown syntax. External links automatically open in a new tab.

```markdown
Learn more at the [Elements of AI](https://www.elementsofai.com/) website.
```

---

## Tone & Style Guidelines — Quick Reference

- **Audience**: K-12 teachers with varying technical backgrounds
- **Tone**: Friendly, professional, encouraging — not condescending
- **Register**: Formal but warm — no contractions, but use "you" and "your" freely
- **Language**: Clear, jargon-free. When technical terms are necessary, define them immediately inline
- **Paragraphs**: Write in flowing prose. Avoid bullet-point dumps. Develop ideas across sentences.
- **Examples**: Use classroom-relevant examples and teaching analogies wherever possible
- **Active voice**: Prefer "AI processes data" over "Data is processed by AI"
- **Second person**: Address the reader as "you" — "As a teacher, you might..."
- **Connections**: Reference other lessons to build a cohesive course narrative
- **Blockquotes**: 2-4 per lesson maximum. Each must be a genuine highlight moment.
- **Summary**: 5-7 complete sentences, not short fragments
- **Minimum length**: 1,600 words per lesson

---

## Example: Complete Lesson File

```markdown
---
title: "A Brief History of AI -- Why Now?"
slug: "brief-history-of-ai"
category: "ai-literacy"
level: "beginner"
description: "From the Turing test to ChatGPT -- how AI evolved over 70 years and why it suddenly matters for education."
order: 3
---

## Why Should Teachers Care About AI History?

In education, students understand the present more easily when they know
how it came about. The same is true for AI. Today's AI tools did not appear
overnight, nor are they the result of a single technological breakthrough.
They are the product of a long series of attempts, failures, disappointments,
and breakthroughs spanning over seven decades.

Understanding this history helps you as a teacher in two important ways:
first, it explains why AI has been talked about for decades, and second,
it reveals why this particular moment represents a genuine shift in
everyday practice.

## The Early Days: Can Machines Think? (1950s)

The story begins in 1950, when mathematician Alan Turing asked a
deceptively simple question: "Can machines think?" This was not a
technical question — it was philosophical. But it laid the foundation
for the entire field of artificial intelligence.

Turing proposed what we now call the *Turing Test*: if a machine can
carry on a conversation so convincingly that a human cannot tell whether
they are talking to a person or a machine, can we say it "thinks"? This
question gave researchers a direction and a challenge that would drive
decades of work.

> **Key Insight**: AI is not a new idea. The foundational question was
> asked over 70 years ago. What has changed is our ability to build
> systems that can begin to pass versions of Turing's test.

## The AI Winters (1970s-1990s)

After a series of unfulfilled promises, interest and funding for AI
research dropped sharply — not once, but twice. These periods are known
as *AI winters*. The first winter came in the mid-1970s when early
symbolic systems failed to scale beyond toy problems. The second came in
the late 1980s when a new wave of "expert systems" also proved too
limited, too brittle, and too expensive for widespread use.

This is an important lesson for anyone encountering AI today: the progress
of AI has never been linear. It has moved in waves of excitement and
disappointment. Understanding this pattern helps you evaluate today's AI
developments with a more balanced perspective.

## The ChatGPT Moment (2022)

When OpenAI released ChatGPT in November 2022, AI went from a specialist
topic to front-page news overnight. For the first time, AI became widely
accessible to teachers, students, and the general public. Teachers did
not need to learn programming — they could simply ask questions in
natural language.

> **Key Insight**: The real revolution is not just that AI got better —
> it is that AI became accessible. When teachers can use AI by simply
> typing a question, it stops being an abstract concept and becomes an
> everyday tool.

## What This Means for Teachers

This historical overview is not meant to turn you into a technology
historian. Its purpose is to give you a broader picture — one in which
today's AI has a clear place, but also clear boundaries. The teachers
who navigate this transition most successfully will be those who
understand the context — who know that AI is a powerful but imperfect
tool, shaped by decades of effort, and still very much a work in
progress.

## Summary

- AI research began in the 1950s with Turing's foundational question:
  "Can machines think?"
- Progress came in waves, with periods of high excitement followed by
  "AI winters" when expectations outpaced reality
- The shift from rule-based systems to machine learning — letting
  machines learn from data — was a major turning point
- Deep learning and large language models in the 2010s-2020s enabled
  AI to work with natural language at a practical level
- The release of ChatGPT in 2022 made AI accessible to non-technical
  users, including teachers, for the first time at scale
- Understanding this history helps you evaluate AI tools with
  appropriate expectations — neither dismissing them nor overestimating
  them
```

---

## Checklist Before Submitting

- [ ] Frontmatter has all 6 required fields (title, slug, category, level, description, order)
- [ ] Slug is lowercase with hyphens, no spaces
- [ ] Category matches one of the 4 allowed values
- [ ] Level is beginner, intermediate, or advanced
- [ ] **Opening hook** is a substantial paragraph (4-6 sentences) explaining why the topic matters
- [ ] Content is written in **flowing prose**, not bullet-point lists
- [ ] **No contractions** — "do not" not "don't", "cannot" not "can't"
- [ ] Technical terms are **defined inline** on first use (in *italics*)
- [ ] Concepts are **connected to classroom practice** — the reader knows what this means for them
- [ ] Key insights are highlighted in blockquotes (2-4 per lesson, not more)
- [ ] Content ends with a **Summary** of 5-7 complete sentences
- [ ] No "Next Steps" or "Coming Up Next" section at the end
- [ ] **Word count is at least 1,600 words** (target: 1,600-2,400)
- [ ] All images have captions and use the correct path
- [ ] All YouTube links use full URLs (not shortened)

---

*AI4T Project (2024-1-HR01-KA210-SCH-000256076)*
