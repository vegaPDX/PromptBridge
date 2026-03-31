# PromptBridge — App Directory

This directory contains the PromptBridge web application built with React 19, Vite 8, and Tailwind CSS v4.

> For the full project overview, see the [root README](../README.md).

---

## Quick Start

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. All 26 scenarios work immediately with no API key required.

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

## Architecture

The app is a **fully static SPA** with zero backend dependencies:

- **No network requests** — CSP enforces `connect-src 'none'`
- **No API keys** in the deployed app
- **Pre-generated content** — All guided scenario data ships as static JSON
- **Client-side scoring** — Regex-based heuristic scorer, no LLM needed
- **Hash-based routing** — Browser back/forward navigation via History API
- **localStorage** — Progress and banner state persist locally
- **GitHub Pages** — Deployed as static files on push to `main`

---

## Structure

- **6 maxims** with **13 sub-maxims** and **26 guided scenarios**
- Heavy emphasis on AI safety (Maxim 6 gets 3 sub-maxims, 10 of 26 scenarios cover safety)
- Simplified from the full [PromptBridge](https://github.com/vegaPDX/PromptBridge) (76 scenarios)
- No freeform or assessment modes — focused guided practice only
