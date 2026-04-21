---
title: "AI Policy for Schools — GDPR, Data Privacy, and Acceptable Use"
slug: "ai-policy-for-schools"
category: "considerations"
level: "advanced"
description: "A practical framework for developing school-level AI policies that address data protection under the GDPR, acceptable use by students and staff, and the governance decisions schools can no longer avoid."
order: 8
---

## Why Every School Now Needs a Written AI Policy

A few years ago, a school could treat artificial intelligence as a distant technology topic — something to discuss at a training day but not something that affected daily operations. That is no longer the case. Students use AI to prepare schoolwork, teachers use it to generate materials, administrators use it to draft communications, and external providers offer AI-powered tools that promise to grade, plan, or support learning. All of this activity is happening already, in virtually every school, whether or not the school has chosen to engage with it.

In the absence of a written policy, this activity is ungoverned. Individual teachers make their own decisions about what data to enter into AI tools. Students interpret silence as permission. Vendors pitch products whose compliance status has not been examined. And when something goes wrong — a data leak, a parent complaint, an inspection finding — there is no clear record of what the school had decided or who had decided it. A written policy is not about restricting AI use. It is about making the school's decisions explicit, defensible, and consistent.

This lesson provides a structured way to think about AI policy for schools operating in the European context, where the *General Data Protection Regulation (GDPR)* sets the baseline for data handling and where the *EU AI Act* is beginning to add further obligations. It builds on the ethics discussion from earlier in this category and the responsibility framework from the lesson on responsible use.

## The GDPR as the Starting Point

For schools in the European Union, any discussion of AI policy must begin with the *GDPR*. The regulation applies to any processing of personal data — names, student IDs, grades, behavioural records, images, voice recordings, anything that can be linked to an identifiable individual. AI tools that process such data are subject to the same rules as any other data processor.

Three GDPR principles are particularly important when considering AI tools. The first is *purpose limitation*: personal data collected for one purpose (for example, enrolling a student in the school) cannot be used for an unrelated purpose (for example, training a commercial AI model) without a lawful basis. The second is *data minimisation*: only the data strictly necessary for a given purpose should be processed. The third is *storage limitation*: personal data should not be kept longer than necessary.

Most general-purpose AI assistants — ChatGPT, Claude, Gemini, and similar tools — are built by companies outside the school's control. When a teacher pastes student data into such a tool, that data leaves the school's systems and enters the provider's systems, where it may be logged, retained, and in some cases used to improve the provider's services. From a GDPR perspective, this constitutes a transfer of personal data to an external processor, and it requires a lawful basis, appropriate safeguards, and, in many cases, a *Data Processing Agreement (DPA)* between the school and the provider. A school that has not signed such an agreement with a given AI provider has not, as a matter of law, established a compliant way to send student data to that provider.

> **Key Insight**: The default answer for general-purpose AI tools is that they are appropriate for teacher preparation work using anonymised or non-personal material, and not appropriate for processing identifiable student data. Specialised educational tools may be different — but only if the school has examined their compliance posture and signed the relevant agreements.

## The Components of a School AI Policy

A workable school AI policy does not need to be long. It needs to cover a small number of decisions clearly. Six components, addressed in sequence, produce a policy that is easy to follow and easy to update.

The first component is *scope*. The policy should state which AI tools it covers (typically all of them, but with room to name specific tools that have been formally approved or prohibited), which activities it covers (classroom use, homework, assessment, administration), and who is bound by it (teaching staff, administrative staff, students at different age levels, external partners).

The second component is *permitted and prohibited uses*. This is the practical core of the policy. It should describe the types of teacher use that are permitted — for example, using anonymised material to produce differentiated resources, draft classroom communications, or brainstorm lesson plans. It should describe the types of use that are prohibited — for example, entering identifiable student data into non-approved tools, using AI to grade student work without teacher review, or replacing teacher feedback with AI-generated feedback. And it should describe what student use is permitted at each age level, with appropriate distinctions for assessment contexts.

The third component is *data handling*. This section should explicitly address what kinds of data may and may not be entered into general-purpose AI tools, what anonymisation practices are required, and what to do with the outputs — particularly whether AI-generated materials may be used with students without review, and what review process applies. It should also address the retention of AI-generated content and the handling of any recordings or transcripts produced by AI tools.

The fourth component is *tool approval*. The policy should establish a clear process for assessing a new AI tool before it is used with student data. This typically involves reviewing the provider's documentation, checking whether a Data Processing Agreement is in place, and where necessary producing a *Data Protection Impact Assessment (DPIA)* — a structured assessment of the risks a new data processing activity poses to individuals. The designated *Data Protection Officer (DPO)*, if one exists, should be involved.

