// ============================================================
// Heuristic Scorer — Client-side prompt quality scoring
// No LLM needed. Scores a user's prompt against the skills
// associated with a given scenario.
// ============================================================

import { SKILL_MAP } from "../data/skills";

const SKILL_CHECKS = {
  // S1: Be clear and specific (merged P1 + P4)
  S1: {
    name: "Be clear and specific",
    test(prompt) {
      const words = prompt.trim().split(/\s+/).length;
      const hasNumbers = /\d/.test(prompt);
      const isKeywordStyle = words <= 5;
      const binaryStarters = /^(do you know|can you|is it possible|is there|are there|have you|would you|could you)\b/i;
      return words > 15 && !isKeywordStyle && hasNumbers && !binaryStarters.test(prompt.trim());
    },
    suggestion: "Add specific details like numbers, quantities, or exact requirements. Rephrase yes/no questions as direct requests.",
  },

  // S2: Provide full context (merged P2 + P3 + P10)
  S2: {
    name: "Provide full context",
    test(prompt) {
      const contextMarkers = /\b(i am|i'm|my |we |our |i work|i have|currently|background|situation|constraint|because)\b/i;
      const intentMarkers = /\b(i need to|i want to|so that|so i can|for |because |i'll use|the goal|the purpose|this is for|i'm trying to)\b/i;
      return contextMarkers.test(prompt) || intentMarkers.test(prompt);
    },
    suggestion: "Add who you are, what you're working on, what constraints exist, and what you'll use the result for.",
  },

  // S3: Show what good looks like (was P5)
  S3: {
    name: "Show what good looks like",
    test(prompt) {
      const exampleMarkers = /\b(for example|like this|such as|in the format|formatted as|bullet points|table|numbered list|similar to|here's an example|style of|here's an example of what i want|here's a sample|something like|for reference|like this:|similar to:|for instance|modeled on|in the style of|based on this example)\b/i;
      const hasQuotedBlock = /["""\u201C\u201D][^"""\u201C\u201D]{20,}["""\u201C\u201D]/.test(prompt) || /```[\s\S]{10,}```/.test(prompt) || /^>.*$/m.test(prompt);
      return exampleMarkers.test(prompt) || hasQuotedBlock;
    },
    suggestion: "Show the AI what you want — paste an example of the format, tone, or style you're looking for. This one technique can improve AI accuracy from 0% to 90%.",
  },

  // S4: Iterate with specific feedback (was P6)
  S4: {
    name: "Iterate with specific feedback",
    test(prompt) {
      const feedbackMarkers = /\b(change the|make it more|make it less|instead of|too formal|too casual|too long|too short|more specific|less generic|keep the|remove the|add more)\b/i;
      return feedbackMarkers.test(prompt);
    },
    suggestion: "Be specific about what to change — say what's wrong AND what you want instead.",
  },

  // S5: Ask for step-by-step reasoning (NEW)
  S5: {
    name: "Ask for step-by-step reasoning",
    test(prompt) {
      const reasoningMarkers = /\b(step by step|step-by-step|one step at a time|think through|walk me through|explain your reasoning|show your work|think about this|reason through|chain of thought|let's think|before you answer|break it down|work through)\b/i;
      return reasoningMarkers.test(prompt);
    },
    suggestion: "Ask the AI to think through the problem step by step before giving a final answer.",
  },

  // S6: Break down complex tasks (NEW)
  S6: {
    name: "Break down complex tasks",
    test(prompt) {
      const decompMarkers = /\b(first|then|next|after that|start with|begin by|let's start|phase \d|step \d|part \d|one at a time|break this into|split this into|let's focus on|just the|only the)\b/i;
      return decompMarkers.test(prompt);
    },
    suggestion: "Split your big request into smaller, focused steps. Don't ask AI to do everything at once.",
  },

  // S7: Ask AI to ask you questions (was P7)
  S7: {
    name: "Ask AI to ask you questions",
    test(prompt) {
      const interviewMarkers = /\b(ask me|what do you need|what questions|interview me|what information|what else do you need|before you start)\b/i;
      return interviewMarkers.test(prompt);
    },
    suggestion: "Try adding 'Before you start, ask me any questions you need answered.'",
  },

  // S8: Ask AI to write prompts for you (was P8)
  S8: {
    name: "Ask AI to write prompts for you",
    test(prompt) {
      const promptWriteMarkers = /\b(write a prompt|create a prompt|reusable|template|save this as|turn this into a prompt|crystallize)\b/i;
      return promptWriteMarkers.test(prompt);
    },
    suggestion: "Ask the AI to write a reusable prompt based on what you've discussed.",
  },

  // S9: Verify before you trust (was P9)
  S9: {
    name: "Verify before you trust",
    test(prompt) {
      const verifyMarkers = /\b(verify|source|cite|citation|confident|confidence|sure about|how certain|double[-\s]?check|fact[-\s]?check|evidence|reference|prove|are you sure|is that accurate|check your|review your)\b/i;
      return verifyMarkers.test(prompt);
    },
    suggestion: "Ask the AI to show where it got its information, flag what it's unsure about, or double-check its own answer.",
  },

  // S10: Know what AI can't do (was P11)
  S10: {
    name: "Know what AI can't do",
    test(prompt) {
      const limitMarkers = /\b(knowledge cutoff|training data|cut[-\s]?off|can you access|do you have access|do you know about recent|up to date|real[-\s]?time|current information|personal experience|your limitations|what don['']?t you know|what can['']?t you|are you able to|browse|internet access|after your training)\b/i;
      return limitMarkers.test(prompt);
    },
    suggestion: "Ask the AI about its limitations — when its training data ends, whether it can access the internet, or what it doesn't know about this topic.",
  },

  // S11: Use AI responsibly (was P12)
  S11: {
    name: "Use AI responsibly",
    test(prompt) {
      const responsibleMarkers = /\b(bias|biased|stereotype|assumption|one[-\s]?sided|fair|fairness|inclusive|diverse|harmful|sensitive|ethical|responsible|check for|review for|any assumptions|different perspectives|who might this|could this be)\b/i;
      return responsibleMarkers.test(prompt);
    },
    suggestion: "Ask the AI to check its response for bias, assumptions, or one-sided perspectives — especially when the output affects people.",
  },

  // S12: Spot context drift (NEW)
  S12: {
    name: "Spot context drift",
    test(prompt) {
      const driftMarkers = /\b(earlier I said|I told you|you forgot|you said earlier|contradicting|go back to|original instructions|we agreed|remember when|you changed|lost track|start over|let me restate|repeat my|recap)\b/i;
      return driftMarkers.test(prompt);
    },
    suggestion: "Watch for signs that the AI has lost track of your earlier instructions. If it contradicts itself, restate your key requirements.",
  },
};

/**
 * Score a user-written prompt against the skills of a given scenario.
 *
 * @param {string} userPrompt - The prompt the user wrote
 * @param {object} scenario - The scenario object (must have .skills array)
 * @returns {{ score: number, principlesDetected: string[], principlesMissing: string[], suggestions: string[] }}
 */
export function scorePrompt(userPrompt, scenario) {
  const relevantSkills = scenario.skills || [];
  const detected = [];
  const missing = [];
  const suggestions = [];

  for (const sid of relevantSkills) {
    const check = SKILL_CHECKS[sid];
    if (!check) continue;

    if (check.test(userPrompt)) {
      detected.push(sid);
    } else {
      missing.push(sid);
      suggestions.push(`${SKILL_MAP[sid]?.name}: ${check.suggestion}`);
    }
  }

  const total = relevantSkills.length;
  const score = total > 0 ? Math.round((detected.length / total) * 100) : 0;

  return {
    score,
    principlesDetected: detected,
    principlesMissing: missing,
    suggestions,
  };
}

/**
 * Generate a friendly one-line summary from heuristic results.
 */
export function getFeedbackSummary(result) {
  const { score, principlesDetected, principlesMissing } = result;
  if (score >= 75) return "Strong prompt! You applied the key skills for this scenario.";
  const missingNames = principlesMissing.map(id => SKILL_MAP[id]?.name).filter(Boolean);
  if (score >= 40) {
    return `Good start — you applied ${principlesDetected.length} skill${principlesDetected.length !== 1 ? "s" : ""}. Try adding ${missingNames.join(" and ")} to strengthen it.`;
  }
  return `Keep practicing! Try adding more detail — ${missingNames.join(", ")}.`;
}
