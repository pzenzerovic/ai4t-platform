// Registers all 33 AI4Teachers lesson video compositions for Remotion Studio.
//
// Composition IDs use the schema `C{cat}L{nn}_{Slug}` so they sort
// alphabetically in the order learners encounter them on the AI4Teachers
// platform: Category 1 first, then 2, 3, 4; within each category by order.

import { Composition } from 'remotion'

// ── Cat 1 — AI Literacy
import { LessonC1L01, LESSON_DURATION_SECONDS as DUR_C1L01, FPS } from './LessonC1L01.jsx'
import { LessonC1L02, LESSON_DURATION_SECONDS as DUR_C1L02 } from './LessonC1L02.jsx'
import { LessonC1L03, LESSON_DURATION_SECONDS as DUR_C1L03 } from './LessonC1L03.jsx'
import { LessonC1L04, LESSON_DURATION_SECONDS as DUR_C1L04 } from './LessonC1L04.jsx'
import { LessonC1L05, LESSON_DURATION_SECONDS as DUR_C1L05 } from './LessonC1L05.jsx'
import { LessonC1L06, LESSON_DURATION_SECONDS as DUR_C1L06 } from './LessonC1L06.jsx'
import { LessonC1L07, LESSON_DURATION_SECONDS as DUR_C1L07 } from './LessonC1L07.jsx'
import { LessonC1L08, LESSON_DURATION_SECONDS as DUR_C1L08 } from './LessonC1L08.jsx'

// ── Cat 2 — Practical AI Skills
import { LessonC2L01, LESSON_DURATION_SECONDS as DUR_C2L01 } from './LessonC2L01.jsx'
import { LessonC2L02, LESSON_DURATION_SECONDS as DUR_C2L02 } from './LessonC2L02.jsx'
import { LessonC2L03, LESSON_DURATION_SECONDS as DUR_C2L03 } from './LessonC2L03.jsx'
import { LessonC2L04, LESSON_DURATION_SECONDS as DUR_C2L04 } from './LessonC2L04.jsx'
import { LessonC2L05, LESSON_DURATION_SECONDS as DUR_C2L05 } from './LessonC2L05.jsx'
import { LessonC2L06, LESSON_DURATION_SECONDS as DUR_C2L06 } from './LessonC2L06.jsx'
import { LessonC2L07, LESSON_DURATION_SECONDS as DUR_C2L07 } from './LessonC2L07.jsx'
import { LessonC2L08, LESSON_DURATION_SECONDS as DUR_C2L08 } from './LessonC2L08.jsx'
import { LessonC2L09, LESSON_DURATION_SECONDS as DUR_C2L09 } from './LessonC2L09.jsx'

// ── Cat 3 — Considerations on AI
import { LessonC3L01, LESSON_DURATION_SECONDS as DUR_C3L01 } from './LessonC3L01.jsx'
import { LessonC3L02, LESSON_DURATION_SECONDS as DUR_C3L02 } from './LessonC3L02.jsx'
import { LessonC3L03, LESSON_DURATION_SECONDS as DUR_C3L03 } from './LessonC3L03.jsx'
import { LessonC3L04, LESSON_DURATION_SECONDS as DUR_C3L04 } from './LessonC3L04.jsx'
import { LessonC3L05, LESSON_DURATION_SECONDS as DUR_C3L05 } from './LessonC3L05.jsx'
import { LessonC3L06, LESSON_DURATION_SECONDS as DUR_C3L06 } from './LessonC3L06.jsx'
import { LessonC3L07, LESSON_DURATION_SECONDS as DUR_C3L07 } from './LessonC3L07.jsx'
import { LessonC3L08, LESSON_DURATION_SECONDS as DUR_C3L08 } from './LessonC3L08.jsx'
import { LessonC3L09, LESSON_DURATION_SECONDS as DUR_C3L09 } from './LessonC3L09.jsx'

// ── Cat 4 — AI for All Learners
import { LessonC4L01, LESSON_DURATION_SECONDS as DUR_C4L01 } from './LessonC4L01.jsx'
import { LessonC4L02, LESSON_DURATION_SECONDS as DUR_C4L02 } from './LessonC4L02.jsx'
import { LessonC4L03, LESSON_DURATION_SECONDS as DUR_C4L03 } from './LessonC4L03.jsx'
import { LessonC4L04, LESSON_DURATION_SECONDS as DUR_C4L04 } from './LessonC4L04.jsx'
import { LessonC4L05, LESSON_DURATION_SECONDS as DUR_C4L05 } from './LessonC4L05.jsx'
import { LessonC4L06, LESSON_DURATION_SECONDS as DUR_C4L06 } from './LessonC4L06.jsx'
import { LessonC4L07, LESSON_DURATION_SECONDS as DUR_C4L07 } from './LessonC4L07.jsx'

const FRAME = (sec) => Math.ceil(sec * FPS)
const VID = { fps: FPS, width: 3840, height: 2160 }

