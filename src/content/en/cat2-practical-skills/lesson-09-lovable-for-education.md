---
title: "Building Simple Web Tools with Lovable"
slug: "lovable-for-education"
category: "practical-skills"
level: "intermediate"
description: "Lovable lets you build small educational web apps by describing what you want in plain language. Learn the core workflow through a step-by-step classroom example."
order: 9
---

## Why Build Your Own Tools?

Throughout this category, you have been learning how to communicate effectively with AI — through context, prompt engineering, and meta-prompting. Those skills help you generate text-based outputs: worksheets, lesson plans, quizzes, rubrics. But what if you could go a step further and create interactive tools that your students can use directly on their devices?

This is where Lovable comes in. Lovable is an online platform that lets you build small websites and simple web applications by describing what you want in plain language. You do not need to know how to code. You write what the tool should do, Lovable generates a first version, and then you improve it step by step by asking for changes — using exactly the kind of clear, structured communication you have been practising throughout these lessons. The result is a shareable link that opens on any device with a browser.

This lesson walks you through the complete process of building an educational app with Lovable, from your first prompt to a published, classroom-ready tool. The example we will follow is a number comparison game for Year 1 mathematics — but the workflow applies to any kind of simple educational tool you might want to create.

## What Lovable Is (and Is Not)

Lovable is most useful when you want something practical and interactive that you can try immediately, even if you are not a technical person. It works well for tools like quick quizzes, exit tickets, simple learning games, vocabulary flashcards, rubric generators, or small resource hub websites for students and parents. It is also valuable in teacher training, because it makes the creation process visible: you build version one quickly, test it as a user, notice what is missing, and then improve it with short, clear requests.

Lovable is not the right choice when you need a complex system with many user roles, strict institutional hosting requirements, or when you must handle sensitive personal data. For those scenarios, you should treat a Lovable output as a prototype and involve your school or organisation's technical and legal support before real deployment.

> **Key Insight**: Think of Lovable as a "first draft machine" for interactive web tools. Just as AI helps you generate a first draft of a worksheet that you then refine, Lovable generates a first draft of a working application that you then improve through conversation.

## Getting Started

