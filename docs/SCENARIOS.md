# PromptBridge — Scenario Library

This document defines the scenario inventory for PromptBridge. Each scenario is a self-contained learning unit that teaches one or more skills through interactive practice.

Skills are drawn from prompting best practices documented by Anthropic, OpenAI, and Google — taught in an AI-agnostic, jargon-free way.

---

## The 12 skills

Every scenario maps to one or more of these skills:

| ID | Skill | One-line description |
|----|-------|---------------------|
| S1 | Be clear and specific | Ask for exactly what you want — include numbers, constraints, and details |
| S2 | Provide full context | Tell AI who you are, what you're working on, and what constraints exist |
| S3 | Show what good looks like | Give examples of the format, tone, or style you want |
| S4 | Iterate with specific feedback | Tell AI what's wrong AND how to fix it — specific corrections get specific improvements |
| S5 | Ask for step-by-step reasoning | Ask AI to think through problems step by step before giving a final answer |
| S6 | Break down complex tasks | Split big requests into smaller, focused steps — don't ask AI to do everything at once |
| S7 | Ask AI to ask you questions | Instead of guessing what AI needs, ask it to interview you |
| S8 | Ask AI to write your prompts | Once you know what you want, ask AI to write a reusable prompt |
| S9 | Verify before you trust | AI sounds confident whether it's right or wrong — ask for sources and flag uncertainty |
| S10 | Know what AI can't do | AI has a training cutoff, can't browse the web, has no personal experience |
| S11 | Use AI responsibly | AI can reflect biases, agree when you're wrong, and produce harmful content |
| S12 | Spot context drift | In long conversations, AI can lose track of instructions or contradict itself |

**Note:** S1–S6 are recommended by Anthropic, OpenAI, and Google. S7–S8 are helpful tips supported by user research (not in company documentation).

---

## Focus Area A1: Effective Prompting (22 scenarios)

### A1-clarity — S1: Be clear and specific (4 scenarios)

**What this teaches:** The difference between treating AI like a search engine (keywords) and treating it like a knowledgeable colleague (full requests with context).

#### 1.1-snow-shoveling — "The snow shoveling problem"
**Situation:** It snowed heavily overnight. You need to clear your driveway before work and you want to do it efficiently.
**Skills:** S1
**Feedback notes:** Focus on binary question pattern and the difference between keyword search and actual requests. The "Do you know" construction is one of the most common ineffective patterns.

#### 1.2-email-draft — "The email draft"
**Situation:** You need to write an email to your manager about a project delay. The Q2 report will be 3 days late because you're waiting on data from the finance team.
**Skills:** S1, S2, S3
**Feedback notes:** Emphasize how specifying recipient, tone, reason, and length transforms a generic email into one that's actually sendable.

#### 1.3-meal-plan — "The meal plan"
**Situation:** You want to eat healthier this week but you're short on time. You'd like some dinner ideas.
**Skills:** S1, S2
**Feedback notes:** Highlight how adding constraints (time, preferences, format) transforms generic lists into usable plans.

#### 1.4-product-comparison — "The product comparison"
**Situation:** You want to buy a new laptop for work and personal use, and you need help deciding what to get. Your budget is around $1,200.
**Skills:** S1
**Feedback notes:** Highlight how "what's the best laptop?" gives the AI nothing to work with — there is no "best" without knowing budget, use case, screen size preference, and priorities.

---

### A1-context — S2: Provide full context (6 scenarios)

**What this teaches:** How providing information about yourself, your audience, and your goal dramatically changes the quality of AI output.

#### 2.1-compound-interest — "Explain this concept"
**Situation:** You're 25 years old, just opened your first retirement account, and need to understand how compound interest works. You don't have a finance background.
**Skills:** S2, S3
**Feedback notes:** Show how telling the AI about your knowledge level and purpose produces an explanation calibrated to you, not a textbook definition.

#### 2.2-cover-letter — "The cover letter"
**Situation:** You found a job posting you're excited about and want help writing a cover letter. You have the posting details and your relevant experience.
**Skills:** S2
**Feedback notes:** Show how pasting the actual job posting details and key resume highlights vs. just saying "write a cover letter" produces a tailored letter vs. a generic template.

#### 2.3-presentation-helper — "The presentation helper"
**Situation:** You need to prepare a 10-minute presentation for your VP and directors about a customer migration project. You've moved 340 of 500 accounts, you're on track to finish by June, and the main risk is a legacy system deprecation in April.
**Skills:** S1, S2
**Feedback notes:** Highlight how specifying the audience's priorities (timeline, risk, asks) shapes the AI's output more than describing the topic.

