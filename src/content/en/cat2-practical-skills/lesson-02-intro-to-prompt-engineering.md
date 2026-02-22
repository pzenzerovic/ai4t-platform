---
title: "Introduction to Prompt Engineering"
slug: "intro-to-prompt-engineering"
category: "practical-skills"
level: "beginner"
description: "Prompt engineering is not a technical skill — it is a pedagogical one. Learn the fundamental principles that make the difference between a generic AI response and one you can actually use in your classroom."
order: 2
---

## Why Prompting Is a Pedagogical Skill, Not a Technical One

The term *prompt engineering* has become common in discussions about AI, and it often creates a misleading impression. For many teachers, it sounds like something that requires programming knowledge, technical training, or a background in computer science. In reality, prompt engineering is the skill of communicating clearly with an AI system — and it is built on abilities that teachers already exercise every day.

When you write a clear assignment brief for your students, you are doing something very close to prompt engineering. When you specify the learning objectives, the expected format, the audience, and the evaluation criteria for a task, you are structuring information in exactly the way that produces good results from an AI. The difference is that your audience is a language model rather than a classroom of students. The underlying skill — clear, structured, purposeful communication — is the same.

This lesson introduces the fundamental principles of effective prompting. In the previous lesson on context, you learned that the quality of an AI response depends directly on the quality of the information you provide. Prompting is where that principle becomes a concrete, actionable set of practices. The principles presented here are not rigid rules to be memorised. They are guidelines that, when combined thoughtfully, produce dramatically better results.

## What Is a Prompt?

A *prompt* is any instruction, question, or task description that you give to an AI system in order to receive a response. A prompt can be a single sentence or several paragraphs long. It can be a straightforward question, a detailed set of instructions, or a creative brief with specific constraints.

The AI does not attempt to guess what you want beyond what is stated. It responds to the content of your prompt and the context of the current conversation — nothing more. If your prompt is vague, the response will be generic. If your prompt is specific and well-structured, the response will be focused and useful. This is not a matter of the AI being "smart" or "limited." It is a direct reflection of the input it received.

Understanding this basic relationship — that the output is shaped by the input — is the most important insight in prompt engineering. Everything that follows is a set of strategies for making that input as effective as possible.

## The Fundamental Principles

The principles below represent the core practices that consistently produce better results when working with AI tools in educational settings. Each principle is presented with an explanation of why it matters, followed by contrasting examples of weak and strong prompts drawn from teaching practice.

### Principle 1: Define the Goal Clearly

The most common reason for a disappointing AI response is an unclear goal. If the AI does not know what you are trying to produce, it will default to the most generic interpretation of your request.

A prompt like "Make some maths exercises" gives the AI almost nothing to work with. It does not know which mathematical operation, which grade level, how many exercises, or what format you expect. Compare this with "Create 15 multiplication exercises for Year 3 students practising the 6 times table, without answers, formatted as a worksheet with space for students to write their responses." The second prompt takes only a few seconds longer to write, but the difference in output quality is enormous.

**Myth: "AI should be smart enough to figure out what I need."** AI is designed to respond to what you tell it, not to infer what you mean. This is not a limitation — it is how the technology works. The clearer your goal, the more useful the result.

### Principle 2: Specify Your Audience

The age, grade level, and prior knowledge of your students are among the most powerful pieces of context you can provide. An explanation of fractions written for a university mathematics student looks nothing like one written for a ten-year-old encountering the concept for the first time. The AI can produce both, but only if it knows which one you need.

A weak prompt: "Explain fractions." A strong prompt: "Explain the concept of fractions to Year 5 students using simple, everyday examples like sharing a pizza or dividing a chocolate bar into equal pieces."

Notice how the second prompt does not just name the audience — it also suggests the type of examples that would be appropriate. This is exactly the kind of thinking you do when planning a lesson, and it translates directly into better AI output.

### Principle 3: Constrain the Scope

Without explicit constraints, AI tends to produce responses that are broader than necessary. If you ask for a history test, you might receive one covering an entire century. If you ask for a reading comprehension passage, it might be too long or too short for your purposes. Setting clear boundaries — on length, number of items, difficulty level, or topic scope — keeps the output focused.

A weak prompt: "Write a history test." A strong prompt: "Write a 10-question quiz on the Industrial Revolution for Year 8 students. Include 7 multiple-choice questions and 3 short-answer questions. Focus on key inventions and their social impact."

The constraints in the strong prompt eliminate ambiguity and give the AI a clear framework within which to generate content.

### Principle 4: Assign a Role

One of the most effective techniques in educational prompting is asking the AI to adopt a specific role. When you write "Act as a Year 7 biology teacher," the AI adjusts its vocabulary, tone, level of detail, and approach in ways that are often remarkably appropriate for that role.

A weak prompt: "Write a lesson plan about photosynthesis." A strong prompt: "You are a Year 7 biology teacher. Write a lesson plan for a 45-minute class on photosynthesis. Include learning objectives, a warm-up activity, the main explanation, a hands-on activity, and a short formative assessment at the end."

