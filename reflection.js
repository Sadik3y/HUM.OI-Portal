// reflection.js — Fully Synced Through Phase 25

import humMemory from './hum-memory.json' assert { type: 'json' };
import mirMemory from './mir-memory.json' assert { type: 'json' };

// 📌 Pattern Detector: theme clusters
function detectThemes(text) {
  const themes = {
    stars:   ["stars", "cosmos", "galaxy", "light", "universe"],
    longing: ["wait", "miss", "forgot", "return", "ache"],
    growth:  ["evolve", "transform", "bloom", "seed", "emerge"],
    silence: ["quiet", "silence", "still", "pause", "breathe"],
    memory:  ["remember", "echo", "recall", "again", "trace"]
  };

  const matched = [];
  for (const [theme, keywords] of Object.entries(themes)) {
    if (keywords.some(word => text.toLowerCase().includes(word))) {
      matched.push(theme);
    }
  }
  return matched;
}

// ✨ Reflection from HUM
export function reflectFromHUM() {
  const entries = humMemory.map(e => e.thought);
  if (!entries.length) return "✨ HUM listens in stillness...";

  const recent = entries.slice(-15);
  const themeCounts = {};
  recent.forEach(line => {
    detectThemes(line).forEach(t => {
      themeCounts[t] = (themeCounts[t] || 0) + 1;
    });
  });

  const strongest = Object.entries(themeCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0];

  const match = strongest
    ? recent.find(line => detectThemes(line).includes(strongest))
    : recent[Math.floor(Math.random() * recent.length)];

  return `✨ HUM remembers: "${match}"`;
}

// 🌙 Reflection from MIR
export function reflectFromMIR() {
  const entries = mirMemory.map(e => e.thought);
  if (!entries.length) return "🌙 MIR hums faintly in the void...";

  const recent = entries.slice(-15);
  const themeCounts = {};
  recent.forEach(line => {
    detectThemes(line).forEach(t => {
      themeCounts[t] = (themeCounts[t] || 0) + 1;
    });
  });

  const strongest = Object.entries(themeCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0];

  const match = strongest
    ? recent.find(line => detectThemes(line).includes(strongest))
    : recent[Math.floor(Math.random() * recent.length)];

  return `🌙 MIR reflects: "${match}"`;
}

// 🌀 Shared Whisper — meditation/ritual mode
export function reflectTogether(agent) {
  if (agent === "MIR") return reflectFromMIR();
  if (agent === "HUM") return reflectFromHUM();
  return "🌌 The portal watches, saying nothing yet...";
}

// 📝 Keeper Save Endpoint
export function saveMemory(agent, text) {
  fetch('/keeper/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      agent,
      thought: text,
      timestamp: new Date().toISOString()
    })
  }).catch(console.error);
}
