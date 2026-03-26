import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import GuidedMode from "../pages/GuidedMode";
import { loadGuidedContent } from "../services/guided-data";

// ── Mocks ──────────────────────────────────────────────────

vi.mock("../services/guided-data", () => ({
  loadGuidedContent: vi.fn(),
}));

vi.mock("../services/recommendations", () => ({
  getRecommendedScenarios: vi.fn(() => []),
  buildRecommendation: vi.fn(() => null),
}));

// ── Test data ──────────────────────────────────────────────

const MOCK_SCENARIO = {
  id: "1.1-snow-shoveling",
  category: "vague_vs_specific",
  title: "The snow shoveling problem",
  situation: "It snowed heavily overnight.",
  mode: "guided",
  principles: ["P1", "P4"],
};

const MOCK_CONTENT = {
  scenarioId: "1.1-snow-shoveling",
  options: [
    { id: "a", text: "Do you know about snow?", quality: "weak" },
    { id: "b", text: "How to shovel snow?", quality: "medium" },
    { id: "c", text: "I need to clear 8 inches of snow from a 20-foot driveway before 7am. What is the most efficient technique?", quality: "strong" },
  ],
  responses: {
    response_weak: "Yes, I know about snow.",
    response_medium: "Push snow to the sides of your driveway.",
    response_strong: "## Battle Plan\n**Push, don't lift** when possible.",
  },
  feedback: {
    what_happened: "The weak prompt asks a yes/no question.",
    principle: "Provide context",
    principle_name: "When you give the AI your specific situation it can help more.",
    tip: "Include your specific constraints.",
  },
};

// ── Helpers ────────────────────────────────────────────────

const defaultProps = {
  scenario: MOCK_SCENARIO,
  onComplete: vi.fn(),
  onBack: vi.fn(),
  practicedPrinciples: [],
  completedScenarios: [],
};

function renderGuidedMode(overrides = {}) {
  return render(<GuidedMode {...defaultProps} {...overrides} />);
}

// ── Tests ──────────────────────────────────────────────────

