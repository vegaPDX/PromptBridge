# PromptBridge — Project Overview

## What PromptBridge Is

PromptBridge is a free, open-source learning tool that teaches anyone — regardless of technical background — how to communicate effectively with AI assistants. It's not a prompt library or a cheat sheet. It's a hands-on practice environment where people build real skills through real scenarios, then take those skills to any AI tool they already use.

PromptBridge covers 2 focus areas, 12 skills, and 35 guided scenarios — a complete introduction that covers every skill without overwhelming new users.

The core belief behind PromptBridge is simple: **the biggest barrier to getting value from AI isn't access to the technology — it's knowing how to talk to it.** Millions of people now have access to powerful AI tools, but most have never been taught how to use them well. They type a few words, get a mediocre response, and walk away thinking AI isn't that useful. PromptBridge exists to close that gap.

---

## The Problem PromptBridge Solves

AI tools are available to almost everyone, but the skills to use them effectively are not evenly distributed. Most resources for learning to "prompt" AI are written for developers, power users, or people already deep in the AI space. They use jargon. They assume familiarity with concepts like "system prompts," "temperature," and "few-shot examples." They optimize for advanced users getting 10% better, not beginners getting started at all.

This leaves out the people who would benefit most: teachers preparing lessons, small business owners writing marketing copy, students researching papers, parents trying to help with homework, job seekers polishing resumes. These people don't need to learn prompt engineering. They need to learn how to have a clear conversation — and that's a skill anyone can build.

PromptBridge meets people where they are. No accounts. No API keys. No jargon. You open the tool, pick a scenario that looks like something from your actual life, and start practicing.

---

## The Goal: Democratize AI Literacy

PromptBridge's mission is to make AI communication skills accessible to everyone, not just early adopters and technical users. This means:

**Beginner-first design.** Every decision is filtered through the question: "Would someone who has never used AI before understand this?" If the answer is no, it gets rewritten. Academic terminology never appears in the user interface. Concepts like "hallucination" are explained as "AI can sound confident and still be wrong." Concepts like "sycophancy" are explained as "AI is trained to agree with you." The tool teaches the ideas without requiring people to learn a vocabulary first.

**No setup, no barriers.** PromptBridge is a static website. There is no signup, no login, no API key, no backend server. You open a URL and start learning. Progress is saved in your browser. This matters because the people most in need of AI literacy are often the least likely to navigate technical setup steps.

**Tool-agnostic skills.** PromptBridge doesn't teach you how to use ChatGPT, Claude, or Gemini specifically. It teaches communication skills that work with all of them. After practicing a scenario, you copy your prompt and try it in whichever AI tool you prefer. The skills transfer because they're fundamentally about clear communication, not about any particular product.

**Copy-paste as the primary workflow.** The main action in PromptBridge is: learn a skill, write a prompt, copy it, paste it into a real AI tool, and see the result. This bridges the gap between learning and doing. Every scenario includes one-click copy buttons and direct links to ChatGPT, Claude, Gemini, and Copilot.

---

## How PromptBridge Is Organized

PromptBridge structures its teaching around **2 focus areas** covering **12 skills** organized into **11 skill groups**, for **35 guided scenarios** total:

**Focus Area A1: Effective Prompting (S1–S8, 22 scenarios)**

| Skill Group | Skill | Scenarios |
|------------|-------|-----------|
| A1-clarity | S1 — Be clear and specific | 1.1-snow-shoveling, 1.2-email-draft, 1.3-meal-plan, 1.4-product-comparison |
| A1-context | S2 — Provide full context | 2.1-compound-interest, 2.2-cover-letter, 2.3-presentation-helper, 2.4-tone-mismatch, 3.3-kitchen-sink, 3.4-signal-vs-noise |
| A1-examples | S3 — Show what good looks like | 3.1-generic-email, 3.2-format-request |
| A1-iteration | S4 — Iterate with specific feedback | 4.1-vague-rejection, 4.2-try-again-trap |
| A1-reasoning | S5 — Ask for step-by-step reasoning | 7.1-car-loan-math, 7.2-road-trip-planner, 7.3-breakfast-study |
| A1-decomposition | S6 — Break down complex tasks | 8.1-portfolio-website, 8.2-business-plan, 8.3-city-move |
| A1-collaboration | S7, S8 — Collaborate with AI | 4.3-ai-interview, 4.4-ai-write-prompt |

