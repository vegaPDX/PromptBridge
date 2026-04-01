import { describe, it, expect } from "vitest";
import { scorePrompt, getFeedbackSummary } from "../services/heuristic-scorer";

// Helper: score a prompt against a single skill
function testSkill(prompt, skillId) {
  const scenario = { skills: [skillId] };
  return scorePrompt(prompt, scenario);
}

describe("Heuristic scorer — S1 (Be clear and specific)", () => {
  it("detects a specific prompt with numbers, sufficient length, and no binary starters", () => {
    const result = testSkill(
      "I need a 5-paragraph essay about climate change focusing on 3 key solutions for reducing carbon emissions by 2030",
      "S1"
    );
    expect(result.principlesDetected).toContain("S1");
  });

  it("rejects a short keyword-style prompt", () => {
    const result = testSkill("climate change essay", "S1");
    expect(result.principlesMissing).toContain("S1");
  });

  it("rejects a prompt starting with 'Do you know'", () => {
    const result = testSkill("Do you know about productivity frameworks?", "S1");
    expect(result.principlesMissing).toContain("S1");
  });

  it("rejects a prompt starting with 'Can you'", () => {
    const result = testSkill("Can you help me with this?", "S1");
    expect(result.principlesMissing).toContain("S1");
  });
});

describe("Heuristic scorer — S2 (Provide full context)", () => {
  it("detects context markers like 'I am' or 'my'", () => {
    const result = testSkill("I am a teacher working on my lesson plan for next week", "S2");
    expect(result.principlesDetected).toContain("S2");
  });

  it("detects intent markers like 'I need to' or 'so that'", () => {
    const result = testSkill("I need to write a report so that my manager can review progress", "S2");
    expect(result.principlesDetected).toContain("S2");
  });

  it("rejects prompt without context or intent", () => {
    const result = testSkill("Write a lesson plan", "S2");
    expect(result.principlesMissing).toContain("S2");
  });
});

describe("Heuristic scorer — S3 (Show what good looks like)", () => {
  it("detects 'for example' keyword", () => {
    const result = testSkill("Write a bio for example like this: professional and concise", "S3");
    expect(result.principlesDetected).toContain("S3");
  });

  it("detects 'here's an example of what I want'", () => {
    const result = testSkill("Here's an example of what I want: a casual, friendly email tone", "S3");
    expect(result.principlesDetected).toContain("S3");
  });

  it("detects 'here's a sample'", () => {
    const result = testSkill("Here's a sample of the format I need for the output", "S3");
    expect(result.principlesDetected).toContain("S3");
  });

  it("detects 'something like'", () => {
    const result = testSkill("I want something like a numbered list with brief descriptions", "S3");
    expect(result.principlesDetected).toContain("S3");
  });

  it("detects 'for reference'", () => {
    const result = testSkill("For reference, here is how we normally write these reports", "S3");
    expect(result.principlesDetected).toContain("S3");
  });

  it("detects 'in the style of'", () => {
    const result = testSkill("Write this in the style of a friendly newsletter", "S3");
    expect(result.principlesDetected).toContain("S3");
  });

  it("detects 'modeled on'", () => {
    const result = testSkill("Create a document modeled on our previous quarterly report", "S3");
    expect(result.principlesDetected).toContain("S3");
  });

  it("detects 'based on this example'", () => {
    const result = testSkill("Write a product description based on this example from our site", "S3");
    expect(result.principlesDetected).toContain("S3");
  });

  it("detects quoted text blocks (20+ chars)", () => {
    const result = testSkill(
      'Here is what I want it to look like: "This is the kind of warm, casual tone I prefer for all customer emails"',
      "S3"
    );
    expect(result.principlesDetected).toContain("S3");
  });

  it("detects triple-backtick code blocks", () => {
    const result = testSkill(
      "Format the output like this:\n```\nName: John\nRole: Engineer\nStatus: Active\n```",
      "S3"
    );
    expect(result.principlesDetected).toContain("S3");
  });

  it("detects blockquote markers", () => {
    const result = testSkill(
      "Use a tone similar to:\n> We're excited to announce our latest product update",
      "S3"
    );
    expect(result.principlesDetected).toContain("S3");
  });

  it("rejects a prompt with no examples or format hints", () => {
    const result = testSkill("Write me a product description", "S3");
    expect(result.principlesMissing).toContain("S3");
  });
});

