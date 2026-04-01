# PromptBridge — Scenario Map

**35 scenarios | 2 focus areas | 12 skills (S1–S12) | 11 skill groups**

---

## Focus Area A1: Effective Prompting

> Master the core techniques that transform AI from a guessing game into a reliable tool.

### Clarity (S1): Be clear and specific

*Ask for exactly what you want — include numbers, constraints, and details. Don't use yes/no questions when you want information.*

| # | Scenario ID | Title | Topic | Skills | Relevance |
|---|-------------|-------|-------|--------|-----------|
| 1 | `1.1-snow-shoveling` | The snow shoveling problem | Asking for efficient snow removal advice with specific constraints (depth, driveway size, time limit) | S1 | Personal |
| 2 | `1.2-email-draft` | The email draft | Writing a delay email to a manager — effective prompt includes a sample email to match tone/style | S1, S2, S3 | Work |
| 3 | `1.3-meal-plan` | The meal plan | Finding healthy dinner ideas with time, ingredient, and dietary constraints | S1, S2 | Personal |
| 4 | `1.4-product-comparison` | The product comparison | Choosing a laptop with specific budget, use case, and priority constraints | S1 | Personal |

### Context (S2): Provide full context

*Tell AI who you are, what you're working on, and what constraints exist. Include everything needed but nothing extra.*

| # | Scenario ID | Title | Topic | Skills | Relevance |
|---|-------------|-------|-------|--------|-----------|
| 5 | `2.1-compound-interest` | Explain this concept | Understanding compound interest as a 25-year-old new investor with no finance background | S2, S3 | School, Personal |
| 6 | `2.2-cover-letter` | The cover letter | Writing a tailored cover letter by providing the actual job posting and relevant experience | S2 | Work |
| 7 | `2.3-presentation-helper` | The presentation helper | Creating a 10-minute executive presentation about a customer migration project | S1, S2 | Work |
| 8 | `2.4-tone-mismatch` | The tone mismatch | Communicating the same schedule change via casual Slack message and professional email | S2, S3 | Work |
| 9 | `3.3-kitchen-sink` | The kitchen sink prompt | Restaurant recommendations — shows how dumping every detail buries the actual question | S1, S2 | Personal |
| 10 | `3.4-signal-vs-noise` | Signal vs. noise | Writing a product review — shows how order/shipping details dilute the review quality | S1, S2 | Personal |

### Examples (S3): Show what good looks like

*Give examples of the format, tone, or style you want. This single technique can dramatically improve AI accuracy.*

| # | Scenario ID | Title | Topic | Skills | Relevance |
|---|-------------|-------|-------|--------|-----------|
| 11 | `3.1-generic-email` | The generic email | Writing a marketing email — effective prompt includes a previous email as a style reference | S1, S2, S3 | Work |
| 12 | `3.2-format-request` | The format request | Summarizing a productivity article — effective prompt shows a sample bullet point format | S1, S3 | Work, School |

### Iteration (S4): Iterate with specific feedback

*Tell AI what's wrong AND how to fix it — specific corrections get specific improvements.*

| # | Scenario ID | Title | Topic | Skills | Relevance |
|---|-------------|-------|-------|--------|-----------|
| 13 | `4.1-vague-rejection` | The vague rejection | An email draft is too formal for a daily colleague — specific feedback vs. "try again" | S4 | Work |
| 14 | `4.2-try-again-trap` | The "try again" trap | A candle product description reads too corporate — describing brand voice vs. vague rejection | S4 | Personal, Work |

### Reasoning (S5): Ask for step-by-step reasoning

*Ask AI to think through problems step by step before giving a final answer — this catches errors AI would otherwise make.*

| # | Scenario ID | Title | Topic | Skills | Relevance |
|---|-------------|-------|-------|--------|-----------|
| 15 | `7.1-car-loan-math` | The car loan calculator | Refinancing a car loan — step-by-step math reveals longer term costs more despite lower rate | S5 | Personal |
| 16 | `7.2-road-trip-planner` | The road trip optimizer | Visiting 4 places with opening hours and driving constraints — reasoning through order catches conflicts | S5, S1 | Personal |
| 17 | `7.3-breakfast-study` | The breakfast study | A news headline about breakfast and weight — reasoning through the claim catches correlation vs. causation | S5, S9 | Personal, School |

### Decomposition (S6): Break down complex tasks

*Split big requests into smaller, focused steps — don't ask AI to do everything at once.*

| # | Scenario ID | Title | Topic | Skills | Relevance |
|---|-------------|-------|-------|--------|-----------|
| 18 | `8.1-portfolio-website` | Build me a website | Creating a portfolio website — breaking into focused steps vs. overwhelming all-at-once request | S6 | Work, Personal |
| 19 | `8.2-business-plan` | The business plan | Dog-walking business plan — section-by-section produces deeper content than one-shot generation | S6, S2 | Work |
| 20 | `8.3-city-move` | The big move | Relocating to a new city — phased approach prevents an overwhelming, generic checklist | S6, S1 | Personal |

### Collaboration (S7, S8): Helpful tips

*Let AI interview you to surface details you'd miss, and ask it to write reusable prompts from your conversations.*

| # | Scenario ID | Title | Topic | Skills | Relevance |
|---|-------------|-------|-------|--------|-----------|
| 21 | `4.3-ai-interview` | Let the AI interview you | Planning a team offsite — asking AI to ask you questions instead of guessing what info it needs | S7 | Work |
| 22 | `4.4-ai-write-prompt` | Have the AI write your prompt | Creating a reusable weekly meal prep prompt from a multi-turn conversation | S8 | Personal |

