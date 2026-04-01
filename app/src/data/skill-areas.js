// ============================================================
// Skill Areas — 2 focus areas with 12 skills for PromptBridge
// Organized hierarchy: Focus Area → Skill Group → Scenarios
// Based on published best practices from Anthropic, OpenAI, and Google
// ============================================================

export const SKILL_AREAS = [
  {
    id: "A1",
    name: "Effective Prompting",
    description: "Master the core techniques that transform AI from a guessing game into a reliable tool.",
    icon: "Zap",
    color: "blue",
    learnMoreUrl: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices",
    learnMoreLabel: "Anthropic: Prompt engineering best practices",
    skills: [
      {
        id: "A1-clarity",
        name: "Be clear and specific",
        description: "Ask for exactly what you want — include numbers, constraints, and details. Don't use yes/no questions when you want information.",
        skillIds: ["S1"],
        framing: "recommended",
        scenarioIds: ["1.1-snow-shoveling", "1.2-email-draft", "1.3-meal-plan", "1.4-product-comparison"],
      },
      {
        id: "A1-context",
        name: "Provide full context",
        description: "Tell AI who you are, what you're working on, and what constraints exist. Include everything needed but nothing extra.",
        skillIds: ["S2"],
        framing: "recommended",
        scenarioIds: ["2.1-compound-interest", "2.2-cover-letter", "2.3-presentation-helper", "2.4-tone-mismatch", "3.3-kitchen-sink", "3.4-signal-vs-noise"],
      },
      {
        id: "A1-examples",
        name: "Show what good looks like",
        description: "Give examples of the format, tone, or style you want. This single technique can dramatically improve AI accuracy.",
        skillIds: ["S3"],
        framing: "recommended",
        scenarioIds: ["3.1-generic-email", "3.2-format-request"],
      },
      {
        id: "A1-iteration",
        name: "Iterate with specific feedback",
        description: "Tell AI what's wrong AND how to fix it — specific corrections get specific improvements.",
        skillIds: ["S4"],
        framing: "recommended",
        scenarioIds: ["4.1-vague-rejection", "4.2-try-again-trap"],
      },
      {
        id: "A1-reasoning",
        name: "Ask for step-by-step reasoning",
        description: "Ask AI to think through problems step by step before giving a final answer — this catches errors AI would otherwise make.",
        skillIds: ["S5"],
        framing: "recommended",
        scenarioIds: ["7.1-car-loan-math", "7.2-road-trip-planner", "7.3-breakfast-study"],
      },
      {
        id: "A1-decomposition",
        name: "Break down complex tasks",
        description: "Split big requests into smaller, focused steps — don't ask AI to do everything at once.",
        skillIds: ["S6"],
        framing: "recommended",
        scenarioIds: ["8.1-portfolio-website", "8.2-business-plan", "8.3-city-move"],
      },
      {
        id: "A1-collaboration",
        name: "Collaborate with AI",
        description: "Let AI interview you to surface details you'd miss, and ask it to write reusable prompts from your conversations.",
        skillIds: ["S7", "S8"],
        framing: "tip",
        scenarioIds: ["4.3-ai-interview", "4.4-ai-write-prompt"],
      },
    ],
  },
  {
    id: "A2",
    name: "Responsible & Safe AI Use",
    description: "Learn to verify AI output, understand its limitations, and use it safely and responsibly.",
    icon: "Shield",
    color: "rose",
    learnMoreUrl: "https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations",
    learnMoreLabel: "Anthropic: Reduce hallucinations and improve safety",
    skills: [
      {
        id: "A2-verification",
        name: "Verify before you trust",
        description: "AI sounds confident whether it's right or wrong. Ask for sources, confidence levels, and verification.",
        skillIds: ["S9"],
        framing: "recommended",
        scenarioIds: ["5.1-fact-check-trap", "5.2-hallucination-catcher"],
      },
      {
        id: "A2-limitations",
        name: "Know what AI can't do",
        description: "AI has a training cutoff, can't browse the web, has no personal experience, and doesn't have real emotions or preferences.",
        skillIds: ["S10"],
        framing: "recommended",
        scenarioIds: ["5.3-time-traveler", "5.4-emotional-ai", "6.5-refusal-decoder", "6.6-safety-wall"],
      },
      {
        id: "A2-responsibility",
        name: "Use AI responsibly",
        description: "AI can reflect biases, agree when it shouldn't, and produce harmful content — you are the human quality filter.",
        skillIds: ["S11"],
        framing: "recommended",
        scenarioIds: ["6.1-invisible-bias", "6.2-bias-audit", "6.3-sycophancy-test", "6.4-ai-agreed-bad-idea"],
      },
      {
        id: "A2-drift",
        name: "Spot context drift",
        description: "In long conversations, AI can lose track of earlier instructions, contradict itself, or forget what you told it.",
        skillIds: ["S12"],
        framing: "recommended",
        scenarioIds: ["9.1-drifting-format", "9.2-diet-contradiction", "9.3-party-planner-drift"],
      },
    ],
  },
];

// Quick lookup maps
export const SKILL_AREA_MAP = Object.fromEntries(SKILL_AREAS.map(a => [a.id, a]));

export const SKILL_LIST = SKILL_AREAS.flatMap(a =>
  a.skills.map(s => ({ ...s, areaId: a.id, areaName: a.name }))
);

// Note: named SKILL_GROUP_MAP (not SKILL_MAP) to avoid collision with
// SKILL_MAP exported from skills.js which maps skill IDs to definitions.
export const SKILL_GROUP_MAP = Object.fromEntries(SKILL_LIST.map(s => [s.id, s]));

// Find which skill group a scenario belongs to
export function getSkillForScenario(scenarioId) {
  for (const area of SKILL_AREAS) {
    for (const skill of area.skills) {
      if (skill.scenarioIds.includes(scenarioId)) {
        return { area, skill };
      }
    }
  }
  return null;
}
