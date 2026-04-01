# Contributing Scenarios to PromptBridge

Thank you for helping make PromptBridge better! Scenarios are the core of the learning experience — each one teaches users how to communicate more effectively with AI tools through hands-on practice.

## What makes a good scenario?

A good scenario is:
- **Relatable** — Based on a situation most people would actually encounter
- **Specific** — Has enough detail for meaningful prompt variations (weak/medium/strong)
- **Skill-mapped** — Maps clearly to 1-3 of the 12 skills
- **AI-agnostic** — Works with any AI assistant, not specific to one tool

## The 12 skills

Every scenario must map to at least one:

| ID | Skill | What it teaches |
|----|-------|----------------|
| S1 | Be clear and specific | Ask for exactly what you want — include numbers, constraints, and details |
| S2 | Provide full context | Tell AI who you are, what you're working on, and what constraints exist |
| S3 | Show what good looks like | Give examples of the format, tone, or style you want |
| S4 | Iterate with specific feedback | Tell AI what's wrong AND how to fix it |
| S5 | Ask for step-by-step reasoning | Ask AI to think through problems step by step |
| S6 | Break down complex tasks | Split big requests into smaller, focused steps |
| S7 | Ask AI to ask you questions | Let it interview you instead of guessing |
| S8 | Ask AI to write your prompts | Let it crystallize a reusable prompt |
| S9 | Verify before you trust | AI sounds confident whether right or wrong — ask for sources |
| S10 | Know what AI can't do | AI has a training cutoff, can't browse the web, etc. |
| S11 | Use AI responsibly | AI can reflect biases, agree when wrong, produce harmful content |
| S12 | Spot context drift | In long conversations, AI can lose track of instructions |

**Note:** S1–S6 are recommended by Anthropic, OpenAI, and Google. S7–S8 are supported by user research.

## Scenario format

Each scenario is a JavaScript object in `app/src/data/scenarios.js`:

```javascript
{
  id: "7.4-example-scenario",
  area: "A1",
  skillGroup: "A1-reasoning",
  title: "Example title",
  situation: "...",
  mode: "guided",
  skills: ["S5"],
  feedbackNotes: "...",
  relevance: ["personal"],
}
```

### Focus areas and skill groups

| Focus Area | Skill Group | Label |
|-----------|------------|-------|
| A1 — Effective Prompting | A1-clarity | S1: Be clear and specific |
| | A1-context | S2: Provide full context |
| | A1-examples | S3: Show what good looks like |
| | A1-iteration | S4: Iterate with specific feedback |
| | A1-reasoning | S5: Ask for step-by-step reasoning |
| | A1-decomposition | S6: Break down complex tasks |
| | A1-collaboration | S7, S8: Collaborate with AI |
| A2 — Responsible & Safe AI Use | A2-verification | S9: Verify before you trust |
| | A2-limitations | S10: Know what AI can't do |
| | A2-responsibility | S11: Use AI responsibly |
| | A2-drift | S12: Spot context drift |

### Relevance tags

Add one or more: `"work"`, `"coding"`, `"school"`, `"personal"`, `"other"`

## How to contribute

### Option 1: Scenario definition only (easiest)

1. Fork the repo
2. Add your scenario to `app/src/data/scenarios.js`
3. Submit a PR with:
   - The scenario object
   - A brief explanation of what it teaches and why

We'll generate the static content (options, responses, feedback) for you.

### Option 2: Full scenario with generated content

1. Fork the repo
2. Add your scenario to `app/src/data/scenarios.js`
3. Run the content generator:
   ```bash
   cd app
   # Using Gemini (free)
   GEMINI_API_KEY=your-key node scripts/generate-content.js --provider gemini --scenario your-scenario-id
   # Using Claude
   ANTHROPIC_API_KEY=your-key node scripts/generate-content.js --scenario your-scenario-id
   ```
4. Review the generated JSON in `app/src/data/generated/your-scenario-id.json`
5. Submit a PR with both files

### Validating your scenario

Run the validation script to check your scenario format:
```bash
node app/scripts/validate-scenario.js your-scenario-id
```

## Quality checklist

Before submitting:

- [ ] Situation is realistic — would a real person encounter this?
- [ ] Title is short and memorable (under 40 characters)
- [ ] Skills are correctly mapped (the scenario actually teaches those skills)
- [ ] FeedbackNotes explain what the comparison should highlight
- [ ] Relevance tags match the scenario context
- [ ] ID follows the `group.number-short-name` format
- [ ] No jargon — no "prompt engineering," "tokens," "context window"

## Examples

**Good scenario idea:** "You need to write a LinkedIn recommendation for a coworker, but you're not sure how to make it sound genuine rather than generic."
- Teaches: S2 (full context), S3 (show examples)
- Relatable, specific, clear skill mapping

**Bad scenario idea:** "Use AI to do something at work."
- Too vague, no specific situation, unclear what skills it teaches
