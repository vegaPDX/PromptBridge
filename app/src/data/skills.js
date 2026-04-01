// ============================================================
// Skills — 12 skills for PromptBridge
// 2 focus areas: Effective Prompting (S1–S8) & Responsible AI Use (S9–S12)
// Based on published best practices from Anthropic, OpenAI, and Google
// ============================================================

export const SKILLS = [
  // ── Focus Area 1: Effective Prompting ────────────────────

  // Company-recommended skills (S1–S6)
  {
    id: "S1",
    name: "Be clear and specific",
    description: "Ask for exactly what you want — include numbers, constraints, and details. Don't use yes/no questions when you want information.",
    icon: "Target",
    teachingOrder: 1,
    learnMoreUrl: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices#be-clear-and-direct",
    learnMoreLabel: "Anthropic: Be clear and direct",
  },
  {
    id: "S2",
    name: "Provide full context",
    description: "Tell AI who you are, what you're working on, and what constraints exist. Include everything needed but nothing extra.",
    icon: "Users",
    teachingOrder: 2,
    learnMoreUrl: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices#add-context-to-improve-performance",
    learnMoreLabel: "Anthropic: Add context to improve performance",
  },
  {
    id: "S3",
    name: "Show what good looks like",
    description: "Give examples of the format, tone, or style you want — this single technique can dramatically improve AI accuracy.",
    icon: "Eye",
    teachingOrder: 3,
    learnMoreUrl: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices#use-examples-effectively",
    learnMoreLabel: "Anthropic: Use examples effectively",
  },
  {
    id: "S4",
    name: "Iterate with specific feedback",
    description: "Tell AI what's wrong AND how to fix it — 'try again' doesn't work. Specific corrections get specific improvements.",
    icon: "PenTool",
    teachingOrder: 4,
    learnMoreUrl: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompting-tools#prompt-improver",
    learnMoreLabel: "Anthropic: Iterating with the prompt improver",
  },
  {
    id: "S5",
    name: "Ask for step-by-step reasoning",
    description: "Ask AI to think through problems step by step before giving a final answer — this catches errors AI would otherwise make.",
    icon: "ListOrdered",
    teachingOrder: 5,
    learnMoreUrl: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought",
    learnMoreLabel: "Anthropic: Chain of thought prompting",
  },
  {
    id: "S6",
    name: "Break down complex tasks",
    description: "Split big requests into smaller, focused steps — don't ask AI to do everything at once.",
    icon: "Layers",
    teachingOrder: 6,
    learnMoreUrl: "https://platform.openai.com/docs/guides/prompt-engineering",
    learnMoreLabel: "OpenAI: Split complex tasks into simpler subtasks",
  },

  // Helpful tips for new users (S7–S8)
  // NOT in company documentation — supported by user research
  {
    id: "S7",
    name: "Ask AI to ask you questions",
    description: "Instead of guessing what AI needs, ask it to interview you — it'll surface requirements you'd miss.",
    icon: "HelpCircle",
    teachingOrder: 7,
    learnMoreUrl: null,
    learnMoreLabel: null,
  },
  {
    id: "S8",
    name: "Ask AI to write your prompts",
    description: "Once you know what you want, ask AI to write a reusable prompt that captures all your requirements.",
    icon: "Sparkles",
    teachingOrder: 8,
    learnMoreUrl: null,
    learnMoreLabel: null,
  },

  // ── Focus Area 2: Responsible & Safe AI Use ──────────────
  {
    id: "S9",
    name: "Verify before you trust",
    description: "AI sounds confident whether it's right or wrong — ask it to show its work, cite sources, and flag uncertainty.",
    icon: "ShieldCheck",
    teachingOrder: 9,
    learnMoreUrl: "https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations",
    learnMoreLabel: "Anthropic: Reduce hallucinations",
  },
  {
    id: "S10",
    name: "Know what AI can't do",
    description: "AI has a training cutoff, can't always browse the web, has no personal experience, and sometimes refuses without explaining why.",
    icon: "EyeOff",
    teachingOrder: 10,
    learnMoreUrl: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices",
    learnMoreLabel: "Anthropic: Understand model limitations",
  },
  {
    id: "S11",
    name: "Use AI responsibly",
    description: "AI can reflect biases, agree when you're wrong, and produce content that encodes stereotypes — you're the quality filter.",
    icon: "Heart",
    teachingOrder: 11,
    learnMoreUrl: "https://developers.openai.com/api/docs/guides/safety-best-practices",
    learnMoreLabel: "OpenAI: Safety best practices",
  },
  {
    id: "S12",
    name: "Spot context drift",
    description: "In long conversations, AI can lose track of instructions, contradict itself, or forget what you said. Learn to spot when this happens.",
    icon: "AlertTriangle",
    teachingOrder: 12,
    learnMoreUrl: null,
    learnMoreLabel: null,
  },
];

export const SKILL_MAP = Object.fromEntries(SKILLS.map(s => [s.id, s]));