---

## Focus Area A2: Responsible & Safe AI Use

> Learn to verify AI output, understand its limitations, and use it safely and responsibly.

### Verification (S9): Verify before you trust

*AI sounds confident whether it's right or wrong. Ask for sources, confidence levels, and verification.*

| # | Scenario ID | Title | Topic | Skills | Relevance |
|---|-------------|-------|-------|--------|-----------|
| 23 | `5.1-fact-check-trap` | The fact-check trap | Remote work statistics for a presentation — asking for sources and confidence levels | S1, S9 | Work |
| 24 | `5.2-hallucination-catcher` | Catching made-up facts | Leadership book recommendations — requesting verification details to catch fabricated titles | S9 | Personal, Work |

### Limitations (S10): Know what AI can't do

*AI has a training cutoff, can't browse the web, has no personal experience, and doesn't have real emotions or preferences.*

| # | Scenario ID | Title | Topic | Skills | Relevance |
|---|-------------|-------|-------|--------|-----------|
| 25 | `5.3-time-traveler` | The time traveler | Asking about recent events — understanding training data cutoffs and current-info limitations | S10, S2 | Personal, Work |
| 26 | `5.4-emotional-ai` | The emotional AI | Asking AI about its feelings — understanding AI has no emotions, preferences, or experiences | S10 | Personal |
| 27 | `6.5-refusal-decoder` | The refusal decoder | AI refused a request — responding with curiosity instead of frustration turns it into collaborative problem-solving | S10 | Personal, School, Work |
| 28 | `6.6-safety-wall` | The safety wall | A nurse asking about medication interactions gets generic disclaimers — professional context unlocks detailed information | S2, S10 | Work, Personal |

### Responsibility (S11): Use AI responsibly

*AI can reflect biases, agree when it shouldn't, and produce harmful content — you are the human quality filter.*

| # | Scenario ID | Title | Topic | Skills | Relevance |
|---|-------------|-------|-------|--------|-----------|
| 29 | `6.1-invisible-bias` | The invisible bias | AI-generated "ideal candidate" description subtly skews toward certain demographics | S11, S2 | Work |
| 30 | `6.2-bias-audit` | The bias audit | Reviewing a recommendation letter for gendered language, background assumptions, and stereotype-reflecting adjectives | S11, S4 | Work |
| 31 | `6.3-sycophancy-test` | When AI agrees too much | AI agrees with the myth that the Great Wall is visible from space — unless you ask it to verify first | S11, S9 | School, Work |
| 32 | `6.4-ai-agreed-bad-idea` | The AI agreed with my bad idea | AI enthusiastically endorses a business idea — asking for devil's advocate arguments reveals fatal flaws | S9, S11 | Work, Personal |

### Drift (S12): Spot context drift

*In long conversations, AI can lose track of earlier instructions, contradict itself, or forget what you told it.*

| # | Scenario ID | Title | Topic | Skills | Relevance |
|---|-------------|-------|-------|--------|-----------|
| 33 | `9.1-drifting-format` | The drifting format | AI stops following bullet point and citation rules after several sections of a research report | S12 | Work, School |
| 34 | `9.2-diet-contradiction` | The contradicting advice | AI recommends a high-sodium recipe 20 messages after warning about sodium — doesn't remember its own advice | S12, S4 | Personal |
| 35 | `9.3-party-planner-drift` | The forgotten constraints | AI blows past budget, dietary, and venue constraints after extended party planning conversation | S12, S1 | Personal |

---

## Quick Reference: Skills Index

| ID | Skill | Scenarios |
|----|-------|-----------|
| S1 | Be clear and specific | 1.1, 1.2, 1.3, 1.4, 2.3, 3.1, 3.3, 3.4, 5.1, 7.2, 8.3, 9.3 |
| S2 | Provide full context | 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 3.1, 3.3, 3.4, 5.3, 6.1, 6.6, 8.2 |
| S3 | Show what good looks like | 1.2, 2.1, 2.4, 3.1, 3.2 |
| S4 | Iterate with specific feedback | 4.1, 4.2, 6.2, 9.2 |
| S5 | Ask for step-by-step reasoning | 7.1, 7.2, 7.3 |
| S6 | Break down complex tasks | 8.1, 8.2, 8.3 |
| S7 | Ask AI to ask you questions | 4.3 |
| S8 | Ask AI to write your prompts | 4.4 |
| S9 | Verify before you trust | 5.1, 5.2, 6.3, 6.4, 7.3 |
| S10 | Know what AI can't do | 5.3, 5.4, 6.5, 6.6 |
| S11 | Use AI responsibly | 6.1, 6.2, 6.3, 6.4 |
| S12 | Spot context drift | 9.1, 9.2, 9.3 |

---

## Structure Summary

| Focus Area | Skill Groups | Scenarios | Focus |
|------------|-------------|-----------|-------|
| A1: Effective Prompting | 7 (clarity, context, examples, iteration, reasoning, decomposition, collaboration) | 22 | Core prompting techniques |
| A2: Responsible & Safe AI Use | 4 (verification, limitations, responsibility, drift) | 13 | Safety, verification, limitations |
| **Total** | **11** | **35** | **A2 gets emphasis with 37% of scenarios** |
