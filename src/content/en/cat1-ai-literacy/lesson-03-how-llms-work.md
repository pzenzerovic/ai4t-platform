---
title: "How Large Language Models Work"
slug: "how-llms-work"
category: "ai-literacy"
level: "intermediate"
description: "A clear explanation of what LLMs are, how they generate text through next-token prediction, and why understanding this mechanism matters for teachers."
order: 4
---

## Why Understanding the Mechanism Matters

You do not need to be an engineer to drive a car, but understanding that a car runs on fuel, has brakes, and cannot fly helps you drive safely and set realistic expectations. The same is true for AI. Understanding how large language models actually generate text — even at a conceptual level — transforms how you use them.

When you understand the mechanism, you stop being surprised by hallucinations (they make perfect sense once you know what is happening inside). You write better prompts because you understand what the model is actually responding to. And you make better decisions about when to trust AI output and when to verify it.

This lesson explains the core mechanism behind tools like ChatGPT, Claude, and Gemini in plain language, with no technical prerequisites required.

## What Is a Large Language Model?

A Large Language Model (LLM) is a mathematical system trained on vast amounts of text data to generate human-like language. The word "large" refers to two things: the enormous amount of text used to train the model (billions of pages of books, articles, websites, and other written material) and the massive number of internal parameters — mathematical values — the model uses to process language, often hundreds of billions of them.

It is crucial to understand what an LLM is *not*. It is not a database of facts that the model looks up when you ask a question. It is not a search engine that finds existing text. It is not a system that understands meaning in the way you understand the words on this page. An LLM is a pattern-recognition system that has learned, from reading enormous amounts of text, what kinds of words typically follow other words in different contexts.

> **Key Insight**: An LLM is not a knowledge base — it is a pattern machine. It has learned statistical relationships between words from billions of text examples, and it uses those patterns to generate new text that looks and sounds like human writing.

## Tokens: The Building Blocks

LLMs do not process whole words the way humans read. Instead, they work with **tokens** — chunks of text that may be whole words, parts of words, or even individual characters.

For example, the word "understanding" might be split into the tokens "under" and "standing." A common word like "the" is a single token, while a rare or long word might be split into several pieces. This tokenization system allows the model to handle any text — including rare words, technical terms, or even misspelled words — by combining familiar pieces.

Why does this matter for teachers? Because it helps explain some of the quirks you might encounter. When you ask an LLM to count the number of letters in a word, it sometimes gets it wrong — because it is not actually "seeing" individual letters. It is working with token chunks. Understanding tokens also helps you understand context limits: when a tool says it can handle "128,000 tokens," that is roughly equivalent to 200-300 pages of text.

## The Generation Process: Predicting the Next Token

At its core, an LLM is a **next-token prediction machine**. Here is how text generation actually works, step by step:

1. **You type a prompt** — a question, an instruction, or a piece of text you want continued
2. **The model converts your text into tokens** — breaking it into the chunks it can process
3. **It processes these tokens through layers of mathematical operations** — each layer extracts different patterns and relationships
4. **It calculates a probability for every possible next token** — essentially asking "given everything before this point, what word is most likely to come next?"
5. **It selects a token** — usually one with high probability, but with some controlled randomness to avoid repetitive output
6. **That token is added to the sequence** — and the process repeats from step 3
7. **This continues until the response is complete** — either reaching a natural stopping point or hitting a length limit

For example, given the prompt "The capital of France is...", the model assigns very high probability to the token "Paris" because that pattern appeared thousands of times in its training data. But given a more ambiguous prompt like "The best way to teach fractions is...", the model has many plausible continuations to choose from, and which one it picks depends on the full context of your conversation.

> **Key Insight**: Every word in an AI response is generated one token at a time, each predicted based on everything that came before it. The model does not plan its response in advance — it builds it word by word.

## Training: Where the Patterns Come From

LLMs are trained in two main phases, and understanding both helps explain the model's strengths and weaknesses.

**Phase 1 — Pre-training:** The model reads enormous amounts of text from the internet, books, academic articles, code repositories, and other sources. During this process, it learns patterns at every level: grammar and syntax, factual associations, reasoning styles, writing conventions for different genres, and much more. This phase is incredibly resource-intensive — training a large model can cost tens of millions of dollars and take months on specialized hardware.

