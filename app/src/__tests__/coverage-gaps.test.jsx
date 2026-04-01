import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import fs from "fs";
import path from "path";

import { scorePrompt } from "../services/heuristic-scorer";
import { SKILLS } from "../data/skills";
import { getRecommendedScenarios } from "../services/recommendations";
import LandingPage from "../pages/LandingPage";

// ---------------------------------------------------------------------------
// Test 1: Feedback format verification (extends data-integrity)
// ---------------------------------------------------------------------------
describe("Feedback format verification", () => {
  const GENERATED_DIR = path.resolve(__dirname, "../data/generated");
  const generatedFiles = fs.readdirSync(GENERATED_DIR).filter(f => f.endsWith(".json"));

  it("all feedback.skill and feedback.skill_name are not identical (content quality)", () => {
    const duplicates = [];
    for (const file of generatedFiles) {
      const content = JSON.parse(fs.readFileSync(path.join(GENERATED_DIR, file), "utf-8"));
      if (content.feedback.skill === content.feedback.skill_name) {
        duplicates.push(file);
      }
    }
    expect(duplicates).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Test 2: S3 curly/smart quote detection
// ---------------------------------------------------------------------------
describe("S3 curly quote detection", () => {
  it("detects curly double quotes (smart quotes from Word/Google Docs)", () => {
    const result = scorePrompt(
      '\u201CThis is the kind of warm, casual tone I prefer for all customer emails\u201D',
      { skills: ["S3"] }
    );
    expect(result.principlesDetected).toContain("S3");
  });

  it("detects regular straight quotes (20+ chars)", () => {
    const result = scorePrompt(
      '"This is a quoted block that is definitely over twenty characters long"',
      { skills: ["S3"] }
    );
    expect(result.principlesDetected).toContain("S3");
  });

  it("does not trigger on short quoted text (under 20 chars)", () => {
    const result = scorePrompt(
      '"hello world"',
      { skills: ["S3"] }
    );
    // Should NOT detect S3 from this short quote alone
    expect(result.principlesMissing).toContain("S3");
  });
});

// ---------------------------------------------------------------------------
// Test 3: scorePrompt edge cases
// ---------------------------------------------------------------------------
describe("scorePrompt edge cases", () => {
  it("handles undefined scenario.skills gracefully", () => {
    const result = scorePrompt("some text", {});
    expect(result.score).toBe(0);
    expect(result.principlesDetected).toEqual([]);
  });

  it("handles null-ish prompt by not crashing", () => {
    // Empty string already tested elsewhere, but test with whitespace-only
    const result = scorePrompt("   ", { skills: ["S1", "S2"] });
    expect(result).toHaveProperty("score");
  });
});

// ---------------------------------------------------------------------------
// Test 4: Skills teaching order
// ---------------------------------------------------------------------------
describe("Skills teaching order", () => {
  it("skills sorted by teachingOrder produce expected sequence", () => {
    const sorted = [...SKILLS].sort((a, b) => a.teachingOrder - b.teachingOrder);
    const ids = sorted.map(s => s.id);
    expect(ids).toEqual(["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12"]);
  });

  it("spread-then-sort does not mutate original SKILLS array", () => {
    const originalOrder = SKILLS.map(s => s.id);
    [...SKILLS].sort((a, b) => a.teachingOrder - b.teachingOrder);
    const afterOrder = SKILLS.map(s => s.id);
    expect(afterOrder).toEqual(originalOrder);
  });
});

// ---------------------------------------------------------------------------
// Test 5: Recommendation engine unknown skill fallback
// ---------------------------------------------------------------------------
describe("Recommendation engine edge cases", () => {
  it("handles scenario with unknown skill ID without crashing", () => {
    const fakeScenarios = [
      { id: "test-1", skills: ["S1", "INVALID"], mode: "guided", area: "A1", title: "Test", situation: "Test" },
    ];
    const recs = getRecommendedScenarios([], [], fakeScenarios, 5);
    expect(recs).toBeDefined();
    expect(Array.isArray(recs)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Test 6: LandingPage smoke tests
// ---------------------------------------------------------------------------
describe("LandingPage", () => {
  it("renders hero heading", () => {
    render(<LandingPage onNavigate={() => {}} />);
    expect(screen.getByText("Learn to use AI")).toBeInTheDocument();
  });

  it("renders the demo toggle button", () => {
    render(<LandingPage onNavigate={() => {}} />);
    expect(screen.getByText(/Now see what happens/)).toBeInTheDocument();
  });

  it("reveals good example on button click", () => {
    render(<LandingPage onNavigate={() => {}} />);
    fireEvent.click(screen.getByText(/Now see what happens/));
    // After click, the AI honesty section should appear
    expect(screen.getByText(/AI is powerful/)).toBeInTheDocument();
  });

  it("renders focus area names on landing page", () => {
    render(<LandingPage onNavigate={() => {}} />);
    // Check the two focus areas are visible
    expect(screen.getByText("Effective Prompting")).toBeInTheDocument();
    expect(screen.getByText("Responsible & Safe AI Use")).toBeInTheDocument();
  });

  it("calls onNavigate when CTA button is clicked", () => {
    const onNavigate = vi.fn();
    render(<LandingPage onNavigate={onNavigate} />);
    fireEvent.click(screen.getByText("Start Learning"));
    expect(onNavigate).toHaveBeenCalledWith("scenarios");
  });
});