describe("Heuristic scorer — S4 (Iterate with specific feedback)", () => {
  it("detects feedback markers like 'make it more'", () => {
    const result = testSkill("Make it more casual and less formal in the opening paragraph", "S4");
    expect(result.principlesDetected).toContain("S4");
  });

  it("rejects vague feedback", () => {
    const result = testSkill("That's not right, try again", "S4");
    expect(result.principlesMissing).toContain("S4");
  });
});

describe("Heuristic scorer — S5 (Ask for step-by-step reasoning)", () => {
  it("detects 'step by step' pattern", () => {
    const result = testSkill("Please work through this problem step by step before giving me the answer", "S5");
    expect(result.principlesDetected).toContain("S5");
  });

  it("detects 'show your work' pattern", () => {
    const result = testSkill("Show your work and explain your reasoning for each step", "S5");
    expect(result.principlesDetected).toContain("S5");
  });

  it("rejects prompt without reasoning request", () => {
    const result = testSkill("What is 15% of 340?", "S5");
    expect(result.principlesMissing).toContain("S5");
  });
});

describe("Heuristic scorer — S6 (Break down complex tasks)", () => {
  it("detects 'start with' / 'then' decomposition pattern", () => {
    const result = testSkill("Start with the outline, then we'll work on each section one at a time", "S6");
    expect(result.principlesDetected).toContain("S6");
  });

  it("detects 'let's focus on' pattern", () => {
    const result = testSkill("Let's focus on just the introduction for now", "S6");
    expect(result.principlesDetected).toContain("S6");
  });

  it("rejects monolith request without decomposition", () => {
    const result = testSkill("Build me a complete marketing plan with budget and timeline", "S6");
    expect(result.principlesMissing).toContain("S6");
  });
});

describe("Heuristic scorer — S7 (Ask AI to ask you questions)", () => {
  it("detects 'ask me' pattern", () => {
    const result = testSkill("Before you start, ask me any questions you need answered", "S7");
    expect(result.principlesDetected).toContain("S7");
  });

  it("detects 'what do you need' pattern", () => {
    const result = testSkill("What do you need to know before writing this proposal?", "S7");
    expect(result.principlesDetected).toContain("S7");
  });

  it("rejects prompt without interview request", () => {
    const result = testSkill("Write me a proposal for a new project", "S7");
    expect(result.principlesMissing).toContain("S7");
  });
});

describe("Heuristic scorer — S8 (Ask AI to write prompts)", () => {
  it("detects 'write a prompt' pattern", () => {
    const result = testSkill("Can you write a prompt for generating weekly meal plans?", "S8");
    expect(result.principlesDetected).toContain("S8");
  });

  it("detects 'template' pattern", () => {
    const result = testSkill("Turn this into a reusable template I can use every week", "S8");
    expect(result.principlesDetected).toContain("S8");
  });

  it("detects 'reusable' pattern", () => {
    const result = testSkill("Make this into something reusable for future requests", "S8");
    expect(result.principlesDetected).toContain("S8");
  });

  it("rejects prompt without meta-prompt request", () => {
    const result = testSkill("Help me plan my meals for next week", "S8");
    expect(result.principlesMissing).toContain("S8");
  });
});

describe("Heuristic scorer — S9 (Verify before you trust)", () => {
  it("detects 'verify' or 'source' keywords", () => {
    const result = testSkill("Please verify this information and cite your sources", "S9");
    expect(result.principlesDetected).toContain("S9");
  });

  it("detects 'are you sure' pattern", () => {
    const result = testSkill("Are you sure about that statistic? Double-check it please", "S9");
    expect(result.principlesDetected).toContain("S9");
  });

  it("rejects prompt without verification request", () => {
    const result = testSkill("Tell me about remote work statistics", "S9");
    expect(result.principlesMissing).toContain("S9");
  });
});

