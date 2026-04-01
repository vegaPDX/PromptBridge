import React, { useState } from "react";
import {
  ChevronRight, Check, X, Lightbulb, ExternalLink, HelpCircle, AlertTriangle, Shield,
} from "lucide-react";
import { SKILL_AREAS } from "../data/skill-areas";
import {
  DEMO_BAD_PROMPT, DEMO_BAD_RESPONSE,
  DEMO_GOOD_PROMPT, DEMO_GOOD_RESPONSE,
} from "../data/demo";
import { resolveIcon } from "../data/icon-map";
import MarkdownText from "../components/MarkdownText";

export default function LandingPage({ onNavigate }) {
  const [showGood, setShowGood] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Top nav — upper right */}
      <div className="flex justify-end gap-1 px-4 pt-4">
        <button
          onClick={() => onNavigate("ai-safety")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-stone-500 hover:text-amber-600 hover:bg-stone-100 rounded-lg transition-colors"
        >
          <AlertTriangle className="w-4 h-4" />
          AI Safety
        </button>
        <button
          onClick={() => onNavigate("help")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-stone-500 hover:text-indigo-600 hover:bg-stone-100 rounded-lg transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          Help
        </button>
      </div>

      {/* Hero */}
      <div className="text-center pt-4 pb-10 px-4">
        <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-full px-4 py-1.5 mb-4">
          <Shield className="w-4 h-4 text-rose-500" />
          <span className="text-sm font-medium text-rose-700">Safety-first AI learning</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-800 mb-4">
          Learn to use AI
          <span className="text-indigo-500"> effectively and responsibly</span>
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          {SKILL_AREAS.reduce((n, a) => n + a.skills.flatMap(sg => sg.scenarioIds).length, 0)} focused practice scenarios. 12 skills. Everything a beginner needs
          to use AI effectively <em>and</em> safely.
        </p>
      </div>

      {/* Snow Shoveling Demo */}
      <div className="px-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="bg-stone-50 px-6 py-3 border-b border-stone-200">
            <p className="text-xs text-stone-600 font-medium uppercase tracking-wide">
              Same question, two different ways
            </p>
          </div>

          <div className="p-6">
            {/* Bad example -- always visible */}
            <div className="mb-6">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 text-rose-500" />
                </div>
                <div>
                  <p className="text-stone-800 font-medium italic">"{DEMO_BAD_PROMPT}"</p>
                </div>
              </div>
              <div className="ml-9 bg-rose-50 border border-rose-100 rounded-lg px-4 py-3">
                <p className="text-stone-700 text-sm leading-relaxed">
                  <span className="text-rose-500 text-xs font-medium mr-2">AI:</span>
                  {DEMO_BAD_RESPONSE}
                </p>
              </div>
            </div>

            {/* Reveal button */}
            {!showGood && (
              <button
                onClick={() => setShowGood(true)}
                className="w-full py-3 border-2 border-dashed border-stone-300 rounded-xl text-stone-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors text-sm font-medium"
              >
                Now see what happens with a better request &rarr;
              </button>
            )}

            {/* Good example -- revealed */}
            {showGood && (
              <div className="animate-fadeIn">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-stone-800 font-medium italic">"{DEMO_GOOD_PROMPT}"</p>
                  </div>
                </div>
                <div className="ml-9 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3">
                  <div className="text-stone-700 text-sm leading-relaxed">
                    <span className="text-emerald-600 text-xs font-medium mr-2">AI:</span>
                    <MarkdownText text={DEMO_GOOD_RESPONSE} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Insight callout */}
      {showGood && (
        <div className="px-4 mb-8 animate-fadeIn">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
            <Lightbulb className="w-5 h-5 text-amber-500 mx-auto mb-2" aria-hidden="true" />
            <p className="text-stone-700 text-base max-w-xl mx-auto">
              <strong>Same topic. Wildly different results.</strong> The first question gets a one-word answer. The second tells AI exactly what you need — and it actually delivers.
            </p>
          </div>
        </div>
      )}

      {/* AI honesty section — safety emphasis */}
      {showGood && (
        <div className="px-4 mb-8 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-rose-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-rose-500" />
              <h2 className="font-serif text-xl font-bold text-stone-800">
                AI is powerful — but not perfect
              </h2>
            </div>
            <p className="text-stone-600 text-sm mb-4">
              This app teaches you both how to get great results <em>and</em> how to protect yourself.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <p className="text-stone-700 text-sm leading-relaxed pt-0.5">
                  <strong>AI makes things up.</strong> It can generate statistics, citations, and URLs that don't exist — and it sounds equally confident whether it's right or wrong.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                </div>
                <p className="text-stone-700 text-sm leading-relaxed pt-0.5">
                  <strong>AI tells you what you want to hear.</strong> It's trained to agree with you — even when you're wrong.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5 text-purple-500" />
                </div>
                <p className="text-stone-700 text-sm leading-relaxed pt-0.5">
                  <strong>AI can reflect biases.</strong> Its output may encode stereotypes about gender, race, age, or background — often invisibly.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <p className="text-stone-700 text-sm leading-relaxed pt-0.5">
                  <strong>You'll practice handling all of this.</strong> Our scenarios cover both effective prompting and AI safety.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate("ai-safety")}
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-rose-600 hover:text-rose-700 font-medium transition-colors"
            >
              Learn more about AI safety <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center px-4 pb-12">
        <button
          onClick={() => onNavigate("scenarios")}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-sm transition-colors text-lg"
        >
          Start Learning <ChevronRight className="w-5 h-5" />
        </button>
        <p className="text-stone-600 text-sm mt-3">
          {SKILL_AREAS.reduce((n, a) => n + a.skills.flatMap(sg => sg.scenarioIds).length, 0)} scenarios — works with any AI tool — no signup required
        </p>
      </div>

      {/* 2 Focus Areas */}
      <div className="px-4 pb-12">
        <h2 className="font-serif text-2xl font-bold text-stone-800 text-center mb-2">
          12 skills for responsible AI use
        </h2>
        <p className="text-stone-600 text-center text-sm mb-6 max-w-xl mx-auto">
          Two focus areas: master effective prompting, then learn to use AI safely and responsibly.
        </p>
        <div className="space-y-4">
          {SKILL_AREAS.map((area, i) => {
            const Icon = resolveIcon(area.icon);
            const isSafety = area.id === "A2";
            const styles = isSafety
              ? { card: "bg-rose-50 border-rose-200", iconBg: "bg-rose-100", iconText: "text-rose-500", sub: "text-rose-400", skillText: "text-rose-600", skillBg: "bg-rose-50 border-rose-200" }
              : { card: "bg-white border-stone-200", iconBg: "bg-indigo-50", iconText: "text-indigo-500", sub: "text-indigo-400", skillText: "text-indigo-600", skillBg: "bg-indigo-50 border-indigo-200" };
            return (
              <div
                key={area.id}
                className={`rounded-xl border p-5 ${styles.card}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${styles.iconBg}`}>
                    {Icon && <Icon className={`w-4 h-4 ${styles.iconText}`} />}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-stone-800">
                      <span className="text-stone-400 mr-1.5">{i + 1}.</span>
                      {area.name}
                    </p>
                    <p className="text-stone-600 text-sm mt-0.5 leading-snug">{area.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 ml-11">
                  {area.skills.map(sg => (
                    <button
                      key={sg.id}
                      onClick={() => onNavigate("scenarios", { expandMaxim: area.id })}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium border transition-colors hover:opacity-80 ${styles.skillBg} ${styles.skillText}`}
                    >
                      {sg.name}
                    </button>
                  ))}
                </div>
                {area.learnMoreUrl && (
                  <a
                    href={area.learnMoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-xs mt-3 ml-11 transition-colors ${
                      isSafety ? "text-rose-500 hover:text-rose-700" : "text-indigo-500 hover:text-indigo-700"
                    }`}
                  >
                    {area.learnMoreLabel}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