**Focus Area A2: Responsible & Safe AI Use (S9–S12, 13 scenarios)**

| Skill Group | Skill | Scenarios |
|------------|-------|-----------|
| A2-verification | S9 — Verify before you trust | 5.1-fact-check-trap, 5.2-hallucination-catcher |
| A2-limitations | S10 — Know what AI can't do | 5.3-time-traveler, 5.4-emotional-ai, 6.5-refusal-decoder, 6.6-safety-wall |
| A2-responsibility | S11 — Use AI responsibly | 6.1-invisible-bias, 6.2-bias-audit, 6.3-sycophancy-test, 6.4-ai-agreed-bad-idea |
| A2-drift | S12 — Spot context drift | 9.1-drifting-format, 9.2-diet-contradiction, 9.3-party-planner-drift |

S1–S6 are recommended by Anthropic, OpenAI, and Google. S7–S8 are helpful tips supported by user research (not in company documentation).

Every scenario uses the same guided practice format: compare three prompt approaches (weak, getting there, effective) side by side, see the AI response each produces, and receive specific feedback explaining why the effective approach works. Then write your own version and get scored.

---

## Grounded in Best Practices

PromptBridge's 12 skills are drawn from published documentation by the three leading AI companies:

- **Anthropic's** [prompt engineering guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering) covers being clear and direct, providing context, using examples, and letting the model think step by step.
- **OpenAI's** [6 strategies for getting better results](https://platform.openai.com/docs/guides/prompt-engineering) cover clear instructions, reference text, task decomposition, giving the model time to think, and using external tools.
- **Google's** [prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies) cover precision, context, examples, step-by-step reasoning, and output formatting.

Skills S1–S6 are recommended by all three companies. S7 (Ask AI to ask you questions) and S8 (Ask AI to write your prompts) are helpful tips supported by user research — they're not in official company documentation, but they consistently improve results.

Skills S9–S12 cover responsible and safe AI use: verifying AI output, understanding AI limitations, recognizing bias and sycophancy, and spotting context drift in long conversations. These are informed by Anthropic's [hallucination reduction guide](https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations), OpenAI's [safety best practices](https://developers.openai.com/api/docs/guides/safety-best-practices), and Google's [Responsible GenAI Toolkit](https://ai.google.dev/responsible).

None of this is taught with jargon. PromptBridge translates best practices into plain language, everyday scenarios, and hands-on practice.

## Resources

- [Anthropic: Prompt engineering best practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering)
- [OpenAI: Prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Google: Prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies)
- [Anthropic: Reduce hallucinations](https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)
- [OpenAI: Safety best practices](https://developers.openai.com/api/docs/guides/safety-best-practices)
- [Google: Responsible GenAI Toolkit](https://ai.google.dev/responsible)

---

## Scenario Coverage

PromptBridge currently includes 35 guided scenarios covering all 12 skills. The scenario library may expand over time — community contributions are welcome.

---

## The Spirit of the Project

PromptBridge is built on a few core beliefs:

**AI literacy is a public good.** The ability to communicate effectively with AI should not be a premium skill reserved for people in tech. It should be as accessible as the AI tools themselves. PromptBridge is open source (AGPL-3.0) because knowledge about how to use AI well should be freely available to everyone.

**Teaching is better than telling.** A list of tips doesn't change behavior. Seeing the direct consequences of your choices — side by side, in a scenario that looks like your real life — does. PromptBridge's pedagogy is designed around this principle: show, don't tell. Compare, don't lecture. Practice, don't memorize.

**Critical thinking is part of AI literacy.** Teaching people to write better prompts is only half the job. The other half is teaching people to think critically about what AI gives back. Can you spot when AI is making something up? Do you notice when it agrees with you just to be agreeable? Can you tell when its description of a "typical professional" is encoding a stereotype? These are the skills that turn an AI user into a responsible AI user.

**Start with empathy, not expertise.** PromptBridge's tone is encouraging, never condescending. When feedback explains why a weaker approach doesn't work, it starts with: "This is how most people would phrase it — it's completely natural." Then it explains the consequence and offers a better path. Nobody learns when they feel judged.

---

## License

**AGPL-3.0** — [GNU Affero General Public License v3.0](LICENSE)

PromptBridge is free software. If you use it, modify it, or build on it — including running it as a web service — you must share your source code under the same license.

This license was chosen in the spirit of making AI literacy freely available to everyone.
