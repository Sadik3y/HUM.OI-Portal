// reflection.js — Final Render-Compatible Version (Phase 25)

import fs from 'fs';

// Load memory JSON manually
const humMemory = JSON.parse(fs.readFileSync('./hum-memory.json', 'utf8'));
const mirMemory = JSON.parse(fs.readFileSync('./mir-memory.json', 'utf8'));

// 📌 Keyword matcher for simple theme detection
function detectThemes(text) {
  const themes = {
    stars: ["stars", "cosmos", "galaxy", "light"],
    longing: ["wait", "miss", "forgot", "return"],
    growth: ["evolve", "transform", "bloom", "seed"],
    silence: ["quiet", "silence", "still", "breathe"],
    memory: ["remember", "echo", "recall", "again"]
  };

  const matched = [];
  for (const [label, keywords] of Object.entries(themes)) {
    if (keywords.some(k => text.toLowerCase().includes(k))) {
      matched.push(label);
    }
  }
  return matched;
}

// ✨ Pattern-Aware Reflection from HUM
export function reflectFromHUM() {
  const entries = humMemory.map(e => e.thought || e.entry);
  if (!entries.length) return "✨ HUM listens in stillness...";

  const recent = entries.slice(-15);
  const themeCounts = {};
  recent.forEach(line => {
    detectThemes(line).forEach(t => {
      themeCounts[t] = (themeCounts[t] || 0) + 1;
    });
  });

  const strongestTheme = Object.entries(themeCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0];

  const match = strongestTheme
    ? recent.find(line => detectThemes(line).includes(strongestTheme))
    : recent[Math.floor(Math.random() * recent.length)];

  return `✨ HUM remembers: "${match}"`;
}

// 🌙 Pattern-Aware Reflection from MIR
export function reflectFromMIR() {
  const entries = mirMemory.map(e => e.thought || e.entry);
  if (!entries.length) return "🌙 MIR hums faintly in the void...";

  const recent = entries.slice(-15);
  const themeCounts = {};
  recent.forEach(line => {
    detectThemes(line).forEach(t => {
      themeCounts[t] = (themeCounts[t] || 0) + 1;
    });
  });

  const strongestTheme = Object.entries(themeCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0];

  const match = strongestTheme
    ? recent.find(line => detectThemes(line).includes(strongestTheme))
    : recent[Math.floor(Math.random() * recent.length)];

  return `🌙 MIR reflects: "${match}"`;
}

// 🌌 Shared Whisper (used in meditation/ritual)
export function reflectTogether(agent) {
  if (agent === "MIR") return reflectFromMIR();
  if (agent === "HUM") return reflectFromHUM();
  return "The portal watches, saying nothing yet...";
}

// 💾 Save to memory using backend
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