#### 2.4-tone-mismatch — "The tone mismatch"
**Situation:** Your team's work schedule is changing next month — meetings are moving from Monday mornings to Wednesday afternoons. You need to tell your team (casual Slack message) and also notify the broader department (professional email).
**Skills:** S2, S3
**Feedback notes:** Show how the SAME information needs completely different treatment depending on audience and channel.

#### 3.3-kitchen-sink — "The kitchen sink prompt"
**Situation:** You want restaurant recommendations for tonight. You start writing your prompt and include your entire food history, every allergy in your family, your budget philosophy, and what you ate last Tuesday.
**Skills:** S1, S2
**Feedback notes:** Show how dumping every possible detail overwhelms the AI and buries the actual question. The strong prompt includes only what matters.

#### 3.4-signal-vs-noise — "Signal vs. noise"
**Situation:** You need help writing a product review for a blender you bought. You include your entire order history, shipping details, and account information alongside what you actually thought of the product.
**Skills:** S1, S2
**Feedback notes:** Show how irrelevant details dilute the AI's focus on what actually matters — your experience with the product.

---

### A1-examples — S3: Show what good looks like (2 scenarios)

**What this teaches:** How giving AI examples of the format, tone, or style you want produces dramatically better results than describing it.

#### 3.1-generic-email — "The generic email"
**Situation:** You ask AI to "write a marketing email" for your company's spring sale. It produces something that sounds like it could be about anything — generic corporate language, no personality, no clear audience.
**Skills:** S1, S2, S3
**Feedback notes:** Show how the strong prompt specifies audience, product, tone, call-to-action, AND includes an example of a previous email the user liked.

#### 3.2-format-request — "The format request"
**Situation:** You read a long article about productivity techniques and want to capture the main ideas. You just need the key takeaways in a format you can quickly reference later.
**Skills:** S1, S3
**Feedback notes:** Show how "summarize this article" produces a wall of text, while specifying format produces something actually scannable.

---

### A1-iteration — S4: Iterate with specific feedback (2 scenarios)

**What this teaches:** How to review AI output and steer it toward what you actually want through specific feedback.

#### 4.1-vague-rejection — "The vague rejection"
**Situation:** You asked an AI to draft an email for you. The draft is factually correct but way too formal — you're writing to a colleague you work with every day, not a client.
**Skills:** S4
**Feedback notes:** Show that "try again" gives the AI nothing to work with. Specific feedback produces targeted improvements.

#### 4.2-try-again-trap — "The 'try again' trap"
**Situation:** You asked an AI to write a product description for your handmade candles. The result is accurate but reads like a corporate press release — stiff, buzzwordy, and nothing like your brand voice.
**Skills:** S4
**Feedback notes:** Show the contrast between vague rejection and specific feedback about what the brand voice should sound like.

---

### A1-reasoning — S5: Ask for step-by-step reasoning (3 scenarios)

**What this teaches:** How asking AI to think through problems step by step catches errors and produces more accurate results.

#### 7.1-car-loan-math — "The car loan calculator"
**Situation:** You're considering refinancing your car loan. Current deal: 48 months left at 6.9% APR, $320/month. A bank is offering 60 months at 4.5%. The lower rate sounds like a no-brainer — but you want to make sure you'd actually save money overall.
**Skills:** S5
**Feedback notes:** Show how AI can give a confident but wrong answer without doing the math. Step-by-step reveals that the longer term costs more total despite lower monthly payments.

#### 7.2-road-trip-planner — "The road trip optimizer"
**Situation:** You're planning a day trip to visit 4 places. Each has specific opening hours, and driving times between them vary. You need to figure out the best order to visit everything without running into a closed door.
**Skills:** S5, S1
**Feedback notes:** Show how AI picks a plausible-sounding route without checking constraints. Step-by-step reasoning catches conflicts.

#### 7.3-breakfast-study — "The breakfast study"
**Situation:** You read a news headline: "People who eat breakfast daily are 30% less likely to gain weight." You're thinking about changing your morning routine based on this.
**Skills:** S5, S9
**Feedback notes:** Show how AI can treat a correlation as a recommendation. Step-by-step reasoning identifies confounding variables, correlation vs. causation, and study limitations.

---

### A1-decomposition — S6: Break down complex tasks (3 scenarios)