export const RemotionRoot = () => (
  <>
    {/* ── Cat 1 — AI Literacy ──────────────────────────── */}
    <Composition id="C1L01-WhatIsAi"                       component={LessonC1L01} durationInFrames={FRAME(DUR_C1L01)} {...VID} />
    <Composition id="C1L02-AiInEducation"                  component={LessonC1L02} durationInFrames={FRAME(DUR_C1L02)} {...VID} />
    <Composition id="C1L03-BriefHistoryOfAi"               component={LessonC1L03} durationInFrames={FRAME(DUR_C1L03)} {...VID} />
    <Composition id="C1L04-HowLlmsWork"                    component={LessonC1L04} durationInFrames={FRAME(DUR_C1L04)} {...VID} />
    <Composition id="C1L05-AiLimitations"                  component={LessonC1L05} durationInFrames={FRAME(DUR_C1L05)} {...VID} />
    <Composition id="C1L06-MultimodalAi"                   component={LessonC1L06} durationInFrames={FRAME(DUR_C1L06)} {...VID} />
    <Composition id="C1L07-LayersOfAi"                     component={LessonC1L07} durationInFrames={FRAME(DUR_C1L07)} {...VID} />
    <Composition id="C1L08-FutureOfAi"                     component={LessonC1L08} durationInFrames={FRAME(DUR_C1L08)} {...VID} />

    {/* ── Cat 2 — Practical AI Skills ──────────────────── */}
    <Composition id="C2L01-ContextAndAi"                   component={LessonC2L01} durationInFrames={FRAME(DUR_C2L01)} {...VID} />
    <Composition id="C2L02-IntroToPromptEngineering"       component={LessonC2L02} durationInFrames={FRAME(DUR_C2L02)} {...VID} />
    <Composition id="C2L03-PromptEngineeringExamples"      component={LessonC2L03} durationInFrames={FRAME(DUR_C2L03)} {...VID} />
    <Composition id="C2L04-MetaPrompting"                  component={LessonC2L04} durationInFrames={FRAME(DUR_C2L04)} {...VID} />
    <Composition id="C2L05-GettingStartedWithChatgpt"      component={LessonC2L05} durationInFrames={FRAME(DUR_C2L05)} {...VID} />
    <Composition id="C2L06-GettingStartedWithClaude"       component={LessonC2L06} durationInFrames={FRAME(DUR_C2L06)} {...VID} />
    <Composition id="C2L07-CanvaAiForEducation"            component={LessonC2L07} durationInFrames={FRAME(DUR_C2L07)} {...VID} />
    <Composition id="C2L08-MagicSchoolForTeachers"         component={LessonC2L08} durationInFrames={FRAME(DUR_C2L08)} {...VID} />
    <Composition id="C2L09-LovableForEducation"            component={LessonC2L09} durationInFrames={FRAME(DUR_C2L09)} {...VID} />

    {/* ── Cat 3 — Considerations on AI ─────────────────── */}
    <Composition id="C3L01-FromAnswersToLearning"          component={LessonC3L01} durationInFrames={FRAME(DUR_C3L01)} {...VID} />
    <Composition id="C3L02-AiAsATutor"                     component={LessonC3L02} durationInFrames={FRAME(DUR_C3L02)} {...VID} />
    <Composition id="C3L03-AiForPracticeAndAssessment"     component={LessonC3L03} durationInFrames={FRAME(DUR_C3L03)} {...VID} />
    <Composition id="C3L04-StructuringKnowledge"           component={LessonC3L04} durationInFrames={FRAME(DUR_C3L04)} {...VID} />
    <Composition id="C3L05-ResponsibleUseOfAi"             component={LessonC3L05} durationInFrames={FRAME(DUR_C3L05)} {...VID} />
    <Composition id="C3L06-EthicsOfAiInEducation"          component={LessonC3L06} durationInFrames={FRAME(DUR_C3L06)} {...VID} />
    <Composition id="C3L07-HumanInTheLoop"                 component={LessonC3L07} durationInFrames={FRAME(DUR_C3L07)} {...VID} />
    <Composition id="C3L08-AiPolicyForSchools"             component={LessonC3L08} durationInFrames={FRAME(DUR_C3L08)} {...VID} />
    <Composition id="C3L09-DetectingAiGeneratedWork"       component={LessonC3L09} durationInFrames={FRAME(DUR_C3L09)} {...VID} />

    {/* ── Cat 4 — AI for All Learners ──────────────────── */}
    <Composition id="C4L01-AiAndAccessibilityOverview"     component={LessonC4L01} durationInFrames={FRAME(DUR_C4L01)} {...VID} />
    <Composition id="C4L02-AiForVisualImpairments"         component={LessonC4L02} durationInFrames={FRAME(DUR_C4L02)} {...VID} />
    <Composition id="C4L03-AiForHearingImpairments"        component={LessonC4L03} durationInFrames={FRAME(DUR_C4L03)} {...VID} />
    <Composition id="C4L04-CognitiveAccessibility"         component={LessonC4L04} durationInFrames={FRAME(DUR_C4L04)} {...VID} />
    <Composition id="C4L05-AiForMultilingualClassrooms"    component={LessonC4L05} durationInFrames={FRAME(DUR_C4L05)} {...VID} />
    <Composition id="C4L06-AiForIntellectualDisabilities"  component={LessonC4L06} durationInFrames={FRAME(DUR_C4L06)} {...VID} />
    <Composition id="C4L07-AccessibilityToolsDirectory"    component={LessonC4L07} durationInFrames={FRAME(DUR_C4L07)} {...VID} />
  </>
)
