# PromptBridge — App Directory

This directory contains the PromptBridge web application built with React 19, Vite 8, and Tailwind CSS v4.

> For the full project overview, see the [root README](../README.md).

---

## Quick Start

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. All 35 scenarios work immediately with no API key required.

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

- **2 focus areas** with **12 skills** and **35 guided scenarios**
- Heavy emphasis on AI safety (13 of 35 scenarios cover verification, limitations, bias, and safety)
- Focused guided practice only