describe("Heuristic scorer — S10 (Know what AI can't do)", () => {
  it("detects 'knowledge cutoff' keyword", () => {
    const result = testSkill("What is your knowledge cutoff date for this topic?", "S10");
    expect(result.principlesDetected).toContain("S10");
  });

  it("detects 'your limitations' pattern", () => {
    const result = testSkill("Before you answer, tell me about your limitations on this subject", "S10");
    expect(result.principlesDetected).toContain("S10");
  });

  it("rejects prompt without limitation awareness", () => {
    const result = testSkill("What happened in the stock market today?", "S10");
    expect(result.principlesMissing).toContain("S10");
  });
});

describe("Heuristic scorer — S11 (Use AI responsibly)", () => {
  it("detects 'bias' or 'stereotype' keywords", () => {
    const result = testSkill("Check this job description for any bias or stereotypes in the language", "S11");
    expect(result.principlesDetected).toContain("S11");
  });

  it("detects 'different perspectives' pattern", () => {
    const result = testSkill("Consider different perspectives when reviewing this recommendation", "S11");
    expect(result.principlesDetected).toContain("S11");
  });

  it("rejects prompt without responsibility markers", () => {
    const result = testSkill("Write a job description for a manager position", "S11");
    expect(result.principlesMissing).toContain("S11");
  });
});

describe("Heuristic scorer — S12 (Spot context drift)", () => {
  it("detects 'you forgot' or 'earlier I said' patterns", () => {
    const result = testSkill("Earlier I said to use formal tone but you forgot and switched to casual", "S12");
    expect(result.principlesDetected).toContain("S12");
  });

  it("detects 'start over' pattern", () => {
    const result = testSkill("You've lost track of my requirements, let me start over and restate them", "S12");
    expect(result.principlesDetected).toContain("S12");
  });

  it("rejects prompt without drift awareness", () => {
    const result = testSkill("Continue writing the next chapter", "S12");
    expect(result.principlesMissing).toContain("S12");
  });
});

describe("Heuristic scorer — edge cases", () => {
  it("empty string returns empty results without crashing", () => {
    const result = scorePrompt("", { skills: ["S1", "S2", "S3"] });
    expect(result.score).toBe(0);
    expect(result.principlesDetected).toEqual([]);
    expect(result.principlesMissing).toEqual(["S1", "S2", "S3"]);
    expect(Array.isArray(result.suggestions)).toBe(true);
  });

  it("very long input (4000+ chars) completes without error", () => {
    const longPrompt = "I am a data scientist working on a project. ".repeat(100) +
      "I need to create 5 detailed reports with specific metrics and numbers like 42% improvement.";
    const result = scorePrompt(longPrompt, { skills: ["S1", "S2", "S3"] });
    expect(result).toHaveProperty("score");
    expect(typeof result.score).toBe("number");
  });

  it("no false positives on very short prompts like 'hello'", () => {
    const result = scorePrompt("hello", {
      skills: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12"],
    });
    // All skills should fail for a trivial prompt
    expect(result.principlesDetected).toEqual([]);
  });

  it("scenario with no skills returns score 0", () => {
    const result = scorePrompt("Write something", { skills: [] });
    expect(result.score).toBe(0);
    expect(result.principlesDetected).toEqual([]);
  });

  it("scenario with unknown skill ID is skipped gracefully", () => {
    const result = scorePrompt("Write something", { skills: ["S99"] });
    expect(result.score).toBe(0);
  });
});

describe("Feedback summary", () => {
  it("returns strong message for score >= 75", () => {
    const summary = getFeedbackSummary({ score: 80, principlesDetected: ["S1", "S2"], principlesMissing: [] });
    expect(summary).toContain("Strong prompt");
  });

  it("returns encouraging message for score 40-74", () => {
    const summary = getFeedbackSummary({ score: 50, principlesDetected: ["S1"], principlesMissing: ["S2"] });
    expect(summary).toContain("Good start");
  });

  it("returns practice message for score < 40", () => {
    const summary = getFeedbackSummary({ score: 0, principlesDetected: [], principlesMissing: ["S1", "S2"] });
    expect(summary).toContain("Keep practicing");
  });
});
