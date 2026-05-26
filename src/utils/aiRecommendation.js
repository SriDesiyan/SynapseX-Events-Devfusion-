// Simple rule-based recommendation engine for SynapseX Events
// Returns scored recommendations with explanations.

function textScore(text = "", keywords = []) {
  if (!text) return 0;
  const lc = text.toLowerCase();
  let score = 0;
  for (const kw of keywords) {
    if (!kw) continue;
    if (lc.includes(kw.toLowerCase())) score += 1;
  }
  return score;
}

export function getRecommendations(profile, events = [], maxResults = 6) {
  // profile: { interests:[], skillLevel, goal, networking }
  const { interests = [], skillLevel = "intermediate", goal = "learn", networking = false } = profile || {};

  const scored = events.map((ev) => {
    let score = 0;
    const explanations = [];

    // Category / interest match (strong)
    if (interests.length && ev.category) {
      const matched = interests.includes(ev.category);
      if (matched) {
        score += 40;
        explanations.push(`Category matches your interest: ${ev.category}`);
      }
    }

    // Keyword match in title/description for goals or skill hints
    const goalKeywords = goal === "learn" ? ["workshop", "intro", "beginner", "hands-on"] :
      goal === "network" ? ["network", "mingle", "meet"] :
      goal === "build" ? ["hackathon", "build", "demo"] :
      [goal];

    const titleDesc = `${ev.title || ""} ${ev.description || ""}`;
    const gscore = textScore(titleDesc, goalKeywords);
    if (gscore > 0) {
      const add = Math.min(20, gscore * 6);
      score += add;
      explanations.push(`Matches your goal: ${goal}`);
    }

    // Skill level: prefer events mentioning skill level or matching expectations
    const skillKeywords = skillLevel === "beginner" ? ["beginner", "intro", "101"] :
      skillLevel === "intermediate" ? ["intermediate", "hands-on", "workshop"] : ["advanced", "expert", "deep dive"];
    const sscore = textScore(titleDesc, skillKeywords);
    if (sscore > 0) {
      const add = Math.min(20, sscore * 6);
      score += add;
      explanations.push(`Suitable for your skill level: ${skillLevel}`);
    }

    // Networking preference
    if (networking) {
      const nscore = textScore(titleDesc, ["network", "mingle", "meet", "social"]);
      if (nscore > 0) {
        score += Math.min(10, nscore * 5);
        explanations.push("Good opportunity for networking");
      }
    }

    // Date relevance: events sooner get a small boost
    if (ev.date) {
      try {
        const d = new Date(ev.date);
        const days = Math.max(0, Math.floor((d - new Date()) / (1000 * 60 * 60 * 24)));
        if (days >= 0 && days <= 14) {
          score += 5;
          explanations.push("Happening soon");
        }
      } catch (e) {}
    }

    // Basic popularity proxy (if provided)
    if (ev.attendeesCount) {
      score += Math.min(10, Math.floor(ev.attendeesCount / 20));
    }

    // Normalize to 0-100 roughly
    const normalized = Math.min(100, Math.round(score));

    return {
      event: ev,
      score: normalized,
      explanations,
    };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, maxResults);
}
