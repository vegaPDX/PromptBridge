import React, { useState } from "react";
import { Check, Sparkles, X, ChevronDown, Shield } from "lucide-react";
import PreScenarioBanner from "../components/PreScenarioBanner";
import { GUIDED_SCENARIOS } from "../data/scenarios";
import { MAXIMS } from "../data/maxims";
import { CATEGORIES } from "../data/categories";
import { PRINCIPLE_MAP } from "../data/principles";
import { resolveIcon } from "../data/icon-map";
import { getRecommendedScenarios } from "../services/recommendations";

const CONTEXT_PILLS = [
  { label: "Work emails & docs", tags: ["work"] },
  { label: "School & learning", tags: ["school"] },
  { label: "Personal projects", tags: ["personal"] },
  { label: "A bit of everything", tags: ["work", "coding", "school", "personal", "other"] },
];

function getMatchingTags(userContext) {
  const pill = CONTEXT_PILLS.find(p => p.label === userContext);
  return pill ? pill.tags : [];
}

export default function ScenarioSelector({ onSelectScenario, completedScenarios, practicedPrinciples = [], userContext, onSetUserContext, showPreScenarioBanner, onDismissPreScenario, initialExpandMaxim }) {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [expandedMaxims, setExpandedMaxims] = useState(() =>
    initialExpandMaxim ? new Set([initialExpandMaxim]) : new Set()
  );

  const toggleMaxim = (maximId) => {
    setExpandedMaxims(prev => {
      const next = new Set(prev);
      if (next.has(maximId)) next.delete(maximId);
      else next.add(maximId);
      return next;
    });
  };

  const recommendedIds = new Set(
    getRecommendedScenarios(practicedPrinciples, completedScenarios, GUIDED_SCENARIOS, 3)
      .map(r => r.scenario.id)
  );

  const totalCompleted = completedScenarios.length;
  const totalScenarios = GUIDED_SCENARIOS.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-stone-800 mb-2">Choose a Scenario</h1>
      <p className="text-stone-600 mb-1">
        26 focused practice scenarios organized by 6 core principles.
      </p>
      <p className="text-stone-500 text-sm mb-6">
        {totalCompleted} of {totalScenarios} completed
      </p>

      {showPreScenarioBanner && <PreScenarioBanner onDismiss={onDismissPreScenario} />}

      {/* Onboarding banner */}
      {!userContext && !bannerDismissed && (
        <div className="relative bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-6">
          <button
            onClick={() => setBannerDismissed(true)}
            className="absolute top-2 right-2 p-1 text-stone-400 hover:text-stone-600 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="font-semibold text-stone-700 mb-3">What do you use AI for?</p>
          <div className="flex flex-wrap gap-2">
            {CONTEXT_PILLS.map(pill => (
              <button
                key={pill.label}
                onClick={() => onSetUserContext(pill.label)}
                className="px-4 py-2 bg-white border border-indigo-200 rounded-full text-sm font-medium text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 transition-colors"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Maxim accordion */}
      {MAXIMS.map((maxim) => {
        const cat = CATEGORIES[maxim.id];
        if (!cat) return null;
        const CatIcon = resolveIcon(cat.icon);
        const isExpanded = expandedMaxims.has(maxim.id);
        const isSafety = maxim.id === "M5" || maxim.id === "M6";

        // Count completed scenarios in this maxim
        const maximScenarioIds = maxim.subMaxims.flatMap(sm => sm.scenarioIds);
        const completedCount = maximScenarioIds.filter(id => completedScenarios.includes(id)).length;

        return (
          <section key={maxim.id} aria-labelledby={`maxim-${maxim.id}`} className="mb-4">
            <button
              onClick={() => toggleMaxim(maxim.id)}
              aria-expanded={isExpanded}
              className={`w-full text-left rounded-xl border p-4 hover:border-indigo-200 transition-all ${
                isSafety
                  ? "bg-rose-50 border-rose-200 hover:border-rose-300"
                  : "bg-white border-stone-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {isSafety && <Shield className="w-4 h-4 text-rose-500" />}
                  {CatIcon && !isSafety && <CatIcon className="w-5 h-5 text-stone-400" />}
                  <h2 id={`maxim-${maxim.id}`} className="font-serif text-lg font-semibold text-stone-700">
                    {maxim.name}
                  </h2>
                  <span className="text-xs px-2 py-0.5 bg-stone-100 text-stone-500 rounded-full font-medium">
                    {completedCount}/{maximScenarioIds.length}
                  </span>
                  {isSafety && (
                    <span className="text-xs px-2 py-0.5 bg-rose-100 text-rose-600 rounded-full font-medium">
                      Safety
                    </span>
                  )}
                </div>
                <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
              </div>
              <p className="text-stone-600 text-sm mt-2">{cat.description}</p>
            </button>

            {isExpanded && (
              <div className="mt-3 ml-2 space-y-4 animate-fadeIn">
                {maxim.subMaxims.map(subMaxim => {
                  const subScenarios = GUIDED_SCENARIOS.filter(s => subMaxim.scenarioIds.includes(s.id));
                  return (
                    <div key={subMaxim.id}>
                      <h3 className="text-sm font-semibold text-stone-600 mb-2 pl-2">
                        {subMaxim.name}
                        <span className="font-normal text-stone-400 ml-2">— {subMaxim.description}</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {subScenarios.map(scenario => {
                          const isCompleted = completedScenarios.includes(scenario.id);
                          const isRecommended = recommendedIds.has(scenario.id);
                          return (
                            <button
                              key={scenario.id}
                              onClick={() => onSelectScenario(scenario)}
                              className={`text-left bg-white rounded-xl border p-4 hover:border-indigo-300 hover:shadow-md transition-all group ${
                                isRecommended && !isCompleted ? "border-indigo-200" : "border-stone-200"
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <h4 className="font-semibold text-stone-800 group-hover:text-indigo-700 transition-colors text-sm">
                                    {scenario.title}
                                  </h4>
                                  {isRecommended && !isCompleted && (
                                    <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full font-medium flex-shrink-0 inline-flex items-center gap-1">
                                      <Sparkles className="w-3 h-3" /> Next
                                    </span>
                                  )}
                                </div>
                                {isCompleted && (
                                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-3 h-3 text-emerald-500" />
                                  </div>
                                )}
                              </div>
                              <p className="text-stone-600 text-sm mb-3 line-clamp-2">{scenario.situation}</p>
                              <div className="flex flex-wrap gap-1">
                                {scenario.principles.map(pid => (
                                  <span key={pid} className="text-xs px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded font-medium">
                                    {PRINCIPLE_MAP[pid]?.name}
                                  </span>
                                ))}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