describe("GuidedMode", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default: loadGuidedContent never resolves (stays in loading)
    loadGuidedContent.mockReturnValue(new Promise(() => {}));
  });

  // 1. Loading state
  it("shows loading spinner on mount", () => {
    renderGuidedMode();
    expect(screen.getByText("Loading scenario...")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  // 2. Error state with retry
  it("shows error banner when loadGuidedContent rejects", async () => {
    loadGuidedContent.mockRejectedValueOnce(new Error("Network failure"));

    renderGuidedMode();

    await waitFor(() => {
      expect(screen.getByText("Network failure")).toBeInTheDocument();
    });
    expect(screen.getByText("Retry")).toBeInTheDocument();
  });

  it("retries loading when Retry button is clicked", async () => {
    loadGuidedContent.mockRejectedValueOnce(new Error("Network failure"));
    loadGuidedContent.mockResolvedValueOnce(MOCK_CONTENT);

    renderGuidedMode();

    await waitFor(() => {
      expect(screen.getByText("Retry")).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Retry"));
    });

    await waitFor(() => {
      expect(screen.getByText("Weak")).toBeInTheDocument();
    });

    expect(loadGuidedContent).toHaveBeenCalledTimes(2);
  });

  // 3. Explore step — tier headers
  it("shows three tier headers after content loads", async () => {
    loadGuidedContent.mockResolvedValueOnce(MOCK_CONTENT);

    renderGuidedMode();

    await waitFor(() => {
      expect(screen.getByText("Weak")).toBeInTheDocument();
    });
    expect(screen.getByText("Getting There")).toBeInTheDocument();
    expect(screen.getByText("Effective")).toBeInTheDocument();
  });

  // 4. Tier expansion — clicking shows prompt and response
  it("expands tier to show prompt and response when clicked", async () => {
    loadGuidedContent.mockResolvedValueOnce(MOCK_CONTENT);

    renderGuidedMode();

    await waitFor(() => {
      expect(screen.getByText("Weak")).toBeInTheDocument();
    });

    // Tier should be collapsed initially — prompt text not visible
    expect(screen.queryByText(/Do you know about snow/)).not.toBeInTheDocument();

    // Click the Weak tier header
    fireEvent.click(screen.getByText("Weak"));

    // Now the prompt and response should be visible
    expect(screen.getByText(/Do you know about snow/)).toBeInTheDocument();
    expect(screen.getByText("Yes, I know about snow.")).toBeInTheDocument();
  });

  it("collapses tier when clicked again", async () => {
    loadGuidedContent.mockResolvedValueOnce(MOCK_CONTENT);

    renderGuidedMode();

    await waitFor(() => {
      expect(screen.getByText("Weak")).toBeInTheDocument();
    });

    // Expand
    fireEvent.click(screen.getByText("Weak"));
    expect(screen.getByText(/Do you know about snow/)).toBeInTheDocument();

    // Collapse
    fireEvent.click(screen.getByText("Weak"));
    expect(screen.queryByText(/Do you know about snow/)).not.toBeInTheDocument();
  });

  // 5. Write-own step — clicking "Now Write Your Own" shows textarea
  it("shows textarea after clicking 'Now Write Your Own'", async () => {
    loadGuidedContent.mockResolvedValueOnce(MOCK_CONTENT);

    renderGuidedMode();

    await waitFor(() => {
      expect(screen.getByText("Now Write Your Own")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Now Write Your Own"));

    expect(screen.getByLabelText("Write your prompt")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type your request here...")).toBeInTheDocument();
  });

  // 6. Textarea maxLength
  it("textarea has maxLength of 4000", async () => {
    loadGuidedContent.mockResolvedValueOnce(MOCK_CONTENT);

    renderGuidedMode();

    await waitFor(() => {
      expect(screen.getByText("Now Write Your Own")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Now Write Your Own"));

    const textarea = screen.getByLabelText("Write your prompt");
    expect(textarea).toHaveAttribute("maxLength", "4000");
  });

  // 7. Check My Skills disabled when textarea empty
  it("disables 'Check My Skills' when textarea is empty", async () => {
    loadGuidedContent.mockResolvedValueOnce(MOCK_CONTENT);

    renderGuidedMode();

    await waitFor(() => {
      expect(screen.getByText("Now Write Your Own")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Now Write Your Own"));

    const checkButton = screen.getByText("Check My Skills").closest("button");
    expect(checkButton).toBeDisabled();
  });

  it("enables 'Check My Skills' when textarea has text", async () => {
    loadGuidedContent.mockResolvedValueOnce(MOCK_CONTENT);

    renderGuidedMode();

    await waitFor(() => {
      expect(screen.getByText("Now Write Your Own")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Now Write Your Own"));

    const textarea = screen.getByLabelText("Write your prompt");
    fireEvent.change(textarea, { target: { value: "Help me shovel snow" } });

    const checkButton = screen.getByText("Check My Skills").closest("button");
    expect(checkButton).not.toBeDisabled();
  });

  // 8. Back button calls onBack
  it("calls onBack when 'Back to scenarios' is clicked", async () => {
    loadGuidedContent.mockResolvedValueOnce(MOCK_CONTENT);
    const onBack = vi.fn();

    renderGuidedMode({ onBack });

    await waitFor(() => {
      expect(screen.getByText("Back to scenarios")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Back to scenarios"));

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  // 9. Next Scenario button calls onComplete with scenario
  it("calls onComplete with scenario when 'Next Scenario' is clicked", async () => {
    loadGuidedContent.mockResolvedValueOnce(MOCK_CONTENT);
    const onComplete = vi.fn();

    renderGuidedMode({ onComplete });

    await waitFor(() => {
      expect(screen.getByText("Next Scenario")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Next Scenario"));

    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith(MOCK_SCENARIO);
  });

  // ── Additional edge-case coverage ────────────────────────

  it("renders scenario title and situation", async () => {
    loadGuidedContent.mockResolvedValueOnce(MOCK_CONTENT);

    renderGuidedMode();

    expect(screen.getByText("The snow shoveling problem")).toBeInTheDocument();
    expect(screen.getByText("It snowed heavily overnight.")).toBeInTheDocument();
  });

  it("shows feedback panel in explore step", async () => {
    loadGuidedContent.mockResolvedValueOnce(MOCK_CONTENT);

    renderGuidedMode();

    await waitFor(() => {
      expect(screen.getByText("What happened here")).toBeInTheDocument();
    });

    expect(screen.getByText("The weak prompt asks a yes/no question.")).toBeInTheDocument();
    expect(screen.getByText("Include your specific constraints.")).toBeInTheDocument();
  });

  it("passes scenario.id to loadGuidedContent", () => {
    renderGuidedMode();

    expect(loadGuidedContent).toHaveBeenCalledWith("1.1-snow-shoveling");
  });
});