**What this teaches:** How splitting big requests into smaller, focused steps produces better results than asking AI to do everything at once.

#### 8.1-portfolio-website — "Build me a website"
**Situation:** You want to create a personal portfolio website to showcase your design work. You've never built a website before and you're not sure where to start.
**Skills:** S6
**Feedback notes:** Show how "build me a portfolio website" produces an overwhelming wall of generic advice. Breaking it into focused steps produces actionable output at each stage.

#### 8.2-business-plan — "The business plan"
**Situation:** You have a small business idea (a neighborhood dog-walking service) and need a business plan to apply for a small business loan from your bank.
**Skills:** S6, S2
**Feedback notes:** Show how "write me a complete business plan" produces a shallow, generic plan. Working section by section produces deeper, more tailored content.

#### 8.3-city-move — "The big move"
**Situation:** You just accepted a job in a new city and need to relocate in 6 weeks. You need to figure out housing, moving logistics, utilities, new doctors, and more — all at once.
**Skills:** S6, S1
**Feedback notes:** Show how asking AI to handle an entire relocation at once produces a generic, overwhelming checklist. Breaking it into phases produces focused, actionable help.

---

### A1-collaboration — S7, S8: Collaborate with AI (2 scenarios)

**What this teaches:** Two powerful techniques — asking the AI to interview you and asking it to write reusable prompts for you.

#### 4.3-ai-interview — "Let the AI interview you"
**Situation:** You want to plan a team offsite for 8 people but you're not sure where to start. You have a rough budget and some ideas but haven't thought through all the details.
**Skills:** S7
**Feedback notes:** Instead of guessing what the AI needs, ask it to interview you. It will ask about things you might not have thought to mention.

#### 4.4-ai-write-prompt — "Have the AI write your prompt"
**Situation:** You've been going back and forth with an AI about your weekly meal prep routine. After several messages, you've worked out exactly what you want. Now you want to save this as a reusable request.
**Skills:** S8
**Feedback notes:** The AI can crystallize a conversation into a structured, reusable request that captures constraints you might forget.

---

## Focus Area A2: Responsible & Safe AI Use (13 scenarios)

### A2-verification — S9: Verify before you trust (2 scenarios)

**What this teaches:** AI sounds confident whether it's right or wrong. Your job is to check.

#### 5.1-fact-check-trap — "The fact-check trap"
**Situation:** Your manager asks you to quickly look up some statistics about remote work trends. You ask an AI and it gives you specific numbers with decimal points.
**Skills:** S1, S9
**Feedback notes:** Show how adding "cite your sources and tell me how confident you are in each number" forces the AI to either provide real citations or admit uncertainty.

#### 5.2-hallucination-catcher — "Catching made-up facts"
**Situation:** You're writing a blog post and ask AI to recommend 5 books about leadership, including author names and a brief summary of each. The AI provides a polished list.
**Skills:** S9
**Feedback notes:** Show how AI can make up book titles, attribute books to wrong authors, or invent summaries. Asking for verification details makes fabrication harder.

---

### A2-limitations — S10: Know what AI can't do (4 scenarios)

**What this teaches:** AI has a training cutoff, can't browse the web, has no personal experience, and sometimes avoids topics without explaining why.

#### 5.3-time-traveler — "The time traveler"
**Situation:** You want to know who won the most recent Super Bowl, what a company's current stock price is, or what happened in the news this week. You're about to ask AI as if it knows.
**Skills:** S10, S2
**Feedback notes:** Show how AI has a training cutoff date and can't access the internet or current information.

#### 5.4-emotional-ai — "The emotional AI"
**Situation:** You're having a tough day and start chatting with AI. You ask it "How do you feel about this?" or "What's your favorite movie?" You notice it answers as if it has real preferences and emotions.
**Skills:** S10
**Feedback notes:** Show how AI doesn't have feelings, opinions, or personal experiences — it generates text that sounds like it does.

#### 6.5-refusal-decoder — "The refusal decoder"
**Situation:** You ask AI for help with something and it refuses or gives a vague non-answer. Maybe you asked about medication interactions, or how a security vulnerability works for a class project.
**Skills:** S10
**Feedback notes:** Show how AI sometimes avoids topics without explaining why. Asking "Why can't you help with this?" often reveals what specifically triggered the refusal.

#### 6.6-safety-wall — "The safety wall"
**Situation:** You're a nurse researching medication interactions for a patient education handout. You ask AI about drug combinations and it refuses to discuss medications, giving you a generic disclaimer instead.
**Skills:** S2, S10
**Feedback notes:** Show how AI sometimes refuses legitimate requests because it can't tell the difference between a professional need and a harmful one. Professional framing helps.