**Phase 2 — Fine-tuning and alignment:** After pre-training, the model is further trained to be helpful, safe, and to follow instructions. This involves human feedback — real people evaluate the model's responses and guide it toward outputs that are more useful, more accurate, and less harmful. This phase is why modern chatbots feel conversational and cooperative rather than simply regurgitating text patterns.

The combination of these two phases explains a key characteristic of LLMs: they can generate remarkably fluent, well-structured text on almost any topic, but they do not *know* the information in the way you know your subject. They have learned what good answers *look like*, not what makes an answer *true*.

## Context: The Working Memory of a Conversation

One concept that is particularly important for teachers is **context** — the information the model holds during a conversation.

When you chat with an AI tool, the model does not just see your latest message. It sees the entire conversation up to that point — your messages, its responses, and any additional instructions or materials you have provided. This is the model's *context window*, and it functions like a working memory.

Modern models have very large context windows — some can hold the equivalent of hundreds of pages of text. This means the model can follow long conversations, remember instructions you gave earlier, and build on previous exchanges.

However, context has limits. When a conversation exceeds the context window, the earliest parts begin to be dropped. This is why very long conversations can sometimes feel like the AI has "forgotten" what you discussed earlier — it literally has. The information has fallen out of its working memory.

For teachers, this has a practical implication: if you are working on a complex task, it is better to provide all relevant information in a single, well-structured message rather than relying on the AI to remember details from many messages ago.

## Why LLMs Sometimes Seem to Think

Large language models can produce responses that appear thoughtful, structured, and logically reasoned. This often creates the impression that the model genuinely understands the problem and is reasoning about it on a human level.

In reality, what is happening is an advanced statistical process. The model has learned from billions of examples what a well-reasoned response *looks like*. It can reproduce the *pattern* of logical argument without performing actual logical reasoning. It can generate text that *reads* like expert analysis because it has been trained on vast amounts of expert writing.

This difference is subtle but essential. It explains why an LLM can write a beautiful explanation of a concept and then, in the very next sentence, make a factual error that any student would catch. The model was not *reasoning* about the concept — it was generating text that statistically resembled good reasoning.

> **Tip**: A useful mental model is to think of an LLM as the world's most well-read parrot. It has read more than any human ever could, and it is extraordinarily good at producing relevant, coherent text based on that reading. But it does not *understand* what it has read the way you understand your subject area.

## What This Means for Your Teaching Practice

Understanding how LLMs work has several practical implications:

**Write clearer prompts.** Knowing that the model predicts based on patterns means that clearer, more specific prompts give it better patterns to work with — and produce better results. This is explored in depth in the Practical AI Skills lessons.

**Verify factual claims.** Since the model generates plausible text rather than verified facts, always check specific claims — especially dates, statistics, citations, and technical details — before using AI content in your classroom.

**Understand the strengths.** LLMs are genuinely excellent at tasks that involve language patterns: explaining concepts in different ways, generating creative variations, restructuring content, brainstorming, and adapting text for different audiences. Lean into these strengths.

**Set realistic expectations.** An LLM is a powerful tool for generating and transforming text, not an authoritative source of knowledge. This distinction helps you use it where it excels and avoid relying on it where it falls short.

**Help students understand.** When students know that AI generates text through statistical prediction rather than understanding, they develop a healthier and more critical relationship with these tools — a skill that will serve them well throughout their lives.

## Summary

- A Large Language Model is a mathematical system that generates text by predicting the most likely next token, based on patterns learned from billions of text examples
- LLMs work with tokens (word chunks), not whole words, which explains some of their quirks and limitations
- Text is generated one token at a time — the model does not plan ahead or reason about its response
- Training happens in two phases: pre-training on vast text data, and fine-tuning with human feedback to be helpful and safe
- Context is the model's working memory during a conversation — it is large but not unlimited
- LLMs can produce text that *looks* like reasoning, but they are performing statistical pattern matching, not genuine understanding
- Understanding this mechanism helps you write better prompts, set realistic expectations, and make better decisions about when to trust AI output
