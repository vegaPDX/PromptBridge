# PromptBridge — Architecture Document

## Overview

PromptBridge is a fully static web application deployed on GitHub Pages. The public app makes **no outbound network requests** and requires **no API keys**. All content is pre-generated at build time by a local Node.js script.

Users learn AI communication skills through interactive scenarios, then copy their prompts to real AI tools (ChatGPT, Claude, Gemini, Copilot) to practice.

---

## Architecture

```
┌─────────────────────────────────────────────┐
│              GitHub Pages (static)           │
│                                              │
│  React 19 + Vite 8 + Tailwind CSS v4        │
│                                              │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐  │
│  │  Guided   │  │  Write   │  │ Assessment│  │
│  │  Mode     │  │ Your Own │  │   Mode    │  │
│  └─────┬────┘  └────┬─────┘  └─────┬─────┘  │
│        │            │              │         │
│  ┌─────▼────┐  ┌────▼─────┐  ┌────▼──────┐  │
│  │ Static   │  │Heuristic │  │ Heuristic │  │
│  │ JSON     │  │ Scorer   │  │  Scorer   │  │
│  │(35 files)│  │(regex)   │  │  (regex)  │  │
│  └──────────┘  └──────────┘  └───────────┘  │
│                                              │
│  localStorage: progress, assessment          │
└─────────────────────────────────────────────┘
         ↑ no outbound requests
         │
    User copies prompt → pastes into real AI tool
```

### Key design decisions

1. **No API keys in the public app.** API-powered features (Write First, Multi-Turn, AI analysis) were removed from the deployed app. They are available only when running the repo locally. This eliminates an entire class of security concerns (key leakage, error message exposure, CORS, prompt injection via LLM responses).

2. **Pre-generated content for Guided Mode.** The 35 guided scenarios ship with static JSON files containing weak/medium/strong prompt options, simulated AI responses, and feedback. Generated once by a local Node.js script (`scripts/generate-content.js`).

3. **Client-side heuristic scorer for Write Your Own.** A regex-based scorer detects which of the 12 skills are present in a user's prompt. No API call needed — instant feedback.

4. **Copy-to-real-AI workflow.** Every scenario includes copy buttons and direct links to ChatGPT, Claude, Gemini, and Copilot. Users practice the skill in PromptBridge, then apply it in a real AI tool.

---

## Tech stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | React 19 | Component-based UI |
| Build tool | Vite 8 | Dev server and production bundling |
| Styling | Tailwind CSS v4 | Utility-first CSS |
| Icons | lucide-react | SVG icon library |
| Utilities | lodash-es (groupBy) | Scenario grouping in selector |
| Storage | localStorage | Progress and assessment persistence |
| Deployment | GitHub Pages | Static file hosting via GitHub Actions |
| Content generation | Node.js script | One-time static JSON generation |

---

## Project structure