To begin creating apps, you need a Lovable account and a modern web browser. Visit [lovable.dev](https://lovable.dev) and create an account — the process is similar to signing up for any other online service. Once you have logged in, you will see your dashboard where all your projects are stored.

A laptop is the easiest device for building because you can see the preview and edit comfortably, but you can test the final result on tablets and phones as well.

![The Lovable homepage where you start a new project by typing your first prompt](/images/lessons/practical-skills/lovable-01-editor-interface.png)

To create a new project, you simply type your first prompt into the central chat interface. This is where the prompt engineering skills from the previous lessons become directly relevant.

## Writing Your First Prompt

The key to success with Lovable is describing what you want in a clear and detailed way — exactly as you have learned in the lessons on prompt engineering. For our number comparison game, we used the following prompt:

*"Create a mobile-optimised educational game for first-grade students to practice comparing numbers from 1 to 10. The game should be designed for portrait orientation with a minimal interface. Students should see two random numbers on the screen and choose a comparison symbol (less than, greater than, or equals). The system should recognise what they chose and give immediate feedback. The app is gamified — correct answers add one point, incorrect answers subtract one point, and the game ends when the student reaches 20 points with a congratulatory message. The points are displayed all the time. Use large, rounded fonts suitable for young children and keep the interface clean and simple."*

Notice how this prompt includes several important details: who the application is for (first-grade students), what device it will be used on (mobile in portrait mode), what the user should do (choose comparison symbols), how the scoring works (plus one for correct, minus one for incorrect), and what the victory condition is (reaching 20 points). The more specific you are in your initial description, the closer the first version will be to what you imagined.

After you type your prompt and press enter, Lovable starts building your application. You can watch it being generated in real time. Within a minute or two, a first version of your app appears in the preview window on the right side of the screen.

![The Lovable editor with the chat window on the left and the app preview building on the right](/images/lessons/practical-skills/lovable-02-first-version.png)

The editor has two main areas. On the left side, you have the chat window where you communicate with the AI assistant. On the right side, you have a preview window where you can see your application come to life in real time. Think of this as having a conversation with a very skilled programmer who can understand what you want and build it for you.

## The Iteration Process: Refining Your Application

Your first version will almost never be perfect, and that is completely normal. The real power of Lovable comes from the iteration process, where you test your application and ask for improvements based on what you observe. This is the same iterative approach you learned about in the prompt engineering lesson — the first prompt establishes the direction, and follow-up prompts refine the result.

The generated game looked good — it showed two numbers with colourful buttons for the comparison symbols, a score counter, and clean child-friendly design:

![The generated number comparison game showing two numbers with less than, equals, and greater than buttons|medium](/images/lessons/practical-skills/lovable-03-visual-edit-option.png)

As an addition to the game, we wanted an intro screen that would introduce the game to users and state the rules. We prompted the assistant:

*"Add an intro screen that will introduce the game to the users and state the rules. The screen should contain a Start button to start the game."*

Lovable added an intro screen that was clear and well-structured — it explained the rules and included a Start Game link:

![The intro screen with game title, rules explanation, and a Start Game link|medium](/images/lessons/practical-skills/lovable-04-visual-edit-select.png)

However, the Start button was not visually prominent enough — it appeared as plain text rather than a clearly clickable button. This is exactly the kind of issue you notice when you test the app as a real user would.

### Using Visual Edit Mode

For making visual edits to specific parts of the application, Lovable offers a *Visual edit* mode. Instead of describing the change in the chat, you can select the exact element you want to modify and then give a targeted prompt.

![The Visual edit mode in the Lovable chat interface — click Visual edits to enter this mode|small](/images/lessons/practical-skills/lovable-05-start-button-before.png)

After selecting the Visual edit option, you click on the element you want to change. In our case, we selected the Start Game button and then typed the instruction:

*"The start button is not visible because it has the same background as the game. Change the background colour to green."*

![Selecting the Start Game button in Visual edit mode to modify its appearance|medium](/images/lessons/practical-skills/lovable-06-start-button-after.png)

The result was a clear, prominent green button that students would immediately recognise as clickable:

![The final intro screen with a clearly visible green Start Game button|medium](/images/lessons/practical-skills/lovable-07-final-result.png)

This small example illustrates the core pattern of working with Lovable: generate, test, observe, and refine. Each iteration moves the app closer to something that works well in a real classroom setting.

## Practical Guidelines for Better Results

Several practices consistently lead to better outcomes when working with Lovable.

Be specific about your users and context. Instead of saying "make a maths app," describe who will use it, on what device, in what situation, and what they should be able to do. You understand your students better than any technology, so use that knowledge to write detailed descriptions.

Test on the actual device your students will use. Many issues only become apparent when you try the application in the real environment. If your students will use tablets in portrait mode, test it that way. If they will use phones, test on a phone. The preview in Lovable is helpful, but it cannot perfectly simulate every device.

When something does not work, describe what you observed rather than what you think went wrong technically. You do not need to understand programming to explain that "the screen looks cut off when I rotate my phone" or "the feedback text is too small to read." The AI will determine the technical solution based on your description of the problem.

Iterate in small steps. If you want to change five things, consider asking for them one or two at a time. This makes it easier to test each change and catch any new issues before they get buried under other modifications.

> **Tip**: Do not be afraid to ask for adjustments to adjustments. If Lovable fixes something but the fix creates a new problem, simply explain what happened. This back-and-forth conversation is how applications get refined, and it mirrors how professional software development actually works.

## Publishing and Sharing

Once you are satisfied with your application, look for the **Publish** button in the top right corner of the screen. When you publish, Lovable creates a web address for your application that you can share with anyone. You can send the link to students or parents, add it to your classroom website, or create a QR code that students can scan with their devices. The application runs entirely in the web browser, so students do not need to install anything.

Before sharing with your class, spend some time testing the published version yourself and perhaps with a colleague or a few students. Make note of anything that feels confusing or does not work as expected, then go back to Lovable and refine the application. The published version updates automatically after you make changes and click the update button, so your students will always have access to the latest improvements.

You can try the finished number comparison game here: [Number Comparison Game](https://number-comparison.lovable.app)

## Safety and Privacy

In teacher training and school settings, the safest approach is straightforward: do not use real student personal data when building demos or prototypes. This means no student names, no email addresses, no phone numbers, no student IDs, and no free-text fields where students might enter personal information. Use fictional examples and placeholder data instead.

It is also important to note that the Lovable service itself is intended for adults who can enter a contract, and the terms of service state that the platform is not intended for individuals under 18. In practice, this means teachers build the apps, while students only use the published links without needing Lovable accounts.

> **Warning**: Before deploying any Lovable app in a classroom setting, test the published link on your school network and on the devices your students actually use. Some school networks block external services, and discovering this during a lesson is far worse than discovering it during preparation.

Before you plan classroom use, run through a simple checklist. First, test the published link on the school network and devices you actually have. Second, decide who will use the app — only the teacher, or students as well. Third, decide what kind of data will be entered. For most classroom activities, you can design the app so it needs no personal data at all, which makes everything safer and simpler.

## What Makes a Good Educational App

A good Lovable-based educational tool feels simple and calm when you use it. The goal is immediately clear, the instructions are short and friendly, and the buttons do what you expect. The activity fits the promised time, and it works on a phone or tablet without tiny text or confusing layout. A teacher should be able to use it in class after a quick one-minute test.

A good educational app is also honest about its limitations. It avoids personal data collection, it warns users not to enter personal information where relevant, and — in a teacher training context — it includes a reflection component: what did the AI generate well, what did it get wrong, and what did you change to make it more suitable for learning.

## Summary

- Lovable is an online platform that lets you build small, interactive web applications by describing what you want in plain language, without any programming knowledge.
- The prompt engineering skills you have developed throughout this category — defining goals, specifying audiences, constraining scope, and iterating — apply directly to building apps with Lovable.
- The core workflow follows a generate-test-observe-refine cycle: Lovable creates a first version, you test it as a user would, you identify what needs to change, and you ask for specific improvements.
- Visual edit mode allows you to select individual elements on the screen and give targeted instructions for visual changes, which is particularly useful for adjusting layout, colours, and button visibility.
- Always test your published app on the actual devices and network your students will use before deploying it in a classroom setting.
- Safety and privacy are essential: never use real student personal data in Lovable apps, use fictional examples instead, and remember that the Lovable platform itself is intended for adult users only.
- Lovable is best suited for simple, focused tools like quizzes, games, flashcards, and resource hubs — for complex systems with sensitive data, treat the output as a prototype and involve technical support.
