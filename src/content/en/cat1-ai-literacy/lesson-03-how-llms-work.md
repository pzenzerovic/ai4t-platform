---
title: "How Large Language Models Work"
slug: "how-llms-work"
category: "ai-literacy"
level: "intermediate"
readingTime: "12"
description: "A clear explanation of what LLMs are, how they generate text, and why understanding this matters for teachers."
order: 3
---

## What is a Large Language Model?

A Large Language Model (LLM) is an AI system trained on vast amounts of text data to understand and generate human language. ChatGPT, Claude, and Gemini are all built on LLMs.

The word "large" refers to two things:
1. The enormous amount of text used to train the model (billions of pages)
2. The massive number of parameters (mathematical values) the model uses — often hundreds of billions

## How Text Generation Actually Works

At its core, an LLM is a **next-word prediction machine**. Given a sequence of text, it predicts what word (or token) is most likely to come next.

For example, given the prompt "The capital of France is...", the model assigns high probability to "Paris" because that pattern appeared frequently in its training data.

### Tokens

LLMs don't process whole words — they work with **tokens**, which are chunks of text. A word like "understanding" might be split into "under" + "standing." This tokenization allows the model to handle any text, including rare words, by combining familiar pieces.

### The Generation Process

1. You type a prompt
2. The model converts your text into tokens
3. It processes these tokens through layers of mathematical operations
4. It predicts the next most likely token
5. That token is added to the sequence
6. Steps 3-5 repeat until the response is complete

## Training: Where the Knowledge Comes From

LLMs are trained in two main phases:

**Pre-training**: The model reads enormous amounts of text from the internet, books, articles, and other sources. It learns patterns — grammar, facts, reasoning styles, and much more.

**Fine-tuning**: The model is further trained to be helpful, safe, and follow instructions. This involves human feedback to teach the model what good responses look like.

> **Important**: The model doesn't store facts in a database. It learns statistical patterns. This is why it can sometimes generate plausible-sounding but incorrect information.

## Why This Matters for Teachers

Understanding how LLMs work helps you:

- **Write better prompts**: Knowing the model predicts based on patterns means clearer, more specific prompts get better results
- **Spot limitations**: The model doesn't "know" things — it predicts likely text. This explains hallucinations
- **Set realistic expectations**: AI is a powerful tool, but understanding its mechanism prevents over-reliance
- **Explain AI to students**: You can help students understand what they're really interacting with

## Statistical Processing vs. Thinking

This is perhaps the most important distinction: **LLMs do not think**. They perform statistical operations on patterns learned from data. When an LLM writes a compelling essay, it's not because it understands the topic — it's because it has learned what compelling essays look like.

This doesn't make LLMs useless — far from it. But it means we should always review their outputs rather than accepting them as authoritative.
