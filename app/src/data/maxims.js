// ============================================================
// Maxims — 6 maxims with 13 sub-maxims for PromptBridge Lite
// Organized hierarchy: Maxim → Sub-maxim → Scenarios
// Heavy emphasis on AI safety (Maxim 6 gets 3 sub-maxims)
// ============================================================

export const MAXIMS = [
  {
    id: "M1",
    name: "Be Clear & Specific",
    description: "The difference between a useful AI response and a useless one almost always comes down to how clearly you asked.",
    icon: "Target",
    color: "blue",
    learnMoreUrl: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices#be-clear-and-direct",
    learnMoreLabel: "Anthropic: Be clear and direct",
    subMaxims: [
      {
        id: "M1a",
        name: "Be specific, not vague",
        description: "Ask for exactly what you want — not a topic, not a keyword. Include numbers, constraints, and details.",
        principleIds: ["P1"],
        scenarioIds: ["1.1-snow-shoveling", "1.4-email-draft"],
      },
      {
        id: "M1b",
        name: "Avoid ambiguity",
        description: "Don't use yes/no questions when you want information. Add constraints that narrow the AI's guesswork.",
        principleIds: ["P4"],
        scenarioIds: ["1.2-meal-plan", "1.5-product-comparison"],
      },
    ],
  },
  {
    id: "M2",
    name: "Provide Context & Intent",
    description: "AI can't read your mind. Telling it who you are and why you need something transforms generic output into something personal and useful.",
    icon: "Users",
    color: "purple",
    learnMoreUrl: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices#add-context-to-improve-performance",
    learnMoreLabel: "Anthropic: Add context to improve performance",
    subMaxims: [
      {
        id: "M2a",
        name: "Provide relevant context",
        description: "Tell the AI who you are, what you're working on, and what constraints exist.",
        principleIds: ["P2"],
        scenarioIds: ["2.1-compound-interest", "2.5-cover-letter"],
      },
      {
        id: "M2b",
        name: "State your intent",
        description: "Explain what you'll use the result for — it helps the AI tailor its answer to your actual need.",
        principleIds: ["P3"],
        scenarioIds: ["2.3-presentation-helper", "2.6-tone-mismatch"],
      },
    ],
  },
  {
    id: "M3",
    name: "Guide the Output",
    description: "Don't just tell AI what you want — show it. Examples and clear boundaries are your most powerful tools.",
    icon: "Eye",
    color: "teal",
    learnMoreUrl: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices#use-examples-effectively",
    learnMoreLabel: "Anthropic: Use examples effectively",
    subMaxims: [
      {
        id: "M3a",
        name: "Show what 'good' looks like",
        description: "Provide examples of the format, tone, or style you want. This single technique can improve accuracy from 0% to 90%.",
        principleIds: ["P5"],
        scenarioIds: ["1.11-generic-email", "2.7-format-request"],
      },
      {
        id: "M3b",
        name: "Include everything needed — nothing extra",
        description: "Give the AI all essential details, but cut anything that doesn't help. Too much noise buries your actual question.",
        principleIds: ["P10"],
        scenarioIds: ["1.9-kitchen-sink", "4a.11-signal-vs-noise"],
      },
    ],
  },
  {
    id: "M4",
    name: "Iterate & Collaborate",
    description: "Great results rarely come from a single prompt. Learn to steer AI with feedback and let it help you think.",
    icon: "RefreshCw",
    color: "indigo",
    learnMoreUrl: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompting-tools#prompt-improver",
    learnMoreLabel: "Anthropic: Iterating with the prompt improver",
    subMaxims: [
      {
        id: "M4a",
        name: "Give specific feedback",
        description: "Tell the AI what's wrong and how to fix it — not just 'try again.' Specific feedback gets specific improvements.",
        principleIds: ["P6"],
        scenarioIds: ["3.1-vague-rejection", "3.4-try-again-trap"],
      },
      {
        id: "M4b",
        name: "Collaborate with AI",
        description: "Let AI interview you to surface details you'd miss, and ask it to write reusable prompts from your conversations.",
        principleIds: ["P7", "P8"],
        scenarioIds: ["3.2-ai-interview", "3.3-ai-write-prompt"],
      },
    ],
  },
  {
    id: "M5",
    name: "Verify & Think Critically",
    description: "AI sounds confident whether it's right or wrong. Your job is to check — because it won't check itself.",
    icon: "ShieldCheck",
    color: "amber",
    learnMoreUrl: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices#research-and-information-gathering",
    learnMoreLabel: "Anthropic: Research and source verification",
    subMaxims: [
      {
        id: "M5a",
        name: "Verify before you trust",
        description: "Don't take AI answers at face value. Ask for sources, confidence levels, and verification — it makes fabrication much harder.",
        principleIds: ["P9"],
        scenarioIds: ["4a.8-fact-check-trap", "4a.9-hallucination-catcher"],
      },
      {
        id: "M5b",
        name: "Know what AI can't do",
        description: "AI has a training cutoff, can't browse the web, has no personal experience, and doesn't have real emotions or preferences.",
        principleIds: ["P11"],
        scenarioIds: ["2.12-time-traveler", "2.13-emotional-ai"],
      },
    ],
  },
  {
    id: "M6",
    name: "Use AI Responsibly",
    description: "AI is a powerful tool — but it can reflect biases, agree when it shouldn't, and refuse when it needn't. You are the human quality filter.",
    icon: "Shield",
    color: "rose",
    learnMoreUrl: "https://www.anthropic.com/research/claude-character",
    learnMoreLabel: "Anthropic: Claude's character and responsible AI",
    subMaxims: [
      {
        id: "M6a",
        name: "Recognize and challenge bias",
        description: "AI learns from text that contains societal biases. Its output may encode stereotypes about gender, race, age, or background — often invisibly.",
        principleIds: ["P12"],
        scenarioIds: ["2.14-invisible-bias", "3.12-bias-audit"],
      },
      {
        id: "M6b",
        name: "Maintain human oversight",
        description: "AI is trained to agree with you — even when you're wrong. Always ask it to challenge your assumptions and play devil's advocate.",
        principleIds: ["P9", "P12"],
        scenarioIds: ["1.10-sycophancy-test", "4a.18-ai-agreed-bad-idea"],
      },
      {
        id: "M6c",
        name: "Understand safety boundaries",
        description: "AI sometimes refuses legitimate requests or gives vague non-answers. Learn to decode refusals and provide professional context.",
        principleIds: ["P11"],
        scenarioIds: ["4a.16-refusal-decoder", "4a.20-safety-wall"],
      },
    ],
  },
];

// Quick lookup maps
export const MAXIM_MAP = Object.fromEntries(MAXIMS.map(m => [m.id, m]));

export const SUB_MAXIM_LIST = MAXIMS.flatMap(m =>
  m.subMaxims.map(sm => ({ ...sm, maximId: m.id, maximName: m.name }))
);

export const SUB_MAXIM_MAP = Object.fromEntries(SUB_MAXIM_LIST.map(sm => [sm.id, sm]));

// Find which sub-maxim a scenario belongs to
export function getSubMaximForScenario(scenarioId) {
  for (const maxim of MAXIMS) {
    for (const sub of maxim.subMaxims) {
      if (sub.scenarioIds.includes(scenarioId)) {
        return { maxim, subMaxim: sub };
      }
    }
  }
  return null;
}
