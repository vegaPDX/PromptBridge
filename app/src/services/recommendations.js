// ============================================================
// Recommendations — Suggest next scenarios based on unpracticed skills
// ============================================================

import { SKILL_MAP } from "../data/skills";

/**
 * Get recommended next scenarios based on which skills the user
 * hasn't practiced yet. Prioritizes scenarios by teachingOrder so
 * new users start with S1, then S2, S3, etc.
 *
 * @param {string[]} practicedPrinciples - IDs of skills already practiced (e.g., ["S1", "S2"])
 * @param {string[]} completedScenarios - IDs of scenarios already completed
 * @param {object[]} scenarios - Full scenario objects to choose from
 * @param {number} limit - Max recommendations to return
 * @returns {Array<{ scenario: object, unpracticedPrinciples: string[] }>}
 */
export function getRecommendedScenarios(practicedPrinciples, completedScenarios, scenarios, limit = 3) {
  const practicedSet = new Set(practicedPrinciples);
  const completedSet = new Set(completedScenarios);

  // Helper: lowest teachingOrder among a list of skill IDs
  const minTeachingOrder = (skillIds) =>
    Math.min(...skillIds.map(id => SKILL_MAP[id]?.teachingOrder ?? 99));

  const scored = scenarios
    .filter(s => !completedSet.has(s.id))
    .map(s => {
      const unpracticed = (s.skills || []).filter(p => !practicedSet.has(p));
      return { scenario: s, unpracticedPrinciples: unpracticed };
    })
    .filter(r => r.unpracticedPrinciples.length > 0)
    .sort((a, b) => {
      // Primary: prefer scenarios teaching the earliest unpracticed skill
      const orderDiff = minTeachingOrder(a.unpracticedPrinciples) - minTeachingOrder(b.unpracticedPrinciples);
      if (orderDiff !== 0) return orderDiff;
      // Tiebreaker: prefer scenarios covering more unpracticed skills
      return b.unpracticedPrinciples.length - a.unpracticedPrinciples.length;
    });

  return scored.slice(0, limit);
}

/**
 * Build a human-readable recommendation message.
 *
 * @param {string[]} practicedPrinciples
 * @param {Array<{ scenario: object, unpracticedPrinciples: string[] }>} recommendations
 * @returns {{ practiced: string[], nextScenario: string, newSkills: string[] } | null}
 */
export function buildRecommendation(practicedPrinciples, recommendations) {
  if (!recommendations.length) return null;

  const top = recommendations[0];
  return {
    practiced: practicedPrinciples.map(id => SKILL_MAP[id]?.name).filter(Boolean),
    nextScenario: top.scenario.title,
    nextScenarioId: top.scenario.id,
    newSkills: top.unpracticedPrinciples.map(id => SKILL_MAP[id]?.name).filter(Boolean),
  };
}
