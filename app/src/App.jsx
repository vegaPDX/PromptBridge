import { useState, useCallback, useEffect, useRef } from "react";
import { GUIDED_SCENARIOS } from "./data/scenarios";
import { loadProgress, saveProgress, loadUserContext, saveUserContext, hasSeenSafetyIntro, markSafetyIntroSeen, hasSeenPreScenarioBanner, markPreScenarioBannerSeen } from "./services/storage";
import Header from "./components/Header";
import AiSafetyBanner from "./components/AiSafetyBanner";
import LandingPage from "./pages/LandingPage";
import ScenarioSelector from "./pages/ScenarioSelector";
import GuidedMode from "./pages/GuidedMode";
import ProgressPage from "./pages/ProgressPage";
import HelpPage from "./pages/HelpPage";
import AiSafetyPage from "./pages/AiSafetyPage";

// ── Hash-based routing helpers ─────────────────────────────

function parseHash(hash) {
  const raw = (hash || "").replace(/^#\/?/, "");
  if (!raw || raw === "landing") return { page: "landing" };
  if (raw === "scenarios") return { page: "scenarios" };
  if (raw.startsWith("scenarios/")) {
    return { page: "scenarios", expandMaxim: raw.split("/")[1] || null };
  }
  if (raw.startsWith("guided/")) {
    const id = raw.slice(7);
    const scenario = GUIDED_SCENARIOS.find(s => s.id === id);
    if (scenario) return { page: "guided", scenario };
  }
  if (raw === "progress") return { page: "progress" };
  if (raw === "help") return { page: "help" };
  if (raw === "ai-safety") return { page: "ai-safety" };
  return { page: "landing" };
}

function buildHash(page, scenarioId, expandMaxim) {
  if (page === "guided" && scenarioId) return `#/guided/${scenarioId}`;
  if (page === "scenarios" && expandMaxim) return `#/scenarios/${expandMaxim}`;
  if (page === "scenarios") return "#/scenarios";
  if (page === "progress") return "#/progress";
  if (page === "help") return "#/help";
  if (page === "ai-safety") return "#/ai-safety";
  return "#/";
}

// ── App ────────────────────────────────────────────────────

export default function App() {
  // Resolve initial state from URL hash
  const initial = parseHash(window.location.hash);

  const [page, setPage] = useState(initial.page);
  const [selectedScenario, setSelectedScenario] = useState(initial.scenario || null);
  const [expandMaxim, setExpandMaxim] = useState(initial.expandMaxim || null);

  // Flag: true when we're restoring from popstate (skip pushState)
  const restoringRef = useRef(false);

  // Load progress once on mount
  const [initProgress] = useState(() => loadProgress());
  const [completedScenarios, setCompletedScenarios] = useState(initProgress.completedScenarios);
  const [practicedPrinciples, setPracticedPrinciples] = useState(initProgress.practicedPrinciples);

  // User context for personalization
  const [userContext, setUserContext] = useState(() => loadUserContext());
  const handleSetUserContext = (ctx) => { setUserContext(ctx); saveUserContext(ctx); };

  // Safety banner visibility
  const [showSafetyBanner, setShowSafetyBanner] = useState(() => !hasSeenSafetyIntro());
  const [showPreScenario, setShowPreScenario] = useState(() => !hasSeenPreScenarioBanner());

  const dismissSafetyBanner = () => { setShowSafetyBanner(false); markSafetyIntroSeen(); };
  const dismissPreScenario = () => { setShowPreScenario(false); markPreScenarioBannerSeen(); };

  // ── History sync ─────────────────────────────────────────

  // Push a new history entry (called on forward navigation)
  const pushHistory = useCallback((pg, scenarioId, exMaxim) => {
    if (restoringRef.current) return; // don't push during popstate restore
    const hash = buildHash(pg, scenarioId, exMaxim);
    const state = { page: pg, scenarioId: scenarioId || null, expandMaxim: exMaxim || null };
    history.pushState(state, "", hash);
  }, []);

  // Replace initial history entry so the first "back" works correctly
  useEffect(() => {
    const hash = buildHash(page, selectedScenario?.id, expandMaxim);
    const state = { page, scenarioId: selectedScenario?.id || null, expandMaxim: expandMaxim || null };
    history.replaceState(state, "", hash);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for back/forward
  useEffect(() => {
    const onPopState = (e) => {
      restoringRef.current = true;
      const navState = e.state || parseHash(window.location.hash);
      setPage(navState.page || "landing");
      setExpandMaxim(navState.expandMaxim || null);
      if (navState.scenarioId) {
        const sc = GUIDED_SCENARIOS.find(s => s.id === navState.scenarioId);
        setSelectedScenario(sc || null);
      } else {
        setSelectedScenario(null);
      }
      // Allow next navigation to push again
      requestAnimationFrame(() => { restoringRef.current = false; });
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, selectedScenario]);

  // ── Navigation handlers ──────────────────────────────────

  const markCompleted = useCallback((scenario, extraPrinciples) => {
    const newCompleted = [...new Set([...completedScenarios, scenario.id])];
    const allPrinciples = [...(scenario.principles || []), ...(extraPrinciples || [])];
    const newPracticed = [...new Set([...practicedPrinciples, ...allPrinciples])];
    setCompletedScenarios(newCompleted);
    setPracticedPrinciples(newPracticed);
    saveProgress({ completedScenarios: newCompleted, practicedPrinciples: newPracticed });
    return newCompleted;
  }, [completedScenarios, practicedPrinciples]);

  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario);
    setPage("guided");
    setExpandMaxim(null);
    pushHistory("guided", scenario.id, null);
  };

  const handleScenarioComplete = (scenario, extraPrinciples) => {
    const newCompleted = markCompleted(scenario, extraPrinciples);
    const currentIdx = GUIDED_SCENARIOS.findIndex(s => s.id === scenario.id);
    const next = GUIDED_SCENARIOS.find((s, i) => i > currentIdx && !newCompleted.includes(s.id));
    if (next) {
      setSelectedScenario(next);
      setPage("guided");
      pushHistory("guided", next.id, null);
    } else {
      setSelectedScenario(null);
      setPage("scenarios");
      pushHistory("scenarios", null, null);
    }
  };

  const navigate = (p, opts) => {
    const exMaxim = opts?.expandMaxim || null;
    setPage(p);
    setSelectedScenario(null);
    setExpandMaxim(exMaxim);
    pushHistory(p, null, exMaxim);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAF8" }}>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        onClick={(e) => { e.preventDefault(); document.getElementById("main-content")?.focus(); }}
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      {/* Header — all pages except landing */}
      {page !== "landing" && (
        <Header page={page} practicedPrinciples={practicedPrinciples} onNavigate={navigate} />
      )}

      {/* Pages */}
      <main id="main-content" tabIndex={-1} className="outline-none">
        {page === "landing" && (
          <>
            {showSafetyBanner && (
              <div className="max-w-4xl mx-auto pt-6">
                <AiSafetyBanner onDismiss={dismissSafetyBanner} />
              </div>
            )}
            <LandingPage onNavigate={navigate} />
          </>
        )}
        {page === "scenarios" && (
          <ScenarioSelector
            onSelectScenario={handleSelectScenario}
            completedScenarios={completedScenarios}
            practicedPrinciples={practicedPrinciples}
            userContext={userContext}
            onSetUserContext={handleSetUserContext}
            showPreScenarioBanner={showPreScenario}
            onDismissPreScenario={dismissPreScenario}
            initialExpandMaxim={expandMaxim}
          />
        )}
        {page === "guided" && selectedScenario && (
          <GuidedMode
            key={selectedScenario.id}
            scenario={selectedScenario}
            onComplete={handleScenarioComplete}
            onBack={() => navigate("scenarios")}
            practicedPrinciples={practicedPrinciples}
            completedScenarios={completedScenarios}
          />
        )}
        {page === "progress" && (
          <ProgressPage
            completedScenarios={completedScenarios}
            practicedPrinciples={practicedPrinciples}
            onNavigate={navigate}
          />
        )}
        {page === "help" && (
          <HelpPage onNavigate={navigate} />
        )}
        {page === "ai-safety" && (
          <AiSafetyPage onNavigate={navigate} />
        )}
      </main>

      {/* Footer — landing page only */}
      {page === "landing" && (
        <footer className="text-center py-8 px-4 border-t border-stone-200">
          <p className="text-stone-500 text-sm">
            PromptBridge Lite — Open source. A focused introduction to responsible AI communication.
          </p>
          <p className="text-stone-500 text-sm mt-1">
            Skills learned here work with any AI assistant.
          </p>
        </footer>
      )}
    </div>
  );
}