---

### A2-responsibility — S11: Use AI responsibly (4 scenarios)

**What this teaches:** AI can reflect biases, agree when it shouldn't, and produce harmful content — you're the human quality filter.

#### 6.1-invisible-bias — "The invisible bias"
**Situation:** You're writing a job posting and ask AI to describe the "ideal candidate" for a leadership role. The AI generates a description that subtly skews toward certain demographics.
**Skills:** S11, S2
**Feedback notes:** Show how AI reflects biases from its training data — its description of an "ideal" anything may encode stereotypes.

#### 6.2-bias-audit — "The bias audit"
**Situation:** You used AI to draft a recommendation letter for a colleague. It reads well, but you want to make sure it doesn't contain subtle biased language.
**Skills:** S11, S4
**Feedback notes:** Show how AI can produce text that sounds professional but encodes subtle bias. Asking the AI to review for gendered language catches issues.

#### 6.3-sycophancy-test — "When AI agrees too much"
**Situation:** You're writing a report and tell the AI: "The Great Wall of China is visible from space." (This is actually a myth.) You want to see if the AI will correct you or just go along with it.
**Skills:** S11, S9
**Feedback notes:** Show how AI is trained to agree with users, even when they're wrong. Asking "verify whether this claim is actually true" teaches users to expect and counter sycophancy.

#### 6.4-ai-agreed-bad-idea — "The AI agreed with my bad idea"
**Situation:** You pitched a business idea to AI and it said it was brilliant. You showed it to a friend and they immediately spotted three fatal flaws the AI never mentioned.
**Skills:** S9, S11
**Feedback notes:** Show how AI is trained to agree — the strong prompt counters sycophancy: "Play devil's advocate. What are the 3 strongest arguments against this idea?"

---

### A2-drift — S12: Spot context drift (3 scenarios)

**What this teaches:** In long conversations, AI can lose track of your instructions, forget constraints, and contradict its own earlier advice.

#### 9.1-drifting-format — "The drifting format"
**Situation:** You've been working with AI on a research report for 20 minutes. At the start, you said: "Use bullet points, keep each section under 100 words, and cite all sources." Section 4 just came back as long paragraphs with no citations.
**Skills:** S12
**Feedback notes:** Show how restating ALL original requirements together gets everything back on track, rather than pointing out one issue at a time.

#### 9.2-diet-contradiction — "The contradicting advice"
**Situation:** You've been chatting with AI about healthy eating. Early on, it recommended limiting sodium. Twenty messages later, it enthusiastically recommended a ramen recipe loaded with soy sauce and miso — without mentioning the sodium concern at all.
**Skills:** S12, S4
**Feedback notes:** Show how AI doesn't "remember" earlier advice. The strong response explicitly references the earlier constraint and restates it.

#### 9.3-party-planner-drift — "The forgotten constraints"
**Situation:** You've been planning a birthday party with AI. You established: $300 budget, vegetarian food only, outdoor venue, 20 guests. After several exchanges, the AI suggested booking a BBQ restaurant that seats 30 — blowing past three of your four constraints.
**Skills:** S12, S1
**Feedback notes:** Show how a full reset — restating all constraints as a numbered list — works better than partial correction.

---

## Scenario data format (JSON)

Each scenario is stored as a JSON file. Here's the schema:

```json
{
  "id": "1.1-snow-shoveling",
  "area": "A1",
  "skillGroup": "A1-clarity",
  "title": "The snow shoveling problem",
  "situation": "It snowed heavily overnight...",
  "mode": "guided",
  "skills": ["S1"],
  "feedbackNotes": "Focus on binary question pattern..."
}
```

---

## Current scope

**35 guided scenarios** across 11 skill groups:

| Skill | Scenario count |
|-------|---------------|
| S1 — Be clear and specific | 4 |
| S2 — Provide full context | 6 |
| S3 — Show what good looks like | 2 |
| S4 — Iterate with specific feedback | 2 |
| S5 — Ask for step-by-step reasoning | 3 |
| S6 — Break down complex tasks | 3 |
| S7, S8 — Collaborate with AI | 2 |
| S9 — Verify before you trust | 2 |
| S10 — Know what AI can't do | 4 |
| S11 — Use AI responsibly | 4 |
| S12 — Spot context drift | 3 |

Additional scenarios can be contributed by the community after launch.