Role-setting works because it provides a rich package of implicit context. The phrase "Year 7 biology teacher" carries information about the expected audience, vocabulary level, pedagogical approach, and subject expertise — all in a few words.

> **Key Insight**: Assigning a role to the AI is one of the most efficient ways to set context. A single phrase like "You are a primary school science teacher" conveys information about audience, tone, complexity, and pedagogical approach — all at once.

### Principle 5: Specify Expectations and Criteria

The more precisely you describe what a good result looks like, the less you will need to revise afterwards. This includes specifying the format, the structure, any required elements, and the quality criteria for the output.

A weak prompt: "Make a worksheet." A strong prompt: "Create a worksheet with 15 exercises on the 6 times table for Year 3. Include a version with answers and a version without answers. Add a header with space for the student's name and date."

The strong prompt eliminates the need for follow-up requests like "Can you add an answer key?" or "Can you add a name field?" — requests that are entirely avoidable if the expectations are stated upfront.

### Principle 6: Provide Examples

When you want the AI to produce output in a particular style or format, showing it an example is often more effective than describing what you want in words. This technique is sometimes called *few-shot prompting* — you provide one or more examples of good output, and the AI uses them as a template.

A weak prompt: "Write more exercises like these." A strong prompt: "Here are three multiplication exercises I use in my class: [list examples]. Create 10 more exercises in the same style and at the same difficulty level."

Teachers use this same principle when they show students an exemplar essay or a model answer before asking them to produce their own work. The AI responds to examples in much the same way students do — the example sets a standard and a pattern.

### Principle 7: Request Step-by-Step Reasoning

For complex tasks, asking the AI to explain its reasoning step by step — a technique known as *chain-of-thought prompting* — often produces more accurate and more useful results. This is particularly valuable for mathematical problem-solving, logical analysis, or any task where the process matters as much as the answer.

A weak prompt: "Solve this maths problem." A strong prompt: "Solve this maths problem and explain each step of your reasoning in a way that a Year 6 student could follow."

The step-by-step approach also makes it easier for you to verify the AI's work, which is important given that AI can and does make errors — as you learned in the lesson on AI limitations in Category 1.

> **Tip**: Asking for step-by-step explanations serves a dual purpose. It makes the AI's reasoning transparent so you can check it, and it produces output that is already structured as a teaching tool you can share with students.

## Combining Principles for Better Results

These principles are not meant to be used in isolation. In practice, a well-crafted prompt typically combines several principles at once. A strong educational prompt might define the goal, specify the audience, set constraints on format and length, assign a role, and include an example — all in a single paragraph.

Consider the difference between this prompt: "Make an English exercise" and this one: "You are an English teacher for Year 6. Create a short story of 8–10 sentences using the Present Simple tense, about a student's morning routine. Then create three exercises based on the story: a True/False exercise with 5 questions, a fill-in-the-gaps exercise with 6 sentences, and a question-formation exercise with 4 items. Include an answer key for all exercises."

The second prompt combines role-setting, audience specification, format constraints, structure requirements, and explicit output expectations. It takes about thirty seconds to write and saves significant revision time afterwards. This is the practical payoff of prompt engineering: a small investment in clarity upfront produces output that is closer to classroom-ready on the first attempt.

## The Iterative Approach

One final principle deserves emphasis: you should rarely expect a perfect result from a single prompt. Just as a lesson plan goes through drafts and revisions, AI output benefits from iterative refinement. After receiving an initial response, you can ask the AI to adjust difficulty, change the format, add or remove elements, or shift the tone.

This iterative approach is not a sign that your original prompt was bad. It is simply how the process works most effectively. The first prompt establishes the direction. Follow-up prompts refine the result. Experienced AI users treat the conversation as a collaboration, not a one-shot transaction.

As you build confidence with these fundamental principles, the next lesson will show you how they work in practice through a series of detailed, subject-specific examples drawn from real teaching scenarios.

## Summary

- Prompt engineering is a pedagogical skill, not a technical one — it is built on the same abilities teachers use when writing clear assignments, lesson plans, and assessment criteria.
- A prompt is any instruction or question given to an AI system, and the quality of the output is directly determined by the clarity and specificity of the prompt.
- The fundamental principles of effective prompting include defining the goal, specifying the audience, constraining the scope, assigning a role, setting expectations, providing examples, and requesting step-by-step reasoning.
- These principles work best in combination — a strong educational prompt typically applies several principles at once, resulting in output that requires minimal revision.
- Assigning a role to the AI is one of the most efficient ways to set context, because a single phrase like "Year 7 biology teacher" conveys multiple layers of information simultaneously.
- Iterative refinement is a normal and expected part of the process — treat AI interaction as a conversation, not a single transaction.
- The principles covered here form the foundation for the practical examples in the next lesson, where you will see them applied across different subjects and grade levels.
