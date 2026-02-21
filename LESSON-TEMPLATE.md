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

After the frontmatter, write the lesson content in Markdown. Follow this general structure:

```markdown
## Opening Hook / Why This Matters

A short paragraph (2-3 sentences) explaining why this topic is relevant for teachers.

## Main Concept 1

Explanation with examples...

> **Key Insight**: Important takeaway highlighted in a blockquote.

## Main Concept 2

More content...

### Subsection (if needed)

Deeper detail...

## Practical Implications for Teachers

How does this apply in the classroom?

## Summary

- Bullet point recap of key takeaways
- Keep to 3-5 points
```

---

## Word Count Targets

The platform auto-calculates reading time at 200 words per minute:

| Target Reading Time | Word Count |
|-------------------|------------|
| 5 min | ~1,000 words |
| 8 min | ~1,600 words |
| 10 min | ~2,000 words |
| 12 min | ~2,400 words |

Most lessons should aim for **8-12 minutes** (1,600-2,400 words).

---

## Formatting Reference

### Text Formatting

```markdown
**Bold text** for emphasis
*Italic text* for terms or titles
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

---

## Links

Regular links to external resources use standard Markdown syntax. External links automatically open in a new tab.

```markdown
Learn more at the [Elements of AI](https://www.elementsofai.com/) website.
```

---

## Tone & Style Guidelines

- **Audience**: K-12 teachers with varying technical backgrounds
- **Tone**: Friendly, professional, encouraging — not condescending
- **Language**: Clear, jargon-free. When technical terms are necessary, define them immediately
- **Examples**: Use classroom-relevant examples wherever possible
- **Active voice**: Prefer "AI processes data" over "Data is processed by AI"
- **Second person**: Address the reader as "you" — "As a teacher, you might..."

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

Understanding where AI comes from helps you see where it's going -- and
why it's suddenly everywhere in education. The story is shorter and more
surprising than you might think.

## The Early Days: Can Machines Think? (1950s)

In 1950, mathematician Alan Turing asked a simple but profound question:
"Can machines think?" He proposed what we now call the Turing Test...

![The Turing Test concept illustrated|medium](/images/lessons/ai-literacy/turing-test.png)

> **Key Insight**: AI is not a new idea. Scientists have been working on
> it for over 70 years. What changed recently is the amount of data and
> computing power available.

## The AI Winters (1970s-1990s)

Progress was slower than expected. Twice, funding dried up...

## The Deep Learning Revolution (2010s)

Everything changed when researchers figured out how to train very large
neural networks...

Watch this visual explanation of how neural networks learn:

[But what is a Neural Network? - 3Blue1Brown](https://www.youtube.com/watch?v=aircAruvnKk)

## The ChatGPT Moment (2022)

When OpenAI released ChatGPT in November 2022, AI went from a
specialist topic to front-page news overnight...

## What This Means for Teachers

You don't need to become an AI expert. But understanding this
timeline helps you:

- **Separate hype from reality** -- AI has been through cycles before
- **Understand current tools** -- they're built on decades of research
- **Prepare for what's next** -- the pace of change is accelerating

## Summary

- AI research began in the 1950s with Turing's question
- Progress came in waves, with "AI winters" in between
- Deep learning and massive data made modern AI possible
- ChatGPT (2022) brought AI into mainstream awareness
- Teachers benefit from understanding this context
```

---

## Checklist Before Submitting

- [ ] Frontmatter has all 6 required fields (title, slug, category, level, description, order)
- [ ] Slug is lowercase with hyphens, no spaces
- [ ] Category matches one of the 4 allowed values
- [ ] Level is beginner, intermediate, or advanced
- [ ] Content starts with a hook explaining why the topic matters
- [ ] Key insights are highlighted in blockquotes
- [ ] Content ends with a summary or takeaways section
- [ ] All images have captions and use the correct path
- [ ] All YouTube links use full URLs (not shortened)
- [ ] Word count is appropriate for target reading time (1,600-2,400 words typical)

---

*AI4T Project (2024-1-HR01-KA210-SCH-000256076)*
