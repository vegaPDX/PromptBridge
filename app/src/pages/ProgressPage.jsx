import React from "react";
import { Check, ArrowRight, Award, Shield } from "lucide-react";
import { MAXIMS } from "../data/maxims";
import { SCENARIOS } from "../data/scenarios";
import { PRINCIPLE_MAP } from "../data/principles";
import { resolveIcon } from "../data/icon-map";

export default function ProgressPage({ completedScenarios, practicedPrinciples, onNavigate }) {
  const totalScenarios = SCENARIOS.length;
  const completedCount = completedScenarios.length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-stone-800 mb-2">Your Progress</h1>
      <p className="text-stone-600 mb-8">
        {completedCount} of {totalScenarios} scenarios completed
      </p>

      {/* Progress bar */}
      <div className="bg-stone-200 rounded-full h-3 mb-8 overflow-hidden">
        <div
          className="bg-indigo-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${totalScenarios > 0 ? (completedCount / totalScenarios) * 100 : 0}%` }}
        />
      </div>

      {/* Maxims progress */}
      <h2 className="font-serif text-xl font-bold text-stone-800 mb-4">6 Core Principles</h2>
      <div className="space-y-4 mb-8">
        {MAXIMS.map((maxim, i) => {
          const Icon = resolveIcon(maxim.icon);
          const isSafety = maxim.id === "M5" || maxim.id === "M6";
          const maximScenarioIds = maxim.subMaxims.flatMap(sm => sm.scenarioIds);
          const maximCompleted = maximScenarioIds.filter(id => completedScenarios.includes(id)).length;
          const maximTotal = maximScenarioIds.length;
          const allDone = maximCompleted === maximTotal;

          return (
            <div
              key={maxim.id}
              className={`rounded-xl border p-4 transition-all ${
                allDone
                  ? "bg-emerald-50 border-emerald-200"
                  : isSafety
                    ? "bg-rose-50 border-rose-200"
                    : "bg-white border-stone-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  allDone ? "bg-emerald-100" : isSafety ? "bg-rose-100" : "bg-stone-100"
                }`}>
                  {allDone
                    ? <Check className="w-5 h-5 text-emerald-500" />
                    : Icon ? <Icon className={`w-5 h-5 ${isSafety ? "text-rose-500" : "text-stone-400"}`} /> : null
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-medium text-sm ${allDone ? "text-emerald-800" : "text-stone-700"}`}>
                      {i + 1}. {maxim.name}
                    </p>
                    {isSafety && !allDone && (
                      <span className="text-xs px-1.5 py-0.5 bg-rose-100 text-rose-600 rounded-full font-medium flex-shrink-0 inline-flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Safety
                      </span>
                    )}
                  </div>
                  <p className="text-stone-500 text-xs mt-0.5">{maximCompleted}/{maximTotal} scenarios</p>
                </div>
              </div>

              {/* Sub-maxim breakdown */}
              <div className="space-y-2 ml-13">
                {maxim.subMaxims.map(sm => {
                  const smCompleted = sm.scenarioIds.filter(id => completedScenarios.includes(id)).length;
                  const smDone = smCompleted === sm.scenarioIds.length;
                  // Check if any principle from this sub-maxim has been practiced
                  const principePracticed = sm.principleIds.some(pid => practicedPrinciples.includes(pid));
                  return (
                    <div key={sm.id} className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        smDone ? "bg-emerald-100" : "bg-stone-100"
                      }`}>
                        {smDone
                          ? <Check className="w-3 h-3 text-emerald-500" />
                          : <span className="w-2 h-2 rounded-full bg-stone-300" />
                        }
                      </div>
                      <span className={`text-sm ${smDone ? "text-emerald-700" : "text-stone-600"}`}>
                        {sm.name}
                      </span>
                      <span className="text-xs text-stone-400">
                        {smCompleted}/{sm.scenarioIds.length}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      {completedCount < totalScenarios && (
        <div className="text-center">
          <button
            onClick={() => onNavigate("scenarios")}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
          >
            Continue Practicing <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {completedCount === totalScenarios && (
        <div className="text-center bg-amber-50 border border-amber-200 rounded-xl p-6">
          <Award className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <p className="font-serif text-lg font-bold text-stone-800 mb-1">All scenarios completed!</p>
          <p className="text-stone-600 text-sm">
            You've practiced all 26 scenarios. Check out the full{" "}
            <a href="https://github.com/vegaPDX/PromptBridge" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">
              PromptBridge
            </a>{" "}
            for 76 scenarios and advanced practice modes.
          </p>
        </div>
      )}
    </div>
  );
}