```
promptbridge/
├── README.md
├── LICENSE                         # AGPL-3.0
├── docs/                           # Project documentation
│
├── .github/
│   ├── workflows/deploy.yml        # GitHub Pages auto-deploy
│   └── CODEOWNERS                  # PR review requirements
│
└── app/                            # Vite + React standalone app
    ├── package.json
    ├── vite.config.js
    ├── index.html                  # CSP meta tag, Open Graph tags
    ├── scripts/
    │   ├── generate-content.js     # Static content generation (local dev only)
    │   └── validate-scenario.js    # Scenario format validation
    └── src/
        ├── App.jsx                 # Main app — state management and routing
        ├── main.jsx                # Entry point with frame-buster
        ├── index.css               # Tailwind CSS + animations
        │
        ├── data/
        │   ├── scenarios.js        # 35 guided scenario definitions
        │   ├── skills.js           # 12 skills (S1–S12)
        │   ├── skill-areas.js      # 2 focus areas with skill groups
        │   ├── categories.js       # 2 focus area categories (A1, A2)
        │   ├── principles.js       # Legacy — kept for reference
        │   ├── maxims.js           # Legacy — kept for reference
        │   ├── prompts.js          # LLM prompt templates (used by generate-content.js)
        │   ├── assessment-scenarios.js
        │   ├── demo.js             # Landing page demo data
        │   ├── icon-map.js         # Skill → icon mapping
        │   └── generated/          # 35 pre-generated JSON files
        │
        ├── pages/                  # 8 page components
        │   ├── LandingPage.jsx     # Home page with snow shoveling demo
        │   ├── ScenarioSelector.jsx # Scenario browser (Guided + Write Your Own tabs)
        │   ├── GuidedMode.jsx      # Guided practice with pre-generated content
        │   ├── FreeformMode.jsx    # Write-your-own with heuristic scoring
        │   ├── AssessmentMode.jsx  # Pre/post skill assessment
        │   ├── ProgressPage.jsx    # Progress tracking dashboard
        │   ├── HelpPage.jsx        # Help and getting started
        │   └── AiSafetyPage.jsx    # "Using AI Wisely" standalone guide
        │
        ├── services/
        │   ├── heuristic-scorer.js # Client-side regex prompt scoring
        │   ├── guided-data.js      # Lazy JSON loader for guided scenarios
        │   ├── recommendations.js  # Next-scenario recommendation engine
        │   └── storage.js          # localStorage wrappers for progress
        │
        └── components/             # 9 shared UI components
            ├── Header.jsx
            ├── CopyButton.jsx
            ├── AiToolLinks.jsx     # Copy button + links to AI tools
            ├── MarkdownText.jsx    # Safe HTML rendering with escapeHtml
            ├── PrincipleBadge.jsx
            ├── ErrorBanner.jsx
            ├── LoadingSpinner.jsx
            ├── AiSafetyBanner.jsx  # First-visit welcome card with AI facts
            └── PreScenarioBanner.jsx # Pre-scenario reminder banner
```

---

## Content generation pipeline

The 35 guided scenario JSON files are generated by `scripts/generate-content.js`, which runs locally on a developer's machine:

```
Developer runs script → LLM API (Claude or Gemini) → JSON files → committed to repo
```

Each JSON file contains:
- **options** — 3 prompt options (weak, medium, strong)
- **responses** — Simulated AI responses for weak and strong prompts, plus a medium response
- **feedback** — What happened, the skill, and a tip

The script supports Gemini (free tier) and Claude (paid), controlled by `--provider` flag. Generated files are committed to the repo and ship with the app — the public app never calls an LLM.

---

## Security model

The app is designed as a zero-trust static site:

- **No `connect-src`** in CSP — no outbound network requests permitted
- **No secrets** — no API keys, no tokens, nothing sensitive in localStorage or the bundle
- **HTML escaping** — `MarkdownText` component uses `escapeHtml()` before `dangerouslySetInnerHTML`
- **Frame-buster** — JavaScript check in `main.jsx` prevents loading in iframes (clickjacking)
- **CSP directives** — `script-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`
- **Input length limits** — All textareas capped at 4,000 characters

See the [Security section in the README](../README.md#security) for full details.

---

## Data flow

### Guided Mode
```
User selects scenario
  → loadGuidedContent() lazy-loads JSON via import.meta.glob
  → User explores weak/medium/strong tiers in accordion
  → User writes own prompt → heuristic scorer → instant feedback
  → User copies prompt → pastes into real AI tool
```

### Write Your Own (Freeform) Mode
```
User selects scenario
  → User writes prompt in textarea
  → "Check My Skills" → scorePrompt() runs regex patterns → shows detected/missing skills
  → User copies prompt → pastes into real AI tool
```

### Assessment Mode
```
User sees 3 scenarios (pre or post)
  → Writes a prompt for each
  → scorePrompt() scores all three
  → Aggregate score + per-scenario breakdown displayed
  → Pre/post comparison if both taken
```

---

## Development history

PromptBridge was originally prototyped as a single-file Claude.ai artifact, then extracted into a standalone Vite+React app. The app initially supported direct browser-to-API calls with user-provided API keys (Gemini, Claude, OpenAI). A security review identified that handling API keys in a public web app created unnecessary risk for the beginner target audience. The architecture was pivoted to fully static — all API-powered features removed from the public app, available only when running locally.