The fifth component is *disclosure and transparency*. Parents and students should know, at an appropriate level of detail, when and how AI is being used in the classroom. The policy should define what disclosures are made to students (for example, that an AI tool has been used to produce a worksheet, or that the school uses a specific learning platform with AI features), to parents (typically through the school's annual information notice or specific communications), and to inspection or regulatory bodies when required.

The sixth component is *review and governance*. Because AI tools and their capabilities change rapidly, the policy itself must be treated as a living document. It should name who is responsible for updating it, how often it will be reviewed, and how staff will be informed of changes. It should also describe how incidents — breaches, complaints, misuse — will be handled and recorded.

> **Tip**: When drafting a policy, start from concrete examples rather than abstract principles. Describe three real situations from your school's recent experience — a teacher considering using ChatGPT for differentiation, a student caught submitting AI-generated work, an external vendor pitching an AI grading tool — and write the policy so that each situation has a clear, consistent answer. A policy that cannot answer the cases you actually face is not yet a usable policy.

## Age-Appropriate Student Use

Student use requires particular care because students are data subjects with enhanced protections under the GDPR, and because the developmental stage of the student affects what kind of engagement with AI is appropriate.

For primary students, the default should be that direct use of general-purpose AI tools is restricted. These tools were not designed for young children, their terms of service typically require minimum ages that exclude primary-aged students, and the educational benefit of direct use at this age is limited compared with teacher-curated use of AI-generated materials.

For lower secondary students, supervised use within specific lessons — with clear pedagogical objectives and without the entry of personal data — can be appropriate where the school has reviewed the tool and the activity is designed around educational goals. Direct individual use outside of supervised contexts is typically not appropriate at this level.

For upper secondary students, structured individual use becomes increasingly appropriate, particularly for preparation, practice, and metacognitive reflection of the kind described in the responsible use lesson. Assessment contexts remain a separate question — the policy should state clearly in which assessment contexts AI use is permitted, prohibited, or must be disclosed.

## The EU AI Act — A Second Layer

In addition to the GDPR, schools in the EU will increasingly need to consider the *EU AI Act*, which introduces a risk-based framework for AI systems. Under the AI Act, certain educational uses of AI — particularly those related to assessment and access decisions — are classified as *high-risk*, which triggers additional obligations for providers and users.

For schools, the practical implication is that any AI tool used in a high-risk context (such as determining admissions, grading high-stakes examinations, or detecting academic dishonesty) must meet specific requirements around transparency, human oversight, and documentation. These obligations apply even to schools that are not themselves developing AI systems but are using them in contexts classified as high-risk.

The policy should therefore include a statement acknowledging the AI Act's classification framework, a commitment to identify any high-risk uses within the school, and a process for ensuring that such uses meet the additional requirements that apply.

> **Warning**: The AI Act's specific obligations on educational uses are still being implemented and clarified. Schools should monitor guidance from national regulators and education ministries and update their policies accordingly. A policy that was compliant a year ago may not be compliant today.

## From Policy to Practice

A written policy is necessary but not sufficient. The hardest part is making the policy real in the daily life of the school. Three practical steps bridge the gap.

First, the policy must be actively communicated, not merely published. Staff need training sessions that work through the policy using concrete examples. Students need age-appropriate explanations of what they can and cannot do, and why. Parents need a clear written summary and a channel for questions.

Second, the policy must be supported by infrastructure. If the policy says teachers should use anonymised material, teachers need a simple routine for anonymisation. If the policy says student data may only enter approved tools, the school must maintain a visible list of approved tools and keep it current. If the policy says incidents must be reported, there must be an easy way to report them.

Third, the policy must be enforced consistently. A policy that is invoked only when something goes wrong becomes a compliance document rather than a working framework. A policy that is visibly applied in routine decisions — when choosing a new tool, when designing an assessment, when responding to a parent question — becomes part of the school's culture.

The goal is not perfect AI governance. The goal is a school in which decisions about AI are made deliberately, in line with a shared framework, with clear accountability. A school that achieves this will be better prepared for the technology changes still to come than a school that continues to treat AI as an individual teacher's personal choice.

## Summary

- A written AI policy is no longer optional for schools: AI use is happening regardless, and the absence of a policy leaves the school without a defensible position when questions or incidents arise.
- For schools in the EU, the GDPR provides the baseline — any processing of identifiable student data by an AI tool requires a lawful basis, appropriate safeguards, and in most cases a Data Processing Agreement with the provider.
- A workable school AI policy needs six components: scope, permitted and prohibited uses, data handling, tool approval, disclosure and transparency, and review and governance.
- The default position for general-purpose AI assistants should be that they are suitable for teacher preparation using anonymised material and not suitable for processing identifiable student data, unless the school has formally established a compliant arrangement with the provider.
- Student use should be calibrated to developmental stage — restricted for primary students, supervised in lower secondary, structured in upper secondary — with assessment contexts treated as a separate policy question.
- The EU AI Act adds a second layer of obligations for high-risk educational uses such as grading and admissions decisions; schools should identify any high-risk uses and ensure they meet the additional requirements.
- A policy becomes real only when it is actively communicated, supported by practical infrastructure, and applied consistently in routine decisions — not invoked only after something has gone wrong.
