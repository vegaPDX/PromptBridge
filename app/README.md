# PromptBridge — App Directory

This directory contains the PromptBridge web application built with React 19, Vite 8, and Tailwind CSS v4.

> For the full project overview, features, research foundation, and security documentation, see the [root README](../README.md).

---

## Quick Start

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. All 76 scenarios work immediately with no API key required.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run test` | Run all tests once (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint with ESLint |
| `npm run generate` | Regenerate guided scenario JSON (requires API key) |

---

## Project Structure

```
app/
├── index.html                    # HTML entry point with CSP, OG tags, noscript fallback
├── package.json                  # Dependencies and scripts
├── vite.config.js                # Vite build config (React + Tailwind, base path for GitHub Pages)
├── vitest.config.js              # Test config (jsdom environment)
├── eslint.config.js              # ESLint rules
├── .env.example                  # Template for content generation API keys
├── scripts/
│   ├── generate-content.js       # Static content generation pipeline (Claude or Gemini)
│   └── validate-scenario.js      # Scenario data validation
└── src/
    ├── App.jsx                   # Root component — state management and page routing
    ├── main.jsx                  # Entry point with clickjacking frame-buster
    ├── index.css                 # Tailwind CSS imports + animations
    ├── pages/                    # 8 page components
    │   ├── LandingPage.jsx       # Home page with interactive demo
    │   ├── ScenarioSelector.jsx  # Collapsible category browser with tabs
    │   ├── GuidedMode.jsx        # Guided practice (compare weak/medium/strong prompts)
    │   ├── FreeformMode.jsx      # Write-your-own with heuristic scoring
    │   ├── AssessmentMode.jsx    # Pre/post skill assessment (3 scenarios each)
    │   ├── ProgressPage.jsx      # Progress tracking dashboard
    │   ├── HelpPage.jsx          # Help and getting started guide
    │   └── AiSafetyPage.jsx      # "Using AI Wisely" — 9 AI limitations explained
    ├── components/               # 9 reusable UI components
    │   ├── Header.jsx            # Navigation bar with progress badge
    │   ├── MarkdownText.jsx      # Lightweight bold/italic renderer (HTML-escaped)
    │   ├── CopyButton.jsx        # Copy-to-clipboard with fallback
    │   ├── AiToolLinks.jsx       # Copy prompt + links to ChatGPT, Claude, Gemini, Copilot
    │   ├── AiSafetyBanner.jsx    # First-visit welcome banner with 3 AI facts
    │   ├── PreScenarioBanner.jsx # Dismissible AI accuracy reminder
    │   ├── PrincipleBadge.jsx    # Inline principle name badge
    │   ├── ErrorBanner.jsx       # Error display with retry button
    │   └── LoadingSpinner.jsx    # Centered loading animation
    ├── services/                 # Business logic (no network calls)
    │   ├── heuristic-scorer.js   # Regex-based prompt quality scorer (all 12 principles)
    │   ├── recommendations.js    # Next-scenario recommendations by teaching order
    │   ├── guided-data.js        # Lazy-loads pre-generated JSON via import.meta.glob
    │   └── storage.js            # localStorage wrappers with error handling
    ├── data/                     # Static data definitions
    │   ├── scenarios.js          # 76 scenarios (61 guided + 15 freeform)
    │   ├── principles.js         # 12 communication principles with teaching order
    │   ├── categories.js         # 5 category definitions
    │   ├── assessment-scenarios.js # Pre/post assessment scenario IDs
    │   ├── demo.js               # Landing page demo prompts and responses
    │   ├── icon-map.js           # Lucide icon name resolver
    │   ├── prompts.js            # LLM prompt templates (used only by generate-content.js)
    │   └── generated/            # 61 pre-generated JSON files (one per guided scenario)
    └── __tests__/                # 9 test files, 184+ tests
        ├── setup.js              # Testing Library setup
        ├── data-integrity.test.js
        ├── heuristic-scorer.test.js
        ├── recommendations.test.js
        ├── storage.test.js
        ├── components.test.jsx
        ├── coverage-gaps.test.jsx
        ├── markdown-text.test.jsx
        ├── guided-mode.test.jsx
        └── assessment-mode.test.jsx
```

---

## Architecture

The app is a **fully static SPA** with zero backend dependencies:

- **No network requests** — CSP enforces `connect-src 'none'`
- **No API keys** in the deployed app
- **Pre-generated content** — All guided scenario data ships as static JSON
- **Client-side scoring** — Regex-based heuristic scorer, no LLM needed
- **localStorage** — Progress, assessments, and banner state persist locally
- **GitHub Pages** — Deployed as static files on push to `main`

See [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md) for the full architecture document.

---

## Testing

```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch

# Run a specific test file
npx vitest run src/__tests__/markdown-text.test.jsx
```

Tests cover data integrity, heuristic scoring (all 12 principles), recommendation engine, localStorage persistence, component rendering, and XSS prevention for the `MarkdownText` component.

---

## Content Generation

Guided scenario content (prompt options, simulated AI responses, feedback) is generated offline and committed as JSON files. This keeps the public app fully static.

```bash
# Requires an API key (Gemini is free)
GEMINI_API_KEY=your-key npm run generate -- --provider gemini

# Single scenario
GEMINI_API_KEY=your-key npm run generate -- --provider gemini --scenario 1.1-snow-shoveling

# Feedback text only (preserves options and responses)
ANTHROPIC_API_KEY=your-key npm run generate -- --feedback-only
```

See [docs/PROMPT_TEMPLATES.md](../docs/PROMPT_TEMPLATES.md) for the LLM prompt templates used.

---

## Security

- **CSP** — Strict Content Security Policy via `<meta>` tag (script-src, connect-src, object-src, base-uri, form-action, font-src, worker-src, manifest-src)
- **XSS** — HTML escaping before `dangerouslySetInnerHTML` in `MarkdownText.jsx`; all other rendering uses React's safe text nodes
- **Clickjacking** — Frame-buster in `main.jsx` (compensates for CSP `frame-ancestors` not working in meta tags)
- **Input limits** — All textareas capped at 4,000 characters
- **No secrets** — `.env` is gitignored; `.env.example` warns against `VITE_` prefix

See the [root README security section](../README.md#security) for the full security posture.
